// The section cards on the book's reading path. Single source for both the
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
  { href: '/why', num: '02', title: 'Why', text: 'Why delegate more work, and how can you tell whether it pays off? Assess quality, review effort, and the cost of the whole task.' },
  { href: '/harness', num: '03', title: 'Harness', text: 'The context, feedback, boundaries and review that let an agent work between human decisions.' },
  { href: '/factory', num: '04', title: 'Factory', text: 'How a team organizes agent work and invests in improvements supported by evaluations across tasks.' },
  { href: '/grading', num: '05', title: 'Grading', text: 'How tests, reviews and product feedback work together, and how to evaluate the reviewers.' },
  { href: '/roles', num: '06', title: 'Roles', text: 'How engineers, product people, designers, domain experts, and leaders contribute to agent work.' },
];
