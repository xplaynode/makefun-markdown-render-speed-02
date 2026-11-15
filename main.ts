// main.ts — harness driver for the markdown-render-speed-02 competition.
//
// Contract: read an array of { id, markdown } cases from
// <inputDir>/cases.json, render each case on its own with parse(),
// and write the resulting HTML strings, in input order, as a JSON
// array to <outputDir>/html.json.
//
// Directories come from the environment when the harness sets them and
// fall back to the competition's fixed locations:
//   MAKEFUN_INPUT_DIR  (default /input)
//   MAKEFUN_OUTPUT_DIR (default /output)
//
// The output directory is created when missing. The directory itself is
// never deleted; only stale files inside it are removed before writing,
// so a grader that mounted the directory keeps its mount.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

interface Case {
  id: string;
  markdown: string;
}

const inputDir: string = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw: string = readFileSync(join(inputDir, 'cases.json'), 'utf8');
const cases: Case[] = JSON.parse(raw) as Case[];

const parts: string[] = [];
for (const testCase of cases) {
  parts.push(JSON.stringify(parse(testCase.markdown)));
}

mkdirSync(outputDir, { recursive: true });
for (const entry of readdirSync(outputDir)) {
  rmSync(join(outputDir, entry), { recursive: true, force: true });
}
writeFileSync(join(outputDir, 'html.json'), '[' + parts.join(',') + ']');
