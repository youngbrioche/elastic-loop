import changelog from '../data/changelog.json';

const SITE = 'https://elastic-loop.robert-glaser.de';
const FULL = 'https://github.com/youngbrioche/elastic-loop/blob/main/CHANGELOG.md';

/**
 * The full /changelog.md document body. Shared by the route that serves it and
 * by llms.txt, which estimates its token budget — so the advertised budget and
 * the document's own `<!-- ~N tokens -->` stamp are computed from one identical
 * string and can never drift.
 *
 * Sourced from the same changelog.json the site footer renders, and emitted
 * verbatim (no smartypants pass) to stay byte-identical to what the footer shows.
 */
export function buildChangelogBody(): string {
  const entries = changelog.map((entry) => `- **${entry.date}**: ${entry.text}`);

  return [
    '# Changelog',
    '',
    '> Recent notable changes to The Elastic Loop, newest first. Mirrors the changelog in the site footer.',
    '',
    `Part of The Elastic Loop · ${SITE}`,
    '',
    '---',
    '',
    ...entries,
    '',
    `Full changelog with commit links: ${FULL}`,
    '',
  ].join('\n');
}
