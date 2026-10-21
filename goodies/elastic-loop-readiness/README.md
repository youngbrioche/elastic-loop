# elastic-loop-readiness

A readiness diagnosis for teams delegating software work to AI agents. It reads
[The Elastic Loop](https://elastic-loop.robert-glaser.de), examines evidence from
the team’s work, and asks about missing information. The result explains suitable
loop sizes and proposes one improvement with a way to assess its effect.

The diagnosis covers context and permissions, inexpensive feedback during work,
independent review, and evaluations across completed tasks. It asks how an AI
evaluator was calibrated against human assessments, with criteria such as human
rework and adherence to product requirements. Findings concern working conditions;
the skill does not score or rank people or teams.

`SKILL.md` is the instruction source. Use it with an agent that can follow these
instructions and retrieve the book. The plugin provides installation in Claude
Code. This version requires the book’s Harness, Factory, and Grading chapters;
it must be released with the corresponding book update.

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

Give your agent the `SKILL.md` URL and ask it to follow the diagnosis. The skill
loads the book itself. Supplying only the book omits the interview procedure and
the conditions for using the diagnosis.
