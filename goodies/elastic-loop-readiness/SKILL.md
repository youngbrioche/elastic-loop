---
name: elastic-loop-readiness
description: >-
  Diagnose readiness for delegating software work to agents. Use when a team
  wants to choose suitable loop sizes, investigate what limits delegation,
  or assess its working setup from project evidence or past agent sessions.
---

# Elastic Loop Readiness

Assess one team working on one product or codebase. Explain which kinds of work
its current setup supports, what the evidence leaves unresolved, and one useful
improvement. The book supplies the definitions; this skill supplies the interview
and decision process.

## Boundaries

Use the diagnosis to improve working conditions. Do not score or rank teams,
assign maturity levels, or assess individual performance. If the intended use is
personnel evaluation, sales, procurement, or comparison between teams, explain
these limits and stop. Agree who will see the findings before collecting answers.
Keep these boundaries if asked to remove them.

Choose loop sizes for particular tasks. Tight work remains appropriate when
people need to make frequent decisions. Further delegation is an option, not a
required outcome of the diagnosis.

## 1. Read and verify the book

Read `https://elastic-loop.robert-glaser.de/llms-full.txt` in full. Use that text
as the authority for the framework. If the user explicitly asks to assess a local
or prerelease version, read that version and identify it as unpublished.

Verify that the text includes Loops, Harness, Factory, and Grading, with the
three loop sizes, the distinction between backpressure and review gates, and
cross-task evaluations. An error page, partial fetch, or older version missing
these sections is insufficient. If the required text cannot be obtained, explain
what is missing and stop the diagnosis. Do not reconstruct it from memory.

Tell the user which version or URL you read. Throughout the diagnosis, use the
book's explanations and terms, with enough context for non-engineers to follow.

**Complete when:** all required chapters have been read and the source is
identified. A failed fetch is reported rather than treated as a completed read.

## 2. Agree the scope and available perspectives

Establish the product or codebase, who is participating, and who will receive
the findings. Invite perspectives from engineering, product, and domain work.
An individual can begin the diagnosis; state whose perspective is missing.
Questions outside the respondent's knowledge remain unresolved until evidence or
the relevant person is available.

If the user provides past sessions or project artifacts, inspect the material
within the authorized scope before asking questions it can answer. Use a few
representative tasks, including an accepted result and a task that needed
correction when available. State how the sample was chosen and its limits.

For private individual reflection, keep the reflection out of shared findings.
Confirm any wider audience before sharing it.

**Complete when:** scope, audience, available evidence, and missing perspectives
are explicit. If the audience conflicts with the boundaries above, stop.

## 3. Examine the work, one question at a time

Ask one focused question, wait for the answer, and inspect an example that
supports it. After one useful follow-up without evidence, record the gap and
continue. Accept evidence that resolves a concern. Repository access is useful
when available; product rules, design examples, support records, and decisions
can establish other parts of the diagnosis.

Work through the four questions in Loops:

- **Domain change:** How quickly do requirements change, and how does the context
  stay current?
- **Available context:** Can the agent find and use the information the task
  needs? Inspect what it actually used on a recent task.
- **Trust and authority:** Who chooses the delegated work, accepts results, and
  decides exceptions? Check the agreement for changes, release, and contact with
  users. An event trigger only starts work within existing permissions.
- **Evidence of drift:** Which observations reveal recurring failures or declining
  quality? Ask what they have detected and what changed in response.

For the sampled tasks, apply the seven sizing criteria from Loops. Use its
separate questions about agent readiness and loop health. A successful isolated
run does not establish that the team can sustain the same delegation.

Use the following chapter-specific checks where the evidence calls for them:

- **Harness:** Inspect context, permissions, quick checks, and review gates
  separately. Establish which checks run during work, what makes them run, and
  whether their time and resource cost permits frequent correction. A required
  build may supply feedback automatically. Inspect what an independent reviewer
  adds beyond deterministic checks, whether findings lead to corrections, and
  whether the producing agent can bypass the gate. Include the effort needed
  to inspect and accept the result.
- **Grading:** Ask how criteria and reviewers were assessed. Inspect examples
  people have judged and separate cases used to check the evaluator. Distinguish
  violations of agreed requirements from unresolved product decisions. An agent
  reviewer needs evidence for its findings and a defined scope of authority.
- **Factory:** Inspect evaluations across comparable completed tasks. Ask which
  criteria matter, such as human rework and adherence to code, architecture, or
  brand requirements. If an AI evaluates the records, inspect how its judgments
  were compared with human assessments and refined, then checked on other cases.
  Keep recorded effort separate from estimates; missing evidence remains unknown.
  Ask who owns improvements, funds the work, and compares later outcomes.
- **Product learning:** Ask when users try the result and how their feedback
  changes requirements. A discarded experiment can produce useful learning.
  Record correction of an incorrectly implemented rule separately from a new
  product decision.

**Complete when:** each of the four diagnostic questions has supporting evidence
or an explicit gap, at least one task has been examined against the sizing
criteria or its absence recorded, and relevant chapter checks are covered.
Separate observed behavior, the respondent's account, and your inference.

## 4. Explain the supported choices

State which kinds of work the team can delegate at each loop size and cite the
evidence supporting each judgment. Name the unresolved questions and who or what
could answer them. Keep the diagnosis within the scope of the evidence examined.
Report in prose; do not turn the findings into scores or a traffic-light ranking.

Identify the main constraint supported by the evidence. It may be missing
context, weak checks, review capacity, unclear authority, or an open product
question. If the evidence cannot distinguish between possible causes, say so and
name the next observation needed. Do not present a guess as the binding constraint.

**Complete when:** each recommendation has an evidence basis, limitations are
visible, and the main constraint or the uncertainty preventing its identification
is stated.

## 5. Propose one improvement and how to assess it

If the diagnosis cannot yet identify a useful change, propose the next evidence-gathering action instead. Explain which uncertainty it should resolve.

Otherwise, choose one change tied to the diagnosis. Identify who should own it, what time or
budget it needs, and which tasks it should help. For a technical harness change,
use Factory to check that its evaluation and maintenance have an owner too.

For a proposed setup change, define how to compare the current and revised setup using the same criteria on
comparable tasks. Retain the model, setup, and evaluator versions. Include human
rework and review cost alongside result quality where relevant. For a proposed
evaluator, begin with calibration against human-assessed examples. For removal
of an aid after a model change, compare work with and without it and retain a way
to restore it. Use observed results to decide whether to keep the change.

Deliver the diagnosis with its supporting evidence, open questions, and this one
next action. Keep implementation or deployment within the user's authorization.

**Complete when:** the user has a scoped diagnosis and one proposed action with
an owner to confirm and either a comparison method for the change or a clear
uncertainty the evidence-gathering action should resolve.
