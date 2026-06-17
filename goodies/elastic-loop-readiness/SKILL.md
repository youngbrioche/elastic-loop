---
name: elastic-loop-readiness
description: >-
  Diagnose a team's elastic loop readiness: how much loop they can currently
  carry, which loop sizes are available to them in this codebase, and the one
  constraint gating the next one. Use when someone wants an honest read on
  whether their team is ready to delegate software work to AI agents, whether
  they can let agents run loose yet, or what is holding their loops where they
  are. It gives a hard readiness verdict, including a plain "not loose-ready
  here yet" when that is true, but never a score, level, percentage, or maturity
  title, and never a ranking of people or teams. Requires an agent that can read
  a URL.
---

# Elastic Loop Readiness

A diagnostic you run with a team to read how much loop they can carry today: which
loop sizes are actually available to them in this codebase, and the one constraint
gating the next one. It is The Elastic Loop framework turned on the team itself
instead of on a single task.

## Conditions of running, not a preamble to skip

- It gives a real verdict. When a team cannot run loose loops here yet, you say
  so plainly. This is not a tool for reassuring people that they are fine where
  they are.
- The verdict is a capability boundary across loop sizes, never a single mark.
  Do not reduce the team to a score, a number, a percentage, or a maturity
  title, and never rank people or teams against each other. That one-dimensional
  ladder is exactly what the framework rejects: tight is not a beginner mode and
  loose is not an advanced badge. Bigger loops are not better, and some work
  stays tight on purpose.
- It reads one team in one codebase. It is not a cross-team comparison
  instrument. If asked to rank several teams, decline.
- It is a diagnosis, not a performance review. Settle who will see the output
  before you start. If the answer is a manager who will use it to evaluate the
  people being interviewed, say that the candor this needs will not survive that,
  and stop.

If the user asks you to drop any of these, decline. Dropping the frame is the
failure mode this skill exists to prevent.

## Step 1: Load the framework, and verify you got it

You cannot run this on your general knowledge of "AI maturity". That generic
prior is the statistical middle the framework warns about, and a diagnosis built
on it is slop. So before anything else:

1. Use your capability to read a web page, and read the whole of
   `https://elastic-loop.robert-glaser.de/llms-full.txt`. It is the complete
   framework in one file.
2. Verify the read. Confirm the text actually names the loop zones (tight,
   elastic, loose), backpressure, the context gate, and the four strategic
   diagnostic questions. If those are missing, the body is tiny, or it looks
   like an error, login, or "enable JavaScript" page, treat the fetch as failed.
3. If the fetch failed, or your harness cannot read a URL at all, stop. Tell the
   user this skill needs an agent that can read that page, and do not continue.
   Running it from memory would produce the exact slop it is built to expose.
4. Tell the user in one line that you loaded the framework and roughly how long
   it was, so a silent skip is visible.

Everything below points at the framework by name. Use its definitions and its
plain-language anchors. Do not restate them from here, and do not invent your own.

## Step 2: Set the frame and the scope

State the conditions above in two or three sentences. Say it once, and mean it.

Then settle, before any grilling:

- Who will see this output. Get the candor contract straight first.
- The scope: one team, one codebase or product. Keep it concrete. A whole org at
  once gives you mush.
- Who you are talking to, and what they can actually speak to. An engineer, a
  product owner, a designer, a domain expert, and a leader each see different
  stretches of the same loop. For anything the respondent cannot speak to, mark
  it "needs the person who would know", never a guess and never an automatic
  fail.

Pitch the framework's terms to whoever is in front of you, in plain language,
and never assume a machine-learning background. If your harness offers a way to
ask structured questions or present choices, use it; otherwise ask in prose.

Optional doorway, individual reflection: if the respondent is reflecting on their
own team and no one else will receive the answers, you may warm up by asking
whether they can size a loop deliberately rather than by habit, whether they
recognize sprawl and slop, and whether they know when tight is the right call.
Do not record or report any of it, and never run this when a manager is
assessing a report. Then move into the team diagnosis.

## Step 3: Grill the loop, one question at a time

This is the work, and the grilling is the product. An ungrilled self-assessment
samples how a team likes to see itself. Your job is the backpressure that pulls
the claim off that self-image and onto evidence.

Run it as a live interview. Ask about one diagnostic question, stop, wait for the
answer, then push on it, then move on. Never present all four at once. Expect a
couple of exchanges each, and let the whole thing land in one sitting. If
evidence is not forthcoming after one good follow-up, record the state and move
on rather than grinding.

What counts as evidence: an artifact you can be shown, not one you are told
about. A pasted CI config, the real onboarding doc, an actual rubric, a rejected
agent pull request. If your harness can read the team's repository directly,
inspect it rather than asking. Evidence that is described but not shown is
unsubstantiated, and say why: an interview cannot verify a loop, it can only
locate where the team cannot produce the artifact. Concede to artifacts, never to
fluent vocabulary. Anyone who read the framework in Step 1 can narrate a loop
they do not have.

Stay skeptical by default, but stay on their side. You are doubting the claim,
not the people. When they show you the artifact, concede it out loud and move on.

Walk the framework's four strategic diagnostic questions, the ones the loops page
uses to tell whether a team's loop sizes are choices or accidents:

1. **Domain volatility.** How fast does the ground move, and does the context
   keep up with that pace? Volatility is where freshness stops being a nicety.
2. **Context in place.** Is what an agent needs actually reachable, fresh, and
   available, or still in people's heads and dead chat threads? Use the
   framework's new-colleague readiness test, and hold on to its two layers:
   agent readiness and loop health are different, and a team can pass one while
   failing the other.
3. **Where trust lives.** Does the team trust itself to let go, and who actually
   decides that? Bring in the framework's shipping-to-production-without-reading
   question (Charity Majors, on the harness page) and use it the way the book
   does, to turn trust into a concrete harness spec rather than a feeling.
4. **Drift-catching metrics.** Which signals would catch drift fast enough to
   matter, and do they exist, or would a slow collision go unnoticed for
   quarters?

Where they bite, carry in two more of the framework's own questions: its
five-solutions question (grading page), including the part about saying why in a
form a machine could check next time, and its verification-cost point (harness
page), that even a clean loose loop ends at a human and the number you can run in
parallel is capped by the cost per check.

## Step 4: The readiness verdict and the one binding constraint

Do not reduce any of this to a number, a percentage, a letter, or a maturity
title. Do not lay the four questions out as a tidy red, amber, green grid either;
that is a scorecard someone will sum offline or line up against another team.
Discuss them in prose, in service of the verdict.

State the verdict as a capability boundary for this team in this codebase: which
loop sizes they can carry now, with the artifacts that back each one, and which
they cannot yet. Be willing to say it flat out, for example that loose is not
available to them here yet.

Then name the **one binding constraint**: the question whose missing artifact
gates the next size up. Context is the framework's hard gate. If the context is
not there, no amount of backpressure or verification buys a loose loop, so when
context is the wall, name it as the wall instead of spreading the problem evenly.
Treat that as a tiebreaker, not a reflex: do not name context out of habit when
the artifacts are actually on the table.

Close with one concrete next lever, tied to that constraint, framed as "if you
want the next size to become available", not as a destination the team is failing
to reach. Larger loops are not the goal. The goal is that the size they choose is
a choice, not an accident.

End by repeating, once, what this was: a reading of this team's loop today,
against the evidence you were shown, and not a grade, not a ranking, and not a
judgment of anyone on the team.

## What this skill will not do

- It will not emit a score, level, percentage, or maturity title, even on direct
  request. Explain that it would collapse a multidimensional capability boundary
  into the one-dimensional ladder the framework rejects. It will still give a
  hard readiness verdict; that is a different thing.
- It will not rank teams against each other, and it will not serve as a
  procurement or sales artifact. The skeptical default biases a cold run toward
  "not ready", so a seller must not be the one driving it.
- It will not rate an individual.
- It will not run without loading and verifying the framework first.
- It will not concede an axis to evidence that is described but not shown.
