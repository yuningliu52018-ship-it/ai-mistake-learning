const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const all=require('../voiced-comics-data.js'),comics=all.filter(c=>c.lesson==='j1'),root=path.resolve(__dirname,'..');
test('beginner J1 is separate from L1 and consists of exactly 13 four-panel voiced comics',()=>{
 assert.equal(comics.length,13); assert.equal(all.filter(c=>c.lesson==='l1').length,5);assert.equal(all.length,108);
 assert.ok(comics.every(c=>c.id.startsWith('j1-')&&c.label.startsWith('初級複習 J1')&&c.panels.length===4&&c.cues[0].text));
 assert.equal(comics.flatMap(c=>c.cues).length,53);assert.equal(comics.flatMap(c=>c.cues).filter(c=>c.sourceKind==='original').length,46);assert.equal(comics.flatMap(c=>c.cues).filter(c=>c.sourceKind==='added').length,7);
 assert.ok(!comics.some(c=>/^j[4-6]-/.test(c.id)));
 const gallery=fs.readFileSync(path.join(root,'japanese-comics.html'),'utf8');assert.equal((gallery.match(/data-lesson="j1"/g)||[]).length,13);assert.match(gallery,/data-filter="j1"/);assert.match(gallery,/顯示全部 108 張/);
});
test('J1 preserves fifth comic fourth-panel dual cues and verified numeric readings',()=>{
 const c=comics[4];assert.equal(c.cues.length,5);assert.deepEqual(c.cues.map(c=>c.panel),[0,1,2,3,3]);assert.equal(c.panels[3].first,3);
 assert.deepEqual(comics[1].cues.map(c=>c.text),['しがつよっかですか。','はい。ごごよじです。','くじじゃありませんね。','はい、よじにあいましょう。']);
 assert.ok(c.cues[3].text.includes('さんじゅっぷん'));assert.ok(comics[8].cues[3].text.includes('よんじゅっさい'));
});
test('published J1 data never contains private source identifiers, dates, files or notes',()=>{
 const json=JSON.stringify(comics);assert.doesNotMatch(json,/oneNotePageId|pageTimestamp|libraryFileId|localPath|sourceSlide|onenote:|sharepoint\.com|1drv\.ms|2025\/12\/31/i);
 assert.ok(comics[1].cues.every(c=>c.sourceKind==='added'));assert.deepEqual(comics[9].cues.map(c=>c.sourceKind),['added','original','added','original']);assert.equal(comics[10].cues[3].sourceKind,'added');
 for(const c of comics)for(const q of c.cues){assert.ok(q.sourceLabel);assert.ok(q.speaker.includes(q.sourceLabel))}
});
