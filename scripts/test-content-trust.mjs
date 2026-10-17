import assert from 'node:assert/strict';
import fs from 'node:fs';
import { homeContent } from '../src/data/publicHome.js';
const posts = JSON.parse(fs.readFileSync('src/data/blogPosts.json', 'utf8'));
const home = fs.readFileSync('dist/index.html', 'utf8');
assert.ok(home.includes(homeContent), 'initial HTML must contain the same home content as React');
assert.equal((home.match(/<h1[ >]/g) || []).length, 1);
assert.ok(home.includes('37.5%'));
assert.equal((240 - 150) / 240 * 100, 37.5);
assert.doesNotMatch(home, /SoftwareApplication|ace your campus|realistic AI mock interviews/);
for (const slug of ['getting-started-with-placementdo','placementdo-review-for-freshers','placementdo-vs-manual-interview-preparation','ai-mock-interview-benefits']) {
  const post = posts.find(p => p.slug === slug);
  assert.ok(post.content.includes('sample'));
  const page = fs.readFileSync(`dist/blog/${slug}/index.html`, 'utf8');
  assert.ok(page.includes(post.title));
  assert.ok(page.includes('sample'));
}
for (const post of posts) {
  assert.doesNotMatch(post.content, /PlacementDo lets you run unlimited|PlacementDo provides AI-powered mock interviews|PlacementDo generates a post-session report|PlacementDo's conversational HR persona/);
}
assert.ok(posts.find(p => p.slug === 'placementdo-review-for-freshers').content.includes('not an independent review'));
console.log('PASS: shared homepage, worked calculation, corrected generated product articles and unsupported-claim guards');
