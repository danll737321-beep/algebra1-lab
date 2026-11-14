/* Algebra II (Khan units) · shared helpers — loaded after js/ka-core.js, before js/a2-u*.js */
window.A2=(function(){
const {curve,stepper,nf}=KA;
const TOOLS={};
const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};
const sup=n=>String(n).split('').map(c=>SUP[c]||c).join('');
const pw=(v,d)=>d===0?'':d===1?v:v+sup(d);
/* polynomial string from coefficients high→low: [1,-3,0,2] → x³ − 3x² + 2 */
function ps(co,v='x'){const n=co.length-1;let s='';co.forEach((k,i)=>{const d=n-i;k=+(+k).toFixed(6);if(!k)return;const ab=Math.abs(k),c=(ab===1&&d>0)?'':nf(ab).replace(MINUS,'');s+=s?(k<0?' − ':' + ')+c+pw(v,d):(k<0?MINUS:'')+c+pw(v,d);});return s||'0';}
/* monomial */
const mono=(k,d,v='x')=>ps([k,...Array(d).fill(0)],v);
/* polynomial arithmetic on coeff arrays (high→low) */
const trim=a=>{a=a.slice();while(a.length>1&&Math.abs(a[0])<1e-12)a.shift();return a;};
function padd(a,b){const n=Math.max(a.length,b.length),A=Array(n-a.length).fill(0).concat(a),B=Array(n-b.length).fill(0).concat(b);return trim(A.map((x,i)=>x+B[i]));}
const pneg=a=>a.map(x=>-x);
function pmul(a,b){const r=Array(a.length+b.length-1).fill(0);a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y));return trim(r);}
const peval=(a,x)=>a.reduce((s,k)=>s*x+k,0);
/* synthetic division by (x − r): returns {q,rem} */
function synth(a,r){const q=[];let c=0;a.forEach((k,i)=>{c=c*r+k;q.push(c);});const rem=q.pop();return {q,rem};}
/* complex numbers [re,im] */
function cs(a,b){a=+(+a).toFixed(4);b=+(+b).toFixed(4);if(!b)return fmtNeg(a);const ib=Math.abs(b)===1?'i':nf(Math.abs(b))+'i';if(!a)return (b<0?MINUS:'')+ib;return `${fmtNeg(a)} ${b<0?'−':'+'} ${ib}`;}
const cmul=(p,q)=>[p[0]*q[0]-p[1]*q[1],p[0]*q[1]+p[1]*q[0]];
/* slider panel: specs=[{k,l,min,max,step,v,f}] → calls draw(vals) */
function sliders(el,specs,draw,extra=''){
 el.innerHTML=`<div class="ctrl">${specs.map(s=>`<label>${s.l} <input type="range" data-s="${s.k}" min="${s.min}" max="${s.max}" step="${s.step||1}" value="${s.v}"><b data-o="${s.k}"></b></label>`).join('')}</div>${extra}`;
 const V={};specs.forEach(s=>V[s.k]=+s.v);
 const run=()=>{specs.forEach(s=>{const o=$(`[data-o="${s.k}"]`,el);if(o)o.textContent=s.f?s.f(V[s.k]):fmtNeg(V[s.k]);});draw(V);};
 el.addEventListener('input',e=>{const k=e.target.dataset.s;if(k===undefined)return;V[k]=+e.target.value;run();});
 return {V,run};}
/* generic slider-driven graph: o={g:gridOpts,params,curves:V=>[{f,col,w,dash}],extra:(G,V)=>svg,eq:V=>html,read:V=>html,top:html} */
function graphLab(el,o){
 const sp=sliders(el,o.params||[],V=>{const G=grid(Object.assign({u:28},o.g||{}));let s='';(o.curves?o.curves(V):[]).forEach(c=>{s+=curve(G,c.f,c.col||'#2563eb',c.w||3,c.dash||'');});if(o.extra)s+=o.extra(G,V);
  $('.gl-eq',el).innerHTML=o.eq?o.eq(V):'';$('.gl-g',el).innerHTML=G.svg(s);$('.gl-r',el).innerHTML=o.read?o.read(V):'';},`${o.top||''}<div class="eqline math gl-eq"></div><div class="gl-g"></div><div class="readout gl-r"></div>`);
 if(o.buttons){const row=document.createElement('div');row.className='row';row.innerHTML=o.buttons.map((b,i)=>`<button data-pre="${i}">${b.t}</button>`).join('');el.insertBefore(row,el.firstChild.nextSibling);
  row.addEventListener('click',e=>{const b=e.target.closest('[data-pre]');if(!b)return;const pre=o.buttons[+b.dataset.pre];Object.assign(sp.V,pre.v);Object.keys(pre.v).forEach(k=>{const inp=$(`[data-s="${k}"]`,el);if(inp)inp.value=pre.v[k];});$$('[data-pre]',row).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});}
 sp.run();return sp;}
/* button-choice viewer: items=[{t,html}] */
function chooser(el,items,k0=0){el.innerHTML=`<div class="row">${items.map((x,i)=>`<button data-c="${i}">${x.t}</button>`).join('')}</div><div class="ch-b"></div>`;
 const draw=i=>{const x=items[i];$('.ch-b',el).innerHTML=typeof x.html==='function'?x.html():x.html;$$('[data-c]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.c===i));if(x.after)x.after($('.ch-b',el));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b&&el.contains(b))draw(+b.dataset.c);});draw(k0);}
/* area model table: rows/cols are term strings, cells products */
function areaTable(rowT,colT,cell,hl){const cols=['#dbeafe','#dcfce7','#fef3c7','#fce7f3','#ede9fe'];
 return `<table class="t a2-area" style="margin:8px auto"><tr><th style="background:#fff;border:none"></th>${colT.map(c=>`<th>${c}</th>`).join('')}</tr>${rowT.map((r,i)=>`<tr><th>${r}</th>${colT.map((c,j)=>`<td style="background:${hl?cols[hl(i,j)%5]:'#f8fafc'};font-weight:700;min-width:64px">${cell(i,j)}</td>`).join('')}</tr>`).join('')}</table>`;}
/* coordinate plane for complex numbers */
function cplane(pts,o={}){const R=o.R||6,u=o.u||28;const G=grid({x0:-R,x1:R,y0:-R,y1:R,u,lab:2,xl:'',yl:''});let s='';
 s+=`<text x="${G.X(R)-4}" y="${G.Y(0)-8}" text-anchor="end" class="tl" font-weight="800">Re</text><text x="${G.X(0)+8}" y="${G.Y(R)+14}" class="tl" font-weight="800">Im</text>`;
 (o.vec||[]).forEach(v=>{s+=`<line x1="${G.X(v.from?v.from[0]:0)}" y1="${G.Y(v.from?v.from[1]:0)}" x2="${G.X(v.to[0])}" y2="${G.Y(v.to[1])}" stroke="${v.col||'#94a3b8'}" stroke-width="${v.w||2.5}" ${v.dash?'stroke-dasharray="5 4"':''}/>`;});
 pts.forEach(p=>{s+=gdot(G,Math.max(-R,Math.min(R,p[0])),Math.max(-R,Math.min(R,p[1])),p.col||'#2563eb',7,p.l||'');});
 return G.svg(s);}
/* unit-circle figure for angle t (radians) */
function circleFig(t,o={}){const W=o.W||300,c=W/2,r=W*0.38,X=x=>c+x*r,Y=y=>c-y*r;const ct=Math.cos(t),st=Math.sin(t);
 let s=`<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#94a3b8" stroke-width="2"/><line x1="8" y1="${c}" x2="${W-8}" y2="${c}" class="ax"/><line x1="${c}" y1="8" x2="${c}" y2="${W-8}" class="ax"/>`;
 const large=((t%(2*Math.PI))+2*Math.PI)%(2*Math.PI)>Math.PI?1:0,sweep=t>=0?0:1;
 if(Math.abs(t)>1e-6)s+=`<path d="M${X(0.22)} ${c} A ${0.22*r} ${0.22*r} 0 ${Math.abs(t)>Math.PI?1:0} ${sweep} ${X(0.22*ct)} ${Y(0.22*st)}" fill="none" stroke="#ea580c" stroke-width="2.5"/>`;
 if(o.arc!==false&&Math.abs(t)>1e-6)s+=`<path d="M${X(1)} ${c} A ${r} ${r} 0 ${Math.abs(t)%(2*Math.PI)>Math.PI?1:0} ${sweep} ${X(ct)} ${Y(st)}" fill="none" stroke="#e11d48" stroke-width="5" opacity=".7"/>`;
 s+=`<line x1="${c}" y1="${c}" x2="${X(ct)}" y2="${Y(st)}" stroke="#1f2937" stroke-width="2.5"/>`;
 s+=`<line x1="${X(ct)}" y1="${c}" x2="${X(ct)}" y2="${Y(st)}" stroke="#2563eb" stroke-width="4"/><line x1="${c}" y1="${c}" x2="${X(ct)}" y2="${c}" stroke="#059669" stroke-width="4"/>`;
 s+=`<circle cx="${X(ct)}" cy="${Y(st)}" r="7" fill="#e11d48" stroke="#fff" stroke-width="2"/>`;
 s+=`<text x="${X(ct)+(ct>=0?10:-10)}" y="${Y(st)+(st>=0?-10:20)}" text-anchor="${ct>=0?'start':'end'}" font-size="13" font-weight="800" fill="#e11d48" paint-order="stroke" stroke="#fff" stroke-width="4">(${nf(ct)}, ${nf(st)})</text>`;
 s+=`<text x="${X(1)+6}" y="${c-6}" class="tl">1</text>`;
 return `<svg viewBox="0 0 ${W} ${W}" class="fig" style="max-width:${W}px">${s}</svg>`;}
/* π-tick labels for trig graphs drawn on grid G (x in radians) */
function piTicks(G,from=-2,to=2){let s='';for(let k=from*2;k<=to*2;k++){if(!k)continue;const x=k*Math.PI/2;if(x<G.x0||x>G.x1)continue;const lab=k%2===0?(k/2===1?'π':k/2===-1?'−π':fmtNeg(k/2)+'π'):(k===1?'π/2':k===-1?'−π/2':fmtNeg(k)+'π/2');
 s+=`<line x1="${G.X(x)}" y1="${G.Y(0)-5}" x2="${G.X(x)}" y2="${G.Y(0)+5}" stroke="#374151" stroke-width="1.5"/><text x="${G.X(x)}" y="${G.Y(0)+18}" text-anchor="middle" class="tl" font-weight="700" fill="#be123c">${lab}</text>`;}return s;}
/* simple line through two points on G, clipped */
const seg2=(G,a,b,col='#374151',w=2,dash='')=>`<line clip-path="url(#${G.clip})" x1="${G.X(a[0])}" y1="${G.Y(a[1])}" x2="${G.X(b[0])}" y2="${G.Y(b[1])}" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
const vline=(G,x,col='#e11d48',dash='6 5')=>`<line x1="${G.X(x)}" y1="${G.Y(G.y0)}" x2="${G.X(x)}" y2="${G.Y(G.y1)}" stroke="${col}" stroke-width="2" stroke-dasharray="${dash}"/>`;
const hline=(G,y,col='#e11d48',dash='6 5')=>`<line x1="${G.X(G.x0)}" y1="${G.Y(y)}" x2="${G.X(G.x1)}" y2="${G.Y(y)}" stroke="${col}" stroke-width="2" stroke-dasharray="${dash}"/>`;
const hole=(G,x,y,col='#2563eb')=>`<circle cx="${G.X(x)}" cy="${G.Y(y)}" r="6" fill="#fff" stroke="${col}" stroke-width="3"/>`;
/* lesson builders */
const ex=(title,prob,lines)=>({title,prob,raw:true,lines});
const q=(qq,o,a,why)=>({q:qq,o,a,why});
const mc=(qq,correct,wrongs,why)=>{const w=[...new Set(wrongs.map(String))].filter(x=>x!==String(correct)).slice(0,3);const m=mcFrom(String(correct),w);return {type:'mc',q:qq,opts:m.opts,a:m.a,why};};
const num=(qq,fields,hint,sol)=>({q:qq,fields:fields.map(f=>Array.isArray(f)?{label:f[0],answer:f[1],tol:f[2]}:f),hint,sol,raw:true});
const nz=(a,b)=>{let v;do v=rand(a,b);while(!v);return v;};
const fr=frac;
return {TOOLS,sup,pw,ps,mono,padd,pneg,pmul,peval,synth,cs,cmul,sliders,graphLab,chooser,areaTable,cplane,circleFig,piTicks,seg2,vline,hline,hole,ex,q,mc,num,nz,fr,curve,stepper,nf};
})();
