/* Calculus · Unit 8 · Applications of integration */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;

function mAvg(el){sliders(el,[{k:'b',l:'b',min:1,max:5,step:.1,v:4}],V=>{const f=x=>2+Math.sin(1.3*x)+0.25*x,a=0,b=V.b;const I=C.simpson(f,a,b),av=I/(b-a);
  let c=null;for(let x=a;x<b;x+=0.001)if((f(x)-av)*(f(x+0.001)-av)<=0){c=x;break;}
  const G=grid({x0:-0.3,x1:5.5,y0:0,y1:5,u:80,uy:56,lab:1,laby:1});let s=C.region(G,f,()=>0,a,b,'rgba(37,99,235,.22)')+`<rect x="${G.X(a)}" y="${G.Y(av)}" width="${G.X(b)-G.X(a)}" height="${G.Y(0)-G.Y(av)}" fill="none" stroke="#e11d48" stroke-width="2.5" stroke-dasharray="6 4"/>`+curve(G,f,'#2563eb',3)+hline(G,av,'#e11d48','2 4');
  if(c!==null)s+=gdot(G,c,av,'#e11d48',7,'c');
  $('.av-g',el).innerHTML=G.svg(s);$('.av-r',el).innerHTML=`Average value on [0, ${nf(b)}] = (1/${nf(b)})∫₀<sup>${nf(b)}</sup> f(x) dx = ${K.r3(I)}/${nf(b)} = <b>${K.r3(av)}</b>.<br>The dashed rectangle of that height has the <b>same area</b> as the region under f.${c!==null?` f reaches the average at c ≈ ${K.r3(c)} (Mean Value Theorem for integrals).`:''}`;},`<div class="av-g"></div><div class="readout av-r"></div>`).run();}

function mDisp(el){sliders(el,[{k:'T',l:'T (s)',min:0.2,max:6,step:.05,v:6}],V=>{const v=t=>t*t-5*t+4;const T=V.T;const D=C.simpson(v,0,T,600),Tot=C.simpson(t=>Math.abs(v(t)),0,T,1200);
  const G=grid({x0:0,x1:6.3,y0:-3,y1:11,u:66,uy:22,lab:1,laby:2,xl:'t'});let s=C.signedArea(G,v,0,T)+curve(G,v,'#1f2937',3)+vline(G,T,'#94a3b8','4 4');
  $('.ds-g',el).innerHTML=G.svg(s);$('.ds-r',el).innerHTML=`v(t) = t² − 5t + 4 = (t − 1)(t − 4) m/s.<br>Displacement ∫₀<sup>${nf(T)}</sup> v dt = <b>${K.r3(D)} m</b> (blue − red) · Total distance ∫₀<sup>${nf(T)}</sup> |v| dt = <b>${K.r3(Tot)} m</b> (blue + red).<br>Position: s(T) = s(0) + ∫₀ᵀ v(t) dt.`;},`<div class="ds-g"></div><div class="readout ds-r"></div>`).run();}

function mInOut(el){sliders(el,[{k:'t',l:'t (h)',min:0,max:8,step:.05,v:3}],V=>{const R=t=>20+10*Math.sin(t/2),D=t=>4*t,t=V.t;const A=t=>50+C.simpson(x=>R(x)-D(x),0,t,200);
  const G=grid({x0:0,x1:8.4,y0:0,y1:35,u:52,uy:7,lab:1,laby:5,xl:'t (h)'});let s=C.region(G,R,D,0,t,'rgba(5,150,105,.18)')+curve(G,R,'#059669',3)+curve(G,D,'#e11d48',3)+vline(G,t,'#94a3b8','4 4');
  let tmax=0,best=-1e9;for(let x=0;x<=8;x+=0.01){const y=A(x);if(y>best){best=y;tmax=x;}}
  $('.io-g',el).innerHTML=G.svg(s);$('.io-r',el).innerHTML=`People enter a park at <span style="color:#059669">R(t) = 20 + 10 sin(t/2)</span> and leave at <span style="color:#e11d48">D(t) = 4t</span> per hour; 50 are there at t = 0.<br>A(${nf(t)}) = 50 + ∫₀<sup>${nf(t)}</sup> [R − D] dt = <b>${K.r3(A(t))}</b> people. A′(${nf(t)}) = R − D = <b>${K.r3(R(t)-D(t))}</b> per hour.<br>The crowd is largest when R = D (in = out), t ≈ <b>${K.r3(tmax)}</b>.`;},`<div class="io-g"></div><div class="readout io-r"></div>`).run();}

const BT=[{t:'vertical slices (dx)',html:()=>{const f=x=>4-x*x,g=x=>x-2;const G=grid({x0:-3.5,x1:3,y0:-6,y1:5,u:62,uy:30,lab:1,laby:2});let s=C.region(G,f,g,-3,2,'rgba(37,99,235,.22)')+curve(G,f,'#2563eb',3)+curve(G,g,'#e11d48',3)+`<rect x="${G.X(0.4)}" y="${G.Y(f(0.4))}" width="10" height="${G.Y(g(0.4))-G.Y(f(0.4))}" fill="#f59e0b"/>`;
  return G.svg(s)+`<div class="readout">Intersections: 4 − x² = x − 2 → x = −3, 2. Each vertical strip has height (top − bottom) = (4 − x²) − (x − 2).<br>A = ∫₋₃² [(4 − x²) − (x − 2)] dx = <b>125/6 ≈ 20.833</b>.</div>`;}},
 {t:'horizontal slices (dy)',html:()=>{const G=grid({x0:-1,x1:5,y0:-3,y1:3,u:56,uy:50,lab:1,laby:1});let s=C.pcurve(G,y=>y*y,y=>y,-3,3,'#2563eb',3)+C.pcurve(G,y=>y+2,y=>y,-3,3,'#e11d48',3);
  let d='';for(let i=0;i<=80;i++){const y=-1+3*i/80;d+=(i?'L':'M')+G.X(y*y)+' '+G.Y(y);}for(let i=80;i>=0;i--){const y=-1+3*i/80;d+=' L'+G.X(y+2)+' '+G.Y(y);}s=`<path d="${d} Z" fill="rgba(37,99,235,.22)"/>`+s+`<rect x="${G.X(0.25)}" y="${G.Y(0.5)-5}" width="${G.X(2.5)-G.X(0.25)}" height="10" fill="#f59e0b"/>`;
  return G.svg(s)+`<div class="readout">Region between x = y² and x = y + 2. Solve y² = y + 2 → y = −1, 2. Each horizontal strip has length (right − left) = (y + 2) − y².<br>A = ∫₋₁² [(y + 2) − y²] dy = <b>9/2 = 4.5</b>. Slicing in y avoids splitting into two integrals.</div>`;}}];
function mBetween(el){chooser(el,BT);}

const CS=[{t:'squares',A:w=>w*w,s:'Square cross sections: A = s² with side s = (top − bottom).'},{t:'semicircles',A:w=>PI*w*w/8,s:'Semicircles with diameter s: A = (1/2)π(s/2)² = πs²/8.'},{t:'equilateral triangles',A:w=>Math.sqrt(3)/4*w*w,s:'Equilateral triangles with side s: A = (√3/4)s².'}];
function mCross(el){K.pickSlide(el,CS,[{k:'x',l:'slice at x',min:0.05,max:3.95,step:.05,v:2}],(V,F)=>{const w=x=>Math.sqrt(x);const G=grid({x0:-0.3,x1:4.5,y0:-0.5,y1:2.5,u:80,uy:80,lab:1,laby:1});
  let s=C.region(G,w,()=>0,0,4,'rgba(37,99,235,.18)')+curve(G,x=>x<0?NaN:w(x),'#2563eb',3)+`<line x1="${G.X(V.x)}" y1="${G.Y(0)}" x2="${G.X(V.x)}" y2="${G.Y(w(V.x))}" stroke="#e11d48" stroke-width="5"/>`;
  const side=w(V.x),S=70;let shape='';if(F.t==='squares')shape=`<rect x="20" y="${150-side*S}" width="${side*S}" height="${side*S}" fill="#fecaca" stroke="#e11d48" stroke-width="3"/>`;
  else if(F.t==='semicircles')shape=`<path d="M20 150 A ${side*S/2} ${side*S/2} 0 0 1 ${20+side*S} 150 Z" fill="#fecaca" stroke="#e11d48" stroke-width="3"/>`;else shape=`<polygon points="20,150 ${20+side*S},150 ${20+side*S/2},${150-side*S*0.866}" fill="#fecaca" stroke="#e11d48" stroke-width="3"/>`;
  const Vtot=C.simpson(x=>F.A(w(x)),0,4);
  $('.cs-g',el).innerHTML=`<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:flex-end">${G.svg(s)}<svg viewBox="0 0 180 160" style="width:170px">${shape}<text x="20" y="20" font-size="12" font-weight="700">slice at x = ${nf(V.x)}</text></svg></div>`;
  $('.cs-r',el).innerHTML=`Base: region under y = √x on [0, 4]. ${F.s}<br>At x = ${nf(V.x)}: s = ${K.r3(side)}, A(x) = <b>${K.r3(F.A(side))}</b>. Volume = ∫₀⁴ A(x) dx = <b>${K.r3(Vtot)}</b>.`;},`<div class="cs-g"></div><div class="readout cs-r"></div>`);}

const SO=[{t:'Disk: y = √x about the x-axis',R:x=>Math.sqrt(x),r:()=>0,ex:8*PI,f:'π∫₀⁴ (√x)² dx = π∫₀⁴ x dx = 8π'},{t:'Washer: between √x and x/2',R:x=>Math.sqrt(x),r:x=>x/2,ex:8*PI/3,f:'π∫₀⁴ [(√x)² − (x/2)²] dx = 8π/3'}];
function mSolid(el,k0){K.pickSlide(el,k0?[SO[1],SO[0]]:SO,[{k:'n',l:'number of slices',min:2,max:40,step:1,v:6}],(V,F)=>{const G=grid({x0:-0.4,x1:4.6,y0:-2.6,y1:2.6,u:84,uy:66,lab:1,laby:1});const n=V.n,dx=4/n;let s='',sum=0;
  s+=curve(G,F.R,'#2563eb',3)+curve(G,x=>-F.R(x),'#93c5fd',2,'5 4');if(F.t[0]==='W')s+=curve(G,F.r,'#e11d48',3)+curve(G,x=>-F.r(x),'#fca5a5',2,'5 4');
  for(let i=0;i<n;i++){const xm=(i+0.5)*dx,R=F.R(xm),r=F.r(xm);sum+=PI*(R*R-r*r)*dx;const x0=G.X(i*dx),w=G.X(dx)-G.X(0);
   s+=`<rect x="${x0}" y="${G.Y(R)}" width="${w}" height="${G.Y(-R)-G.Y(R)}" fill="rgba(245,158,11,.35)" stroke="#b45309"/>`+(r>0?`<rect x="${x0}" y="${G.Y(r)}" width="${w}" height="${G.Y(-r)-G.Y(r)}" fill="#fff" stroke="#b45309"/>`:'')+`<ellipse cx="${x0+w}" cy="${G.Y(0)}" rx="${Math.max(3,w*0.25)}" ry="${G.Y(-R)-G.Y(0)}" fill="none" stroke="#b45309" stroke-width="1.5"/>`;}
  $('.so-g',el).innerHTML=G.svg(s);$('.so-r',el).innerHTML=`Spin the region around the x-axis. Each slice is a ${F.t[0]==='D'?'disk: volume πR²Δx':'washer: volume π(R² − r²)Δx'}.<br>${n} slices: <b>${K.r3(sum)}</b> · exact ${F.f} ≈ <b>${K.r3(F.ex)}</b>`;},`<div class="so-g"></div><div class="readout so-r"></div>`);}

function mArc(el){sliders(el,[{k:'n',l:'segments n',min:1,max:40,step:1,v:3}],V=>{const f=x=>x**1.5,a=0,b=4,n=V.n;let L=0,d='';for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;if(i){const xp=a+(b-a)*(i-1)/n;L+=Math.hypot(x-xp,f(x)-f(xp));}}
  const G=grid({x0:-0.3,x1:4.4,y0:-0.5,y1:8.5,u:90,uy:40,lab:1,laby:2});for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;d+=(i?'L':'M')+G.X(x)+' '+G.Y(f(x));}
  const ex=(8/27)*(10**1.5-1);$('.ac-g',el).innerHTML=G.svg(curve(G,x=>x<0?NaN:f(x),'#2563eb',3)+`<path d="${d}" fill="none" stroke="#e11d48" stroke-width="2.5"/>`);
  $('.ac-r',el).innerHTML=`y = x^(3/2) on [0, 4]. ${n} straight segments: total length <b>${K.r3(L)}</b>.<br>Exact: L = ∫₀⁴ √(1 + (y′)²) dx = ∫₀⁴ √(1 + 9x/4) dx = (8/27)(10√10 − 1) ≈ <b>${K.r3(ex)}</b>.`;},`<div class="ac-g"></div><div class="readout ac-r"></div>`).run();}

/* ---------- lessons ---------- */
L['CA-8-1']={goal:'I can find the average value of a function on an interval and interpret it.',
 life:{title:'Average temperature',html:'The average of a day’s temperatures is not just (high + low)/2. If the temperature is a continuous function, its true average is the area under the curve divided by the length of the day.'},
 see:[{title:'Level the area',hint:'Change b. The dashed rectangle has the same area as the shaded region.',mount:mAvg}],
 vocab:[['Average value','f_avg = (1/(b − a)) ∫ₐᵇ f(x) dx.'],['Geometric meaning','Height of the rectangle on [a, b] with the same area as under f.'],['MVT for integrals','If f is continuous, f(c) = f_avg for some c in [a, b].'],['Not the same as','Average rate of change [f(b) − f(a)]/(b − a).']],
 examples:[ex('Example','Average of f(x) = x² on [0, 3].',[['∫₀³ x² dx = 9',''],['9/3 = 3','']])],
 mistake:{bad:'average value of f on [a, b] = [f(b) − f(a)]/(b − a)',good:'(1/(b − a))∫ₐᵇ f(x) dx',why:'That formula is the average rate of change of f — a different question.'},
 practice(){const a=nz(-3,3),b=rand(-4,4),hi=rand(1,4);const I=a*hi**3/3+b*hi*hi/2;return num(`Find the average value of f(x) = ${ps([a,b,0])} on [0, ${hi}]. (fraction or decimal)`,[['average =',I/hi,0.011]],'Integrate, then divide by the length.',[[`∫₀<sup>${hi}</sup> f dx = ${K.pf(I)}`,''],[`÷ ${hi} = ${K.pf(I/hi)}`,'']]);},
 check:[q('f_avg on [a, b] =',['∫f','(1/(b − a))∫ₐᵇ f','[f(b) − f(a)]/(b − a)','f(b)/b'],1,''),q('Average of f(x) = 5 on [1, 9] =',['5','40','8','45'],0,''),q('The MVT for integrals guarantees a c with f(c) =',['0','f_avg','f′(c)','∫f'],1,'')]};

L['CA-8-2']={goal:'I can find displacement, total distance, and position from velocity using integrals.',
 life:{title:'Odometer vs. GPS',html:'Drive 10 miles north and 4 miles south: your GPS says you are 6 miles from home (displacement), but your odometer reads 14 (total distance). Integrals of v and |v| give these two numbers.'},
 see:[{title:'Signed vs. total area',hint:'Slide T. Compare displacement (blue − red) and distance (blue + red).',mount:mDisp}],
 vocab:[['Displacement','∫ₐᵇ v(t) dt = s(b) − s(a).'],['Total distance','∫ₐᵇ |v(t)| dt.'],['Position','s(t) = s(a) + ∫ₐᵗ v(x) dx.'],['Velocity from acceleration','v(t) = v(a) + ∫ₐᵗ a(x) dx.']],
 examples:[ex('Example','v(t) = t − 3 on [0, 5].',[['displacement: ∫₀⁵ (t − 3) dt = 12.5 − 15 = −2.5',''],['distance: ∫₀³ (3 − t) dt + ∫₃⁵ (t − 3) dt = 4.5 + 2 = 6.5','Split where v = 0.']])],
 mistake:{bad:'total distance = |∫ v dt|',good:'= ∫ |v| dt',why:'Taking the absolute value at the end lets backward motion cancel forward motion.'},
 practice(){const r=rand(1,4),T=r+rand(1,3);const v=t=>t-r;const disp=T*T/2-r*T;const dist=r*r/2+(T-r)**2/2;
  return num(`v(t) = t − ${r} m/s for 0 ≤ t ≤ ${T}. Find the displacement and the total distance. (decimals ok)`,[['displacement =',disp,0.011],['distance =',dist,0.011]],`v changes sign at t = ${r}; split the distance integral there.`,[[`∫₀<sup>${T}</sup> (t − ${r}) dt = ${nf(disp)}`,''],[`${nf(r*r/2)} + ${nf((T-r)**2/2)} = ${nf(dist)}`,'Triangles on each side.']]);},
 check:[q('∫ v(t) dt gives…',['distance','displacement','speed','acceleration'],1,''),q('Total distance uses…',['∫v','∫|v|','|∫v|','v(b) − v(a)'],1,''),q('s(5) = s(0) + …',['v(5)','∫₀⁵ v dt','∫₀⁵ a dt','s′(5)'],1,'')]};

L['CA-8-3']={goal:'I can use integrals of rates to find accumulated amounts in context, including in/out rate problems.',
 life:{title:'An amusement park crowd',html:'People enter at one rate and leave at another. How many are inside at 3 p.m.? When is it most crowded? These AP-style problems combine the FTC with optimization.'},
 see:[{title:'In and out',hint:'Slide t. The crowd grows while in > out.',mount:mInOut}],
 vocab:[['Amount at time t','A(t) = A(0) + ∫₀ᵗ [in(x) − out(x)] dx.'],['Rate of the amount','A′(t) = in(t) − out(t).'],['Max/min amount','Where in = out (and check endpoints).'],['Units','Integral of a rate has the amount’s units.']],
 examples:[ex('Example','Oil leaks at r(t) = 3e^(−0.1t) gal/h from a 100-gal tank. Amount at t = 5?',[['100 − ∫₀⁵ 3e^(−0.1t) dt',''],['= 100 − 30(1 − e^(−0.5)) ≈ 88.2 gallons','']])],
 mistake:{bad:'A(4) = ∫₀⁴ (in − out) dt',good:'= A(0) + ∫₀⁴ (in − out) dt',why:'The integral gives the change; add the starting amount.'},
 practice(){const A0=rand(20,90),inR=rand(5,15),outR=rand(1,12),T=rand(2,6);return num(`A tank holds ${A0} L. Water flows in at ${inR} L/min and drains at ${outR} L/min. How much water after ${T} min?`,[['amount (L) =',A0+(inR-outR)*T]],'Start + ∫ (in − out).',[[`${A0} + (${inR} − ${outR})·${T} = ${A0+(inR-outR)*T}`,'']]);},
 check:[q('If in > out at time t, the amount is…',['decreasing','increasing','constant','max'],1,''),q('The amount is maximized when…',['in = out (with sign change)','in = 0','out = 0','t = 0'],0,''),q('∫ (in − out) dt gives the…',['rate','net change in amount','total in','time'],1,'')]};

L['CA-8-4']={goal:'I can find the area between curves using vertical (dx) or horizontal (dy) slices.',
 life:{title:'Area of a lake between two shores',html:'Two curves bound a region like two shorelines. Slice it into thin strips, take (top − bottom) or (right − left) for each, and add with an integral.'},
 see:[{title:'Choose the slices',hint:'Compare vertical and horizontal strips.',mount:mBetween}],
 vocab:[['Vertical slices','A = ∫ₐᵇ [top(x) − bottom(x)] dx.'],['Horizontal slices','A = ∫ᶜᵈ [right(y) − left(y)] dy.'],['Bounds','Usually the intersection points.'],['Curves that cross','Split the integral where top and bottom switch, or use |f − g|.']],
 examples:[ex('Example','Area between y = x and y = x² on [0, 1].',[['top x, bottom x² on [0, 1]',''],['∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6','']])],
 mistake:{bad:'∫₀² (x² − x) dx for y = x and y = x²',good:'split at x = 1 where they cross',why:'On [0, 1] x is on top; on [1, 2] x² is. The signed pieces would cancel.'},
 practice(){const k=rand(1,5);return num(`Find the area between y = ${k}x and y = x² (from x = 0 to their other intersection). (fraction or decimal)`,[['area =',k**3/6,0.011]],`Intersections: x = 0 and x = ${k}.`,[[`∫₀<sup>${k}</sup> (${k}x − x²) dx = ${k**3}/2 − ${k**3}/3`,''],[`= ${frac(k**3,6)}`,'']]);},
 check:[q('Vertical slices integrate…',['right − left dy','top − bottom dx','f·g','f + g'],1,''),q('Bounds usually come from…',['the y-intercepts','intersection points','the origin','asymptotes'],1,''),q('Horizontal slices are best when…',['curves are x = g(y)','the region is a square','never','f is linear'],0,'')]};

L['CA-8-5']={goal:'I can find volumes of solids with known cross sections (squares, semicircles, triangles).',
 life:{title:'Slicing a loaf',html:'Slice a loaf of bread: each slice has an area, and stacking them gives the volume. If you know the shape of every slice, an integral adds them up exactly.'},
 see:[{title:'Stack the slices',hint:'Choose the cross-section shape and slide along the base.',mount:mCross}],
 vocab:[['Volume by slicing','V = ∫ₐᵇ A(x) dx, A(x) = area of the cross section at x.'],['Square','A = s².'],['Semicircle (diameter s)','A = πs²/8.'],['Equilateral triangle','A = (√3/4)s².'],['Isosceles right triangle (leg s)','A = s²/2.']],
 examples:[ex('Example','Base: region between y = 2 − x and the axes; square cross sections ⟂ x-axis.',[['s = 2 − x',''],['V = ∫₀² (2 − x)² dx = 8/3','']])],
 mistake:{bad:'semicircle area with diameter s = πs²/2',good:'= π(s/2)²/2 = πs²/8',why:'The radius is half the diameter, and a semicircle is half a circle.'},
 practice(){const k=rand(1,4),b=rand(1,3);const T=pick(['sq','semi']);const I=k*k*b**3/3;
  return num(`The base is the region under y = ${k===1?'':k}x on [0, ${b}]. Cross sections ⟂ to the x-axis are ${T==='sq'?'squares':'semicircles (diameter in the base)'}. Find the volume (3 decimals).`,[['V ≈',+(T==='sq'?I:PI*I/8).toFixed(3),0.006]],`s = ${k}x. ${T==='sq'?'A = s².':'A = πs²/8.'}`,[[`∫₀<sup>${b}</sup> ${T==='sq'?'':'(π/8)'}(${k}x)² dx = ${T==='sq'?K.pf(I):'(π/8)·'+K.pf(I)}`,''],[`≈ ${(T==='sq'?I:PI*I/8).toFixed(3)}`,'']]);},
 check:[q('Volume with known cross sections =',['∫A(x)dx','πR²','∫f(x)dx','A(b) − A(a)'],0,''),q('Square cross section with side 3: area =',['3','6','9','12'],2,''),q('Semicircle with diameter 4: area =',['2π','4π','8π','π'],0,'π(2)²/2.')]};

L['CA-8-6']={goal:'I can find volumes of solids of revolution with the disk method, around horizontal and vertical axes.',
 life:{title:'Turned on a lathe',html:'A woodworker spins a block and carves a profile — a vase, a table leg. The result is a solid of revolution. Each thin slice is a disk, whose volume is πR²·thickness.'},
 see:[{title:'Disk slices',hint:'Increase the number of slices.',mount:el=>mSolid(el)}],
 vocab:[['Disk method (x-axis)','V = π∫ₐᵇ [R(x)]² dx.'],['Disk method (y-axis)','V = π∫ᶜᵈ [R(y)]² dy.'],['Radius','Distance from the axis to the curve.'],['Other axes','Rotating about y = k: R(x) = |f(x) − k|.']],
 examples:[ex('Example','y = x² on [0, 1] about the x-axis.',[['R = x²',''],['V = π∫₀¹ x⁴ dx = π/5','']])],
 mistake:{bad:'V = π∫ R dx',good:'V = π∫ R² dx',why:'Each disk has area πR², not πR.'},
 practice(){const k=rand(1,3),b=rand(1,3);const T=pick(['lin','sqrt']);
  if(T==='lin')return num(`Rotate the region under y = ${k===1?'':k}x on [0, ${b}] about the x-axis. Find V (3 decimals).`,[['V ≈',+(PI*k*k*b**3/3).toFixed(3),0.006]],'V = π∫ (kx)² dx.',[[`π·${k*k}·${b}³/3 = ${K.pf(k*k*b**3/3)}π`,''],[`≈ ${(PI*k*k*b**3/3).toFixed(3)}`,'A cone!']]);
  return num(`Rotate the region under y = √x on [0, ${b*2}] about the x-axis. Find V (3 decimals).`,[['V ≈',+(PI*(2*b)**2/2).toFixed(3),0.006]],'V = π∫ x dx.',[[`π(${2*b})²/2 = ${2*b*b}π ≈ ${(PI*2*b*b).toFixed(3)}`,'']]);},
 check:[q('Disk volume element =',['πR Δx','πR² Δx','2πR Δx','R² Δx'],1,''),q('Rotating about the y-axis, integrate with respect to…',['x','y','t','θ'],1,'for disks'),q('About y = 2, R(x) for y = x² (below 2) is…',['x²','2 − x²','x² − 2','2'],1,'')]};

L['CA-8-7']={goal:'I can find volumes with the washer method, including regions rotated about lines other than the axes.',
 life:{title:'A hollow pipe',html:'Spin a region that does not touch the axis and you get a solid with a hole — like a pipe or a donut. Each slice is a washer: an outer disk minus an inner disk.'},
 see:[{title:'Washer slices',hint:'Each slice has a hole: outer disk minus inner disk.',mount:el=>mSolid(el,1)}],
 vocab:[['Washer method','V = π∫ₐᵇ ([R(x)]² − [r(x)]²) dx.'],['Outer radius R','Axis to the farther curve.'],['Inner radius r','Axis to the nearer curve.'],['Shifted axis y = k','R = |far curve − k|, r = |near curve − k|.']],
 examples:[ex('Example','Region between y = x and y = x² about the x-axis.',[['R = x, r = x² on [0, 1]',''],['V = π∫₀¹ (x² − x⁴) dx = π(1/3 − 1/5) = 2π/15','']])],
 mistake:{bad:'π∫ (R − r)² dx',good:'π∫ (R² − r²) dx',why:'Subtract the areas of two disks, not square the gap.'},
 practice(){const k=rand(1,3);const V=2*PI*k**5/15;return num(`The region between y = ${k===1?'':k}x and y = x² is rotated about the x-axis. Find V (2 decimals).`,[['V ≈',+V.toFixed(2),0.02]],`Intersections at x = 0 and ${k}. R = ${k===1?'':k}x, r = x².`,[[`π∫₀<sup>${k}</sup> (${k*k===1?'':k*k}x² − x⁴) dx = π(${k**5}/3 − ${k**5}/5) = ${K.pf(2*k**5/15)}π`,''],[`≈ ${V.toFixed(2)}`,'']]);},
 check:[q('Washer area =',['π(R − r)²','π(R² − r²)','πR²','2π(R − r)'],1,''),q('The inner radius is measured to the curve…',['farther from the axis','nearer the axis','on top','on the left'],1,''),q('About y = −1, radius to y = f(x) is…',['f(x)','f(x) + 1','f(x) − 1','1'],1,'')]};

L['CA-8-8']={goal:'I can find the arc length of a curve y = f(x) on an interval (BC).',
 life:{title:'How long is the cable?',html:'A suspension bridge cable hangs in a curve. To order the right length of steel, engineers add up tiny straight pieces — and the limit is an integral.'},
 see:[{title:'Straighten the curve',hint:'Increase the number of segments. Their total length approaches the arc length.',mount:mArc}],
 vocab:[['Arc length','L = ∫ₐᵇ √(1 + [f′(x)]²) dx.'],['Where it comes from','Each piece: √(Δx² + Δy²) = √(1 + (Δy/Δx)²) Δx.'],['In y','L = ∫ᶜᵈ √(1 + [g′(y)]²) dy for x = g(y).'],['Calculator','Many arc-length integrals have no simple antiderivative; evaluate numerically.']],
 examples:[ex('Example','y = (2/3)x^(3/2) on [0, 3].',[['y′ = √x, 1 + y′² = 1 + x',''],['L = ∫₀³ √(1 + x) dx = (2/3)(8 − 1) = 14/3','']])],
 mistake:{bad:'L = ∫ √(1 + f(x)²) dx',good:'use f′(x), not f(x)',why:'The length of a small piece depends on the slope.'},
 practice(){const T=pick([{f:'y = 3x + 1 on [0, 4]',L:4*Math.sqrt(10),h:'y′ = 3: L = ∫₀⁴ √10 dx'},{f:'y = (2/3)x^(3/2) on [0, 3]',L:14/3,h:'1 + y′² = 1 + x'},{f:'y = (2/3)x^(3/2) on [0, 8]',L:52/3,h:'∫₀⁸ √(1 + x) dx = (2/3)(27 − 1)'},{f:'y = 4 − 2x on [1, 3]',L:2*Math.sqrt(5),h:'y′ = −2: √5 · 2'}]);
  return num(`Find the arc length of ${T.f} (3 decimals).`,[['L ≈',+T.L.toFixed(3),0.006]],T.h,[[`L ≈ ${T.L.toFixed(3)}`,'']]);},
 check:[q('Arc length integrand:',['√(1 + f′²)','√(1 + f²)','1 + f′','f′²'],0,''),q('For a line y = mx + b on [a, b], L =',['(b − a)√(1 + m²)','m(b − a)','b − a','√m'],0,''),q('Arc length is always…',['negative','≥ the horizontal distance','0','less than b − a'],1,'')]};

TOOLS['CA-8']={title:'Disk and washer slices',hint:'Spin a region around the x-axis and add up disk or washer slices.',mount:el=>mSolid(el)};
})();
