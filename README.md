# The Elastic Loop

A framework for everyone delegating work to AI agents: when to keep the loop tight, when to let it stretch, and what has to be true before you let go. By Robert Glaser.

Live at **https://elastic-loop.robert-glaser.de**

## What this is

A small site built around one idea: the human-agent feedback loop has a size, and sizing it well is a skill. The hub introduces the framework; five pages carry the argument:

- **[Loops](https://elastic-loop.robert-glaser.de/loops)** — tight, elastic, loose: three zones and how to size the loop for the task in front of you
- **[Why](https://elastic-loop.robert-glaser.de/why)** — the search-space shift that turns backpressure into a discipline
- **[Harness](https://elastic-loop.robert-glaser.de/harness)** — the backpressure layers that hold agent output honest against the system and the product
- **[Grading](https://elastic-loop.robert-glaser.de/grading)** — outcome grading as the new specification: tests, rubrics, scenarios, goldens
- **[Roles](https://elastic-loop.robert-glaser.de/roles)** — what every role can check about agent output that nobody else can

## Agent-ready by design

A site that argues context has to be able to serve itself had better be agent-readable itself. So it is:

| Surface | Where |
|---|---|
| Markdown rendition of every page | `/<slug>.md` (the hub at `/index.md`) |
| Site index for LLMs | [`/llms.txt`](https://elastic-loop.robert-glaser.de/llms.txt) |
| All pages concatenated | [`/llms-full.txt`](https://elastic-loop.robert-glaser.de/llms-full.txt) |
| Sitemap | `/sitemap-index.xml` |
| Structured data | JSON-LD on every page, plus `<link rel="alternate" type="text/markdown">` pointing to the markdown rendition |

## Local development

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # static build to dist/
```

Built with [Astro](https://astro.build), deployed to GitHub Pages on every push to `main` (see `.github/workflows/deploy.yml`).

## Contributing

Issues and PRs are welcome. The prose lives in `src/content/pages/*.mdx`, one file per page. Keep contributions in English for now. Small corrections (typos, broken links, factual slips) are easiest as a direct PR.

## Provenance

The Elastic Loop grew out of [How Does Truffle Taste?](https://www.robert-glaser.de/the-elastic-loop-introducing-agentic-engineering-strategically/), the canonical write-up of my talk that introduced the framework.

## License

Code is licensed under [Apache 2.0](LICENSE). Site content (the prose in `src/content`) is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
