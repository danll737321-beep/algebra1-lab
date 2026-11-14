/* Calculus · Unit 2 · Differentiation: definition and basic rules */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;
const line=(G,m,x0,y0,col,w=2.5,dash='')=>curve(G,x=>y0+m*(x-x0),col,w,dash);

/* secant → tangent */
const SF=[{t:'f(x) = x²/2',f:x=>x*x/2,g:{x0:-2,x1:5,y0:-1,y1:10,u:56,uy:34}},{t:'f(x) = √x',f:x=>x<0?NaN:Math.sqrt(x),g:{x0:-1,x1:7,y0:-1,y1:3.5,u:50,uy:70}},{t:'f(x) = sin x',f:Math.sin,g:{x0:-1,x1:6,y0:-2,y1:2,u:56,uy:60}}];
function mSecant(el){K.pickSlide(el,SF,[{k:'a',l:'a',min:0.5,max:4,step:.1,v:1.5},{k:'h',l:'h',min:0.01,max:2.5,step:.01,v:2}],(V,F)=>{const G=grid(Object.assign({lab:1,laby:1},F.g));const f=F.f,a=V.a,h=V.h;
  const ms=(f(a+h)-f(a))/h,mt=C.d1(f,a);let s=curve(G,f,'#2563eb',3)+line(G,mt,a,f(a),'#94a3b8',2,'5 4')+line(G,ms,a,f(a),'#e11d48',2.5)+gdot(G,a,f(a),'#1f2937',7,'(a, f(a))')+gdot(G,a+h,f(a+h),'#e11d48',7,'(a + h, f(a + h))');
  $('.sc-g',el).innerHTML=G.svg(s);$('.sc-r',el).innerHTML=`Secant slope = [f(a + h) − f(a)]/h = <b style="color:#e11d48">${K.r3(ms)}</b> · tangent slope f′(${nf(a)}) ≈ <b>${K.r3(mt)}</b><br>Shrink h: the red secant swings into the dashed tangent line. The <b>average</b> rate becomes the <b>instantaneous</b> rate.`;},`<div class="sc-g"></div><div class="readout sc-r"></div>`);}

const DQ=[{t:'x² at a = 3',f:x=>x*x,a:3,d:6},{t:'x³ at a = 1',f:x=>x**3,a:1,d:3},{t:'1/x at a = 2',f:x=>1/x,a:2,d:-0.25},{t:'√x at a = 4',f:Math.sqrt,a:4,d:0.25}];
function mDQ(el){chooser(el,DQ.map(F=>({t:F.t,html:()=>{const hs=[1,0.1,0.01,0.001,-0.001,-0.01,-0.1];
  return C.table(['h','[f(a + h) − f(a)] / h'],hs.map(h=>[h,((F.f(F.a+h)-F.f(F.a))/h).toFixed(6)]))+`<div class="readout">As h → 0 from either side, the difference quotient approaches <b>${K.pf(F.d)}</b>. So f′(${F.a}) = ${K.pf(F.d)}.</div>`;}})));}

const TB=[[0,3],[2,7],[5,12],[9,14],[12,13]];
function mEst(el){sliders(el,[{k:'i',l:'interval starting at row',min:0,max:3,step:1,v:1}],V=>{const [x1,y1]=TB[V.i],[x2,y2]=TB[V.i+1];const G=grid({x0:-1,x1:13,y0:-1,y1:16,u:32,uy:20,lab:2,laby:2,xl:'t (min)'});
  let d='';TB.forEach((p,j)=>d+=(j?' L':'M')+G.X(p[0])+' '+G.Y(p[1]));let s=`<path d="${d}" fill="none" stroke="#93c5fd" stroke-width="2"/>`+TB.map(p=>gdot(G,p[0],p[1],'#2563eb',6)).join('')+`<line x1="${G.X(x1)}" y1="${G.Y(y1)}" x2="${G.X(x2)}" y2="${G.Y(y2)}" stroke="#e11d48" stroke-width="4"/>`;
  const m=(y2-y1)/(x2-x1);$('.es-g',el).innerHTML=G.svg(s);$('.es-r',el).innerHTML=C.table(['t (min)',...TB.map(p=>p[0])],[['T(t) °C',...TB.map(p=>p[1])]])+`Estimate T′ between t = ${x1} and t = ${x2}: (${y2} − ${y1})/(${x2} − ${x1}) = <b>${K.pf(m)} °C per min</b>.<br>Use the two data points that <b>surround</b> the time you care about; the units are output units per input unit.`;},`<div class="es-g"></div><div class="readout es-r"></div>`).run();}

const DF=[{t:'|x − 1|',f:x=>Math.abs(x-1),why:'Zooming in keeps a sharp <b>corner</b>: left slope −1, right slope +1. Not differentiable at 1 (but continuous).'},
 {t:'∛(x − 1)',f:x=>Math.cbrt(x-1),why:'Zooming in shows a <b>vertical tangent</b>: the slope blows up. Not differentiable at 1.'},
 {t:'x² − x + 1',f:x=>x*x-x+1,why:'Zooming in, the graph looks like a <b>straight line</b> (local linearity). Differentiable at 1, slope 1.'},
 {t:'jump',f:x=>x<1?x:x+1,why:'A function that is not continuous at 1 cannot be differentiable there.'}];
function mZoom(el){K.pickSlide(el,DF,[{k:'z',l:'zoom ×',min:1,max:50,step:1,v:1}],(V,F)=>{const w=2/V.z,cy=F.f(1)||1;const G=grid({x0:1-w,x1:1+w,y0:cy-w,y1:cy+w,u:180/w,lab:100,laby:100});
  let s=curve(G,x=>F.t==='jump'&&Math.abs(x-1)<w/200?NaN:F.f(x),'#2563eb',3)+gdot(G,1,F.f(1),'#e11d48',6);$('.zm-g',el).innerHTML=G.svg(s);$('.zm-r',el).innerHTML=`Window width ${K.r3(2*w)} around x = 1.<br>${F.why}`;},`<div class="zm-g"></div><div class="readout zm-r"></div>`);}

function mPower(el){sliders(el,[{k:'n',l:'n',min:-2,max:4,step:1,v:3},{k:'a',l:'x',min:0.3,max:2,step:.05,v:1}],V=>{const n=V.n,f=x=>x**n,d=x=>n*x**(n-1);const G=grid({x0:-0.2,x1:2.6,y0:-3,y1:8,u:150,uy:26,lab:1,laby:2});
  let s=curve(G,x=>x<=0.05&&n<0?NaN:f(x),'#2563eb',3)+curve(G,x=>x<=0.05&&n<1?NaN:d(x),'#e11d48',2.5,'6 4')+line(G,d(V.a),V.a,f(V.a),'#94a3b8',2)+gdot(G,V.a,f(V.a),'#2563eb',7)+gdot(G,V.a,d(V.a),'#e11d48',6);
  $('.pw-g',el).innerHTML=G.svg(s);$('.pw-r',el).innerHTML=`f(x) = x${A2.sup(n)} → f′(x) = ${n}x${A2.sup(n-1)} <span class="mute">(red dashed)</span><br>At x = ${nf(V.a)}: tangent slope ≈ <b>${K.r3(C.d1(f,V.a))}</b>, power rule gives ${n}·${nf(V.a)}${A2.sup(n-1)} = <b>${K.r3(d(V.a))}</b>. They match.`;},`<div class="pw-g"></div><div class="readout pw-r"></div>`).run();}

const TF=[{t:'sin x',f:Math.sin,d:Math.cos,dn:'cos x',g:{x0:-1,x1:7,y0:-2,y1:2}},{t:'cos x',f:Math.cos,d:x=>-Math.sin(x),dn:'−sin x',g:{x0:-1,x1:7,y0:-2,y1:2}},{t:'eˣ',f:Math.exp,d:Math.exp,dn:'eˣ',g:{x0:-3,x1:2.5,y0:-1,y1:8}},{t:'ln x',f:x=>x>0?Math.log(x):NaN,d:x=>x>0?1/x:NaN,dn:'1/x',g:{x0:-0.5,x1:6,y0:-3,y1:4}}];
function mTrace(el){K.pickSlide(el,TF,F=>[{k:'x',l:'x',min:Math.max(F.g.x0,0.15),max:F.g.x1-0.3,step:.05,v:1}],(V,F)=>{const G=grid(Object.assign({u:56,uy:48,lab:1,laby:1},F.g));const m=C.d1(F.f,V.x);
  let tr='';for(let x=Math.max(F.g.x0,0.1);x<=V.x;x+=0.04)tr+=gdot(G,x,F.d(x),'#e11d48',1.6);
  let s=curve(G,F.f,'#2563eb',3)+line(G,m,V.x,F.f(V.x),'#94a3b8',2)+tr+gdot(G,V.x,F.f(V.x),'#2563eb',7)+gdot(G,V.x,m,'#e11d48',7);
  $('.tr-g',el).innerHTML=G.svg(s);$('.tr-r',el).innerHTML=`Slope of ${F.t} at x = ${nf(V.x)} ≈ <b>${K.r3(m)}</b>. The red dots record the slope at every x — they trace <b>${F.dn}</b>.`;},`<div class="tr-g"></div><div class="readout tr-r"></div>`);}

function mProd(el){sliders(el,[{k:'x',l:'x',min:1,max:3,step:.05,v:2},{k:'dx',l:'Δx',min:0.02,max:0.8,step:.02,v:0.5}],V=>{const f=x=>x+1,g=x=>x*x/2+1;const u=f(V.x),v=g(V.x),du=f(V.x+V.dx)-u,dv=g(V.x+V.dx)-v,S=34;
  const s=`<svg viewBox="0 0 ${(u+du)*S+60} ${(v+dv)*S+40}" class="fig" style="max-width:420px"><rect x="20" y="20" width="${u*S}" height="${v*S}" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><rect x="${20+u*S}" y="20" width="${du*S}" height="${v*S}" fill="#dcfce7" stroke="#15803d" stroke-width="2"/><rect x="20" y="${20+v*S}" width="${u*S}" height="${dv*S}" fill="#fef3c7" stroke="#b45309" stroke-width="2"/><rect x="${20+u*S}" y="${20+v*S}" width="${du*S}" height="${dv*S}" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/><text x="${20+u*S/2}" y="${20+v*S/2}" text-anchor="middle" font-weight="800">f·g</text></svg>`;
  $('.pr-g',el).innerHTML=s;$('.pr-r',el).innerHTML=`f = x + 1 (width), g = x²/2 + 1 (height). Growing x by Δx adds <span style="color:#15803d"><b>g·Δf</b> = ${K.r3(v*du)}</span> + <span style="color:#b45309"><b>f·Δg</b> = ${K.r3(u*dv)}</span> + <span style="color:#b91c1c"><b>Δf·Δg</b> = ${K.r3(du*dv)}</span>.<br>Divide by Δx and let Δx → 0: the tiny red corner vanishes, leaving <b>(fg)′ = f′g + fg′</b>.`;},`<div class="pr-g"></div><div class="readout pr-r"></div>`).run();}

const QF=[{t:'tan x',f:Math.tan,d:x=>1/Math.cos(x)**2,dn:'sec² x',s:['tan x = sin x / cos x','(cos x · cos x − sin x · (−sin x)) / cos² x','= (cos² x + sin² x)/cos² x = 1/cos² x = sec² x']},
 {t:'sec x',f:x=>1/Math.cos(x),d:x=>Math.tan(x)/Math.cos(x),dn:'sec x tan x',s:['sec x = 1 / cos x','(0 · cos x − 1 · (−sin x)) / cos² x','= sin x / cos² x = sec x tan x']},
 {t:'(x² + 1)/(x − 3)',f:x=>(x*x+1)/(x-3),d:x=>(x*x-6*x-1)/(x-3)**2,dn:'(x² − 6x − 1)/(x − 3)²',s:['low = x − 3, high = x² + 1','((x − 3)(2x) − (x² + 1)(1)) / (x − 3)²','= (x² − 6x − 1)/(x − 3)²']}];
function mQuot(el){K.pickSlide(el,QF,[{k:'x',l:'check at x',min:0.1,max:1.2,step:.05,v:0.6}],(V,F)=>{
  $('.qt-r',el).innerHTML=`<ol>${F.s.map(x=>`<li class="math">${x}</li>`).join('')}</ol>Formula at x = ${nf(V.x)}: <b>${K.r3(F.d(V.x))}</b> · numerical slope: <b>${K.r3(C.d1(F.f,V.x))}</b> ✓<br><span class="mute">Quotient rule: (f/g)′ = (g·f′ − f·g′)/g² — “low d-high minus high d-low, over low squared.”</span>`;},`<div class="readout qt-r"></div>`);}

/* ---------- lessons ---------- */
L['CA-2-1']={goal:'I can compute average rate of change and explain how it approaches the instantaneous rate of change.',
 life:{title:'Speed right now',html:'A trip of 120 miles in 2 hours averages 60 mph, but the speedometer at 1:00 p.m. might read 72 mph. Calculus explains the speedometer: average over shorter and shorter intervals.'},
 see:[{title:'Secant becomes tangent',hint:'Choose a curve, then shrink h.',mount:mSecant}],
 vocab:[['Average rate of change','[f(b) − f(a)]/(b − a): slope of the secant line on [a, b].'],['Instantaneous rate of change','The limit of average rates as the interval shrinks: slope of the tangent line.'],['Secant line','A line through two points of the graph.'],['Tangent line','The line that touches the curve at a point and matches its direction there.']],
 examples:[ex('Example','s(t) = 16t² (ft). Average velocity on [1, 1.1]?',[['s(1.1) = 19.36, s(1) = 16',''],['(19.36 − 16)/0.1 = 33.6 ft/s','Shorter intervals approach 32 ft/s, the instantaneous velocity at t = 1.']])],
 mistake:{bad:'average rate on [1, 3] = f(3) − f(1)',good:'[f(3) − f(1)]/(3 − 1)',why:'A rate divides change in output by change in input.'},
 practice(){const a=nz(-3,3),b=rand(-4,4),c=rand(-5,5),x1=rand(-3,2),x2=x1+rand(1,3);const f=x=>a*x*x+b*x+c;
  return num(`f(x) = ${ps([a,b,c])}. Find the average rate of change on [${fmtNeg(x1)}, ${fmtNeg(x2)}].`,[['average rate =',(f(x2)-f(x1))/(x2-x1)]],'Slope of the secant: change in f over change in x.',[[`f(${fmtNeg(x2)}) = ${fmtNeg(f(x2))}, f(${fmtNeg(x1)}) = ${fmtNeg(f(x1))}`,''],[`(${fmtNeg(f(x2))} − ${P(f(x1))})/(${x2-x1}) = ${fmtNeg((f(x2)-f(x1))/(x2-x1))}`,'']]);},
 check:[q('The average rate of change on [a, b] is the slope of the…',['tangent line','secant line','normal line','x-axis'],1,''),q('Instantaneous rate = limit of average rates as…',['the interval grows','the interval shrinks to 0','x → ∞','f → 0'],1,''),q('Units of a rate for distance (m) vs time (s):',['m','s','m/s','m·s'],2,'')]};

L['CA-2-2']={goal:'I can find a derivative at a point and a derivative function using the limit definition.',
 life:{title:'One formula for every slope',html:'Instead of computing one tangent slope at a time, the limit definition gives a <b>formula</b> f′(x) that produces the slope at every x — the speedometer for the whole trip.'},
 see:[{title:'Shrink h in the difference quotient',hint:'Pick a function. Read the table as h → 0 from both sides.',mount:mDQ}],
 vocab:[['Derivative at a','f′(a) = lim_{h→0} [f(a + h) − f(a)]/h (if the limit exists).'],['Alternate form','f′(a) = lim_{x→a} [f(x) − f(a)]/(x − a).'],['Derivative function','f′(x) = lim_{h→0} [f(x + h) − f(x)]/h.'],['Notation','f′(x), y′, dy/dx, d/dx[f(x)].']],
 examples:[ex('Example','f(x) = x². Find f′(x) from the definition.',[['[(x + h)² − x²]/h',''],['= (2xh + h²)/h = 2x + h','Expand and cancel h.'],['→ 2x as h → 0','So f′(x) = 2x.']])],
 mistake:{bad:'f(x + h) = f(x) + h',good:'substitute x + h for x everywhere',why:'For f(x) = x², f(x + h) = (x + h)², not x² + h.'},
 practice(){if(Math.random()<0.5){const a=nz(-4,4),b=rand(-6,6),c=rand(-5,5),x=rand(-3,3);
   return num(`Use the limit definition: f(x) = ${ps([a,b,c])}. Find f′(${fmtNeg(x)}).`,[[`f′(${fmtNeg(x)}) =`,2*a*x+b]],'Expand f(x + h) − f(x), divide by h, then let h → 0.',[[`[f(x + h) − f(x)]/h = ${2*a}x + ${a}h ${b<0?'−':'+'} ${Math.abs(b)}`,''],[`h → 0: f′(x) = ${ps([2*a,b])}`,''],[`f′(${fmtNeg(x)}) = ${fmtNeg(2*a*x+b)}`,'']]);}
  const T=pick([{l:'lim_{h→0} [(3 + h)² − 9]/h',a:'f′(3) for f(x) = x²'},{l:'lim_{h→0} [√(4 + h) − 2]/h',a:'f′(4) for f(x) = √x'},{l:'lim_{h→0} [sin(π + h) − sin π]/h',a:'f′(π) for f(x) = sin x'},{l:'lim_{x→2} (x³ − 8)/(x − 2)',a:'f′(2) for f(x) = x³'}]);
  return mc(`The expression ${T.l} represents…`,T.a,['f′(3) for f(x) = x²','f′(4) for f(x) = √x','f′(π) for f(x) = sin x','f′(2) for f(x) = x³'],'Match f and the point a in [f(a + h) − f(a)]/h.');},
 check:[q('f′(a) = lim_{h→0} …',['[f(a + h) − f(a)]/h','f(a + h)/h','[f(a) − h]/h','f(a)/a'],0,''),q('For f(x) = x², the difference quotient simplifies to…',['2x','2x + h','x + h','h'],1,''),q('dy/dx means…',['dy divided by dx as numbers','the derivative of y with respect to x','y times x','the average rate'],1,'')]};

L['CA-2-3']={goal:'I can estimate a derivative from a graph or a table and interpret it with units.',
 life:{title:'Real data has no formula',html:'A thermometer logs T every few minutes. Nobody gives you T(t) as a formula — but you can still estimate how fast the temperature is changing by using nearby data points.'},
 see:[{title:'Estimate from data',hint:'Slide to choose a pair of neighboring data points.',mount:mEst}],
 vocab:[['Estimate from a table','f′(c) ≈ [f(b) − f(a)]/(b − a) using data points a < c < b close to c.'],['Estimate from a graph','Draw (or imagine) the tangent line; read rise/run.'],['Units','Units of f′ = (units of f) per (unit of x).'],['Sign of f′','f′ > 0: rising; f′ < 0: falling; f′ = 0: flat tangent.']],
 examples:[ex('Example','t: 0, 4, 10 (h); V(t): 50, 62, 74 (L). Estimate V′(7).',[['use t = 4 and t = 10','They surround 7.'],['(74 − 62)/(10 − 4) = 2','The volume is increasing about 2 liters per hour.']])],
 mistake:{bad:'V′(7) ≈ 74 − 62 = 12',good:'≈ 12/6 = 2 L/h',why:'Divide by the change in time; a derivative is a rate.'},
 practice(){const t=[0,rand(2,4),rand(5,7),rand(9,12)];const v=[rand(10,30)];for(let i=1;i<4;i++)v.push(v[i-1]+rand(-8,14));const i=rand(0,2),c=(t[i]+t[i+1])/2;
  return num(`t (min): ${t.join(', ')} · H(t) (cm): ${v.join(', ')}. Estimate H′(${nf(c)}).`,[[`H′(${nf(c)}) ≈`,(v[i+1]-v[i])/(t[i+1]-t[i]),0.011]],'Use the two data points that surround the time.',[[`(${v[i+1]} − ${v[i]})/(${t[i+1]} − ${t[i]}) = ${K.pf((v[i+1]-v[i])/(t[i+1]-t[i]))} cm per min`,'']]);},
 check:[q('W in kg, t in days. Units of W′(t):',['kg','days','kg per day','days per kg'],2,''),q('A horizontal tangent means f′ = …',['1','0','undefined','∞'],1,''),q('To estimate f′(5) from data at 3, 6, 9, use…',['3 and 9','3 and 6','6 and 9','only 6'],1,'Closest points around 5.')]};

L['CA-2-4']={goal:'I can explain why differentiability implies continuity, and recognize corners, cusps, vertical tangents, and discontinuities where f′ fails.',
 life:{title:'Smooth vs. sharp',html:'A roller coaster designer needs the track to be differentiable: a sharp corner means an instant change of direction — a jolt. Zoom in on a smooth curve and it looks straight; a corner stays a corner.'},
 see:[{title:'Zoom in at x = 1',hint:'Pick a graph and zoom ×50. Does it straighten out?',mount:mZoom}],
 vocab:[['Differentiable at a','f′(a) exists: the graph is locally linear at a.'],['Differentiable ⇒ continuous','If f′(a) exists, f is continuous at a. (The converse is false.)'],['Where f′ fails','Corner, cusp, vertical tangent, or any discontinuity.'],['One-sided derivatives','For a piecewise f, compare the slopes of the two pieces at the break (and check continuity first).']],
 examples:[ex('Example','f(x) = x² for x ≤ 1, 2x − 1 for x > 1. Differentiable at 1?',[['continuous: 1 = 2 − 1 ✓',''],['left slope 2x → 2, right slope 2 ✓','Slopes match.'],['differentiable at 1','']])],
 mistake:{bad:'|x| is continuous at 0, so it is differentiable at 0',good:'continuous does not imply differentiable',why:'|x| has a corner at 0: left slope −1, right slope 1.'},
 practice(){const T=pick([{f:'|x + 2| at x = −2',a:'continuous, not differentiable'},{f:'x^(1/3) at x = 0',a:'continuous, not differentiable'},{f:'x² + 3x at x = 1',a:'differentiable'},{f:'1/x at x = 0',a:'not continuous'},{f:'x^(2/3) at x = 0',a:'continuous, not differentiable'},{f:'sin x at x = 0',a:'differentiable'},{f:'floor(x) at x = 2',a:'not continuous'}]);
  return mc(`Describe f(x) = ${T.f}.`,T.a,['differentiable','continuous, not differentiable','not continuous'],'Check for a break first, then for a corner, cusp, or vertical tangent.');},
 check:[q('If f is differentiable at a, then f is…',['continuous at a','increasing at a','zero at a','undefined at a'],0,''),q('f(x) = |x − 3| at x = 3 has…',['a vertical tangent','a corner','a jump','a hole'],1,''),q('A vertical tangent means the slope is…',['0','1','undefined (infinite)','negative'],2,'')]};

L['CA-2-5']={goal:'I can use the power, constant multiple, and sum rules to differentiate polynomials and power functions, including negative and fractional exponents.',
 life:{title:'Shortcuts that save pages',html:'Using the limit definition for x⁷ takes a page of algebra. The power rule does it in one line: bring the exponent down and subtract one.'},
 see:[{title:'Power rule check',hint:'Choose n. The red dashed curve is n·xⁿ⁻¹; compare with the tangent slope.',mount:mPower}],
 vocab:[['Power rule','d/dx[xⁿ] = n·xⁿ⁻¹ for any real n.'],['Constant multiple','d/dx[k·f] = k·f′.'],['Sum/difference','d/dx[f ± g] = f′ ± g′.'],['Constant','d/dx[c] = 0.'],['Rewrite first','√x = x^(1/2), 1/x³ = x⁻³, before using the power rule.']],
 examples:[ex('Example','y = 4x³ − 5/x² + 6√x',[['y = 4x³ − 5x⁻² + 6x^(1/2)','Rewrite with exponents.'],['y′ = 12x² + 10x⁻³ + 3x^(−1/2)','Power rule on each term.'],['= 12x² + 10/x³ + 3/√x','']])],
 mistake:{bad:'d/dx[1/x²] = 1/(2x)',good:'= −2x⁻³ = −2/x³',why:'Rewrite as x⁻² first. The exponent decreases by one: −2 − 1 = −3.'},
 practice(){const T=pick(['poly','neg','root']);
  if(T==='poly'){const a=nz(-4,4),b=rand(-5,5),c=rand(-6,6),x=rand(-2,3);const d=3*a*x*x+2*b*x+c;return num(`f(x) = ${ps([a,b,c,rand(-9,9)])}. Find f′(${fmtNeg(x)}).`,[[`f′(${fmtNeg(x)}) =`,d]],'Power rule term by term; the constant disappears.',[[`f′(x) = ${ps([3*a,2*b,c])}`,''],[`f′(${fmtNeg(x)}) = ${fmtNeg(d)}`,'']]);}
  if(T==='neg'){const k=nz(-6,6),n=rand(1,3),x=pick([1,2,-1]);const d=-n*k*x**(-n-1);return num(`f(x) = ${k}/x${A2.sup(n)}. Find f′(${fmtNeg(x)}). (fraction or decimal)`,[[`f′(${fmtNeg(x)}) =`,d,0.011]],`Rewrite as ${k}x${A2.sup(-n)}.`,[[`f′(x) = ${-n*k}x${A2.sup(-n-1)}`,''],[`f′(${fmtNeg(x)}) = ${K.pf(d)}`,'']]);}
  const k=rand(1,8),x=pick([1,4,9,16]);return num(`f(x) = ${k}√x. Find f′(${x}). (fraction or decimal)`,[[`f′(${x}) =`,k/(2*Math.sqrt(x)),0.011]],'√x = x^(1/2), so its derivative is (1/2)x^(−1/2).',[[`f′(x) = ${k}/(2√x)`,''],[`f′(${x}) = ${k}/${2*Math.sqrt(x)} = ${K.pf(k/(2*Math.sqrt(x)))}`,'']]);},
 check:[q('d/dx[x⁵] =',['5x⁴','x⁴','5x⁵','4x⁵'],0,''),q('d/dx[7] =',['7','1','0','7x'],2,''),q('d/dx[x^(1/2)] =',['(1/2)x^(1/2)','(1/2)x^(−1/2)','2x^(1/2)','x^(−1/2)'],1,'')]};

L['CA-2-6']={goal:'I can differentiate sin x, cos x, eˣ, and ln x and use them with the basic rules.',
 life:{title:'Nature’s favorite functions',html:'Tides follow sine waves; populations and money grow like eˣ. Their derivatives are beautifully simple — eˣ is even its own derivative, which is why it shows up everywhere.'},
 see:[{title:'Trace the slope',hint:'Pick a function and drag x. The red dots plot the slope — what familiar graph appears?',mount:mTrace}],
 vocab:[['d/dx[sin x]','cos x'],['d/dx[cos x]','−sin x'],['d/dx[eˣ]','eˣ'],['d/dx[ln x]','1/x (x > 0)'],['Radians','The sine and cosine rules require x in radians.']],
 examples:[ex('Example','y = 3 sin x − 2eˣ + 5 ln x. Find y′ at x = 1.',[['y′ = 3 cos x − 2eˣ + 5/x',''],['y′(1) = 3 cos 1 − 2e + 5 ≈ 1.65','']])],
 mistake:{bad:'d/dx[cos x] = sin x',good:'= −sin x',why:'Cosine starts at its maximum and falls: its slope is negative just after 0, matching −sin x.'},
 practice(){const a=nz(-5,5),b=nz(-5,5),T=pick(['sc','el']);
  if(T==='sc'){const x=pick([0,PI/2,PI]);const xs=x===0?'0':x===PI?'π':'π/2';const d=a*Math.cos(x)-b*Math.sin(x);return num(`f(x) = ${a} sin x ${b<0?'−':'+'} ${Math.abs(b)} cos x. Find f′(${xs}).`,[[`f′(${xs}) =`,Math.round(d)]],'d/dx sin = cos, d/dx cos = −sin.',[[`f′(x) = ${a} cos x ${b<0?'+':'−'} ${Math.abs(b)} sin x`,''],[`f′(${xs}) = ${Math.round(d)}`,'']]);}
  const x=pick([1,2,4]);const d=a+b/x;return num(`f(x) = ${a}x ${b<0?'−':'+'} ${Math.abs(b)} ln x. Find f′(${x}). (fraction or decimal)`,[[`f′(${x}) =`,d,0.011]],'d/dx[ln x] = 1/x.',[[`f′(x) = ${a} ${b<0?'−':'+'} ${Math.abs(b)}/x`,''],[`f′(${x}) = ${K.pf(d)}`,'']]);},
 check:[q('d/dx[eˣ] =',['xeˣ⁻¹','eˣ','e','ln x'],1,''),q('d/dx[sin x] at x = 0 =',['0','1','−1','π'],1,'cos 0 = 1'),q('d/dx[ln x] =',['1/x','ln x / x','x','eˣ'],0,'')]};

L['CA-2-7']={goal:'I can use the product rule to differentiate a product of two functions.',
 life:{title:'Revenue = price × quantity',html:'If price rises while the number sold falls, how fast does revenue change? Both factors are changing, so the change in the product needs a rule that counts both effects: the <b>product rule</b>.'},
 see:[{title:'Grow a rectangle',hint:'The rectangle’s area is f·g. Grow x by Δx and see which strips appear.',mount:mProd}],
 vocab:[['Product rule','(f·g)′ = f′·g + f·g′.'],['Not the product of derivatives','(fg)′ ≠ f′·g′ in general.'],['Three factors','(fgh)′ = f′gh + fg′h + fgh′.']],
 examples:[ex('Example','y = x² sin x',[['f = x², f′ = 2x; g = sin x, g′ = cos x',''],['y′ = 2x sin x + x² cos x','']]),ex('From values','f(2) = 3, f′(2) = −1, g(2) = 4, g′(2) = 5. Find (fg)′(2).',[['(−1)(4) + (3)(5) = 11','']])],
 mistake:{bad:'d/dx[x eˣ] = 1 · eˣ = eˣ',good:'= eˣ + x eˣ',why:'Both factors change; you need f′g + fg′.'},
 practice(){const f=rand(-5,5),fp=rand(-5,5),g=rand(-5,5),gp=rand(-5,5),x=rand(1,5);
  if(Math.random()<0.6)return num(`f(${x}) = ${fmtNeg(f)}, f′(${x}) = ${fmtNeg(fp)}, g(${x}) = ${fmtNeg(g)}, g′(${x}) = ${fmtNeg(gp)}. Let h = f·g. Find h′(${x}).`,[[`h′(${x}) =`,fp*g+f*gp]],'h′ = f′g + fg′.',[[`(${fmtNeg(fp)})(${fmtNeg(g)}) + (${fmtNeg(f)})(${fmtNeg(gp)}) = ${fmtNeg(fp*g+f*gp)}`,'']]);
  const a=nz(-4,4),b=rand(-5,5),xx=rand(-2,2);const d=(2*a*xx+b)*Math.exp(xx)+(a*xx*xx+b*xx)*Math.exp(xx);return num(`y = (${ps([a,b,0])})eˣ. Find y′(${fmtNeg(xx)}) to 3 decimals.`,[[`y′(${fmtNeg(xx)}) ≈`,+d.toFixed(3),0.006]],'Product rule: (polynomial)′·eˣ + (polynomial)·eˣ.',[[`y′ = (${ps([2*a,b])})eˣ + (${ps([a,b,0])})eˣ = (${ps([a,2*a+b,b])})eˣ`,''],[`≈ ${d.toFixed(3)}`,'']]);},
 check:[q('(fg)′ =',['f′g′','f′g + fg′','f′g − fg′','f′/g′'],1,''),q('d/dx[x ln x] =',['1/x','ln x + 1','x/x','ln x'],1,''),q('d/dx[x²eˣ] =',['2xeˣ','2xeˣ + x²eˣ','x²eˣ','2x + eˣ'],1,'')]};

L['CA-2-8']={goal:'I can use the quotient rule, and differentiate tan x, cot x, sec x, and csc x.',
 life:{title:'Average cost',html:'Cost per item = total cost ÷ number made. As production grows, how fast does the average cost change? That is the derivative of a quotient.'},
 see:[{title:'Quotient rule at work',hint:'Pick a function. Read the derivation, then compare the formula with the numerical slope.',mount:mQuot}],
 vocab:[['Quotient rule','(f/g)′ = (g·f′ − f·g′)/g².'],['d/dx[tan x]','sec² x'],['d/dx[cot x]','−csc² x'],['d/dx[sec x]','sec x tan x'],['d/dx[csc x]','−csc x cot x']],
 examples:[ex('Example','y = (3x − 1)/(x² + 2)',[['g·f′ = (x² + 2)(3)',''],['f·g′ = (3x − 1)(2x)',''],['y′ = (−3x² + 2x + 6)/(x² + 2)²','Expand: 3x² + 6 − 6x² + 2x.']])],
 mistake:{bad:'(f/g)′ = f′/g′',good:'(gf′ − fg′)/g²',why:'Derivatives do not split over division. The order in the numerator matters because of the minus sign.'},
 practice(){const f=rand(-6,6),fp=rand(-5,5),g=nz(-4,4),gp=rand(-5,5),x=rand(1,5);
  if(Math.random()<0.6)return num(`f(${x}) = ${fmtNeg(f)}, f′(${x}) = ${fmtNeg(fp)}, g(${x}) = ${fmtNeg(g)}, g′(${x}) = ${fmtNeg(gp)}. Find (f/g)′(${x}). (fraction or decimal)`,[['(f/g)′ =',(g*fp-f*gp)/(g*g),0.011]],'(g·f′ − f·g′)/g²',[[`(${fmtNeg(g)}·${P(fp)} − ${P(f)}·${P(gp)})/${g*g} = ${frac(g*fp-f*gp,g*g)}`,'']]);
  const T=pick([['tan x','sec² x'],['cot x','−csc² x'],['sec x','sec x tan x'],['csc x','−csc x cot x']]);return mc(`d/dx[${T[0]}] =`,T[1],['sec² x','−csc² x','sec x tan x','−csc x cot x'],'The co-functions get the minus sign.');},
 check:[q('d/dx[tan x] =',['sec x','sec² x','cot x','−csc² x'],1,''),q('(f/g)′ has denominator…',['g','g²','f²','fg'],1,''),q('The quotient rule numerator is…',['f′g′','gf′ − fg′','fg′ − gf′','f′ + g′'],1,'')]};

TOOLS['CA-2']={title:'Secant → tangent',hint:'Choose a curve, pick a point a, and shrink h to watch the average rate become the derivative.',mount:mSecant};
})();
