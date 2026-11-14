/* Calculus · Unit 6 · Integration and accumulation of change */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;const {stepper}=KA;

function mFlow(el){sliders(el,[{k:'t',l:'t (min)',min:0,max:8,step:.05,v:3}],V=>{const r=t=>8+6*Math.sin(t/1.5),t=V.t;const G=grid({x0:0,x1:8.5,y0:0,y1:16,u:50,uy:16,lab:1,laby:4,xl:'t (min)'});
  const A=C.simpson(r,0,t);let s=C.region(G,r,()=>0,0,t,'rgba(37,99,235,.25)')+curve(G,r,'#2563eb',3)+vline(G,t,'#1f2937','4 4');
  $('.fl-g',el).innerHTML=G.svg(s);$('.fl-r',el).innerHTML=`Water flows in at r(t) = 8 + 6 sin(t/1.5) liters per minute.<br>Area under the rate graph from 0 to ${nf(t)} = <b>${K.r3(A)} liters</b> collected. <span class="mute">(height L/min × width min = L)</span><br>Area under a <b>rate</b> graph = total <b>amount</b> accumulated.`;},`<div class="fl-g"></div><div class="readout fl-r"></div>`).run();}

const RF=[{t:'x²/2 on [0, 4]',f:x=>x*x/2,a:0,b:4,ex:32/3,g:{x0:-0.5,x1:4.5,y0:-1,y1:9}},{t:'sin x on [0, π]',f:Math.sin,a:0,b:PI,ex:2,g:{x0:-0.3,x1:3.6,y0:-0.5,y1:1.5}},{t:'4 − x on [0, 6]',f:x=>4-x,a:0,b:6,ex:6,g:{x0:-0.5,x1:6.5,y0:-3,y1:5}}];
function mRiemann(el){let kind='L';K.pickSlide(el,RF,[{k:'n',l:'n rectangles',min:1,max:60,step:1,v:4}],(V,F)=>{const G=grid(Object.assign({u:90,uy:40,lab:1,laby:1},F.g));const R=C.riemann(G,F.f,F.a,F.b,V.n,kind);
  $$('[data-rk]',el).forEach(x=>x.classList.toggle('sel',x.dataset.rk===kind));$('.rm-g',el).innerHTML=G.svg(R.svg+curve(G,F.f,'#2563eb',3));$('.rm-r',el).innerHTML=`${{L:'Left',R:'Right',M:'Midpoint',T:'Trapezoid'}[kind]} sum with n = ${V.n}: <b>${K.r3(R.sum)}</b> · exact ∫ = <b>${K.r3(F.ex)}</b> · error ${K.r3(R.sum-F.ex)}<br><span class="mute">Below-axis rectangles (red) count as negative.</span>`;},`<div class="row rm-k">${['L','R','M','T'].map(k=>`<button data-rk="${k}" class="${k==='L'?'sel':''}">${{L:'Left',R:'Right',M:'Midpoint',T:'Trapezoid'}[k]}</button>`).join('')}</div><div class="rm-g"></div><div class="readout rm-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-rk]');if(!b)return;kind=b.dataset.rk;$$('[data-rk]',el).forEach(x=>x.classList.toggle('sel',x===b));const inp=$('input[type=range]',el);inp.dispatchEvent(new Event('input',{bubbles:true}));});}

function mSigma(el){sliders(el,[{k:'n',l:'n',min:2,max:200,step:1,v:6}],V=>{const n=V.n;let s=0;for(let i=1;i<=n;i++)s+=(2*i/n)**2*(2/n);
  $('.sg-r',el).innerHTML=`<div class="eqline math">Σ<sub>i=1</sub><sup>${n}</sup> (2i/${n})² · (2/${n}) = <b>${s.toFixed(6)}</b></div>Right Riemann sum for ∫<sub>0</sub><sup>2</sup> x² dx: Δx = 2/n, xᵢ = 0 + iΔx = 2i/n, height f(xᵢ) = (2i/n)².<br>As n → ∞ the sum → <b>8/3 ≈ 2.666667</b>. That limit <b>is</b> the definite integral: ∫<sub>a</sub><sup>b</sup> f(x) dx = lim<sub>n→∞</sub> Σ f(xᵢ)Δx.`;},`<div class="readout sg-r"></div>`).run();}

function mAccFn(el){sliders(el,[{k:'x',l:'x',min:0,max:7,step:.05,v:2}],V=>{const f=t=>2*Math.cos(t*0.9)+0.3,gF=x=>C.simpson(f,0,x,200);const x=V.x;
  const G=grid({x0:0,x1:7.3,y0:-2.5,y1:3,u:58,uy:36,lab:1,laby:1,xl:'t'});let s=C.signedArea(G,f,0,x)+curve(G,f,'#1f2937',3)+vline(G,x,'#9333ea','4 4');
  const H=grid({x0:0,x1:7.3,y0:-2,y1:3,u:58,uy:30,lab:1,laby:1,xl:'x'});let tr='';for(let u=0;u<=x;u+=0.05)tr+=gdot(H,u,gF(u),'#9333ea',1.8);
  $('.af-g',el).innerHTML=`<div class="mute" style="text-align:center">f(t)</div>`+G.svg(s)+`<div class="mute" style="text-align:center">g(x) = ∫₀ˣ f(t) dt</div>`+H.svg(tr+gdot(H,x,gF(x),'#9333ea',7));
  $('.af-r',el).innerHTML=`g(${nf(x)}) = <b>${K.r3(gF(x))}</b> (blue area adds, red subtracts) · g′(${nf(x)}) = f(${nf(x)}) = <b>${K.r3(f(x))}</b><br>g rises where f > 0, falls where f < 0, and peaks where f crosses from + to −.`;},`<div class="af-g"></div><div class="readout af-r"></div>`).run();}

function mFTC(el){sliders(el,[{k:'h',l:'h',min:0.02,max:1.2,step:.01,v:0.8}],V=>{const f=t=>1+t*t/4,x=2,h=V.h;const G=grid({x0:0,x1:4,y0:0,y1:4,u:100,uy:70,lab:1,laby:1,xl:'t'});
  const strip=C.simpson(f,x,x+h);let s=C.region(G,f,()=>0,0,x,'rgba(37,99,235,.18)')+C.region(G,f,()=>0,x,x+h,'rgba(225,29,72,.4)')+curve(G,f,'#1f2937',3);
  $('.ft-g',el).innerHTML=G.svg(s);$('.ft-r',el).innerHTML=`F(x) = ∫₀ˣ f(t) dt. Extending from x = 2 to 2 + h adds the red strip: F(2 + h) − F(2) = <b>${K.r3(strip)}</b>.<br>[F(2 + h) − F(2)]/h = <b>${K.r3(strip/h)}</b> → f(2) = <b>2</b> as h → 0. The strip is almost a rectangle of height f(2).<br><b>FTC:</b> d/dx ∫ₐˣ f(t) dt = f(x), and ∫ₐᵇ f(x) dx = F(b) − F(a) for any antiderivative F.`;},`<div class="ft-g"></div><div class="readout ft-r"></div>`).run();}

const PR=[{t:'Add intervals',h:'∫₀² f + ∫₂⁵ f = ∫₀⁵ f',d:(G,f)=>C.region(G,f,()=>0,0,2,'rgba(37,99,235,.3)')+C.region(G,f,()=>0,2,5,'rgba(5,150,105,.3)')},
 {t:'Reverse bounds',h:'∫₅⁰ f = −∫₀⁵ f',d:(G,f)=>C.region(G,f,()=>0,0,5,'rgba(225,29,72,.25)')},
 {t:'Zero width',h:'∫₃³ f = 0',d:(G,f)=>vline(G,3,'#e11d48','')},
 {t:'Constant multiple',h:'∫ 2f = 2∫ f',d:(G,f)=>C.region(G,x=>2*f(x),()=>0,0,5,'rgba(147,51,234,.2)')+C.region(G,f,()=>0,0,5,'rgba(37,99,235,.3)')+curve(G,x=>2*f(x),'#9333ea',2,'5 4')}];
function mProps(el){chooser(el,PR.map(P=>({t:P.t,html:()=>{const f=x=>1+0.5*Math.sin(x)+0.15*x;const G=grid({x0:-0.5,x1:5.5,y0:0,y1:5,u:70,uy:50,lab:1,laby:1});return G.svg(P.d(G,f)+curve(G,f,'#1f2937',3))+`<div class="readout"><span class="math">${P.h}</span></div>`;}})));}

const EV=[{t:'∫₁³ x² dx',f:x=>x*x,F:x=>x**3/3,Fn:'x³/3',a:1,b:3},{t:'∫₀^π sin x dx',f:Math.sin,F:x=>-Math.cos(x),Fn:'−cos x',a:0,b:PI},{t:'∫₁^e (1/x) dx',f:x=>1/x,F:Math.log,Fn:'ln x',a:1,b:Math.E},{t:'∫₀¹ eˣ dx',f:Math.exp,F:Math.exp,Fn:'eˣ',a:0,b:1}];
function mEval(el){chooser(el,EV.map(E=>({t:E.t,html:()=>{const G=grid({x0:-0.3,x1:Math.max(3.5,E.b+0.3),y0:-0.5,y1:Math.max(2,E.f(E.b)+0.5),u:100,uy:Math.min(60,240/(E.f(E.b)+1)),lab:1,laby:1});const v=E.F(E.b)-E.F(E.a);
  return G.svg(C.region(G,E.f,()=>0,E.a,E.b,'rgba(37,99,235,.25)')+curve(G,x=>x<=0&&E.Fn==='ln x'?NaN:E.f(x),'#2563eb',3))+`<div class="readout">Antiderivative F(x) = <b>${E.Fn}</b>.<br>F(${K.r3(E.b)}) − F(${K.r3(E.a)}) = ${K.r3(E.F(E.b))} − ${K.r3(E.F(E.a))} = <b>${K.r3(v)}</b> · area by counting tiny rectangles: ${K.r3(C.simpson(E.f,E.a,E.b))} ✓</div>`;}})));}

function mFamily(el){sliders(el,[{k:'C',l:'C',min:-3,max:3,step:.1,v:0},{k:'x',l:'x',min:-2,max:2,step:.05,v:1}],V=>{const G=grid({x0:-2.5,x1:2.5,y0:-4,y1:6,u:90,uy:30,lab:1,laby:2});let s='';
  for(let c=-3;c<=3;c++)s+=curve(G,x=>x*x+c,'#cbd5e1',1.5);s+=curve(G,x=>x*x+V.C,'#2563eb',3);for(let c=-3;c<=3;c++)s+=curve(G,x=>V.x*2*(x-V.x)+V.x*V.x+c,'#fca5a5',1,'3 3');s+=curve(G,x=>2*V.x*(x-V.x)+V.x*V.x+V.C,'#e11d48',2.5)+gdot(G,V.x,V.x*V.x+V.C,'#1f2937',6);
  $('.fm-g',el).innerHTML=G.svg(s);$('.fm-r',el).innerHTML=`∫ 2x dx = x² + C. Every curve in the family has slope 2x = <b>${K.r3(2*V.x)}</b> at x = ${nf(V.x)} — parallel tangents.<br>C just shifts the graph up or down; an <b>initial condition</b> picks one curve.`;},`<div class="fm-g"></div><div class="readout fm-r"></div>`).run();}

const US=[{t:'∫ 2x(x² + 1)⁵ dx',steps:[{h:'∫ 2x(x² + 1)⁵ dx',n:'Spot an inside function whose derivative is also present: x² + 1 and 2x.'},{h:'u = x² + 1, du = 2x dx',n:'Name u and find du.'},{h:'∫ u⁵ du = u⁶/6 + C',n:'The integral is now a basic power rule.'},{h:'(x² + 1)⁶/6 + C',n:'Substitute back.'}]},
 {t:'∫ cos(3x) dx',steps:[{h:'∫ cos(3x) dx',n:'Inside: 3x.'},{h:'u = 3x, du = 3 dx → dx = du/3',n:'Adjust for the missing constant.'},{h:'(1/3)∫ cos u du = (1/3) sin u + C',n:''},{h:'(1/3) sin(3x) + C',n:''}]},
 {t:'∫₀¹ x e^(x²) dx',steps:[{h:'∫₀¹ x e^(x²) dx',n:'Inside: x².'},{h:'u = x², du = 2x dx; x = 0 → u = 0, x = 1 → u = 1',n:'Change the bounds too.'},{h:'(1/2)∫₀¹ eᵘ du = (1/2)(e − 1)',n:'No need to substitute back.'},{h:'≈ 0.859',n:''}]}];
function mUsub(el){stepper(el,US);}

const IP=[{t:'∫ x eˣ dx',steps:[{h:'∫ x eˣ dx',n:'Product of algebraic × exponential. LIATE: u = the one that gets simpler.'},{h:'u = x, dv = eˣ dx → du = dx, v = eˣ',n:''},{h:'uv − ∫ v du = x eˣ − ∫ eˣ dx',n:'∫u dv = uv − ∫v du.'},{h:'x eˣ − eˣ + C',n:''}]},
 {t:'∫ ln x dx',steps:[{h:'∫ ln x dx = ∫ ln x · 1 dx',n:'Hidden product with 1.'},{h:'u = ln x, dv = dx → du = dx/x, v = x',n:''},{h:'x ln x − ∫ x · (1/x) dx',n:''},{h:'x ln x − x + C',n:''}]},
 {t:'∫ x² sin x dx',steps:[{h:'∫ x² sin x dx',n:'u = x² (gets simpler).'},{h:'−x² cos x + ∫ 2x cos x dx',n:'First round.'},{h:'−x² cos x + 2x sin x − ∫ 2 sin x dx',n:'Second round with u = 2x.'},{h:'−x² cos x + 2x sin x + 2 cos x + C',n:'Tabular method speeds this up.'}]}];
function mParts(el){stepper(el,IP);}

const PF=[{t:'∫ 1/(x² − 1) dx',steps:[{h:'1/((x − 1)(x + 1)) = A/(x − 1) + B/(x + 1)',n:'Factor the denominator.'},{h:'1 = A(x + 1) + B(x − 1)',n:'Multiply through.'},{h:'x = 1: A = 1/2 · x = −1: B = −1/2',n:'Cover-up / plug in roots.'},{h:'(1/2)ln|x − 1| − (1/2)ln|x + 1| + C',n:'Each piece is a log.'}]},
 {t:'∫ (5x + 1)/((x + 1)(x − 2)) dx',steps:[{h:'A/(x + 1) + B/(x − 2)',n:''},{h:'5x + 1 = A(x − 2) + B(x + 1)',n:''},{h:'x = 2: 11 = 3B → B = 11/3 · x = −1: −4 = −3A → A = 4/3',n:''},{h:'(4/3)ln|x + 1| + (11/3)ln|x − 2| + C',n:''}]}];
function mPF(el){stepper(el,PF);}

function mImp(el){sliders(el,[{k:'p',l:'p',min:0.5,max:3,step:.1,v:2},{k:'b',l:'upper bound b',min:2,max:200,step:1,v:10}],V=>{const p=V.p,b=V.b;const f=x=>x**-p;const I=Math.abs(p-1)<1e-9?Math.log(b):(b**(1-p)-1)/(1-p);
  const G=grid({x0:0,x1:10.5,y0:0,y1:1.6,u:44,uy:180,lab:1,laby:1});let s=C.region(G,f,()=>0,1,Math.min(b,10.5),'rgba(37,99,235,.25)')+curve(G,x=>x<0.6?NaN:f(x),'#2563eb',3);
  $('.ip-g',el).innerHTML=G.svg(s);$('.ip-r',el).innerHTML=`∫₁<sup>${b}</sup> 1/x<sup>${nf(p)}</sup> dx = <b>${K.r3(I)}</b>${b>10?' <span class="mute">(graph shows up to 10)</span>':''}<br>As b → ∞: ${p>1?`<b>converges</b> to 1/(p − 1) = ${K.r3(1/(p-1))}`:'<b>diverges</b> — the area grows without bound'}. Rule: ∫₁^∞ 1/xᵖ dx converges ⇔ p > 1.`;},`<div class="ip-g"></div><div class="readout ip-r"></div>`).run();}

/* ---------- lessons ---------- */
L['CA-6-1']={goal:'I can interpret the area under a rate-of-change graph as the accumulated amount, with units.',
 life:{title:'Rate × time = amount',html:'Driving at 60 mph for 2 hours covers 120 miles — that is the area of a rectangle under the speed graph. When the rate changes, the amount is still the area under the rate curve.'},
 see:[{title:'Filling a tank',hint:'Slide t. The shaded area is the water collected so far.',mount:mFlow}],
 vocab:[['Accumulation','Total change = area under the rate graph.'],['Units','(rate units) × (input units), e.g. (L/min)(min) = L.'],['Signed area','Area below the axis counts as negative change.'],['Constant rate','Amount = rate × time (a rectangle).']],
 examples:[ex('Example','A car’s velocity is 20 m/s for 5 s, then 10 m/s for 3 s.',[['20 × 5 = 100',''],['10 × 3 = 30',''],['total displacement 130 m','Sum of rectangle areas.']])],
 mistake:{bad:'area under the velocity graph = speed',good:'area under velocity = displacement',why:'Area multiplies the rate by time, giving an amount (distance), not a rate.'},
 practice(){const r1=rand(2,9),t1=rand(1,5),r2=rand(2,9),t2=rand(1,5);return num(`Water flows in at ${r1} L/min for ${t1} min, then ${r2} L/min for ${t2} min. Total water added?`,[['total (L) =',r1*t1+r2*t2]],'Add the rectangle areas under the rate graph.',[[`${r1}·${t1} + ${r2}·${t2} = ${r1*t1+r2*t2} L`,'']]);},
 check:[q('The area under a velocity graph gives…',['acceleration','displacement','speed','time'],1,''),q('Rate in gal/h, time in h. Area units:',['gal/h','h','gal','gal·h²'],2,''),q('Area below the t-axis on a rate graph means…',['the amount increased','the amount decreased','no change','an error'],1,'')]};

L['CA-6-2']={goal:'I can approximate area with left, right, midpoint, and trapezoidal sums, including from tables with unequal widths.',
 life:{title:'Estimating with rectangles',html:'Surveyors estimate the area of an irregular lake by slicing it into strips and adding rectangles or trapezoids. More strips, better estimate.'},
 see:[{title:'Riemann sums',hint:'Pick a function and a method. Increase n and watch the error shrink.',mount:mRiemann}],
 vocab:[['Left/right sum','Heights from the left or right end of each subinterval.'],['Midpoint sum','Heights from the middle of each subinterval.'],['Trapezoidal sum','Average of left and right heights: Σ ½[f(xᵢ₋₁) + f(xᵢ)]Δxᵢ.'],['Over/under','f increasing: left under, right over. f concave up: trapezoid over, midpoint under.'],['Unequal widths','Use each subinterval’s own width.']],
 examples:[ex('From a table','t: 0, 2, 5, 6; r(t): 4, 6, 9, 7. Trapezoidal sum on [0, 6].',[['½(4 + 6)(2) = 10',''],['½(6 + 9)(3) = 22.5',''],['½(9 + 7)(1) = 8',''],['total 40.5','']])],
 mistake:{bad:'all subintervals have width 2',good:'use each width: 2, 3, 1',why:'Tables often have unequal spacing; read Δx from the data.'},
 practice(){const t=[0];for(let i=0;i<3;i++)t.push(t[i]+rand(1,3));const v=[0,0,0,0].map(()=>rand(1,12));const T=pick(['L','R','T']);let s=0;for(let i=0;i<3;i++){const w=t[i+1]-t[i];s+=T==='L'?v[i]*w:T==='R'?v[i+1]*w:(v[i]+v[i+1])/2*w;}
  return num(`x: ${t.join(', ')} · f(x): ${v.join(', ')}. Compute the ${{L:'left',R:'right',T:'trapezoidal'}[T]} sum with these 3 subintervals.`,[['sum =',s]],'Multiply each height by its own width.',[[`widths: ${[0,1,2].map(i=>t[i+1]-t[i]).join(', ')}`,''],[`sum = ${nf(s)}`,'']]);},
 check:[q('For an increasing f, a left sum is an…',['overestimate','underestimate','exact value','undefined'],1,''),q('The trapezoidal sum averages…',['left and right sums','midpoints','f′','areas squared'],0,''),q('More subintervals usually make the estimate…',['worse','better','the same','negative'],1,'')]};

L['CA-6-3']={goal:'I can write a Riemann sum in sigma notation and connect its limit to definite integral notation.',
 life:{title:'From estimates to exact',html:'Infinitely many infinitely thin rectangles — that sounds impossible, but the limit of the sums settles on one exact number. That number is written ∫ₐᵇ f(x) dx.'},
 see:[{title:'Let n → ∞',hint:'Increase n and watch the sum settle.',mount:mSigma}],
 vocab:[['Definite integral','∫ₐᵇ f(x) dx = lim_{n→∞} Σ_{i=1}^{n} f(xᵢ)Δx.'],['Δx','(b − a)/n.'],['Right endpoints','xᵢ = a + iΔx.'],['Translate a limit','lim Σ f(a + i(b − a)/n)·(b − a)/n → identify f, a, b.']],
 examples:[ex('Example','Write lim_{n→∞} Σ (1 + 3i/n)² · (3/n) as an integral.',[['Δx = 3/n → b − a = 3',''],['xᵢ = 1 + 3i/n → a = 1, b = 4',''],['∫₁⁴ x² dx','']])],
 mistake:{bad:'Δx = 1/n always',good:'Δx = (b − a)/n',why:'The width depends on the length of the interval.'},
 practice(){const a=rand(0,3),w=rand(1,4),k=pick([2,3]);const fn=k===2?'x²':'x³';
  return mc(`lim<sub>n→∞</sub> Σ<sub>i=1</sub><sup>n</sup> (${a}${a?' + ':''}${w}i/n)${A2.sup(k)} · (${w}/n) =`,`∫<sub>${a}</sub><sup>${a+w}</sup> ${fn} dx`,[`∫<sub>0</sub><sup>${w}</sup> ${fn} dx`,`∫<sub>${a}</sub><sup>${w}</sup> ${fn} dx`,`∫<sub>${a}</sub><sup>${a+w}</sup> ${w}${fn} dx`],'Δx gives b − a; the start of xᵢ gives a.');},
 check:[q('In ∫ₐᵇ f(x)dx, Δx for n rectangles is…',['1/n','(b − a)/n','b/n','n/(b − a)'],1,''),q('The definite integral is the limit of…',['derivatives','Riemann sums','tangent slopes','averages of f′'],1,''),q('For [2, 5] with right endpoints, xᵢ =',['2 + 3i/n','5i/n','3i/n','2i/n'],0,'')]};

L['CA-6-4']={goal:'I can analyze accumulation functions g(x) = ∫ₐˣ f(t) dt from a graph of f.',
 life:{title:'Running total',html:'A bank balance is a running total of deposits (+) and withdrawals (−). An accumulation function is a running total of signed area.'},
 see:[{title:'Build g from f',hint:'Slide x. Blue area adds, red area subtracts; watch g get drawn.',mount:mAccFn}],
 vocab:[['Accumulation function','g(x) = ∫ₐˣ f(t) dt: signed area from a to x.'],['g(a)','= 0.'],['g′(x)','= f(x): g increases where f > 0.'],['g″(x)','= f′(x): g concave up where f is increasing.']],
 examples:[ex('Example','g(x) = ∫₀ˣ f(t) dt, where f > 0 on (0, 3) and f < 0 on (3, 5).',[['g increases on (0, 3), decreases on (3, 5)',''],['g has a relative max at x = 3','f changes + → −.']])],
 mistake:{bad:'g has a max where f has a max',good:'g has a max where f changes from + to −',why:'g′ = f, so extrema of g come from zeros of f, not peaks of f.'},
 practice(){const A1=rand(2,8),A2v=rand(1,6),A3=rand(1,6);const T=pick([2,4,6]);const vals={2:A1,4:A1-A2v,6:A1-A2v+A3};
  return num(`f is positive on (0, 2) with area ${A1}, negative on (2, 4) with area ${A2v}, positive on (4, 6) with area ${A3}. g(x) = ∫₀ˣ f(t) dt. Find g(${T}).`,[[`g(${T}) =`,vals[T]]],'Add areas above the axis and subtract areas below.',[[`g(${T}) = ${nf(vals[T])}`,'']]);},
 check:[q('g(x) = ∫₂ˣ f(t) dt. g(2) =',['f(2)','0','2','undefined'],1,''),q('g′(x) =',['f′(x)','f(x)','∫f','0'],1,''),q('g is concave up where…',['f > 0','f is increasing','f < 0','f = 0'],1,'')]};

L['CA-6-5']={goal:'I can apply both parts of the Fundamental Theorem of Calculus, including derivatives of integrals with variable bounds.',
 life:{title:'The bridge',html:'For centuries, slopes and areas were separate problems. Newton and Leibniz discovered they are inverse processes: differentiating an area function gives back the original function. That bridge is the FTC.'},
 see:[{title:'Why the area function’s slope is f',hint:'Shrink h: the red strip ÷ h approaches f(2).',mount:mFTC}],
 vocab:[['FTC part 1','d/dx ∫ₐˣ f(t) dt = f(x) (f continuous).'],['FTC part 2','∫ₐᵇ f(x) dx = F(b) − F(a), where F′ = f.'],['Chain rule version','d/dx ∫ₐ^{u(x)} f(t) dt = f(u(x))·u′(x).'],['Net change','∫ₐᵇ F′(x) dx = F(b) − F(a).']],
 examples:[ex('Example','d/dx ∫₁^{x²} sin t dt',[['f(u)·u′ with u = x²',''],['= sin(x²)·2x','']])],
 mistake:{bad:'d/dx ∫₀^{x³} eᵗ dt = e^(x³)',good:'= e^(x³)·3x²',why:'A variable upper bound u(x) requires the chain rule factor u′(x).'},
 practice(){if(Math.random()<0.5){const a=rand(1,3),k=rand(1,3),x=rand(1,3);const fn=pick([{n:'t²',f:t=>t*t},{n:'√(t + 1)',f:t=>Math.sqrt(t+1)},{n:'(t + 2)',f:t=>t+2}]);const d=fn.f(x**k)*k*x**(k-1);
   return num(`g(x) = ∫<sub>${a}</sub><sup>x${k>1?A2.sup(k):''}</sup> ${fn.n} dt. Find g′(${x}). (3 decimals if needed)`,[[`g′(${x}) =`,+d.toFixed(3),0.006]],'FTC with the chain rule: f(u(x))·u′(x).',[[`g′(x) = ${fn.n.replace(/t/g,'(x'+(k>1?A2.sup(k):'')+')')} · ${k>1?k+'x'+(k>2?A2.sup(k-1):''):'1'}`,''],[`g′(${x}) ≈ ${d.toFixed(3)}`,'']]);}
  const F0=rand(-5,5),I=rand(-8,12);return num(`F′(x) = f(x), F(1) = ${fmtNeg(F0)}, and ∫₁⁴ f(x) dx = ${fmtNeg(I)}. Find F(4).`,[['F(4) =',F0+I]],'Net change: F(4) = F(1) + ∫₁⁴ F′(x) dx.',[[`${fmtNeg(F0)} + ${P(I)} = ${fmtNeg(F0+I)}`,'']]);},
 check:[q('d/dx ∫₀ˣ cos t dt =',['sin x','cos x','−sin x','0'],1,''),q('∫ₐᵇ f(x)dx = F(b) − F(a) requires…',['F′ = f','F = f′','F(a) = 0','f(a) = 0'],0,''),q('d/dx ∫₀^{2x} f(t)dt =',['f(2x)','2f(2x)','f(x)','2f(x)'],1,'')]};

L['CA-6-6']={goal:'I can use properties of definite integrals: additivity over intervals, reversing bounds, zero width, and linearity.',
 life:{title:'Bookkeeping for areas',html:'If you know the area on [0, 2] and on [2, 5], you know it on [0, 5]. These properties let you combine given integral values without ever seeing a formula — common on the AP exam.'},
 see:[{title:'Picture the properties',hint:'Pick a property and see it as area.',mount:mProps}],
 vocab:[['Additivity','∫ₐᵇ f + ∫ᵦᶜ f = ∫ₐᶜ f.'],['Reversing','∫ᵦᵃ f = −∫ₐᵇ f.'],['Zero width','∫ₐᵃ f = 0.'],['Linearity','∫(k f ± g) = k∫f ± ∫g.']],
 examples:[ex('Example','∫₀⁵ f = 12, ∫₀² f = 4. Find ∫₂⁵ (3f(x) + 1) dx.',[['∫₂⁵ f = 12 − 4 = 8',''],['3(8) + ∫₂⁵ 1 dx = 24 + 3 = 27','']])],
 mistake:{bad:'∫₂⁵ 1 dx = 1',good:'= 5 − 2 = 3',why:'Integrating a constant gives constant × width.'},
 practice(){const A=rand(-6,12),B=rand(-6,12),k=rand(2,5),c=rand(1,4);const T=pick(['add','rev','lin']);
  if(T==='add')return num(`∫₀³ f(x) dx = ${fmtNeg(A)} and ∫₃⁷ f(x) dx = ${fmtNeg(B)}. Find ∫₀⁷ f(x) dx.`,[['∫₀⁷ f =',A+B]],'Additivity.',[[`${fmtNeg(A)} + ${P(B)} = ${fmtNeg(A+B)}`,'']]);
  if(T==='rev')return num(`∫₂⁶ f(x) dx = ${fmtNeg(A)}. Find ∫₆² ${k}f(x) dx.`,[['value =',-k*A]],'Reverse the bounds: change the sign.',[[`−${k}(${fmtNeg(A)}) = ${fmtNeg(-k*A)}`,'']]);
  return num(`∫₁⁵ f(x) dx = ${fmtNeg(A)} and ∫₁⁵ g(x) dx = ${fmtNeg(B)}. Find ∫₁⁵ [${k}f(x) − g(x) + ${c}] dx.`,[['value =',k*A-B+4*c]],'Linearity; ∫₁⁵ c dx = 4c.',[[`${k}(${fmtNeg(A)}) − ${P(B)} + ${c}·4 = ${fmtNeg(k*A-B+4*c)}`,'']]);},
 check:[q('∫₄⁴ f(x)dx =',['f(4)','4','0','undefined'],2,''),q('∫₅¹ f = −3. Then ∫₁⁵ f =',['−3','3','1/3','0'],1,''),q('∫₀² 5 dx =',['5','2','10','7'],2,'')]};

L['CA-6-7']={goal:'I can evaluate definite integrals exactly by finding an antiderivative and using F(b) − F(a).',
 life:{title:'No rectangles needed',html:'Thanks to the FTC, the exact area under y = x² from 1 to 3 is just x³/3 evaluated at the ends: 9 − 1/3 = 26/3. Infinite rectangles, one subtraction.'},
 see:[{title:'Antiderivative vs. area',hint:'Pick an integral. F(b) − F(a) matches the area.',mount:mEval}],
 vocab:[['Evaluate','∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a).'],['No + C','Constants cancel in F(b) − F(a).'],['Common antiderivatives','xⁿ → xⁿ⁺¹/(n + 1); 1/x → ln|x|; eˣ → eˣ; sin x → −cos x; cos x → sin x; sec²x → tan x.'],['Signed','A negative answer means more area below the axis.']],
 examples:[ex('Example','∫₀² (3x² − 4x + 1) dx',[['F(x) = x³ − 2x² + x',''],['F(2) − F(0) = (8 − 8 + 2) − 0 = 2','']])],
 mistake:{bad:'∫₀^π cos x dx = [−sin x]₀^π',good:'= [sin x]₀^π = 0',why:'The antiderivative of cos x is sin x; of sin x is −cos x. Check by differentiating.'},
 practice(){const a=rand(-3,3),b=rand(-4,4),c=rand(-5,5),lo=rand(-1,1),hi=lo+rand(1,3);const F=x=>a*x**3/3+b*x*x/2+c*x;const v=F(hi)-F(lo);
  return num(`Evaluate ∫<sub>${fmtNeg(lo)}</sub><sup>${hi}</sup> (${ps([a,b,c])}) dx. (fraction or decimal)`,[['value =',v,0.011]],'Power rule for antiderivatives, then F(b) − F(a).',[[`F(x) = ${K.pf(a/3)}x³ + ${K.pf(b/2)}x² + ${c}x`,''],[`F(${hi}) − F(${fmtNeg(lo)}) = ${K.pf(v)}`,'']]);},
 check:[q('∫₀¹ x dx =',['1','1/2','2','0'],1,''),q('∫₁^e (1/x) dx =',['e','1','0','1/e'],1,''),q('∫₀^π sin x dx =',['0','1','2','π'],2,'')]};

L['CA-6-8']={goal:'I can find indefinite integrals using the basic rules and use an initial condition to find C.',
 life:{title:'Undoing the derivative',html:'If you know a rocket’s velocity, you know its position <b>up to a starting point</b>. That unknown starting point is the +C; a launch-pad reading fixes it.'},
 see:[{title:'A family of antiderivatives',hint:'Change C: the curves shift, but slopes at each x stay the same.',mount:mFamily}],
 vocab:[['Indefinite integral','∫ f(x) dx = F(x) + C, where F′ = f.'],['Power rule','∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C, n ≠ −1.'],['∫ 1/x dx','ln|x| + C.'],['Initial condition','A known point (x₀, y₀) determines C.']],
 examples:[ex('Example','f′(x) = 6x² − 2, f(1) = 5. Find f.',[['f(x) = 2x³ − 2x + C',''],['f(1) = 2 − 2 + C = 5 → C = 5',''],['f(x) = 2x³ − 2x + 5','']])],
 mistake:{bad:'∫ x⁻¹ dx = x⁰/0',good:'= ln|x| + C',why:'The power rule fails for n = −1; that case gives the natural log.'},
 practice(){const a=nz(-4,4),b=rand(-5,5),x0=rand(-2,2),y0=rand(-9,9);const C0=y0-(a*x0*x0+b*x0);
  return num(`f′(x) = ${ps([2*a,b])}, and f(${fmtNeg(x0)}) = ${fmtNeg(y0)}. Find C in f(x) = ${ps([a,b,0]).replace(/ \+ 0$/,'')} + C, then f(${fmtNeg(x0+1)}).`,[['C =',C0],[`f(${fmtNeg(x0+1)}) =`,a*(x0+1)**2+b*(x0+1)+C0]],'Substitute the initial condition.',[[`${a}·${P(x0)}² + ${b}·${P(x0)} + C = ${fmtNeg(y0)} → C = ${fmtNeg(C0)}`,'']]);},
 check:[q('∫ 3x² dx =',['6x + C','x³ + C','3x³ + C','x² + C'],1,''),q('∫ cos x dx =',['−sin x + C','sin x + C','cos x + C','−cos x + C'],1,''),q('The +C is determined by…',['the derivative','an initial condition','the limit','nothing'],1,'')]};

L['CA-6-9']={goal:'I can integrate using u-substitution, including changing the bounds of a definite integral.',
 life:{title:'The chain rule in reverse',html:'u-substitution undoes the chain rule. When you see a function and (a multiple of) its derivative together, rename the inside as u and the integral becomes simple.'},
 see:[{title:'Step through a substitution',hint:'Pick an integral and step forward.',mount:mUsub}],
 vocab:[['u-substitution','∫ f(g(x))g′(x) dx = ∫ f(u) du with u = g(x).'],['Adjust constants','If du = 3 dx, then dx = du/3.'],['Definite integrals','Change the bounds to u-values, or substitute back before evaluating — not both.'],['Spotting u','Often the inside of a power, root, exponent, or trig function.']],
 examples:[ex('Example','∫ x/(x² + 4) dx',[['u = x² + 4, du = 2x dx',''],['(1/2)∫ du/u = (1/2)ln|u| + C',''],['(1/2)ln(x² + 4) + C','']])],
 mistake:{bad:'∫₀¹ 2x(x² + 1)³ dx = [u⁴/4]₀¹ with u = x² + 1',good:'bounds become u = 1 to u = 2',why:'After substituting, the bounds must be u-values (or substitute x back first).'},
 practice(){if(Math.random()<0.5){const n=rand(2,4),c=rand(1,3);const v=((1+c)**(n+1)-1)/(n+1);return num(`Evaluate ∫₀¹ ${2*c}x(${c}x² + 1)${A2.sup(n)} dx. (fraction or decimal)`,[['value =',v,0.011]],`u = ${c}x² + 1, du = ${2*c}x dx; bounds 1 to ${c+1}.`,[[`∫₁<sup>${c+1}</sup> u${A2.sup(n)} du = [u${A2.sup(n+1)}/${n+1}]₁<sup>${c+1}</sup>`,''],[`= (${(c+1)**(n+1)} − 1)/${n+1} = ${K.pf(v)}`,'']]);}
  const k=rand(2,6);return num(`Evaluate ∫<sub>0</sub><sup>π/${k}</sup> ${k} sin(${k}x) dx.`,[['value =',2]],`u = ${k}x, du = ${k} dx; bounds 0 to π.`,[['∫₀^π sin u du = [−cos u]₀^π = 2','']]);},
 check:[q('For ∫ cos(x²)·2x dx, choose u =',['2x','x²','cos x','cos(x²)'],1,''),q('If u = 5x, then dx =',['5 du','du/5','du','5x du'],1,''),q('∫ eᵘ du =',['eᵘ + C','ueᵘ⁻¹ + C','ln u + C','e + C'],0,'')]};

L['CA-6-10']={goal:'I can use integration by parts, ∫u dv = uv − ∫v du, choosing u wisely (BC).',
 life:{title:'The product rule in reverse',html:'Just as u-substitution reverses the chain rule, integration by parts reverses the product rule. It handles products like x·eˣ or x·sin x that substitution cannot.'},
 see:[{title:'Step through by parts',hint:'Choose an integral and step forward.',mount:mParts}],
 vocab:[['Integration by parts','∫ u dv = uv − ∫ v du.'],['LIATE','Pick u in this order: Logs, Inverse trig, Algebraic, Trig, Exponential.'],['Goal','∫ v du should be simpler than the original.'],['Tabular method','For polynomial × (exp/trig), differentiate u repeatedly and integrate dv repeatedly with alternating signs.']],
 examples:[ex('Example','∫₀¹ x eˣ dx',[['u = x, dv = eˣ dx → du = dx, v = eˣ',''],['[x eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1)',''],['= 1','']])],
 mistake:{bad:'choose u = eˣ in ∫ x eˣ dx',good:'choose u = x',why:'With u = eˣ, v = x²/2 and the new integral ∫ x²eˣ/2 dx is harder.'},
 practice(){if(Math.random()<0.5){const T=pick([['∫ x eˣ dx','x eˣ − eˣ + C'],['∫ x cos x dx','x sin x + cos x + C'],['∫ ln x dx','x ln x − x + C'],['∫ x sin x dx','−x cos x + sin x + C']]);return mc(`${T[0]} =`,T[1],['x eˣ − eˣ + C','x sin x + cos x + C','x ln x − x + C','−x cos x + sin x + C'],'Check by differentiating each choice.');}
  const k=rand(1,3);const v=k*Math.exp(k)-Math.exp(k)+1;return num(`Evaluate ∫₀<sup>${k}</sup> x eˣ dx (3 decimals).`,[['value ≈',+v.toFixed(3),0.006]],'Antiderivative x eˣ − eˣ.',[[`[x eˣ − eˣ]₀<sup>${k}</sup> = (${k} − 1)e${A2.sup(k)} + 1 ≈ ${v.toFixed(3)}`,'']]);},
 check:[q('∫ u dv =',['uv + ∫v du','uv − ∫v du','u′v′','∫u ∫v'],1,''),q('For ∫ x² ln x dx, choose u =',['x²','ln x','x','dx'],1,'LIATE: L first.'),q('By parts reverses the…',['chain rule','product rule','quotient rule','power rule'],1,'')]};

L['CA-6-11']={goal:'I can integrate rational functions with distinct linear factors using partial fractions (BC).',
 life:{title:'Break it into pieces',html:'In Pre-Calculus you split 1/(x² − 1) into simpler fractions. Now that splitting pays off: each simple fraction integrates to a logarithm.'},
 see:[{title:'Decompose, then integrate',hint:'Step through a partial-fraction integral.',mount:mPF}],
 vocab:[['Partial fractions','P(x)/((x − a)(x − b)) = A/(x − a) + B/(x − b) (degree of P less than 2).'],['Finding A and B','Multiply through, then substitute x = a and x = b (cover-up).'],['∫ A/(x − a) dx','A ln|x − a| + C.'],['Improper fraction first','If the top degree ≥ bottom degree, divide first.']],
 examples:[ex('Example','∫ 3/(x² + x − 2) dx',[['x² + x − 2 = (x + 2)(x − 1)',''],['3 = A(x − 1) + B(x + 2): B = 1, A = −1',''],['−ln|x + 2| + ln|x − 1| + C = ln|(x − 1)/(x + 2)| + C','']])],
 mistake:{bad:'∫ 1/(x² − 1) dx = ln|x² − 1| + C',good:'split into partial fractions first',why:'ln|u| needs u′ on top; the numerator 1 is not the derivative of x² − 1.'},
 practice(){const a=rand(1,4),b=-rand(1,4);const c=rand(1,6);const A=c/(a-b),B=-c/(a-b);
  return num(`${c}/((x − ${a})(x + ${-b})) = A/(x − ${a}) + B/(x + ${-b}). Find A and B. (fractions or decimals)`,[['A =',A,0.011],['B =',B,0.011]],'Cover-up: plug in x = a for A and x = b for B.',[[`x = ${a}: ${c} = A(${a-b}) → A = ${frac(c,a-b)}`,''],[`x = ${b}: ${c} = B(${b-a}) → B = ${frac(-c,a-b)}`,'']]);},
 check:[q('∫ 1/(x − 3) dx =',['ln|x − 3| + C','1/(x − 3)² + C','(x − 3)² + C','−ln|x| + C'],0,''),q('1/((x − 1)(x + 1)): A for x − 1 is…',['1','1/2','−1/2','2'],1,''),q('If the numerator degree ≥ the denominator degree, first…',['use parts','do long division','use L’Hôpital','stop'],1,'')]};

L['CA-6-12']={goal:'I can evaluate improper integrals as limits and decide whether they converge or diverge (BC).',
 life:{title:'Infinite region, finite area?',html:'Paint the region under 1/x² from 1 to infinity: it is infinitely long, yet takes a finite amount of paint (area 1). Under 1/x, the area is infinite. The difference is a power of x.'},
 see:[{title:'Push the bound out',hint:'Move b toward 200 and change p. Which values of p settle?',mount:mImp}],
 vocab:[['Improper integral','An infinite bound or a vertical asymptote in [a, b].'],['Definition','∫ₐ^∞ f dx = lim_{b→∞} ∫ₐᵇ f dx.'],['Converges / diverges','The limit is a finite number / is not.'],['p-integrals','∫₁^∞ 1/xᵖ dx converges ⇔ p > 1 (value 1/(p − 1)).']],
 examples:[ex('Example','∫₀^∞ e^(−2x) dx',[['lim_{b→∞} [−½ e^(−2x)]₀ᵇ',''],['= lim (−½ e^(−2b) + ½) = ½','Converges.']])],
 mistake:{bad:'∫₋₁¹ 1/x² dx = [−1/x]₋₁¹ = −2',good:'diverges',why:'1/x² has a vertical asymptote at 0 inside the interval. Split at 0 and take limits: each piece is infinite.'},
 practice(){if(Math.random()<0.5){const p=pick([2,3,4,0.5,1,1.5]);const conv=p>1;if(!conv)return mc(`∫₁^∞ 1/x^${p} dx`,'diverges',['converges to 1','converges to 2','diverges','converges to 0'],'p-integral test.');
   return num(`∫₁^∞ 1/x^${p} dx converges. Find its value. (fraction or decimal)`,[['value =',1/(p-1),0.011]],'Value 1/(p − 1).',[[`1/(${p} − 1) = ${K.pf(1/(p-1))}`,'']]);}
  const k=rand(1,5);return num(`Evaluate ∫₀^∞ e^(−${k}x) dx. (fraction or decimal)`,[['value =',1/k,0.011]],'Antiderivative −(1/k)e^(−kx); take b → ∞.',[[`lim [−(1/${k})e^(−${k}x)]₀ᵇ = 1/${k}`,'']]);},
 check:[q('∫₁^∞ 1/x dx…',['converges to 1','diverges','converges to 0','= ln 1'],1,''),q('An improper integral is defined as a…',['derivative','limit of integrals','Riemann sum','series'],1,''),q('∫₁^∞ 1/x³ dx =',['1/3','1/2','1','diverges'],1,'')]};

TOOLS['CA-6']={title:'Riemann sums',hint:'Pick a function and a method; push n up and watch the approximation meet the exact integral.',mount:mRiemann};
})();
