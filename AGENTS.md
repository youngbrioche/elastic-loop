# AGENTS.md

## General

- multiple agents may work in parallel on this repo
- if you need a dev server, check if one is already running
- decide if you need a worktree to isolate your changes from other agents working in parallel
- write commit messages in English, commit and push your work while you go
- before committing, check git status: another agent may have uncommitted edits in the same files. Stage only the hunks you changed, never git add <file> wholesale, and pass explicit paths so you never sweep in someone else's work
- never force-push or rewrite already-pushed history on `main`; another agent may have committed on top of yours
- when doing frontend work: iterate using the `agent-browser` cli in all common viewports, until the work is done

## Releasing

This site is hosted using GitHub pages. You are responsible for releases.

The changelog has one source: `src/data/changelog.json`. It feeds the site
footer, the `/changelog.md` agent route, and the human `CHANGELOG.md`, so all
three stay in sync. Do NOT hand-edit `CHANGELOG.md` — the build fails if it
drifts from the JSON.

For public, notable changes:
- add an entry at the top of `src/data/changelog.json`. Required: `date`,
  `title`, and a one-sentence `text` teaser. For committed changes also add the
  full `commit` hash and a richer `body` (3 sentences max) for CHANGELOG.md.
- run `npm run changelog` to regenerate CHANGELOG.md, then commit it together
  with the JSON.
- the changelog teaser in the footer should only show 3 items max, never more.

## Glossary links

Every glossary term (`src/data/glossary.ts`) must be wrapped in `<Term id="…">`
the **first** time it appears in a page's running prose, so the reader meets the
definition before the jargon. A build guard enforces this and fails on any miss
(`glossaryLinksGuard` in `astro.config.mjs`, script `scripts/check-glossary-links.mjs`).
It is a deterministic text check, no LLM.

- **See offenders:** `npm run glossary:links`. **Gate (exit non-zero):**
  `npm run glossary:check`. The build runs the gate at `astro:build:start`.
- **Matching** is case-insensitive and tolerates plurals and hyphen/space
  variants. For irregular surface forms (e.g. `slop` for "the statistical
  middle", `generalize` for "generalization"), add a `match: ['…']` array to that
  glossary entry — the glossary stays the single source of truth.
- **Out of scope** (never flagged): frontmatter, imports, fenced/inline code,
  URLs and markdown links, headings, blockquotes, table rows, JSX tags and their
  attributes, and the inside of an existing `<Term>`. Only first use is checked;
  later mentions may stay plain.
- A page that uses a term only in those excluded spots needs no wrapper. If you
  add the first `<Term>` to a page that had none, remember its
  `import Term from '../../components/Term.astro';`.

## Visuals and the agent .md routes

The visual components live in `src/components/visuals/*.astro`. HTML pages render
them live; the `.md` / `llms.txt` agent routes embed image (or table) versions via
`COMPONENT_REPLACEMENTS` in `src/lib/markdown.ts`, each with a textual caption
beneath. Keep these in sync — details in `scripts/README-diagrams.md`:

- **Added a visual?** The build fails (`unhandled JSX tag` guard in
  `markdown.ts`) until you add a `COMPONENT_REPLACEMENTS` rule, so it can't leak
  silently. Decide per visual: embed an image, or render it as a table / text.
- **Changed a pure-SVG visual** (TwoIterationLayers, StationsVsLoop)? Run
  `npm run diagrams` to regenerate `public/diagrams/*.svg` and commit it. The
  build runs `npm run diagrams:check` and fails on drift.
- **Changed an HTML-based visual** (Squeeze, LoopSizes)? Nothing to do — the
  build screenshots them with Playwright into `dist/diagrams/*.png` on every
  run (`astro:build:done` hook), so they can't drift. This needs a browser in
  the build: locally `npx playwright install chromium` once; CI installs it in
  `deploy.yml`.
- **Changed the MasterGrid content?** Its `.md` form is a hand-kept markdown
  table in `markdown.ts` (not an image). Update it there by hand.
