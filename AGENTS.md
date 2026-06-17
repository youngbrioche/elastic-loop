# AGENTS.md

## General

- multiple agents may work in parallel on this repo
- if you need a dev server, check if one is already running
- decide if you need a worktree to isolate your changes from other agents working in parallel
- write commit messages in English, commit and push your work while you go
- before committing, check git status: another agent may have uncommitted edits in the same files. Stage only the hunks you changed, never git add <file> wholesale, and pass explicit paths so you never sweep in someone else's work
- never force-push or rewrite already-pushed history on `main`; another agent may have committed on top of yours
- when doing frontend work: iterate using the agent-browser cli, until the work is done

## Releasing

This site is hosted using GitHub pages. You are responsible for releases.

The changelog has one source: `src/data/changelog.json`. It feeds the site
footer, the `/changelog.md` agent route, and the human `CHANGELOG.md`, so all
three stay in sync. Do NOT hand-edit `CHANGELOG.md` — the build fails if it
drifts from the JSON.

For public, notable changes:
- add an entry at the top of `src/data/changelog.json`. Required: `date`,
  `title`, and a one-sentence `text` teaser. For committed changes also add the
  full `commit` hash and a richer `body` (3 sentences max) for CHANGELOG.md.
- run `npm run changelog` to regenerate CHANGELOG.md, then commit it together
  with the JSON.
- the changelog teaser in the footer should only show 3 items max, never more.
