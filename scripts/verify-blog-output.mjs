import fs from "node:fs";
import assert from "node:assert/strict";
const posts=JSON.parse(fs.readFileSync("src/data/blogPosts.json")).filter(p=>p.status!=="draft");
const index=fs.readFileSync("dist/blog/index.html","utf8");
assert.equal((index.match(/class="post-card"/g)||[]).length,posts.length);
for(const p of posts){
 assert.ok(index.includes('/blog/'+p.slug));
 const html=fs.readFileSync('dist/blog/'+p.slug+'/index.html','utf8');
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 assert.ok(html.includes('/analytics.js'));
}
const d=posts.find(p=>p.slug==='data-structures-interview-questions');
const blocks=[...d.content.matchAll(/\x60{3}javascript\n([\s\S]*?)\x60{3}/g)];
assert.equal(blocks.length,2);
const max=new Function(blocks[0][1]+'; return maxSubarray')();
const two=new Function(blocks[1][1]+'; return twoSum')();
assert.equal(max([-2,3,-1,4,-6]),6);
assert.equal(max([-5,-2]),-2);
assert.equal(max([7]),7);
assert.throws(()=>max([]));
assert.deepEqual(two([3,3],6),[0,1]);
assert.equal(two([3],6),null);
console.log('PASS: '+posts.length+' linked articles, single H1, analytics retained, worked examples executed');
