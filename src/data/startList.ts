// The five section cards on the hub's reading path. Single source for both the
// <StartList> component on the HTML page (src/content/pages/index.mdx) and the
// markdown list in the agent rendition (src/lib/markdown.ts), so the two cannot
// drift.

export interface StartListCard {
  href: string;
  num: string;
  title: string;
  text: string;
}

export const startListCards: StartListCard[] = [
  { href: '/loops', num: '01', title: 'Loops', text: 'Tight, elastic, loose: three zones and how to size the loop for the task in front of you. None of the zones outranks the others, each just comes with different preconditions.' },
  { href: '/why', num: '02', title: 'Why', text: 'Why stretch a loop past tight at all, and is the risk worth it? The payoff comes down to how well you can judge what comes back. The economic and technical case, now with measurement behind it.' },
  { href: '/harness', num: '03', title: 'Harness', text: 'The backpressure layers in full: what holds agent output honest against the system, and what holds it honest against the product.' },
  { href: '/grading', num: '04', title: 'Grading', text: 'Outcome grading is the new specification. Tests, rubrics, scenarios, golden examples of known-good output, and why a rubric is not automatically truth.' },
  { href: '/roles', num: '05', title: 'Roles', text: 'Every role carries judgment about agent work that nobody else can supply. What engineers, product people, designers, domain experts, the people who run the process, and leaders each bring to the loop.' },
];
