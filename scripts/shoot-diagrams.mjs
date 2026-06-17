#!/usr/bin/env node
// Regenerate the PNG screenshots of the HTML-based visual components for the
// .md / agent route. Squeeze layers HTML labels over an SVG and LoopSizes is a
// CSS grid of positioned <div>s, so neither can be exported as standalone SVG
// (unlike the pure-SVG visuals — see gen-diagrams.mjs). They are captured as
// screenshots of the live component instead.
//
// Usage: start the dev server (`npm run dev`, port 4321), then `npm run
// diagrams:shoot`. Requires the `agent-browser` CLI and ImageMagick (`magick`).
//
// Why screenshot the viewport and crop, instead of agent-browser's element-clip
// mode (`screenshot <selector>`)? That mode renders these particular elements
// (aspect-ratio box / absolutely-positioned children) blank. Measuring the
// bounding box and cropping a full viewport screenshot is reliable.

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const PORT = process.env.PORT || '4321';
const BASE = `http://localhost:${PORT}`;
const TMP = '/tmp/_elastic-loop-shot.png';

// The diagram element to capture per page. We clip to the inner diagram (not the
// <figure>) so the figcaption is left out — the .md caption already carries it,
// matching the framing of the generated SVGs.
const TARGETS = [
  { path: '/', selector: 'figure.squeeze .canvas', out: 'public/diagrams/squeeze.png' },
  { path: '/loops', selector: 'figure.loop-sizes .loopviz', out: 'public/diagrams/loop-sizes.png' },
];

// Below these widths the components reflow to their mobile layout; capturing
// then would ship a stacked screenshot. The default headless viewport (1280) is
// safely above both, but guard in case it is ever narrower.
const MIN_WIDTH = 700;

function ab(args) {
  return execFileSync('agent-browser', args, { encoding: 'utf8' });
}

function requireServer() {
  try {
    execFileSync('curl', ['-sf', '-o', '/dev/null', BASE], { stdio: 'ignore' });
  } catch {
    console.error(`shoot-diagrams: no dev server on ${BASE}. Start it with \`npm run dev\` first.`);
    process.exit(1);
  }
}

function requireTools() {
  for (const [bin, hint] of [['agent-browser', 'brew install agent-browser'], ['magick', 'brew install imagemagick']]) {
    try {
      execFileSync('which', [bin], { stdio: 'ignore' });
    } catch {
      console.error(`shoot-diagrams: \`${bin}\` not found (${hint}).`);
      process.exit(1);
    }
  }
}

function shoot({ path, selector, out }) {
  ab(['open', `${BASE}${path}`]);
  ab(['wait', selector]);
  ab(['scrollintoview', selector]);
  ab(['wait', '500']);

  const raw = ab([
    'eval',
    `(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();
      return Math.round(r.left) + ' ' + Math.round(r.top) + ' ' + Math.round(r.width) + ' ' + Math.round(r.height); })()`,
  ]);
  const [x, y, w, h] = raw.replace(/"/g, '').trim().split(/\s+/).map(Number);
  if (!w || !h) throw new Error(`shoot-diagrams: could not measure ${selector} on ${path}`);
  if (w < MIN_WIDTH) {
    throw new Error(
      `shoot-diagrams: ${selector} measured ${w}px wide — the viewport is in the mobile layout. Widen it and retry.`,
    );
  }

  ab(['screenshot', TMP]);
  execFileSync('magick', [TMP, '-crop', `${w}x${h}+${x}+${y}`, '+repage', resolve(root, out)]);
  console.log(`wrote ${out} (${w}×${h})`);
}

requireTools();
requireServer();
for (const target of TARGETS) shoot(target);
ab(['close']);
