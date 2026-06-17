/**
 * Rough token estimates for agent budgeting, surfaced in llms.txt and at the
 * top of every .md route so an agent can size a fetch before making it.
 *
 * This is the chars/4 heuristic, not a real tokenizer. The numbers are always
 * rendered with a leading `~`: they are deliberate estimates. A real tokenizer
 * (tiktoken/gpt-tokenizer) would tighten the number against GPT, but not against
 * Claude — so it would buy precision we cannot honestly claim while adding a
 * build dependency. The heuristic stays.
 */
export function estimateTokens(text: string): number {
  return Math.round(text.length / 4);
}

/** Human/agent-readable budget, e.g. `~3.4k tokens` or `~420 tokens`. */
export function tokenBudget(text: string): string {
  const n = estimateTokens(text);
  return n >= 1000 ? `~${(n / 1000).toFixed(1)}k tokens` : `~${n} tokens`;
}
