import { retext } from 'retext';
import retextSmartypants from 'retext-smartypants';
import { glossary } from '../data/glossary';

const SITE = 'https://elastic-loop.robert-glaser.de';

// Same typographic pass the HTML build runs via remark-smartypants, so the
// .md / llms.txt renditions match the site. dashes:false to never auto-create
// em/en dashes. There is no inline code in the prose, so this is safe to run
// over the whole document.
const typography = retext().use(retextSmartypants, { dashes: false });

function educate(text: string): string {
  return String(typography.processSync(text));
}

export interface MarkdownFrontmatter {
  title: string;
  description: string;
  kicker: string;
  updated: Date;
}

/**
 * Hardcoded replacement for the <StartList cards={[...]} /> component on the hub.
 * Parsing the cards prop out of MDX would be fragile; the five entries are stable.
 */
const START_LIST_MARKDOWN = [
  `- [Loops](${SITE}/loops.md): Tight, elastic, loose: three zones and how to size the loop for the task in front of you. None of the zones outranks the others, each just comes with different preconditions.`,
  `- [Why](${SITE}/why.md): Why stretch a loop past tight at all, and is the risk worth it? The payoff comes down to how well you can judge what comes back. The economic and technical case, now with measurement behind it.`,
  `- [Harness](${SITE}/harness.md): The backpressure layers in full: what holds agent output honest against the system, and what holds it honest against the product.`,
  `- [Grading](${SITE}/grading.md): Outcome grading is the new specification. Tests, rubrics, scenarios, golden examples of known-good output, and why a rubric is not automatically truth.`,
  `- [Roles](${SITE}/roles.md): Every role carries judgment about agent work that nobody else can supply. What engineers, product people, designers, domain experts, the people who run the process, and leaders each bring to the loop.`,
].join('\n');

/**
 * Self-closing visual components are replaced with a textual figure description
 * so the markdown rendition stays self-contained for agents.
 */
const COMPONENT_REPLACEMENTS: [RegExp, string][] = [
  [
    /<MasterGrid[\s\S]*?\/>/g,
    '*[Figure: The master grid. Columns are loop size (tight, elastic, loose); rows are backpressure depth (full, technical only, no automated checks). Slop at scale sits at loose × technical-only, sprawl at scale at loose × no-checks. A context floor rises beneath the grid: loose only opens once the context can serve itself.]*',
  ],
  [
    /<Squeeze[\s\S]*?\/>/g,
    "*[Figure: The squeeze. Context positions the agent's start outside the statistical middle before any work happens; product and domain backpressure pulls the output the rest of the way toward your specific solution.]*",
  ],
  [
    /<LoopSizes[\s\S]*?\/>/g,
    '*[Figure: Three sizes of the same loop. Tight: minutes, in the loop at every turn. Elastic: hours, at checkpoints on the edge. Loose: days, only at the outcome gate.]*',
  ],
  // Hero carries no prose of its own (title comes from the header block).
  [/<Hero[\s\S]*?\/>/g, ''],
  // StartList: hardcoded markdown list, see above.
  [/<StartList[\s\S]*?\/>/g, START_LIST_MARKDOWN],
];

/**
 * JSX wrapper tags whose children are plain markdown we want to keep.
 * Opening tags may span multiple lines and carry props.
 */
const WRAPPER_TAGS = ['PageIntro', 'CardGrid', 'div'];

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function mdxToMarkdown(rawMdx: string, fm: MarkdownFrontmatter): string {
  let body = rawMdx;

  // 1. Strip YAML frontmatter.
  body = body.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');

  // 2. Strip import lines.
  body = body.replace(/^import\s.*$/gm, '');

  // 3. Replace known self-closing components.
  for (const [pattern, replacement] of COMPONENT_REPLACEMENTS) {
    body = body.replace(pattern, replacement);
  }

  // 3b. Inline <Term id="x">label</Term>: keep the label inline, collect the
  // ids so we can append their definitions as a glossary section below.
  const termIds = new Set<string>();
  for (const m of body.matchAll(/<Term\s+id="([^"]+)"\s*>/g)) {
    termIds.add(m[1]);
  }
  body = body.replace(/<Term\s+id="[^"]+"\s*>/g, '').replace(/<\/Term>/g, '');

  // 4. Drop wrapper tags but keep their markdown children.
  for (const tag of WRAPPER_TAGS) {
    // Opening tag, possibly with multiline props.
    body = body.replace(new RegExp(`<${tag}\\b[^>]*?>`, 'g'), '');
    // Closing tag.
    body = body.replace(new RegExp(`</${tag}>`, 'g'), '');
  }

  // 5. Collapse runs of blank lines.
  body = body.replace(/\n{3,}/g, '\n\n').trim();

  // 5b. Typographic punctuation, matching the HTML build. Applied to the prose
  // only (which carries no standalone `---` thematic breaks or inline code), so
  // retext leaves the markdown scaffolding below byte-exact.
  body = educate(body);

  // 6. Prepend the header block.
  const header = [
    `# ${fm.title}`,
    '',
    `> ${educate(fm.description)}`,
    '',
    `Part of The Elastic Loop · ${SITE} · last updated ${formatDate(fm.updated)}`,
    '',
    '---',
    '',
  ].join('\n');

  // 7. Append a glossary of the terms used on this page, so the markdown /
  // llms.txt rendition keeps the definitions the tooltips carry on the site.
  let glossarySection = '';
  if (termIds.size > 0) {
    const lines = [...termIds]
      .map((id) => glossary[id])
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((e) => `- **${e.term}**: ${e.def}${e.anchor ? ` ${e.anchor}` : ''}`);
    if (lines.length > 0) {
      glossarySection = `\n## Glossary\n\n${lines.join('\n')}\n`;
    }
  }

  return `${header}${body}\n${glossarySection}`;
}
