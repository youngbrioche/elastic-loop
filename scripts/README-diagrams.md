# Diagram assets for the `.md` / agent routes

The HTML pages render the visual components live (`src/components/visuals/*.astro`).
The `.md` renditions in `src/lib/markdown.ts` embed image versions of them so the
agent-facing output carries the figures too. The assets are served at `/diagrams/…`.

Two kinds of asset, both regenerated from their component so they cannot drift:
the SVGs are committed in `public/diagrams/` (guarded), the PNGs are produced at
build time into `dist/diagrams/` (never committed).

## Generated SVGs (automatic, guarded)

`two-iteration-layers.svg` and `stations-vs-loop.svg` are pure SVG: their text and
geometry live entirely inside the component's `<svg>`. `scripts/gen-diagrams.mjs`
extracts that markup and resolves every `var(--rg-*)` to the hex in
`src/styles/tokens.css`, so the file renders standalone (as an `<img>` it has no
access to page CSS variables or `@font-face`).

```bash
npm run diagrams        # regenerate the two SVGs
npm run diagrams:check  # fail if they drift from their .astro source
```

The build runs `diagrams:check` and fails on drift, so after editing
`TwoIterationLayers.astro` or `StationsVsLoop.astro` you must run `npm run diagrams`
and commit the result.

## Screenshot PNGs (automatic at build time)

`squeeze.png` and `loop-sizes.png` are HTML-based: Squeeze layers HTML labels over
an SVG, LoopSizes is a CSS grid of positioned `<div>`s. They can't be exported as
standalone SVG, so `scripts/shoot-diagrams.mjs` screenshots the live component with
Playwright instead. It runs as an `astro:build:done` integration (wired in
`astro.config.mjs`): after the build, it serves `dist/`, loads the real page (real
Inter font, real layout), and writes `dist/diagrams/*.png` straight from the
component.

This means the PNGs regenerate from the component on **every** build and can never
drift — there is nothing committed and nothing to remember. The cost is a browser
in the build environment: locally that is a one-time `npx playwright install
chromium`; in CI, `.github/workflows/deploy.yml` runs `npx playwright install
--with-deps chromium` before the build.

To regenerate them on their own after a build (rarely needed):

```bash
npm run build           # builds + shoots in one go
# or, against an existing dist/:
npm run diagrams:shoot
```
