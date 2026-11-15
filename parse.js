// parse.js — drop-in replacement for marked 18.1.3's marked.parse.
//
// The rendering rules are exactly marked's: this module delegates to the
// vendored marked build under vendor/marked/, so for every input the HTML
// returned here is byte-for-byte what marked.parse returns with default
// options (gfm: true, breaks: false, pedantic: false, async: false).
//
// Where the speed comes from: the vendored copy is a performance fork of
// marked. The fork changes no rendering rule, no regex, and no output
// string. It only removes work whose outcome is already decided before
// the work runs:
//
//   1. Block-lexer dispatch only attempts the block tokenizers whose
//      rules can still match the block's opening characters, instead of
//      trying every rule against every block.
//   2. Inline-lexer dispatch does the same per position, and the
//      emphasis masking passes are skipped for sources that contain
//      none of the characters those passes could rewrite.
//   3. The list tokenizer scans lines by index instead of splitting
//      and re-joining them, and only tab-expands lines that actually
//      start with whitespace.
//
// Each shortcut is a conservative superset test: it may let a tokenizer
// run that then fails to match, but it never skips a tokenizer that
// would have matched. See vendor/marked/NOTICE for the fork notes.

import { marked } from './vendor/marked/marked.esm.js';

export function parse(markdown) {
  return marked.parse(markdown);
}
