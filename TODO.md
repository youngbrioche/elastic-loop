# TODO

## Harness/Grading sharpenings to fold into the book (from talk session, June 2026)

> Do NOT auto-apply — Robert reviews these as curated diffs before they go into the public book. Both are sharpenings consistent with the existing framework, not reversals.

### Candidate 1 — The outcome grader is the product/domain judgment layer only ✅ DONE

_Shipped 28 Jun 2026: Grading section "Keep the deterministic checks out of the rubric"._

Sharpening for the Grading and/or Harness pages.

- [ ] Make explicit that deterministic checks (compilers, type checks, contrast ratios, no-horizontal-scroll, contracts) are *technical backpressure that runs at BUILD time*. They do NOT belong inside the outcome grader's rubric.
- [ ] Explain why this matters: putting deterministic checks in the grader conflates the two layers the whole framework rests on — technical vs product/domain. The outcome grader does what a compiler/linter cannot: judge whether the result is *right* and whether it is *slop*.
- [ ] State the operating rule plainly: deterministic backpressure first; reach for a non-deterministic judge only when nothing deterministic can decide.
- [ ] Tie-in: a UI/dashboard outcome-grader rubric should be PURE judgment — e.g. "the north-star metric reads as the most prominent", "doesn't read as the dashboard every BI tool ships by default" — with the deterministic checks assumed to have already passed upstream.

### Candidate 2 — Implicit vs explicit (soft vs structural) harness ✅ DONE

_Shipped 28 Jun 2026: Harness section "Structural vs behavioral harness"._

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

### Candidate 3 — BinEval paper: empirical grounding for the grading page

Source: "Ask, Don't Judge: Binary Questions for Interpretable LLM Evaluation and Self-Improvement" — Cho, Chawla, Cai et al. (IBM Research), arXiv 2606.27226v1, 25 June 2026.

Core finding: decomposing evaluation into atomic yes/no questions (auto-generated from the task prompt) consistently outperforms holistic LLM scoring. G-Eval gives a factually wrong summary 5.0/5.0; BinEval scores it 1.57/5.0 by catching 4 of 7 specific errors. Holistic judges fail because they cannot hold disjunkte error types in attention simultaneously.

Three concrete integration points for the Grading page. Do NOT auto-apply — Robert reviews as curated diff.

- [ ] **"A rubric is not automatically truth" — add the numbers.** The current paragraph is a warning without evidence. BinEval provides the measurement: holistic judges rubber-stamp factually wrong output with perfect scores. One sentence + the G-Eval vs BinEval numbers as inline evidence, positioned under the bold caveat paragraph. Possible phrasing: "BinEval, which auto-generates atomic yes/no questions from the task prompt instead of asking for a holistic score, rated a factually wrong summary 1.57/5.0 — a summary G-Eval had just scored 5.0/5.0."

- [ ] **Rubric operationalization: mention binary decomposition as a concrete pattern.** The grading ladder describes rubrics as "written lists of what good means." BinEval shows a next-level pattern: rubric criteria generated automatically from the task prompt, turned into discrete checkable questions. Short optional addition after "Rubrics widen that to qualitative criteria…": what this looks like mechanically. Keeps the page practitioner-facing without going deep on the mechanism.

- [ ] **Add the prior check before "could you say which one is best?"** The closing question is good but missing one precondition. BinEval distinguishes instruction-constrained tasks (format, structure, constraint compliance — feedback-improvable, up to +17pp in their evals) from capability-constrained tasks (counting, ratio, syllabics — zero improvement regardless of grader quality). Before the best-of-n payoff question, add a sentence: "But there's a prior question — is the gap between best and worst even grading-addressable, or do all five fail for the same underlying capability reason no rubric can fix?" This sharpens the Best-of-n section and gives teams an earlier escape hatch before they invest in grading infrastructure for the wrong kind of task.

What NOT to include: the three-mechanism explanation (complexity reduction, variance reduction, coverage breadth) — too deep for this audience. The over-decomposition limitation on subjective dimensions (relevance) is already handled by the "human review stays irreplaceable" point.

## "Loop Engineering" cross-references to fold into the book (June 2026)

> Do NOT auto-apply — Robert reviews these as curated diffs before they go into the public book. Handoff for a fresh agent: you have all the context you need below; you do NOT need the conversation that produced this. Match the existing book voice (first-person "I", real external links, `<Term>` components where a defined term already exists, `status: seed`). Write nothing to `src/content/pages/*.mdx` without Robert's explicit go — draft the blocks, show them, let him decide.

### Source provenance (READ FIRST — applies to all three candidates below)

The trigger is a document titled "Loop Engineering: The Anthropic Playbook for Designing Systems That Prompt Your Agents", styled as an IEEE working note. It is NOT peer-reviewed. It is a HuaShu reformatting of Addy Osmani's open "Orange Book" guide *Loop Engineering: Stop Asking Me What It Is* (v260615, June 2026). The framework and quoted formulations are Osmani's; the generator/evaluator findings are Prithvi Rajasekaran's (Anthropic engineering); the enterprise case is Steve Kaliski's (Stripe, via the *How I AI* podcast). Some figures inside it are explicitly secondhand (the doc itself flags "around 90% of Claude Code written by itself" as rough reference). **Cite the primary humans (Osmani / Rajasekaran / Kaliski), NOT "the IEEE paper".** Citing a reformatted secondhand doc as a study would undercut the book's own "snippets aren't sources" discipline.

Loop Engineering, the term, surfaced independently in one week of June 2026 from Peter Steinberger (OpenClaw), Boris Cherny (Claude Code lead, Anthropic), and Addy Osmani (Google Chrome), named in writing by Osmani. Its core claim: stop prompting the agent; design the system that prompts it — "replacing oneself as the person who prompts the agent." It frames itself as a fourth layer above prompt/context/harness, decomposes one loop turn into five moves (discovery, handoff, verification, persistence, scheduling) realized by six parts (automations, worktrees, skills, connectors, sub-agents, memory).

### Candidate 1 — FAQ entry: "Isn't this just Loop Engineering?"

New Q&A on the FAQ page (`src/content/pages/faq.mdx`), same shape as the existing "Isn't this just spec-driven development?" and "Is Scrum dead?" entries.

- [ ] The relationship in one frame: Loop Engineering is the **vertical deep-bore into the Loose zone** — the single-operator, async, "dark factory" loop. The Elastic Loop is the **horizontal span across all three zones (tight / elastic / loose) and all roles**. Loop Engineering answers "how do I build one autonomous loop and keep it honest"; this book answers "how much loop should this task carry, and whose judgment closes it."
- [ ] The counter only this book can land: Loop Engineering optimizes the one-engineer loop — and this framework's position is that the one-engineer loop is *itself* a risk, because the judgment about what's worth building and whether the result holds up is spread across roles, not concentrated in whoever schedules the agent. (Tie to [Roles](/roles): "checking the output is only the last of those, and the first thing that gets lost.")
- [ ] Keep it a genuine counter, not a name-drop or a turf fight. Loop Engineering is good, convergent work — acknowledge the overlap honestly (see Candidates below), then draw the line where the book goes wider.
- [ ] Cite Osmani (blog/Substack, June 2026) as the primary; mention Steinberger and Cherny as the parallel originators.

### Candidate 3 — Grading page: generator/evaluator split as external validation of Failure Mode 1

Sharpening for the Grading page (`src/content/pages/grading.mdx`), at or near the existing "the grader can't be the maker" / "a rubric is not automatically truth" material.

- [ ] This is the single cleanest third-party confirmation available for the book's "whatever closes the loop must sit outside the thing being graded" thesis. Rajasekaran (Anthropic), building long-running agentic apps, found: an agent asked to grade its own output praises it (it sees its own chain of self-persuasion, not the result); tuning a *standalone skeptical evaluator* is far more tractable than making a generator self-critical; the evaluator should *act, not just read* (hooked to Playwright MCP — open the page, click, screenshot, judge behavior not intent); default stance is doubt ("assume broken until proven otherwise"); final say goes to a *fresh* model on an explicit stop condition.
- [ ] Name the lineage the doc gives: this is **maker-checker** (decades old in banking — the person entering a large transfer and the person approving it must differ) ported to generation/judgment, with a nod to the GAN framing (one network builds, one finds faults).
- [ ] One paragraph, one link to Osmani / Rajasekaran. Frame as "a practitioner finding that independently lands on the same structural rule," reinforcing — not replacing — the existing argument.

### Candidate 5 — Roles page: Loop Engineering as a contrast foil (exhibit, not opponent)

Margin note / short aside on the Roles page (`src/content/pages/roles.mdx`), fits near the "every role carries judgment nobody else can supply" thesis or the "when handoffs stop making sense" close.

- [ ] The move: the best public Loop Engineering material is almost entirely engineer-centric — its whole cast is the one developer writing themselves out of the loop, and its closing line is "stay the engineer, not just the one who presses go." Use that as an **exhibit**, not an adversary: it shows, unintentionally, what the conversation looks like when only engineers are in the room.
- [ ] The sharpening: Loop Engineering catalogs four silent costs — verification debt, comprehension rot, cognitive surrender, token blowout — and treats them as the *individual engineer's* discipline problem. This book reframes the same failures as an *organizational structure* problem (tie to the existing Charity Majors point: "AI wins and AI costs land with different people, so there is no natural feedback loop"). The single operator plus a pile of loops becomes an echo chamber where no one argues — which is precisely why judgment has to be distributed, not just disciplined.
- [ ] Keep it short and generous — the point proves the book's thesis *because* the Loop Engineering work is good and tightly engineer-scoped, not by attacking it.
