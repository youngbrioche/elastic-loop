import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { mdxToMarkdown } from '../lib/markdown';

const rawPages = import.meta.glob('../content/pages/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getCollection('pages');
  return pages
    .filter((page) => page.id !== 'index')
    .map((page) => ({
      params: { slug: page.id },
      props: { page },
    }));
};

export const GET: APIRoute = ({ props }) => {
  const { page } = props as { page: { id: string; data: any } };
  const rawMdx = rawPages[`../content/pages/${page.id}.mdx`];
  if (rawMdx === undefined) {
    return new Response('Not found', { status: 404 });
  }
  const markdown = mdxToMarkdown(rawMdx, page.data);
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
