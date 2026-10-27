import changelog from '../../CHANGELOG.md?raw';

/**
 * The full /changelog.md document body. Shared by the route that serves it and
 * by llms.txt, which estimates its token budget — so the advertised budget and
 * the document's own `<!-- ~N tokens -->` stamp are computed from one identical
 * string and can never drift.
 *
 * Serves the generated GitHub changelog verbatim, including titles, full prose,
 * and commit links. The build checks that it matches changelog.json.
 */
export function buildChangelogBody(): string {
  return changelog;
}
