import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { mdxToMarkdown } from '../lib/markdown';

const rawPages = import.meta.glob('../content/pages/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  pages.sort((a, b) => a.data.order - b.data.order);

  const parts = pages
    .map((page) => {
      const rawMdx = rawPages[`../content/pages/${page.id}.mdx`];
      if (rawMdx === undefined) return null;
      return mdxToMarkdown(rawMdx, page.data).trim();
    })
    .filter((part): part is string => part !== null);

  const body = parts.join('\n\n---\n\n') + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
