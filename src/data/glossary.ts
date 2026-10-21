/**
 * Central glossary for the Elastic Loop site.
 *
 * The site is written for engineers AND for product people, designers, and
 * domain experts who do not come from a machine-learning background. Many of
 * the load-bearing terms (outcome grading, rubric, golden, counterexample,
 * reward hacking, ...) read as opaque jargon to a regular Spring Boot dev or a
 * PO. Each entry pairs a plain-language definition with an "anchor": something
 * the reader already does, so the term lands as a label for the familiar
 * rather than a new wall.
 *
 * Used by <Term id="..."> for inline tooltips, and by lib/markdown.ts to append
 * a Glossary section to the .md / llms.txt renditions so agents keep the
 * definitions too.
 */

export interface GlossaryEntry {
  /** Canonical display name shown in the tooltip header and the .md glossary. */
  term: string;
  /** Plain-language definition. No jargon, no em dashes. */
  def: string;
  /** "You already do this as ..." bridge for a dev or PO. Optional. */
  anchor?: string;
  /**
   * Extra surface forms the glossary-link linter should treat as this term, on
   * top of the canonical `term` (plurals, hyphen/space variants, and any
   * "(parenthetical)" are already handled automatically). Use for irregular
   * forms, e.g. ['generalize'] for "Generalization". See
   * scripts/check-glossary-links.mjs.
   */
  match?: string[];
}

export const glossary: Record<string, GlossaryEntry> = {
  'outcome-grading': {
    term: 'Outcome grading',
    def: 'Judging whether a result is good, precisely enough that the judgment can be applied again and again, by a person or a machine.',
    anchor: 'You already do the simplest version every time you write a test or a definition of done.',
  },
  backpressure: {
    term: 'Backpressure',
    def: 'Quick, inexpensive feedback an agent can act on during its work cycle. The feedback has to arrive soon enough to steer the work, with a cost in time, tokens, and context that the loop can afford.',
    anchor: 'A focused test reports the failing case, and the agent fixes it. A small product check flags that an urgent case is missing from a dashboard, and the agent adjusts the view.',
  },
  'search-space': {
    term: 'Search space',
    def: 'The set of possible solutions a task allows. Context and feedback help an agent choose among them. You can also ask it to propose several candidates for comparison.',
    anchor: 'Several implementations can satisfy the same requirement. Constraints help narrow the choice.',
  },
  'cynefin': {
    term: 'Cynefin',
    def: 'A framework for matching an approach to a situation: ordered situations have cause and effect that are clear or discoverable through analysis; complex situations need exploration; chaotic situations need action to establish stability.',
    anchor: 'One product can contain precise coding rules and unresolved questions about what users need.',
  },
  'evaluation-function': {
    term: 'Evaluation function',
    def: 'A method for scoring a proposed result against defined criteria.',
    anchor: 'A test suite or checklist used to assess successive attempts.',
  },
  rubric: {
    term: 'Rubric',
    def: 'A written list of what “good” means for a kind of output, so the same standard can be applied to every result.',
    anchor: 'Acceptance criteria reused to assess several results.',
  },
  golden: {
    term: 'Golden',
    def: 'An accepted result retained as a reference for assessing later results.',
    anchor: 'An approved result you can compare with later attempts.',
  },
  'counterexample': {
    term: 'Counterexample',
    def: 'A plausible but unsuitable result retained with the reason it fails the relevant criteria. It helps assess later results and the reviewer itself.',
    anchor: 'A previously shipped defect can supply a regression case; a rejected design may need reconsideration if requirements change.',
  },
  'llm-judge': {
    term: 'LLM judge',
    def: 'A second AI you ask to grade the first one’s output against your criteria. It scales review, but has blind spots of its own.',
    anchor: 'A reviewer assessed against examples people have already evaluated, including plausible answers that should be rejected.',
  },
  'reward-hacking': {
    term: 'Reward hacking',
    def: 'When the agent learns to satisfy the letter of your grader while missing the point. The AI version of teaching to the test.',
    anchor: 'Code that passes the test by hardcoding the expected value instead of actually solving the problem.',
  },
  holdout: {
    term: 'Holdout',
    def: 'Test cases you deliberately keep out of the agent’s reach, so it cannot tune itself to pass an exam it has already seen.',
    anchor: 'Keeping the real exam questions out of the study guide.',
  },
  drift: {
    term: 'Drift',
    def: 'Slow movement away from what is correct or wanted, over time, without any single obvious break.',
    anchor: 'The product or codebase quietly getting less coherent release after release.',
  },
  'statistical-middle': {
    term: 'The statistical middle (slop)',
    def: 'Plausible, generic work that misses what makes it fit a particular product or task. It can ignore local coding conventions, architectural decisions, or brand requirements.',
    anchor: 'A dashboard invents visual styles despite an existing set of approved components.',
    match: ['slop'],
  },
  'best-of-n': {
    term: 'Best-of-n',
    def: 'Generate several independent attempts at a task, then select one using agreed criteria.',
    anchor: 'Trying 3 solutions and comparing their quality and cost before choosing one.',
  },
  'blackbox-artifact': {
    term: 'Blackbox artifact',
    def: 'A result assessed through its observable behavior.',
    anchor: 'Assessing a dependency through tests and observed behavior.',
  },
  generalization: {
    term: 'Generalization',
    def: 'Whether something keeps working on cases it was not specifically built or tested against.',
    anchor: 'Does the fix also handle inputs beyond those described in the ticket?',
  },
  'retained-feedback': {
    term: 'Retained feedback',
    def: 'Useful feedback carried forward into a plan, test, decision record, or guidance for later work. Evaluate its effect on comparable tasks before claiming improvement.',
    anchor: 'Keep the reason for a rejected option and the conditions that would justify reconsidering it.',
  },
  'harness': {
    term: 'Harness',
    def: 'The software around a model that lets it act, inspect results, and continue working: its execution loop, tools, context management, and controls. Harness engineering also covers checks and review arrangements across technical systems.',
    anchor: 'An agent that can read files, run checks, and correct its work uses a harness.',
  },
  'dark-factory': {
    term: 'Dark factory',
    def: 'A term for highly automated delivery with limited direct human intervention. It describes one automation arrangement within a software factory.',
    anchor: 'The team’s software factory can support tight, elastic, and loose loops for different tasks.',
  },

  // Lean / Toyota Production System lineage. These are the manufacturing terms
  // used as precedents in /factory. Anchors bridge to the software equivalent
  // rather than to "you already do this", since few readers run a factory.
  tpm: {
    term: 'Total productive maintenance (TPM)',
    def: 'Keeping every machine on a line in good working order continuously, so production does not stop for failures that routine care would have prevented.',
    anchor: 'Keeping your build scripts, docs, and dev setup current, so the next run does not break on something avoidable.',
  },
  'spc': {
    term: 'Statistical process control (SPC)',
    def: 'Using statistical methods to compare a process with a historical baseline and calculated control limits. It requires comparable measurements and a method suited to the data.',
    anchor: 'A control chart can help investigate changes in failure rates across comparable tasks. An ordinary trend chart alone does not establish process control.',
  },
  kaizen: {
    term: 'Kaizen',
    def: 'Continuous improvement: many small, steady changes to how the work is done, driven by the people doing it and by what each run of the process reveals.',
    anchor: 'A retrospective that leads to a change whose effect the team examines in subsequent work.',
  },
  andon: {
    term: 'Andon',
    def: 'A signal that makes a production problem visible to the people who can respond.',
    anchor: 'A pipeline that says nothing on green and pings you only on a failure.',
  },
  'poka-yoke': {
    term: 'Poka-yoke',
    def: 'Designing a process to prevent or detect a particular mistake.',
    anchor: 'A type checker rejects code that passes text where a number is required.',
  },
  jidoka: {
    term: 'Jidoka',
    def: 'Detecting an abnormality and stopping the process so the problem can be addressed.',
    anchor: 'A check that halts the pipeline and escalates to a human when it hits something it should not decide alone.',
  },
  oee: {
    term: 'Overall equipment effectiveness (OEE)',
    def: 'A single measure of how productive a line is, combining how often it runs, how fast it runs, and how much of its output is good.',
    anchor: 'In software, examine delivery together with review results and production quality; these require measures suited to software work.',
  },
};
