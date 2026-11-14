/* Pre-Calculus · Unit 4 · Parametric equations and polar coordinates */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,graphLab,chooser,curve,hline,vline,hole,ps,pmul,cs,circleFig}=A2;const C=PC,PI=Math.PI;const {stepper}=KA;const M=C.mat;
const PM=[{t:'x = t, y = t²',x:t=>t,y:t=>t*t,a:-2.5,b:2.5,n:'Eliminate t: y = x². A parabola traced left to right.'},{t:'x = 3cos t, y = 3sin t',x:t=>3*Math.cos(t),y:t=>3*Math.sin(t),a:0,b:2*PI,n:'cos² + sin² = 1 → x² + y² = 9. Counterclockwise circle.'},{t:'x = 4cos t, y = 2sin t',x:t=>4*Math.cos(t),y:t=>2*Math.sin(t),a:0,b:2*PI,n:'(x/4)² + (y/2)² = 1: an ellipse.'},{t:'x = 2t, y = 6t − 4.9t²/2',x:t=>2*t,y:t=>6*t-2.45*t*t,a:0,b:2.45,n:'A projectile: x grows steadily, y rises then falls.'},{t:'x = t − sin t, y = 1 − cos t',x:t=>t-Math.sin(t),y:t=>1-Math.cos(t),a:0,b:4*PI,n:'A cycloid: path of a point on a rolling wheel.'}];
const PG=[{t:'r = 2',r:()=>2,n:'Circle of radius 2.'},{t:'r = 4 cos θ',r:t=>4*Math.cos(t),n:'Circle through the origin, center (2, 0). Traced once on [0, π].'},{t:'r = 2 + 2cos θ',r:t=>2+2*Math.cos(t),n:'Cardioid (heart): a = b in r = a + b cos θ.'},{t:'r = 1 + 2sin θ',r:t=>1+2*Math.sin(t),n:'Limaçon with inner loop (|a| < |b|).'},{t:'r = 3 sin 2θ',r:t=>3*Math.sin(2*t),n:'Rose: n = 2 even → 2n = 4 petals.'},{t:'r = 3 cos 3θ',r:t=>3*Math.cos(3*t),n:'Rose: n = 3 odd → 3 petals.'},{t:'r = θ/2',r:t=>t/2,n:'Spiral of Archimedes.'}];
function mPolarPt(el){sliders(el,[{k:'r',l:'r',min:-4,max:4,step:.5,v:3},{k:'t',l:'θ (degrees)',min:0,max:360,step:15,v:60}],V=>{const G=C.polarGrid(4,36);const t=C.rad(V.t),x=V.r*Math.cos(t),y=V.r*Math.sin(t);
  let s=`<line x1="${G.X(0)}" y1="${G.Y(0)}" x2="${G.X(4.2*Math.cos(t))}" y2="${G.Y(4.2*Math.sin(t))}" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4"/>`+C.arrow(G,[0,0],[x,y],'#2563eb',3)+gdot(G,x,y,'#e11d48',7,`(${nf(V.r)}, ${C.piStr(t)})`);
  $('.pp-g',el).innerHTML=G.svg(s);$('.pp-r',el).innerHTML=`Polar (r, θ) = (${nf(V.r)}, ${V.t}°) → rectangular <b>(${nf(x)}, ${nf(y)})</b> using x = r cos θ, y = r sin θ.<br>${V.r<0?'<b>r < 0</b>: point is on the opposite side of the origin from the θ ray (orange).':'Back to polar: r = √(x² + y²), tan θ = y/x.'}`;},`<div class="pp-g"></div><div class="readout pp-r"></div>`).run();}
function mPolarGraph(el){let k=2;el.innerHTML=`<div class="row">${PG.map((x,i)=>`<button data-k="${i}">${x.t}</button>`).join('')}</div><div class="pg-s"></div>`;
 const sp=sliders($('.pg-s',el),[{k:'t',l:'trace θ up to (°)',min:0,max:720,step:5,v:360}],V=>{const F=PG[k],G=C.polarGrid(4,36),T=C.rad(V.t);const rr=F.r(T);
  let s=C.polar(G,F.r,0,4*PI,'#e5e7eb',2)+C.polar(G,F.r,0,Math.max(0.001,T),'#2563eb',3)+`<line x1="${G.X(0)}" y1="${G.Y(0)}" x2="${G.X(rr*Math.cos(T))}" y2="${G.Y(rr*Math.sin(T))}" stroke="#e11d48" stroke-width="2"/>`+gdot(G,rr*Math.cos(T),rr*Math.sin(T),'#e11d48',6);
  $('.pg-g',el).innerHTML=G.svg(s);$('.pg-r',el).innerHTML=`<b>${F.t}</b>: at θ = ${V.t}°, r = ${nf(rr)}. ${F.n}`;},`<div class="pg-g"></div><div class="readout pg-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;k=+b.dataset.k;$$('[data-k]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$$('[data-k]',el)[k].classList.add('sel');sp.run();}
function mParam(el){let k=0;el.innerHTML=`<div class="row">${PM.map((x,i)=>`<button data-k="${i}">${x.t}</button>`).join('')}</div><div class="pm-s"></div>`;
 const sp=sliders($('.pm-s',el),[{k:'p',l:'time t (% of range)',min:0,max:100,v:60}],V=>{const F=PM[k],G=grid({x0:-5,x1:13,y0:-4,y1:7,u:26,lab:2,laby:2});const T=F.a+(F.b-F.a)*V.p/100;
  let s=C.pcurve(G,F.x,F.y,F.a,F.b,'#e5e7eb',2)+C.pcurve(G,F.x,F.y,F.a,Math.max(F.a+1e-3,T),'#2563eb',3)+gdot(G,F.x(T),F.y(T),'#e11d48',7,`t = ${nf(T)}`);
  $('.pm-g',el).innerHTML=G.svg(s);$('.pm-r',el).innerHTML=`At t = ${nf(T)}: (x, y) = (<b>${nf(F.x(T))}</b>, <b>${nf(F.y(T))}</b>). ${F.n}<br><span class="mute">The parameter t carries extra information — <b>when</b> and in which <b>direction</b> the point moves.</span>`;},`<div class="pm-g"></div><div class="readout pm-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;k=+b.dataset.k;$$('[data-k]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$('[data-k]',el).classList.add('sel');sp.run();}
/* eliminate the parameter: parametric trace vs. full Cartesian curve */
const EL=[{t:'x = √t, y = t',x:t=>Math.sqrt(t),y:t=>t,a:0,b:6,f:x=>x*x,eq:'y = x²',note:'√t is never negative, so only the <b>right half</b> (x ≥ 0) of y = x² is traced.'},
 {t:'x = 2 + 3cos t, y = −1 + 3sin t',x:t=>2+3*Math.cos(t),y:t=>-1+3*Math.sin(t),a:0,b:2*PI,f:null,c:[2,-1,3],eq:'(x − 2)² + (y + 1)² = 9',note:'cos t = (x − 2)/3, sin t = (y + 1)/3, then cos² t + sin² t = 1.'},
 {t:'x = eᵗ, y = e²ᵗ + 1',x:t=>Math.exp(t),y:t=>Math.exp(2*t)+1,a:-3,b:1,f:x=>x*x+1,eq:'y = x² + 1',note:'eᵗ > 0, so only x > 0 is traced.'},
 {t:'x = 1 + 2t, y = 3 − t',x:t=>1+2*t,y:t=>3-t,a:-3,b:3,f:x=>3-(x-1)/2,eq:'y = −x/2 + 7/2',note:'t = (x − 1)/2 from the x-equation; substitute into y.'},
 {t:'x = sin t, y = cos 2t',x:t=>Math.sin(t),y:t=>Math.cos(2*t),a:0,b:2*PI,f:x=>1-2*x*x,eq:'y = 1 − 2x²',note:'cos 2t = 1 − 2sin² t. Since −1 ≤ sin t ≤ 1, only −1 ≤ x ≤ 1 is traced.'}];
function mElim(el){let k=0;el.innerHTML=`<div class="row">${EL.map((x,i)=>`<button data-k="${i}">${x.t}</button>`).join('')}</div><div class="el-s"></div>`;
 const sp=sliders($('.el-s',el),[{k:'p',l:'t (% of range)',min:0,max:100,v:100}],V=>{const F=EL[k],G=grid({x0:-4,x1:6,y0:-5,y1:7,u:30,lab:2,laby:2});const T=F.a+(F.b-F.a)*V.p/100;
  let s=F.f?curve(G,F.f,'#cbd5e1',6):`<circle cx="${G.X(F.c[0])}" cy="${G.Y(F.c[1])}" r="${F.c[2]*30}" fill="none" stroke="#cbd5e1" stroke-width="6"/>`;
  s+=C.pcurve(G,F.x,F.y,F.a,Math.max(F.a+1e-3,T),'#2563eb',3)+gdot(G,F.x(T),F.y(T),'#e11d48',7,`t = ${nf(T)}`);
  $('.el-g',el).innerHTML=G.svg(s);$('.el-r',el).innerHTML=`Cartesian equation (thick gray): <b>${F.eq}</b><br>${F.note}`;},`<div class="el-g"></div><div class="readout el-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;k=+b.dataset.k;$$('[data-k]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$('[data-k]',el).classList.add('sel');sp.run();}
/* polar ↔ rectangular equations: same picture, two equations */
const CV=[{p:'r = 3',r:t=>3,rect:'x² + y² = 9',how:'r² = x² + y², so r = 3 → x² + y² = 9.',chk:(x,y)=>x*x+y*y-9},
 {p:'r = 4 cos θ',r:t=>4*Math.cos(t),rect:'(x − 2)² + y² = 4',how:'Multiply by r: r² = 4r cos θ → x² + y² = 4x → complete the square.',chk:(x,y)=>(x-2)**2+y*y-4},
 {p:'r sin θ = 2',r:t=>Math.abs(Math.sin(t))<0.05?NaN:2/Math.sin(t),rect:'y = 2',how:'r sin θ is y.',chk:(x,y)=>y-2},
 {p:'r = 2/(cos θ + sin θ)',r:t=>Math.abs(Math.cos(t)+Math.sin(t))<0.05?NaN:2/(Math.cos(t)+Math.sin(t)),rect:'x + y = 2',how:'Multiply out: r cos θ + r sin θ = 2 → x + y = 2.',chk:(x,y)=>x+y-2},
 {p:'r = 6 sin θ',r:t=>6*Math.sin(t),rect:'x² + (y − 3)² = 9',how:'r² = 6r sin θ → x² + y² = 6y → x² + (y − 3)² = 9.',chk:(x,y)=>x*x+(y-3)**2-9}];
function mConvert(el){let k=0;el.innerHTML=`<div class="row">${CV.map((x,i)=>`<button data-k="${i}">${x.p}</button>`).join('')}</div><div class="cv-s"></div>`;
 const sp=sliders($('.cv-s',el),[{k:'t',l:'θ (°)',min:0,max:180,step:5,v:60}],V=>{const F=CV[k],G=C.polarGrid(6,26);const t=C.rad(V.t),r=F.r(t);
  let s=C.polar(G,F.r,0,PI,'#2563eb',3);let rd='';
  if(isFinite(r)&&Math.abs(r)<12){const x=r*Math.cos(t),y=r*Math.sin(t);s+=`<line x1="${G.X(0)}" y1="${G.Y(0)}" x2="${G.X(x)}" y2="${G.Y(y)}" stroke="#f59e0b" stroke-width="2"/>`+gdot(G,x,y,'#e11d48',7);
   rd=`At θ = ${V.t}°: r = ${nf(r)} → (x, y) = (r cos θ, r sin θ) = (<b>${nf(x)}</b>, <b>${nf(y)}</b>). Plug into ${F.rect}: ${Math.abs(F.chk(x,y))<1e-6?'<span class="good">✓ it fits</span>':'off by '+nf(F.chk(x,y))}.`;}else rd=`At θ = ${V.t}° the curve has no point (r is undefined there).`;
  $('.cv-g',el).innerHTML=G.svg(s);$('.cv-r',el).innerHTML=`<b>${F.p}</b> ⟺ <b>${F.rect}</b><br>${F.how}<br>${rd}`;},`<div class="cv-g"></div><div class="readout cv-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;k=+b.dataset.k;$$('[data-k]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$('[data-k]',el).classList.add('sel');sp.run();}

L['PC-4-1']={goal:'I can graph parametric equations, show direction, and eliminate the parameter.',
 life:{title:'Tracking a ball',html:'A video tracks a soccer ball frame by frame: at time t it is at (x(t), y(t)). Parametric equations describe <b>where</b> and <b>when</b> — information a single y = f(x) loses.'},
 see:[{title:'Parametric motion',hint:'Choose a curve. Slide the time.',mount:mParam}],
 vocab:[['Parameter','The extra variable, usually t (time).'],['Parametric equations','x = f(t), y = g(t).'],['Orientation','The direction the curve is traced as t increases.'],['Eliminate the parameter','Combine the equations into one in x and y.']],
 examples:[ex('Example','x = t + 1, y = t² − 2. Eliminate t.',[['t = x − 1','Solve the simpler equation.'],['y = (x − 1)² − 2','Substitute.'],['parabola, vertex (1, −2)','']]),
  ex('Example 2','x = 2cos t, y = 5 sin t.',[['cos t = x/2, sin t = y/5',''],['x²/4 + y²/25 = 1','Pythagorean identity.']])],
 mistake:{bad:'x = cos t, y = cos² t is the whole parabola y = x²',good:'only −1 ≤ x ≤ 1',why:'The parameter restricts x: cos t never leaves [−1, 1].'},
 practice(){const a=nz(-3,3),b=rand(-4,4),c=nz(-3,3),d=rand(-4,4),t=rand(-3,3);return num(`x = ${A2.ps([a,b],'t')}, y = ${A2.ps([c,0,d],'t')}. Find the point (x, y) when t = ${t}.`,[['x =',a*t+b],['y =',c*t*t+d]],'Substitute t into both equations.',[[`x = ${a}(${t}) ${b<0?'−':'+'} ${Math.abs(b)} = ${a*t+b}`,''],[`y = ${c}(${t})² ${d<0?'−':'+'} ${Math.abs(d)} = ${c*t*t+d}`,'']]);},
 check:[q('x = 3cos t, y = 3sin t traces a…',['line','circle of radius 3','parabola','ellipse 3 by 1'],1,''),q('x = t, y = 2t + 1 is the line…',['y = 2x + 1','y = x + 2','x = 2y + 1','y = t'],0,''),q('What does a parametric curve show that y = f(x) doesn\'t?',['the x-intercepts','direction and timing','the domain','slope'],1,'')]};

L['PC-4-2']={goal:'I can eliminate the parameter using substitution or a trig identity, and state which part of the curve is actually traced.',
 life:{title:'Ride path vs. ride timing',html:'A Ferris-wheel seat follows x = 20cos t, y = 25 + 20sin t. Removing t gives the <b>shape</b> of the path — a circle — but you lose the timing. Sometimes the parameter also limits <b>how much</b> of the shape you get.'},
 see:[{title:'Trace vs. full curve',hint:'Pick a pair. Slide t to 100% and compare the blue trace with the gray Cartesian curve.',mount:mElim}],
 vocab:[['Substitution method','Solve one equation for t, substitute into the other.'],['Identity method','Isolate cos t and sin t, then use cos² t + sin² t = 1.'],['Restricted trace','The parameter may limit x or y (e.g. √t ≥ 0, eᵗ > 0, −1 ≤ sin t ≤ 1).'],['Parametrizing','Going backwards: e.g. a line through P in direction ⟨a, b⟩ is x = x₀ + at, y = y₀ + bt.']],
 examples:[ex('Example 1','x = 3t − 1, y = t² + 2. Eliminate t.',[['t = (x + 1)/3','Solve the linear one.'],['y = ((x + 1)/3)² + 2','Substitute.'],['= (x + 1)²/9 + 2','Parabola, vertex (−1, 2).']]),
  ex('Example 2','x = 4 + 2cos t, y = 1 + 5sin t.',[['cos t = (x − 4)/2, sin t = (y − 1)/5','Isolate.'],['(x − 4)²/4 + (y − 1)²/25 = 1','cos² + sin² = 1: an ellipse.']]),
  ex('Example 3','Parametrize the line through (2, −1) and (5, 3).',[['direction ⟨3, 4⟩','Subtract points.'],['x = 2 + 3t, y = −1 + 4t','Start at the first point; t = 1 reaches the second.']])],
 mistake:{bad:'x = √t, y = t is the parabola y = x²',good:'only the half with x ≥ 0',why:'√t can never be negative. Always ask what values x and y can actually take.'},
 practice(){if(Math.random()<0.5){const a=pick([2,3,-2,4]),b=rand(-5,5),c=nz(-3,3),d=rand(-5,5),x=a*rand(-3,3)+b;const t=(x-b)/a,y=c*t*t+d;
   return num(`x = ${A2.ps([a,b],'t')}, y = ${A2.ps([c,0,d],'t')}. After eliminating t, find y when x = ${fmtNeg(x)}.`,[['y =',y]],'Solve the x-equation for t, then substitute.',[[`t = (x ${b<0?'+':'−'} ${Math.abs(b)})/${a<0?'('+a+')':a} = ${nf(t)}`,''],[`y = ${c}(${nf(t)})² ${d<0?'−':'+'} ${Math.abs(d)} = ${nf(y)}`,'']]);}
  const h=nz(-4,4),k=nz(-4,4),a=rand(2,5),b=rand(2,5);
  return mc(`x = ${fmtNeg(h)} + ${a}cos t, y = ${fmtNeg(k)} + ${b}sin t. Which Cartesian equation?`,`(x ${h<0?'+':'−'} ${Math.abs(h)})²/${a*a} + (y ${k<0?'+':'−'} ${Math.abs(k)})²/${b*b} = 1`,[`(x ${h<0?'−':'+'} ${Math.abs(h)})²/${a*a} + (y ${k<0?'−':'+'} ${Math.abs(k)})²/${b*b} = 1`,`(x ${h<0?'+':'−'} ${Math.abs(h)})²/${a} + (y ${k<0?'+':'−'} ${Math.abs(k)})²/${b} = 1`,`(x ${h<0?'+':'−'} ${Math.abs(h)})²/${a*a} − (y ${k<0?'+':'−'} ${Math.abs(k)})²/${b*b} = 1`],'Isolate cos t and sin t, then use cos² t + sin² t = 1.');},
 check:[q('x = cos t, y = sin t eliminates to…',['y = x','x² + y² = 1','x + y = 1','y = x²'],1,''),q('x = t², y = t⁴. Which part of y = x² is traced?',['all of it','x ≥ 0 only','x ≤ 0 only','none'],1,'t² ≥ 0.'),q('A line through (1, 2) with direction ⟨4, −1⟩:',['x = 1 + 4t, y = 2 − t','x = 4 + t, y = −1 + 2t','x = 1 − t, y = 2 + 4t','x = 4t, y = −t'],0,'')]};

L['PC-4-3']={goal:'I can plot points in polar coordinates and convert between polar and rectangular form.',
 life:{title:'Radar screens',html:'A radar reports "aircraft at 40 km, bearing 60°" — a distance and an angle. That is a <b>polar</b> coordinate: (r, θ) instead of (x, y).'},
 see:[{title:'Polar point',hint:'Change r and θ. Try a negative r.',mount:mPolarPt}],
 vocab:[['Polar coordinates','(r, θ): distance r from the pole, angle θ from the polar axis.'],['To rectangular','x = r cos θ, y = r sin θ.'],['To polar','r² = x² + y², tan θ = y/x.'],['Not unique','(r, θ) = (r, θ + 2π) = (−r, θ + π).']],
 examples:[ex('Example 1','Convert (4, 2π/3) to rectangular.',[['x = 4cos(2π/3) = −2',''],['y = 4sin(2π/3) = 2√3 ≈ 3.46','']]),
  ex('Example 2','Convert x² + y² = 6y to polar.',[['r² = 6r sin θ','Substitute.'],['r = 6 sin θ','Divide by r.']])],
 mistake:{bad:'(−3, −3) has θ = tan⁻¹(1) = π/4',good:'θ = 5π/4 (quadrant III)',why:'tan⁻¹ only returns quadrants I and IV. Check the quadrant of the point.'},
 practice(){const r=rand(1,6),d=pick([30,45,60,120,135,150,210,240,300,330]);const t=C.rad(d);return num(`Convert the polar point (${r}, ${C.piStr(t)}) to rectangular (2 decimals).`,[['x ≈',+(r*Math.cos(t)).toFixed(2),0.02],['y ≈',+(r*Math.sin(t)).toFixed(2),0.02]],'x = r cos θ, y = r sin θ.',[[`x = ${r}cos(${C.piStr(t)}) ≈ ${(r*Math.cos(t)).toFixed(2)}`,''],[`y = ${r}sin(${C.piStr(t)}) ≈ ${(r*Math.sin(t)).toFixed(2)}`,'']]);},
 check:[q('(2, π) in rectangular is…',['(2, 0)','(−2, 0)','(0, 2)','(0, −2)'],1,''),q('r for the point (3, 4)?',['7','5','12','1'],1,''),q('(−2, π/2) is the same point as…',['(2, π/2)','(2, 3π/2)','(−2, 0)','(2, π)'],1,'')]};

L['PC-4-4']={goal:'I can rewrite equations between polar and rectangular form using x = r cos θ, y = r sin θ, and r² = x² + y².',
 life:{title:'Two languages, one shape',html:'A circle centered off the origin is messy in x and y but simple in polar: r = 4 cos θ. A horizontal line is simple in x and y but messy in polar. Choosing the right language makes a problem easy.'},
 see:[{title:'Same curve, two equations',hint:'Pick an equation. Slide θ and check the point in the rectangular equation.',mount:mConvert}],
 vocab:[['Key swaps','x = r cos θ, y = r sin θ, x² + y² = r², tan θ = y/x.'],['Multiply by r','Creates r cos θ or r² so you can swap them for x or x² + y².'],['Completing the square','Turns x² + y² = 4x into a circle equation.']],
 examples:[ex('Example 1','Convert r = 8 sin θ to rectangular.',[['r² = 8r sin θ','Multiply by r.'],['x² + y² = 8y','Swap.'],['x² + (y − 4)² = 16','Circle, center (0, 4), radius 4.']]),
  ex('Example 2','Convert y = 3x to polar.',[['r sin θ = 3r cos θ','Swap.'],['tan θ = 3','Divide by r cos θ.'],['θ = tan⁻¹ 3','A line through the pole.']]),
  ex('Example 3','Convert x = 5 to polar.',[['r cos θ = 5',''],['r = 5 sec θ','Solve for r.']])],
 mistake:{bad:'r = 4 cos θ → x² + y² = 4 cos θ',good:'multiply by r first: x² + y² = 4x',why:'Every θ must disappear. r cos θ becomes x only when the r is there.'},
 practice(){const a=nz(-6,6),T=pick(['cos','sin','circle','line']);
  if(T==='circle')return mc(`Convert r = ${a} to rectangular form.`,`x² + y² = ${a*a}`,[`x² + y² = ${Math.abs(a)}`,`x + y = ${a}`,`x² − y² = ${a*a}`],'r² = x² + y².');
  if(T==='line'){const b=pick([2,3,-2,-3,4]);return mc(`Convert y = ${b}x to polar form.`,`tan θ = ${b}`,[`r = ${b}`,`r = ${b} cos θ`,`sin θ = ${b}`],'Replace y and x, divide by r cos θ.');}
  const h=a/2;return mc(`Convert r = ${a} ${T} θ to rectangular form.`,T==='cos'?`(x ${h<0?'+':'−'} ${nf(Math.abs(h))})² + y² = ${nf(h*h)}`:`x² + (y ${h<0?'+':'−'} ${nf(Math.abs(h))})² = ${nf(h*h)}`,T==='cos'?[`x² + (y ${h<0?'+':'−'} ${nf(Math.abs(h))})² = ${nf(h*h)}`,`(x ${h<0?'−':'+'} ${nf(Math.abs(h))})² + y² = ${nf(h*h)}`,`(x ${h<0?'+':'−'} ${nf(Math.abs(h))})² + y² = ${nf(Math.abs(a))}`]:[`(x ${h<0?'+':'−'} ${nf(Math.abs(h))})² + y² = ${nf(h*h)}`,`x² + (y ${h<0?'−':'+'} ${nf(Math.abs(h))})² = ${nf(h*h)}`,`x² + (y ${h<0?'+':'−'} ${nf(Math.abs(h))})² = ${nf(Math.abs(a))}`],'Multiply by r, swap, then complete the square.');},
 check:[q('r cos θ equals…',['x','y','r²','tan θ'],0,''),q('x² + y² = 25 in polar is…',['r = 25','r = 5','θ = 5','r = 5 cos θ'],1,''),q('θ = π/4 in rectangular form is…',['y = x','x = 1','x² + y² = 1','y = −x'],0,'')]};

L['PC-4-5']={goal:'I can graph polar equations such as circles, cardioids, limaçons, and roses.',
 life:{title:'Microphone pickup patterns',html:'A cardioid microphone hears sounds from the front best and ignores the back. Its sensitivity pattern is literally the polar curve r = 1 + cos θ.'},
 see:[{title:'Trace a polar curve',hint:'Pick an equation. Slide θ to watch it being drawn.',mount:mPolarGraph}],
 vocab:[['Circle','r = a, or r = a cos θ / a sin θ through the pole.'],['Limaçon','r = a + b cos θ; cardioid when a = b; inner loop when |a| < |b|.'],['Rose','r = a cos nθ: n petals if n odd, 2n if n even.'],['Symmetry test','Replace θ by −θ (polar axis) or π − θ (line θ = π/2).']],
 examples:[ex('Example','Sketch r = 2 + 2 sin θ.',[['θ = 0: r = 2; θ = π/2: r = 4','Make a table.'],['θ = π: r = 2; θ = 3π/2: r = 0','Touches the pole.'],['cardioid pointing up','a = b.']])],
 mistake:{bad:'r = 3 sin 2θ has 2 petals',good:'4 petals',why:'For even n the rose has 2n petals; for odd n it has n.'},
 practice(){const n=rand(2,7),f=pick(['sin','cos']),a=rand(2,5);return num(`How many petals does r = ${a} ${f}(${n}θ) have?`,[['petals =',n%2?n:2*n]],'Odd n → n petals; even n → 2n petals.',[[`n = ${n} is ${n%2?'odd':'even'}`,''],[`${n%2?n:2*n} petals`,'']]);},
 check:[q('r = 5 is a…',['line','circle','rose','spiral'],1,''),q('r = 3 + 3cos θ is a…',['cardioid','rose','circle','line'],0,''),q('r = 4cos 3θ has how many petals?',['3','6','4','12'],0,'')]};

TOOLS['PC-4']={title:'Polar curve tracer',hint:'Watch polar curves being drawn as θ turns.',mount:mPolarGraph};
})();
