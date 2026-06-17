import type { APIRoute } from 'astro';
import changelog from '../data/changelog.json';

const SITE = 'https://elastic-loop.robert-glaser.de';
const FULL = 'https://github.com/youngbrioche/elastic-loop/blob/main/CHANGELOG.md';

// Sourced from the same changelog.json the site footer renders, so the agent
// rendition and the footer never drift. Entries are emitted verbatim (no
// smartypants pass) to stay byte-identical to what the footer shows.
export const GET: APIRoute = () => {
  const entries = changelog.map((entry) => `- **${entry.date}**: ${entry.text}`);

  const body = [
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

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
