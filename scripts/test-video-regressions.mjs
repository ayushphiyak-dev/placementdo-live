import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import handler from '../api/waitlist.js';
import { supportAnswer } from '../src/utils/supportAnswers.js';

const source = readFileSync('src/InterviewAI_v5.jsx', 'utf8');
assert.match(source, /onReady=\{handleRoomReady\}/);
assert.match(source, /const handleRoomReady = useCallback\(\(\) => setRoomLoading\(false\), \[\]\)/);
assert.match(source, /if \(roomLoading\) return;/);
const navStyle = source.match(/const NAV_LINK_STYLE = ([^;]+);/)[1];
assert.doesNotMatch(navStyle, /background|border|display/);
assert.doesNotMatch(source, /Payment Successful|setPaid\(true\)|AI_RESPONSES/);
assert.match(source, /dialog.showModal\(\)/);
assert.match(source, /fetch\("\/api\/waitlist"/);
assert.match(source, /result.success !== true/);
assert.match(source, /role="alert"/);
assert.doesNotMatch(readFileSync('src/App.jsx', 'utf8'), /Until then, this overview remains/);
for (const file of ['index.html', 'vercel.json']) {
  assert.match(readFileSync(file, 'utf8'), /frame-src[^;]+https:\/\/demo.storylane.com/);
}
assert.match(supportAnswer('How do I pay?'), /not enabled/);
assert.match(supportAnswer('delete my data'), /cannot access or change/);
assert.match(supportAnswer('unknown question xyz'), /verified answer/);
assert.equal(supportAnswer('STAR'), supportAnswer('STAR'));

const originalFetch = globalThis.fetch;
let counter = 0;
async function request(body, upstream, method = 'POST') {
  globalThis.fetch = async () => upstream;
  const res = { status(code) { this.code = code; return this; }, json(value) { this.body = value; } };
  await handler({ method, body, headers:{ 'x-real-ip':`test-${++counter}` } }, res);
  return res;
}
try {
  const saved = await request({email:'test@example.com'}, {ok:true,json:async()=>({success:true})});
  assert.equal(saved.code, 200);
  assert.equal(saved.body.success, true);
  for (const upstream of [
    {ok:false},
    {ok:true,json:async()=>({success:false})},
    {ok:true,json:async()=>{throw new SyntaxError('HTML login page');}},
  ]) {
    const failed = await request({email:'test@example.com'}, upstream);
    assert.equal(failed.code, 503);
    assert.notEqual(failed.body.success, true);
  }
  assert.equal((await request({email:'not-an-email'}, {})).code, 400);
  assert.equal((await request({}, {}, 'GET')).code, 405);
} finally {
  globalThis.fetch = originalFetch;
}
console.log('PASS: video regressions, deterministic support, and waitlist success/failure contracts');
