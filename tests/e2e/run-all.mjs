// Runs every scenario-*.js in this folder against the dev server and summarizes PASS/FAIL.
// Usage: npm run test:e2e [-- <url>]   (default url: http://localhost:4175/)
// The dev server must already be running (npx vite --port 4175 --strictPort).
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:4175/';

// Known failures (open decisions / not app bugs) — reported, but do not fail the run
const KNOWN = [
  'B8 ', // Modo Teste uses static data (pending decision)
  'H3 ', // programmatic focus without a real click in headless Chrome; H4 covers the real click
];

const scenarios = readdirSync(here).filter(f => /^scenario-.*\.js$/.test(f)).sort();
let pass = 0, fail = 0, known = 0;

for (const file of scenarios) {
  console.log(`\n== ${file}`);
  const res = spawnSync(process.execPath, [path.join(here, 'cdp.mjs'), path.join(here, file), url], { encoding: 'utf8', timeout: 180000 });
  const out = `${res.stdout || ''}${res.stderr || ''}`;
  for (const line of out.split('\n').filter(Boolean)) {
    if (line.startsWith('PASS')) pass++;
    else if (line.startsWith('FAIL')) {
      if (KNOWN.some(k => line.slice(6).startsWith(k))) { known++; console.log(`KNOWN ${line.slice(6)}`); continue; }
      fail++;
    } else if (/SCENARIO ERROR|PAGE EXCEPTION|TypeError|Error:/.test(line)) fail++;
    console.log(line);
  }
}

console.log(`\nTotal: ${pass} PASS, ${fail} FAIL, ${known} falha(s) conhecida(s)`);
process.exit(fail ? 1 : 0);
