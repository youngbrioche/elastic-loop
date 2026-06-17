# Diagram assets for the `.md` / agent routes

The HTML pages render the visual components live (`src/components/visuals/*.astro`).
The `.md` renditions in `src/lib/markdown.ts` embed image versions of them so the
agent-facing output carries the figures too. The assets live in `public/diagrams/`
and are served at `/diagrams/…`.

Two kinds of asset, two ways to regenerate:

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

## Screenshot PNGs (one command, manual trigger)

`squeeze.png` and `loop-sizes.png` are HTML-based: Squeeze layers HTML labels over
an SVG, LoopSizes is a CSS grid of positioned `<div>`s. They can't be exported as
standalone SVG, so they are captured as PNG screenshots of the live component and
committed. They are **not** guarded against drift — regenerate them yourself after
changing either component:

```bash
npm run dev            # in one terminal (port 4321)
npm run diagrams:shoot # in another — opens each page, crops the diagram, writes the PNGs
```

`scripts/shoot-diagrams.mjs` opens each page, measures the diagram's bounding box,
screenshots the viewport, and crops to the box. It needs the `agent-browser` CLI
and ImageMagick (`magick`). The viewport-then-crop approach is deliberate: the
element-clip mode of `agent-browser screenshot <selector>` renders these particular
elements (aspect-ratio box / absolutely-positioned children) blank.

Because screenshots are not pixel-deterministic across runs, expect a tiny diff
even with no visual change; only commit the PNGs when the component actually
changed.
