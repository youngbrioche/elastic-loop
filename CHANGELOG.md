# Changelog

## 28 Jun 2026 — Two backpressure sharpenings: structural vs behavioral, and the rubric line

[`e35a7c5`](https://github.com/youngbrioche/elastic-loop/commit/e35a7c5354300c868f4d561523daadf558d902fc)

Harness gains a 'Structural vs behavioral harness' section: an AGENTS.md rule the agent can read, ignore, or rewrite is the soft, in-band layer, while hooks, CI gates, and sandboxes are the hard layer it cannot route around, laid out in a comparison table with the field terms from Habler, Brooks, and the Evil Martians. On Grading, a new section keeps the deterministic checks out of the rubric: anything a compiler or a contrast check can settle runs as build-time backpressure, and the outcome grader is reserved for the judgment no check can make. Both connect through judge independence, the rule that whatever grades the work sits outside the run that produced it.

## 24 Jun 2026 — Reground the harness-beats-model claim in real measurements

[`83de3e8`](https://github.com/youngbrioche/elastic-loop/commit/83de3e8d2fd1e02ef8d087edb047cc1d8646786e)

The earlier text leaned on a clawbench measurement that the configuration moves the result about ten times more than the model, a number with no data behind it. The pages now cite measurements that hold the model fixed and change only the scaffold: HAL has Claude Sonnet 4.5 at 68% against 34% on SWE-bench Verified Mini, the harness alone doubling the score, and LangChain reports +13.7 points on Terminal-Bench 2.0 with gpt-5.2-codex held fixed. clawbench keeps its design role, scoring the whole combination you ship while the measurement now comes from HAL and LangChain.

## 21 Jun 2026 — Roles: do new jobs appear, or do old ones just change?

[`263c99a`](https://github.com/youngbrioche/elastic-loop/commit/263c99aff043efb4c22b36dca6d131bbd436f137)

The Roles page mapped existing roles onto the loop but never said whether genuinely new titles emerge, so a new section applies a hard test: a new title needs an important task, a scarce skill no existing role reliably supplies, and someone funded to answer for it. Almost everything folds back into existing roles whose center of gravity moved from making artifacts to encoding judgment, and the one job that survives is the harness engineer, who owns the shared scaffold as a product. Whether grading and eval work becomes its own seat is left honestly open.

## 21 Jun 2026 — Theory of Constraints and Cynefin, named and explained

[`b01a1df`](https://github.com/youngbrioche/elastic-loop/commit/b01a1df04180411654221afea173f19a3d263bcd)

Why now names Goldratt's Theory of Constraints in plain terms: a system has one bottleneck at a time, building was that bottleneck for twenty years, and once AI relieved it the constraint jumped to the two ends. Harness names Snowden's Cynefin to keep the Toyota analogy honest: classic manufacturing runs ordered, repeatable work, while a loop mostly runs complex work, so the factory's instinct to eliminate variance flips into harvesting it. Cynefin also gets a glossary entry, with pronunciation and an everyday anchor, for readers meeting the word for the first time.

## 21 Jun 2026 — A sharper opening and loops you build on purpose

[`dc0ab71`](https://github.com/youngbrioche/elastic-loop/commit/dc0ab71e30e43a583805e1de5a45d0825d3cd3de)

Reworked from a close read of the whole book. The masthead now opens on the restaurant-with-no-menu hook and runs a food thread through it, the truffle that tastes like a bicycle accident in the forest and the schnitzel that is everyday slop. Loops is reframed around what changes when a machine does the work: you now have to build the loop it runs in instead of letting it just happen, grounded in the everyday example of shipping a change and waiting on a UX team, and closing on the long-running loops a background agent can carry.

## 17 Jun 2026 — New page for the readiness skill

[`f4398a1`](https://github.com/youngbrioche/elastic-loop/commit/f4398a1662d53fa045d78879851bcf3c4ef19d13)

The readiness skill is the companion you put to work after reading the book: it reads the live framework, then works through how much loop your team can carry, which loop sizes are available to you here, and the one constraint gating the next size up. The page shows the GitHub folder to hand any capable agent, a few starter prompts, and the native Claude Code plugin install for those who want it. It joins the masthead nav and the end of the reading path, and flows into llms.txt, /skill.md, and llms-full.txt automatically.

## 17 Jun 2026 — New FAQ page on applying the framework

[`a83561b`](https://github.com/youngbrioche/elastic-loop/commit/a83561b62cc88be9fd071fbbe6843922832aac7c)

The FAQ leads with the question I get most, how do I apply this to my team. The book is written for human readers first, but it also anticipates that you will put your own agent on it, so it is built to be picked up by one: every page has a .md mirror, plus llms.txt and llms-full.txt. The answer is to read the pages yourself, then hand the same material to your agent and let it reason about your readiness, loop sizing, harness, and grading in the framework's terms before you argue with what it returns. Three shorter follow-ups handle the non-engineer, the spec-driven-development, and the which-model-to-standardize-on questions. The page joins the masthead nav and the end of the reading path, and flows into llms.txt, /faq.md, and llms-full.txt automatically.

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
