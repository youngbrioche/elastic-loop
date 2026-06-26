# TODO

## Harness/Grading sharpenings to fold into the book (from talk session, June 2026)

> Do NOT auto-apply — Robert reviews these as curated diffs before they go into the public book. Both are sharpenings consistent with the existing framework, not reversals.

### Candidate 1 — The outcome grader is the product/domain judgment layer only

Sharpening for the Grading and/or Harness pages.

- [ ] Make explicit that deterministic checks (compilers, type checks, contrast ratios, no-horizontal-scroll, contracts) are *technical backpressure that runs at BUILD time*. They do NOT belong inside the outcome grader's rubric.
- [ ] Explain why this matters: putting deterministic checks in the grader conflates the two layers the whole framework rests on — technical vs product/domain. The outcome grader does what a compiler/linter cannot: judge whether the result is *right* and whether it is *slop*.
- [ ] State the operating rule plainly: deterministic backpressure first; reach for a non-deterministic judge only when nothing deterministic can decide.
- [ ] Tie-in: a UI/dashboard outcome-grader rubric should be PURE judgment — e.g. "the north-star metric reads as the most prominent", "doesn't read as the dashboard every BI tool ships by default" — with the deterministic checks assumed to have already passed upstream.

### Candidate 2 — Implicit vs explicit (soft vs structural) harness

Candidate new section on the Harness page.

- [ ] Frame the whole section around one test: **"can the agent route around it?"**
- [ ] Soft / in-band / advisory mechanisms live in the space the agent controls — AGENTS.md / CLAUDE.md and orchestrator-prompted subagents. The agent can read them, ignore them, even rewrite them. Real anecdote: an agent rewrote its own AGENTS.md (https://x.com/NiravJ3/status/2068451283389096095).
- [ ] Hard / out-of-band / enforced mechanisms — hooks, CI gates, sandboxes, permission walls — the agent cannot route around.
- [ ] Anchor to existing field terms so this doesn't read as invented jargon:
  - soft guardrails vs hard boundaries (Idan Habler)
  - behavioral gates vs structural gates (Reuben Brooks, building on Huntley's backpressure)
  - deterministic guardrails
- [ ] IMPORTANT CAVEAT to encode: this is still harness engineering, just the soft layer. Do NOT claim AGENTS.md "isn't harness" — that collides with Osmani / HumanLayer / O'Reilly, who all count instruction files and subagents as part of the harness.
- [ ] Defensible framing to land: AGENTS.md *is* harness, but its soft, manipulable, in-band layer. The enforcement axis runs *within* the harness, not at its boundary. Real judge independence (and enforcement generally) comes from the layer the agent can neither author nor bypass.
- [ ] Sources to cite when writing:
  - Habler — Building safer agents: soft guardrails, hard boundaries, and the layers between (https://idanhabler.medium.com/building-safer-agents-soft-guardrails-hard-boundaries-and-the-layers-between-14205d709b93)
  - Brooks — Structural backpressure beats smarter agents (https://reubenbrooks.dev/blog/structural-backpressure-beats-smarter-agents/)
  - Evil Martians — Stop writing rules in AGENTS.md (https://evilmartians.com/chronicles/stop-writing-rules-in-agents-md-use-agent-hooks-and-nano-staged-instead)
  - Addy Osmani — Agent harness engineering (https://addyosmani.com/blog/agent-harness-engineering/)
