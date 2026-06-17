# Changelog

## 17 Jun 2026 — New FAQ page on applying the framework

[`a83561b`](https://github.com/youngbrioche/elastic-loop/commit/a83561b62cc88be9fd071fbbe6843922832aac7c)

The FAQ leads with the question I get most, how do I apply this to my team, and answers it agent-first: prime your own agent with the book (every page has a .md mirror, plus llms.txt and llms-full.txt) and let it reason about your readiness, loop sizing, harness, and grading in the framework's terms, then argue with what it returns. Three shorter follow-ups handle the non-engineer, the spec-driven-development, and the which-model-to-standardize-on questions. The page joins the masthead nav and the end of the reading path, and flows into llms.txt, /faq.md, and llms-full.txt automatically.

## 17 Jun 2026 — Diagrams now render in the agent .md routes

[`e60a439`](https://github.com/youngbrioche/elastic-loop/commit/e60a4399c9ff3d4fa68f7d2d3447519c7b474d11)

The agent-facing .md and llms.txt renditions used to drop every visual to a one-line figure caption; they now embed the diagram too. The two pure-SVG figures are generated from their components into standalone files (guarded against drift), the two HTML-based ones ship as committed screenshots, and the master grid renders as a markdown table with an ascii context floor. Each image keeps its caption beneath it, so vision-capable and text-only agents are both served.

## 17 Jun 2026 — Token budgets for agents in llms.txt and .md routes

[`0598f5f`](https://github.com/youngbrioche/elastic-loop/commit/0598f5f84f15cf0596b23b694749a8ab6e512fcf)

llms.txt annotates each page link, plus the llms-full.txt and changelog bundles, with a rough token estimate, and each .md route opens with a <!-- ~Nk tokens --> comment. The numbers use a chars/4 heuristic and are always marked with a leading ~, since no JavaScript tokenizer matches Claude's tokenizer exactly. The idea is borrowed from Cloudflare's x-markdown-tokens header, adapted to a static host that cannot set response headers or negotiate on the Accept header.

## 17 Jun 2026 — Agent rendition kept in sync with the site

[`95aa3f2`](https://github.com/youngbrioche/elastic-loop/commit/95aa3f2174351157608e1183498c479d3993ddf0)

The `.md` and `llms.txt` renditions now carry figure descriptions for the two new diagrams instead of leaking their raw component tags, so agents reading grading.md, roles.md, and llms-full.txt see the same figures human readers do. The Markdown conversion now fails the build if any component, wrapper, or glossary term ever drifts out of it again, rather than silently shipping a degraded rendition.

## 17 Jun 2026 — Two new diagrams on Grading and Roles

[`9fd3e9a`](https://github.com/youngbrioche/elastic-loop/commit/9fd3e9a09c46bed8d2c0b50eb7ad0108b2f55218)

Grading gains a two-iteration-layers diagram showing the inner agent loop iterating fast over the output and the outer human loop iterating slowly over the grading material, with output flowing out to evaluation and sharpened graders flowing back in. Roles gains a stations-versus-loop diagram contrasting the old PO→UX→Eng→QA→Ops handoff line with the same people gathered around a single loop, each labelled with the backpressure they supply. Both diagrams use the site's design tokens and follow the master grid's responsive scroll pattern.

## 16 Jun 2026 — Loop time horizons retuned to METR's evidence

[`5df3e0c`](https://github.com/youngbrioche/elastic-loop/commit/5df3e0cfe11f17acd40b8f9c420f57e423bb0c84)

The loop zones now read minutes to hours for elastic and multiple hours for loose, replacing the earlier "hours" and "days" framing. This follows METR's time-horizon data, which puts the current upper limit of unattended agent work at around 16 hours rather than days. The change touches the master grid, the loop-sizes visual, and the prose on the index, loops, and harness pages.

## 12 Jun 2026 — Verification cost added to Harness and Loops

Verification cost: how many loops can one person close? Added to Harness and Loops.

## 12 Jun 2026 — A fourth verb in the one-sentence formula

The one-sentence formula gains its fourth verb: verification closes the loop.

## 11 Jun 2026 — First public draft

First public draft: the hub and all five sections, seeded.
