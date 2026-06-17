#!/usr/bin/env node
// Single source of truth for the changelog is src/data/changelog.json, which the
// site footer and /changelog.md already render. This generates the human
// CHANGELOG.md (commit links + full prose) from that same data so the two never
// drift. Run `npm run changelog` after editing the JSON; the build verifies the
// committed CHANGELOG.md matches (see astro.config.mjs).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const REPO = 'https://github.com/youngbrioche/elastic-loop';
const JSON_PATH = new URL('../src/data/changelog.json', import.meta.url);
const MD_PATH = new URL('../CHANGELOG.md', import.meta.url);

/**
 * Render the canonical CHANGELOG.md text from changelog entries.
 * Per entry: `title` and `text` are required; `commit` (full hash) and `body`
 * (rich prose, falls back to `text`) are optional.
 */
export function renderChangelog(entries) {
  const blocks = entries.map((e) => {
    const lines = [`## ${e.date} — ${e.title}`, ''];
    if (e.commit) {
      lines.push(`[\`${e.commit.slice(0, 7)}\`](${REPO}/commit/${e.commit})`, '');
    }
    lines.push(e.body ?? e.text);
    return lines.join('\n');
  });
  return `# Changelog\n\n${blocks.join('\n\n')}\n`;
}

export function readEntries() {
  return JSON.parse(readFileSync(JSON_PATH, 'utf8'));
}

// CLI: default writes CHANGELOG.md; `--check` exits non-zero if it is stale.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const generated = renderChangelog(readEntries());
  if (process.argv.includes('--check')) {
    const current = readFileSync(MD_PATH, 'utf8');
    if (current !== generated) {
      console.error(
        'CHANGELOG.md is out of sync with src/data/changelog.json. Run `npm run changelog` and commit the result.',
      );
      process.exit(1);
    }
    console.log('CHANGELOG.md is in sync.');
  } else {
    writeFileSync(MD_PATH, generated);
    console.log('CHANGELOG.md regenerated from src/data/changelog.json.');
  }
}
