const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const retired = ['自然', '社會'];
const active = ['國文', '英文', '數學'];
const key = 'aiMistakeLearning.questions.v2';
function app(storage = {}) {
  const values = new Map(Object.entries(storage)), elements = new Map(), alerts = [], requests = [];
  function el(id) {
    if (!elements.has(id)) elements.set(id, { value: ['subjectFilter','statusFilter'].includes(id) ? 'all' : '', dataset: {}, classList: {add(){},remove(){}}, listeners: {}, addEventListener(name, fn){this.listeners[name]=fn;}, reset(){}, showModal(){this.open=true;}, close(){this.open=false;} });
    return elements.get(id);
  }
  const context = vm.createContext({console,crypto,Date,Set,Map,setTimeout(){},clearTimeout(){},alert:message=>alerts.push(message),confirm:()=>true,localStorage:{getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)},document:{getElementById:el,querySelector:()=>null},window:{AI_MISTAKE_CONFIG:{visionEndpoint:'https://example.test/api'}},fetch:async(url,options)=>{requests.push(JSON.parse(options.body));return {ok:true,json:async()=>({questions:[{subject:JSON.parse(options.body).question.subject,question:'新增練習'}]})};}});
  vm.runInContext(read('app.js'), context);
  return {context,values,elements,alerts,requests,questions:()=>JSON.parse(vm.runInContext('JSON.stringify(questions)',context))};
}
test('fresh and invalid stores start with zero samples', () => {
  for (const storage of [{},{[key]:'not JSON'},{[key]:'null'}]) assert.deepEqual(app(storage).questions(), []);
  assert.doesNotMatch(read('app.js'), /植物的感應|腦中風一定|starterQuestions/);
});
for (const storedKey of [key,'aiMistakeLearning.questions.v1']) test(`${storedKey} preserves existing records of every subject`, () => {
  const records = [...retired,...active].map((subject,i)=>({id:String(i),subject,question:'原始題目',createdAt:'2026-01-01T00:00:00Z'}));
  const h = app({[storedKey]:JSON.stringify(records)});
  assert.deepEqual(h.questions().map(q=>({id:q.id,subject:q.subject,question:q.question})),records.map(({id,subject,question})=>({id,subject,question})));
  assert.equal(JSON.parse(h.values.get(key)).length,5);
});
for (const subject of retired) test(`${subject}: new crop and similar-question workflows are blocked without data changes`, async () => {
  const h=app({[key]:JSON.stringify([{id:'old',subject,question:'舊資料'}])}), before=h.values.get(key);
  assert.equal(h.context.window.openQuestionFromCrop({subject,question:'新題'}),false);
  await h.context.window.generateSimilar('old',{});
  assert.equal(h.requests.length,0);assert.equal(h.values.get(key),before);assert.equal(h.alerts.length,2);
});
for (const subject of active) test(`${subject}: similar-question workflow remains available`, async () => {
  const h=app({[key]:JSON.stringify([{id:'old',subject,question:'舊資料'}])});
  await h.context.window.generateSimilar('old',{textContent:'生成'});
  assert.equal(h.requests.length,1);assert.equal(h.questions().length,2);assert.equal(h.questions()[0].subject,subject);
});
test('scan offers only remaining subjects and no science fallback', () => {
  const source=read('scan.js');assert.doesNotMatch(source,/自然|社會/);assert.match(source,/請選擇科目/);assert.match(source,/請先選擇科目/);
});
test('batch detection excludes retired server results, and mobile does not submit a rejected crop', () => {
  assert.match(read('auto-detect.js'), /\.filter\(item => !\['自然','社會','未支援'\]/);
  assert.match(read('mobile-mode.js'), /if \(originalOpenFromCrop\(draft\) === false\) return;/);
});
function worker(result) {
  const calls=[];
  const context=vm.createContext({console,crypto:crypto.webcrypto,TextEncoder,Response,URL,fetch:async(url,options)=>{calls.push(JSON.parse(options.body));return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify(result)}]}}]})};}});
  vm.runInContext(read('worker/src/index.js').replace('export default','globalThis.worker ='),context);
  async function request(body,env={GEMINI_API_KEY:'test-only'}) {return context.worker.fetch(new Request('https://example.test/api',{method:'POST',headers:{Origin:'https://yuningliu52018-ship-it.github.io','Content-Type':'application/json'},body:JSON.stringify(body)}),env);}
  return {calls,request};
}
for (const subject of [...retired,'未支援']) test(`Worker rejects ${subject} generation before Gemini`, async () => {
  const h=worker({});const response=await h.request({action:'generateSimilar',question:{subject}});
  assert.equal(response.status,422);assert.equal(h.calls.length,0);
});
for (const subject of active) test(`Worker keeps ${subject} generation and filters retired model output`, async () => {
  const h=worker({questions:[{subject,question:'保留'},...retired.map(subject=>({subject,question:'排除'}))]});
  const response=await h.request({action:'generateSimilar',question:{subject}}),body=await response.json();
  assert.equal(response.status,200);assert.equal(body.questions.length,1);assert.equal(body.questions[0].subject,subject);
});
test('Worker batch detection filters retired and unsupported classifications', async () => {
  const h=worker({mistakes:[...active,...retired,'未支援'].map(subject=>({subject,confidence:90}))});
  const response=await h.request({action:'detectMistakes',image:'data:image/png;base64,AA=='});
  assert.deepEqual((await response.json()).mistakes.map(q=>q.subject),active);
  assert.match(h.calls[0].contents[0].parts[0].text,/不可改標成支援科目/);
});
for (const subject of [...retired,'未支援']) test(`Worker rejects ${subject} single-image classification honestly`, async () => {
  const h=worker({subject});const response=await h.request({image:'data:image/png;base64,AA=='});
  assert.equal(response.status,422);
  assert.deepEqual(h.calls[0].generationConfig.responseSchema.properties.subject.enum,[...active,'未支援']);
});
test('Worker artifact extraction filters retired questions while preserving arbitrary module metadata', async () => {
  const h=worker({module:{subject:'英文'},questions:[...active,...retired].map(subject=>({subject}))});
  const response=await h.request({action:'importArtifact',html:'<p>English</p>'});assert.equal(response.status,200);
  assert.deepEqual((await response.json()).questions.map(q=>q.subject),active);
  for(const subject of [...retired,'日文','跨科']){const response=await worker({module:{subject},questions:[]}).request({action:'importArtifact',html:'<p>module</p>'});assert.equal(response.status,200);assert.equal((await response.json()).module.subject,subject);}
});
test('existing syncPull retains all subjects and performs no question deletion', async () => {
  const records=[...retired,...active].map(subject=>({subject})), statements=[];
  const DB={prepare(sql){statements.push(sql);return {bind(){return this;},run:async()=>({}),all:async()=>({results:records.map(payload=>({payload:JSON.stringify(payload)}))})};}};
  const response=await worker({}).request({action:'syncPull',syncKey:'test-sync-key'},{DB});
  assert.equal(response.status,200);assert.deepEqual((await response.json()).questions,records);
  assert.ok(statements.every(sql=>!/^DELETE|UPDATE questions|DROP /i.test(sql)));
});
