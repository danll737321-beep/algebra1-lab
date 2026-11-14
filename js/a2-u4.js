/* Algebra 2 · Unit 4 · Polynomial division */
(function(){const {ps,mono,pmul,peval,synth,sliders,graphLab,areaTable,ex,q,mc,num,nz,stepper,TOOLS,nf,sup}=A2;
function synTable(co,r){const {q:qq,rem}=synth(co,r);const mid=[''];let c=0;co.forEach((k,i)=>{if(i){mid.push(fmtNeg(c*r));}c=c*r+k;});
 return `<table class="t" style="margin:8px auto;font-size:1.1em"><tr><th rowspan="3" style="border-right:3px solid #374151">${fmtNeg(r)}</th>${co.map(k=>`<td>${fmtNeg(k)}</td>`).join('')}</tr><tr>${mid.map(v=>`<td style="color:#2563eb">${v}</td>`).join('')}</tr><tr style="border-top:3px solid #374151">${qq.map(v=>`<td><b>${fmtNeg(v)}</b></td>`).join('')}<td style="background:#fee2e2"><b>${fmtNeg(rem)}</b></td></tr></table>`;}
function mountByX(el){sliders(el,[{k:'d',l:'divide by x to the power',min:1,max:2,v:1},{k:'c',l:'coefficient',min:1,max:3,v:2}],V=>{const N=[6,-4,2,0];const den=mono(V.c,V.d);
  const parts=N.map((k,i)=>[k,3-i]).filter(x=>x[0]);
  $('.bx-r',el).innerHTML=`<div class="eqline math">(${ps(N)}) ÷ ${den}</div><div class="eqline math" style="font-size:1.25em">= ${parts.map(([k,d])=>`<span style="display:inline-block;text-align:center;vertical-align:middle;margin:0 4px"><span style="border-bottom:2px solid #374151;display:block;padding:0 4px">${mono(k,d)}</span><span>${den}</span></span>`).join(' + ')}</div><div class="eqline math">= <b>${parts.map(([k,d])=>{const kk=k/V.c,dd=d-V.d;return dd<0?`${nf(kk)}/x${sup(-dd>1?-dd:'')}`:mono(+kk.toFixed(4),dd);}).join(' + ').replace(/\+ −/g,'− ')}</b></div><span class="mute">Split into one fraction per term, then divide coefficients and subtract exponents. ${V.d===2?'A negative exponent means a term like 1/x — the result is no longer a polynomial (there is a remainder).':''}</span>`;},`<div class="readout bx-r"></div>`).run();}
function mountLong(el){stepper(el,[{t:'(x² + 7x + 10) ÷ (x + 2)',steps:[
 {h:'<div class="eqline math">x + 2 ) x² + 7x + 10</div>',n:'Divide the leading terms: x² ÷ x = x. Write x on top.'},
 {h:'<div class="eqline math">x(x + 2) = x² + 2x</div>',n:'Multiply x by the divisor.'},
 {h:'<div class="eqline math">(x² + 7x) − (x² + 2x) = 5x → bring down +10 → 5x + 10</div>',n:'Subtract and bring down the next term.'},
 {h:'<div class="eqline math">5x ÷ x = 5; 5(x + 2) = 5x + 10; remainder 0</div>',n:'Repeat: divide, multiply, subtract.'},
 {h:'<div class="eqline math">x² + 7x + 10 = (x + 2)(x + 5)</div>'+areaTable(['x','2'],['x','5'],(i,j)=>[['x²','5x'],['2x','10']][i][j],(i,j)=>i+j),n:'Remainder 0 means x + 2 is a factor. The area model shows the same answer.'}]},
 {t:'(2x² − 3x + 4) ÷ (x − 1)',steps:[
 {h:'<div class="eqline math">2x² ÷ x = 2x</div>',n:'Divide leading terms.'},
 {h:'<div class="eqline math">(2x² − 3x) − (2x² − 2x) = −x → −x + 4</div>',n:'Multiply 2x(x − 1), subtract, bring down.'},
 {h:'<div class="eqline math">−x ÷ x = −1; (−x + 4) − (−x + 1) = 3</div>',n:'Repeat. The remainder is 3.'},
 {h:'<div class="eqline math">2x² − 3x + 4 = (x − 1)(2x − 1) + 3</div><div class="eqline math">→ 2x − 1 + 3/(x − 1)</div>',n:'Write the answer: quotient + remainder/divisor.'}]}]);}
const POLYS=[[1,-2,-5,6],[2,-3,0,4],[1,0,-7,6],[1,4,1,-6]];
function mountSynth(el){let pi=0;el.innerHTML=`<div class="row">${POLYS.map((p,i)=>`<button data-p="${i}">${ps(p)}</button>`).join('')}</div><div class="sy-s"></div>`;
 const sp=sliders($('.sy-s',el),[{k:'r',l:'divide by (x − r): r',min:-4,max:4,v:1}],V=>{const co=POLYS[pi],{q:qq,rem}=synth(co,V.r);
  $('.sy-t',el).innerHTML=synTable(co,V.r);
  $('.sy-r',el).innerHTML=`(${ps(co)}) ÷ (x ${V.r<0?'+':'−'} ${Math.abs(V.r)}) = <b>${ps(qq)}</b>${rem?` remainder <b>${fmtNeg(rem)}</b>`:' with <b class="good">remainder 0 → (x '+(V.r<0?'+':'−')+' '+Math.abs(V.r)+') is a factor!</b>'}<br><span class="mute">Bring down, multiply by r (blue), add, repeat. The last number is the remainder; the others are the quotient’s coefficients (one degree lower).</span>`;},`<div class="sy-t"></div><div class="readout sy-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;pi=+b.dataset.p;$$('[data-p]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$('[data-p]',el).classList.add('sel');sp.run();}
function mountRem(el){const co=[1,-2,-5,6];graphLab(el,{g:{x0:-4,x1:5,y0:-12,y1:14,u:44,uy:11,lab:1,laby:4},params:[{k:'a',l:'a',min:-3,max:4,step:.5,v:2}],curves:()=>[{f:x=>peval(co,x)}],
 extra:(G,V)=>gdot(G,V.a,peval(co,V.a),'#e11d48',8,`(${nf(V.a)}, ${nf(peval(co,V.a))})`),eq:()=>'p(x) = '+ps(co),
 read:V=>{const {rem}=synth(co,V.a);return `p(${nf(V.a)}) = <b>${nf(peval(co,V.a))}</b> &nbsp;and&nbsp; the remainder of p(x) ÷ (x − ${nf(V.a)}) is <b>${nf(rem)}</b> — the same! ${Math.abs(rem)<1e-9?'<span class="good">Remainder 0: the graph crosses the x-axis here, so (x − '+nf(V.a)+') is a factor.</span>':''}<br><span class="mute">Remainder theorem: dividing by (x − a) leaves remainder p(a).</span>`;}});}

L['A2-4-1']={goal:'I can divide a polynomial by a monomial such as x or 3x².',
 life:{title:'Sharing equally',html:'A team’s total score is 6x³ − 4x² + 2x points shared by 2x players. Each player’s share is the total ÷ 2x. Dividing by a monomial means dividing <b>every term</b> by it.'},
 see:[{title:'Split, then divide each term',hint:'Change the divisor. When does a 1/x term appear?',mount:mountByX}],
 vocab:[['Dividend ÷ divisor','The polynomial being divided ÷ what you divide by.'],['Term by term','(a + b)/c = a/c + b/c.'],['Quotient rule','xᵃ/xᵇ = xᵃ⁻ᵇ.']],
 examples:[ex('Example 1','(12x⁴ − 8x³ + 4x²) ÷ 4x²',[['12x⁴/4x² − 8x³/4x² + 4x²/4x²','Split.'],['3x² − 2x + 1','Divide each.']]),
  ex('Example 2','(5x³ + 10x − 3) ÷ x',[['5x² + 10 − 3/x','The last term leaves 3/x — not a polynomial.']])],
 mistake:{bad:'(6x² + 3)/3 = 2x² + 3',good:'2x² + 1',why:'Divide <b>every</b> term, including the constant.'},
 practice(){const c=rand(1,4),d=rand(1,2);const Q=[nz(-6,6),rand(-6,6),nz(-6,6)];const N=pmul(Q,[c,...Array(d).fill(0)]);
  return num(`Divide <b>(${ps(N)}) ÷ ${mono(c,d)}</b> = ax² + bx + k.`,[['a =',Q[0]],['b =',Q[1]],['k =',Q[2]]],'Divide each term: coefficients ÷ '+c+', exponents − '+d+'.',[[ps(Q),'Term by term.']]);},
 check:[q('(8x³ − 4x) ÷ 4x = ?',['2x² − 1','2x² − 4x','2x³ − 1','2x²'],0,'Each term ÷ 4x.'),q('(x² + x) ÷ x = ?',['x','x + 1','x² + 1','2x'],1,'x²/x + x/x.'),q('(3x + 2) ÷ x = ?',['3 + 2/x','3x + 2','5','3 + 2x'],0,'2/x remains.')]};

L['A2-4-2']={goal:'I can divide a quadratic by a linear factor using long division or an area model.',
 life:{title:'Missing side length',html:'A rectangle has area x² + 7x + 10 and one side is x + 2. What is the other side? Division answers it: <b>x + 5</b>. If the division leaves a remainder, the side is not a nice polynomial.'},
 see:[{title:'Long division, step by step',hint:'Divide → multiply → subtract → bring down.',mount:mountLong}],
 vocab:[['Long division','Divide, multiply, subtract, bring down; repeat.'],['Remainder','What is left; its degree is less than the divisor’s.'],['Result form','dividend = divisor · quotient + remainder.']],
 examples:[ex('Example 1','(x² − x − 12) ÷ (x − 4)',[['x² ÷ x = x; x(x − 4) = x² − 4x','First round.'],['3x − 12; 3(x − 4) = 3x − 12','Second round.'],['x + 3, remainder 0','So x² − x − 12 = (x − 4)(x + 3).']]),
  ex('Example 2','(x² + 5x + 9) ÷ (x + 2)',[['x + 3, remainder 3','(x + 2)(x + 3) = x² + 5x + 6, and 9 − 6 = 3.'],['x + 3 + 3/(x + 2)','Answer form.']])],
 mistake:{bad:'Subtract (x² + 2x): 7x − 2x = 9x',good:'5x',why:'Subtract means change <b>both</b> signs: 7x − 2x = 5x, and x² − x² = 0.'},
 practice(){const a=nz(-6,6),b=rand(-7,7),R=Math.random()<.5?0:nz(-5,5);const N=pmul([1,a],[1,b]);N[2]+=R;
  return num(`Divide <b>(${ps(N)}) ÷ (${ps([1,a])})</b>. Answer: x + q, remainder R.`,[['q =',b],['R =',R]],'x² ÷ x = x first. Then divide what remains.',[[`(${ps([1,a])})(${ps([1,b])}) = ${ps(pmul([1,a],[1,b]))}`,'Multiply back.'],[`remainder ${R}`,`${ps(N)} − ${ps(pmul([1,a],[1,b]))}.`]]);},
 check:[q('(x² + 8x + 15) ÷ (x + 3) = ?',['x + 5','x + 3','x − 5','x + 12'],0,'(x + 3)(x + 5).'),q('Remainder of (x² + 1) ÷ (x − 1)?',['0','1','2','−1'],2,'(x − 1)(x + 1) = x² − 1.'),q('If the remainder is 0, the divisor is…',['a factor','a zero','undefined','the GCF'],0,'It divides evenly.')]};

L['A2-4-3']={goal:'I can divide any polynomial by (x − r) using synthetic division.',
 life:{title:'A shortcut machine',html:'Long division with cubics gets long. <b>Synthetic division</b> keeps only the numbers — bring down, multiply, add — and gives the quotient and remainder in seconds. It works whenever the divisor is x − r.'},
 see:[{title:'Synthetic division table',hint:'Choose a polynomial and slide r. Hunt for remainder 0.',mount:mountSynth}],
 vocab:[['Synthetic division','Shortcut for dividing by (x − r) using only coefficients.'],['Placeholder 0','Write 0 for any missing power (e.g., no x² term).'],['Divide by x + 3','Use r = −3.']],
 examples:[ex('Example 1','(x³ − 2x² − 5x + 6) ÷ (x − 3)',[['coefficients 1, −2, −5, 6; r = 3','Set up.'],['1 → 1·3 = 3 → 1; 1·3 = 3 → −2; −2·3 = −6 → 0','Bring down, multiply, add.'],['x² + x − 2, remainder 0','Quotient is one degree lower.']]),
  ex('Example 2','(2x³ + 4) ÷ (x + 1)',[['2, 0, 0, 4; r = −1','Placeholders for x² and x.'],['2, −2, 2 | remainder 2','Synthetic steps.'],['2x² − 2x + 2 + 2/(x + 1)','Answer.']])],
 mistake:{bad:'(x³ + 1) ÷ (x − 1): coefficients 1, 1',good:'1, 0, 0, 1',why:'Include a 0 for every missing power, or the columns line up wrong.'},
 practice(){const r=nz(-4,4),Q=[1,rand(-5,5),rand(-6,6)],R=rand(-8,8);const N=pmul(Q,[1,-r]);N[3]+=R;
  return num(`Use synthetic division: <b>(${ps(N)}) ÷ (x ${r<0?'+':'−'} ${Math.abs(r)})</b>. Quotient x² + bx + c, remainder R.`,[['b =',Q[1]],['c =',Q[2]],['R =',R]],`Use r = ${r}. Bring down 1, multiply by ${r}, add.`,[[synTable(N,r),'Synthetic table.'],[`${ps(Q)}, remainder ${R}`,'Read the bottom row.']]);},
 check:[q('To divide by (x + 4), use r = …',['4','−4','1/4','0'],1,'x + 4 = x − (−4).'),q('Coefficients for x³ − 7x + 6?',['1, −7, 6','1, 0, −7, 6','1, −7, 0, 6','0, 1, −7, 6'],1,'Missing x² → 0.'),q('A cubic ÷ (x − r) gives a quotient of degree…',['3','2','1','4'],1,'One less.')]};

L['A2-4-4']={goal:'I can use the remainder theorem: the remainder of p(x) ÷ (x − a) equals p(a).',
 life:{title:'Check a factor without dividing',html:'Is (x − 2) a factor of x³ − 2x² − 5x + 6? Just plug in 2: p(2) = 8 − 8 − 10 + 6 = −4 ≠ 0, so no. Try x = 1: p(1) = 0, so <b>(x − 1) is a factor</b>. One substitution replaces a whole division.'},
 see:[{title:'Remainder = height of the graph',hint:'Slide a. Compare p(a) with the remainder.',mount:mountRem}],
 vocab:[['Remainder theorem','p(x) ÷ (x − a) has remainder p(a).'],['Factor theorem','(x − a) is a factor ⇔ p(a) = 0.'],['Zero / root','An x where p(x) = 0 (an x-intercept).']],
 examples:[ex('Example 1','Remainder of (2x³ − x + 5) ÷ (x + 2)?',[['p(−2) = 2(−8) + 2 + 5','Plug in a = −2.'],['= −9','The remainder is −9.']]),
  ex('Example 2','Is (x + 3) a factor of x³ + 27?',[['p(−3) = −27 + 27 = 0','Yes — remainder 0.']])],
 mistake:{bad:'Remainder of p(x) ÷ (x + 2) is p(2)',good:'p(−2)',why:'x + 2 = x − (−2), so a = −2.'},
 practice(){const co=[rand(1,3),rand(-4,4),rand(-6,6),rand(-9,9)],a=nz(-3,3);return num(`Find the remainder when <b>${ps(co)}</b> is divided by <b>(x ${a<0?'+':'−'} ${Math.abs(a)})</b>.`,[['remainder =',peval(co,a)]],`Evaluate p(${a}).`,[[`p(${a}) = ${co.map((k,i)=>`${fmtNeg(k)}${3-i?`(${a})${sup(3-i>1?3-i:'')}`:''}`).join(' + ')}`,'Substitute.'],[`= ${peval(co,a)}`,'Remainder theorem.']]);},
 check:[q('p(3) = 0 means…',['x + 3 is a factor','x − 3 is a factor','3 is the remainder','p has no zeros'],1,'Factor theorem.'),q('Remainder of (x² + 4) ÷ (x − 1)?',['4','5','3','0'],1,'p(1) = 5.'),q('Remainder of x¹⁰⁰ ÷ (x − 1)?',['0','1','100','−1'],1,'1¹⁰⁰ = 1.')]};

const ZP=[{co:[1,-6,11,-6],t:'x³ − 6x² + 11x − 6'},{co:[2,-3,-11,6],t:'2x³ − 3x² − 11x + 6'},{co:[1,0,-7,-6],t:'x³ − 7x − 6'},{co:[1,-2,1,-2],t:'x³ − 2x² + x − 2'},{co:[1,1,-4,-4],t:'x³ + x² − 4x − 4'}];
function divs(n){n=Math.abs(n);const r=[];for(let i=1;i<=n;i++)if(n%i===0)r.push(i);return r;}
function cands(co){const p=divs(co[co.length-1]),qq=divs(co[0]);const S=new Set();p.forEach(a=>qq.forEach(b=>{S.add(a/b);S.add(-a/b);}));return [...S].sort((x,y)=>x-y);}
const fracStr=v=>{for(let d=1;d<=6;d++){const n=v*d;if(Math.abs(n-Math.round(n))<1e-9)return d===1?fmtNeg(Math.round(n)):fmtNeg(Math.round(n))+'/'+d;}return nf(v);};
function mountHunt(el){let pi=0,pick_=null;const draw=()=>{const co=ZP[pi].co,C=cands(co);
 let out=`<div class="row">${ZP.map((p,i)=>`<button data-zp="${i}" class="${i===pi?'sel':''}">${p.t}</button>`).join('')}</div>
 <p style="margin:6px 0"><b>Step 1 — list candidates</b> ±(factors of ${Math.abs(co[3])}) / (factors of ${Math.abs(co[0])}):</p><div class="row">${C.map(c=>{const z=Math.abs(peval(co,c))<1e-9;return `<button data-c="${c}" class="${pick_===c?'sel':''}" style="${pick_!==null&&pick_===c?(z?'border-color:#059669;color:#059669':'border-color:#e11d48;color:#e11d48'):''}">${fracStr(c)}</button>`;}).join('')}</div>`;
 if(pick_!==null){const {q:Q,rem}=synth(co,pick_);out+=`<p style="margin:6px 0"><b>Step 2 — test ${fracStr(pick_)} with synthetic division</b></p>${synTable(co,pick_)}`;
  if(Math.abs(rem)>1e-9)out+=`<div class="readout"><span class="bad">Remainder ${nf(rem)} ≠ 0</span> → ${fracStr(pick_)} is not a zero. Try another candidate.</div>`;
  else{const [a,b,c]=Q,D=b*b-4*a*c,h=-b/(2*a),s=Math.sqrt(Math.abs(D))/(2*a);const rest=D>=0?[fracStr(h-s),fracStr(h+s)]:[`${nf(h)} − ${nf(Math.abs(s))}i`,`${nf(h)} + ${nf(Math.abs(s))}i`];
   out+=`<div class="readout"><span class="good">Remainder 0 → x = ${fracStr(pick_)} is a zero.</span><br><b>Step 3 —</b> the quotient ${ps(Q)} is a quadratic: use the quadratic formula → x = ${rest.join(', ')}.<br>All <b>3</b> zeros: ${fracStr(pick_)}, ${rest.join(', ')}. <span class="mute">Degree 3 → exactly 3 zeros counting complex ones (Fundamental Theorem of Algebra).</span></div>`;}}
 else out+='<div class="readout">Click a candidate to test it.</div>';el.innerHTML=out;};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.zp!==undefined){pi=+b.dataset.zp;pick_=null;}else if(b.dataset.c!==undefined)pick_=+b.dataset.c;draw();});draw();}

L['A2-4-5']={goal:'I can find all zeros of a polynomial using the Rational Root Theorem, synthetic division, and the quadratic formula.',
 life:{title:'Finding where a design breaks even',html:'A box-design formula gives volume as a cubic. To find the sizes that make it exactly 0 (or any target), you need <b>every</b> zero. Guessing at random is hopeless — the Rational Root Theorem gives a short list of candidates to test.'},
 see:[{title:'Zero hunt',hint:'Pick a polynomial, test candidates, then finish with the quadratic formula.',mount:mountHunt}],
 vocab:[['Rational Root Theorem','Any rational zero p/q has p dividing the constant term and q dividing the leading coefficient.'],['Fundamental Theorem of Algebra','A degree-n polynomial has exactly n complex zeros (counting multiplicity).'],['Depressed polynomial','The quotient left after dividing out a known zero.']],
 examples:[ex('Example 1','Find all zeros of x³ − 7x − 6.',[['candidates ±1, ±2, ±3, ±6','Factors of 6 over factors of 1.'],['test −1: remainder 0 → quotient x² − x − 6','Synthetic division.'],['x² − x − 6 = (x − 3)(x + 2) → zeros −1, −2, 3','Factor the quadratic.']]),
  ex('Example 2','Find all zeros of x³ − 2x² + x − 2.',[['test 2: remainder 0 → quotient x² + 1','Synthetic division.'],['x² + 1 = 0 → x = ±i','Complex pair.'],['zeros 2, i, −i','3 zeros for degree 3.']])],
 mistake:{bad:'Candidates for 2x³ + … + 6 are only ±1, ±2, ±3, ±6',good:'also ±1/2, ±3/2',why:'Divide by the factors of the <b>leading coefficient</b> (1 and 2), too.'},
 practice(){if(Math.random()<.3){const n=rand(3,7);return num(`How many complex zeros (counting multiplicity) does a polynomial of degree ${n} have?`,[['zeros =',n]],'Fundamental Theorem of Algebra.',[[`${n}`,'Degree n → n zeros.']]);}
  let r;do r=[rand(-5,5),rand(-5,5),rand(-5,5)];while(new Set(r).size<3||r.includes(0));const co=pmul(pmul([1,-r[0]],[1,-r[1]]),[1,-r[2]]);const s=[...r].sort((a,b)=>a-b);
  return num(`Find all zeros of <b>${ps(co)}</b> (smallest to largest).`,[['x₁ =',s[0]],['x₂ =',s[1]],['x₃ =',s[2]]],`Candidates are factors of ${Math.abs(co[3])}. Test with synthetic division, then factor the quadratic.`,[[`one zero: ${r[0]}`,'Remainder 0.'],[`quotient ${ps(pmul([1,-r[1]],[1,-r[2]]))}`,'Depressed polynomial.'],[s.join(', '),'All zeros.']]);},
 check:[q('Possible rational zeros of 3x³ + x − 2 include…',['±2/3','±3/2','±6','±1/2'],0,'p | 2, q | 3.'),q('A degree-4 polynomial has how many complex zeros?',['2','3','4','up to 4 real only'],2,'FTA.'),q('If 1 + 2i is a zero of a real polynomial, so is…',['1 − 2i','−1 + 2i','2 + i','−1 − 2i'],0,'Conjugate pairs.')]};

TOOLS['A2-4']={title:'Synthetic division table',hint:'Pick a polynomial and slide r. Remainder 0 means you found a factor.',mount:mountSynth};
})();
