const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),all=require('../voiced-comics-data.js'),j2=all.filter(c=>c.lesson==='j2');
test('existing 42 Japanese comics remain exactly unchanged',()=>{assert.equal(crypto.createHash('sha256').update(JSON.stringify(all.slice(0,42))).digest('hex'),'4c26183a2754216e80e8b8852ae1209c9a19d0b56e2cc111916c35d2937eb6f5')});
test('J2 contains 17 distinct comics, 68 panels, 59 audible cues and 9 silent explanations',()=>{
 assert.equal(j2.length,17);assert.equal(j2.flatMap(c=>c.panels).length,68);let q=j2.flatMap(c=>c.cues);assert.equal(q.filter(q=>q.text).length,59);assert.equal(q.filter(q=>!q.text).length,9);assert.equal(q.filter(q=>q.sourceKind==='original').length,45);assert.equal(q.filter(q=>q.sourceKind==='added').length,14);
 for(const c of j2){assert.equal(c.series,'beginner-review');assert.match(c.label,/初級複習 J2/);assert.match(c.provenance,/初級文法複習 J2/);c.cues.forEach(q=>{assert.equal(!q.text,q.skipAudio);assert.ok(q.sourceLabel);assert.equal(c.panels[q.panel].skipAudio,q.skipAudio)})}
});
test('J2 labels and distinct filter do not conflate intermediate L2',()=>{
 const html=fs.readFileSync(path.join(root,'japanese-comics.html'),'utf8');assert.equal((html.match(/data-lesson="j2"/g)||[]).length,17);assert.equal((html.match(/data-lesson="l2"/g)||[]).length,4);assert.equal((html.match(/data-lesson="j1"/g)||[]).length,13);assert.match(html,/data-filter="j2"[^>]*>初級複習 J2 <span>17/);assert.match(html,/data-filter="all"[^>]*>全部 <span>59/);
});
test('J2 starts from real audible content, preserving non-first silent panels',()=>{
 assert.ok(j2[0].cues[0].text);assert.equal(j2[1].cues[0].text,'');assert.deepEqual(j2[2].cues.map(q=>!!q.text),[true,false,true,false]);assert.deepEqual(j2[12].cues.map(q=>!!q.text),[true,false,true,false]);assert.equal(j2[14].cues[3].text,'');
});
test('prior five-cue panel mapping remains intact',()=>{const c=all.find(c=>c.id==='j1-05-quantity-limits');assert.equal(c.cues.length,5);assert.deepEqual(c.cues.map(q=>q.panel),[0,1,2,3,3]);assert.equal(c.panels[3].first,3)});
test('public J2 data contains no private source identifiers or paths',()=>{assert.doesNotMatch(JSON.stringify(j2),/oneNotePageId|libraryFileId|libfile_|file_000|sourcePackage|sourceSlide|sourceInventory|\/workspace\/|onenote:|sharepoint\.com|1drv\.ms|2026\/1\//i)});
