// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkSmartypants from 'remark-smartypants';

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
  integrations: [mdx(), sitemap()],
});
