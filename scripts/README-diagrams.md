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

## Screenshot PNGs (manual)

`squeeze.png` and `loop-sizes.png` are HTML-based: Squeeze layers HTML labels over
an SVG, LoopSizes is a CSS grid of positioned `<div>`s. They can't be exported as
standalone SVG, so they are captured as PNG screenshots of the live component and
committed. They are **not** guarded — regenerate them by hand if the component
changes. With the dev server running (`npm run dev`, port 4321) and `agent-browser`
+ ImageMagick available:

```bash
# Squeeze — http://localhost:4321/ , selector "figure.squeeze .canvas"
# LoopSizes — http://localhost:4321/loops , selector "figure.loop-sizes .loopviz"
# For each: scroll into view, read getBoundingClientRect, screenshot the viewport,
# then `magick shot.png -crop WxH+X+Y +repage public/diagrams/<name>.png`.
```

(The element-clip mode of `agent-browser screenshot <selector>` renders these
particular elements blank, hence the viewport-screenshot-then-crop approach.)
