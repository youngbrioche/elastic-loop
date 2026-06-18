#!/usr/bin/env node
// Glossary-link linter. Enforces one rule, per page: the FIRST time a glossary
// term appears in running prose, it must be wrapped in <Term id="...">, so the
// reader meets the definition before the jargon. Later uses may stay plain.
//
// This is deliberately a deterministic text check, not an LLM: a build guard has
// to be fast, offline, and give the same verdict on the same input every time.
// The matching tolerates English inflection (plurals, hyphen/space variants) and
// reads any extra surface forms from each glossary entry's optional `match` list,
// so the glossary stays the single source of truth (see src/data/glossary.ts).
//
// What counts as "prose": body paragraphs and lists. Excluded, because wrapping a
// term there would be wrong or noisy: frontmatter, imports, fenced/inline code,
// URLs and markdown links, headings, markdown table rows, JSX tags and their
// attributes, and the inside of an existing <Term> (that IS the good case).
//
// Run `npm run glossary:check`. The build runs it too (see astro.config.mjs) and
// fails on any violation.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const GLOSSARY_PATH = new URL('../src/data/glossary.ts', import.meta.url);
const PAGES_DIR = new URL('../src/content/pages/', import.meta.url);

/**
 * Parse the glossary TS source into { key, term, match[] } records. We read the
 * source rather than import it so this stays a plain node script with no TS
 * loader. The single-quoted string values never contain a straight apostrophe
 * (prose uses typographic ’), so a simple quote-delimited match is safe.
 */
export function readGlossary(src = readFileSync(GLOSSARY_PATH, 'utf8')) {
  // Isolate the object literal body so we don't match the interface/docs above.
  const body = src.slice(src.indexOf('export const glossary'));
  const entries = [];
  // Each entry: optional-quoted key, then a block up to the term field, and an
  // optional `match: [...]` array somewhere in the same entry.
  const entryRe =
    /(?:^|\n)\s*(?:'([a-z0-9-]+)'|([a-z0-9-]+))\s*:\s*\{([\s\S]*?)\n\s*\},?/g;
  let m;
  while ((m = entryRe.exec(body))) {
    const key = m[1] ?? m[2];
    const inner = m[3];
    const termMatch = inner.match(/\bterm:\s*'((?:[^'\\]|\\.)*)'/);
    if (!termMatch) continue;
    const term = termMatch[1].replace(/\\(['"\\])/g, '$1');
    const matchArr = inner.match(/\bmatch:\s*\[([\s\S]*?)\]/);
    const extra = matchArr
      ? [...matchArr[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) =>
          x[1].replace(/\\(['"\\])/g, '$1'),
        )
      : [];
    entries.push({ key, term, match: extra });
  }
  return entries;
}

/** Replace every non-newline char of a string with a space, preserving offsets. */
const blank = (s) => s.replace(/[^\n]/g, ' ');

/**
 * Strip everything that is not running prose, replacing each excluded region
 * with spaces so character offsets (and thus line numbers) stay intact. Term
 * wrappers are blanked here too — their first positions are recorded separately
 * by the caller before this runs.
 */
export function toProse(raw) {
  let s = raw;
  const strip = (re) => {
    s = s.replace(re, (mm) => blank(mm));
  };
  strip(/^---\n[\s\S]*?\n---\n/); // frontmatter
  strip(/^import .*$/gm); // import lines
  strip(/```[\s\S]*?```/g); // fenced code
  strip(/<Term\s+id="[a-z0-9-]+"[^>]*>[\s\S]*?<\/Term>/g); // existing links (the good case)
  strip(/`[^`]*`/g); // inline code
  strip(/\[[^\]]*\]\([^)]*\)/g); // markdown links (text + url)
  strip(/https?:\/\/[^\s)]+/g); // bare URLs
  strip(/<[^>]+>/g); // JSX tags + their attributes
  strip(/^#{1,6} .*$/gm); // headings
  strip(/^\s*>.*$/gm); // blockquotes / pull quotes (stylized, not running prose)
  strip(/^.*\|.*$/gm); // markdown table rows
  return s;
}

/**
 * Build a case-insensitive matcher for one glossary entry. Surface forms are the
 * canonical term, its "(parenthetical)" rendered as its own form (so "(slop)" and
 * "(TPM)" — the words actually used in prose — are caught), and every `match`
 * alias. Each form tolerates an optional plural suffix and treats hyphen and
 * space as interchangeable, so "reward hacking" also catches "reward-hacking".
 */
export function buildMatcher(entry) {
  const forms = new Set();
  const lower = entry.term.toLowerCase();
  // The parenthetical (e.g. "slop", "TPM") is a real surface form on its own.
  for (const p of lower.matchAll(/\(([^)]+)\)/g)) forms.add(p[1].trim());
  const canonical = lower
    .replace(/\s*\([^)]*\)/g, '') // strip the parenthetical from the base form
    .replace(/^(the|a|an)\s+/, '') // drop leading article
    .trim();
  if (canonical) forms.add(canonical);
  for (const a of entry.match) forms.add(a.toLowerCase().trim());

  const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const alternatives = [...forms]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length) // prefer the longest match
    .map((form) => esc(form).replace(/[\s-]+/g, '[\\s-]+'));
  const pattern = `(?<![\\w-])(?:${alternatives.join('|')})(?:es|s)?(?![\\w-])`;
  return new RegExp(pattern, 'gi');
}

/** Line number (1-based) for a character offset. */
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

/**
 * Check a single page's source. Returns a list of violations:
 * { key, line, context } for each glossary term whose first prose occurrence is
 * not the (or precedes the) <Term> wrapper.
 */
export function checkPage(raw, entries) {
  const prose = toProse(raw);
  const violations = [];
  for (const entry of entries) {
    const wrapMatch = raw.match(
      new RegExp(`<Term\\s+id="${entry.key}"[^>]*>`),
    );
    const wrapIdx = wrapMatch ? wrapMatch.index : -1;
    const re = buildMatcher(entry);
    const first = re.exec(prose);
    if (!first) continue; // term not used in prose
    const plainIdx = first.index;
    const wrapLine = wrapIdx === -1 ? null : lineOf(raw, wrapIdx);
    if (wrapIdx === -1 || plainIdx < wrapIdx) {
      const ctx = prose
        .slice(Math.max(0, plainIdx - 35), plainIdx + first[0].length + 35)
        .replace(/\s+/g, ' ')
        .trim();
      violations.push({
        key: entry.key,
        line: lineOf(raw, plainIdx),
        wrapLine,
        match: first[0],
        context: ctx,
      });
    }
  }
  return violations;
}

/** Check every page. Returns { file, violations[] }[] for files with any. */
export function checkAll() {
  const entries = readGlossary();
  const files = readdirSync(PAGES_DIR).filter((f) => f.endsWith('.mdx'));
  const report = [];
  for (const file of files.sort()) {
    const raw = readFileSync(new URL(file, PAGES_DIR), 'utf8');
    const violations = checkPage(raw, entries);
    if (violations.length) report.push({ file, violations });
  }
  return report;
}

function formatReport(report) {
  const lines = [];
  let total = 0;
  for (const { file, violations } of report) {
    lines.push(`\n  src/content/pages/${file}`);
    for (const v of violations) {
      total += 1;
      const where = v.wrapLine
        ? `wrapped only later, line ${v.wrapLine}`
        : 'never wrapped on this page';
      lines.push(
        `    line ${v.line}  id="${v.key}"  (${where})\n      …${v.context}…`,
      );
    }
  }
  lines.unshift(
    `Glossary-link check: ${total} first-use term(s) not linked across ${report.length} page(s).`,
  );
  return lines.join('\n');
}

// CLI: default lists violations; `--check` additionally exits non-zero on any.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const report = checkAll();
  if (!report.length) {
    console.log('Glossary-link check: every glossary term is linked on first use. ✓');
  } else {
    const out = formatReport(report);
    if (process.argv.includes('--check')) {
      console.error(out);
      console.error(
        '\nWrap each term’s first prose use in <Term id="…">, or add a deliberate exception.',
      );
      process.exit(1);
    }
    console.log(out);
  }
}
