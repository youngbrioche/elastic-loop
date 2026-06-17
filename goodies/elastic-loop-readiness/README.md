# elastic-loop-readiness

A Claude Code plugin that ships one skill: a readiness diagnosis for teams
delegating software work to AI agents. It reads [The Elastic Loop](https://elastic-loop.robert-glaser.de)
live, then grills a team about how much loop they can actually carry, which loop
sizes are available to them, and the one constraint gating the next. It gives a
readiness verdict, never a score, level, or maturity title.

The skill itself is `SKILL.md` in this directory. It works in any agent harness
that can read a URL; the plugin wrapper below is for native install in Claude
Code.

## Install in Claude Code

```
/plugin marketplace add youngbrioche/elastic-loop
/plugin install elastic-loop-readiness@elastic-loop
/reload-plugins
```

Then run it with `/elastic-loop-readiness:elastic-loop-readiness`, or just ask
for a loop-readiness diagnosis and let Claude pick it up.

## Keeping it current

The plugin carries an explicit `version` in `.claude-plugin/plugin.json`, so a
new release reaches you when that version is bumped. Third-party marketplaces do
not auto-update by default, so turn it on once: open `/plugin`, go to the
Marketplaces tab, select **elastic-loop**, and enable auto-update. After that,
Claude Code refreshes the marketplace on startup and prompts you to
`/reload-plugins` when a newer version is available.

To update by hand at any time, run `/plugin` and update the plugin from there.

## Use it without installing

You do not need the plugin to use the skill. Point any capable agent at
`SKILL.md` (or `https://elastic-loop.robert-glaser.de/llms-full.txt` plus the
instruction to run a loop-readiness diagnosis) and it will work the same way.
