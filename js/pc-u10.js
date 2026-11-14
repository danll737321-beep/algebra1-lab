/* Pre-Calculus · Unit 10 · Limits and continuity */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,graphLab,chooser,curve,hline,vline,hole,ps,pmul,cs,circleFig}=A2;const C=PC,PI=Math.PI;const {stepper}=KA;const M=C.mat;
function mLimit(el){sliders(el,[{k:'h',l:'distance from 2 (h)',min:0.001,max:1,step:.001,v:0.5}],V=>{const f=x=>(x*x-4)/(x-2);const G=grid({x0:-1,x1:5,y0:-1,y1:7,u:50,uy:34,lab:1,laby:1});const xl=2-V.h,xr=2+V.h;
  let s=curve(G,x=>Math.abs(x-2)<1e-6?NaN:f(x),'#2563eb',3)+hole(G,2,4)+gdot(G,xl,f(xl),'#e11d48',6)+gdot(G,xr,f(xr),'#059669',6)+hline(G,4,'#94a3b8','3 3');
  $('.lm-g',el).innerHTML=G.svg(s);$('.lm-r',el).innerHTML=C.table(['x','f(x) = (x² − 4)/(x − 2)'],[[nf(+(xl).toFixed(4)),(f(xl)).toFixed(4)],['2','undefined (0/0)'],[nf(+(xr).toFixed(4)),(f(xr)).toFixed(4)]])+`As x gets closer to 2 from both sides, f(x) gets closer to <b>4</b>. So lim<sub>x→2</sub> f(x) = 4, even though f(2) does not exist. <span class="mute">Algebra agrees: (x − 2)(x + 2)/(x − 2) = x + 2 → 4.</span>`;},`<div class="lm-g"></div><div class="readout lm-r"></div>`).run();}
const TQ=[{t:'Direct substitution',n:'lim (x² + 3x) as x → 2',a:2,f:x=>x*x+3*x,L:10,steps:['f is a polynomial: continuous everywhere.','Substitute: 2² + 3·2 = 10.']},
 {t:'Factor and cancel',n:'lim (x² − 9)/(x − 3) as x → 3',a:3,f:x=>(x*x-9)/(x-3),L:6,steps:['Substitution gives 0/0: an indeterminate form, not an answer.','(x − 3)(x + 3)/(x − 3) = x + 3 for x ≠ 3.','Substitute: 3 + 3 = 6.']},
 {t:'Rationalize',n:'lim (√x − 2)/(x − 4) as x → 4',a:4,f:x=>(Math.sqrt(x)-2)/(x-4),L:0.25,steps:['0/0 again.','Multiply by (√x + 2)/(√x + 2): (x − 4)/((x − 4)(√x + 2)).','Cancel: 1/(√x + 2) → 1/4.']},
 {t:'Common denominator',n:'lim (1/x − 1/2)/(x − 2) as x → 2',a:2,f:x=>(1/x-0.5)/(x-2),L:-0.25,steps:['0/0.','Top: (2 − x)/(2x). Divide by (x − 2): −1/(2x).','Substitute: −1/4.']}];
function mTech(el){chooser(el,TQ.map(T=>({t:T.t,html:()=>{const hs=[0.1,0.01,0.001];const rows=hs.map(h=>[nf(T.a-h),(T.f(T.a-h)).toFixed(5),nf(T.a+h),(T.f(T.a+h)).toFixed(5)]);
  return `<div class="eqline math">${T.n}</div>${C.table(['x (left)','f(x)','x (right)','f(x)'],rows)}<ol>${T.steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="readout">The table and the algebra agree: the limit is <b>${nf(T.L)}</b>.</div>`;}})));}
const DS=[{t:'Removable (hole)',f:x=>Math.abs(x-1)<0.02?NaN:x+1,pt:[[1,2,'hole'],[1,3.2,'dot']],why:'lim exists (= 2) but f(1) = 3.2 ≠ 2. Redefine f(1) = 2 to remove it.'},
 {t:'Jump',f:x=>x<1?x+1:x-1.5,pt:[[1,2,'hole'],[1,-0.5,'dot']],why:'Left limit 2, right limit −0.5: different, so the limit does not exist.'},
 {t:'Infinite',f:x=>Math.abs(x-1)<0.03?NaN:1/(x-1),pt:[],va:1,why:'f grows without bound near x = 1: a vertical asymptote.'},
 {t:'Continuous',f:x=>0.5*x*x-1,pt:[[1,-0.5,'dot']],why:'f(1) exists, the limit exists, and they are equal: no break.'}];
function mDisc(el){chooser(el,DS.map(D=>({t:D.t,html:()=>{const G=grid({x0:-3,x1:4,y0:-4,y1:4,u:40,lab:1,laby:1});let s=(D.va?vline(G,D.va):'')+curve(G,D.f,'#2563eb',3);
  D.pt.forEach(p=>{s+=p[2]==='hole'?hole(G,p[0],p[1]):gdot(G,p[0],p[1],'#2563eb',6);});
  return G.svg(s)+`<div class="readout">Continuity at x = 1 needs three things: <b>f(1) exists</b>, <b>lim f(x) exists</b>, and <b>they are equal</b>.<br>${D.why}</div>`;}})));}
const IN=[{t:'(3x² + 1)/(x² − 4)',f:x=>(3*x*x+1)/(x*x-4),L:'3',why:'Same degree: ratio of leading coefficients 3/1.'},{t:'(5x + 2)/(x² + 1)',f:x=>(5*x+2)/(x*x+1),L:'0',why:'Bottom degree bigger: the fraction shrinks to 0.'},{t:'(x³ − x)/(2x² + 5)',f:x=>(x*x*x-x)/(2*x*x+5),L:'∞',why:'Top degree bigger: grows without bound (no horizontal asymptote).'},{t:'(2 − 7x)/(4x + 1)',f:x=>(2-7*x)/(4*x+1),L:'−7/4',why:'Same degree: −7/4.'}];
function mInf(el){let k=0;el.innerHTML=`<div class="row">${IN.map((F,i)=>`<button data-k="${i}">${F.t}</button>`).join('')}</div><div class="in-s"></div>`;
 const sp=sliders($('.in-s',el),[{k:'p',l:'x = 10^p',min:0,max:6,step:.5,v:1}],V=>{const F=IN[k],x=10**V.p;
  $('.in-r',el).innerHTML=C.table(['x','f(x)'],[1,2,3,4,6].map(e=>[`10${A2.sup(e)}`,F.f(10**e).toPrecision(7)]))+`At x = ${nf(x)}: f(x) = <b>${F.f(x).toPrecision(7)}</b><br>lim<sub>x→∞</sub> f(x) = <b>${F.L}</b>. ${F.why}`;},`<div class="readout in-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;k=+b.dataset.k;$$('[data-k]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$('[data-k]',el).classList.add('sel');sp.run();}
function mIVT(el){const f=x=>x**3-2*x-2;let a=0,b=3,hist=[];
 el.innerHTML=`<div class="iv-s"></div><div class="row"><button class="iv-b">Bisect once</button><button class="iv-x">Reset</button></div><div class="iv-h readout"></div>`;
 const sp=sliders($('.iv-s',el),[{k:'N',l:'target value N',min:-4,max:19,step:.5,v:0}],V=>{const G=grid({x0:-1,x1:4,y0:-6,y1:20,u:60,uy:12,lab:1,laby:4});let s=`<rect x="${G.X(0)}" y="${G.Y(20)}" width="${G.X(3)-G.X(0)}" height="${G.Y(-6)-G.Y(20)}" fill="rgba(148,163,184,.12)"/>`+curve(G,f,'#2563eb',3)+hline(G,V.N,'#f59e0b','')+gdot(G,0,f(0),'#1f2937',6,'f(0) = −2')+gdot(G,3,f(3),'#1f2937',6,'f(3) = 19');
  let c=null;for(let x=0;x<=3;x+=0.0005){if((f(x)-V.N)*(f(x+0.0005)-V.N)<=0){c=x;break;}}if(c!==null)s+=gdot(G,c,V.N,'#e11d48',7,`c ≈ ${nf(c)}`);
  s+=`<line x1="${G.X(a)}" y1="${G.Y(-5)}" x2="${G.X(b)}" y2="${G.Y(-5)}" stroke="#9333ea" stroke-width="6"/>`;
  $('.iv-g',el).innerHTML=G.svg(s);$('.iv-r',el).innerHTML=`f(x) = x³ − 2x − 2 is continuous on [0, 3], with f(0) = −2 and f(3) = 19. Since N = ${nf(V.N)} is between −2 and 19, the IVT <b>guarantees</b> a c in (0, 3) with f(c) = ${nf(V.N)}${c!==null?` — here c ≈ <b>${nf(c)}</b>`:''}.`;},`<div class="iv-g"></div><div class="readout iv-r"></div>`);
 const show=()=>{$('.iv-h',el).innerHTML=`Purple bracket [${nf(a)}, ${nf(b)}] always contains the zero of f.${hist.length?'<br>'+hist.join('<br>'):''}`;sp.run();};
 $('.iv-b',el).onclick=()=>{const m=(a+b)/2,fm=f(m);hist.push(`f(${nf(m)}) = ${nf(fm)} → zero is in [${nf(fm<0?m:a)}, ${nf(fm<0?b:m)}]`);if(fm<0)a=m;else b=m;show();};
 $('.iv-x',el).onclick=()=>{a=0;b=3;hist=[];show();};show();}

L['PC-10-1']={goal:'I can estimate a limit from a graph or table and find simple limits algebraically.',
 life:{title:'Zooming in',html:'Your phone\'s speedometer can\'t divide distance by zero time. It computes average speed over tinier and tinier intervals and reports the value they approach — a <b>limit</b>, the doorway to calculus.'},
 see:[{title:'Approach x = 2',hint:'Shrink h. Watch both sides approach the same height.',mount:mLimit}],
 vocab:[['Limit','lim_{x→a} f(x) = L: f(x) gets as close to L as we like as x approaches a.'],['One-sided limits','x → a⁻ (from the left), x → a⁺ (from the right).'],['Limit exists','Left and right limits are equal.'],['0/0 form','Factor and cancel, then substitute.']],
 examples:[ex('Example','lim_{x→3} (x² − 9)/(x − 3)',[['0/0 at x = 3','Can\'t substitute directly.'],['(x − 3)(x + 3)/(x − 3) = x + 3','Factor and cancel.'],['→ 6','Substitute now.']])],
 mistake:{bad:'f(2) is undefined, so the limit at 2 does not exist',good:'the limit only looks near 2',why:'A limit ignores what happens <b>at</b> the point; it asks where f is heading.'},
 practice(){const a=rand(-5,5),b=rand(-5,5);return num(`Find lim<sub>x→${fmtNeg(a)}</sub> (${A2.ps([1,-(a+b),a*b])})/(${A2.ps([1,-a])}).`,[['limit =',a-b]],'Factor the top: it contains the factor ('+A2.ps([1,-a])+').',[[`(${A2.ps([1,-a])})(${A2.ps([1,-b])})/(${A2.ps([1,-a])})`,'Factor.'],[`${A2.ps([1,-b])} → ${fmtNeg(a)} ${b<0?'+':'−'} ${Math.abs(b)} = ${fmtNeg(a-b)}`,'Cancel, then substitute.']]);},
 check:[q('lim_{x→4} (2x + 1) =',['8','9','4','undefined'],1,''),q('If the left limit is 3 and the right limit is 5, the limit…',['is 4','is 3','does not exist','is 5'],2,''),q('lim_{x→1} (x² − 1)/(x − 1) =',['0','1','2','undefined'],2,'')]};

L['PC-10-2']={goal:'I can use limit laws and algebra (factoring, rationalizing, common denominators) to evaluate limits that start as 0/0.',
 life:{title:'0/0 is a clue, not an answer',html:'When a calculator says 0/0, the function is hiding something. Usually a common factor is canceling out. Algebra removes the disguise so you can substitute — the same move you will use for every derivative in calculus.'},
 see:[{title:'Four techniques',hint:'Pick a technique. Compare the table of values with the algebra.',mount:mTech}],
 vocab:[['Limit laws','The limit of a sum, product, or quotient is the sum, product, or quotient of the limits (if they exist and no division by 0).'],['Direct substitution','Works for polynomials, and for rational functions where the denominator is not 0.'],['Indeterminate form 0/0','Substitution fails; simplify first.'],['Rationalize','Multiply by the conjugate to remove a square root.']],
 examples:[ex('Example 1','lim_{x→−1} (x² + 4x + 3)/(x + 1).',[['0/0','Check substitution first.'],['(x + 1)(x + 3)/(x + 1) = x + 3','Factor and cancel.'],['→ 2','']]),
  ex('Example 2','lim_{x→9} (√x − 3)/(x − 9).',[['× (√x + 3)/(√x + 3)','Conjugate.'],['= 1/(√x + 3)','(x − 9) cancels.'],['→ 1/6','']])],
 mistake:{bad:'0/0 means the limit is 0 (or does not exist)',good:'0/0 means: simplify, then try again',why:'0/0 is <b>indeterminate</b>. The limit could be any number — 6, 1/4, −1/4 — or not exist.'},
 practice(){const T=pick(['poly','factor','root']);
  if(T==='poly'){const a=rand(-4,4),b=rand(-5,5),c=rand(-9,9);return num(`Find lim<sub>x→${fmtNeg(a)}</sub> (${A2.ps([1,b,c])}).`,[['limit =',a*a+b*a+c]],'Polynomials are continuous: substitute.',[[`${P(a)}² ${b<0?'−':'+'} ${Math.abs(b)}·${P(a)} ${c<0?'−':'+'} ${Math.abs(c)} = ${a*a+b*a+c}`,'']]);}
  if(T==='factor'){const a=nz(-5,5),b=rand(-5,5);return num(`Find lim<sub>x→${fmtNeg(a)}</sub> (${A2.ps([1,-(a+b),a*b])})/(${A2.ps([1,-a])}).`,[['limit =',a-b]],'0/0: factor the top.',[[`(${A2.ps([1,-a])})(${A2.ps([1,-b])})/(${A2.ps([1,-a])})`,''],[`${A2.ps([1,-b])} → ${a-b}`,'']]);}
  const r=rand(1,6),a=r*r;return num(`Find lim<sub>x→${a}</sub> (√x − ${r})/(x − ${a}). (3 decimals)`,[['limit ≈',+(1/(2*r)).toFixed(3),0.002]],'Multiply top and bottom by the conjugate √x + '+r+'.',[[`(x − ${a})/((x − ${a})(√x + ${r})) = 1/(√x + ${r})`,''],[`→ 1/${2*r} ≈ ${(1/(2*r)).toFixed(3)}`,'']]);},
 check:[q('lim_{x→2} (x³ − 1) =',['7','8','3','undefined'],0,''),q('Substitution gives 0/0. You should…',['say the limit is 0','say it does not exist','simplify and try again','use 1'],2,''),q('lim_{x→0} (√(x + 1) − 1)/x =',['0','1/2','1','2'],1,'Rationalize: 1/(√(x + 1) + 1).')]};

L['PC-10-3']={goal:'I can test continuity at a point and classify discontinuities as removable, jump, or infinite.',
 life:{title:'Drawing without lifting the pencil',html:'A continuous graph can be drawn without lifting your pencil. Taxi fares that jump every mile, a road with a missing bridge, a value that shoots off to infinity — each is a different kind of break.'},
 see:[{title:'Kinds of breaks',hint:'Pick each type. Check the three conditions for continuity.',mount:mDisc}],
 vocab:[['Continuous at a','f(a) exists, lim_{x→a} f(x) exists, and lim_{x→a} f(x) = f(a).'],['Removable','A hole: the limit exists but f(a) is missing or different.'],['Jump','Left and right limits exist but differ.'],['Infinite','f grows without bound: a vertical asymptote.']],
 examples:[ex('Example 1','f(x) = (x² − 4)/(x − 2). Type of discontinuity at x = 2?',[['f(2) undefined','Condition 1 fails.'],['lim = 4','Factor and cancel.'],['removable','Define f(2) = 4 to fix it.']]),
  ex('Example 2','Find k so f(x) = {x + k if x < 3; x² if x ≥ 3} is continuous.',[['left limit 3 + k, right limit 9','Match the pieces at 3.'],['3 + k = 9 → k = 6','']])],
 mistake:{bad:'f(a) exists, so f is continuous at a',good:'f(a) must also equal the limit',why:'A function can be defined at a point and still jump or have a misplaced dot there.'},
 practice(){if(Math.random()<0.55){const a=nz(-3,3),b=rand(-5,5),c=rand(-3,3);const k=a*c+b-c*c;
   return num(`Find k so that f(x) = { ${A2.ps([a,b])} if x &lt; ${fmtNeg(c)} ; x² + k if x ≥ ${fmtNeg(c)} } is continuous.`,[['k =',k]],`Both pieces must give the same value at x = ${fmtNeg(c)}.`,[[`left: ${a}·${P(c)} ${b<0?'−':'+'} ${Math.abs(b)} = ${a*c+b}`,''],[`right: ${P(c)}² + k = ${c*c} + k`,''],[`k = ${a*c+b} − ${c*c} = ${k}`,'']]);}
  const T=pick([{f:'(x² − 1)/(x − 1) at x = 1',a:'removable'},{f:'1/(x + 2) at x = −2',a:'infinite'},{f:'|x|/x at x = 0',a:'jump'},{f:'(x² + x)/x at x = 0',a:'removable'},{f:'floor(x) at x = 2',a:'jump'},{f:'1/x² at x = 0',a:'infinite'},{f:'x² + 1 at x = 3',a:'continuous'}]);
  return mc(`Classify: ${T.f}.`,T.a,['removable','jump','infinite','continuous'],'Is there a hole, a jump between sides, or a vertical asymptote?');},
 check:[q('A hole in a graph is a…',['jump','removable discontinuity','infinite discontinuity','continuous point'],1,''),q('Left limit 2, right limit 5 at x = 1. This is…',['removable','jump','infinite','continuous'],1,''),q('Polynomials are continuous…',['nowhere','only at 0','everywhere','only for x > 0'],2,'')]};

L['PC-10-4']={goal:'I can find limits at infinity and infinite limits, and connect them to horizontal and vertical asymptotes.',
 life:{title:'The long run',html:'A drug’s concentration in the bloodstream levels off at a steady value; a population model approaches a carrying capacity. “What happens in the long run?” is a <b>limit as x → ∞</b> — the horizontal asymptote.'},
 see:[{title:'Let x grow',hint:'Pick a function. Push x to 10⁶ and watch f(x) settle.',mount:mInf}],
 vocab:[['Limit at infinity','lim_{x→∞} f(x) = L: f(x) approaches L as x grows; y = L is a horizontal asymptote.'],['Infinite limit','lim_{x→a} f(x) = ∞: f(x) grows without bound near a; x = a is a vertical asymptote.'],['Degree rule','Top < bottom: 0. Equal: ratio of leading coefficients. Top > bottom: ±∞.'],['One-sided infinite limits','Near a VA, check signs from each side (e.g. 1/(x − 2) → −∞ from the left, +∞ from the right).']],
 examples:[ex('Example 1','lim_{x→∞} (4x² − x)/(2x² + 7).',[['equal degrees (2)',''],['4/2 = 2','Leading coefficients.']]),
  ex('Example 2','lim_{x→3⁺} 5/(x − 3) and lim_{x→3⁻} 5/(x − 3).',[['x a bit above 3: positive/tiny positive → +∞',''],['x a bit below 3: positive/tiny negative → −∞','']])],
 mistake:{bad:'lim_{x→∞} (2x + 1)/(x²) = 2',good:'= 0',why:'Compare degrees first. The bottom grows faster, so the fraction goes to 0.'},
 practice(){const T=pick(['eq','lo','hi','side']);const a=nz(-8,8),b=nz(-6,6);
  if(T==='eq')return mc(`lim<sub>x→∞</sub> (${A2.ps([a,rand(-5,5),rand(-9,9)])})/(${A2.ps([b,rand(-5,5),rand(-9,9)])}) =`,frac(a,b),[frac(b,a),'0','∞',frac(-a,b)],'Same degree: ratio of leading coefficients.');
  if(T==='lo')return mc(`lim<sub>x→∞</sub> (${A2.ps([a,rand(-5,5)])})/(${A2.ps([b,0,rand(-9,9)])}) =`,'0',[frac(a,b),'∞','1'],'Bottom degree is bigger.');
  if(T==='hi')return mc(`lim<sub>x→∞</sub> (${A2.ps([Math.abs(a),0,0,rand(-5,5)])})/(${A2.ps([Math.abs(b),rand(1,5)])}) =`,'∞',['0',frac(Math.abs(a),Math.abs(b)),'−∞'],'Top degree is bigger; both leading coefficients are positive.');
  const c=rand(-5,5),k=nz(-6,6),fromR=Math.random()<0.5;const ans=(k>0)===fromR?'∞':'−∞';
  return mc(`lim<sub>x→${fmtNeg(c)}${fromR?'⁺':'⁻'}</sub> ${k}/(${A2.ps([1,-c])}) =`,ans,[ans==='∞'?'−∞':'∞','0',String(k)],`Just ${fromR?'right':'left'} of ${fmtNeg(c)}, the denominator is a tiny ${fromR?'positive':'negative'} number.`);},
 check:[q('lim_{x→∞} 7/x =',['7','0','∞','1'],1,''),q('If lim_{x→∞} f(x) = 4, then…',['x = 4 is a VA','y = 4 is a HA','f(4) = ∞','f is constant'],1,''),q('lim_{x→0⁺} 1/x =',['0','1','∞','−∞'],2,'')]};

L['PC-10-5']={goal:'I can use the Intermediate Value Theorem to guarantee a solution exists and to locate a zero by bisection.',
 life:{title:'Hiking up a mountain',html:'You start a hike at 1000 m and finish at 3000 m. Without seeing the trail, you know you passed 2000 m at some moment — you cannot skip an altitude. That common-sense fact about continuous change is the <b>Intermediate Value Theorem</b>.'},
 see:[{title:'Hit every height in between',hint:'Slide N between f(0) and f(3). Then bisect to trap the zero.',mount:mIVT}],
 vocab:[['IVT','If f is continuous on [a, b] and N is between f(a) and f(b), then f(c) = N for some c in (a, b).'],['Locating a zero','If f(a) and f(b) have opposite signs, f has a zero between them.'],['Bisection','Check the midpoint; keep the half where the sign changes.'],['Existence','The IVT says a c exists; it does not say where or how many.']],
 examples:[ex('Example','Show x³ + x − 5 = 0 has a solution between 1 and 2.',[['f(1) = −3 < 0',''],['f(2) = 5 > 0',''],['f is a polynomial: continuous','Condition checked.'],['by the IVT, f(c) = 0 for some c in (1, 2)','']])],
 mistake:{bad:'f(−1) = −1 and f(1) = 1 for f(x) = 1/x, so it has a zero in (−1, 1)',good:'the IVT needs continuity on the whole interval',why:'1/x is not continuous at 0, so the theorem does not apply — and indeed 1/x is never 0.'},
 practice(){if(Math.random()<0.5){const fa=rand(-9,9),fb=rand(-9,9),N=rand(-10,10),cont=Math.random()<0.8;const between=(N-fa)*(N-fb)<0;
   const ans=!cont?'not guaranteed — f is not continuous':between?'yes — guaranteed by the IVT':'not guaranteed — N is not between f(a) and f(b)';
   return mc(`f is ${cont?'continuous':'defined but <b>not continuous</b>'} on [1, 5], f(1) = ${fmtNeg(fa)}, f(5) = ${fmtNeg(fb)}. Must there be a c in (1, 5) with f(c) = ${fmtNeg(N)}?`,ans,['yes — guaranteed by the IVT','not guaranteed — N is not between f(a) and f(b)','not guaranteed — f is not continuous'],'Check both conditions: continuity, and N between f(a) and f(b).');}
  let k;do k=rand(2,26);while(k===8);const f=x=>x*x*x-k;let a=Math.floor(Math.cbrt(k)),b=a+1;const m=(a+b)/2,fm=f(m);
  return num(`f(x) = x³ − ${k}. f(${a}) < 0 and f(${b}) > 0. Do one bisection step: find f(${m}) (3 decimals) and the new interval’s left end.`,[[`f(${m}) ≈`,+fm.toFixed(3),0.002],['new left end =',fm<0?m:a]],'Evaluate at the midpoint. Keep the half where the sign changes.',[[`f(${m}) = ${m}³ − ${k} ≈ ${fm.toFixed(3)}`,''],[fm<0?`negative → zero in [${m}, ${b}]`:`positive → zero in [${a}, ${m}]`,'']]);},
 check:[q('The IVT requires f to be…',['increasing','continuous on [a, b]','a polynomial','positive'],1,''),q('f(2) = −1, f(4) = 3, f continuous. The IVT guarantees f(c) = …',['5','−2','0','4'],2,''),q('After 3 bisection steps on [0, 8], the interval length is…',['4','2','1','1/2'],2,'8 → 4 → 2 → 1.')]};

TOOLS['PC-10']={title:'Approach a point',hint:'Shrink the distance to x = 2 and read the limit from both sides.',mount:mLimit};
})();
