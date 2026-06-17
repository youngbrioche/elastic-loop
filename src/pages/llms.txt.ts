import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { mdxToMarkdown } from '../lib/markdown';
import { tokenBudget } from '../lib/tokens';
import { buildChangelogBody } from '../lib/changelog';

const SITE = 'https://elastic-loop.robert-glaser.de';

const rawPages = import.meta.glob('../content/pages/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  pages.sort((a, b) => a.data.order - b.data.order);

  // Render each page's markdown once so its token budget matches exactly what
  // the .md route and llms-full.txt actually serve.
  const rendered = pages.map((page) => ({
    page,
    md: mdxToMarkdown(rawPages[`../content/pages/${page.id}.mdx`] ?? '', page.data).trim(),
  }));

  const pageLines = rendered.map(({ page, md }) => {
    const path = page.id === 'index' ? '/index.md' : `/${page.id}.md`;
    return `- [${page.data.title}](${SITE}${path}) (${tokenBudget(md)}): ${page.data.description}`;
  });

  // llms-full.txt is the pages joined with separators (its license block adds a
  // negligible ~40 tokens, well inside the ~ estimate). The changelog budget is
  // computed from the exact same body its route serves, via the shared builder.
  const fullBody = rendered.map((r) => r.md).join('\n\n---\n\n');
  const changelogBody = buildChangelogBody();

  const body = [
    '# The Elastic Loop',
    '',
    '> A framework for everyone delegating work to AI agents: when to keep the loop tight, when to let it stretch, and what has to be true before you let go. By Robert Glaser.',
    '',
    '## Pages',
    ...pageLines,
    '',
    '## Optional',
    `- [llms-full.txt](${SITE}/llms-full.txt) (${tokenBudget(fullBody)}): all pages concatenated`,
    `- [Changelog](${SITE}/changelog.md) (${tokenBudget(changelogBody)}): recent notable changes, mirrors the site footer`,
    '',
    '## License',
    '© 2026 Robert Glaser. Code is licensed under Apache 2.0; site content is licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
