/* Calculus · Unit 5 · Analyzing functions with derivatives */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;
const line=(G,m,x0,y0,col,w=2.5,dash='')=>curve(G,x=>y0+m*(x-x0),col,w,dash);
/* colored curve: col by predicate */
function colorCurve(G,f,pred,c1,c2,w=4){let s='',seg=[],cur=null;const flush=()=>{if(seg.length>1)s+=`<path clip-path="url(#${G.clip})" d="${seg.map((p,i)=>(i?'L':'M')+G.X(p[0]).toFixed(1)+' '+G.Y(Math.max(G.y0-3,Math.min(G.y1+3,p[1]))).toFixed(1)).join(' ')}" fill="none" stroke="${cur?c1:c2}" stroke-width="${w}"/>`;};
 for(let x=G.x0;x<=G.x1;x+=0.02){const y=f(x),p=pred(x);if(!isFinite(y)){flush();seg=[];continue;}if(p!==cur){if(seg.length)seg.push([x,y]);flush();seg=seg.length?[seg[seg.length-1]]:[];cur=p;}seg.push([x,y]);}flush();return s;}

function mMVT(el){sliders(el,[{k:'c',l:'c',min:0.05,max:3.95,step:.01,v:1}],V=>{const f=x=>x**3/3-2*x*x+3*x+1,fp=x=>x*x-4*x+3;const a=0,b=4,ms=(f(b)-f(a))/(b-a);const G=grid({x0:-0.5,x1:4.5,y0:-1,y1:4,u:90,uy:60,lab:1,laby:1});
  const close=Math.abs(fp(V.c)-ms)<0.03;let s=curve(G,f,'#2563eb',3)+line(G,ms,a,f(a),'#94a3b8',2,'6 4')+line(G,fp(V.c),V.c,f(V.c),close?'#059669':'#e11d48',2.5)+gdot(G,a,f(a),'#1f2937',6)+gdot(G,b,f(b),'#1f2937',6)+gdot(G,V.c,f(V.c),close?'#059669':'#e11d48',7);
  const cs=[2-1/Math.sqrt(3),2+1/Math.sqrt(3)];$('.mv-g',el).innerHTML=G.svg(s);
  $('.mv-r',el).innerHTML=`f(x) = x³/3 − 2x² + 3x + 1 on [0, 4]. Secant slope = [f(4) − f(0)]/4 = <b>${K.r3(ms)}</b>.<br>Tangent slope at c = ${nf(V.c)}: f′(c) = <b>${K.r3(fp(V.c))}</b> ${close?'✓ <b>parallel!</b>':''}<br>The MVT promises at least one such c; here c = 2 ± 1/√3 ≈ ${cs.map(K.r3).join(' and ')}.`;},`<div class="mv-g"></div><div class="readout mv-r"></div>`).run();}

const EV=[{t:'[−1, 4]',a:-1,b:4},{t:'[0, 2]',a:0,b:2},{t:'[1, 3.5]',a:1,b:3.5}];
function mEVT(el){chooser(el,EV.map(I=>({t:'x³ − 4.5x² + 6x on '+I.t,html:()=>{const f=x=>x**3-4.5*x*x+6*x;const crit=[1,2].filter(c=>c>I.a&&c<I.b);const cand=[I.a,...crit,I.b];const vals=cand.map(f);const mx=Math.max(...vals),mn=Math.min(...vals);
  const G=grid({x0:-1.5,x1:4.5,y0:-12,y1:10,u:70,uy:13,lab:1,laby:4});let s=`<rect x="${G.X(I.a)}" y="${G.Y(10)}" width="${G.X(I.b)-G.X(I.a)}" height="${G.Y(-12)-G.Y(10)}" fill="rgba(37,99,235,.06)"/>`+curve(G,f,'#cbd5e1',2)+curve(G,x=>x<I.a||x>I.b?NaN:f(x),'#2563eb',3.5)+cand.map((c,i)=>gdot(G,c,vals[i],vals[i]===mx?'#059669':vals[i]===mn?'#e11d48':'#64748b',7)).join('');
  return G.svg(s)+C.table(['candidate x','why','f(x)'],cand.map((c,i)=>[nf(c),i===0||i===cand.length-1?'endpoint':'f′ = 0',`${K.r3(vals[i])}${vals[i]===mx?' ← max':vals[i]===mn?' ← min':''}`]))+`<div class="readout">Closed interval method: check critical points <b>inside</b> the interval and both <b>endpoints</b>. Absolute max ${K.r3(mx)}, absolute min ${K.r3(mn)}.</div>`;}})));}

const SG=[{t:'x³ − 3x',f:x=>x**3-3*x,fp:x=>3*x*x-3,cp:['−1','1'],sg:['+','−','+'],g:{x0:-3,x1:3,y0:-4,y1:4}},{t:'x⁴ − 2x²',f:x=>x**4-2*x*x,fp:x=>4*x**3-4*x,cp:['−1','0','1'],sg:['−','+','−','+'],g:{x0:-2,x1:2,y0:-2,y1:4}},{t:'x eˣ',f:x=>x*Math.exp(x),fp:x=>(x+1)*Math.exp(x),cp:['−1'],sg:['−','+'],g:{x0:-5,x1:1.5,y0:-1,y1:3}}];
function mSign(el){chooser(el,SG.map(F=>({t:F.t,html:()=>{const G=grid(Object.assign({u:60,uy:44,lab:1,laby:1},F.g));const s=colorCurve(G,F.f,x=>F.fp(x)>0,'#059669','#e11d48');
  return G.svg(s)+`<div class="mute" style="text-align:center">sign of f′</div>`+C.signChart(F.cp,F.sg)+`<div class="readout"><span style="color:#059669"><b>green</b></span>: f′ > 0, increasing · <span style="color:#e11d48"><b>red</b></span>: f′ < 0, decreasing.<br>Where f′ changes − → +: local <b>min</b>; + → −: local <b>max</b>; no sign change: neither.</div>`;}})));}

function mConc(el){sliders(el,[{k:'x',l:'x',min:-2.5,max:2.5,step:.02,v:-1}],V=>{const f=x=>x**3/3-x,fp=x=>x*x-1,fpp=x=>2*x;const G=grid({x0:-3,x1:3,y0:-3,y1:3,u:70,uy:60,lab:1,laby:1});
  let s=colorCurve(G,f,x=>fpp(x)>0,'#2563eb','#d97706')+line(G,fp(V.x),V.x,f(V.x),'#64748b',2)+gdot(G,V.x,f(V.x),'#1f2937',7)+gdot(G,0,0,'#9333ea',7,'inflection');
  $('.cc-g',el).innerHTML=G.svg(s);$('.cc-r',el).innerHTML=`f(x) = x³/3 − x · f′ = x² − 1 · f″ = 2x<br>At x = ${nf(V.x)}: slope f′ = ${K.r3(fp(V.x))}, f″ = ${K.r3(fpp(V.x))} → ${fpp(V.x)>0?'<b style="color:#2563eb">concave up</b>: slopes increasing, curve above its tangent':fpp(V.x)<0?'<b style="color:#d97706">concave down</b>: slopes decreasing, curve below its tangent':'<b>inflection point</b>: concavity changes'}.`;},`<div class="cc-g"></div><div class="readout cc-r"></div>`).run();}

const LK=[{t:'x³ − 3x',f:x=>x**3-3*x,g:{x0:-2.5,x1:2.5}},{t:'sin x',f:Math.sin,g:{x0:-0.5,x1:6.8}},{t:'3x e^(−x²/2)',f:x=>3*x*Math.exp(-x*x/2),g:{x0:-3,x1:3}},{t:'x⁴/4 − x³',f:x=>x**4/4-x**3,g:{x0:-1.5,x1:4}}];
function mLinked(el){K.pickSlide(el,LK,F=>[{k:'x',l:'x',min:F.g.x0,max:F.g.x1,step:.02,v:(F.g.x0+F.g.x1)/2}],(V,F)=>{const f=F.f,fp=x=>C.d1(f,x),fpp=x=>C.d2(f,x);
  const range=g=>{let lo=1e9,hi=-1e9;for(let x=F.g.x0;x<=F.g.x1;x+=0.05){const y=g(x);if(isFinite(y)){lo=Math.min(lo,y);hi=Math.max(hi,y);}}const p=(hi-lo)*0.1+0.5;return [Math.floor(lo-p),Math.ceil(hi+p)];};
  const mk=(g,lab,col)=>{const [y0,y1]=range(g);const G=grid({x0:F.g.x0,x1:F.g.x1,y0,y1,u:420/(F.g.x1-F.g.x0),uy:120/(y1-y0),lab:1,laby:Math.max(1,Math.ceil((y1-y0)/5))});
   return `<div class="mute" style="text-align:center;font-weight:800;color:${col}">${lab}(${nf(V.x)}) = ${K.r3(g(V.x))}</div>`+G.svg(hline(G,0,'#94a3b8','')+curve(G,g,col,3)+vline(G,V.x,'#94a3b8','4 4')+gdot(G,V.x,g(V.x),col,6));};
  $('.lk-g',el).innerHTML=mk(f,'f','#2563eb')+mk(fp,'f′','#059669')+mk(fpp,'f″','#e11d48');
  const a=fp(V.x),b=fpp(V.x);$('.lk-r',el).innerHTML=`f is ${a>1e-3?'<b>increasing</b> (f′ > 0)':a<-1e-3?'<b>decreasing</b> (f′ < 0)':'<b>flat</b> (f′ = 0)'} and ${b>1e-3?'<b>concave up</b> (f″ > 0; f′ increasing)':b<-1e-3?'<b>concave down</b> (f″ < 0; f′ decreasing)':'at a possible <b>inflection point</b> (f″ = 0)'}.<br><span class="mute">Zeros of f′ line up with peaks/valleys of f; zeros of f″ line up with peaks/valleys of f′.</span>`;},`<div class="lk-g"></div><div class="readout lk-r"></div>`);}

function mBox(el){sliders(el,[{k:'x',l:'cut size x (in)',min:0.1,max:5.9,step:.05,v:1.5}],V=>{const x=V.x,Vf=x=>x*(12-2*x)**2;const S=20;const G=grid({x0:0,x1:6.2,y0:0,y1:140,u:52,uy:1.5,lab:1,laby:20,xl:'x'});
  $('.bx-g',el).innerHTML=`<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:center"><svg viewBox="0 0 260 260" style="width:220px"><rect x="10" y="10" width="${12*S}" height="${12*S}" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>${[[0,0],[12-x,0],[0,12-x],[12-x,12-x]].map(p=>`<rect x="${10+p[0]*S}" y="${10+p[1]*S}" width="${x*S}" height="${x*S}" fill="#fff" stroke="#e11d48" stroke-dasharray="4 3" stroke-width="2"/>`).join('')}<rect x="${10+x*S}" y="${10+x*S}" width="${(12-2*x)*S}" height="${(12-2*x)*S}" fill="none" stroke="#b45309" stroke-dasharray="6 4"/></svg>${G.svg(curve(G,Vf,'#2563eb',3)+gdot(G,x,Vf(x),'#e11d48',7)+gdot(G,2,128,'#059669',6,'max'))}</div>`;
  $('.bx-r',el).innerHTML=`Cut squares of side x from a 12 × 12 in sheet and fold up: V(x) = x(12 − 2x)², 0 < x < 6.<br>V(${nf(x)}) = <b>${K.r3(Vf(x))} in³</b>. V′(x) = (12 − 2x)(12 − 6x) = 0 → x = 2 → maximum V = <b>128 in³</b>.`;},`<div class="bx-g"></div><div class="readout bx-r"></div>`).run();}

/* ---------- lessons ---------- */
L['CA-5-1']={goal:'I can state and apply the Mean Value Theorem (and Rolle’s theorem), checking its hypotheses.',
 life:{title:'The speeding ticket',html:'Toll booths 60 miles apart record your times: 45 minutes. Your average speed was 80 mph, so the MVT says that at some instant your speedometer read exactly 80. Some states really ticket this way.'},
 see:[{title:'Find the parallel tangent',hint:'Slide c until the tangent turns green — parallel to the secant.',mount:mMVT}],
 vocab:[['Mean Value Theorem','If f is continuous on [a, b] and differentiable on (a, b), then f′(c) = [f(b) − f(a)]/(b − a) for some c in (a, b).'],['Rolle’s theorem','Special case f(a) = f(b): then f′(c) = 0 for some c.'],['Hypotheses','Continuity on the closed interval; differentiability on the open interval.'],['Meaning','Instantaneous rate = average rate at least once.']],
 examples:[ex('Example','f(x) = x² on [1, 3]. Find c from the MVT.',[['average rate: (9 − 1)/2 = 4',''],['f′(c) = 2c = 4 → c = 2','In (1, 3) ✓']])],
 mistake:{bad:'f(x) = |x| on [−1, 1]: by Rolle, f′(c) = 0 somewhere',good:'Rolle does not apply',why:'|x| is not differentiable at 0, so the hypothesis fails (and no such c exists).'},
 practice(){const a=rand(-2,1),b=a+rand(2,4),p=nz(-3,3),k=rand(-4,4);const ms=p*(a+b)+k;
  if(Math.random()<0.6)return num(`f(x) = ${ps([p,k,rand(-5,5)])} on [${fmtNeg(a)}, ${fmtNeg(b)}]. Find the c guaranteed by the MVT.`,[['c =',(a+b)/2,0.011]],'Set f′(c) equal to the average rate of change.',[[`average rate = ${fmtNeg(ms)}`,''],[`f′(c) = ${2*p}c ${k<0?'−':'+'} ${Math.abs(k)} = ${fmtNeg(ms)}`,''],[`c = ${nf((a+b)/2)}`,'For a quadratic, c is always the midpoint.']]);
  const T=pick([{f:'f(x) = 1/x on [−1, 2]',a:'no — not continuous on the interval'},{f:'f(x) = x^(2/3) on [−1, 1]',a:'no — not differentiable on the interval'},{f:'f(x) = sin x on [0, π]',a:'yes'},{f:'f(x) = √x on [0, 4]',a:'yes'},{f:'f(x) = |x − 2| on [0, 4]',a:'no — not differentiable on the interval'}]);
  return mc(`Does the MVT apply to ${T.f}?`,T.a,['yes','no — not continuous on the interval','no — not differentiable on the interval'],'Check both hypotheses.');},
 check:[q('The MVT conclusion is f′(c) = …',['0','f(b) − f(a)','[f(b) − f(a)]/(b − a)','f(c)'],2,''),q('Rolle’s theorem adds the condition…',['f(a) = f(b)','f(a) = 0','f′(a) = 0','a = b'],0,''),q('Differentiability is required on…',['[a, b]','(a, b)','all reals','only at c'],1,'')]};

L['CA-5-2']={goal:'I can find critical points and use the Extreme Value Theorem and the closed interval method to find absolute extrema.',
 life:{title:'Highest and lowest',html:'A day’s temperature on a closed interval of time must reach a highest and a lowest value. Calculus tells you where to look: at the moments the temperature is flat, or at the start and end of the day.'},
 see:[{title:'Closed interval method',hint:'Pick an interval. Only candidates inside the interval count.',mount:mEVT}],
 vocab:[['Extreme Value Theorem','A continuous f on a closed [a, b] has an absolute max and an absolute min.'],['Critical point','x = c in the domain where f′(c) = 0 or f′(c) does not exist.'],['Closed interval method','Evaluate f at critical points in (a, b) and at a and b; the largest is the max, the smallest the min.'],['Local vs absolute','Local: highest nearby; absolute: highest on the whole interval.']],
 examples:[ex('Example','f(x) = x³ − 3x on [0, 3].',[['f′ = 3x² − 3 = 0 → x = ±1; only 1 is in [0, 3]',''],['f(0) = 0, f(1) = −2, f(3) = 18',''],['abs max 18 at x = 3; abs min −2 at x = 1','']])],
 mistake:{bad:'the absolute max must occur where f′ = 0',good:'check endpoints too',why:'On a closed interval the extreme value can sit at an endpoint, where f′ need not be 0.'},
 practice(){const r=rand(1,3),a=-rand(0,r+1),b=r+rand(1,3);const f=x=>x**3-3*r*r*x;const cand=[a,b,...[-r,r].filter(c=>c>a&&c<b)];const vals=cand.map(f);
  return num(`f(x) = x³ − ${3*r*r}x on [${fmtNeg(a)}, ${b}]. Find the absolute maximum and minimum values.`,[['max =',Math.max(...vals)],['min =',Math.min(...vals)]],`f′ = 3x² − ${3*r*r} = 0 at x = ±${r}. Keep critical points inside the interval; add the endpoints.`,[[`candidates: ${cand.map(nf).join(', ')}`,''],[`values: ${vals.map(fmtNeg).join(', ')}`,'']]);},
 check:[q('The EVT requires…',['differentiable on ℝ','continuous on a closed interval','an open interval','f′ ≠ 0'],1,''),q('A critical point is where f′ is…',['positive','0 or undefined','negative','maximal'],1,''),q('On [a, b], absolute extrema can occur at…',['only critical points','only endpoints','critical points or endpoints','x = 0'],2,'')]};

L['CA-5-3']={goal:'I can use the sign of f′ to find intervals where f is increasing or decreasing.',
 life:{title:'Profit going up or down?',html:'A company tracks profit P(x). Where P′ > 0, producing more increases profit; where P′ < 0, producing more hurts. The sign chart of the derivative is the decision map.'},
 see:[{title:'Color by slope',hint:'Pick a function. Green where f′ > 0, red where f′ < 0.',mount:mSign}],
 vocab:[['Increasing','f′ > 0 on an interval → f increasing there.'],['Decreasing','f′ < 0 on an interval → f decreasing there.'],['Sign chart','Mark critical points (and where f is undefined); test one x in each interval.'],['Justify','“f is increasing on (a, b) because f′(x) > 0 there.”']],
 examples:[ex('Example','f(x) = x³ − 12x',[['f′ = 3x² − 12 = 3(x − 2)(x + 2)',''],['test −3: +, 0: −, 3: +','Sign chart.'],['increasing on (−∞, −2) and (2, ∞); decreasing on (−2, 2)','']])],
 mistake:{bad:'f is increasing because f(x) > 0',good:'because f′(x) > 0',why:'Positive values do not mean rising values. Increasing depends on the derivative.'},
 practice(){const p=rand(-4,0),r=p+rand(1,5);const lo=Math.min(p,r),hi=Math.max(p,r);const s=pick([1,-1]);
  const ans=s>0?`decreasing on (${fmtNeg(lo)}, ${fmtNeg(hi)})`:`increasing on (${fmtNeg(lo)}, ${fmtNeg(hi)})`;
  const fa=v=>v===0?'x':`(x ${v<0?'+':'−'} ${Math.abs(v)})`;return mc(`f′(x) = ${s<0?'−':''}${fa(lo)}${fa(hi)}. On the middle interval, f is…`,ans,[`increasing on (${fmtNeg(lo)}, ${fmtNeg(hi)})`,`decreasing on (${fmtNeg(lo)}, ${fmtNeg(hi)})`,'constant','concave up'],`Test a point between ${fmtNeg(lo)} and ${fmtNeg(hi)}.`);},
 check:[q('f′ > 0 on (1, 4) means f is…',['decreasing','increasing','concave up','positive'],1,''),q('Sign-chart boundary points are where f′ is…',['positive','0 or undefined','maximal','1'],1,''),q('f′(x) = x² + 1. f is increasing…',['nowhere','everywhere','only for x > 0','only at 0'],1,'')]};

L['CA-5-4']={goal:'I can use the First Derivative Test to classify critical points as relative maxima, minima, or neither.',
 life:{title:'Top of the hill',html:'Hiking up (slope +) then down (slope −) means you passed a peak. If the slope is + then + (it just flattens for a moment), there was no peak at all.'},
 see:[{title:'Read the sign changes',hint:'At each critical point, look at how f′ changes sign.',mount:mSign}],
 vocab:[['First Derivative Test','At a critical point c: f′ changes + → − → relative max; − → + → relative min; no sign change → neither.'],['Relative (local) extremum','Highest/lowest compared with nearby points.'],['Justification','“f has a relative min at x = c because f′ changes from negative to positive there.”']],
 examples:[ex('Example','f′(x) = x²(x − 3)',[['critical points 0, 3',''],['signs: (−∞, 0): −, (0, 3): −, (3, ∞): +',''],['x = 0: no change → neither; x = 3: − → + → relative min','']])],
 mistake:{bad:'f′(0) = 0, so f has an extremum at 0',good:'check for a sign change',why:'f(x) = x³ has f′(0) = 0 but no extremum: f′ is positive on both sides.'},
 practice(){const c=rand(-4,4),m=rand(1,3),sg=pick([1,-1]);const ev=m%2===0;let ans;if(ev)ans='neither';else ans=sg>0?'relative minimum':'relative maximum';
  return mc(`f′(x) = ${sg<0?'−':''}(x ${c<0?'+':'−'} ${Math.abs(c)})${A2.sup(m)}. At x = ${fmtNeg(c)}, f has a…`,ans,['relative maximum','relative minimum','neither'],ev?'An even power does not change sign.':'An odd power changes sign; check which way.');},
 check:[q('f′ changes from + to − at c. Then f(c) is a…',['relative min','relative max','neither','inflection'],1,''),q('f′ is negative on both sides of c. Then…',['relative max','relative min','neither','absolute max'],2,''),q('The First Derivative Test uses…',['f″','the sign of f′ around c','f(c) only','endpoints'],1,'')]};

L['CA-5-5']={goal:'I can use f″ to find intervals of concavity and inflection points.',
 life:{title:'Bending',html:'A road that bends upward like a cup is concave up; bending like a cap is concave down. Where the road switches from one to the other — an inflection point — is where a driver’s steering changes direction.'},
 see:[{title:'Concavity and tangent lines',hint:'Drag the point. Blue: concave up; orange: concave down.',mount:mConc}],
 vocab:[['Concave up','f″ > 0: f′ increasing; graph above its tangent lines (cup).'],['Concave down','f″ < 0: f′ decreasing; graph below its tangent lines (cap).'],['Inflection point','A point where f is continuous and concavity changes (f″ changes sign).'],['Careful','f″ = 0 alone does not guarantee an inflection point (e.g. x⁴ at 0).']],
 examples:[ex('Example','f(x) = x³ − 6x² + 5',[['f″ = 6x − 12',''],['f″ < 0 for x < 2, > 0 for x > 2',''],['concave down on (−∞, 2), up on (2, ∞); inflection at x = 2','']])],
 mistake:{bad:'f″(0) = 0 for f(x) = x⁴, so (0, 0) is an inflection point',good:'f″ = 12x² ≥ 0 does not change sign',why:'An inflection point needs a sign change in f″, not just a zero.'},
 practice(){const a=nz(-2,2),b=rand(-6,6),c=rand(-5,5);const xi=-b/(3*a);
  if(Math.random()<0.6)return num(`f(x) = ${ps([a,b,c,rand(-9,9)])}. Find the x-coordinate of the inflection point. (fraction or decimal)`,[['x =',xi,0.011]],'Set f″ = 0; a cubic’s f″ is linear and always changes sign.',[[`f″ = ${ps([6*a,2*b])}`,''],[`x = ${frac(-2*b,6*a)}`,'']]);
  const T=pick([{f:'f″ > 0 on (1, 5)',a:'concave up'},{f:'f′ is decreasing on (0, 2)',a:'concave down'},{f:'f′ is increasing on (−3, 0)',a:'concave up'},{f:'f″ < 0 on (2, 7)',a:'concave down'}]);return mc(`${T.f}. On that interval f is…`,T.a,['concave up','concave down','increasing','decreasing'],'Concavity is about f″, i.e. whether f′ is increasing or decreasing.');},
 check:[q('f″ > 0 means f is…',['increasing','concave up','concave down','positive'],1,''),q('If f′ is decreasing, f is…',['concave down','concave up','decreasing','constant'],0,''),q('An inflection point requires f″ to…',['be 0','change sign','be positive','be undefined'],1,'')]};

L['CA-5-6']={goal:'I can use the Second Derivative Test to classify critical points, and know when the test fails.',
 life:{title:'Cup or cap?',html:'If the graph is flat at a point and bends like a cup, you are at the bottom of a valley. If it bends like a cap, you are at the top of a hill. Concavity at a flat point decides it.'},
 see:[{title:'Concavity at the flat points',hint:'Drag to x = −1 and x = 1, where f′ = 0. Check f″ there.',mount:mConc}],
 vocab:[['Second Derivative Test','If f′(c) = 0 and f″(c) > 0 → relative min; f″(c) < 0 → relative max.'],['Inconclusive','If f″(c) = 0, the test says nothing; use the First Derivative Test.'],['Candidates test','For absolute extrema on a closed interval, still compare values.']],
 examples:[ex('Example','f(x) = x³ − 3x',[['f′ = 3x² − 3 = 0 → x = ±1',''],['f″ = 6x: f″(−1) = −6 < 0 → relative max',''],['f″(1) = 6 > 0 → relative min','']])],
 mistake:{bad:'f″(c) = 0, so there is no extremum at c',good:'the test is inconclusive',why:'x⁴ has f″(0) = 0 and a minimum at 0. Fall back on the First Derivative Test.'},
 practice(){const T=pick([[1,-6,9,'x³ − 6x² + 9x'],[1,-3,0,'x³ − 3x²'],[-1,3,0,'−x³ + 3x²'],[2,-3,-12,'2x³ − 3x² − 12x']]);const [a,b,c]=T;
  const disc=4*b*b-12*a*c;const r=[(-2*b-Math.sqrt(disc))/(6*a),(-2*b+Math.sqrt(disc))/(6*a)].sort((x,y)=>x-y);const x=pick(r);const f2=6*a*x+2*b;
  return mc(`f(x) = ${T[3]}. At the critical point x = ${nf(x)}, f″ = ${fmtNeg(f2)}. So f has a…`,f2>0?'relative minimum':f2<0?'relative maximum':'test is inconclusive',['relative maximum','relative minimum','test is inconclusive'],'f″ > 0: cup (min); f″ < 0: cap (max).');},
 check:[q('f′(c) = 0, f″(c) = −3 →',['relative min','relative max','inflection','inconclusive'],1,''),q('f′(c) = 0, f″(c) = 0 →',['min','max','inconclusive','inflection'],2,''),q('The Second Derivative Test needs…',['f′(c) = 0','f(c) = 0','f″(c) = 0','an endpoint'],0,'')]};

L['CA-5-7']={goal:'I can connect the graphs of f, f′, and f″ and reason from one to the others.',
 life:{title:'Reading a speed graph',html:'Given only a car’s velocity graph, you can still say when it was farthest ahead, when it turned around, and when it was braking. That is reading f from f′ — a favorite AP question.'},
 see:[{title:'Three graphs, one story',hint:'Pick a function and sweep x. Compare the three graphs at the same moment.',mount:mLinked}],
 vocab:[['f′ graph above axis','f increasing.'],['f′ graph crosses the axis','f has a relative extremum.'],['f′ graph rising / falling','f concave up / down.'],['f′ graph has a max or min','f has an inflection point.']],
 examples:[ex('Example','The graph of f′ crosses the x-axis from below at x = 2 and has a maximum at x = 4.',[['x = 2: f′ goes − → +, so f has a relative min',''],['x = 4: f′ changes from increasing to decreasing, so f has an inflection point','']])],
 mistake:{bad:'f′ has a maximum at x = 4, so f has a maximum at x = 4',good:'f has an inflection point at x = 4',why:'A max of f′ is where f is steepest — a change in concavity, not a peak of f.'},
 practice(){const T=pick([{s:'f′ changes from positive to negative at x = 3',a:'f has a relative max at x = 3'},{s:'f′ changes from negative to positive at x = 3',a:'f has a relative min at x = 3'},{s:'f′ has a relative max at x = 3',a:'f has an inflection point at x = 3'},{s:'f′ is positive and increasing on (1, 3)',a:'f is increasing and concave up on (1, 3)'},{s:'f′ is negative and increasing on (1, 3)',a:'f is decreasing and concave up on (1, 3)'},{s:'f′ is positive and decreasing on (1, 3)',a:'f is increasing and concave down on (1, 3)'}]);
  return mc(`Given the graph of f′: ${T.s}. What does this tell you about f?`,T.a,['f has a relative max at x = 3','f has a relative min at x = 3','f has an inflection point at x = 3','f is increasing and concave up on (1, 3)','f is decreasing and concave up on (1, 3)','f is increasing and concave down on (1, 3)'].filter(x=>x!==T.a).slice(0,3),'Sign of f′ → increasing/decreasing; slope of f′ → concavity.');},
 check:[q('Zeros of f′ (with sign change) correspond to f’s…',['inflection points','relative extrema','zeros','asymptotes'],1,''),q('Where f′ is decreasing, f is…',['concave down','concave up','decreasing','negative'],0,''),q('Extrema of f′ correspond to f’s…',['zeros','extrema','inflection points','endpoints'],2,'')]};

L['CA-5-8']={goal:'I can set up and solve optimization problems: write the function, find its domain, and justify the max or min.',
 life:{title:'The best box',html:'From a 12 × 12 inch sheet, cut corners and fold a box. Too small a cut gives a flat tray; too big gives a tall skinny box. Somewhere in between is the biggest volume — calculus finds it exactly.'},
 see:[{title:'Build the box',hint:'Slide the cut size. Watch the volume rise and fall.',mount:mBox}],
 vocab:[['Steps','(1) Draw and name variables. (2) Write the quantity to optimize. (3) Use a constraint to reduce to one variable. (4) Find the domain. (5) Find critical points. (6) Justify max/min.'],['Justify','Use the closed interval method, the First Derivative Test, or the Second Derivative Test.'],['Answer the question','Report the value asked for (dimensions? the maximum value?) with units.']],
 examples:[ex('Example','Fence a rectangle along a river (no fence on the river side) with 400 m of fence. Max area?',[['2x + y = 400, A = xy = x(400 − 2x)','Constraint, then one variable.'],['A′ = 400 − 4x = 0 → x = 100','Domain 0 < x < 200.'],['A″ = −4 < 0 → max; y = 200, A = 20 000 m²','']])],
 mistake:{bad:'stop at x = 100',good:'answer the question: 100 m by 200 m, area 20 000 m²',why:'The critical point is a step, not the final answer.'},
 practice(){const P=rand(10,60)*10;if(Math.random()<0.5)return num(`A rectangle has perimeter ${P} m. Find the maximum possible area.`,[['max area =',(P/4)**2]],'A = x(P/2 − x). Set A′ = 0.',[[`A = x(${P/2} − x), A′ = ${P/2} − 2x = 0 → x = ${P/4}`,''],[`square: area ${(P/4)**2} m²`,'']]);
  const S=rand(2,12)*2;return num(`Two positive numbers have sum ${S}. Find the maximum of their product.`,[['max product =',(S/2)**2]],'P = x(S − x).',[[`P′ = ${S} − 2x = 0 → x = ${S/2}`,''],[`P = ${(S/2)**2}`,'']]);},
 check:[q('The first step in optimization is usually…',['differentiate','draw and name variables','plug in numbers','graph f″'],1,''),q('A constraint is used to…',['eliminate a variable','find f″','check units','graph'],0,''),q('After finding a critical point you must…',['stop','justify it is a max/min','square it','integrate'],1,'')]};

TOOLS['CA-5']={title:'f, f′, f″ linked graphs',hint:'Sweep x across three stacked graphs and connect increasing, extrema, and concavity.',mount:mLinked};
})();
