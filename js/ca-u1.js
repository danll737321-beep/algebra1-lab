/* Calculus · Unit 1 · Limits and continuity */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;

/* ---------- See It mounts ---------- */
const OS=[{t:'Jump',f:x=>x<1?x+2:0.5*x,L:3,R:0.5,v:1.8,why:'Left 3, right 0.5: the one-sided limits disagree, so lim<sub>x→1</sub> f(x) <b>does not exist</b>.'},
 {t:'Hole',f:x=>Math.abs(x-1)<0.02?NaN:-(x-1)*(x-1)+2,L:2,R:2,v:-1,why:'Both sides head to 2, so lim<sub>x→1</sub> f(x) = <b>2</b> — even though f(1) = −1 is somewhere else.'},
 {t:'Smooth',f:x=>0.5*x*x+1,L:1.5,R:1.5,v:1.5,why:'Both sides head to 1.5 and f(1) = 1.5: limit and value agree.'}];
function mOneSide(el){K.pickSlide(el,OS,[{k:'h',l:'distance from x = 1',min:0.01,max:1.5,step:.01,v:1}],(V,F)=>{
  const G=grid({x0:-2,x1:4,y0:-2,y1:5,u:48,uy:40,lab:1,laby:1});const xl=1-V.h,xr=1+V.h;
  let s=curve(G,x=>F.t==='Jump'&&x>=1&&x<1.02?NaN:F.f(x),'#2563eb',3);
  if(F.t==='Jump')s+=hole(G,1,3)+gdot(G,1,0.5,'#2563eb',6);if(F.t==='Hole')s+=hole(G,1,2)+gdot(G,1,-1,'#2563eb',6);
  s+=gdot(G,xl,F.f(xl),'#e11d48',7,'from left')+gdot(G,xr,F.f(xr),'#059669',7,'from right');
  $('.os-g',el).innerHTML=G.svg(s);
  $('.os-r',el).innerHTML=`${K.lim(1,'⁻')} f(x) = <b>${nf(F.L)}</b> · ${K.lim(1,'⁺')} f(x) = <b>${nf(F.R)}</b> · f(1) = <b>${nf(F.v)}</b><br>${F.why}`;},`<div class="os-g"></div><div class="readout os-r"></div>`);}

function mSinx(el){sliders(el,[{k:'h',l:'x',min:0.001,max:2,step:.001,v:1}],V=>{const f=x=>Math.sin(x)/x;const G=grid({x0:-7,x1:7,y0:-1,y1:2,u:32,uy:80,lab:2,laby:1});
  let s=curve(G,x=>Math.abs(x)<1e-6?NaN:f(x),'#2563eb',3)+hole(G,0,1)+hline(G,1,'#94a3b8','3 3')+gdot(G,V.h,f(V.h),'#e11d48',7)+gdot(G,-V.h,f(-V.h),'#e11d48',7);
  $('.sx-g',el).innerHTML=G.svg(s);$('.sx-r',el).innerHTML=C.table(['x','sin x / x'],[1,0.1,0.01,0.001].map(x=>[x,f(x).toFixed(7)]))+`At x = ${nf(V.h)}: sin x / x = <b>${f(V.h).toFixed(6)}</b>. Substitution gives 0/0, but the values close in on <b>1</b>: ${K.lim(0)} sin x / x = 1. <span class="mute">(x in radians.)</span>`;},`<div class="sx-g"></div><div class="readout sx-r"></div>`).run();}

function mSqueeze(el){sliders(el,[{k:'z',l:'zoom window ±',min:0.05,max:1.5,step:.01,v:1.2}],V=>{const w=V.z;const f=x=>Math.abs(x)<1e-9?0:x*x*Math.sin(1/x);
  const G=grid({x0:-w,x1:w,y0:-w*w,y1:w*w,u:200/w,uy:150/(w*w),lab:100,laby:100});
  let d='',pen=false;for(let i=0;i<=1600;i++){const x=-w+2*w*i/1600,y=f(x);d+=(pen?' L':'M')+G.X(x).toFixed(1)+' '+G.Y(y).toFixed(1);pen=true;}
  let s=curve(G,x=>x*x,'#059669',2.5,'6 4')+curve(G,x=>-x*x,'#e11d48',2.5,'6 4')+`<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="#2563eb" stroke-width="2"/>`+gdot(G,0,0,'#1f2937',6);
  $('.sq-g',el).innerHTML=G.svg(s);$('.sq-r',el).innerHTML=`Window: x from −${nf(w)} to ${nf(w)}. Because −1 ≤ sin(1/x) ≤ 1, we get <span style="color:#e11d48">−x²</span> ≤ <span style="color:#2563eb">x² sin(1/x)</span> ≤ <span style="color:#059669">x²</span>.<br>Both outside curves → 0 as x → 0, so the wiggly one is <b>squeezed</b> to 0 too.`;},`<div class="sq-g"></div><div class="readout sq-r"></div>`).run();}

function mCont(el){sliders(el,[{k:'k',l:'k',min:-4,max:6,step:.5,v:0}],V=>{const f=x=>x<2?x*x-1:V.k-x;const G=grid({x0:-2,x1:5,y0:-4,y1:6,u:44,uy:30,lab:1,laby:2});
  const L=3,R=V.k-2,ok=Math.abs(L-R)<1e-9;let s=curve(G,x=>x<2?x*x-1:NaN,'#2563eb',3)+curve(G,x=>x>=2?V.k-x:NaN,'#9333ea',3)+(ok?gdot(G,2,3,'#059669',7):hole(G,2,3)+gdot(G,2,R,'#9333ea',6));
  $('.ct-g',el).innerHTML=G.svg(s);$('.ct-r',el).innerHTML=`f(x) = x² − 1 for x &lt; 2, and k − x for x ≥ 2.<br>${K.lim(2,'⁻')} = 3 · ${K.lim(2,'⁺')} = f(2) = k − 2 = <b>${nf(R)}</b><br>${ok?'✓ <b>Continuous at 2</b>: f(2) exists, the limit exists, and they are equal (k = 5).':'Not continuous: the pieces do not meet. Find the k that makes k − 2 = 3.'}`;},`<div class="ct-g"></div><div class="readout ct-r"></div>`).run();}

const IL=[{t:'1/(x − 2)',f:x=>1/(x-2),L:'−∞',R:'+∞'},{t:'1/(x − 2)²',f:x=>1/((x-2)*(x-2)),L:'+∞',R:'+∞'},{t:'−3/(x − 2)',f:x=>-3/(x-2),L:'+∞',R:'−∞'}];
function mInfLim(el){K.pickSlide(el,IL,[{k:'h',l:'distance from 2',min:0.02,max:1.5,step:.01,v:1}],(V,F)=>{const G=grid({x0:-2,x1:6,y0:-8,y1:8,u:40,uy:16,lab:1,laby:2});
  let s=vline(G,2)+curve(G,x=>Math.abs(x-2)<0.01?NaN:F.f(x),'#2563eb',3)+gdot(G,2-V.h,Math.max(-8,Math.min(8,F.f(2-V.h))),'#e11d48',7)+gdot(G,2+V.h,Math.max(-8,Math.min(8,F.f(2+V.h))),'#059669',7);
  $('.il-g',el).innerHTML=G.svg(s);$('.il-r',el).innerHTML=`f(${nf(2-V.h)}) = ${K.r3(F.f(2-V.h))} · f(${nf(2+V.h)}) = ${K.r3(F.f(2+V.h))}<br>${K.lim(2,'⁻')} f(x) = <b>${F.L}</b> · ${K.lim(2,'⁺')} f(x) = <b>${F.R}</b>. x = 2 is a <b>vertical asymptote</b>.`;},`<div class="il-g"></div><div class="readout il-r"></div>`);}

const LI=[{t:'(2x² + 1)/(x² − 3)',f:x=>(2*x*x+1)/(x*x-3),P:'2',N:'2',why:'Equal degrees → ratio of leading coefficients.'},
 {t:'√(4x² + 1) / x',f:x=>Math.sqrt(4*x*x+1)/x,P:'2',N:'−2',why:'√(x²) = |x|, so the sign flips when x is negative: two different horizontal asymptotes.'},
 {t:'3 + e⁻ˣ',f:x=>3+Math.exp(-x),P:'3',N:'∞',why:'e⁻ˣ → 0 as x → ∞ but explodes as x → −∞.'},{t:'sin x / x',f:x=>Math.sin(x)/x,P:'0',N:'0',why:'Squeeze: −1/|x| ≤ sin x / x ≤ 1/|x|, and both bounds → 0.'}];
function mInfty(el){K.pickSlide(el,LI,[{k:'p',l:'|x| = 10^p',min:0,max:5,step:.25,v:1}],(V,F)=>{const x=10**V.p;const G=grid({x0:-12,x1:12,y0:-4,y1:6,u:20,uy:28,lab:4,laby:2});
  let s=curve(G,t=>Math.abs(t)<0.05||Math.abs(t*t-3)<0.05?NaN:F.f(t),'#2563eb',3);if(isFinite(+F.P))s+=hline(G,+F.P,'#059669','5 4');if(F.N!==F.P&&isFinite(+F.N.replace('−','-')))s+=hline(G,+F.N.replace('−','-'),'#e11d48','5 4');
  $('.li-g',el).innerHTML=G.svg(s);$('.li-r',el).innerHTML=`f(${nf(x)}) = <b>${F.f(x).toPrecision(6)}</b> · f(−${nf(x)}) = <b>${isFinite(F.f(-x))?F.f(-x).toPrecision(6):'huge'}</b><br>${K.lim('∞')} f(x) = <b>${F.P}</b> · ${K.lim('−∞')} f(x) = <b>${F.N}</b>. ${F.why}`;},`<div class="li-g"></div><div class="readout li-r"></div>`);}

function mIVT(el){sliders(el,[{k:'N',l:'target N',min:-0.5,max:1.5,step:.05,v:0}],V=>{const f=x=>Math.cos(x)-x+1;const G=grid({x0:-0.5,x1:2.5,y0:-1,y1:2.5,u:120,uy:80,lab:1,laby:1});
  let c=null;for(let x=0;x<2;x+=0.0005)if((f(x)-V.N)*(f(x+0.0005)-V.N)<=0){c=x;break;}
  let s=`<rect x="${G.X(0)}" y="${G.Y(2.5)}" width="${G.X(2)-G.X(0)}" height="${G.Y(-1)-G.Y(2.5)}" fill="rgba(148,163,184,.12)"/>`+curve(G,f,'#2563eb',3)+hline(G,V.N,'#f59e0b','')+gdot(G,0,f(0),'#1f2937',6,'f(0) = 2')+gdot(G,2,f(2),'#1f2937',6,`f(2) ≈ ${K.r3(f(2))}`);
  if(c!==null)s+=gdot(G,c,V.N,'#e11d48',7,`c ≈ ${K.r3(c)}`);
  const inR=V.N<=2&&V.N>=f(2);$('.iv-g',el).innerHTML=G.svg(s);
  $('.iv-r',el).innerHTML=`f(x) = cos x − x + 1 is continuous on [0, 2]. f(0) = 2, f(2) ≈ ${K.r3(f(2))}.<br>${inR?`N = ${nf(V.N)} is between them, so the IVT <b>guarantees</b> some c in (0, 2) with f(c) = N${c!==null?' — here c ≈ <b>'+K.r3(c)+'</b>':''}.`:`N = ${nf(V.N)} is <b>not</b> between f(0) and f(2): the IVT makes no promise.`}`;},`<div class="iv-g"></div><div class="readout iv-r"></div>`).run();}

/* ---------- lessons ---------- */
L['CA-1-1']={goal:'I can read limits and one-sided limits from graphs and tables, and decide when a limit exists.',
 life:{title:'Where is it heading?',html:'A GPS predicts your arrival by watching where you are <b>heading</b>, not where you are. A limit does the same for a function: it asks what f(x) approaches as x gets close to a — whatever happens <b>at</b> a.'},
 see:[{title:'Approach from both sides',hint:'Pick a graph. Shrink the distance and compare the red (left) and green (right) dots.',mount:mOneSide}],
 vocab:[['Limit','lim_{x→a} f(x) = L: f(x) can be made as close to L as we like by taking x close to a (x ≠ a).'],['Left-hand limit','lim_{x→a⁻} f(x): x approaches a from values less than a.'],['Right-hand limit','lim_{x→a⁺} f(x): x approaches a from values greater than a.'],['Existence','lim_{x→a} f(x) exists exactly when both one-sided limits exist and are equal.']],
 examples:[ex('Example','f(x) = x + 2 for x &lt; 1 and 5 − x for x ≥ 1. Find the limits at 1.',[['left: 1 + 2 = 3','Use the piece for x < 1.'],['right: 5 − 1 = 4','Use the piece for x ≥ 1.'],['3 ≠ 4, so lim_{x→1} f(x) does not exist','f(1) = 4, but the two-sided limit still fails.']])],
 mistake:{bad:'f(1) = 4, so lim_{x→1} f(x) = 4',good:'the limit needs both sides to agree',why:'The value at the point does not decide the limit. Check left and right separately.'},
 practice(){const a=rand(-3,3),m1=nz(-3,3),b1=rand(-4,4),m2=nz(-3,3),same=Math.random()<0.5;const L=m1*a+b1;const b2=same?L-m2*a:L-m2*a+nz(-3,3);const R=m2*a+b2;
  const f=`f(x) = { ${ps([m1,b1])} if x &lt; ${fmtNeg(a)} ; ${ps([m2,b2])} if x ≥ ${fmtNeg(a)} }`;
  if(Math.random()<0.5)return num(`${f}. Find the left-hand and right-hand limits at x = ${fmtNeg(a)}.`,[['left limit =',L],['right limit =',R]],'Substitute x = a into each piece.',[[`left: ${m1}·${P(a)} ${b1<0?'−':'+'} ${Math.abs(b1)} = ${fmtNeg(L)}`,''],[`right: ${m2}·${P(a)} ${b2<0?'−':'+'} ${Math.abs(b2)} = ${fmtNeg(R)}`,'']]);
  return mc(`${f}. What is lim<sub>x→${fmtNeg(a)}</sub> f(x)?`,L===R?fmtNeg(L):'does not exist',[fmtNeg(L),fmtNeg(R),'does not exist','0'],'Compare the two one-sided limits.');},
 check:[q('lim_{x→a⁻} f(x) = 2 and lim_{x→a⁺} f(x) = 2. Then lim_{x→a} f(x)…',['does not exist','= 2','depends on f(a)','= 0'],1,''),q('A limit at a depends on…',['only f(a)','values of f near a','the y-intercept','nothing'],1,''),q('Left limit 1, right limit −1. The limit…',['= 0','= 1','does not exist','= −1'],2,'')]};

L['CA-1-2']={goal:'I can evaluate limits algebraically using limit laws, factoring, rationalizing, and the special limit sin x / x → 1.',
 life:{title:'0/0 is a clue, not an answer',html:'Substituting into (x² − 9)/(x − 3) at 3 gives 0/0 — like a locked door. Algebra is the key: rewrite the expression so the troublemaking factor cancels, then substitute.'},
 see:[{title:'The famous limit',hint:'Move x toward 0 and watch sin x / x.',mount:mSinx}],
 vocab:[['Limit laws','Limits of sums, products, and quotients are the sums, products, and quotients of the limits (if they exist, no division by 0).'],['Direct substitution','Works for polynomials, and for rational functions where the denominator ≠ 0.'],['Indeterminate form 0/0','Substitution failed; simplify (factor, rationalize, combine fractions) and try again.'],['Special trig limits','lim_{x→0} sin x / x = 1 and lim_{x→0} (1 − cos x)/x = 0.']],
 examples:[ex('Example 1','lim_{x→4} (√x − 2)/(x − 4)',[['0/0','Indeterminate.'],['× (√x + 2)/(√x + 2): (x − 4)/((x − 4)(√x + 2))','Rationalize.'],['1/(√x + 2) → 1/4','']]),
  ex('Example 2','lim_{x→0} sin(5x)/x',[['= 5 · sin(5x)/(5x)','Make the inside match the denominator.'],['= 5 · 1 = 5','Let u = 5x → 0.']])],
 mistake:{bad:'lim_{x→0} sin(3x)/x = 1',good:'= 3',why:'The special limit needs the same expression in the sine and the denominator: sin(3x)/(3x) → 1, then multiply by 3.'},
 practice(){const T=pick(['fac','fac','trig','rat']);
  if(T==='fac'){const a=nz(-5,5),b=rand(-6,6);return num(`Find lim<sub>x→${fmtNeg(a)}</sub> (${ps([1,-(a+b),a*b])})/(${ps([1,-a])}).`,[['limit =',a-b]],'Factor the numerator; one factor cancels.',[[`(${ps([1,-a])})(${ps([1,-b])})/(${ps([1,-a])}) = ${ps([1,-b])}`,'Cancel.'],[`→ ${fmtNeg(a)} − ${P(b)} = ${fmtNeg(a-b)}`,'Substitute.']]);}
  if(T==='trig'){const k=rand(2,9),m=rand(1,5);return num(`Find lim<sub>x→0</sub> sin(${k}x)/(${m===1?'':m}x).`,[['limit =',k/m,0.011]],`Rewrite as (${k}/${m}) · sin(${k}x)/(${k}x).`,[[`(${k}/${m}) · 1 = ${frac(k,m)}`,'']]);}
  const s=pick([1,4,9,16,25]),r=Math.sqrt(s);return num(`Find lim<sub>x→${s}</sub> (√x − ${r})/(x − ${s}). (fraction or decimal)`,[['limit =',1/(2*r),0.002]],'Multiply top and bottom by the conjugate.',[[`1/(√x + ${r}) → 1/${2*r}`,'']]);},
 check:[q('lim_{x→2} (x³ − 1) =',['7','8','1','undefined'],0,''),q('Substitution gives 0/0. This means…',['the limit is 0','the limit does not exist','simplify and try again','the limit is 1'],2,''),q('lim_{x→0} sin(2x)/x =',['0','1','2','1/2'],2,'')]};

L['CA-1-3']={goal:'I can use the Squeeze Theorem to find a limit by trapping a function between two others.',
 life:{title:'Walking between two friends',html:'If two friends walking on either side of you both arrive at the café, you arrive there too — you are trapped between them. The <b>Squeeze Theorem</b> uses this idea for functions that wiggle too much to handle directly.'},
 see:[{title:'Squeezed to zero',hint:'Zoom in on x = 0. The blue curve cannot escape the green and red parabolas.',mount:mSqueeze}],
 vocab:[['Squeeze Theorem','If g(x) ≤ f(x) ≤ h(x) near a and lim g = lim h = L, then lim f = L.'],['Bounding sine and cosine','−1 ≤ sin(anything) ≤ 1 and −1 ≤ cos(anything) ≤ 1.'],['Typical use','A bounded wiggle times something going to 0 goes to 0.']],
 examples:[ex('Example','lim_{x→0} x² cos(1/x)',[['−1 ≤ cos(1/x) ≤ 1','Bound the wiggle.'],['−x² ≤ x² cos(1/x) ≤ x²','Multiply by x² ≥ 0.'],['±x² → 0, so the limit is 0','Squeeze.']])],
 mistake:{bad:'lim_{x→0} x² sin(1/x) = lim x² · lim sin(1/x) = 0 · (something)',good:'use the Squeeze Theorem',why:'lim sin(1/x) does not exist, so the product law cannot be used. Bound it instead.'},
 practice(){if(Math.random()<0.5){const a=rand(1,6),L=rand(-5,5);return num(`For all x near 0, ${fmtNeg(L)} − ${a}x² ≤ f(x) ≤ ${fmtNeg(L)} + ${a}x². Find lim<sub>x→0</sub> f(x).`,[['limit =',L]],'Find the limit of both bounds.',[[`both bounds → ${fmtNeg(L)}`,''],[`so f(x) → ${fmtNeg(L)}`,'Squeeze Theorem.']]);}
  const T=pick([{f:'x sin(1/x) as x → 0',a:'0'},{f:'x⁴ cos(2/x) as x → 0',a:'0'},{f:'(sin x)/x as x → ∞',a:'0'},{f:'(3 + cos x)/x² as x → ∞',a:'0'},{f:'sin(1/x) as x → 0',a:'does not exist'}]);
  return mc(`Find the limit: ${T.f}.`,T.a,['0','1','does not exist','∞'],'Is there a bounded wiggle multiplied by something that shrinks to 0?');},
 check:[q('The Squeeze Theorem needs the two bounding functions to have…',['different limits','the same limit','no limit','limit 0 only'],1,''),q('For every x, −1 ≤ sin x ≤ …',['0','1','π','x'],1,''),q('lim_{x→0} x sin(1/x) =',['1','0','does not exist','∞'],1,'')]};

L['CA-1-4']={goal:'I can test continuity at a point with the three-part definition, classify discontinuities, and make a piecewise function continuous.',
 life:{title:'Drawing without lifting your pencil',html:'A continuous graph can be drawn without lifting your pencil. Engineers need continuous models: a bridge cable’s height cannot jump. Calculus makes “no lifting” precise with three checks.'},
 see:[{title:'Make the pieces meet',hint:'Slide k until the purple piece meets the blue one at x = 2.',mount:mCont}],
 vocab:[['Continuous at a','(1) f(a) is defined, (2) lim_{x→a} f(x) exists, (3) lim_{x→a} f(x) = f(a).'],['Removable discontinuity','A hole: the limit exists but f(a) is missing or different.'],['Jump discontinuity','Both one-sided limits exist but are different.'],['Infinite discontinuity','f(x) → ±∞: a vertical asymptote.'],['Continuous on an interval','Polynomials, rational functions (on their domains), roots, exponentials, logs, and trig functions are continuous where they are defined.']],
 examples:[ex('Example','Find k so f(x) = { kx + 1, x &lt; 3 ; x² − 2, x ≥ 3 } is continuous.',[['left at 3: 3k + 1',''],['right at 3: 9 − 2 = 7',''],['3k + 1 = 7 → k = 2','Set them equal.']])],
 mistake:{bad:'g(x) = (x² − 4)/(x − 2) is continuous at 2 because the limit is 4',good:'g(2) is undefined, so g is not continuous at 2',why:'All three conditions are needed. Redefining g(2) = 4 would remove the discontinuity.'},
 practice(){if(Math.random()<0.55){const a=rand(-3,3),k=nz(-4,4),b=rand(-5,5);const target=a*a+b;const c=target-k*a;
   return num(`Find c so that f(x) = { ${k}x + c if x &lt; ${fmtNeg(a)} ; x² ${b<0?'−':'+'} ${Math.abs(b)} if x ≥ ${fmtNeg(a)} } is continuous.`,[['c =',c]],'The two pieces must give the same value at the break.',[[`right: ${P(a)}² ${b<0?'−':'+'} ${Math.abs(b)} = ${fmtNeg(target)}`,''],[`left: ${k}·${P(a)} + c = ${fmtNeg(k*a)} + c`,''],[`c = ${fmtNeg(c)}`,'']]);}
  const T=pick([{f:'(x² − 1)/(x − 1) at x = 1',a:'removable'},{f:'1/(x − 4) at x = 4',a:'infinite'},{f:'|x − 2|/(x − 2) at x = 2',a:'jump'},{f:'(x² + 3x)/x at x = 0',a:'removable'},{f:'tan x at x = π/2',a:'infinite'},{f:'eˣ at x = 0',a:'continuous'},{f:'floor(x) at x = 3',a:'jump'}]);
  return mc(`Classify the behavior of ${T.f}.`,T.a,['removable','jump','infinite','continuous'],'Hole, jump, asymptote — or no break at all?');},
 check:[q('Which is NOT one of the three continuity conditions?',['f(a) defined','limit exists','limit equals f(a)','f′(a) exists'],3,''),q('A hole in a graph is…',['a jump','a removable discontinuity','an infinite discontinuity','continuous'],1,''),q('Rational functions are continuous…',['everywhere','on their domain','nowhere','only at 0'],1,'')]};

L['CA-1-5']={goal:'I can find infinite limits from each side and identify vertical asymptotes.',
 life:{title:'Getting close to the edge',html:'The cost to remove the last 1% of a pollutant can blow up: C(p) = 50p/(100 − p). As p → 100⁻, the cost → ∞. Infinite limits describe these “wall” behaviors.'},
 see:[{title:'Near the wall x = 2',hint:'Pick a function. Move toward x = 2 and watch the sign on each side.',mount:mInfLim}],
 vocab:[['Infinite limit','lim_{x→a} f(x) = ∞ means f(x) grows without bound as x → a. (The limit does not exist as a number.)'],['Vertical asymptote','x = a is a VA if f(x) → ±∞ as x → a from at least one side.'],['Sign analysis','Near a, the denominator is a tiny positive or tiny negative number; the numerator’s sign decides ±∞.'],['Even power','1/(x − a)² → +∞ from both sides.']],
 examples:[ex('Example','lim_{x→3⁻} (x + 1)/(x − 3)',[['numerator → 4 (positive)',''],['x &lt; 3: x − 3 is a tiny negative',''],['positive / tiny negative → −∞','']])],
 mistake:{bad:'(x² − 4)/(x − 2) has a vertical asymptote x = 2',good:'it has a hole at x = 2',why:'The factor cancels: the expression equals x + 2 near 2, so the limit is 4, not ∞. Always simplify first.'},
 practice(){const c=rand(-5,5),k=nz(-7,7),fromR=Math.random()<0.5,sq=Math.random()<0.3;let ans;if(sq)ans=k>0?'∞':'−∞';else ans=(k>0)===fromR?'∞':'−∞';
  return mc(`lim<sub>x→${fmtNeg(c)}${fromR?'⁺':'⁻'}</sub> ${k}/(${ps([1,-c])})${sq?'²':''} =`,ans,[ans==='∞'?'−∞':'∞','0',String(k)],sq?'A square is always positive near the asymptote.':`Just ${fromR?'right':'left'} of ${fmtNeg(c)}, the denominator is a tiny ${fromR?'positive':'negative'} number.`);},
 check:[q('lim_{x→0} 1/x² =',['0','−∞','∞','does not exist as ±'],2,''),q('lim_{x→0⁻} 1/x =',['∞','−∞','0','1'],1,''),q('f(x) = (x − 1)/((x − 1)(x + 2)) has a VA at…',['x = 1','x = −2','both','neither'],1,'x − 1 cancels: hole at 1.')]};

L['CA-1-6']={goal:'I can find limits at infinity for rational, radical, and exponential functions and connect them to horizontal asymptotes.',
 life:{title:'The long run',html:'A coffee cooling in a room levels off at room temperature; a learning curve levels off at mastery. “What happens eventually?” is a limit as x → ∞.'},
 see:[{title:'Let |x| grow',hint:'Pick a function and push x out to 10⁵ in both directions.',mount:mInfty}],
 vocab:[['Limit at infinity','lim_{x→∞} f(x) = L: f(x) → L as x grows; y = L is a horizontal asymptote.'],['Degree rule','Rational f: top degree < bottom → 0; equal → ratio of leading coefficients; top > bottom → ±∞.'],['Divide by the highest power','Divide every term by the highest power of x in the denominator.'],['√(x²) = |x|','For x → −∞, √(x²) = −x: signs can flip.']],
 examples:[ex('Example 1','lim_{x→∞} (6x³ − x)/(2x³ + 5)',[['equal degrees','Both degree 3.'],['6/2 = 3','']]),ex('Example 2','lim_{x→−∞} √(9x² + 1)/(x + 4)',[['√(9x² + 1) ≈ 3|x| = −3x for x &lt; 0',''],['−3x/x → −3','']])],
 mistake:{bad:'lim_{x→∞} (5x + 1)/(x² − 2) = 5',good:'= 0',why:'Compare degrees first: the denominator grows faster, so the fraction shrinks to 0.'},
 practice(){const T=pick(['eq','lo','hi']);const a=nz(-8,8),b=nz(-6,6);
  if(T==='eq')return num(`Find lim<sub>x→∞</sub> (${ps([a,rand(-5,5),rand(-9,9)])})/(${ps([b,rand(-5,5),rand(-9,9)])}). (fraction or decimal)`,[['limit =',a/b,0.011]],'Equal degrees: ratio of leading coefficients.',[[`${a}/${b} = ${frac(a,b)}`,'']]);
  if(T==='lo')return mc(`lim<sub>x→∞</sub> (${ps([a,rand(-5,5)])})/(${ps([b,0,rand(-9,9)])}) =`,'0',[frac(a,b),'∞','−∞'],'The denominator has the higher degree.');
  const s=(a>0)===(b>0)?'∞':'−∞';return mc(`lim<sub>x→∞</sub> (${ps([a,0,0,rand(-5,5)])})/(${ps([b,rand(1,5)])}) =`,s,[s==='∞'?'−∞':'∞','0',frac(a,b)],'Top degree is higher; check the signs of the leading coefficients.');},
 check:[q('lim_{x→∞} 4/x³ =',['4','0','∞','−4'],1,''),q('lim_{x→∞} e⁻ˣ =',['1','∞','0','e'],2,''),q('If lim_{x→∞} f(x) = 7, then…',['x = 7 is a VA','y = 7 is a HA','f(7) = ∞','f is constant'],1,'')]};

L['CA-1-7']={goal:'I can state the hypotheses of the Intermediate Value Theorem and use it to justify that a value or zero exists.',
 life:{title:'Temperature through the day',html:'At 6 a.m. it was 50°F; at 2 p.m. it was 78°F. Temperature changes continuously, so at some moment it was exactly 65°F. That is the <b>Intermediate Value Theorem</b> — a guarantee you can state before you know <b>when</b>.'},
 see:[{title:'Every height in between',hint:'Move N. When it is between f(0) and f(2), a crossing must exist.',mount:mIVT}],
 vocab:[['IVT','If f is continuous on [a, b] and N is between f(a) and f(b), then f(c) = N for at least one c in (a, b).'],['Hypotheses','(1) continuous on the closed interval, (2) N between f(a) and f(b). Both must be stated in a justification.'],['Zeros','If f(a) and f(b) have opposite signs, f has a zero in (a, b).'],['Existence only','The IVT does not say where c is or how many there are.']],
 examples:[ex('Justification','Show x⁵ − 3x + 1 = 0 has a solution in (0, 1).',[['f is a polynomial, so continuous on [0, 1]','Hypothesis 1.'],['f(0) = 1 > 0 and f(1) = −1 < 0','Hypothesis 2: 0 is between them.'],['By the IVT, f(c) = 0 for some c in (0, 1).','Conclusion.']])],
 mistake:{bad:'f(−1) = −1 and f(1) = 1 for f(x) = 1/x, so f has a zero in (−1, 1)',good:'the IVT does not apply',why:'1/x is not continuous on [−1, 1] (it breaks at 0). Without continuity, there is no guarantee.'},
 practice(){const fa=rand(-9,9),fb=rand(-9,9),N=rand(-10,10),cont=Math.random()<0.8;const between=(N-fa)*(N-fb)<0;
  const ans=!cont?'not guaranteed — f is not continuous':between?'yes — guaranteed by the IVT':'not guaranteed — N is not between f(a) and f(b)';
  return mc(`f is ${cont?'continuous':'defined but <b>not continuous</b>'} on [2, 6], f(2) = ${fmtNeg(fa)}, f(6) = ${fmtNeg(fb)}. Must f(c) = ${fmtNeg(N)} for some c in (2, 6)?`,ans,['yes — guaranteed by the IVT','not guaranteed — N is not between f(a) and f(b)','not guaranteed — f is not continuous'],'Check both hypotheses.');},
 check:[q('The IVT requires f to be…',['differentiable','continuous on [a, b]','increasing','a polynomial'],1,''),q('f continuous, f(1) = 4, f(3) = −2. The IVT guarantees a c with f(c) = …',['5','−3','0','6'],2,''),q('The IVT tells you…',['exactly where c is','that c exists','how many c there are','f′(c)'],1,'')]};

TOOLS['CA-1']={title:'The Squeeze Theorem',hint:'Zoom in on x = 0: the wiggling curve is trapped between −x² and x².',mount:mSqueeze};
})();
