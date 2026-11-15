/* 中文課程內容：執行層
   課程原始碼維持英文；切換到中文時，用字典 ZHC 把句子換成中文。
   字典的鍵是「遮罩後的英文」：數學式、變數、數字、帶屬性的標籤都換成 {0}、{1}…，
   所以同一句型（例如隨機練習題）只需翻一次。字典檔：js/zhc-<課程>.js。 */
(function(){
const DICT={};window.ZHC=DICT;window.zhAdd=o=>Object.assign(DICT,o);
/* 句型樣板：同一句型、數學式不同的句子（§n＝原文中的數學片段） */
const FAM={};window.zhAddF=o=>Object.assign(FAM,o);
const SMALLW=new Set('is or of to if in on by no as at be so it an up we go do vs'.split(' '));
const FNW=new Set(['sin','cos','tan','cot','sec','csc','log','ln','lim','max','min','exp','arcsin','arccos','arctan','sinh','cosh']);
function isMathWord(w){if(w.length===1)return true;if(SMALLW.has(w.toLowerCase()))return false;if(w.length===2)return true;return FNW.has(w);}
function fnorm(k){const out=[],ch=[];let cur='';
 const toks=k.match(/(<[^>]+>|&[a-z]+;|\{\d+\}|[A-Za-z]+|[^A-Za-z<&{]+|[<&{])/g)||[];
 for(const t of toks){
  if(t[0]==='<'&&t.length>1){if(cur){const m=/^(\s*)([\s\S]*?)(\s*)$/.exec(cur);out.push(m[1]);if(m[2]){out.push('§');ch.push(m[2]);}out.push(m[3]);cur='';}out.push(t);continue;}
  if(/^[A-Za-z]+$/.test(t)&&!isMathWord(t)){
   if(cur){const m=/^(\s*)([\s\S]*?)([\s,.;:!?]*)$/.exec(cur);out.push(m[1]);if(m[2]){out.push('§');ch.push(m[2]);}out.push(m[3]);cur='';}
   out.push(t);continue;}
  cur+=t;}
 if(cur){const m=/^(\s*)([\s\S]*?)([\s,.;:!?…]*)$/.exec(cur);out.push(m[1]);if(m[2]){out.push('§');ch.push(m[2]);}out.push(m[3]);}
 let n=0;const s=out.join('').replace(/§/g,()=>'§'+(++n));return [s,ch];}
function famTR(k){const r=fnorm(k),t=FAM[r[0]];if(t==null)return null;
 return t.replace(/§(\d+)/g,(a,d)=>r[1][d-1]!==undefined?r[1][d-1]:a).replace(/，\s*,\s*/g,'，');}
const COLLECT=/[?&]collect=1/.test(location.search);
const COL=COLLECT?new Map():null;window.ZHCOL=COL;window.ZHCOLLECT=COLLECT;window.ZHCTX='';
/* 中英對照：英文在上、中文在下；短的寫在同一行 */
const BIM='\u2060';
const isBI=()=>typeof LANG!=='undefined'&&LANG==='bi';
function plain(x){return x.replace(/<[^>]*>/g,'').replace(/&[a-z]+;/g,' ');}
function zhBi(en,zh,inl){if(zh==null||zh===en||en==='')return en;
 if((inl||plain(en).length<=28)&&!/<(br|div|p|ul|ol|table|svg)\b/i.test(en+zh))return en+BIM+'<span class="bi-in"> '+zh+'</span>';
 return en+'<span class="bi-zh">'+zh+'</span>';}
function zhSplit(x){let i=x.indexOf(BIM+'<span class="bi-in"> ');if(i>=0&&x.endsWith('</span>'))return [x.slice(0,i),x.slice(i+22,-7)];
 i=x.indexOf('<span class="bi-zh">');if(i>=0&&x.endsWith('</span>'))return [x.slice(0,i),x.slice(i+20,-7)];return [x,x];}
window.zhBi=zhBi;window.zhSplit=zhSplit;
const MISS=new Map();window.ZHMISS=MISS;
const MARK='⁣';
const FN=new Set('sin cos tan cot sec csc log ln lim max min exp det arcsin arccos arctan sinh cosh tanh mod gcd lcm arg cis sqrt dx dy dt du dv dr dθ'.split(' '));
const SMALL=new Set('is or of to if in on by no as at be so it an up we go do vs'.split(' '));
function hasWords(k){
 const s=k.replace(/\{\d+\}/g,' ').replace(/<[^>]*>/g,' ').replace(/&[a-z]+;/g,' ');
 return (s.match(/[A-Za-z]+/g)||[]).some(w=>{const l=w.toLowerCase();
  if(SMALL.has(l))return true;if(w.length<3||FN.has(l))return false;
  if(w===w.toUpperCase()&&w.length<=5)return false;return true;});}
/* 遮罩：回傳 {k:鍵, p:被遮住的原文片段} */
function mask(s){
 const p=[];let k='',i=0;const n=s.length;
 const ph=x=>{k+='{'+p.length+'}';p.push(x);};
 while(i<n){
  const c=s[i];
  if(c==='<'){
   const tm=/^<\/?[a-zA-Z][^<>]*>/.exec(s.slice(i,i+800));
   if(!tm){k+=c;i++;continue;}
   const tag=tm[0],j=i+tag.length-1;
   if(/^<span\b[^>]*class="[^"]*\bmath\b/.test(tag)){/* 整段數學式 */
    let d=0,q=i;const re=/<\/?span\b[^>]*>/g;re.lastIndex=i;let m;
    while((m=re.exec(s))){if(m[0][1]==='/')d--;else d++;if(d===0){q=m.index+m[0].length;break;}}
    if(d!==0)q=n;ph(s.slice(i,q));i=q;continue;}
   if(/^<i class="v">/.test(tag)){const e=s.indexOf('</i>',j);const q=e<0?n:e+4;ph(s.slice(i,q));i=q;continue;}
   if(/^<\/?[a-zA-Z0-9]+\s*\/?>$/.test(tag)){k+=tag.toLowerCase();i=j+1;continue;}/* 無屬性標籤保留 */
   ph(tag);i=j+1;continue;}
  const m=/^[−-]?\d+(?:[.,]\d+)*/.exec(s.slice(i,i+40));
  if(m){let x=m[0];if((c==='-'||c==='−')&&/[A-Za-z0-9)]/.test(s[i-1]||'')){k+=c;i++;continue;}ph(x);i+=x.length;continue;}
  k+=c;i++;}
 return {k:k.replace(/\s+/g,' ').trim(),p};}
function fill(v,p){return v.replace(/\{(\d+)\}/g,(a,d)=>p[+d]!==undefined?p[+d]:a);}
function rec(k,raw,how){let r=COL.get(k);if(!r){r={n:0,ex:raw.slice(0,600),id:window.ZHCTX,how};COL.set(k,r);}r.n++;}
const isI18N=k=>typeof I18N!=='undefined'&&(I18N.zh[k]!==undefined);
/* 句子翻譯 */
function TR(s,how){
 if(typeof s!=='string'||!/[A-Za-z]/.test(s)||s.indexOf(MARK)>=0||/[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/.test(s))return s;
 const m=mask(s);if(!hasWords(m.k))return s;
 if(COLLECT){if(!isI18N(m.k))rec(m.k,s,how||'a');return how==='b'?s:MARK+s;}
 let v=DICT[m.k];if(v==null&&!COLLECT)v=famTR(m.k);
 if(v==null){if(!isI18N(m.k))MISS.set(m.k,(MISS.get(m.k)||0)+1);return s;}
 const lead=s.match(/^\s*/)[0],trail=s.match(/\s*$/)[0];
 const out=lead+fill(v,m.p)+trail;return isBI()?zhBi(s,out):out;}
window.zhTR=TR;window.zhMask=mask;
/* ---------- (a) 課程資料層 ---------- */
const SKIP=new Set(['vocab','answer','a','mount','raw','tol','id','k','color']);
const BLOCKY=/<(svg|table|div|ul|ol|li|p)\b/i;
function trObj(o,key){
 if(typeof o==='string'){if(BLOCKY.test(o)){if(COLLECT)collectHTML(o);return o;}return TR(o,'a');}
 if(Array.isArray(o))return o.map(x=>trObj(x));
 if(o&&typeof o==='object'){const r={};for(const k in o){const v=o[k];
  if(SKIP.has(k))r[k]=v;
  else if(typeof v==='function')r[k]=k==='practice'?function(){return trObj(v.apply(o,arguments));}:v;
  else r[k]=trObj(v,k);}return r;}
 return o;}
window.zhObj=trObj;
const CACHE={};
window.zhLesson=(id,D)=>{if(!D)return D;window.ZHCTX=id;if(COLLECT)return CACHE[id]||(CACHE[id]=trObj(D));const L0=LANG;
 /* 翻譯結果依字典內容快取 */
 const c=CACHE[id];if(c&&c.__d===D&&c.__L===L0&&c.__n===Object.keys(DICT).length)return c.v;
 const v=trObj(D);CACHE[id]={__d:D,__L:L0,__n:Object.keys(DICT).length,v};return v;};
/* ---------- (b) 畫面層：互動工具、圖形 ---------- */
const INL=new Set(['B','STRONG','I','EM','SUP','SUB','SPAN','BR','SMALL','U','MARK','CODE','TSPAN','KBD','S','SVG:TSPAN']);
const isInl=n=>n.nodeType===3||(n.nodeType===1&&INL.has(n.nodeName.toUpperCase())&&[...n.childNodes].every(isInl));
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g,'&nbsp;');
const ser=n=>n.nodeType===3?esc(n.data):n.outerHTML;
function runs(el){const out=[];let cur=[];
 for(const n of el.childNodes){if(isInl(n))cur.push(n);else{if(cur.length)out.push(cur);cur=[];}}
 if(cur.length)out.push(cur);return out;}
function trNode(el){
 if(el.nodeType!==1||el.nodeName==='SCRIPT'||el.nodeName==='STYLE')return;
 if(el.closest&&el.closest('[data-nozh]'))return;
 if(isBI()&&el.closest&&el.closest('svg'))return;/* 圖上的標籤只放英文 */
 const covered=new Set();
 for(const r of runs(el)){
  if(!r.some(n=>n.nodeType===3&&/[A-Za-z]/.test(n.data)))continue;
  r.forEach(n=>covered.add(n));
  const html=r.map(ser).join('');
  if(html.indexOf(MARK)>=0)continue;
  const out=TR(html,'b');
  if(COLLECT||out===html)continue;
  if(r.length===1&&r[0].nodeType===3&&!/[<&]/.test(out)){r[0].data=out;continue;}
  const rg=document.createRange();rg.selectNodeContents(el);
  const frag=rg.createContextualFragment(out);[...frag.childNodes].forEach(n=>covered.add(n));
  el.insertBefore(frag,r[0]);r.forEach(n=>n.remove());}
 for(const c of [...el.children])if(!covered.has(c))trNode(c);
 for(const a of ['placeholder','title']){const v=el.getAttribute&&el.getAttribute(a);if(v&&/[A-Za-z]{3}/.test(v)){let o=TR(v,'b');if(isBI()){const q=zhSplit(o);if(q[0]!==q[1])o=q[0]+' / '+plain(q[1]);}if(!COLLECT&&o!==v)el.setAttribute(a,o);}}}
window.zhNode=trNode;
function collectHTML(s){const d=document.createElement('div');d.innerHTML=s;trNode(d);}
window.zhCollectHTML=collectHTML;
let obs=null;const ROOTS='#stage,#a2tool-body,.visual-lab,.slope-lab,#unit-diagnostic';
function active(){return COLLECT||(typeof LANG!=='undefined'&&(LANG==='zh'||LANG==='bi'));}
function inRoot(n){const e=n.nodeType===1?n:n.parentElement;return e&&e.closest(ROOTS);}
function handle(list){if(!active())return;const seen=new Set();
 for(const m of list){
  if(m.type==='characterData'){const e=m.target.parentElement;if(e&&inRoot(e))seen.add(e);}
  else for(const n of m.addedNodes){if(n.nodeType===3){if(n.parentElement&&inRoot(n.parentElement))seen.add(n.parentElement);}else if(n.nodeType===1&&inRoot(n))seen.add(n.parentElement&&inRoot(n.parentElement)?n.parentElement:n);}}
 obs&&obs.disconnect();
 try{seen.forEach(e=>{if(document.contains(e))trNode(e);});}finally{start();}}
function start(){if(!obs)obs=new MutationObserver(handle);obs.observe(document.body,{childList:true,subtree:true,characterData:true});}
window.zhStart=()=>{start();document.querySelectorAll(ROOTS).forEach(e=>active()&&trNode(e));};
/* ---------- 字典載入 ---------- */
const DF={KA:'ka',GEO:'geo',A2:'a2',ST:'st',PC:'pc',CA:'ca'};
window.zhDictFor=id=>{const c=String(id).split('-')[0];return DF[c]?'js/zhc-'+DF[c]+'.js':null;};
})();
