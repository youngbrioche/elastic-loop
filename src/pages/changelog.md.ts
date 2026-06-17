import type { APIRoute } from 'astro';
import { buildChangelogBody } from '../lib/changelog';
import { tokenBudget } from '../lib/tokens';

export const GET: APIRoute = () => {
  const body = buildChangelogBody();
  const withBudget = `<!-- ${tokenBudget(body)} -->\n${body}`;

  return new Response(withBudget, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
