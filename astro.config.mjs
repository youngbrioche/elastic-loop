// @ts-check
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkSmartypants from 'remark-smartypants';
import { renderChangelog, readEntries } from './scripts/gen-changelog.mjs';

// Fail the build if CHANGELOG.md drifts from its source (src/data/changelog.json,
// which the footer and /changelog.md also render). Keeps the human changelog,
// the footer, and the agent rendition in sync from one source. Run
// `npm run changelog` to regenerate after editing the JSON.
function changelogSyncGuard() {
  return {
    name: 'changelog-sync-guard',
    hooks: {
      'astro:build:start': () => {
        const generated = renderChangelog(readEntries());
        const current = readFileSync(new URL('./CHANGELOG.md', import.meta.url), 'utf8');
        if (current !== generated) {
          throw new Error(
            'CHANGELOG.md is out of sync with src/data/changelog.json. Run `npm run changelog` and commit the result.',
          );
        }
      },
    },
  };
}

// Fail the build if a generated diagram SVG (public/diagrams/*.svg) drifts from
// its .astro source. The .md / agent route embeds these as images, so they must
// stay in sync. Run `npm run diagrams` to regenerate after editing a visual.
function diagramsSyncGuard() {
  return {
    name: 'diagrams-sync-guard',
    hooks: {
      'astro:build:start': () => {
        execFileSync('node', ['scripts/gen-diagrams.mjs', '--check'], {
          stdio: 'inherit',
        });
      },
    },
  };
}

export default defineConfig({
  site: 'https://elastic-loop.robert-glaser.de',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    // Typographic punctuation for all MDX prose: curly quotes, proper
    // apostrophes, ellipses. Code spans are left untouched by the plugin.
    // dashes:false so we never auto-introduce em/en dashes from `--`.
    remarkPlugins: [[remarkSmartypants, { dashes: false, backticks: false }]],
  },
  integrations: [mdx(), sitemap(), changelogSyncGuard(), diagramsSyncGuard()],
});
