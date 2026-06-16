import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://elastic-loop.robert-glaser.de';

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  pages.sort((a, b) => a.data.order - b.data.order);

  const pageLines = pages.map((page) => {
    const path = page.id === 'index' ? '/index.md' : `/${page.id}.md`;
    return `- [${page.data.title}](${SITE}${path}): ${page.data.description}`;
  });

  const body = [
    '# The Elastic Loop',
    '',
    '> A framework for everyone delegating work to AI agents: when to keep the loop tight, when to let it stretch, and what has to be true before you let go. By Robert Glaser.',
    '',
    '## Pages',
    ...pageLines,
    '',
    '## Optional',
    `- [llms-full.txt](${SITE}/llms-full.txt): all pages concatenated`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
