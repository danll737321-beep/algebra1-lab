/* Calculus · Unit 9 · Parametric equations, polar coordinates, and vector-valued functions (BC) */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;
const tline=(G,m,x0,y0,col='#e11d48')=>Math.abs(m)>1e4?vline(G,x0,col,''):curve(G,x=>y0+m*(x-x0),col,2.5);

function mParaD(el){sliders(el,[{k:'t',l:'t',min:-2,max:2,step:.02,v:1.5}],V=>{const X=t=>t*t,Y=t=>t**3-3*t,dx=t=>2*t,dy=t=>3*t*t-3;const t=V.t;const G=grid({x0:-1,x1:5,y0:-4,y1:4,u:60,uy:44,lab:1,laby:1});
  const m=dy(t)/dx(t);let s=C.pcurve(G,X,Y,-2.1,2.1,'#2563eb',3)+(Math.abs(t)>0.02?tline(G,m,X(t),Y(t)):'')+C.arrow(G,[X(t),Y(t)],[X(t)+dx(t)*0.35,Y(t)+dy(t)*0.35],'#059669',3)+gdot(G,X(t),Y(t),'#1f2937',7);
  const d2=t=>(6*t*2*t-(3*t*t-3)*2)/(2*t)**3;
  $('.pd-g',el).innerHTML=G.svg(s);$('.pd-r',el).innerHTML=`x = t², y = t³ − 3t. At t = ${nf(t)}: point (${K.r3(X(t))}, ${K.r3(Y(t))}).<br>dy/dx = (dy/dt)/(dx/dt) = ${K.r3(dy(t))}/${K.r3(dx(t))} = <b>${Math.abs(t)>0.02?K.r3(m):'undefined'}</b>${Math.abs(t)>0.02?` · d²y/dx² = <b>${K.r3(d2(t))}</b>`:''}<br><span class="mute">Horizontal tangents where dy/dt = 0 (t = ±1); vertical where dx/dt = 0 (t = 0). The curve crosses itself at (3, 0).</span>`;},`<div class="pd-g"></div><div class="readout pd-r"></div>`).run();}

const PA=[{t:'Circle x = 2cos t, y = 2sin t, 0 ≤ t ≤ 2π',X:t=>2*Math.cos(t),Y:t=>2*Math.sin(t),a:0,b:2*PI,L:4*PI,g:{x0:-3,x1:3,y0:-3,y1:3,u:60}},{t:'Cycloid x = t − sin t, y = 1 − cos t, 0 ≤ t ≤ 2π',X:t=>t-Math.sin(t),Y:t=>1-Math.cos(t),a:0,b:2*PI,L:8,g:{x0:-0.5,x1:7,y0:-0.5,y1:2.5,u:56}}];
function mParaArc(el){K.pickSlide(el,PA,[{k:'n',l:'segments',min:2,max:60,step:1,v:6}],(V,F)=>{const G=grid(Object.assign({lab:1,laby:1},F.g));let L=0,d='',px,py;for(let i=0;i<=V.n;i++){const t=F.a+(F.b-F.a)*i/V.n,x=F.X(t),y=F.Y(t);if(i)L+=Math.hypot(x-px,y-py);d+=(i?'L':'M')+G.X(x)+' '+G.Y(y);px=x;py=y;}
  $('.pa-g',el).innerHTML=G.svg(C.pcurve(G,F.X,F.Y,F.a,F.b,'#2563eb',3)+`<path d="${d}" fill="none" stroke="#e11d48" stroke-width="2.5"/>`);
  $('.pa-r',el).innerHTML=`${F.t}<br>${V.n} chords: <b>${K.r3(L)}</b> · exact ∫ √((dx/dt)² + (dy/dt)²) dt = <b>${K.r3(F.L)}</b>`;},`<div class="pa-g"></div><div class="readout pa-r"></div>`);}

function mVec(el){sliders(el,[{k:'t',l:'t',min:0,max:6.28,step:.02,v:1}],V=>{const t=V.t;const r=[3*Math.cos(t),2*Math.sin(2*t)],v=[-3*Math.sin(t),4*Math.cos(2*t)];const G=grid({x0:-4,x1:4,y0:-3,y1:3,u:50,lab:1,laby:1});
  let s=C.pcurve(G,u=>3*Math.cos(u),u=>2*Math.sin(2*u),0,2*PI,'#cbd5e1',2.5)+C.arrow(G,[0,0],r,'#2563eb',3,'r(t)')+C.arrow(G,r,[r[0]+v[0]*0.3,r[1]+v[1]*0.3],'#e11d48',3,'r′(t)')+gdot(G,r[0],r[1],'#1f2937',6);
  $('.vc-g',el).innerHTML=G.svg(s);$('.vc-r',el).innerHTML=`r(t) = ⟨3cos t, 2sin 2t⟩ = ⟨${K.r3(r[0])}, ${K.r3(r[1])}⟩<br>r′(t) = ⟨−3sin t, 4cos 2t⟩ = ⟨${K.r3(v[0])}, ${K.r3(v[1])}⟩ — the red arrow is <b>tangent</b> to the path. Differentiate (or integrate) each component separately.`;},`<div class="vc-g"></div><div class="readout vc-r"></div>`).run();}

const MP=[{t:'Ellipse',X:t=>3*Math.cos(t),Y:t=>1.8*Math.sin(t),vx:t=>-3*Math.sin(t),vy:t=>1.8*Math.cos(t),ax:t=>-3*Math.cos(t),ay:t=>-1.8*Math.sin(t)},{t:'Projectile',X:t=>2*t,Y:t=>3*t-t*t,vx:()=>2,vy:t=>3-2*t,ax:()=>0,ay:()=>-2},{t:'Loop',X:t=>Math.sin(2*t)*2.5,Y:t=>Math.sin(t)*2.5,vx:t=>5*Math.cos(2*t),vy:t=>2.5*Math.cos(t),ax:t=>-10*Math.sin(2*t),ay:t=>-2.5*Math.sin(t)}];
function mPlane(el){K.pickSlide(el,MP,[{k:'t',l:'t',min:0,max:3,step:.02,v:0.8}],(V,F)=>{const t=V.t,p=[F.X(t),F.Y(t)],v=[F.vx(t),F.vy(t)],a=[F.ax(t),F.ay(t)];const G=grid({x0:-4,x1:7,y0:-3,y1:4,u:38,lab:1,laby:1});
  let dist=C.simpson(u=>Math.hypot(F.vx(u),F.vy(u)),0,t,200);
  let s=C.pcurve(G,F.X,F.Y,0,3,'#cbd5e1',2.5)+C.pcurve(G,F.X,F.Y,0,t,'#2563eb',3)+C.arrow(G,p,[p[0]+v[0]*0.4,p[1]+v[1]*0.4],'#059669',3,'v')+C.arrow(G,p,[p[0]+a[0]*0.25,p[1]+a[1]*0.25],'#e11d48',3,'a')+gdot(G,p[0],p[1],'#1f2937',7);
  $('.mp-g',el).innerHTML=G.svg(s);$('.mp-r',el).innerHTML=`Position ⟨${K.r3(p[0])}, ${K.r3(p[1])}⟩ · velocity ⟨${K.r3(v[0])}, ${K.r3(v[1])}⟩ · acceleration ⟨${K.r3(a[0])}, ${K.r3(a[1])}⟩<br>Speed |v| = √(x′² + y′²) = <b>${K.r3(Math.hypot(...v))}</b> · distance traveled since t = 0: <b>${K.r3(dist)}</b>`;},`<div class="mp-g"></div><div class="readout mp-r"></div>`);}

function mPolD(el){sliders(el,[{k:'th',l:'θ (°)',min:0,max:355,step:5,v:60}],V=>{const th=V.th*PI/180;const r=t=>1+Math.cos(t),rp=t=>-Math.sin(t);const x=r(th)*Math.cos(th),y=r(th)*Math.sin(th);
  const dydt=rp(th)*Math.sin(th)+r(th)*Math.cos(th),dxdt=rp(th)*Math.cos(th)-r(th)*Math.sin(th);const m=dydt/dxdt;const G=C.polarGrid(3,60);
  let s=C.polar(G,r,0,2*PI,'#2563eb',3)+(Math.abs(dxdt)>1e-6||Math.abs(dydt)>1e-6?tline(G,Math.abs(dxdt)<1e-6?1e9:m,x,y):'')+`<line x1="${G.X(0)}" y1="${G.Y(0)}" x2="${G.X(x)}" y2="${G.Y(y)}" stroke="#9333ea" stroke-width="2"/>`+gdot(G,x,y,'#1f2937',7);
  $('.po-g',el).innerHTML=G.svg(s);$('.po-r',el).innerHTML=`r = 1 + cos θ. x = r cos θ, y = r sin θ.<br>dy/dx = (dy/dθ)/(dx/dθ) = ${K.r3(dydt)}/${K.r3(dxdt)} = <b>${Math.abs(dxdt)<1e-6?(Math.abs(dydt)<1e-6?'undefined (cusp)':'vertical'):K.r3(m)}</b><br>dr/dθ = ${K.r3(rp(th))}: r is ${rp(th)<0?'decreasing — the point moves toward the pole':rp(th)>0?'increasing — moving away from the pole':'momentarily constant'}.`;},`<div class="po-g"></div><div class="readout po-r"></div>`).run();}

function mPolA(el){sliders(el,[{k:'b',l:'sweep to θ (°)',min:10,max:360,step:5,v:180}],V=>{const b=V.b*PI/180,r=t=>1+Math.cos(t);const G=C.polarGrid(3,60);
  let d=`M${G.X(0)} ${G.Y(0)}`;for(let i=0;i<=200;i++){const t=b*i/200;d+=` L${G.X(r(t)*Math.cos(t))} ${G.Y(r(t)*Math.sin(t))}`;}
  const A=0.5*C.simpson(t=>r(t)**2,0,b);let s=`<path d="${d} Z" fill="rgba(37,99,235,.25)"/>`+C.polar(G,r,0,2*PI,'#2563eb',3);
  $('.pa2-g',el).innerHTML=G.svg(s);$('.pa2-r',el).innerHTML=`Area swept from 0 to ${V.b}°: A = ½∫ r² dθ = <b>${K.r3(A)}</b>.<br>Each thin wedge is almost a circular sector: ½r²·Δθ. Full cardioid (0 to 2π): 3π/2 ≈ ${K.r3(1.5*PI)}.`;},`<div class="pa2-g"></div><div class="readout pa2-r"></div>`).run();}

function mPolB(el){const G=C.polarGrid(3,62);const R=t=>3*Math.cos(t),r=t=>1+Math.cos(t);let d='';const a=-PI/3,b=PI/3;
 for(let i=0;i<=120;i++){const t=a+(b-a)*i/120;d+=(i?'L':'M')+G.X(R(t)*Math.cos(t))+' '+G.Y(R(t)*Math.sin(t));}for(let i=120;i>=0;i--){const t=a+(b-a)*i/120;d+=' L'+G.X(r(t)*Math.cos(t))+' '+G.Y(r(t)*Math.sin(t));}
 el.innerHTML=G.svg(`<path d="${d} Z" fill="rgba(147,51,234,.3)"/>`+C.polar(G,R,0,PI,'#2563eb',3)+C.polar(G,r,0,2*PI,'#e11d48',3))+`<div class="readout">Inside <span style="color:#2563eb">r = 3cos θ</span> and outside <span style="color:#e11d48">r = 1 + cos θ</span>.<br>Intersections: 3cos θ = 1 + cos θ → cos θ = 1/2 → θ = ±π/3.<br>A = ½∫<sub>−π/3</sub><sup>π/3</sup> [(3cos θ)² − (1 + cos θ)²] dθ = <b>π ≈ 3.1416</b>. <span class="mute">(numerical: ${K.r3(0.5*C.simpson(t=>R(t)**2-r(t)**2,a,b))})</span></div>`;}

/* ---------- lessons ---------- */
L['CA-9-1']={goal:'I can find dy/dx and d²y/dx² for parametric curves and locate horizontal and vertical tangents.',
 life:{title:'Tracking a drone',html:'A drone’s position is given as x(t) and y(t). Its path’s steepness at any moment is the ratio of the vertical rate to the horizontal rate — no need to eliminate t.'},
 see:[{title:'Tangent to a parametric curve',hint:'Slide t. Find where the tangent is horizontal or vertical.',mount:mParaD}],
 vocab:[['Slope','dy/dx = (dy/dt)/(dx/dt), dx/dt ≠ 0.'],['Horizontal tangent','dy/dt = 0, dx/dt ≠ 0.'],['Vertical tangent','dx/dt = 0, dy/dt ≠ 0.'],['Second derivative','d²y/dx² = [d/dt(dy/dx)] / (dx/dt).']],
 examples:[ex('Example','x = t², y = t³ − 3t. Slope at t = 2.',[['dx/dt = 4, dy/dt = 9',''],['dy/dx = 9/4','']])],
 mistake:{bad:'d²y/dx² = (d²y/dt²)/(d²x/dt²)',good:'= [d/dt(dy/dx)]/(dx/dt)',why:'Differentiate the slope with respect to t, then divide by dx/dt once more.'},
 practice(){const a=nz(-3,3),b=rand(-4,4),c=nz(-3,3),t=rand(1,3);const dx=2*a*t+b,dy=3*c*t*t;
  if(dx===0)return mc(`x = ${ps([a,b,0]).replace(/x/g,'t')}, y = ${c}t³ at t = ${t}: the tangent is…`,'vertical',['horizontal','vertical','slope 1'],'dx/dt = 0.');
  return num(`x(t) = ${ps([a,b,0]).replace(/x/g,'t')}, y(t) = ${c}t³. Find dy/dx at t = ${t}. (fraction or decimal)`,[['dy/dx =',dy/dx,0.011]],'(dy/dt)/(dx/dt).',[[`dy/dt = ${3*c}t² = ${dy}, dx/dt = ${ps([2*a,b]).replace(/x/g,'t')} = ${dx}`,''],[`dy/dx = ${frac(dy,dx)}`,'']]);},
 check:[q('dy/dx for a parametric curve =',['(dx/dt)/(dy/dt)','(dy/dt)/(dx/dt)','dy/dt','dx/dt'],1,''),q('Horizontal tangent when…',['dx/dt = 0','dy/dt = 0 (dx/dt ≠ 0)','t = 0','x = 0'],1,''),q('Vertical tangent when…',['dx/dt = 0 (dy/dt ≠ 0)','dy/dt = 0','y = 0','dy/dx = 0'],0,'')]};

L['CA-9-2']={goal:'I can find the arc length of a parametric curve.',
 life:{title:'How far did it fly?',html:'A frisbee’s path is given by x(t), y(t). Its total path length — not just how far it landed — adds up tiny pieces of length √(dx² + dy²).'},
 see:[{title:'Chords to curves',hint:'Pick a curve and add segments.',mount:mParaArc}],
 vocab:[['Parametric arc length','L = ∫ₐᵇ √((dx/dt)² + (dy/dt)²) dt.'],['Traced once','Use a t-interval that traces the curve exactly once.'],['Speed connection','The integrand is the speed of a particle moving along the path.']],
 examples:[ex('Example','x = 3cos t, y = 3sin t, 0 ≤ t ≤ π.',[['(dx/dt)² + (dy/dt)² = 9',''],['L = ∫₀^π 3 dt = 3π','Half the circumference.']])],
 mistake:{bad:'L = ∫ (dx/dt + dy/dt) dt',good:'√ of the sum of squares',why:'Lengths combine with the Pythagorean theorem, not by adding.'},
 practice(){const r=rand(1,6),k=pick([1,2,4]);const L=2*PI*r/k;return num(`x = ${r}cos t, y = ${r}sin t for 0 ≤ t ≤ ${k===1?'2π':k===2?'π':'π/2'}. Find the arc length (3 decimals).`,[['L ≈',+L.toFixed(3),0.006]],'The integrand is the constant r.',[[`∫ ${r} dt = ${r}·${k===1?'2π':k===2?'π':'π/2'} ≈ ${L.toFixed(3)}`,'']]);},
 check:[q('Parametric arc length integrand:',['√(x′² + y′²)','x′ + y′','x′y′','√(x² + y²)'],0,''),q('For a circle of radius 2 traced once, L =',['2π','4π','π','8π'],1,''),q('The integrand equals the particle’s…',['velocity vector','speed','acceleration','position'],1,'')]};

L['CA-9-3']={goal:'I can differentiate and integrate vector-valued functions component by component.',
 life:{title:'Vectors that move',html:'r(t) = ⟨x(t), y(t)⟩ is an arrow from the origin to a moving point. Its derivative is another arrow — pointing in the direction of motion, with length equal to the speed.'},
 see:[{title:'Position and velocity arrows',hint:'Slide t. The red arrow is always tangent to the path.',mount:mVec}],
 vocab:[['Vector-valued function','r(t) = ⟨x(t), y(t)⟩.'],['Derivative','r′(t) = ⟨x′(t), y′(t)⟩.'],['Integral','∫ r(t) dt = ⟨∫x dt, ∫y dt⟩ + C (C a vector).'],['Initial condition','Use r(t₀) to find the constant vector.']],
 examples:[ex('Example','v(t) = ⟨2t, cos t⟩, r(0) = ⟨1, 3⟩. Find r(t).',[['r(t) = ⟨t² + C₁, sin t + C₂⟩',''],['r(0) = ⟨C₁, C₂⟩ = ⟨1, 3⟩',''],['r(t) = ⟨t² + 1, sin t + 3⟩','']])],
 mistake:{bad:'r′(t) = d/dt |r(t)|',good:'differentiate each component',why:'The derivative of a vector is a vector; |r|′ is a different quantity.'},
 practice(){const a=nz(-3,3),b=nz(-3,3),t=rand(1,3),x0=rand(-4,4),y0=rand(-4,4);
  return num(`v(t) = ⟨${2*a}t, ${3*b}t²⟩ and r(0) = ⟨${x0}, ${y0}⟩. Find r(${t}).`,[['x =',a*t*t+x0],['y =',b*t**3+y0]],'Integrate each component and use r(0).',[[`r(t) = ⟨${a}t² + ${P(x0)}, ${b}t³ + ${P(y0)}⟩`,''],[`r(${t}) = ⟨${a*t*t+x0}, ${b*t**3+y0}⟩`,'']]);},
 check:[q('d/dt ⟨t², sin t⟩ =',['⟨2t, cos t⟩','⟨t³/3, −cos t⟩','2t + cos t','⟨2, −sin t⟩'],0,''),q('Integrating a vector function adds…',['a scalar C','a constant vector','nothing','t'],1,''),q('r′(t) points…',['to the origin','tangent to the path','perpendicular to the path','up'],1,'')]};

L['CA-9-4']={goal:'I can analyze motion in the plane: velocity, speed, acceleration, and distance traveled.',
 life:{title:'A car on a curvy road',html:'On a curvy road, velocity has a direction as well as a size. The speedometer shows only the size, √(x′² + y′²); the steering wheel controls the direction.'},
 see:[{title:'Motion vectors',hint:'Pick a path and slide t. Green: velocity. Red: acceleration.',mount:mPlane}],
 vocab:[['Velocity','v(t) = ⟨x′(t), y′(t)⟩.'],['Speed','|v(t)| = √(x′² + y′²).'],['Acceleration','a(t) = ⟨x″(t), y″(t)⟩.'],['Distance traveled','∫ₐᵇ |v(t)| dt.'],['Position','r(b) = r(a) + ∫ₐᵇ v(t) dt.']],
 examples:[ex('Example','x′ = 3, y′ = 4 − 2t. Speed at t = 1?',[['v(1) = ⟨3, 2⟩',''],['speed = √13 ≈ 3.606','']])],
 mistake:{bad:'speed = x′ + y′',good:'√(x′² + y′²)',why:'Speed is the length of the velocity vector.'},
 practice(){const vx=rand(-6,6),vy=rand(-6,6);const T=pick(['speed','pos']);if(T==='speed')return num(`A particle has velocity ⟨${vx}, ${vy}⟩ at time t = 2. Find its speed (3 decimals).`,[['speed ≈',+Math.hypot(vx,vy).toFixed(3),0.006]],'Length of the velocity vector.',[[`√(${vx*vx} + ${vy*vy}) ≈ ${Math.hypot(vx,vy).toFixed(3)}`,'']]);
  const x0=rand(-5,5),y0=rand(-5,5),T2=rand(1,4);return num(`v(t) = ⟨${vx}, ${vy}⟩ (constant), r(0) = ⟨${x0}, ${y0}⟩. Find r(${T2}).`,[['x =',x0+vx*T2],['y =',y0+vy*T2]],'r(T) = r(0) + ∫₀ᵀ v dt.',[[`⟨${x0} + ${vx}·${T2}, ${y0} + ${vy}·${T2}⟩`,'']]);},
 check:[q('Speed =',['x′ + y′','√(x′² + y′²)','x′y′','|x′|'],1,''),q('Distance traveled on [a, b] =',['|r(b) − r(a)|','∫|v|dt','∫v dt','v(b) − v(a)'],1,''),q('Acceleration =',['r′','v′','|v|','∫v'],1,'')]};

L['CA-9-5']={goal:'I can find dy/dx for polar curves and interpret dr/dθ.',
 life:{title:'Radar sweep',html:'A radar sweeps by angle θ and records distance r. To know the direction of a moving target’s path on the screen, convert to x and y and use the parametric slope formula with θ as the parameter.'},
 see:[{title:'Tangent to a cardioid',hint:'Move θ around r = 1 + cos θ. Watch the slope and dr/dθ.',mount:mPolD}],
 vocab:[['Polar → parametric','x = r(θ)cos θ, y = r(θ)sin θ.'],['Slope','dy/dx = (dy/dθ)/(dx/dθ).'],['dy/dθ','r′ sin θ + r cos θ.'],['dx/dθ','r′ cos θ − r sin θ.'],['dr/dθ','Positive: moving away from the pole; negative: toward it.']],
 examples:[ex('Example','r = 2sin θ. dy/dx at θ = π/6.',[['r = 1, r′ = 2cos θ = √3',''],['dy/dθ = √3·½ + 1·(√3/2) = √3',''],['dx/dθ = √3·(√3/2) − 1·½ = 1','dy/dx = √3.']])],
 mistake:{bad:'dy/dx = dr/dθ',good:'dy/dx = (dy/dθ)/(dx/dθ)',why:'dr/dθ measures change in distance from the pole, not the slope of the curve.'},
 practice(){if(Math.random()<0.5){const T=pick([{r:'r = 2 + sin θ',th:'π/2',d:'0'},{r:'r = 3cos θ',th:'π/4',d:'−3√2/2 (toward pole)'},{r:'r = θ',th:'1',d:'1 (away from pole)'}]);const ans=T.d;return mc(`For ${T.r} at θ = ${T.th}, dr/dθ =`,ans,['0','−3√2/2 (toward pole)','1 (away from pole)','2'],'Differentiate r with respect to θ.');}
  const a=rand(1,4);return num(`r = ${a} (a circle). Find dy/dx at θ = π/4.`,[['dy/dx =',-1]],'r′ = 0: dy/dθ = r cos θ, dx/dθ = −r sin θ.',[['dy/dx = −cos θ / sin θ = −cot(π/4) = −1','']]);},
 check:[q('In polar, x =',['r sin θ','r cos θ','r/θ','θ cos r'],1,''),q('dy/dx in polar uses…',['dr/dθ alone','(dy/dθ)/(dx/dθ)','r′/r','tan θ'],1,''),q('dr/dθ < 0 means the point moves…',['away from the pole','toward the pole','counterclockwise','up'],1,'')]};

L['CA-9-6']={goal:'I can find the area enclosed by a polar curve.',
 life:{title:'Area of a fan',html:'A folding fan is made of thin wedges. A polar region is too: each wedge with radius r and angle dθ has area ½r²dθ, and an integral adds them.'},
 see:[{title:'Sweep the cardioid',hint:'Increase the sweep angle and watch the area accumulate.',mount:mPolA}],
 vocab:[['Polar area','A = ½∫_α^β r² dθ.'],['Sector','A circular sector has area ½r²θ.'],['Limits','Choose α, β so the region is traced once (petals!).'],['Symmetry','Compute one part and multiply when the curve is symmetric.']],
 examples:[ex('Example','Area inside r = 2cos θ.',[['traced once for −π/2 ≤ θ ≤ π/2',''],['½∫ 4cos²θ dθ = π','A circle of radius 1.']])],
 mistake:{bad:'A = ∫ r dθ',good:'A = ½∫ r² dθ',why:'Each wedge is a sector with area ½r²Δθ.'},
 practice(){const a=rand(1,5);if(Math.random()<0.5)return num(`Find the area inside the circle r = ${a} using A = ½∫₀^{2π} r² dθ (3 decimals).`,[['A ≈',+(PI*a*a).toFixed(3),0.006]],'½·r²·2π.',[[`${a*a}π ≈ ${(PI*a*a).toFixed(3)}`,'']]);
  return num(`Find the area inside the cardioid r = ${a}(1 + cos θ) (3 decimals).`,[['A ≈',+(1.5*PI*a*a).toFixed(3),0.01]],'½∫₀^{2π} a²(1 + cos θ)² dθ = (3/2)πa².',[[`(3/2)π·${a*a} ≈ ${(1.5*PI*a*a).toFixed(3)}`,'']]);},
 check:[q('Polar area formula:',['∫r dθ','½∫r² dθ','π∫r² dθ','∫r²'],1,''),q('Sector of radius 2, angle π/2: area =',['π','2π','π/2','4π'],0,'½·4·π/2'),q('Area inside r = 1 (full circle) =',['π','2π','1/2','π/2'],0,'')]};

L['CA-9-7']={goal:'I can find the area between two polar curves using their intersection angles.',
 life:{title:'A crescent moon',html:'The region inside one polar curve and outside another looks like a crescent. Subtract the inner wedge from the outer wedge, angle by angle.'},
 see:[{title:'Inside one, outside the other',hint:'Read how the bounds come from the intersection points.',mount:mPolB}],
 vocab:[['Between curves','A = ½∫_α^β (R² − r²) dθ, with R the outer curve.'],['Intersections','Solve r₁(θ) = r₂(θ) for the bounds (and check the pole).'],['R² − r²','Not (R − r)².']],
 examples:[ex('Example','Inside r = 3cos θ, outside r = 1 + cos θ.',[['bounds θ = ±π/3',''],['½∫ [9cos²θ − (1 + cos θ)²] dθ = π','']])],
 mistake:{bad:'½∫ (R − r)² dθ',good:'½∫ (R² − r²) dθ',why:'Subtract the two sector areas.'},
 practice(){const T=pick([{q:'r = 3cos θ and r = 1 + cos θ',a:'±π/3'},{q:'r = 2 and r = 4cos θ',a:'±π/3'},{q:'r = 1 and r = 2sin θ',a:'π/6 and 5π/6'},{q:'r = sin θ and r = cos θ',a:'π/4'}]);
  return mc(`At what angle(s) in [−π, π] (other than the pole) do ${T.q} intersect?`,T.a,['±π/3','π/6 and 5π/6','π/4','±π/6'],'Set the r-values equal and solve.');},
 check:[q('Area between polar curves =',['½∫(R − r)²','½∫(R² − r²)','∫(R² − r²)','½∫Rr'],1,''),q('Bounds come from…',['r = 0 only','where the curves intersect','θ = 0 and 2π always','the x-axis'],1,''),q('R is the curve…',['closer to the pole','farther from the pole','on the left','with larger θ'],1,'')]};

TOOLS['CA-9']={title:'Motion in the plane',hint:'Choose a path and slide t: position, velocity (green) and acceleration (red) vectors with speed and distance.',mount:mPlane};
})();
