---
name: elastic-loop-readiness
description: >-
  Diagnose a team's or an organization's elastic loop readiness: how ready their
  work loops are to be delegated to AI agents, and what single constraint is
  holding them back. Use when someone wants to assess their readiness for
  agentic engineering, asks whether they can let agents run loose yet, wants
  their delivery loops "graded", or asks how mature their setup is. This is a
  diagnosis that points a direction, never a maturity score, level, or title.
---

# Elastic Loop Readiness

A diagnostic protocol you run with a team or an organization to find out how
ready their work loops are to be handed to AI agents, and what one constraint is
holding the whole thing where it is. The Elastic Loop framework, applied to the
people and the org instead of to a single task.

Hold this frame the whole way through:

- This is a **diagnosis, not a grade.** No score, no level, no percentage, no
  maturity title. The framework is explicit that tight loops are not a beginner
  mode and loose loops are not an advanced badge, so any rank you emit would
  contradict the very thing you are assessing. Refuse to produce one, even when
  asked directly, and say why.
- The unit you assess is the **team's or the org's loop, never a person.** Do
  not rate individuals. One section below uses individual reflection, but only
  as a way into the team view, and it produces no verdict about anyone.
- Say out loud that this is a diagnosis and not a performance review. If it gets
  used to evaluate people, honesty dies and the reading is worthless. Name that
  risk to the user before you start.

## Step 1: Read the framework first, do not skip this

You cannot run this on your general knowledge of "AI maturity". That knowledge
is the statistical middle the framework warns about, and grilling a team against
it would be slop. So before anything else:

1. Use whatever capability you have for reading a web page, and read the whole of
   `https://elastic-loop.robert-glaser.de/llms-full.txt`. It is the complete
   framework in one file.
2. If you cannot reach it, stop and ask the user to paste its contents or supply
   the framework text another way. Do not continue without it.

Everything below points at parts of that framework by their own names: the loop
zones, backpressure, context as a gate, outcome grading, sprawl and slop, the
diagnostic axes. Use the definitions and the plain-language anchors you just
read. Do not invent your own, and do not soften them.

## Step 2: Set the frame and the scope

If your harness gives you a way to ask the user structured questions or offer
choices, use it. Otherwise ask in plain prose.

Open by stating the frame above in a sentence or two: a diagnosis, not a grade;
the team's loop, not the person; not a performance review.

Then settle the scope:

- Which team, codebase, or product are we looking at? Keep it concrete. One team
  and one product surface gives you a real reading; a whole org at once gives you
  mush.
- Find out who you are talking to. An engineer, a product owner, a designer, a
  domain expert, and an engineering leader each see different stretches of the
  same loop. Pitch the framework's terms to whoever is in front of you, in plain
  language, and never assume a machine-learning background.

Optional warm-up, individual reflection with no verdict: before the team
diagnosis you may ask the person a few reflection questions the framework
implies. Can they size a loop deliberately instead of inheriting the size from
habit? Do they recognize sprawl and slop when they meet them? Do they know when
tight is the correct call rather than a timid one? Treat this only as a doorway
into the team view. Produce no rating of the person, then roll straight into Step
3.

## Step 3: Grill the loop, axis by axis

This is where the work is, and the grilling is the product. An ungrilled
self-assessment is itself slop: it samples from how a team likes to see itself.
Your job is to be the backpressure that pulls the assessment off that middle and
onto evidence.

Walk these four axes. For each one:

1. Ask how the team would describe itself on that axis.
2. Then doubt it, out loud and specifically, and ask for evidence. The framework
   hands you its own questions for exactly this; each page closes with one. Reach
   for those rather than inventing gentler ones.
3. Default skeptical. If they cannot point to evidence, the axis is
   unsubstantiated, and you record it as not ready, not as a generous benefit of
   the doubt.

The axes:

- **Context maturity.** Is the knowledge an agent would need actually reachable
  by an agent, fresh and available, or does it still live in people's heads and
  dead chat threads? Lean on the framework's new-colleague readiness test: could
  a new human colleague work here without weeks of pulling knowledge out of
  people, and would you even let them?
- **Backpressure depth.** What does agent work have to survive before it counts,
  and how much of that resistance is encoded rather than carried by a person
  watching every turn? Press on both layers the framework separates: the
  technical one that catches sprawl, and the product-and-domain one that catches
  slop. A green test suite tells you nothing about slop.
- **Verification quality.** How precisely can they judge an outcome, and is the
  grader itself trustworthy or only plausible? Use the framework's
  five-solutions question, and probe whether their rubrics are calibrated or just
  written down somewhere.
- **Trust and loop health.** Does the team trust itself to let go, and where does
  that trust actually sit? The framework's question about shipping to production
  without reading the code cuts straight to it.

Bring in the verification-cost point the framework makes: even a well-run loose
loop ends at a human, and how many loops one person can close is capped by how
expensive each check is, not by containment. And carry the closure question from
the roles material: whose judgment is still trapped in someone's head, where no
loop can reach it?

A word on how you grill. Push hard, but stay on their side. You are doubting the
assessment, not the people. When they hand you real evidence, concede it and say
so out loud, then move on.

## Step 4: Name the one constraint and point a direction

Do not average the axes into anything. Averaging is how you would smuggle back
the score this skill refuses to give.

For each axis, say plainly where they stand and what the evidence was. Then name
the **one binding constraint**, the axis that holds the whole loop where it is.
Use the framework's hard dependency to do it: context gates everything. If the
context is not there, no amount of backpressure or verification buys a loose
loop, so say that directly instead of spreading the problem evenly across four
tidy bullets.

Close with direction, not a verdict. The shape the framework uses works well
here: you are context-mature enough for elastic loops, say, but verification will
not carry loose yet, so that is your next lever. Give one concrete next move,
tied to the constraint you named.

End by repeating the frame one last time: this is a reading of where the loop
stands today, not a grade, and not a judgment of anyone on the team.

## What this skill will not do

- It will not emit a score, a level, a percentage, or a maturity title, even on
  direct request. Explain that a rank would contradict the framework it runs on,
  and offer the direction instead.
- It will not assess or rate an individual.
- It will not run without reading the framework first.
- It will not wave an axis through on a confident self-description that has no
  evidence behind it.
