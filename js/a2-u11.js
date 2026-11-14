/* Khan Algebra 2 · Unit 11 · Trigonometry */
(function(){const {sliders,graphLab,chooser,circleFig,piTicks,ex,q,mc,num,nz,curve,TOOLS,nf,hline,vline,fr}=A2;
const PI=Math.PI,rad=d=>d*PI/180;
/* exact values table */
const EX={0:['1','0','0'],30:['√3/2','1/2','√3/3'],45:['√2/2','√2/2','1'],60:['1/2','√3/2','√3'],90:['0','1','undefined']};
function exact(d){d=((d%360)+360)%360;const q_=Math.floor(d/90),r=d%90;let ref=r,qc=q_;if(r===0){const T={0:['1','0','0'],90:['0','1','undefined'],180:['−1','0','0'],270:['0','−1','undefined']};return T[d];}
 const refA=[d,180-d,d-180,360-d][q_];const v=EX[refA];if(!v)return null;const sc=[[1,1],[-1,1],[-1,-1],[1,-1]][q_];const sg=(s,x)=>s<0?'−'+x:x;return [sg(sc[0],v[0]),sg(sc[1],v[1]),sg(sc[0]*sc[1],v[2])];}
function radStr(d){const g=gcd(d,180);const n=d/g,m=180/g;if(!d)return '0';return `${n===1?'':n}π${m===1?'':'/'+m}`;}
function mUnit(el){sliders(el,[{k:'d',l:'angle θ (degrees)',min:0,max:360,step:5,v:40}],V=>{const t=rad(V.d);$('.uc-g',el).innerHTML=circleFig(t);
  $('.uc-r',el).innerHTML=`θ = <b>${V.d}°</b>. The point on the unit circle is (<span style="color:#059669;font-weight:800">cos θ</span>, <span style="color:#2563eb;font-weight:800">sin θ</span>) = (<b>${nf(Math.cos(t))}</b>, <b>${nf(Math.sin(t))}</b>).<br><span class="mute">Green = horizontal distance = cos θ; blue = vertical = sin θ. Angles start on the positive x-axis and turn <b>counterclockwise</b>. Quadrant ${V.d%90===0?'— on an axis':Math.floor(V.d/90)%4+1}: cos ${Math.cos(t)>1e-9?'+':Math.cos(t)<-1e-9?'−':'0'}, sin ${Math.sin(t)>1e-9?'+':Math.sin(t)<-1e-9?'−':'0'}.</span>`;},`<div class="uc-g"></div><div class="readout uc-r"></div>`).run();}
function mRad(el){sliders(el,[{k:'d',l:'angle (degrees)',min:0,max:360,step:15,v:90}],V=>{const t=rad(V.d);$('.rd-g',el).innerHTML=circleFig(t);
  $('.rd-r',el).innerHTML=`<div class="eqline math">${V.d}° = ${V.d}·π/180 = <b>${radStr(V.d)}</b> ≈ ${t.toFixed(3)} rad</div>The red arc has length <b>${t.toFixed(3)}</b> radius-lengths. One radian is the angle whose arc equals one radius (≈ 57.3°).<br><span class="mute">A full turn is 2π ≈ 6.283 radii of arc, so 360° = 2π rad and 180° = π rad.</span>`;},`<div class="rd-g"></div><div class="readout rd-r"></div>`).run();}
function mPyth(el){sliders(el,[{k:'d',l:'θ (degrees)',min:0,max:360,step:5,v:35}],V=>{const t=rad(V.d),c=Math.cos(t),s=Math.sin(t);$('.py-g',el).innerHTML=circleFig(t,{arc:false});
  $('.py-r',el).innerHTML=`<div class="eqline math">(${nf(s)})² + (${nf(c)})² = ${(s*s).toFixed(4)} + ${(c*c).toFixed(4)} = <b>${(s*s+c*c).toFixed(4)}</b></div>The blue and green legs and the radius make a right triangle with hypotenuse 1, so by Pythagoras: <b>sin²θ + cos²θ = 1</b> for every angle.<br><span class="mute">Use it to find one value from the other: if sin θ = 3/5, then cos θ = ±4/5 (sign from the quadrant).</span>`;},`<div class="py-g"></div><div class="readout py-r"></div>`).run();}
const SPEC=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330];
function mSpecial(el){chooser(el,SPEC.map(d=>({t:d+'°',html:()=>{const e=exact(d);return circleFig(rad(d),{W:260})+`<div class="readout"><b>${d}° = ${radStr(d)}</b>: &nbsp; cos = <b>${e[0]}</b>, sin = <b>${e[1]}</b>, tan = <b>${e[2]}</b><br><span class="mute">Reference angle ${[d,180-d,d-180,360-d][Math.floor(d/90)%4]%90===0&&d%90===0?'— on an axis':[d,180-d,d-180,360-d][Math.floor(d/90)%4]+'°'}. The quadrant sets the signs; the reference angle sets the numbers (30°: ½ and √3/2; 45°: √2/2 both).</span></div>`;}})),2);}
function mGraphs(el){let fn=0;const F=[{n:'sin',f:Math.sin,col:'#2563eb'},{n:'cos',f:Math.cos,col:'#059669'},{n:'tan',f:Math.tan,col:'#9333ea'}];el.innerHTML=`<div class="row">${F.map((x,i)=>`<button data-fn="${i}">y = ${x.n} x</button>`).join('')}</div><div class="gr-s"></div>`;
 const sp=sliders($('.gr-s',el),[{k:'t',l:'x (degrees)',min:0,max:360,step:5,v:60}],V=>{const t=rad(V.t),f=F[fn];const G=grid({x0:-1,x1:7,y0:-3,y1:3,u:52,uy:40,lab:100,laby:1});
  let s=curve(G,x=>{if(fn===2&&Math.abs(Math.cos(x))<0.03)return NaN;return f.f(x);},f.col,3);if(fn===2)s+=vline(G,PI/2,'#e11d48')+vline(G,3*PI/2,'#e11d48');const y=f.f(t);if(isFinite(y)&&Math.abs(y)<3.2)s+=gdot(G,t,y,'#e11d48',7);s+=piTicks(G,0,2);
  $('.gr-c',el).innerHTML=circleFig(t,{W:200});$('.gr-g',el).innerHTML=G.svg(s);
  $('.gr-r',el).innerHTML=fn===2?`tan x = sin x / cos x = <b>${Math.abs(Math.cos(t))<1e-9?'undefined':nf(Math.tan(t))}</b>. Asymptotes where cos x = 0 (x = π/2, 3π/2). Period π.`:`${f.n} ${V.t}° = <b>${nf(f.f(t))}</b> — the ${fn?'horizontal (green)':'vertical (blue)'} length on the circle, unrolled onto the graph. Range −1 to 1, period 2π.`;},`<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px"><div class="gr-c" style="flex:0 0 200px"></div><div class="gr-g" style="flex:1 1 300px"></div></div><div class="readout gr-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-fn]');if(!b)return;fn=+b.dataset.fn;$$('[data-fn]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$('[data-fn]',el).classList.add('sel');sp.run();}
const G2={x0:-1,x1:13,y0:-6,y1:6,u:30,uy:24,lab:100,laby:1};
function mAMP(el){graphLab(el,{g:G2,params:[{k:'A',l:'amplitude A',min:0.5,max:4,step:.5,v:2},{k:'B',l:'B',min:0.5,max:3,step:.5,v:1},{k:'D',l:'midline D',min:-2,max:2,step:.5,v:0}],
 curves:V=>[{f:Math.sin,col:'#9ca3af',w:2,dash:'6 5'},{f:x=>V.A*Math.sin(V.B*x)+V.D}],extra:(G,V)=>hline(G,V.D,'#059669')+hline(G,V.D+V.A,'#f59e0b','2 4')+hline(G,V.D-V.A,'#f59e0b','2 4')+piTicks(G,0,4),
 eq:V=>`y = ${nf(V.A)} sin(${V.B===1?'':nf(V.B)}x)${V.D?(V.D<0?' − ':' + ')+nf(Math.abs(V.D)):''}`,
 read:V=>`Amplitude <b>${nf(V.A)}</b> (half the max-to-min distance). Midline <b>y = ${nf(V.D)}</b> (green). Max ${nf(V.D+V.A)}, min ${nf(V.D-V.A)}. Period = 2π/B = <b>${radStr(Math.round(360/V.B))}</b>${360%V.B===0?'':' ≈ '+(2*PI/V.B).toFixed(2)}.`});}
function mShiftT(el){graphLab(el,{g:G2,params:[{k:'A',l:'A',min:-3,max:3,step:.5,v:2},{k:'B',l:'B',min:0.5,max:2,step:.5,v:1},{k:'C',l:'phase shift h',min:-3,max:3,step:.25,v:1},{k:'D',l:'D',min:-2,max:2,step:.5,v:1}],
 curves:V=>[{f:Math.cos,col:'#9ca3af',w:2,dash:'6 5'},{f:x=>V.A*Math.cos(V.B*(x-V.C))+V.D}],extra:(G,V)=>hline(G,V.D,'#059669')+gdot(G,V.C,V.A+V.D,'#e11d48',7,'start of cycle')+piTicks(G,0,4),
 eq:V=>`y = ${V.A===1?'':V.A===-1?'−':nf(V.A)}cos(${V.B===1?'':nf(V.B)}${V.C?`(x ${V.C<0?'+':'−'} ${nf(Math.abs(V.C))})`:'x'})${V.D?(V.D<0?' − ':' + ')+nf(Math.abs(V.D)):''}`,
 read:V=>`Starting from y = cos x: ${V.A<0?'<b>flip</b> and ':''}stretch to amplitude ${nf(Math.abs(V.A))}, period 2π/${nf(V.B)} ≈ ${(2*PI/V.B).toFixed(2)}, shift <b>${nf(Math.abs(V.C))} ${V.C>=0?'right':'left'}</b> and <b>${nf(Math.abs(V.D))} ${V.D>=0?'up':'down'}</b>.<br><span class="mute">The red dot is where the shifted cosine cycle begins (at a ${V.A>0?'maximum':'minimum'}).</span>`});}
function mMatch(el){let T;const nt=()=>{T={A:pick([1,1.5,2,3]),B:pick([0.5,1,2]),D:pick([-1,0,1,2])};};nt();
 const host=document.createElement('div');el.appendChild(host);
 const sp=graphLab(host,{g:G2,params:[{k:'A',l:'A',min:0.5,max:3,step:.5,v:1},{k:'B',l:'B',min:0.5,max:2,step:.5,v:1},{k:'D',l:'D',min:-2,max:2,step:.5,v:0}],
  curves:V=>[{f:x=>T.A*Math.sin(T.B*x)+T.D,col:'#f59e0b',w:6},{f:x=>V.A*Math.sin(V.B*x)+V.D,col:'#2563eb',w:2.5}],extra:G=>piTicks(G,0,4),eq:V=>`your graph: y = ${nf(V.A)} sin(${nf(V.B)}x) + ${nf(V.D)}`,
  read:V=>V.A===T.A&&V.B===T.B&&V.D===T.D?`<span class="good">🎯 Match! Amplitude ${T.A}, period ${(2*PI/T.B).toFixed(2)} (B = ${T.B}), midline y = ${T.D}.</span>`:`Match the thick orange target. Read its <b>midline</b> (middle height), <b>amplitude</b> (top − middle), and <b>period</b> (length of one full wave).`});
 const b=document.createElement('div');b.className='row';b.innerHTML='<button>New target ↻</button>';el.appendChild(b);b.addEventListener('click',()=>{nt();sp.run();});}
function mFerris(el){sliders(el,[{k:'r',l:'radius (m)',min:5,max:25,v:15},{k:'T',l:'minutes per turn',min:2,max:12,v:8},{k:'t',l:'time t (min)',min:0,max:24,step:.25,v:2}],V=>{const c=V.r+2,h=t=>-V.r*Math.cos(2*PI*t/V.T)+c;const a=2*PI*V.t/V.T;
  const W=180,cx=90,cy=95,R=70,px=cx+R*Math.sin(a),py=cy+R*Math.cos(a);
  $('.fw-w',el).innerHTML=`<svg viewBox="0 0 ${W} 190" class="fig" style="max-width:180px"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#94a3b8" stroke-width="3"/><line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#64748b" stroke-width="2"/><line x1="0" y1="${cy+R+8}" x2="${W}" y2="${cy+R+8}" stroke="#374151" stroke-width="2"/><circle cx="${px}" cy="${py}" r="9" fill="#e11d48"/></svg>`;
  const G=grid({x0:0,x1:24,y0:0,y1:55,u:14,uy:4,lab:4,laby:10,gsy:10,xl:'t (min)',yl:'height (m)'});$('.fw-g',el).innerHTML=G.svg(curve(G,h)+hline(G,c,'#059669')+gdot(G,V.t,h(V.t),'#e11d48',7));
  $('.fw-r',el).innerHTML=`<div class="eqline math">h(t) = −${V.r} cos(2πt/${V.T}) + ${c}</div>At t = ${V.t} min the rider is <b>${nf(h(V.t))} m</b> high.<br>Amplitude = radius ${V.r}; midline = axle height ${c} (2 m platform + ${V.r}); period = ${V.T} min; −cos because you board at the <b>bottom</b>.`;},`<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px"><div class="fw-w" style="flex:0 0 180px"></div><div class="fw-g" style="flex:1 1 320px"></div></div><div class="readout fw-r"></div>`).run();}

L['A2-11-1']={goal:'I can find the coordinates of a point on the unit circle as (cos θ, sin θ).',
 life:{title:'A Ferris wheel seat',html:'Picture a Ferris wheel with radius 1. As it turns through angle θ, your seat is <b>cos θ</b> right of the center and <b>sin θ</b> above it. The unit circle extends sine and cosine from right-triangle angles to <b>any</b> angle.'},
 see:[{title:'Turn around the unit circle',hint:'Slide θ all the way around. Watch the signs change by quadrant.',mount:mUnit}],
 vocab:[['Unit circle','Circle of radius 1 centered at the origin.'],['cos θ','x-coordinate of the point at angle θ.'],['sin θ','y-coordinate.'],['Standard position','Start on the positive x-axis, turn counterclockwise.']],
 examples:[ex('Example 1','Coordinates at θ = 90° and 180°',[['90°: (0, 1) → cos 90° = 0, sin 90° = 1','Straight up.'],['180°: (−1, 0) → cos 180° = −1','Straight left.']]),
  ex('Example 2','Signs of cos and sin at θ = 200°',[['200° is in quadrant III','Between 180° and 270°.'],['cos < 0, sin < 0','Left and down.']])],
 mistake:{bad:'Point is (sin θ, cos θ)',good:'(cos θ, sin θ)',why:'Alphabetical order matches (x, y): <b>c</b>os before <b>s</b>in.'},
 practice(){const d=pick([0,90,180,270,360]);const c=Math.round(Math.cos(rad(d))),s=Math.round(Math.sin(rad(d)));if(Math.random()<.5)return num(`Find cos ${d}° and sin ${d}° from the unit circle.`,[[`cos ${d}° =`,c],[`sin ${d}° =`,s]],'Where is the point after turning '+d+'°?',[[`(${c}, ${s})`,'On an axis.']]);
  const D=rand(1,359);const qd=D%90===0?null:Math.floor(D/90)+1;if(!qd)return num(`sin ${D}° = ?`,[['sin =',Math.round(Math.sin(rad(D)))]],'On an axis.',[[`${Math.round(Math.sin(rad(D)))}`,'']]);const sg=['cos +, sin +','cos −, sin +','cos −, sin −','cos +, sin −'];return mc(`θ = ${D}°. Which signs are correct?`,sg[qd-1],sg,`${D}° is in quadrant ${qd}.`);},
 check:[q('Point at θ = 0°?',['(0, 1)','(1, 0)','(−1, 0)','(0, 0)'],1,''),q('sin 270° = ?',['1','0','−1','undefined'],2,'Straight down.'),q('In quadrant II…',['cos > 0, sin > 0','cos < 0, sin > 0','cos < 0, sin < 0','cos > 0, sin < 0'],1,'Left and up.')]};

L['A2-11-2']={goal:'I can convert between degrees and radians and explain what a radian measures.',
 life:{title:'Measuring with the radius',html:'Wrap the radius of a wheel around its edge: the angle it covers is <b>1 radian</b> (≈ 57.3°). A full turn takes 2π radius-lengths — that’s why 360° = 2π rad. Physics, engineering, and calculus all use radians.'},
 see:[{title:'Arc length in radius units',hint:'Turn the angle and read the arc length in radians.',mount:mRad}],
 vocab:[['Radian','Angle whose arc length equals the radius.'],['Degrees → radians','multiply by π/180.'],['Radians → degrees','multiply by 180/π.']],
 examples:[ex('Example 1','Convert 135° to radians.',[['135 · π/180 = 3π/4','Simplify 135/180 = 3/4.']]),
  ex('Example 2','Convert 5π/6 to degrees.',[['5π/6 · 180/π = 150°','π cancels.']])],
 mistake:{bad:'π = 180 so π ≈ 180',good:'π rad = 180°',why:'π is still ≈ 3.14; it’s the <b>angle</b> π radians that equals 180°.'},
 practice(){const d=pick([30,45,60,90,120,135,150,180,210,225,240,270,300,315,330,360]);const g=gcd(d,180);if(Math.random()<.5)return num(`Convert <b>${d}°</b> to radians. Write it as (p/q)π in lowest terms.`,[['p =',d/g],['q =',180/g]],'Multiply by π/180.',[[`${d}π/180 = ${radStr(d)}`,'Simplify.']]);
  return num(`Convert <b>${radStr(d)}</b> radians to degrees.`,[['degrees =',d]],'Multiply by 180/π.',[[`${radStr(d)} · 180/π = ${d}°`,'']]);},
 check:[q('π/2 rad = ?',['90°','180°','45°','360°'],0,''),q('1 radian ≈ ?',['1°','57.3°','3.14°','90°'],1,''),q('300° = ?',['5π/3','3π/5','10π/3','5π/6'],0,'300/180 = 5/3.')]};

L['A2-11-3']={goal:'I can use the Pythagorean identity sin²θ + cos²θ = 1 to find missing trig values.',
 life:{title:'One value gives the other',html:'If a satellite’s position angle has sin θ = 0.6, you don’t need the angle to find cos θ: since the point lies on a circle of radius 1, <b>cos²θ = 1 − 0.36 = 0.64</b>, so cos θ = ±0.8.'},
 see:[{title:'The triangle inside the circle',hint:'Move θ. The sum is always 1.',mount:mPyth}],
 vocab:[['Pythagorean identity','sin²θ + cos²θ = 1.'],['sin²θ','Means (sin θ)².'],['Choosing ±','Use the quadrant to choose the sign.']],
 examples:[ex('Example 1','sin θ = 5/13, θ in quadrant II. Find cos θ.',[['cos²θ = 1 − 25/169 = 144/169','Identity.'],['cos θ = −12/13','Negative in quadrant II.']]),
  ex('Example 2','cos θ = −0.6, θ in quadrant III. Find sin θ and tan θ.',[['sin θ = −0.8','sin² = 0.64; negative in III.'],['tan θ = −0.8/−0.6 = 4/3','']])],
 mistake:{bad:'sin θ + cos θ = 1',good:'sin²θ + cos²θ = 1',why:'At 45°: sin + cos ≈ 1.41, but the <b>squares</b> add to 1.'},
 practice(){const T=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);const qd=rand(1,4);const sgnC=[1,-1,-1,1][qd-1],sgnS=[1,1,-1,-1][qd-1];const giveSin=Math.random()<.5;
  return num(`${giveSin?`sin θ = ${sgnS<0?'−':''}${T[0]}/${T[2]}`:`cos θ = ${sgnC<0?'−':''}${T[0]}/${T[2]}`}, and θ is in quadrant ${qd}. Find ${giveSin?'cos θ':'sin θ'}.`,[[giveSin?'cos θ =':'sin θ =',(giveSin?sgnC:sgnS)*T[1]/T[2],0.002]],'Use sin²θ + cos²θ = 1, then the quadrant sign.',[[`${giveSin?'cos':'sin'}²θ = 1 − ${T[0]*T[0]}/${T[2]*T[2]} = ${T[1]*T[1]}/${T[2]*T[2]}`,'Identity.'],[`${giveSin?'cos':'sin'} θ = ${(giveSin?sgnC:sgnS)<0?'−':''}${T[1]}/${T[2]}`,`Sign from quadrant ${qd}.`]]);},
 check:[q('sin²40° + cos²40° = ?',['0','1','40','depends'],1,''),q('cos θ = 0.8, θ in quadrant IV. sin θ = ?',['0.6','−0.6','0.2','−0.2'],1,''),q('If sin θ = 1, cos θ = ?',['1','−1','0','undefined'],2,'')]};

L['A2-11-4']={goal:'I can find exact trig values of special angles (multiples of 30° and 45°) in all quadrants.',
 life:{title:'Exact beats approximate',html:'Engineers and test writers love 30°, 45°, and 60° because their sines and cosines are <b>exact</b>: ½, √2/2, √3/2. Learn one quadrant and use symmetry + signs for the rest of the circle.'},
 see:[{title:'Special-angle explorer',hint:'Click any angle. Notice the repeating numbers.',mount:mSpecial}],
 vocab:[['Reference angle','Acute angle to the x-axis.'],['30°–60°–90°','sides 1, √3, 2 → ½ and √3/2.'],['45°–45°–90°','sides 1, 1, √2 → √2/2.'],['ASTC','Quadrants where All / Sin / Tan / Cos are positive.']],
 examples:[ex('Example 1','Find cos 150°.',[['reference angle 30°',''],['cos 30° = √3/2; quadrant II → negative','cos 150° = −√3/2']]),
  ex('Example 2','Find sin(7π/4).',[['7π/4 = 315°, reference 45°',''],['quadrant IV → sin negative','−√2/2']])],
 mistake:{bad:'sin 30° = √3/2',good:'½',why:'At 30° the point is low on the circle, so the height (sine) is the small value, ½.'},
 practice(){const d=pick(SPEC.filter(x=>x%90));const e=exact(d);const which=rand(0,1);const vals=['1/2','√2/2','√3/2','−1/2','−√2/2','−√3/2'];return mc(`Exact value of <b>${which?'sin':'cos'} ${d}°</b>?`,e[which],vals,`Reference angle ${[d,180-d,d-180,360-d][Math.floor(d/90)]}°; quadrant ${Math.floor(d/90)+1} sets the sign.`);},
 check:[q('cos 60° = ?',['√3/2','1/2','√2/2','1'],1,''),q('sin 225° = ?',['√2/2','−√2/2','−1/2','1/2'],1,'Quadrant III.'),q('tan 45° = ?',['1','√3','0','√2/2'],0,'')]};

L['A2-11-5']={goal:'I can graph y = sin x, y = cos x, and y = tan x and describe their key features.',
 life:{title:'Unrolling the circle',html:'Track the height of a point on a spinning wheel over time and you draw a <b>sine wave</b>. Track its horizontal position and you draw a <b>cosine wave</b>. Sound, light, tides, and alternating current all follow these shapes.'},
 see:[{title:'Circle → graph',hint:'Pick a function and slide x.',mount:mGraphs}],
 vocab:[['Period','Length of one full cycle: 2π for sin and cos, π for tan.'],['Range','sin, cos: [−1, 1]; tan: all reals.'],['Asymptotes of tan','x = π/2 + kπ (where cos x = 0).']],
 examples:[ex('Example 1','Key points of y = sin x on [0, 2π]',[['(0, 0), (π/2, 1), (π, 0), (3π/2, −1), (2π, 0)','Zero, max, zero, min, zero.']]),
  ex('Example 2','Where is tan x undefined on [0, 2π]?',[['cos x = 0 at π/2 and 3π/2','Vertical asymptotes.']])],
 mistake:{bad:'cos x starts at 0 like sin x',good:'cos 0 = 1',why:'Cosine starts at its <b>maximum</b>; it is the sine wave shifted left π/2.'},
 practice(){const k=pick([0,1,2,3,4]);const x=k*PI/2,lbl=['0','π/2','π','3π/2','2π'][k];const f=pick(['sin','cos']);const v=Math.round(f==='sin'?Math.sin(x):Math.cos(x));return num(`From the graph of y = ${f} x, find ${f}(${lbl}).`,[['value =',v]],'Use the key points: zero, max, zero, min, zero (sin) or max, zero, min, zero, max (cos).',[[`${f}(${lbl}) = ${v}`,'Key point.']]);},
 check:[q('Period of y = cos x?',['π','2π','π/2','1'],1,''),q('Max of y = sin x?',['π/2','1','2π','∞'],1,''),q('tan x has asymptotes at…',['x = 0','x = π/2 + kπ','x = kπ','none'],1,'')]};

L['A2-11-6']={goal:'I can find the amplitude, midline, and period of y = A sin(Bx) + D.',
 life:{title:'Tides',html:'At one beach the water rises 2 m above and falls 2 m below an average level of 3 m, repeating every 12.4 hours. That is a sinusoid with <b>amplitude 2</b>, <b>midline y = 3</b>, and <b>period 12.4 h</b>.'},
 see:[{title:'Amplitude, midline, period',hint:'Change A, B, D. Compare with the dashed y = sin x.',mount:mAMP}],
 vocab:[['Amplitude |A|','Distance from the midline to a max.'],['Midline y = D','The horizontal line through the middle.'],['Period 2π/B','Horizontal length of one cycle.']],
 examples:[ex('Example 1','y = 3 sin(2x) − 1',[['amplitude 3, midline y = −1',''],['period 2π/2 = π','max 2, min −4']]),
  ex('Example 2','A graph has max 7, min 1, and repeats every 4π.',[['midline (7 + 1)/2 = 4, amplitude 3',''],['B = 2π/4π = ½ → y = 3 sin(½x) + 4','One possible equation.']])],
 mistake:{bad:'Amplitude = max − min',good:'(max − min)/2',why:'Amplitude is measured from the <b>midline</b>, not from the minimum.'},
 practice(){const A=rand(1,6),B=pick([1,2,3,4,0.5]),D=rand(-4,4);if(Math.random()<.5)return num(`y = ${A} sin(${B===1?'':nf(B)}x) ${D<0?'−':'+'} ${Math.abs(D)}. Find the maximum and minimum values.`,[['max =',D+A],['min =',D-A]],'Midline ± amplitude.',[[`midline ${D}, amplitude ${A}`,''],[`max ${D+A}, min ${D-A}`,'']]);
  return num(`A sinusoid has max ${D+A} and min ${D-A}. Find the amplitude and the midline value.`,[['amplitude =',A],['midline y =',D]],'Amplitude = (max − min)/2; midline = (max + min)/2.',[[`(${D+A} − ${P(D-A)})/2 = ${A}`,'Amplitude.'],[`(${D+A} + ${P(D-A)})/2 = ${D}`,'Midline.']]);},
 check:[q('Period of y = sin(4x)?',['4π','π/2','π/4','8π'],1,'2π/4.'),q('Midline of y = 2cos x + 5?',['y = 2','y = 5','y = 7','y = 3'],1,''),q('Amplitude of y = −3 sin x?',['−3','3','6','1/3'],1,'Always positive.')]};

L['A2-11-7']={goal:'I can describe and apply all transformations of y = A cos(B(x − h)) + D, including phase shift.',
 life:{title:'Daylight hours',html:'In Los Angeles, daylight is longest around June 21 and shortest around December 21. A cosine model of daylight needs a <b>phase shift</b> so its maximum lands on the right day — the same idea as shifting any function right by h.'},
 see:[{title:'Full sinusoid transformation',hint:'Change A, B, h, D. Watch the red cycle start point.',mount:mShiftT}],
 vocab:[['Phase shift h','Horizontal shift; cos(B(x − h)) moves right h.'],['Factor out B','cos(2x − π) = cos(2(x − π/2)) → shift π/2, not π.'],['A < 0','Reflection over the midline.']],
 examples:[ex('Example 1','Describe y = 2cos(x − π/3) + 1',[['amplitude 2, period 2π',''],['shift π/3 right, 1 up','Max at x = π/3.']]),
  ex('Example 2','Phase shift of y = sin(3x + π)',[['3x + π = 3(x + π/3)','Factor out B.'],['π/3 to the left','']])],
 mistake:{bad:'sin(2x − π) is shifted π right',good:'π/2 right',why:'Factor first: 2x − π = 2(x − π/2).'},
 practice(){const B=pick([1,2,3,4]),k=rand(1,5),s=pick([1,-1]);const h=s*k/B;return num(`Find the phase shift of <b>y = cos(${B===1?'':B}x ${s>0?'−':'+'} ${k})</b>. (Positive = right, negative = left; decimals OK.)`,[['shift h =',+h.toFixed(4),0.011]],'Factor out B from the inside.',[[`${B===1?'':B}x ${s>0?'−':'+'} ${k} = ${B}(x ${s>0?'−':'+'} ${fr(k,B)})`,'Factor.'],[`h = ${fr(s*k,B)}`,s>0?'right':'left']]);},
 check:[q('y = sin(x + π/4) shifts…',['π/4 right','π/4 left','up π/4','down π/4'],1,''),q('y = −cos x has a … at x = 0',['max','min','zero','asymptote'],1,'Flipped.'),q('Phase shift of cos(2x − π/2)?',['π/2 right','π/4 right','π/2 left','π right'],1,'2(x − π/4).')]};

L['A2-11-8']={goal:'I can write the equation of a sinusoid from its graph or key features.',
 life:{title:'Reverse engineering a wave',html:'A sound engineer sees a wave on a screen and needs its equation. Read the <b>midline</b> (middle), the <b>amplitude</b> (top − middle), and the <b>period</b> (one full wave); then B = 2π/period. Three readings, one formula.'},
 see:[{title:'Match the target wave',hint:'Adjust A, B, D until your blue curve sits on the orange one.',mount:mMatch}],
 vocab:[['From a graph','D = (max + min)/2, A = (max − min)/2, B = 2π/period.'],['sin or cos?','Starts at the midline going up → sin; starts at a max → cos.'],['Check a point','Plug a key point into your equation.']],
 examples:[ex('Example','A graph has max 5 at x = 0, min −1 at x = π.',[['D = 2, A = 3',''],['period 2π → B = 1','Max to min is half a period.'],['starts at max → y = 3cos x + 2','']])],
 mistake:{bad:'Period = distance from max to min',good:'max to next max',why:'Max to min is only <b>half</b> a period.'},
 practice(){const per=pick([[PI,'π',2],[2*PI,'2π',1],[4*PI,'4π',0.5],[PI/2,'π/2',4],[2*PI/3,'2π/3',3]]);return num(`A sinusoid repeats every <b>${per[1]}</b>. In y = A sin(Bx) + D, what is B (B &gt; 0)?`,[['B =',per[2]]],'B = 2π / period.',[[`B = 2π / ${per[1]} = ${per[2]}`,'']]);},
 check:[q('Max 10, min 2: midline?',['y = 4','y = 6','y = 8','y = 12'],1,''),q('Period 6 → B = ?',['6','π/3','3π','π/6'],1,'2π/6.'),q('Graph starts at a max at x = 0: use…',['sin','cos','tan','−sin'],1,'')]};

L['A2-11-9']={goal:'I can build and interpret sinusoidal models of periodic real-world situations.',
 life:{title:'Ferris wheel ride',html:'You board a Ferris wheel at the bottom. Your height goes up and down in a perfect wave: <b>amplitude</b> = radius, <b>midline</b> = axle height, <b>period</b> = time per turn. Starting at the bottom means a <b>−cos</b> model.'},
 see:[{title:'Ferris wheel model',hint:'Change the radius and the time per turn. Slide t.',mount:mFerris}],
 vocab:[['Sinusoidal model','y = A sin(B(t − h)) + D or A cos(…) + D.'],['B from period','B = 2π / period.'],['Starting point','Bottom → −cos; middle going up → sin; top → cos.']],
 examples:[ex('Example 1','Wheel: radius 20 m, axle 22 m high, 10 min per turn, board at bottom.',[['h(t) = −20cos(2πt/10) + 22','A = 20, D = 22, B = π/5.'],['h(2.5) = −20cos(π/2) + 22 = 22 m','Quarter turn: level with the axle.']]),
  ex('Example 2','Temperature: high 30°C at 3 pm, low 14°C at 3 am.',[['D = 22, A = 8, period 24 h',''],['T(t) = 8cos(2π(t − 15)/24) + 22','Max at t = 15.']])],
 mistake:{bad:'B = period',good:'B = 2π/period',why:'B counts cycles per 2π units, not the period itself.'},
 practice(){const r=rand(5,25),T=rand(4,12),k=pick([0.25,0.5,0.75,1]);const c=r+2;const h=-r*Math.cos(2*PI*k)+c;return num(`A Ferris wheel has radius ${r} m, its axle is ${c} m high, and one turn takes ${T} min. You board at the bottom. Height after <b>${nf(k*T)} min</b>?`,[['height =',+h.toFixed(4),0.05]],`That is ${k} of a turn.`,[[`h(t) = −${r}cos(2πt/${T}) + ${c}`,'Model.'],[`h(${nf(k*T)}) = −${r}cos(${nf(2*k)}π) + ${c} = ${nf(h)}`,'Evaluate.']]);},
 check:[q('Ferris wheel radius 12 → amplitude?',['24','12','6','1'],1,''),q('One turn every 5 min → B = ?',['5','2π/5','5/2π','10π'],1,''),q('Board at the bottom → model uses…',['sin','cos','−cos','tan'],2,'')]};

TOOLS['A2-11']={title:'Circle to graph',hint:'Slide x around the circle and watch sin, cos, or tan unroll.',mount:mGraphs};
})();
