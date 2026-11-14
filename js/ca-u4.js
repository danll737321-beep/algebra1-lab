/* Calculus · Unit 4 · Contextual applications of differentiation */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;
const line=(G,m,x0,y0,col,w=2.5,dash='')=>curve(G,x=>y0+m*(x-x0),col,w,dash);

function mTank(el){sliders(el,[{k:'t',l:'t (min)',min:0,max:10,step:.1,v:3}],V=>{const W=t=>200+30*t-2*t*t,Wp=t=>30-4*t;const t=V.t,w=W(t),m=Wp(t);const lvl=w/320;
  const G=grid({x0:0,x1:10.5,y0:150,y1:330,u:34,uy:1.2,lab:2,laby:50,xl:'t (min)'});
  $('.tk-g',el).innerHTML=`<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:center"><svg viewBox="0 0 120 200" style="width:110px"><rect x="20" y="10" width="80" height="180" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="3"/><rect x="23" y="${187-174*lvl}" width="74" height="${174*lvl}" fill="#93c5fd"/></svg>${G.svg(curve(G,W,'#2563eb',3)+line(G,m,t,w,'#e11d48',2)+gdot(G,t,w,'#1f2937',6))}</div>`;
  $('.tk-r',el).innerHTML=`W(t) = 200 + 30t − 2t² liters. W(${nf(t)}) = <b>${K.r3(w)} L</b>, W′(${nf(t)}) = <b>${K.r3(m)} L/min</b>.<br>Meaning: at t = ${nf(t)} minutes, the amount of water is ${m>0?'increasing':m<0?'decreasing':'not changing'} at ${K.r3(Math.abs(m))} liters per minute.`;},`<div class="tk-g"></div><div class="readout tk-r"></div>`).run();}

function mMotion(el){sliders(el,[{k:'t',l:'t (s)',min:0,max:6,step:.02,v:1}],V=>{const s=t=>t**3-9*t*t+24*t-10,v=t=>3*t*t-18*t+24,a=t=>6*t-18;const t=V.t;
  let dist=0;for(let i=0;i<300;i++){const t0=t*i/300,t1=t*(i+1)/300;dist+=Math.abs(s(t1)-s(t0));}
  const X=x=>40+(x+12)*14;let tr='';for(let u=0;u<=t;u+=0.05)tr+=`<circle cx="${X(s(u))}" cy="${40+u*8}" r="2" fill="#93c5fd"/>`;
  const dir=v(t)>0.01?1:v(t)<-0.01?-1:0;
  $('.mo-g',el).innerHTML=`<svg viewBox="0 0 520 110" class="fig" style="max-width:520px"><line x1="20" y1="30" x2="500" y2="30" stroke="#374151" stroke-width="2"/>${[-10,-5,0,5,10,15,20].map(x=>`<line x1="${X(x)}" y1="24" x2="${X(x)}" y2="36" stroke="#374151"/><text x="${X(x)}" y="18" text-anchor="middle" font-size="12">${fmtNeg(x)}</text>`).join('')}${tr}<circle cx="${X(s(t))}" cy="30" r="10" fill="#e11d48"/>${dir?`<line x1="${X(s(t))}" y1="30" x2="${X(s(t))+dir*40}" y2="30" stroke="#059669" stroke-width="4" marker-end="url(#mo-ah)"/>`:''}<defs><marker id="mo-ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#059669"/></marker></defs></svg>`;
  $('.mo-r',el).innerHTML=`s(t) = t³ − 9t² + 24t − 10 · v(t) = 3t² − 18t + 24 = 3(t − 2)(t − 4) · a(t) = 6t − 18<br>t = ${nf(t)}: s = <b>${K.r3(s(t))}</b>, v = <b>${K.r3(v(t))}</b>, a = <b>${K.r3(a(t))}</b>, speed = ${K.r3(Math.abs(v(t)))}<br>${dir>0?'Moving right':dir<0?'Moving left':'At rest (turning point?)'} and ${v(t)*a(t)>0?'speeding up':v(t)*a(t)<0?'slowing down':'—'}. Total distance so far: <b>${K.r3(dist)}</b> (displacement ${K.r3(s(t)-s(0))}).`;},`<div class="mo-g"></div><div class="readout mo-r"></div>`).run();}

const OR=[{t:'Marginal cost',f:x=>0.01*x*x+5*x+400,d:x=>0.02*x+5,r:[0,300],v:100,x:'units made',u:'dollars',du:'dollars per unit',s:x=>`C′(${x}) = $${K.r3(0.02*x+5)} per unit: making unit number ${x+1} costs about $${K.r3(0.02*x+5)}.`},
 {t:'Population',f:t=>500*Math.exp(0.08*t),d:t=>40*Math.exp(0.08*t),r:[0,20],v:5,x:'years',u:'fish',du:'fish per year',s:t=>`P′(${t}) ≈ ${K.r3(40*Math.exp(0.08*t))} fish per year: the population is growing about that fast in year ${t}.`},
 {t:'Drug level',f:t=>20*t*Math.exp(-0.5*t),d:t=>20*Math.exp(-0.5*t)*(1-0.5*t),r:[0,10],v:1,x:'hours',u:'mg/L',du:'mg/L per hour',s:t=>`D′(${t}) ≈ ${K.r3(20*Math.exp(-0.5*t)*(1-0.5*t))} mg/L per hour: ${t<2?'still being absorbed (rising).':t>2?'being cleared (falling).':'peak concentration.'}`}];
function mOther(el){K.pickSlide(el,OR,F=>[{k:'x',l:F.x,min:F.r[0],max:F.r[1],step:1,v:F.v}],(V,F)=>{
  $('.ot-r',el).innerHTML=`Input: ${F.x}. Output: ${F.u}. Derivative units: <b>${F.du}</b>.<br>${F.s(V.x)}`;},`<div class="readout ot-r"></div>`);}

function mRipple(el){sliders(el,[{k:'t',l:'t (s)',min:0.2,max:6,step:.05,v:2}],V=>{const r=2*V.t,A=PI*r*r,dA=2*PI*r*2;
  $('.rp-g',el).innerHTML=`<svg viewBox="0 0 300 300" class="fig" style="max-width:300px"><rect width="300" height="300" fill="#e0f2fe"/>${[1,0.7,0.4].map(k=>`<circle cx="150" cy="150" r="${r*12*k}" fill="none" stroke="#0284c7" stroke-width="${3*k}" opacity="${k}"/>`).join('')}<circle cx="150" cy="150" r="4" fill="#0f172a"/><line x1="150" y1="150" x2="${150+r*12}" y2="150" stroke="#e11d48" stroke-width="3"/><text x="${150+r*6}" y="142" text-anchor="middle" font-weight="800" fill="#e11d48">r</text></svg>`;
  $('.rp-r',el).innerHTML=`The radius grows at dr/dt = 2 cm/s. Now r = ${K.r3(r)} cm, A = πr² = ${K.r3(A)} cm².<br>A = πr² → <b>dA/dt = 2πr · dr/dt</b> = 2π(${K.r3(r)})(2) = <b>${K.r3(dA)} cm²/s</b>. Same dr/dt, but dA/dt grows as the circle grows.`;},`<div class="rp-g"></div><div class="readout rp-r"></div>`).run();}

function mLadder(el){sliders(el,[{k:'x',l:'bottom distance x (ft)',min:1,max:9.8,step:.1,v:6}],V=>{const x=V.x,y=Math.sqrt(100-x*x),dy=-x/y*1;const S=24;
  $('.ld-g',el).innerHTML=`<svg viewBox="0 0 300 280" class="fig" style="max-width:300px"><line x1="20" y1="260" x2="290" y2="260" stroke="#374151" stroke-width="3"/><line x1="20" y1="10" x2="20" y2="260" stroke="#374151" stroke-width="3"/><line x1="${20+x*S}" y1="260" x2="20" y2="${260-y*S}" stroke="#b45309" stroke-width="6" stroke-linecap="round"/><text x="${20+x*S/2}" y="276" text-anchor="middle" font-weight="800">x = ${K.r3(x)}</text><text x="26" y="${260-y*S/2}" font-weight="800">y = ${K.r3(y)}</text></svg>`;
  $('.ld-r',el).innerHTML=`A 10-ft ladder: x² + y² = 100. The bottom slides out at dx/dt = 1 ft/s.<br>2x·dx/dt + 2y·dy/dt = 0 → <b>dy/dt = −(x/y)·dx/dt</b> = −${K.r3(x)}/${K.r3(y)} = <b>${K.r3(dy)} ft/s</b>.<br>The top falls faster and faster as it nears the ground.`;},`<div class="ld-g"></div><div class="readout ld-r"></div>`).run();}

function mLin(el){sliders(el,[{k:'x',l:'x',min:2,max:7,step:.05,v:4.4},{k:'z',l:'zoom ×',min:1,max:8,step:1,v:1}],V=>{const f=Math.sqrt,Lx=x=>2+(x-4)/4;const w=4/V.z;const G=grid({x0:4-w,x1:4+w,y0:2-w/2.5,y1:2+w/2.5,u:200/w,uy:200/w*1.2,lab:100,laby:100});
  let s=curve(G,f,'#2563eb',3)+curve(G,Lx,'#e11d48',2.5,'6 4')+gdot(G,4,2,'#1f2937',6,'(4, 2)')+gdot(G,V.x,f(V.x),'#2563eb',6)+gdot(G,V.x,Lx(V.x),'#e11d48',6);
  $('.ln-g',el).innerHTML=G.svg(s);$('.ln-r',el).innerHTML=`Tangent line at 4: L(x) = 2 + (1/4)(x − 4).<br>√${nf(V.x)} = <b>${K.r3(f(V.x))}</b> · L(${nf(V.x)}) = <b>${K.r3(Lx(V.x))}</b> · error ${K.r3(Lx(V.x)-f(V.x))}<br>${Lx(V.x)>f(V.x)+1e-9?'The graph is concave down, so the tangent line sits <b>above</b>: L <b>overestimates</b>.':'At x = 4 they agree exactly.'}`;},`<div class="ln-g"></div><div class="readout ln-r"></div>`).run();}

const LH=[{t:'sin x / x, x → 0',f:Math.sin,g:x=>x,fp:Math.cos,gp:()=>1,a:0,L:'1'},{t:'(eˣ − 1)/x, x → 0',f:x=>Math.exp(x)-1,g:x=>x,fp:Math.exp,gp:()=>1,a:0,L:'1'},{t:'ln x/(x − 1), x → 1',f:Math.log,g:x=>x-1,fp:x=>1/x,gp:()=>1,a:1,L:'1'},{t:'(1 − cos x)/x², x → 0',f:x=>1-Math.cos(x),g:x=>x*x,fp:Math.sin,gp:x=>2*x,a:0,L:'1/2'}];
function mLH(el){K.pickSlide(el,LH,[{k:'h',l:'distance from a',min:0.01,max:1,step:.01,v:0.5}],(V,F)=>{const x=F.a+V.h;const G=grid({x0:F.a-1.5,x1:F.a+1.5,y0:-1.5,y1:1.5,u:120,uy:100,lab:1,laby:1});
  let s=curve(G,F.f,'#2563eb',3)+curve(G,F.g,'#059669',3)+line(G,F.fp(F.a),F.a,0,'#2563eb',1.5,'4 4')+line(G,F.gp(F.a)||0.0001,F.a,0,'#059669',1.5,'4 4')+gdot(G,x,F.f(x),'#2563eb',6)+gdot(G,x,F.g(x),'#059669',6);
  $('.lh-g',el).innerHTML=G.svg(s);$('.lh-r',el).innerHTML=`<span style="color:#2563eb">f</span> and <span style="color:#059669">g</span> both → 0 at x = ${F.a} (0/0).<br>f/g at x = ${K.r3(x)}: <b>${K.r3(F.f(x)/F.g(x))}</b> · f′/g′ at x = ${K.r3(x)}: <b>${K.r3(F.fp(x)/F.gp(x))}</b> → both approach <b>${F.L}</b>.<br><span class="mute">Near a, f and g look like their tangent lines, so their ratio looks like the ratio of slopes.</span>`;},`<div class="lh-g"></div><div class="readout lh-r"></div>`);}

/* ---------- lessons ---------- */
L['CA-4-1']={goal:'I can interpret a derivative in context, with correct units and a complete sentence.',
 life:{title:'What does the number mean?',html:'“W′(3) = 18” is just a number until you say: “At 3 minutes, the water in the tank is increasing at 18 liters per minute.” AP free-response questions reward exactly this sentence.'},
 see:[{title:'Water tank',hint:'Slide t. Read the value and the rate, and the sentence that interprets them.',mount:mTank}],
 vocab:[['Interpretation template','At [input value + units], the [output quantity] is [increasing/decreasing] at [|f′| + output units per input unit].'],['Units of f′','(units of f)/(units of x).'],['f(a) vs f′(a)','f(a) is an amount; f′(a) is a rate of change of that amount.'],['Sign','f′ > 0 increasing, f′ < 0 decreasing.']],
 examples:[ex('Example','T(h) = temperature (°F) at altitude h (thousand ft). T′(5) = −3.5.',[['at an altitude of 5000 ft,',''],['temperature is decreasing at 3.5 °F per thousand feet','Never say “the slope is −3.5”.']])],
 mistake:{bad:'P′(10) = 250 means there are 250 people at t = 10',good:'the population is growing at 250 people per year at t = 10',why:'A derivative is a rate, not an amount.'},
 practice(){const C2=pick([{f:'A(t)',w:'the amount of sand (tons) in a pile at t hours',u:'tons per hour',x:'hours',k:'the amount of sand'},{f:'R(p)',w:'revenue (dollars) at price p dollars',u:'dollars per dollar of price',x:'dollars',k:'revenue'},{f:'H(t)',w:'height of a plant (cm) after t days',u:'cm per day',x:'days',k:'the plant’s height'}]);
  const v=nz(-9,9),a=rand(2,12);return mc(`${C2.f} is ${C2.w}. ${C2.f[0]}′(${a}) = ${fmtNeg(v)}. Best interpretation:`,`At ${a} ${C2.x}, ${C2.k} is ${v>0?'increasing':'decreasing'} at ${Math.abs(v)} ${C2.u}.`,[`At ${a} ${C2.x}, ${C2.k} is ${Math.abs(v)}.`,`At ${a} ${C2.x}, ${C2.k} is ${v>0?'decreasing':'increasing'} at ${Math.abs(v)} ${C2.u}.`,`${C2.k} changes by ${fmtNeg(v)} over ${a} ${C2.x}.`],'A derivative is a rate at an instant; check the sign.');},
 check:[q('V(t) in gallons, t in minutes. Units of V′(t):',['gallons','minutes','gallons per minute','minutes per gallon'],2,''),q('f′(4) < 0 means f is ___ at x = 4.',['increasing','decreasing','zero','negative'],1,''),q('A complete interpretation includes…',['units only','a number only','the input, the quantity, direction, rate with units','the formula'],2,'')]};

L['CA-4-2']={goal:'I can use derivatives to analyze straight-line motion: velocity, speed, acceleration, direction, and speeding up or slowing down.',
 life:{title:'A car on a straight road',html:'Position s(t), velocity v = s′, acceleration a = v′. Knowing the signs tells you which way the car moves and whether the driver is pressing the gas or the brake.'},
 see:[{title:'Particle on a line',hint:'Slide t from 0 to 6. Watch it turn around at t = 2 and t = 4.',mount:mMotion}],
 vocab:[['Velocity','v(t) = s′(t); sign gives direction.'],['Speed','|v(t)|.'],['Acceleration','a(t) = v′(t) = s″(t).'],['Changes direction','v changes sign.'],['Speeding up / slowing down','v and a same sign → speeding up; opposite signs → slowing down.']],
 examples:[ex('Example','s(t) = t³ − 6t² + 9t. When is the particle moving left?',[['v = 3t² − 12t + 9 = 3(t − 1)(t − 3)',''],['v < 0 for 1 < t < 3','Sign chart.'],['moving left on (1, 3)','']])],
 mistake:{bad:'a < 0 means the object is slowing down',good:'compare the signs of v and a',why:'If v < 0 and a < 0, the object is speeding up (moving left faster).'},
 practice(){const r1=rand(1,3),r2=r1+rand(1,3),t=rand(0,r2+2);const v=x=>3*(x-r1)*(x-r2),a=x=>6*x-3*(r1+r2);const vt=v(t),at=a(t);
  if(Math.random()<0.5)return num(`v(t) = 3(t − ${r1})(t − ${r2}). Find v(${t}) and a(${t}).`,[[`v(${t}) =`,vt],[`a(${t}) =`,at]],'Expand v, then a = v′.',[[`v(t) = 3t² − ${3*(r1+r2)}t + ${3*r1*r2}`,''],[`a(t) = 6t − ${3*(r1+r2)}`,''],[`v(${t}) = ${vt}, a(${t}) = ${at}`,'']]);
  const ans=vt===0||at===0?'neither (v or a is 0)':vt*at>0?'speeding up':'slowing down';return mc(`v(t) = 3(t − ${r1})(t − ${r2}), a(t) = 6t − ${3*(r1+r2)}. At t = ${t} the particle is…`,ans,['speeding up','slowing down','neither (v or a is 0)'],`v(${t}) = ${vt}, a(${t}) = ${at}. Compare signs.`);},
 check:[q('Speed is…',['v','|v|','a','s'],1,''),q('v = 4, a = −2: the object is…',['speeding up','slowing down','turning around','at rest'],1,''),q('A particle changes direction when…',['a = 0','v changes sign','s = 0','speed is max'],1,'')]};

L['CA-4-3']={goal:'I can interpret rates of change in economics, biology, and science contexts (marginal cost, growth rates).',
 life:{title:'Marginal thinking',html:'Economists ask “what does <b>one more</b> unit cost?” That is the derivative of the cost function — marginal cost. The same idea measures how fast a population grows or a medicine clears.'},
 see:[{title:'Rates in different worlds',hint:'Pick a context and move the input. Read the units carefully.',mount:mOther}],
 vocab:[['Marginal cost','C′(x) ≈ cost of producing one more unit.'],['Marginal revenue/profit','R′(x), P′(x) similarly.'],['Growth rate','P′(t): individuals per unit time.'],['Relative growth rate','P′(t)/P(t): percent per unit time.']],
 examples:[ex('Example','C(x) = 0.01x² + 5x + 400. Interpret C′(100).',[['C′(x) = 0.02x + 5, C′(100) = 7',''],['making the 101st unit costs about $7','Units: dollars per unit.']])],
 mistake:{bad:'C′(100) is the cost of 100 units',good:'C(100) is the cost of 100 units; C′(100) is the cost per additional unit',why:'Keep amounts and rates separate.'},
 practice(){const a=rand(1,5)/100,b=rand(2,9),c=rand(100,900),x=rand(5,30)*10;const d=2*a*x+b;
  return num(`C(x) = ${a}x² + ${b}x + ${c} dollars for x units. Find the marginal cost C′(${x}).`,[[`C′(${x}) =`,+d.toFixed(2),0.011]],'Differentiate, then substitute.',[[`C′(x) = ${2*a}x + ${b}`,''],[`C′(${x}) = $${d.toFixed(2)} per unit`,'']]);},
 check:[q('Marginal cost is…',['C(x)/x','C′(x)','C(x)','C″(x)'],1,''),q('P in thousands of people, t in years. Units of P′:',['thousand people','years','thousand people per year','percent'],2,''),q('P′(t) < 0 means the population is…',['zero','decreasing','increasing','constant'],1,'')]};

L['CA-4-4']={goal:'I can solve related-rates problems by writing an equation between quantities and differentiating with respect to time.',
 life:{title:'Ripples in a pond',html:'A stone hits the water; the circular ripple grows at 2 cm/s. How fast is the <b>area</b> growing? Radius and area are related by A = πr², so their rates are related too.'},
 see:[{title:'Growing ripple',hint:'Slide t. dr/dt stays 2, but dA/dt keeps increasing.',mount:mRipple}],
 vocab:[['Related rates','Two or more quantities change with time, linked by an equation; their rates are linked by its derivative.'],['Steps','(1) Draw and label. (2) Write the equation. (3) Differentiate with respect to t. (4) Substitute values at the instant. (5) Solve, with units.'],['Substitute last','Plug in the instant’s numbers only after differentiating.'],['Common equations','A = πr², V = (4/3)πr³, Pythagorean theorem, similar triangles.']],
 examples:[ex('Example','A sphere’s radius grows at 0.5 cm/s. Find dV/dt when r = 3.',[['V = (4/3)πr³',''],['dV/dt = 4πr² · dr/dt','Differentiate with respect to t.'],['= 4π(9)(0.5) = 18π ≈ 56.5 cm³/s','']])],
 mistake:{bad:'substitute r = 3 into V first: V = 36π, so dV/dt = 0',good:'differentiate first, then substitute',why:'Plugging in too early freezes a changing quantity into a constant.'},
 practice(){const T=pick(['circle','sphere','square']);const r=rand(2,9),k=rand(1,5);
  if(T==='circle')return num(`A circle’s radius increases at ${k} cm/s. How fast is the area increasing when r = ${r} cm? (decimal, 2 places)`,[['dA/dt ≈',+(2*PI*r*k).toFixed(2),0.05]],'dA/dt = 2πr·dr/dt.',[[`2π(${r})(${k}) = ${2*r*k}π ≈ ${(2*PI*r*k).toFixed(2)} cm²/s`,'']]);
  if(T==='sphere')return num(`A spherical balloon’s radius grows at ${k} cm/s. Find dV/dt when r = ${r} cm. (decimal, 1 place)`,[['dV/dt ≈',+(4*PI*r*r*k).toFixed(1),0.2]],'V = (4/3)πr³ → dV/dt = 4πr²·dr/dt.',[[`4π(${r*r})(${k}) = ${4*r*r*k}π ≈ ${(4*PI*r*r*k).toFixed(1)} cm³/s`,'']]);
  return num(`A square’s side grows at ${k} in/min. How fast is the area growing when the side is ${r} in?`,[['dA/dt =',2*r*k]],'A = s² → dA/dt = 2s·ds/dt.',[[`2(${r})(${k}) = ${2*r*k} in²/min`,'']]);},
 check:[q('In related rates, differentiate with respect to…',['x','r','t (time)','the answer'],2,''),q('For A = πr², dA/dt =',['2πr','2πr·dr/dt','πr²·dr/dt','2π·dr/dt'],1,''),q('When should you substitute the instant’s values?',['before differentiating','after differentiating','never','only for constants'],1,'')]};

L['CA-4-5']={goal:'I can solve harder related-rates problems using the Pythagorean theorem, similar triangles, and trigonometry.',
 life:{title:'The sliding ladder',html:'A ladder leans on a wall and its bottom slides away at a steady 1 ft/s. Does the top fall at a steady rate? No — it falls faster and faster. The Pythagorean theorem explains why.'},
 see:[{title:'Sliding ladder',hint:'Slide the bottom outward. Watch dy/dt grow in size.',mount:mLadder}],
 vocab:[['Pythagorean','x² + y² = z² → 2x·x′ + 2y·y′ = 2z·z′.'],['Similar triangles','Use proportions to remove an extra variable before differentiating (cones, shadows).'],['Cone','V = (1/3)πr²h; with r/h fixed, write V in terms of h only.'],['Angles','tan θ = opposite/adjacent → sec²θ·θ′ = …']],
 examples:[ex('Cone','Water drains from a cone (height 12, radius 4) at 2 ft³/min. Find dh/dt when h = 6.',[['r/h = 4/12 → r = h/3','Similar triangles.'],['V = (1/3)π(h/3)²h = πh³/27',''],['dV/dt = (π h²/9)·dh/dt → −2 = (36π/9)dh/dt',''],['dh/dt = −1/(2π) ≈ −0.159 ft/min','']])],
 mistake:{bad:'treat the ladder length as changing',good:'the ladder length is constant (z′ = 0)',why:'Identify which quantities change and which stay fixed before differentiating.'},
 practice(){const tr=pick([[6,8,10],[5,12,13],[8,6,10],[9,12,15]]);const k=rand(1,4);const x=tr[0],y=tr[1],L=tr[2];
  return num(`A ${L}-ft ladder slides; its bottom moves away from the wall at ${k} ft/s. How fast is the top sliding down when the bottom is ${x} ft from the wall? (give dy/dt; fraction or decimal)`,[['dy/dt =',-x*k/y,0.011]],'x² + y² = L² → x x′ + y y′ = 0.',[[`y = √(${L*L} − ${x*x}) = ${y}`,''],[`dy/dt = −(${x}/${y})(${k}) = ${frac(-x*k,y)} ft/s`,'Negative: the top moves down.']]);},
 check:[q('For a ladder of fixed length z, dz/dt =',['1','0','x′','y′'],1,''),q('To relate r and h in a cone, use…',['Pythagoras','similar triangles','the chain rule only','area'],1,''),q('A negative dy/dt for the ladder top means it is…',['rising','falling','stopped','sliding out'],1,'')]};

L['CA-4-6']={goal:'I can use the tangent line (local linear approximation) to estimate function values and decide whether the estimate is over or under.',
 life:{title:'Mental math with calculus',html:'√4.4 is hard; √4 = 2 is easy. Near x = 4, the curve y = √x is almost its tangent line, so √4.4 ≈ 2 + (1/4)(0.4) = 2.1. (Actual: 2.0976.)'},
 see:[{title:'Tangent line vs. curve',hint:'Move x and zoom in around 4. The closer you are, the better the line.',mount:mLin}],
 vocab:[['Linearization','L(x) = f(a) + f′(a)(x − a).'],['Use','f(x) ≈ L(x) for x near a.'],['Over or under','f concave down near a → tangent above → overestimate; concave up → underestimate.'],['Differentials','dy = f′(x) dx estimates Δy.']],
 examples:[ex('Example','Estimate ∛8.3 with f(x) = ∛x at a = 8.',[['f(8) = 2, f′(x) = 1/(3x^(2/3)), f′(8) = 1/12',''],['L(8.3) = 2 + (1/12)(0.3) = 2.025',''],['f″ < 0 → overestimate','Actual ≈ 2.0249.']])],
 mistake:{bad:'L(x) = f′(a)(x − a)',good:'L(x) = f(a) + f′(a)(x − a)',why:'Start from the known value f(a), then add the change.'},
 practice(){const a=pick([4,9,16,25,36]),r=Math.sqrt(a),dx=pick([-0.4,-0.3,-0.2,0.2,0.3,0.5]);const x=+(a+dx).toFixed(1),L2=r+dx/(2*r);
  if(Math.random()<0.6)return num(`Use the tangent line to f(x) = √x at x = ${a} to estimate √${x}. (4 decimals)`,[[`√${x} ≈`,+L2.toFixed(4),0.0006]],'L(x) = f(a) + f′(a)(x − a), f′(x) = 1/(2√x).',[[`L(x) = ${r} + (1/${2*r})(x − ${a})`,''],[`L(${x}) = ${r} + ${K.r3(dx/(2*r))} ≈ ${L2.toFixed(4)}`,'']]);
  const T=pick([{f:'f″ < 0 near a',a:'overestimate'},{f:'f″ > 0 near a',a:'underestimate'},{f:'f(x) = x³ near a = 2',a:'underestimate'},{f:'f(x) = ln x near a = 1',a:'overestimate'}]);return mc(`A tangent-line estimate with ${T.f} is an…`,T.a,['overestimate','underestimate','exact value'],'Concave down → line above the curve.');},
 check:[q('L(x) = ',['f(a) + f′(a)(x − a)','f′(a)(x − a)','f(x) + f′(x)','f(a)·x'],0,''),q('Concave up means the tangent line gives an…',['overestimate','underestimate','exact value','error'],1,''),q('Linear approximation works best when x is…',['far from a','close to a','negative','an integer'],1,'')]};

L['CA-4-7']={goal:'I can use L’Hôpital’s rule to evaluate limits of the indeterminate forms 0/0 and ∞/∞.',
 life:{title:'Race to zero',html:'When both top and bottom head to 0, the winner is the one getting there <b>faster</b>. Speed means derivative — so compare f′ and g′.'},
 see:[{title:'Compare the slopes',hint:'Pick a limit and move toward a. f/g and f′/g′ approach the same value.',mount:mLH}],
 vocab:[['L’Hôpital’s rule','If f/g → 0/0 or ±∞/±∞, then lim f/g = lim f′/g′ (if the right side exists).'],['Check first','Only use it on 0/0 or ∞/∞ — verify by substitution.'],['Separate derivatives','Differentiate top and bottom separately. Not the quotient rule!'],['Repeat','If f′/g′ is still indeterminate, apply again.']],
 examples:[ex('Example','lim_{x→0} (e^(2x) − 1)/x',[['0/0 ✓',''],['= lim 2e^(2x)/1','Differentiate top and bottom.'],['= 2','']]),ex('∞/∞','lim_{x→∞} x²/eˣ',[['∞/∞ → 2x/eˣ → 2/eˣ → 0','Applied twice: exponentials beat polynomials.']])],
 mistake:{bad:'lim (x + 1)/(x + 2) as x → 0 = lim 1/1 = 1',good:'= 1/2 by substitution',why:'This is not 0/0, so L’Hôpital does not apply.'},
 practice(){const T=pick(['exp','sin','poly']);
  if(T==='exp'){const k=rand(2,6),m=rand(1,4);return num(`Find lim<sub>x→0</sub> (e^(${k}x) − 1)/(${m===1?'':m}x). (fraction or decimal)`,[['limit =',k/m,0.011]],'0/0: differentiate top and bottom.',[[`${k}e^(${k}x)/${m} → ${frac(k,m)}`,'']]);}
  if(T==='sin'){const a=rand(2,7),b=rand(2,7);return num(`Find lim<sub>x→0</sub> sin(${a}x)/sin(${b}x). (fraction or decimal)`,[['limit =',a/b,0.011]],'0/0: L’Hôpital once.',[[`${a}cos(${a}x)/(${b}cos(${b}x)) → ${frac(a,b)}`,'']]);}
  const a=rand(1,5),b=nz(-4,4);return num(`Find lim<sub>x→${a}</sub> (x³ − ${a**3})/(x − ${a}).`,[['limit =',3*a*a]],'0/0: differentiate.',[[`3x²/1 → ${3*a*a}`,'']]);},
 check:[q('L’Hôpital applies to…',['any limit','0/0 and ∞/∞','1/0','0·5'],1,''),q('Under L’Hôpital, you differentiate…',['f/g with the quotient rule','top and bottom separately','only the top','only the bottom'],1,''),q('lim_{x→0} sin x / x by L’Hôpital =',['0','1','cos 0 / 0','∞'],1,'')]};

TOOLS['CA-4']={title:'Particle motion',hint:'Slide t: position, velocity, acceleration, direction, and total distance update together.',mount:mMotion};
})();
