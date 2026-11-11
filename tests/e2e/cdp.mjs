// Minimal Chrome DevTools Protocol harness: launches headless Chrome, loads the app,
// injects test helpers (helpers.js -> window.T) and runs a scenario file.
// Usage: node tests/e2e/cdp.mjs <scenario.js> [url]   (default url: http://localhost:4175/)
// Chrome path: CHROME_PATH env var, default = Chrome on Windows.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const scenarioArg = process.argv[2];
// Scenario path: as given, or relative to this folder (e.g. "scenario-a.js")
const scenarioFile = existsSync(scenarioArg) ? scenarioArg : path.join(here, scenarioArg);
const url = process.argv[3] || 'http://localhost:4175/';
const chromePath = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const port = 9333;

const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(here, 'profile')}`, '--window-size=1440,1024', 'about:blank',
], { stdio: 'ignore' });

let target;
for (let i = 0; i < 50 && !target; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    target = list.find(t => t.type === 'page');
  } catch { /* not up yet */ }
  if (!target) await sleep(200);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = new Map();
ws.addEventListener('message', ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  if (msg.method === 'Runtime.exceptionThrown') console.log('PAGE EXCEPTION', msg.params.exceptionDetails.exception?.description);
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') console.log('CONSOLE ERROR', msg.params.args.map(a => a.value ?? a.description).join(' '));
});
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Runtime.enable');
await send('Page.enable');
await send('Page.navigate', { url });
await sleep(2500);

const helpers = readFileSync(path.join(here, 'helpers.js'), 'utf8');
await send('Runtime.evaluate', { expression: helpers });

const scenario = readFileSync(scenarioFile, 'utf8');
const res = await send('Runtime.evaluate', { expression: `(async () => { ${scenario} })()`, awaitPromise: true, returnByValue: true, timeout: 120000 });
if (res.result.exceptionDetails) console.log('SCENARIO ERROR', res.result.exceptionDetails.exception?.description);
else console.log(res.result.result.value);

// Optional real mouse hover (CSS :hover needs a trusted pointer): scenario sets window.__hover = {x, y, check}
const hv = await send('Runtime.evaluate', { expression: 'JSON.stringify(window.__hover || null)', returnByValue: true });
const hover = JSON.parse(hv.result.result.value);
if (hover) {
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: hover.x, y: hover.y });
  await sleep(200);
  const r = await send('Runtime.evaluate', { expression: hover.check, returnByValue: true });
  console.log(r.result.result.value);
}

// Optional real click (trusted mousedown/mouseup): scenario sets window.__click = {x, y, check}
const ck = await send('Runtime.evaluate', { expression: 'JSON.stringify(window.__click || null)', returnByValue: true });
const click = JSON.parse(ck.result.result.value);
if (click) {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: click.x, y: click.y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: click.x, y: click.y, button: 'left', clickCount: 1 });
  await sleep(200);
  const r = await send('Runtime.evaluate', { expression: click.check, returnByValue: true });
  console.log(r.result.result.value);
}

// Optional screenshot of a region: scenario sets window.__shot = {x, y, width, height};
// saved only when the SHOT_PATH env var is set (visual comparison with Figma)
const sh = await send('Runtime.evaluate', { expression: 'JSON.stringify(window.__shot || null)', returnByValue: true });
const shot = JSON.parse(sh.result.result.value);
if (shot && process.env.SHOT_PATH) {
  const r = await send('Page.captureScreenshot', { format: 'png', clip: { ...shot, scale: 2 } });
  writeFileSync(process.env.SHOT_PATH, Buffer.from(r.result.data, 'base64'));
  console.log(`INFO  screenshot salvo em ${process.env.SHOT_PATH}`);
}

ws.close();
chrome.kill();
process.exit(0);
