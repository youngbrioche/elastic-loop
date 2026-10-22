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
    def: 'Assessing a result against explicit criteria that a person or machine can apply consistently.',
    anchor: 'Checking a completed feature against its acceptance criteria is one familiar form.',
  },
  backpressure: {
    term: 'Backpressure',
    def: 'Quick, inexpensive feedback from checks built into the agent’s workflow. As the agent works, these checks report problems it can correct immediately.',
    anchor: 'When the agent tries to save a code change as a commit, an automatic check rejects a variable name that breaks the project’s naming rules. The agent corrects the name. Its next commit attempt triggers the check again.',
  },
  'search-space': {
    term: 'Search space',
    def: 'The set of candidate solutions an agent can explore for a task.',
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
    def: 'A guide that names the qualities to assess and describes what meeting each criterion looks like.',
    anchor: 'For a dashboard, it might require the reason for each case’s priority to be visible and supported by the case details.',
  },
  golden: {
    term: 'Golden',
    def: 'An accepted result retained as a reference for assessing later results.',
    anchor: 'An approved support reply shows the tone and level of detail expected in later replies.',
  },
  'counterexample': {
    term: 'Counterexample',
    def: 'A plausible but unsuitable result retained with the reason it fails the relevant criteria. It helps assess later results and the reviewer itself.',
    anchor: 'A polished dashboard that hides a case the agreed rule marks as urgent shows what the reviewer should reject.',
  },
  'judge-evaluator': {
    term: 'Judge/Evaluator',
    def: 'An AI used to assess work against defined criteria. Check its judgments against examples evaluated by people who understand the task.',
    anchor: 'For a dashboard, it can assess whether the explanation of each case’s priority is supported by the case details.',
    match: ['evaluator'],
  },
  'reward-hacking': {
    term: 'Reward hacking',
    def: 'When an agent achieves a high score by exploiting the scoring rules while failing the intended task.',
    anchor: 'Code might return a hardcoded answer that passes one test but fails when the input changes.',
  },
  holdout: {
    term: 'Holdout',
    def: 'Cases set aside while developing a solution or adjusting an evaluator, then used to assess it on unfamiliar cases.',
    anchor: 'Keep some support cases separate while refining the dashboard, then check how it handles them.',
  },
  drift: {
    term: 'Drift',
    def: 'In this book, the gradual movement of work away from its intended requirements or design.',
    anchor: 'Successive changes introduce conflicting design choices across the product.',
  },
  'statistical-middle': {
    term: 'Slop',
    def: 'Plausible, generic work that misses what makes it fit a particular product or task. It can ignore local coding conventions, architectural decisions, or brand requirements.',
    anchor: 'A dashboard invents visual styles despite an existing set of approved components.',
    match: ['the statistical middle'],
  },
  'best-of-n': {
    term: 'Best-of-n',
    def: 'Generate several independent attempts at a task, then select the best according to agreed criteria.',
    anchor: 'Trying 3 solutions and comparing their quality and cost before choosing one.',
  },
  'blackbox-artifact': {
    term: 'Blackbox artifact',
    def: 'A result assessed through its observable behavior without inspecting its internal implementation.',
    anchor: 'Trying the dashboard with representative cases before examining its code.',
  },
  generalization: {
    term: 'Generalization',
    def: 'The ability to work on cases beyond those used to develop or adjust a solution.',
    anchor: 'Does the fix also handle inputs beyond those described in the ticket?',
  },
  'retained-feedback': {
    term: 'Retained feedback',
    def: 'Useful feedback carried forward into a plan, test, decision record, or guidance for later work.',
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
    anchor: 'For a familiar defect, agents investigate, repair, and review the change before an automatic release under the team’s agreed policy.',
  },

  // Lean / Toyota Production System lineage. These are the manufacturing terms
  // used as precedents in /factory. Anchors bridge to the software equivalent
  // rather than to "you already do this", since few readers run a factory.
  tpm: {
    term: 'Total productive maintenance (TPM)',
    def: 'An approach in which operators, maintenance staff, and other teams share responsibility for keeping equipment effective and preventing recurring losses.',
    anchor: 'A team maintains its build scripts and setup instructions so avoidable failures do not recur.',
  },
  'spc': {
    term: 'Statistical process control (SPC)',
    def: 'Using statistical methods to compare a process with a historical baseline and calculated control limits. It requires comparable measurements and a method suited to the data.',
    anchor: 'A control chart helps identify when failure rates depart from the variation expected across comparable tasks.',
  },
  kaizen: {
    term: 'Kaizen',
    def: 'Continuous improvement: many small, steady changes to how the work is done, driven by the people doing it and by what each run of the process reveals.',
    anchor: 'A retrospective that leads to a change whose effect the team examines in subsequent work.',
  },
  andon: {
    term: 'Andon',
    def: 'A signal that makes a production problem visible to the people who can respond.',
    anchor: 'A failed pipeline check alerts the person responsible and shows which check failed.',
  },
  'poka-yoke': {
    term: 'Poka-yoke',
    def: 'Designing a process to prevent a particular mistake or detect it early enough to correct it.',
    anchor: 'A type checker rejects code that passes text where a number is required.',
  },
  jidoka: {
    term: 'Jidoka',
    def: 'Detecting an abnormality and stopping the process so the problem can be addressed.',
    anchor: 'A check that halts the pipeline and escalates to a human when it hits something it should not decide alone.',
  },
  oee: {
    term: 'Overall equipment effectiveness (OEE)',
    def: 'A manufacturing measure that multiplies availability during planned production time, speed relative to the equipment’s ideal rate, and the share of acceptable output.',
    anchor: 'For software work, examine delivery and quality together using measures suited to the work.',
  },
};
