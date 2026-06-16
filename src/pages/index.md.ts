import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { mdxToMarkdown } from '../lib/markdown';

const rawPages = import.meta.glob('../content/pages/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const GET: APIRoute = async () => {
  const page = await getEntry('pages', 'index');
  const rawMdx = rawPages['../content/pages/index.mdx'];
  if (!page || rawMdx === undefined) {
    return new Response('Not found', { status: 404 });
  }
  const markdown = mdxToMarkdown(rawMdx, page.data);
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
