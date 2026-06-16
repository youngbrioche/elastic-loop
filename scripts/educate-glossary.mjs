// One-off: educate the prose string values in src/data/glossary.ts to
// typographic punctuation, using the same engine as the site (retext-smartypants).
// Only term/def/anchor single-quoted values are touched; code, keys, comments
// are left alone. Idempotent — already-curly text passes through unchanged.
import { readFileSync, writeFileSync } from 'node:fs';
import { retext } from 'retext';
import retextSmartypants from 'retext-smartypants';

const FILE = new URL('../src/data/glossary.ts', import.meta.url);
const processor = retext().use(retextSmartypants, { dashes: false });

function educate(text) {
  return String(processor.processSync(text));
}

let src = readFileSync(FILE, 'utf8');

// Match `field: '...'` where ... may contain escaped chars.
const FIELD = /(\b(?:term|def|anchor): )'((?:[^'\\]|\\.)*)'/g;

src = src.replace(FIELD, (_m, prefix, raw) => {
  // Unescape the JS string literal back to plain prose.
  const plain = raw.replace(/\\(['"\\])/g, '$1');
  const educated = educate(plain);
  // After educating, apostrophes/quotes are curly; only a stray straight
  // quote or backslash would need escaping for a single-quoted literal.
  const escaped = educated.replace(/([\\'])/g, '\\$1');
  return `${prefix}'${escaped}'`;
});

writeFileSync(FILE, src);
console.log('Glossary educated.');
