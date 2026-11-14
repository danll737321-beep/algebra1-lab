/* Calculus · Unit 7 · Differential equations */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;const {stepper}=KA;

const MD=[{t:'Newton cooling',s:'The rate of change of temperature T is proportional to the difference between T and the room temperature 20°C.',de:'dT/dt = k(T − 20)',F:(t,y)=>-0.5*(y-20),y0:90,g:{x0:0,x1:8,y0:0,y1:100,uy:2.6,laby:20}},
 {t:'Growth',s:'A population grows at a rate proportional to its size.',de:'dP/dt = kP',F:(t,y)=>0.35*y,y0:5,g:{x0:0,x1:8,y0:0,y1:100,uy:2.6,laby:20}},
 {t:'Draining',s:'Water leaks from a tank at a rate proportional to the square root of the depth h.',de:'dh/dt = −k√h',F:(t,y)=>y>0?-1.6*Math.sqrt(y):0,y0:16,g:{x0:0,x1:8,y0:0,y1:18,uy:14,laby:4}}];
function mModel(el){chooser(el,MD.map(M=>({t:M.t,html:()=>{const G=grid(Object.assign({u:52,lab:1},M.g));
  return `<p>${M.s}</p><div class="eqline math">${M.de}</div>`+G.svg(C.solCurve(G,M.F,0,M.y0,'#2563eb',3))+`<div class="readout">“Rate of change of y” → dy/dt. “Proportional to” → multiply by a constant k. The curve shows one solution starting at ${M.y0}.</div>`;}})));}

const VF=[{t:'y = 3e^(2x)',y:x=>3*Math.exp(2*x),yp:x=>6*Math.exp(2*x),ok:true},{t:'y = e^(2x) + 1',y:x=>Math.exp(2*x)+1,yp:x=>2*Math.exp(2*x),ok:false},{t:'y = x²',y:x=>x*x,yp:x=>2*x,ok:false},{t:'y = −5e^(2x)',y:x=>-5*Math.exp(2*x),yp:x=>-10*Math.exp(2*x),ok:true}];
function mVerify(el){K.pickSlide(el,VF,[{k:'x',l:'test x',min:-1,max:1,step:.1,v:0.5}],(V,F)=>{const L=F.yp(V.x),R=2*F.y(V.x);
  $('.vf-r',el).innerHTML=`Differential equation: <b>y′ = 2y</b>. Candidate: ${F.t}.<br>At x = ${nf(V.x)}: left side y′ = <b>${K.r3(L)}</b> · right side 2y = <b>${K.r3(R)}</b> ${Math.abs(L-R)<1e-6?'✓ equal':'✗ not equal'}<br>${F.ok?'It works for <b>every</b> x: a solution.':'Fails: not a solution.'}`;},`<div class="readout vf-r"></div>`);}

const SF=[{t:'dy/dx = x',F:(x,y)=>x,s:'Slopes depend only on x: the same slope along each vertical column.'},{t:'dy/dx = y',F:(x,y)=>y,s:'Slopes depend only on y: the same slope along each horizontal row.'},{t:'dy/dx = x + y',F:(x,y)=>x+y,s:'Slope zero along the line y = −x.'},{t:'dy/dx = −x/y',F:(x,y)=>-x/y,s:'Solutions are circles.'},{t:'dy/dx = y(2 − y)/2',F:(x,y)=>y*(2-y)/2,s:'Equilibrium solutions y = 0 and y = 2.'}];
function mSlope(el){K.pickSlide(el,SF,[{k:'x0',l:'start x₀',min:-3,max:3,step:.25,v:0},{k:'y0',l:'start y₀',min:-3,max:3,step:.25,v:1}],(V,F)=>{const G=grid({x0:-4,x1:4,y0:-4,y1:4,u:46,lab:1,laby:1});
  let s=C.slopeField(G,F.F,0.5,0.32)+C.solCurve(G,F.F,V.x0,V.y0,'#e11d48',3)+gdot(G,V.x0,V.y0,'#1f2937',7);
  $('.sf-g',el).innerHTML=G.svg(s);$('.sf-r',el).innerHTML=`${F.t}. At (${nf(V.x0)}, ${nf(V.y0)}) the slope is <b>${isFinite(F.F(V.x0,V.y0))?K.r3(F.F(V.x0,V.y0)):'undefined'}</b>.<br>${F.s} The red curve follows the little segments: a particular solution.`;},`<div class="sf-g"></div><div class="readout sf-r"></div>`);}

function mEuler(el){sliders(el,[{k:'h',l:'step size h',min:0.05,max:1,step:.05,v:0.5}],V=>{const F=(x,y)=>x+y,ex=x=>2*Math.exp(x)-x-1,h=V.h,n=Math.round(1/h);
  const G=grid({x0:-0.2,x1:1.3,y0:0,y1:4.5,u:300,uy:80,lab:1,laby:1});let x=0,y=1,pts=[[0,1]],rows=[];for(let i=0;i<n;i++){const m=F(x,y);rows.push([nf(+x.toFixed(2)),K.r3(y),K.r3(m),K.r3(y+h*m)]);y+=h*m;x+=h;pts.push([x,y]);}
  let s=C.slopeField(G,F,0.25,0.3)+curve(G,x=>x<0?NaN:ex(x),'#2563eb',3)+`<path d="${pts.map((p,i)=>(i?'L':'M')+G.X(p[0])+' '+G.Y(p[1])).join(' ')}" fill="none" stroke="#e11d48" stroke-width="3"/>`+pts.map(p=>gdot(G,p[0],p[1],'#e11d48',5)).join('');
  $('.eu-g',el).innerHTML=G.svg(s);$('.eu-r',el).innerHTML=(n<=5?C.table(['x','y','slope x + y','next y = y + h·slope'],rows):'')+`dy/dx = x + y, y(0) = 1. Euler with h = ${nf(h)}: y(1) ≈ <b>${K.r3(y)}</b> · exact y(1) = 2e − 2 ≈ <b>${K.r3(ex(1))}</b><br>Smaller steps → better estimate. Here the solution is concave up, so Euler <b>underestimates</b>.`;},`<div class="eu-g"></div><div class="readout eu-r"></div>`).run();}

const SV=[{t:'dy/dx = xy, y(0) = 3',steps:[{h:'dy/dx = xy',n:'Get all y’s with dy and all x’s with dx.'},{h:'dy/y = x dx',n:'Separate (y ≠ 0).'},{h:'ln|y| = x²/2 + C',n:'Integrate both sides; one constant is enough.'},{h:'y = A e^(x²/2)',n:'Exponentiate: A = ±e^C.'},{h:'y(0) = 3 → A = 3, y = 3e^(x²/2)',n:'Use the initial condition.'}]},
 {t:'dy/dx = x²/y², y(0) = 2',steps:[{h:'y² dy = x² dx',n:'Separate.'},{h:'y³/3 = x³/3 + C',n:'Integrate.'},{h:'y(0) = 2 → 8/3 = C',n:'Find C before solving for y.'},{h:'y = ∛(x³ + 8)',n:'Solve for y.'}]},
 {t:'dy/dt = 2 − y, y(0) = 5',steps:[{h:'dy/(2 − y) = dt',n:'Separate.'},{h:'−ln|2 − y| = t + C',n:'Integrate (chain rule gives the minus).'},{h:'y = 2 + Be^(−t)',n:'Solve for y.'},{h:'y(0) = 5 → B = 3: y = 2 + 3e^(−t)',n:'Approaches the equilibrium y = 2.'}]}];
function mSep(el){stepper(el,SV);}

function mExp(el){sliders(el,[{k:'k',l:'k',min:-0.8,max:0.8,step:.05,v:0.3},{k:'y0',l:'y₀',min:1,max:20,step:1,v:10}],V=>{const k=V.k,y=t=>V.y0*Math.exp(k*t);const G=grid({x0:0,x1:10,y0:0,y1:60,u:44,uy:4,lab:1,laby:10,xl:'t'});
  const T=k!==0?Math.log(2)/Math.abs(k):Infinity;let s=curve(G,y,'#2563eb',3)+gdot(G,0,V.y0,'#1f2937',6);if(isFinite(T)&&T<10)s+=gdot(G,T,k>0?2*V.y0:V.y0/2,'#e11d48',6,k>0?'doubled':'halved');
  $('.ex-g',el).innerHTML=G.svg(s);$('.ex-r',el).innerHTML=`dy/dt = ky with y(0) = y₀ has solution <b>y = y₀e^(kt)</b> = ${V.y0}e^(${nf(k)}t).<br>${k>0?`Growth. Doubling time ln 2 / k ≈ <b>${K.r3(T)}</b>.`:k<0?`Decay. Half-life ln 2 / |k| ≈ <b>${K.r3(T)}</b>.`:'k = 0: no change.'}`;},`<div class="ex-g"></div><div class="readout ex-r"></div>`).run();}

function mLog(el){sliders(el,[{k:'P0',l:'P(0)',min:5,max:190,step:5,v:20},{k:'k',l:'k',min:0.2,max:1.5,step:.05,v:0.6}],V=>{const M=150,F=(t,P)=>V.k*P*(1-P/M);const G=grid({x0:0,x1:12,y0:0,y1:200,u:38,uy:1.2,lab:2,laby:50,xl:'t'});
  let s=C.slopeField(G,F,1,0.3)+hline(G,M,'#059669','6 4')+hline(G,M/2,'#d97706','3 4')+C.solCurve(G,F,0,V.P0,'#2563eb',3);
  $('.lg-g',el).innerHTML=G.svg(s);$('.lg-r',el).innerHTML=`dP/dt = kP(1 − P/150). Carrying capacity <b style="color:#059669">M = 150</b>: lim<sub>t→∞</sub> P(t) = 150 for any P(0) > 0.<br>${V.P0<75?'P grows fastest when it passes <b style="color:#d97706">M/2 = 75</b> (inflection point).':V.P0>150?'Starting above M, P decreases toward 150.':'Starting between 75 and 150, P rises and is concave down.'}`;},`<div class="lg-g"></div><div class="readout lg-r"></div>`).run();}

/* ---------- lessons ---------- */
L['CA-7-1']={goal:'I can translate a verbal description of a rate into a differential equation.',
 life:{title:'Laws written as rates',html:'Many laws of nature describe how fast something changes, not what it equals: “cools at a rate proportional to the temperature difference.” Writing these as equations with derivatives is the first step to predicting the future.'},
 see:[{title:'From words to equations',hint:'Pick a situation; read the sentence and its equation.',mount:mModel}],
 vocab:[['Differential equation','An equation involving a derivative, e.g. dy/dt = 0.3y.'],['“Proportional to”','Equals a constant times: dy/dt = k·(…).'],['“Inversely proportional”','dy/dt = k/(…).'],['Solution','A function that makes the equation true.']],
 examples:[ex('Example','The rate of change of volume V is proportional to the cube root of V.',[['dV/dt = k∛V','']])],
 mistake:{bad:'“y is proportional to t” → dy/dt = kt',good:'y = kt',why:'Only “the rate of change of y” becomes dy/dt.'},
 practice(){const T=pick([{s:'The rate of change of A is proportional to A.',a:'dA/dt = kA'},{s:'The rate of change of y is proportional to the square of y.',a:'dy/dt = ky²'},{s:'The rate of change of T is proportional to the difference between T and 70.',a:'dT/dt = k(T − 70)'},{s:'The rate of change of P is inversely proportional to P.',a:'dP/dt = k/P'},{s:'The rate of change of h is proportional to √h.',a:'dh/dt = k√h'}]);
  return mc(T.s,T.a,['dA/dt = kA','dy/dt = ky²','dT/dt = k(T − 70)','dP/dt = k/P','dh/dt = k√h','y = kt'].filter(x=>x!==T.a).sort(()=>Math.random()-0.5).slice(0,3),'“Rate of change” → derivative; “proportional” → k times.');},
 check:[q('“Proportional to” translates to…',['add k','multiply by k','divide by k','raise to k'],1,''),q('dy/dt = 0.2y describes…',['linear growth','exponential growth','decay to 0','oscillation'],1,''),q('A solution of a DE is a…',['number','function','slope','constant only'],1,'')]};

L['CA-7-2']={goal:'I can verify that a function is a solution to a differential equation.',
 life:{title:'Checking an answer key',html:'You do not need to know how to solve a differential equation to check a proposed solution — just differentiate it and substitute, the same way you would check x = 3 in an algebra equation.'},
 see:[{title:'Plug it in',hint:'Pick a candidate for y′ = 2y and test several x-values.',mount:mVerify}],
 vocab:[['Verify','Compute y′ (and y″ if needed) and substitute into both sides.'],['General solution','A family with an arbitrary constant, e.g. y = Ce^(2x).'],['Particular solution','One member, chosen by an initial condition.']],
 examples:[ex('Example','Is y = sin(3x) a solution of y″ + 9y = 0?',[['y″ = −9 sin(3x)',''],['−9 sin(3x) + 9 sin(3x) = 0 ✓','Yes, for all x.']])],
 mistake:{bad:'it works at x = 0, so it is a solution',good:'it must work for all x in the interval',why:'One lucky x-value is not enough.'},
 practice(){const k=nz(-4,4),C0=nz(-5,5);const T=pick([{f:`y = ${C0}e^(${k}x)`,de:`y′ = ${k}y`,a:'yes'},{f:`y = e^(${k}x) + ${Math.abs(C0)}`,de:`y′ = ${k}y`,a:'no'},{f:`y = ${C0}x²`,de:`xy′ = 2y`,a:'yes'},{f:`y = ${C0}x³`,de:`xy′ = 2y`,a:'no'},{f:'y = cos(2x)',de:'y″ + 4y = 0',a:'yes'},{f:'y = sin x',de:'y″ + 4y = 0',a:'no'}]);
  return mc(`Is ${T.f} a solution of ${T.de}?`,T.a,['yes','no'],'Differentiate and substitute.');},
 check:[q('To verify a solution you…',['integrate','differentiate and substitute','graph only','guess'],1,''),q('y = Ce^(5x) solves…',['y′ = 5','y′ = 5y','y′ = y/5','y″ = y'],1,''),q('An initial condition selects…',['the DE','a particular solution','the slope field','k'],1,'')]};

L['CA-7-3']={goal:'I can sketch and interpret slope fields and draw a solution curve through a given point.',
 life:{title:'A map of currents',html:'A weather map shows wind arrows everywhere. Drop a balloon and it drifts along them. A slope field is a map of tiny tangent segments; a solution curve is the balloon’s path.'},
 see:[{title:'Slope fields',hint:'Pick a differential equation and move the starting point.',mount:mSlope}],
 vocab:[['Slope field','At each point (x, y), a short segment with slope dy/dx = F(x, y).'],['Solution curve','Follows the segments, tangent to each.'],['Patterns','Slopes depend only on x: columns match; only on y: rows match.'],['Equilibrium','A horizontal solution y = c where F(x, c) = 0 for all x.']],
 examples:[ex('Example','dy/dx = x − y. Slope at (2, 1)? Where are slopes 0?',[['2 − 1 = 1',''],['slope 0 where y = x','The isocline y = x.']])],
 mistake:{bad:'segments at (1, 2) and (1, −2) must match for dy/dx = xy',good:'they differ: 2 vs −2',why:'When F depends on y, slopes change as you move vertically.'},
 practice(){const T=pick(['val','match']);if(T==='val'){const a=nz(-3,3),b=nz(-3,3),x=rand(-3,3),y=rand(-3,3);return num(`dy/dx = ${a}x ${b<0?'−':'+'} ${Math.abs(b)}y. Find the slope of the segment at (${fmtNeg(x)}, ${fmtNeg(y)}).`,[['slope =',a*x+b*y]],'Substitute the point.',[[`${a}·${P(x)} + ${b}·${P(y)} = ${a*x+b*y}`,'']]);}
  const M=pick([{d:'segments are the same along each vertical line',a:'dy/dx = x²'},{d:'segments are the same along each horizontal line',a:'dy/dx = y − 1'},{d:'segments are horizontal along y = −x',a:'dy/dx = x + y'},{d:'segments are horizontal along both axes',a:'dy/dx = xy'}]);
  return mc(`A slope field’s ${M.d}. Which DE could it be?`,M.a,['dy/dx = x²','dy/dx = y − 1','dy/dx = x + y','dy/dx = xy'],'Which variable does the slope depend on? Where is it 0?');},
 check:[q('A slope field segment at (x, y) has slope…',['y','F(x, y)','x','1'],1,''),q('For dy/dx = y − 2, an equilibrium is…',['y = 0','y = 2','x = 2','none'],1,''),q('Solution curves are ___ to the segments.',['perpendicular','tangent','parallel to x-axis','unrelated'],1,'')]};

L['CA-7-4']={goal:'I can use Euler’s method to approximate a solution and judge over- or underestimates (BC).',
 life:{title:'Walking in small steps',html:'Lost in fog with only a compass that shows the slope where you stand, you take a small step that way, check again, and repeat. That is Euler’s method — the idea behind most computer simulations.'},
 see:[{title:'Euler steps',hint:'Change the step size; compare the red Euler path with the true blue solution.',mount:mEuler}],
 vocab:[['Euler’s method','yₙ₊₁ = yₙ + h·F(xₙ, yₙ), xₙ₊₁ = xₙ + h.'],['Step size h','Smaller h → more steps → better accuracy.'],['Concavity','Solution concave up → Euler underestimates; concave down → overestimates.'],['Table','Track x, y, slope, and the next y.']],
 examples:[ex('Example','dy/dx = 2x + y, y(0) = 1, h = 0.5. Estimate y(1).',[['slope at (0, 1): 1 → y(0.5) ≈ 1 + 0.5(1) = 1.5',''],['slope at (0.5, 1.5): 2.5 → y(1) ≈ 1.5 + 0.5(2.5) = 2.75','']])],
 mistake:{bad:'use the slope at the new point to make the step',good:'use the slope at the current point',why:'Euler steps along the tangent at the point where you are.'},
 practice(){const a=nz(-2,3),b=nz(-2,2),y0=rand(-2,3),h=0.5;const F=(x,y)=>a*x+b*y;let x=0,y=y0;for(let i=0;i<2;i++){y+=h*F(x,y);x+=h;}
  return num(`dy/dx = ${a}x ${b<0?'−':'+'} ${Math.abs(b)}y, y(0) = ${y0}. Use Euler’s method with two steps of h = 0.5 to estimate y(1).`,[['y(1) ≈',y,0.011]],'y_new = y + h·slope at the current point.',[[`y(0.5) ≈ ${y0} + 0.5·(${F(0,y0)}) = ${nf(y0+0.5*F(0,y0))}`,''],[`y(1) ≈ ${nf(y)}`,'']]);},
 check:[q('Euler’s method uses the slope at…',['the next point','the current point','the midpoint','the endpoint'],1,''),q('Halving h usually makes the estimate…',['worse','better','identical','negative'],1,''),q('If solutions are concave up, Euler gives an…',['overestimate','underestimate','exact answer','undefined'],1,'')]};

L['CA-7-5']={goal:'I can solve separable differential equations and find particular solutions from initial conditions.',
 life:{title:'Solving exactly',html:'Slope fields and Euler’s method approximate. For separable equations, a few algebra moves and two integrals give the exact formula for the solution.'},
 see:[{title:'Separate, integrate, solve',hint:'Step through each example.',mount:mSep}],
 vocab:[['Separable','dy/dx = g(x)·h(y): can be written (1/h(y)) dy = g(x) dx.'],['Steps','Separate → integrate both sides (+C on one side) → use the initial condition → solve for y.'],['Find C early','Substitute the initial condition right after integrating — it is easier before solving for y.'],['Domain','State where the solution is valid when roots or logs appear.']],
 examples:[ex('Example','dy/dx = 6x²/y, y(0) = 3',[['y dy = 6x² dx',''],['y²/2 = 2x³ + C; at (0, 3): C = 9/2',''],['y = √(4x³ + 9)','Positive root because y(0) = 3 > 0.']])],
 mistake:{bad:'dy/dx = x + y → dy/y = x dx',good:'x + y does not factor into g(x)h(y)',why:'Only products (or quotients) of an x-part and a y-part can be separated.'},
 practice(){const k=nz(-3,3),y0=rand(1,6),x=pick([1,2]);const v=y0*Math.exp(k*x*x/2);
  return num(`Solve dy/dx = ${k}xy with y(0) = ${y0}. Find y(${x}) (3 decimals).`,[[`y(${x}) ≈`,+v.toFixed(3),Math.max(0.006,v*1e-4)]],'Separate: dy/y = kx dx.',[[`ln|y| = ${k}x²/2 + C → y = ${y0}e^(${K.pf(k/2)}x²)`,''],[`y(${x}) ≈ ${v.toFixed(3)}`,'']]);},
 check:[q('Which is separable?',['dy/dx = x + y','dy/dx = xy²','dy/dx = sin(x + y)','dy/dx = x − y'],1,''),q('After separating, you…',['differentiate','integrate both sides','multiply by C','graph'],1,''),q('∫ dy/y =',['ln|y| + C','y²/2 + C','1/y² + C','y + C'],0,'')]};

L['CA-7-6']={goal:'I can model exponential growth and decay with dy/dt = ky and solve for k, half-life, and doubling time.',
 life:{title:'Carbon dating',html:'Carbon-14 decays at a rate proportional to the amount present, with a half-life of about 5730 years. Measuring what is left in a bone tells its age — a direct application of y = y₀e^(kt).'},
 see:[{title:'Growth and decay',hint:'Move k across 0 and change y₀.',mount:mExp}],
 vocab:[['Model','dy/dt = ky ⇔ y = y₀e^(kt).'],['k > 0 / k < 0','Growth / decay.'],['Half-life','t½ = ln 2 / |k|.'],['Doubling time','ln 2 / k.'],['Finding k','Use two data points: k = ln(y₁/y₀)/t₁.']],
 examples:[ex('Example','Bacteria: 200 at t = 0, 600 at t = 4 h. When 2000?',[['600 = 200e^(4k) → k = ln 3 / 4',''],['2000 = 200e^(kt) → t = ln 10 / k = 4 ln 10 / ln 3 ≈ 8.38 h','']])],
 mistake:{bad:'half-life: y₀/2 = y₀e^(k·2)',good:'y₀/2 = y₀e^(kt), solve for t',why:'Half-life is the unknown time; k comes from the data.'},
 practice(){const y0=rand(2,9)*100,f=pick([2,3,4]),t1=rand(2,6);const k=Math.log(f)/t1;const T=pick(['k','dbl']);
  if(T==='k')return num(`A quantity grows from ${y0} to ${f*y0} in ${t1} hours (dy/dt = ky). Find k (4 decimals).`,[['k ≈',+k.toFixed(4),0.0006]],'k = ln(y₁/y₀)/t.',[[`k = ln ${f}/${t1} ≈ ${k.toFixed(4)}`,'']]);
  return num(`dy/dt = ${k.toFixed(4)}y. Find the doubling time (2 decimals).`,[['doubling time ≈',+(Math.log(2)/k).toFixed(2),0.011]],'ln 2 / k.',[[`ln 2 / ${k.toFixed(4)} ≈ ${(Math.log(2)/k).toFixed(2)}`,'']]);},
 check:[q('The solution of dy/dt = ky is…',['y = kt','y = y₀e^(kt)','y = y₀ + kt','y = ke^t'],1,''),q('Half-life t½ =',['ln 2 / |k|','2/k','k ln 2','e^k'],0,''),q('k < 0 means…',['growth','decay','constant','oscillation'],1,'')]};

L['CA-7-7']={goal:'I can analyze logistic models dP/dt = kP(1 − P/M): carrying capacity, fastest growth, and long-run behavior (BC).',
 life:{title:'A pond full of fish',html:'Fish in a pond grow quickly at first, but food and space are limited. Growth slows as the population nears the carrying capacity M. The S-shaped logistic curve describes epidemics, product adoption, and ecology.'},
 see:[{title:'Logistic growth',hint:'Change P(0) — above and below 75 and 150 — and the growth rate k.',mount:mLog}],
 vocab:[['Logistic DE','dP/dt = kP(1 − P/M).'],['Carrying capacity','M: lim_{t→∞} P(t) = M (for P(0) > 0).'],['Fastest growth','When P = M/2 (inflection point of the S-curve).'],['Equilibria','P = 0 (unstable) and P = M (stable).'],['Solution','P = M/(1 + Ae^(−kt)), A = (M − P₀)/P₀.']],
 examples:[ex('Example','dP/dt = 0.4P(1 − P/500), P(0) = 50.',[['M = 500, so lim P = 500',''],['fastest growth when P = 250',''],['max rate = 0.4(250)(1/2) = 50 per unit time','']])],
 mistake:{bad:'the population grows fastest at P = M',good:'at P = M/2',why:'At P = M the factor (1 − P/M) is 0, so growth stops.'},
 practice(){const M=rand(2,12)*100,k=rand(1,9)/10;const T=pick(['lim','half','rate']);
  if(T==='lim')return num(`dP/dt = ${k}P(1 − P/${M}), P(0) = ${M/10}. Find lim<sub>t→∞</sub> P(t).`,[['limit =',M]],'Carrying capacity.',[[`M = ${M}`,'']]);
  if(T==='half')return num(`dP/dt = ${k}P(1 − P/${M}). At what population is P growing fastest?`,[['P =',M/2]],'M/2.',[[`${M}/2 = ${M/2}`,'']]);
  return num(`dP/dt = ${k}P(1 − P/${M}). Find the maximum rate of growth dP/dt.`,[['max rate =',k*M/4,0.011]],'Substitute P = M/2.',[[`${k}(${M/2})(1/2) = ${nf(k*M/4)}`,'']]);},
 check:[q('In dP/dt = 0.3P(1 − P/800), M =',['0.3','800','400','240'],1,''),q('A logistic curve is concave up when…',['P < M/2','P > M/2','P = M','always'],0,''),q('If P(0) > M, P(t)…',['increases to ∞','decreases toward M','stays constant','goes to 0'],1,'')]};

TOOLS['CA-7']={title:'Slope field explorer',hint:'Choose a differential equation and drag the starting point to draw a particular solution.',mount:mSlope};
})();
