#!/usr/bin/env node
// Render the HTML-based visual components (Squeeze, LoopSizes) to PNG, straight
// from the built site. Run automatically as an `astro:build:done` integration
// (see astro.config.mjs), so the screenshots are regenerated from the live
// component on every build and can never drift — unlike the committed approach
// they replace, there is nothing to forget.
//
// Squeeze layers HTML labels over an SVG and LoopSizes is a CSS grid of
// positioned <div>s, so neither can be exported as standalone SVG (the pure-SVG
// visuals are handled by gen-diagrams.mjs). Here Playwright loads the actual
// built page — real Inter font, real layout — and screenshots the diagram
// element. The pure-SVG files are shipped from public/diagrams and the master
// grid renders as a markdown table; see scripts/README-diagrams.md.
//
// CLI: `node scripts/shoot-diagrams.mjs [distDir=dist]` (needs a prior build).

import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// The diagram element to capture per built page. Clip to the inner diagram (not
// the <figure>) so the figcaption is left out — the .md caption carries it,
// matching the framing of the generated SVGs.
const TARGETS = [
  { page: 'index.html', selector: 'figure.squeeze .canvas', out: 'diagrams/squeeze.png' },
  { page: 'loops.html', selector: 'figure.loop-sizes .loopviz', out: 'diagrams/loop-sizes.png' },
];

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
};

function startServer(rootDir) {
  return new Promise((resolvePromise) => {
    const server = createServer(async (req, res) => {
      try {
        let p = decodeURIComponent(req.url.split('?')[0]);
        if (p.endsWith('/')) p += 'index.html';
        const body = await readFile(join(rootDir, p));
        res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end('not found');
      }
    });
    server.listen(0, '127.0.0.1', () => resolvePromise(server));
  });
}

// Screenshot every TARGET from the built site in distDir into distDir/diagrams.
export async function shootDiagrams(distDir) {
  const { chromium } = await import('playwright');
  await mkdir(join(distDir, 'diagrams'), { recursive: true });

  const server = await startServer(distDir);
  const base = `http://127.0.0.1:${server.address().port}`;
  // --no-sandbox is required on the GitHub Actions Ubuntu runner.
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2, // crisp on retina / when scaled up in a viewer
    });
    for (const t of TARGETS) {
      await page.goto(`${base}/${t.page}`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const el = page.locator(t.selector);
      await el.waitFor({ state: 'visible' });
      await el.screenshot({ path: join(distDir, t.out) });
      console.log(`shot ${t.out}`);
    }
    await page.close();
  } finally {
    await browser.close();
    server.close();
  }
}

// CLI entry: shoot against an already-built dist directory.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const distDir = resolve(root, process.argv[2] || 'dist');
  shootDiagrams(distDir).then(
    () => console.log('done'),
    (err) => {
      console.error(err);
      process.exit(1);
    },
  );
}
