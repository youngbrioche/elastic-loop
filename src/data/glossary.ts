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
    def: 'The resistance an agent works against while it builds, well before any review at the end: a failing test or type error on the technical side, an acceptance scenario or rubric on the product side. Some of it reaches the agent automatically as a signal in the loop; some it imposes on itself by following a discipline set at the start, like writing the failing test first and working until it goes green. The more of it you can encode, the longer you can let the loop run.',
    anchor: 'A red build is backpressure; the agent reads it and fixes the code. So are acceptance criteria: write them well and the agent works against your definition of good as it goes, instead of a person catching the miss at the end.',
  },
  'search-space': {
    term: 'Search space',
    def: 'The set of possible solutions a task allows. An agent does not translate a spec line by line; it samples from this space, pulled toward one solution by your context, or proposing a few in a planning step. Generating many on purpose and selecting the best is a discipline you opt into.',
    anchor: 'There are many valid ways to implement a story. The agent is choosing among them, not transcribing the one right answer.',
  },
  cynefin: {
    term: 'Cynefin',
    def: "A Welsh word (roughly 'kuh-NEV-in') for sorting problems by how knowable the answer is before you start: clear (one obvious right way), complicated (a right answer an expert can find), complex (no answer you can work out in advance, so you try something and learn from what happens), and chaotic (no stable cause and effect at all). Different kinds of problem call for different approaches.",
    anchor: 'Tying your shoes is clear, fixing an engine is complicated, taking a product into a market is complex. You already switch approaches for each without naming the buckets.',
  },
  'evaluation-function': {
    term: 'Evaluation function',
    def: 'The function that scores how good a candidate solution is, so the search can tell a better result from a worse one and steer toward it. Without one, generating many solutions tells you nothing about which to keep.',
    anchor: 'A test suite or a definition of done, read as a score the search aims for instead of a yes/no check at the very end.',
  },
  rubric: {
    term: 'Rubric',
    def: 'A written list of what “good” means for a kind of output, so the same standard can be applied to every result.',
    anchor: 'Acceptance criteria, reused as a grading checklist instead of a one-off.',
  },
  golden: {
    term: 'Golden',
    def: 'An output you have blessed as correct and keep around as the answer key, to compare new output against.',
    anchor: 'The trusted fixture in an integration test: the known-good result everything else is measured against.',
  },
  counterexample: {
    term: 'Counterexample',
    def: 'A plausible-looking but wrong output you keep on file, so the system learns never to produce that kind of thing again.',
    anchor: 'The bug you once shipped and then wrote a regression test for.',
  },
  'llm-judge': {
    term: 'LLM judge',
    def: 'A second AI you ask to grade the first one’s output against your criteria. It scales review, but has blind spots of its own.',
    anchor: 'A tireless reviewer who needs a clear checklist, or it will rubber-stamp anything that looks plausible.',
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
    def: 'Output that converges on the bland average of everything the model has ever read: plausible, smooth, and indistinguishable from anyone else’s.',
    anchor: 'The onboarding text that reads like every onboarding text ever written.',
  },
  'best-of-n': {
    term: 'Best-of-n',
    def: 'Generate several independent attempts at a task, then pick the best, instead of pushing one attempt through faster.',
    anchor: 'Spiking three solutions and choosing one, except cheap enough to do as a routine.',
  },
  'blackbox-artifact': {
    term: 'Blackbox artifact',
    def: 'Something you judge by how it behaves, not by reading how it was made.',
    anchor: 'A dependency you trust through its tests and its behavior, not by reading its source.',
  },
  generalization: {
    term: 'Generalization',
    def: 'Whether something keeps working on cases it was not specifically built or tested against.',
    anchor: 'Does the fix hold for the inputs you did not think of, not just the one in the ticket?',
  },
  'retained-feedback': {
    term: 'Retained feedback',
    def: 'Feedback only counts when it changes a later decision: an updated plan, a sharper test, a rejected option that stays rejected. The rest is noise, however expensive it was to produce.',
    anchor: 'A review comment matters only if it changes the next commit.',
  },
  harness: {
    term: 'Harness',
    def: 'The scaffold that turns a model into an agent, assembled from many parts. Among those: the loop it works in, the tools it can reach, how its context is managed as a run grows long (compression, retrieval), the hooks that fire on what it does, subagents, and guardrails. Backpressure and other resistance attach here, and beyond it.',
    anchor: 'An interactive agent tool like Claude Code, Codex, or Pi is a harness. You have been working inside one all along.',
  },
  'dark-factory': {
    term: 'Dark factory',
    def: 'The loose loop run to its end: agents delivering on their own against automated checks, with humans reviewing outcomes rather than every turn.',
    anchor: 'Named after lights-out manufacturing, where the line runs without people on the floor.',
  },

  // Lean / Toyota Production System lineage. These are the manufacturing terms
  // the harness discipline descends from; used in the "old discipline on a new
  // substrate" section on /harness. Anchors bridge to the software equivalent
  // rather than to "you already do this", since few readers run a factory.
  tpm: {
    term: 'Total productive maintenance (TPM)',
    def: 'Keeping every machine on a line in good working order continuously, so production does not stop for failures that routine care would have prevented.',
    anchor: 'Keeping your build scripts, docs, and dev setup current, so the next run does not break on something avoidable.',
  },
  spc: {
    term: 'Statistical process control (SPC)',
    def: 'Watching a process with statistics to catch it drifting out of its normal range, rather than inspecting every finished part by hand.',
    anchor: 'Tracking error rates or latency over time and reacting when the trend moves, instead of checking every single request.',
  },
  kaizen: {
    term: 'Kaizen',
    def: 'Continuous improvement: many small, steady changes to how the work is done, driven by the people doing it and by what each run of the process reveals.',
    anchor: 'A retrospective that actually changes how you work next time, repeated forever.',
  },
  andon: {
    term: 'Andon',
    def: 'A signal on a line that stays dark while things run normally and lights up only when something goes wrong, so attention lands where it is needed.',
    anchor: 'A pipeline that says nothing on green and pings you only on a failure.',
  },
  'poka-yoke': {
    term: 'Poka-yoke',
    def: 'Designing the work so a given mistake simply cannot happen, instead of relying on people to remember not to make it.',
    anchor: 'A type checker that refuses to compile the bug, rather than a comment asking you to be careful.',
  },
  jidoka: {
    term: 'Jidoka',
    def: 'Machines that detect an abnormality and stop on their own, handing the decision to a person rather than producing defects at full speed.',
    anchor: 'A check that halts the pipeline and escalates to a human when it hits something it should not decide alone.',
  },
  oee: {
    term: 'Overall equipment effectiveness (OEE)',
    def: 'A single measure of how productive a line really is, combining how often it runs, how fast it runs, and how much of its output is good.',
    anchor: 'Tracking not just how many pull requests ship, but how many survive review and hold up in production.',
  },
};
