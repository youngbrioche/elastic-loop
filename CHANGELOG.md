# Changelog

## 17 Jun 2026 — Agent rendition kept in sync with the site

[`95aa3f2`](https://github.com/youngbrioche/elastic-loop/commit/95aa3f2)

The `.md` and `llms.txt` renditions now carry figure descriptions for the two new diagrams instead of leaking their raw component tags, so agents reading grading.md, roles.md, and llms-full.txt see the same figures human readers do. The Markdown conversion now fails the build if any component, wrapper, or glossary term ever drifts out of it again, rather than silently shipping a degraded rendition.

## 17 Jun 2026 — Two new diagrams on Grading and Roles

[`9fd3e9a`](https://github.com/youngbrioche/elastic-loop/commit/9fd3e9a09c46bed8d2c0b50eb7ad0108b2f55218)

Grading gains a two-iteration-layers diagram showing the inner agent loop iterating fast over the output and the outer human loop iterating slowly over the grading material, with output flowing out to evaluation and sharpened graders flowing back in. Roles gains a stations-versus-loop diagram contrasting the old PO→UX→Eng→QA→Ops handoff line with the same people gathered around a single loop, each labelled with the backpressure they supply. Both diagrams use the site's design tokens and follow the master grid's responsive scroll pattern.

## 16 Jun 2026 — Loop time horizons retuned to METR's evidence

[`5df3e0c`](https://github.com/youngbrioche/elastic-loop/commit/5df3e0cfe11f17acd40b8f9c420f57e423bb0c84)

The loop zones now read minutes to hours for elastic and multiple hours for loose, replacing the earlier "hours" and "days" framing. This follows METR's time-horizon data, which puts the current upper limit of unattended agent work at around 16 hours rather than days. The change touches the master grid, the loop-sizes visual, and the prose on the index, loops, and harness pages.
