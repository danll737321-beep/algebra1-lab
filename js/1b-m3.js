/* Algebra 1B · Module 3 · Quadratic Equations and Modeling */
(function(){
const SUP=['','','²'];
function q2(a,b,c,v='x'){let s='';[[a,2],[b,1],[c,0]].forEach(([k,d])=>{if(!k)return;const vv=d===2?v+'²':d===1?v:'';const ab=Math.abs(k),co=(ab===1&&d>0)?'':ab;s+=s?(k<0?' − ':' + ')+co+vv:(k<0?MINUS:'')+co+vv;});return s||'0';}
const Q=(a,b,c,v)=>mx(q2(a,b,c,v));
const fac=(p)=>p===0?mx('x'):mx(`x ${p<0?'+':'−'} ${Math.abs(p)}`);/* factor for root p: (x − p) */
const r2=v=>+(+v).toFixed(2);
function parab(G,f,col='#2563eb'){let d='';for(let x=G.x0;x<=G.x1+1e-9;x+=0.05){const y=Math.max(G.y0-3,Math.min(G.y1+3,f(x)));d+=(d?' L':'M')+G.X(x)+' '+G.Y(y);}return `<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="${col}" stroke-width="3"/>`;}
function stepper(el,sets){let k=0,st=0;
 el.innerHTML=`<div class="row">${sets.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div class="card" style="margin:10px 0;text-align:center" id="stc"></div><div class="note" id="stn"></div><div class="row"><button data-a="b">${t("◀ Back")}</button><button class="primary" data-a="n">${t("Next step ▶")}</button></div>`;
 const draw=()=>{const p=sets[k];$('#stc',el).innerHTML=p.steps[st].h;$('#stn',el).innerHTML=`<b>Step ${st}/${p.steps.length-1}:</b> `+p.steps[st].n;$('[data-a=b]',el).disabled=st===0;$('[data-a=n]',el).disabled=st===p.steps.length-1;$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k!==undefined){k=+b.dataset.k;st=0;}if(b.dataset.a==='n')st++;if(b.dataset.a==='b')st--;draw();});draw();}
const SMALL=(a,b)=>[{label:'smaller solution: x =',answer:Math.min(a,b)},{label:'larger solution: x =',answer:Math.max(a,b)}];

/* ---- widgets ---- */
function mountZeros(el){
 let p=-2,q=3,k=0;
 el.innerHTML=`<div class="ctrl"><label>zero p <input type="range" id="zp" min="-5" max="5" value="-2"></label><label>zero q <input type="range" id="zq" min="-5" max="5" value="3"></label><label>lift k <input type="range" id="zk" min="0" max="12" value="0"></label></div><div class="eqline math" id="zeq"></div><div id="zg"></div><div class="readout" id="zr"></div>`;
 const draw=()=>{const f=x=>(x-p)*(x-q)+k,G=grid({x0:-6,x1:6,y0:-10,y1:14,u:38,uy:16,lab:1,laby:2,gsy:2});const h=(p+q)/2,disc=((p-q)/2)**2-k;let s=parab(G,f);
  const zs=disc>0?[h-Math.sqrt(disc),h+Math.sqrt(disc)]:disc===0?[h]:[];zs.forEach(z=>s+=gdot(G,z,0,'#b91c1c',8,`(${fmtNeg(r2(z))}, 0)`));
  $('#zg',el).innerHTML=G.svg(s);
  $('#zeq',el).innerHTML=k?`${mx('y')} = (${fac(p)})(${fac(q)}) + ${k}`:`${mx('y')} = (${fac(p)})(${fac(q)}) = ${Q(1,-(p+q),p*q)}`;
  $('#zr',el).innerHTML=`<b>${zs.length} zero${zs.length===1?'':'s'}</b> (x-intercepts). `+(k===0?(p===q?`Both factors are the same → the parabola just touches the x-axis at x = ${p}.`:`Each factor gives a zero: x ${p<0?'+':'−'} ${Math.abs(p)} = 0 → x = ${p}, and x ${q<0?'+':'−'} ${Math.abs(q)} = 0 → x = ${q}.`):(zs.length?'Lifting the parabola moves the zeros closer together.':'Lifted above the x-axis → <b>no real zeros</b>.'));};
 ['zp','zq','zk'].forEach(id=>$('#'+id,el).addEventListener('input',e=>{const v=+e.target.value;if(id==='zp')p=v;if(id==='zq')q=v;if(id==='zk')k=v;draw();}));draw();
}
function mountPS(el){
 const PR=[[9,14],[-12,27],[7,-8],[-2,-15]];let k=0,pick_=null;
 el.innerHTML=`<div class="row">${PR.map(([b,c],i)=>`<button data-k="${i}">${q2(1,b,c)}</button>`).join('')}</div><div class="eqline math" id="pseq"></div><p style="text-align:center;margin:4px 0">Find two numbers that <b>multiply</b> to c and <b>add</b> to b. Tap a pair:</p><div id="pst"></div><div class="readout" id="psr"></div>`;
 const draw=()=>{const [b,c]=PR[k];const pairs=[];for(let i=1;i<=Math.abs(c);i++)if(c%i===0){const j=c/i;if(c>0){if(i<=j){pairs.push([i,j]);pairs.push([-i,-j]);}}else pairs.push([i,j]);}
  $('#pseq',el).innerHTML=`${Q(1,b,c)}: &nbsp; multiply to <b>${fmtNeg(c)}</b>, add to <b>${fmtNeg(b)}</b>`;
  $('#pst',el).innerHTML=`<div class="row" style="justify-content:center">${pairs.map(([m,n],i)=>`<button data-p="${i}" class="${pick_===i?(m+n===b?'opt right':'opt wrong'):''}" style="width:auto">${fmtNeg(m)} · ${P(n)} → sum ${fmtNeg(m+n)}</button>`).join('')}</div>`;
  if(pick_===null){$('#psr',el).innerHTML='Factor pairs of c are listed. Which one has the right sum?';}else{const [m,n]=pairs[pick_];$('#psr',el).innerHTML=m+n===b?`<span class="good">✓ ${fmtNeg(m)} and ${fmtNeg(n)}!</span> So ${Q(1,b,c)} = (${mx('x')} ${m<0?MINUS:'+'} ${Math.abs(m)})(${mx('x')} ${n<0?MINUS:'+'} ${Math.abs(n)}).<br>To <b>solve</b> ${Q(1,b,c)} = 0: one factor must be 0 → x = ${fmtNeg(-m)} or x = ${fmtNeg(-n)}.`:`<span class="bad">Sum is ${fmtNeg(m+n)}, not ${fmtNeg(b)}.</span> Try another pair.`;}
  $$('[data-k]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.k===k));el._pairs=pairs;};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k!==undefined){k=+b.dataset.k;pick_=null;}if(b.dataset.p!==undefined)pick_=+b.dataset.p;draw();});draw();
}
const V=t=>`<i class="v">${t}</i>`;
const XM=[{t:'2x² + 9x + 9',steps:[
 {h:`<div class="math big">2${V('x')}² + 9${V('x')} + 9</div>`,n:'a = 2, b = 9, c = 9. There is no GCF.'},
 {h:`<svg viewBox="0 0 220 170" class="fig" style="max-width:220px"><line x1="30" y1="20" x2="190" y2="150" stroke="#374151" stroke-width="3"/><line x1="190" y1="20" x2="30" y2="150" stroke="#374151" stroke-width="3"/><text x="110" y="40" text-anchor="middle" font-size="20" font-weight="800" fill="#7c3aed">a·c = 18</text><text x="110" y="148" text-anchor="middle" font-size="20" font-weight="800" fill="#15803d">b = 9</text><text x="40" y="92" text-anchor="middle" font-size="22" font-weight="800">?</text><text x="180" y="92" text-anchor="middle" font-size="22" font-weight="800">?</text></svg>`,n:'<b>X method:</b> multiply a·c = 2·9 = 18. Find two numbers that multiply to 18 and add to 9.'},
 {h:`<svg viewBox="0 0 220 170" class="fig" style="max-width:220px"><line x1="30" y1="20" x2="190" y2="150" stroke="#374151" stroke-width="3"/><line x1="190" y1="20" x2="30" y2="150" stroke="#374151" stroke-width="3"/><text x="110" y="40" text-anchor="middle" font-size="20" font-weight="800" fill="#7c3aed">18</text><text x="110" y="148" text-anchor="middle" font-size="20" font-weight="800" fill="#15803d">9</text><text x="40" y="92" text-anchor="middle" font-size="24" font-weight="800" fill="#ea580c">3</text><text x="180" y="92" text-anchor="middle" font-size="24" font-weight="800" fill="#ea580c">6</text></svg>`,n:'3 · 6 = 18 and 3 + 6 = 9 ✓'},
 {h:`<div class="math big">2${V('x')}² + <span class="tile">3${V('x')} + 6${V('x')}</span> + 9</div>`,n:'Split the middle term 9x into 3x + 6x.'},
 {h:`<div class="math big">${V('x')}(2${V('x')} + 3) + 3(2${V('x')} + 3)</div>`,n:'Group in pairs and factor out the GCF of each pair. The same binomial (2x + 3) appears twice!'},
 {h:`<div class="math big">(2${V('x')} + 3)(${V('x')} + 3)</div><p>Solve = 0: <b>x = −3/2</b> or <b>x = −3</b></p>`,n:'Factor out (2x + 3). Then set each factor to 0.'}]},
 {t:'3x² − 10x + 8',steps:[
 {h:`<div class="math big">3${V('x')}² − 10${V('x')} + 8</div>`,n:'a·c = 24, b = −10. The product is positive and the sum negative → both numbers are negative.'},
 {h:`<div class="math big">−4 · (−6) = 24, &nbsp; −4 + (−6) = −10</div>`,n:'Found the pair: −4 and −6.'},
 {h:`<div class="math big">3${V('x')}² <span class="tile">− 4${V('x')} − 6${V('x')}</span> + 8</div>`,n:'Split the middle term.'},
 {h:`<div class="math big">${V('x')}(3${V('x')} − 4) − 2(3${V('x')} − 4)</div>`,n:'Factor each pair. Careful with the sign: −6x + 8 = −2(3x − 4).'},
 {h:`<div class="math big">(3${V('x')} − 4)(${V('x')} − 2)</div><p>Solve = 0: <b>x = 4/3</b> or <b>x = 2</b></p>`,n:'Factor out the common binomial and use the Zero Product Property.'}]}];
function mountSqrt(el){
 let c=16;
 el.innerHTML=`<div class="ctrl"><label>c <input type="range" min="-9" max="36" value="16"></label></div><div class="eqline math" id="sqe"></div><div id="sqg"></div><div class="readout" id="sqr"></div>`;
 const draw=()=>{const G=grid({x0:-7,x1:7,y0:-10,y1:40,u:36,uy:8,lab:1,laby:5,gsy:5});let s=parab(G,x=>x*x)+`<line x1="${G.X(-7)}" y1="${G.Y(c)}" x2="${G.X(7)}" y2="${G.Y(c)}" stroke="#ea580c" stroke-width="3" stroke-dasharray="8 6"/>`;
  const r=Math.sqrt(Math.max(c,0));if(c>0)s+=gdot(G,-r,c,'#b91c1c',8,`x = −${fmtNeg(r2(r))}`)+gdot(G,r,c,'#b91c1c',8,`x = ${fmtNeg(r2(r))}`);if(c===0)s+=gdot(G,0,0,'#b91c1c',8,'x = 0');
  $('#sqg',el).innerHTML=G.svg(s);$('#sqe',el).innerHTML=`${mx('x')}² = ${fmtNeg(c)}`;
  $('#sqr',el).innerHTML=c>0?`<b>Two solutions:</b> x = ±√${c} = <b>±${Number.isInteger(r)?r:r2(r)}</b>. Both ${Number.isInteger(r)?r:'√'+c} and −${Number.isInteger(r)?r:'√'+c} square to ${c}.`:c===0?'<b>One solution:</b> x = 0. Only 0 squares to 0.':`<b>No real solution.</b> No real number squared is negative — the line never meets the parabola.`;};
 $('input',el).addEventListener('input',e=>{c=+e.target.value;draw();});draw();
}
function mountQF(el){
 let a=1,b=-2,c=-3;
 el.innerHTML=`<div class="ctrl"><label>a <input type="range" id="qa" min="-3" max="3" value="1"></label><label>b <input type="range" id="qb" min="-6" max="6" value="-2"></label><label>c <input type="range" id="qc" min="-8" max="8" value="-3"></label></div><div class="eqline math" id="qfe"></div><div id="qfg"></div><div class="readout" id="qfr"></div>`;
 const draw=()=>{if(a===0)a=1;const D=b*b-4*a*c,G=grid({x0:-7,x1:7,y0:-10,y1:10,u:34,uy:17,lab:1,laby:2,gsy:2});let s=parab(G,x=>a*x*x+b*x+c);const zs=D>0?[(-b-Math.sqrt(D))/(2*a),(-b+Math.sqrt(D))/(2*a)]:D===0?[-b/(2*a)]:[];zs.forEach(z=>s+=gdot(G,z,0,'#b91c1c',8,r2(z)));
  $('#qfg',el).innerHTML=G.svg(s);$('#qfe',el).innerHTML=`${Q(a,b,c)} = 0`;$('#qa',el).value=a;
  $('#qfr',el).innerHTML=`x = <span class="math">[−b ± √(b² − 4ac)] ÷ 2a</span> = [${fmtNeg(-b)} ± √(${P(b)}² − 4(${fmtNeg(a)})(${fmtNeg(c)}))] ÷ ${fmtNeg(2*a)} = [${fmtNeg(-b)} ± √${fmtNeg(D)}] ÷ ${fmtNeg(2*a)}<br>
  <b>Discriminant b² − 4ac = ${fmtNeg(D)}</b> → `+(D>0?`positive → <b>2 real solutions</b>: x ≈ ${zs.map(r2).map(fmtNeg).join(' and ')}`:D===0?`zero → <b>1 real solution</b>: x = ${fmtNeg(r2(zs[0]))}`:'negative → <b>no real solutions</b> (the parabola misses the x-axis)');};
 [['qa',v=>a=v],['qb',v=>b=v],['qc',v=>c=v]].forEach(([id,f])=>$('#'+id,el).addEventListener('input',e=>{f(+e.target.value);draw();}));draw();
}
function mountCTS(el){
 let b=6,done=false;
 el.innerHTML=`<div class="ctrl"><label>b <input type="range" min="2" max="10" step="2" value="6"></label><button class="primary" data-c>Complete the square</button><button data-u>↺</button></div><div class="eqline math" id="cse"></div><div id="csg"></div><div class="readout" id="csr"></div>`;
 const draw=()=>{const h=b/2,U=24,X=120,L=40,T=30;let s=`<rect x="${L}" y="${T}" width="${X}" height="${X}" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><text x="${L+X/2}" y="${T+X/2+6}" text-anchor="middle" font-size="20" font-weight="700" fill="#2563eb" font-family="Georgia,serif">x²</text>`;
  for(let i=0;i<h;i++){s+=`<rect x="${L+X+i*U}" y="${T}" width="${U}" height="${X}" fill="#bbf7d0" stroke="#15803d" stroke-width="1.5"/><text x="${L+X+i*U+U/2}" y="${T+X/2+4}" text-anchor="middle" font-size="12" fill="#15803d" font-family="Georgia,serif">x</text>`;s+=`<rect x="${L}" y="${T+X+i*U}" width="${X}" height="${U}" fill="#bbf7d0" stroke="#15803d" stroke-width="1.5"/><text x="${L+X/2}" y="${T+X+i*U+U/2+4}" text-anchor="middle" font-size="12" fill="#15803d" font-family="Georgia,serif">x</text>`;}
  for(let i=0;i<h;i++)for(let j=0;j<h;j++)s+=`<rect x="${L+X+j*U}" y="${T+X+i*U}" width="${U}" height="${U}" fill="${done?'#fde68a':'none'}" stroke="${done?'#b45309':'#9ca3af'}" stroke-width="1.5" stroke-dasharray="${done?0:'4 3'}"/>`;
  s+=`<text x="${L+X/2}" y="${T-10}" text-anchor="middle" font-weight="800" fill="#2563eb">x</text><text x="${L+X+h*U/2}" y="${T-10}" text-anchor="middle" font-weight="800">${h}</text><text x="${L-10}" y="${T+X/2}" text-anchor="end" font-weight="800" fill="#2563eb">x</text><text x="${L-10}" y="${T+X+h*U/2+5}" text-anchor="end" font-weight="800">${h}</text>`;
  const W=L+X+h*U+20;$('#csg',el).innerHTML=`<svg viewBox="0 0 ${W} ${T+X+h*U+20}" class="fig" style="max-width:${Math.min(460,W*1.3)}px">${s}</svg>`;
  $('#cse',el).innerHTML=done?`${Q(1,b,0)} + <b class="k">${h*h}</b> = (${mx('x')} + ${h})²`:`${Q(1,b,0)} + ?`;
  $('#csr',el).innerHTML=done?`The corner needed <b>${h} × ${h} = ${h*h}</b> unit tiles. That’s <b>(b ÷ 2)² = (${b} ÷ 2)² = ${h*h}</b>. Now it’s a perfect square: (x + ${h})².`:`Split the ${b} x-tiles in half: ${h} on the right, ${h} on the bottom. The corner is missing — how many unit tiles fill it?`;};
 el.addEventListener('click',e=>{if(e.target.closest('[data-c]'))done=true;if(e.target.closest('[data-u]'))done=false;draw();});$('input',el).addEventListener('input',e=>{b=+e.target.value;done=false;draw();});draw();
}

/* ---- lessons ---- */
L['1B-3-1']={
 goal:'I can connect the zeros (x-intercepts) of a quadratic function to its factors.',
 life:{title:'Where the ball lands',html:'A soccer ball is kicked from the ground and lands 40 m away. Its path is a <b>parabola</b>. The two places where its height is 0 — the kick and the landing — are the <b>zeros</b> of the function.<br>If you know the zeros, you can write the function: zeros 0 and 40 → y = a·x(x − 40).'},
 see:[{title:'Zeros ↔ factors',hint:'Move the zeros p and q. Then lift the parabola with k.',mount:mountZeros}],
 vocab:[['Zero of a function','An x-value that makes f(x) = 0 — an x-intercept.'],['Factored form','y = a(x − p)(x − q). The zeros are p and q.'],['Number of zeros','A parabola can have 2, 1, or 0 real zeros.']],
 examples:[
  {title:'Example 1 — Zeros from factors',prob:'Find the zeros of <span class="math">'+mx('y = (x + 2)(x − 3)')+'</span>.',raw:true,lines:[[mx('x + 2 = 0 → x = −2'),'Set each factor equal to 0.'],[mx('x − 3 = 0 → x = 3'),''],['zeros: −2 and 3','The graph crosses the x-axis at (−2, 0) and (3, 0).']]},
  {title:'Example 2 — Factors from zeros',prob:'Write a quadratic with zeros 1 and −5 (a = 1).',raw:true,lines:[[mx('(x − 1)(x + 5)'),'Zero r → factor (x − r).'],[Q(1,4,-5),'Multiply to get standard form: y = x² + 4x − 5.']]}],
 mistake:{bad:'Zero at x = 3 → factor (x + 3)',good:'factor (x − 3)',why:'The factor is zero when x = 3: (3 − 3) = 0. The sign <b>flips</b>.'},
 practice(){let p=rand(-6,6),q=rand(-6,6);if(p===q)q=p+rand(1,4);
  if(Math.random()<.6)return {q:`Find the zeros of <span class="math">${mx('y')} = (${fac(p)})(${fac(q)})</span>.`,fields:SMALL(p,q),hint:'Set each factor equal to 0.',sol:[[`${fac(p)} = 0 → x = ${fmtNeg(p)}`,'First factor.',true],[`${fac(q)} = 0 → x = ${fmtNeg(q)}`,'Second factor.',true]]};
  const m=mcFrom(`(${fac(p)})(${fac(q)})`,[`(${fac(-p)})(${fac(-q)})`,`(${fac(p)})(${fac(-q)})`,`(${fac(-p)})(${fac(q)})`].filter((v,i,a)=>a.indexOf(v)===i&&v!==`(${fac(p)})(${fac(q)})`));
  return {type:'mc',q:`Which factored form has zeros <b>${fmtNeg(p)}</b> and <b>${fmtNeg(q)}</b>?`,opts:m.opts,a:m.a,why:`A zero r comes from the factor (x − r).`};},
 check:[
  {q:'What are the zeros of y = (x − 4)(x + 1)?',o:['4 and −1','−4 and 1','4 and 1','−4 and −1'],a:0,why:'x − 4 = 0 → 4; x + 1 = 0 → −1.'},
  {q:'A parabola sits entirely above the x-axis. How many real zeros?',o:['0','1','2','infinitely many'],a:0,why:'It never crosses the x-axis.'},
  {q:'Which function has zeros 2 and 5?',o:['y = (x + 2)(x + 5)','y = (x − 2)(x − 5)','y = (x − 2)(x + 5)','y = x² + 7x + 10'],a:1,why:'Zero r → factor (x − r).'}]
};

L['1B-3-2']={
 goal:'I can solve x² + bx + c = 0 by factoring and the Zero Product Property.',
 life:{title:'If the product is 0…',html:'A string of old holiday lights goes dark if <b>any one bulb</b> is out. Multiplication works the same way: if A · B = 0, then <b>A = 0 or B = 0</b>.<br>So if you can write x² + 9x + 14 as (x + 2)(x + 7), solving (x + 2)(x + 7) = 0 is easy: x = −2 or x = −7.'},
 see:[{title:'Multiply to c, add to b',hint:'Pick an expression and tap factor pairs until the sum matches.',mount:mountPS}],
 vocab:[['Factor (verb)','Write an expression as a product: x² + 9x + 14 = (x + 2)(x + 7).'],['Product–sum rule','For x² + bx + c, find m and n with m · n = c and m + n = b.'],['Zero Product Property','If A · B = 0, then A = 0 or B = 0.'],['Sign tips','c > 0: same signs (both the sign of b). c < 0: opposite signs.']],
 examples:[
  {title:'Example 1',prob:'Solve <span class="math">'+mx('x² + 9x + 14 = 0')+'</span>.',raw:true,lines:[['2 · 7 = 14, 2 + 7 = 9','Find the pair.'],[mx('(x + 2)(x + 7) = 0'),'Factor.'],[mx('x + 2 = 0 or x + 7 = 0'),'Zero Product Property.'],[mx('x = −2 or x = −7'),'Solve each.']]},
  {title:'Example 2 — Rearrange first',prob:'Solve <span class="math">'+mx('x² − 12x = −27')+'</span>.',raw:true,lines:[[mx('x² − 12x + 27 = 0'),'Get 0 on one side (add 27).'],['(−3)(−9) = 27, −3 + (−9) = −12','c > 0 and b < 0 → both negative.'],[mx('(x − 3)(x − 9) = 0'),'Factor.'],[mx('x = 3 or x = 9'),'Solve.']]}],
 mistake:{bad:'x² + 7x − 8 = 0 → (x + 8)(x − 1) → x = 8, x = −1',good:'x = −8 or x = 1',why:'x + 8 = 0 means x = <b>−8</b>. Solve each factor — don’t just copy its number.'},
 practice(){let m=rand(-9,9),n=rand(-9,9);if(!m)m=3;if(!n)n=-5;const b=m+n,c=m*n;
  return {q:`Solve by factoring: <span class="math">${Q(1,b,c)} = 0</span>`,fields:SMALL(-m,-n),hint:`Find two numbers that multiply to ${fmtNeg(c)} and add to ${fmtNeg(b)}.`,sol:[[`${fmtNeg(m)} · ${P(n)} = ${fmtNeg(c)}, ${fmtNeg(m)} + ${P(n)} = ${fmtNeg(b)}`,'The pair.'],[`(${fac(-m)})(${fac(-n)}) = 0`,'Factor.',true],[`x = ${fmtNeg(-m)} or x = ${fmtNeg(-n)}`,'Zero Product Property.']]};},
 check:[
  {q:'Factor x² + 9x + 14.',o:['(x + 2)(x + 7)','(x + 1)(x + 14)','(x − 2)(x − 7)','(x + 3)(x + 6)'],a:0,why:'2 · 7 = 14 and 2 + 7 = 9.'},
  {q:'Solve (x − 1)(x + 8) = 0.',o:['x = −1 or x = 8','x = 1 or x = −8','x = 1 or x = 8','x = −7'],a:1,why:'x − 1 = 0 → 1; x + 8 = 0 → −8.'},
  {q:'For x² − 2x − 15, the two numbers have…',o:['the same sign','opposite signs','to both be positive','a sum of −15'],a:1,why:'c = −15 is negative, so the signs are opposite (−5 and 3).'}]
};

L['1B-3-3']={
 goal:'I can solve ax² + bx + c = 0 by factoring when a ≠ 1.',
 life:{title:'Undoing a multiplication',html:'Factoring is <b>multiplying backwards</b>. When the x² term has a coefficient, like 2x², you need one more tool: the <b>X method</b> — a little puzzle that tells you exactly how to split the middle term.'},
 see:[{title:'The X method, step by step',hint:'Step through both examples.',mount:el=>stepper(el,XM)}],
 vocab:[['GCF first','Always factor out a greatest common factor first: 4x² + 10x + 6 = 2(2x² + 5x + 3).'],['X method','Find two numbers that multiply to a·c and add to b.'],['Factor by grouping','Split the middle term, then factor each pair; a common binomial appears.']],
 examples:[
  {title:'Example A',prob:'Solve <span class="math">'+mx('2x² + 9x + 9 = 0')+'</span>.',raw:true,lines:[['a·c = 18 → 3 and 6','3 · 6 = 18, 3 + 6 = 9.'],[mx('2x² + 3x + 6x + 9'),'Split the middle term.'],[mx('x(2x + 3) + 3(2x + 3)'),'Group and factor.'],[mx('(2x + 3)(x + 3) = 0'),'Common binomial.'],['x = −3/2 or x = −3','Zero Product Property.']]},
  {title:'Example B — Check by multiplying',prob:'Is <span class="math">'+mx('(3x − 4)(x − 2)')+'</span> the factored form of <span class="math">'+mx('3x² − 10x + 8')+'</span>?',raw:true,lines:[[mx('3x² − 6x − 4x + 8'),'FOIL.'],[Q(3,-10,8)+' ✓','Yes — it matches.']]}],
 mistake:{bad:'2x + 3 = 0 → x = −3',good:'x = −3/2',why:'Solve completely: subtract 3, then <b>divide by 2</b>.'},
 practice(){const a=pick([2,3,5]),num=pick([-5,-3,-1,1,3,5]),n=rand(-6,6)||2;/* (a x - num)(x - n) */const A=a,B=-(num+a*n),C=num*n;if(gcd(gcd(Math.abs(A),Math.abs(B)),Math.abs(C))>1)return this.practice();
  const r1=num/a,r2_=n;return {q:`Solve: <span class="math">${Q(A,B,C)} = 0</span> <span class="mute">(fractions like −3/2 are OK)</span>`,fields:SMALL(r1,r2_),hint:`a·c = ${fmtNeg(A*C)}. Find two numbers that multiply to ${fmtNeg(A*C)} and add to ${fmtNeg(B)}.`,
   sol:[[`(${a}x ${num<0?'+':'−'} ${Math.abs(num)})(${fac(n).replace(/<[^>]+>/g,'')}) = 0`,'Factor (check by multiplying).'],[`x = ${frac(num,a)} or x = ${fmtNeg(n)}`,'Zero Product Property.']]};},
 check:[
  {q:'For 2x² + 9x + 9, the X method needs two numbers that multiply to…',o:['9','18','2','11'],a:1,why:'a·c = 2 · 9 = 18.'},
  {q:'Factor 2x² + 7x + 3.',o:['(2x + 1)(x + 3)','(2x + 3)(x + 1)','(x + 7)(2x + 3)','2(x + 3)(x + 1)'],a:0,why:'(2x + 1)(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3.'},
  {q:'Solve (3x − 4)(x − 2) = 0.',o:['x = 4 or 2','x = 4/3 or 2','x = −4/3 or −2','x = 3/4 or 2'],a:1,why:'3x − 4 = 0 → x = 4/3; x − 2 = 0 → x = 2.'}]
};

L['1B-3-4']={
 goal:'I can solve quadratic equations by taking square roots and know when there are 2, 1, or 0 real solutions.',
 life:{title:'A square garden',html:'A square garden has an area of <b>49 m²</b>. How long is each side? You need a number that squared gives 49: <b>7</b> (a side can’t be −7, but the equation x² = 49 has both 7 and −7 as solutions).<br>Dropping a phone from 64 ft: 16t² = 64 → t² = 4 → it hits the ground after <b>2 seconds</b>.'},
 see:[{title:'x² = c: how many solutions?',hint:'Slide c. Count where the orange line meets the parabola.',mount:mountSqrt}],
 vocab:[['Square root','√c is the non-negative number that squared gives c.'],['Principle of Square Roots','x² = c has two real solutions ±√c when c > 0, one (0) when c = 0, none when c < 0.'],['Isolate the square first','Get x² (or (x − h)²) alone before taking the square root.']],
 examples:[
  {title:'Example 1',prob:'Solve <span class="math">'+mx('3x² − 75 = 0')+'</span>.',raw:true,lines:[[mx('3x² = 75'),'Add 75.'],[mx('x² = 25'),'Divide by 3.'],[mx('x = ±5'),'Take the square root — remember ±.']]},
  {title:'Example 2 — A squared binomial',prob:'Solve <span class="math">'+mx('(x − 2)² = 9')+'</span>.',raw:true,lines:[[mx('x − 2 = ±3'),'Square root of both sides.'],[mx('x = 2 + 3 or x = 2 − 3'),'Add 2.'],[mx('x = 5 or x = −1'),'Two solutions.']]},
  {title:'Example 3 — No real solution',prob:'Solve <span class="math">'+mx('x² + 16 = 0')+'</span>.',raw:true,lines:[[mx('x² = −16'),'Subtract 16.'],['no real solution','No real number squared is negative.']]}],
 mistake:{bad:'x² = 25 → x = 5',good:'x = ±5',why:'(−5)² = 25 too. A positive number has <b>two</b> square roots.'},
 practice(){const ty=rand(0,2);
  if(ty===0){const a=pick([1,2,3,4,5]),r=rand(1,9);return {q:`Solve <span class="math">${Q(a,0,-a*r*r)} = 0</span>.`,fields:SMALL(-r,r),hint:'Isolate x², then take ± the square root.',sol:[[`${a===1?'':a}x² = ${a*r*r}`,`Add ${a*r*r}.`],[`x² = ${r*r}`,a===1?'':`Divide by ${a}.`],[`x = ±${r}`,'Square root.']]};}
  if(ty===1){const h=rand(-5,5),r=rand(1,6);return {q:`Solve <span class="math">(${fac(h)})² = ${r*r}</span>.`,fields:SMALL(h-r,h+r),hint:'Take the square root of both sides first: x − h = ±√k.',sol:[[`${fac(h)} = ±${r}`,'Square root.',true],[`x = ${fmtNeg(h)} ± ${r}`,'Isolate x.'],[`x = ${fmtNeg(h-r)} or x = ${fmtNeg(h+r)}`,'Two solutions.']]};}
  const c=pick([-25,-9,-4,0,4,16,36]);return {type:'mc',q:`How many real solutions does <span class="math">${mx('x')}² = ${fmtNeg(c)}</span> have?`,opts:['Two','One','None'],a:c>0?0:c===0?1:2,why:c>0?`±${Math.sqrt(c)}.`:c===0?'Only 0.':'No real number squared is negative.'};},
 check:[
  {q:'Solve x² = 49.',o:['x = 7','x = ±7','x = 24.5','no solution'],a:1,why:'7² = 49 and (−7)² = 49.'},
  {q:'How many real solutions does x² = −4 have?',o:['2','1','0','4'],a:2,why:'A square can’t be negative.'},
  {q:'Solve (x − 2)² = 9.',o:['x = 5 or −1','x = 11 or −7','x = ±3','x = 5'],a:0,why:'x − 2 = ±3 → x = 5 or −1.'}]
};

L['1B-3-5']={
 goal:'I can solve any quadratic equation with the quadratic formula and use the discriminant to count real solutions.',
 life:{title:'When does the ball hit the ground?',html:'A ball is tossed up: height <span class="math">'+mx('h = −16t² + 32t + 6')+'</span> (feet, seconds). It hits the ground when h = 0. This doesn’t factor nicely — but the <b>quadratic formula</b> works on <b>every</b> quadratic: t ≈ <b>2.17 seconds</b>.'},
 see:[{title:'The formula and the discriminant',hint:'Change a, b, c. Watch the discriminant decide how many times the parabola hits the x-axis.',mount:mountQF}],
 vocab:[['Quadratic formula','For ax² + bx + c = 0: x = [−b ± √(b² − 4ac)] ÷ 2a.'],['Discriminant','b² − 4ac. Positive → 2 real solutions; zero → 1; negative → 0.'],['Standard form first','Write the equation as ax² + bx + c = 0 before reading a, b, c.']],
 examples:[
  {title:'Example 1',prob:'Solve <span class="math">'+mx('x² − 6x + 5 = 0')+'</span> with the formula.',raw:true,lines:[['a = 1, b = −6, c = 5','Identify a, b, c (with signs!).'],['x = [6 ± √(36 − 20)] ÷ 2','Substitute: −b = 6, b² = 36, 4ac = 20.'],['x = [6 ± 4] ÷ 2','√16 = 4.'],['x = 5 or x = 1','(6 + 4) ÷ 2 and (6 − 4) ÷ 2.']]},
  {title:'Example 2 — Discriminant only',prob:'How many real solutions does <span class="math">'+mx('2x² + 3x + 5 = 0')+'</span> have?',raw:true,lines:[['b² − 4ac = 9 − 40','3² − 4(2)(5).'],['= −31 < 0','Negative.'],['no real solutions','The parabola never touches the x-axis.']]}],
 mistake:{bad:'b = −6 → b² = −36',good:'b² = (−6)² = 36',why:'Use parentheses when you square a negative. b² is never negative.'},
 practice(){
  if(Math.random()<.45){const a=pick([1,2,3,-1]),b=rand(-6,6),c=rand(-6,6);const D=b*b-4*a*c;return {q:`For <span class="math">${Q(a,b,c)} = 0</span>, find the discriminant and the number of real solutions.`,fields:[{label:'b² − 4ac =',answer:D},{label:'number of real solutions:',answer:D>0?2:D===0?1:0}],hint:'Compute b² − 4ac carefully with parentheses.',sol:[[`(${fmtNeg(b)})² − 4(${fmtNeg(a)})(${fmtNeg(c)}) = ${fmtNeg(D)}`,'Discriminant.'],[D>0?'2 solutions':D===0?'1 solution':'0 real solutions','Positive / zero / negative.',true]]};}
  let a,b,c,D;do{a=pick([1,2,3]);b=rand(-7,7);c=rand(-8,4);D=b*b-4*a*c;}while(D<=0);const x1=(-b-Math.sqrt(D))/(2*a),x2=(-b+Math.sqrt(D))/(2*a);
  return {q:`Solve <span class="math">${Q(a,b,c)} = 0</span> with the quadratic formula. <span class="mute">(nearest hundredth)</span>`,fields:[{label:'smaller x ≈',answer:Math.round(x1*100)/100,tol:.011},{label:'larger x ≈',answer:Math.round(x2*100)/100,tol:.011}],hint:'x = [−b ± √(b² − 4ac)] ÷ 2a',
   sol:[[`x = [${fmtNeg(-b)} ± √${D}] ÷ ${2*a}`,'Substitute.'],[`√${D} ≈ ${fmtNeg(r2(Math.sqrt(D)))}`,'Square root.'],[`x ≈ ${fmtNeg(r2(x1))} or x ≈ ${fmtNeg(r2(x2))}`,'Compute both.']]};},
 check:[
  {q:'The discriminant of x² − 6x + 9 is 0. How many real solutions?',o:['0','1','2','3'],a:1,why:'Discriminant 0 → one real solution (x = 3).'},
  {q:'In 3x² − 5 = 2x, what is b?',o:['2','−2','−5','3'],a:1,why:'Standard form: 3x² − 2x − 5 = 0, so b = −2.'},
  {q:'Solve x² − 6x + 5 = 0.',o:['x = 1 or 5','x = −1 or −5','x = 6','x = 3 ± 4'],a:0,why:'[6 ± 4] ÷ 2 = 5 or 1.'}]
};

L['1B-3-6']={
 goal:'I can complete the square and use it to solve quadratic equations.',
 life:{title:'Literally completing a square',html:'You have an x² tile and some x tiles. Arrange them into a square — one corner is <b>missing</b>. The number of small tiles that fills that corner is what “completing the square” adds.<br>Once you have a perfect square, (x + h)², you can solve by taking square roots.'},
 see:[{title:'Fill the missing corner',hint:'Choose b, then press “Complete the square”.',mount:mountCTS}],
 vocab:[['Perfect square trinomial','x² + bx + (b/2)² = (x + b/2)².'],['Completing the square','Add (b/2)² to x² + bx to make a perfect square.'],['Keep it balanced','In an equation, add (b/2)² to BOTH sides.']],
 examples:[
  {title:'Example 1 — Complete the square',prob:'Complete the square for <span class="math">'+mx('x² + 18x')+'</span>.',raw:true,lines:[['(18 ÷ 2)² = 81','Half of b, then square.'],[Q(1,18,81),'Add it.'],[mx('(x + 9)²'),'Factor.']]},
  {title:'Example 2 — Solve',prob:'Solve <span class="math">'+mx('x² + 6x = 16')+'</span>.',raw:true,lines:[[mx('x² + 6x + 9 = 16 + 9'),'Add (6 ÷ 2)² = 9 to both sides.'],[mx('(x + 3)² = 25'),'Factor the left side.'],[mx('x + 3 = ±5'),'Square root.'],[mx('x = 2 or x = −8'),'Subtract 3.']]}],
 mistake:{bad:'x² + 6x = 16 → x² + 6x + 9 = 16',good:'x² + 6x + 9 = 25',why:'Add the 9 to <b>both</b> sides to keep the equation balanced.'},
 practice(){
  if(Math.random()<.4){const b=pick([-14,-10,-8,-6,-4,4,6,8,10,12,16,20]);return {q:`What number completes the square: <span class="math">${Q(1,b,0)} + ___</span>?`,fields:[{label:'add',answer:(b/2)**2}],hint:'(b ÷ 2)²',sol:[[`(${fmtNeg(b)} ÷ 2)² = ${(b/2)**2}`,'Half of b, squared.'],[`(${fac(-b/2)})²`,'The perfect square.',true]]};}
  const h=rand(-6,6)||2,r=rand(1,7),b=2*h,k=r*r-h*h;/* x²+bx = k → (x+h)² = r² */
  return {q:`Solve by completing the square: <span class="math">${Q(1,b,0)} = ${fmtNeg(k)}</span>`,fields:SMALL(-h-r,-h+r),hint:`Add (${fmtNeg(b)} ÷ 2)² = ${h*h} to both sides.`,sol:[[`${q2(1,b,h*h)} = ${fmtNeg(k)} + ${h*h}`,'Complete the square on both sides.'],[`(${fac(-h).replace(/<[^>]+>/g,'')})² = ${r*r}`,'Factor.'],[`x ${h<0?'−':'+'} ${Math.abs(h)} = ±${r}`,'Square root.'],[`x = ${fmtNeg(-h-r)} or x = ${fmtNeg(-h+r)}`,'Solve.']]};},
 check:[
  {q:'What completes the square for x² − 22x?',o:['11','121','−121','484'],a:1,why:'(−22 ÷ 2)² = (−11)² = 121.'},
  {q:'x² + 10x + 25 = ?',o:['(x + 5)²','(x + 10)²','(x + 25)²','(x − 5)²'],a:0,why:'Half of 10 is 5, and 5² = 25.'},
  {q:'Solve x² + 6x = 16.',o:['x = 2 or −8','x = −2 or 8','x = 4 or −4','x = 10'],a:0,why:'(x + 3)² = 25 → x + 3 = ±5.'}]
};
})();
