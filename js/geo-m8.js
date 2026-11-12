/* Geometry · Module 8 · Circles */
(function(){
const DR=Math.PI/180,C0=[200,170],R0=120;
const onC=(deg,r=R0,c=C0)=>[c[0]+r*Math.cos(-deg*DR),c[1]+r*Math.sin(-deg*DR)];
function arcPath(a1,a2,col='#ea580c',w=6,r=R0){/* CCW from a1 to a2 (math degrees) */let d=((a2-a1)%360+360)%360;const s=onC(a1,r),e=onC(a2,r);return `<path d="M${s[0]} ${s[1]} A${r} ${r} 0 ${d>180?1:0} 0 ${e[0]} ${e[1]}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;}
const circle=(col='#1f2937')=>`<circle cx="${C0[0]}" cy="${C0[1]}" r="${R0}" fill="rgba(37,99,235,.06)" stroke="${col}" stroke-width="2.5"/>`;
const piS=(n,d)=>{const f=frac(n,d);if(f==='0')return '0';let [num,den]=f.split('/');const neg=num.startsWith('−');if(neg)num=num.slice(1);const top=(neg?'−':'')+(num==='1'?'':num)+'π';return den?top+'/'+den:top;};

function mountArc(el){
 el.innerHTML=`<div class="ctrl">${ctl('aa','central angle',10,350,70,5)}</div><div id="ag"></div><div class="readout" id="ar"></div>`;
 const draw=()=>{const t=+$('#aa',el).value;$('#aav',el).textContent=t+'°';const A=onC(0),B=onC(t);
  let s=circle()+arcPath(t,360,'#9ca3af',4)+arcPath(0,t,'#ea580c',6)+fL(C0,A,'#2563eb',3)+fL(C0,B,'#2563eb',3)+fA(C0,A,B,26,'#2563eb',t+'°')+fDot(C0)+fDot(A,'#2563eb',6)+fDot(B,'#2563eb',6)+fT(C0[0]-12,C0[1]+20,'P')+fT(A[0]+16,A[1]+5,'A')+fT(B[0]+(B[0]>C0[0]?14:-14),B[1]+(B[1]>C0[1]?16:-8),'B');
  $('#ag',el).innerHTML=svgF(400,340,s,400);
  $('#ar',el).innerHTML=`Central angle ∠APB = <b>${t}°</b>, so the orange arc AB measures <b>${t}°</b>.<br>The gray arc measures 360° − ${t}° = <b>${360-t}°</b>. ${t<180?'Orange is the minor arc, gray is the major arc.':t===180?'Both are semicircles (180°).':'Now orange is the major arc.'}`;};
 onIn(el,['aa'],draw);draw();
}
function mountLen(el){
 el.innerHTML=`<div class="ctrl">${ctl('lt','angle θ',15,360,90,15)}${ctl('lr','radius r',1,10,4)}</div><div id="lg"></div><div class="readout" id="lr2"></div>`;
 const draw=()=>{const [t,r]=vals(el,['lt','lr']);$('#ltv',el).textContent=t+'°';$('#lrv',el).textContent=r;const A=onC(0),B=onC(t),L=t/360*2*Math.PI*r;
  let s=circle()+arcPath(0,t,'#ea580c',7)+fL(C0,A,'#2563eb',3)+fL(C0,B,'#2563eb',3)+fDot(C0)+fT((C0[0]+A[0])/2,C0[1]+20,'r = '+r,{col:'#2563eb'});
  if(t<360)s+=fA(C0,A,B,26,'#2563eb',t+'°');
  $('#lg',el).innerHTML=svgF(400,340,s,400);
  $('#lr2',el).innerHTML=`Arc length = (θ/360) · 2πr = (${t}/360) · 2π(${r}) = <b>${piS(t*r,180)} ≈ ${rd(L,2)}</b>.<br>Radian measure = arc length ÷ r = <b>${piS(t,180)}</b> ≈ ${rd(t*DR,3)} — it does not depend on r! (180° = π radians.)`;};
 onIn(el,['lt','lr'],draw);draw();
}
function mountSector(el){
 el.innerHTML=`<div class="ctrl">${ctl('st','angle θ',15,345,60,15)}${ctl('sr','radius r',2,12,8)}</div><div id="sg"></div><div class="readout" id="srr"></div>`;
 const draw=()=>{const [t,r]=vals(el,['st','sr']);$('#stv',el).textContent=t+'°';$('#srv',el).textContent=r+' in';const A=onC(0),B=onC(t),Ar=t/360*Math.PI*r*r;
  let s=circle()+`<path d="M${C0[0]} ${C0[1]} L${A[0]} ${A[1]} A${R0} ${R0} 0 ${t>180?1:0} 0 ${B[0]} ${B[1]}Z" fill="rgba(234,88,12,.35)" stroke="#ea580c" stroke-width="3"/>`+fA(C0,A,B,26,'#1f2937',t+'°')+fDot(C0);
  $('#sg',el).innerHTML=svgF(400,340,s,400);
  $('#srr',el).innerHTML=`The sector is ${t}/360 = ${frac(t,360)} of the whole circle.<br>Area = (θ/360) · πr² = (${t}/360) · π(${r})² = <b>${piS(t*r*r,360)} ≈ ${rd(Ar,2)} in²</b>. (Whole circle: ${r*r}π ≈ ${rd(Math.PI*r*r,1)} in².)`;};
 onIn(el,['st','sr'],draw);draw();
}
function mountInscribed(el){
 el.innerHTML=`<div class="ctrl">${ctl('ia','arc AB',40,180,100,10)}${ctl('iv','move V',0,100,50)}</div><div id="ig"></div><div class="readout" id="ir"></div>`;
 const draw=()=>{const [arc,v]=vals(el,['ia','iv']);$('#iav',el).textContent=arc+'°';$('#ivv',el).textContent='';const a1=-90-arc/2,a2=-90+arc/2,A=onC(a1),B=onC(a2),vd=a2+10+(360-arc-20)*v/100,V=onC(vd);
  let s=circle()+arcPath(a1,a2,'#ea580c',7)+fL(V,A,'#2563eb',3)+fL(V,B,'#2563eb',3)+fL(C0,A,'#9ca3af',2,'5 4')+fL(C0,B,'#9ca3af',2,'5 4')+fA(V,A,B,30,'#2563eb',rd(arc/2,1)+'°')+fA(C0,A,B,22,'#6b7280')+fDot(C0)+fDot(A)+fDot(B)+fDot(V,'#2563eb',7);
  s+=fT(A[0]-14,A[1]+14,'A')+fT(B[0]+14,B[1]+14,'B')+fT(V[0]+(V[0]>C0[0]?16:-16),V[1]+(V[1]>C0[1]?16:-6),'V',{col:'#2563eb'});
  $('#ig',el).innerHTML=svgF(400,340,s,400);
  $('#ir',el).innerHTML=`Intercepted arc AB = ${arc}° (= the central angle, gray).<br>Inscribed angle ∠AVB = ½ · ${arc}° = <b>${rd(arc/2,1)}°</b>. Move V anywhere on the other arc — the angle does not change.${arc===180?' <b>AB is a diameter → the inscribed angle is 90°.</b>':''}`;};
 onIn(el,['ia','iv'],draw);draw();
}
function mountQuad(el){
 el.innerHTML=`<div class="ctrl">${ctl('qa','A',100,170,130,5)}${ctl('qb','B',190,260,220,5)}${ctl('qc','C',280,350,300,5)}</div><div id="qg"></div><div class="readout" id="qr"></div>`;
 const draw=()=>{const [a,b,c]=vals(el,['qa','qb','qc']);['qa','qb','qc'].forEach(i=>$('#'+i+'v',el).textContent='');const d=40,P=[a,b,c,d].map(t=>onC(t));
  const ang=(i)=>{const V=P[i],X=P[(i+3)%4],Y=P[(i+1)%4];const v1=[X[0]-V[0],X[1]-V[1]],v2=[Y[0]-V[0],Y[1]-V[1]];return Math.acos((v1[0]*v2[0]+v1[1]*v2[1])/Math.hypot(...v1)/Math.hypot(...v2))/DR;};
  const g=[0,1,2,3].map(ang);let s=circle()+fP(P,'rgba(5,150,105,.12)','#059669');P.forEach((V,i)=>{s+=fA(V,P[(i+3)%4],P[(i+1)%4],24,i%2?'#7c3aed':'#ea580c',Math.round(g[i])+'°');});
  s+=fVert(P,['A','B','C','D']);
  $('#qg',el).innerHTML=svgF(400,340,s,400);
  $('#qr',el).innerHTML=`Inscribed quadrilateral ABCD: <b>opposite angles are supplementary</b>.<br>∠A + ∠C = ${Math.round(g[0])}° + ${Math.round(g[2])}° = <b>${Math.round(g[0]+g[2])}°</b> &nbsp; ∠B + ∠D = ${Math.round(g[1])}° + ${Math.round(g[3])}° = <b>${Math.round(g[1]+g[3])}°</b>.<br>Why: ∠A and ∠C intercept arcs that together make the whole 360°, and each is half its arc.`;};
 onIn(el,['qa','qb','qc'],draw);draw();
}
function mountTan(el){
 el.innerHTML=`<div class="ctrl">${ctl('td','distance from center',140,190,170,5)}</div><div id="tg"></div><div class="readout" id="tr"></div>`;
 const draw=()=>{const d=+$('#td',el).value;$('#tdv',el).textContent='';const r=90,c=[150,170],Pp=[c[0]+d,170],al=Math.acos(r/d),T1=[c[0]+r*Math.cos(al),170-r*Math.sin(al)],T2=[c[0]+r*Math.cos(al),170+r*Math.sin(al)],tl=Math.sqrt(d*d-r*r);
  let s=`<circle cx="${c[0]}" cy="170" r="${r}" fill="rgba(37,99,235,.06)" stroke="#1f2937" stroke-width="2.5"/>`+fL(Pp,T1,'#ea580c',3)+fL(Pp,T2,'#ea580c',3)+fL(c,T1,'#2563eb',2.5)+fL(c,T2,'#2563eb',2.5)+fL(c,Pp,'#9ca3af',2,'5 4')+fRt(T1,c,Pp,11)+fRt(T2,c,Pp,11)+fDot(c)+fDot(Pp,'#ea580c',6)+fDot(T1)+fDot(T2);
  s+=fT(c[0]-14,190,'O')+fT(Pp[0]+14,175,'P',{col:'#ea580c'})+fT(T1[0]+4,T1[1]-10,'A')+fT(T2[0]+4,T2[1]+22,'B')+fTk(Pp,T1,1,'#b91c1c')+fTk(Pp,T2,1,'#b91c1c');
  $('#tg',el).innerHTML=svgF(400,340,s,400);const u=r/9;
  $('#tr',el).innerHTML=`A tangent touches the circle at exactly one point and is <b>perpendicular to the radius</b> there (right angles at A and B).<br>So △OAP is a right triangle: r = 9, OP = ${rd(d/u,1)} → PA = √(${rd(d/u,1)}² − 9²) ≈ <b>${rd(tl/u,2)}</b>. Two tangents from the same point are <b>equal</b>: PA = PB.`;};
 onIn(el,['td'],draw);draw();
}

L['GEO-8-1']={
 goal:'I can name parts of a circle and find the measures of central angles and arcs.',
 life:{title:'Pie charts',html:'A pie chart is a circle cut by central angles. If 25% of students walk to school, that slice has a central angle of 0.25 × 360° = 90°, and its arc measures 90° too.'},
 see:[{title:'Central angle = arc',hint:'Change the central angle. Compare the orange and gray arcs.',mount:mountArc}],
 vocab:[['Central angle','Vertex at the center of the circle.'],['Arc measure','Equals its central angle (degrees).'],['Minor / major arc','Less than 180° (named with 2 letters) / more than 180° (named with 3 letters).'],['Semicircle','Exactly 180°.'],['Arc Addition','Adjacent arcs add: mAB + mBC = mABC.'],['Chord','A segment with both endpoints on the circle.']],
 examples:[
  {title:'Example 1 — Major arc',prob:'mAB = 64°. Find the major arc ACB.',raw:true,lines:[['360 − 64 = 296°','The whole circle is 360°.']]},
  {title:'Example 2 — Pie chart',prob:'A slice is 15% of a pie chart. Central angle?',raw:true,lines:[['0.15 × 360 = 54°','Percent of 360°.']]}],
 mistake:{bad:'Arc measure (degrees) = arc length',good:'Degrees measure the turn, not the distance',why:'A 90° arc on a tiny circle and on a huge circle both measure 90°, but their lengths are very different.'},
 practice(){const t=rand(0,2);
  if(t===0){const a=rand(20,170);return {q:`Minor arc AB measures ${a}°. Find the major arc ACB.`,fields:[{label:'measure =',answer:360-a,unit:'°'}],raw:true,hint:'360° minus the minor arc.',sol:[[`360 − ${a} = ${360-a}`,'Whole circle.']]};}
  if(t===1){const a=rand(20,120),b=rand(20,120);return {q:`mAB = ${a}° and mBC = ${b}° (adjacent arcs). Find mAC (the arc through B).`,fields:[{label:'measure =',answer:a+b,unit:'°'}],raw:true,hint:'Arc Addition Postulate.',sol:[[`${a} + ${b} = ${a+b}`,'Add adjacent arcs.']]};}
  const p=pick([5,10,15,20,25,30,40,45,60]);return {q:`A pie-chart slice represents ${p}% of the data. What is its central angle?`,fields:[{label:'angle =',answer:p*3.6,unit:'°'}],raw:true,hint:'Percent of 360°.',sol:[[`${p/100} × 360 = ${rd(p*3.6,1)}`,'Fraction of the circle.']]};},
 check:[
  {q:'A central angle of 75° intercepts an arc of…',o:['37.5°','75°','150°','285°'],a:1,why:'Arc = central angle.'},
  {q:'Minor arc 110°. Major arc?',o:['70°','250°','220°','110°'],a:1,why:'360 − 110.'},
  {q:'A semicircle measures…',o:['90°','180°','270°','360°'],a:1,why:'Half of 360°.'}]
};

L['GEO-8-2']={
 goal:'I can find arc length and convert between degrees and radians.',
 life:{title:'How far does a bike wheel roll?',html:'A wheel of radius 13 in turns 90°. A point on the tire travels a quarter of the circumference: (90/360) · 2π(13) ≈ 20.4 in. Engineers measure turning in <b>radians</b>: arc length ÷ radius.'},
 see:[{title:'Arc length and radians',hint:'Change θ and r. The radian measure ignores r.',mount:mountLen}],
 vocab:[['Arc length','s = (θ/360) · 2πr (θ in degrees).'],['Radian','The angle that cuts an arc equal to the radius. θ (radians) = s/r.'],['Key fact','180° = π radians.'],['Degrees → radians','× π/180.'],['Radians → degrees','× 180/π.']],
 examples:[
  {title:'Example 1 — Arc length',prob:'r = 10 cm, θ = 72°.',raw:true,lines:[['s = (72/360) · 2π(10)','Fraction of the circumference.'],['s = 4π ≈ 12.57 cm','72/360 = 1/5 of 20π.']]},
  {title:'Example 2 — Convert',prob:'Convert 135° to radians and 5π/6 to degrees.',raw:true,lines:[['135 · π/180 = 3π/4','Multiply by π/180, simplify.'],['5π/6 · 180/π = 150°','Multiply by 180/π.']]}],
 mistake:{bad:'s = (θ/360) · πr²',good:'s = (θ/360) · 2πr',why:'Arc length is part of the <b>circumference</b> (2πr). πr² is the area — that is for sectors.'},
 practice(){const t=rand(0,2);
  if(t===0){const th=pick([30,45,60,72,90,120,135,150,210,240,270]),r=rand(2,15),s=th/360*2*Math.PI*r;return {q:`Find the arc length for a central angle of ${th}° in a circle of radius ${r}. Round to the nearest hundredth.`,fields:[{label:'s ≈',answer:rd(s,2),tol:0.011}],raw:true,hint:'s = (θ/360) · 2πr.',sol:[[`s = (${th}/360) · 2π(${r}) = ${piS(th*r,180)}`,'Formula.'],[`≈ ${rd(s,2)}`,'Decimal.']]};}
  if(t===1){const th=pick([30,45,60,90,120,135,150,180,210,225,240,270,300,315,330]);return {q:`Convert ${th}° to radians. Write it as kπ and enter k (a fraction like 3/4 is fine).`,fields:[{label:'k =',answer:th/180,tol:0.006}],raw:true,hint:'Multiply by π/180.',sol:[[`${th} · π/180 = ${piS(th,180)}`,'Simplify.']]};}
  const n=pick([1,1,2,3,5,7]),d=pick([2,3,4,6]);return {q:`Convert ${piS(n,d)} radians to degrees.`,fields:[{label:'degrees =',answer:n/d*180,unit:'°'}],raw:true,hint:'Multiply by 180/π.',sol:[[`${piS(n,d)} · 180/π = ${rd(n/d*180,2)}°`,'Convert.']]};},
 check:[
  {q:'π/3 radians = ?',o:['30°','60°','90°','120°'],a:1,why:'180/3 = 60.'},
  {q:'Arc length of 90° in a circle of radius 4?',o:['π','2π','4π','16π'],a:1,why:'¼ · 8π = 2π.'},
  {q:'270° in radians?',o:['3π/2','3π/4','2π/3','π/2'],a:0,why:'270/180 = 3/2.'}]
};

L['GEO-8-3']={
 goal:'I can find the area of a sector of a circle.',
 life:{title:'Pizza slices',html:'A 16-inch pizza (radius 8 in) cut into 8 slices: each slice is a sector with a 45° angle and area (45/360) · π · 8² = 8π ≈ 25.1 in². Comparing slice sizes between pizzas is a sector-area problem.'},
 see:[{title:'Slice of a circle',hint:'Change the angle and the radius.',mount:mountSector}],
 vocab:[['Sector','The region between two radii and their arc (a “pizza slice”).'],['Sector area','A = (θ/360) · πr².'],['In radians','A = ½ r² θ.'],['Fraction idea','The sector is θ/360 of the whole circle.']],
 examples:[
  {title:'Example 1',prob:'r = 6, θ = 120°.',raw:true,lines:[['A = (120/360) · π(36)','One third of the circle.'],['A = 12π ≈ 37.70','Simplify.']]},
  {title:'Example 2 — Work backward',prob:'A sector of a circle with r = 10 has area 25π. Find θ.',raw:true,lines:[['25π = (θ/360) · 100π','Substitute.'],['θ/360 = 1/4 → θ = 90°','Solve.']]}],
 mistake:{bad:'Sector area = (θ/360) · 2πr',good:'(θ/360) · πr²',why:'2πr is the circumference (a length). Area needs πr² (square units).'},
 practice(){const t=rand(0,1);
  if(t===0){const th=pick([30,40,45,60,72,90,120,135,150,240,300]),r=rand(2,14),A=th/360*Math.PI*r*r;return {q:`Find the area of a sector with central angle ${th}° and radius ${r}. Round to the nearest hundredth.`,fields:[{label:'area ≈',answer:rd(A,2),tol:0.011}],raw:true,hint:'A = (θ/360) · πr².',sol:[[`A = (${th}/360) · π(${r*r}) = ${piS(th*r*r,360)}`,'Formula.'],[`≈ ${rd(A,2)}`,'Decimal.']]};}
  const r=pick([2,4,6,8,10,12]),th=pick([30,45,60,90,120,180,270]),k=th*r*r/360;return {q:`A sector of a circle with radius ${r} has area ${piS(th*r*r,360)}. Find the central angle.`,fields:[{label:'θ =',answer:th,unit:'°'}],raw:true,hint:'Set (θ/360) · πr² equal to the area.',sol:[[`${piS(th*r*r,360)} = (θ/360) · ${r*r}π`,'Substitute.'],[`θ = ${th}°`,'Solve.']]};},
 check:[
  {q:'Sector: r = 4, θ = 90°. Area?',o:['2π','4π','8π','16π'],a:1,why:'¼ · 16π.'},
  {q:'Which formula is sector area?',o:['(θ/360)·2πr','(θ/360)·πr²','πd','2πr²'],a:1,why:'A fraction of πr².'},
  {q:'A 60° sector is what fraction of the circle?',o:['1/3','1/6','1/4','1/60'],a:1,why:'60/360.'}]
};

L['GEO-8-4']={
 goal:'I can use the Inscribed Angle Theorem to find angle and arc measures.',
 life:{title:'Best seat at the stage',html:'Seats on a circular arc around a stage all see the stage at the <b>same angle</b>. Theater designers use the inscribed angle theorem: every point on the arc views the same chord at the same angle.'},
 see:[{title:'An inscribed angle is half its arc',hint:'Change the arc and move V along the circle.',mount:mountInscribed}],
 vocab:[['Inscribed angle','Vertex on the circle; sides are chords.'],['Intercepted arc','The arc inside the angle.'],['Inscribed Angle Theorem','Inscribed angle = ½ × intercepted arc.'],['Same arc','Inscribed angles intercepting the same arc are equal.'],['Semicircle','An angle inscribed in a semicircle is a right angle.']],
 examples:[
  {title:'Example 1',prob:'An inscribed angle intercepts an 84° arc.',raw:true,lines:[['½ · 84 = 42°','Inscribed Angle Theorem.']]},
  {title:'Example 2 — Backward',prob:'An inscribed angle measures 35°. Its arc?',raw:true,lines:[['2 · 35 = 70°','The arc is twice the inscribed angle.']]}],
 mistake:{bad:'Inscribed angle = its arc',good:'Inscribed angle = ½ arc',why:'Only a <b>central</b> angle equals its arc. Moving the vertex out to the circle halves the angle.'},
 practice(){const t=rand(0,2);
  if(t===0){const a=2*rand(10,90);return {q:`An inscribed angle intercepts an arc of ${a}°. Find the angle.`,fields:[{label:'angle =',answer:a/2,unit:'°'}],raw:true,hint:'Half the arc.',sol:[[`${a} ÷ 2 = ${a/2}`,'Inscribed Angle Theorem.']]};}
  if(t===1){const a=rand(10,85);return {q:`An inscribed angle measures ${a}°. Find its intercepted arc.`,fields:[{label:'arc =',answer:2*a,unit:'°'}],raw:true,hint:'The arc is twice the angle.',sol:[[`2 × ${a} = ${2*a}`,'Inscribed Angle Theorem.']]};}
  const a=rand(20,70);return {q:`Triangle ABC is inscribed in a circle with AB a diameter. ∠A = ${a}°. Find ∠B.`,fields:[{label:'∠B =',answer:90-a,unit:'°'}],raw:true,hint:'∠C is inscribed in a semicircle.',sol:[['∠C = 90°','Inscribed in a semicircle.'],[`∠B = 180 − 90 − ${a} = ${90-a}`,'Triangle sum.']]};},
 check:[
  {q:'Arc 130°. Inscribed angle?',o:['65°','130°','260°','50°'],a:0,why:'½ · 130.'},
  {q:'An angle inscribed in a semicircle measures…',o:['45°','90°','180°','depends'],a:1,why:'½ · 180°.'},
  {q:'Two inscribed angles intercept the same arc. They are…',o:['supplementary','equal','complementary','unrelated'],a:1,why:'Each is half the same arc.'}]
};

L['GEO-8-5']={
 goal:'I can use properties of shapes inscribed in circles, such as cyclic quadrilaterals and right triangles.',
 life:{title:'Round tables and frames',html:'A carpenter fitting a four-sided frame inside a round mirror knows the opposite corners of the frame must add to 180°. A triangle cut from a circle with one side along a diameter always has a perfect right angle.'},
 see:[{title:'A quadrilateral inscribed in a circle',hint:'Move A, B, and C around the circle.',mount:mountQuad}],
 vocab:[['Inscribed polygon','All its vertices lie on the circle.'],['Cyclic quadrilateral','Opposite angles are supplementary (add to 180°).'],['Right triangle in a circle','The hypotenuse is a diameter (Thales).'],['Regular polygon in a circle','Each side cuts an arc of 360°/n.']],
 examples:[
  {title:'Example 1 — Cyclic quadrilateral',prob:'ABCD is inscribed. ∠A = 3x + 10, ∠C = 2x + 20. Find ∠A.',raw:true,lines:[['3x + 10 + 2x + 20 = 180','Opposite angles supplementary.'],['5x = 150 → x = 30','Solve.'],['∠A = 100°','Substitute.']]},
  {title:'Example 2 — Find the diameter',prob:'A right triangle with legs 6 and 8 is inscribed in a circle. Radius?',raw:true,lines:[['hypotenuse = 10','6-8-10 triangle.'],['the hypotenuse is a diameter → r = 5','Half of 10.']]}],
 mistake:{bad:'In a cyclic quadrilateral, ∠A + ∠B = 180°',good:'∠A + ∠C = 180° (opposite angles)',why:'It is the <b>opposite</b> angles that are supplementary. Adjacent angles can be anything.'},
 practice(){const t=rand(0,2);
  if(t===0){const a=rand(50,130);return {q:`Quadrilateral ABCD is inscribed in a circle. ∠B = ${a}°. Find ∠D.`,fields:[{label:'∠D =',answer:180-a,unit:'°'}],raw:true,hint:'Opposite angles are supplementary.',sol:[[`180 − ${a} = ${180-a}`,'Cyclic quadrilateral.']]};}
  if(t===1){const T=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]]);return {q:`A right triangle with legs ${T[0]} and ${T[1]} is inscribed in a circle. Find the radius.`,fields:[{label:'r =',answer:T[2]/2}],raw:true,hint:'The hypotenuse is a diameter.',sol:[[`hypotenuse = ${T[2]}`,'Pythagorean Theorem.'],[`r = ${T[2]/2}`,'Half the diameter.']]};}
  const n=pick([3,4,5,6,8,9,10,12]);return {q:`A regular ${n}-gon is inscribed in a circle. What arc does each side cut off?`,fields:[{label:'arc =',answer:rd(360/n,2),unit:'°',tol:0.06}],raw:true,hint:'The n sides split 360° equally.',sol:[[`360 ÷ ${n} = ${rd(360/n,2)}`,'Equal arcs.']]};},
 check:[
  {q:'Cyclic quadrilateral with ∠A = 70°. ∠C = ?',o:['70°','110°','20°','290°'],a:1,why:'180 − 70.'},
  {q:'A triangle inscribed in a circle has a diameter as a side. The angle opposite it is…',o:['acute','90°','obtuse','60°'],a:1,why:'Inscribed in a semicircle.'},
  {q:'Each side of an inscribed regular hexagon cuts an arc of…',o:['30°','60°','90°','120°'],a:1,why:'360 ÷ 6.'}]
};

L['GEO-8-6']={
 goal:'I can use the facts that a tangent is perpendicular to the radius and that two tangents from a point are equal.',
 life:{title:'A belt around two wheels',html:'A bike chain or a car’s fan belt leaves each wheel along a tangent line. The tangent is always perpendicular to the radius where it touches — so engineers use right triangles to find belt lengths.'},
 see:[{title:'Tangents from an outside point',hint:'Move P farther from or closer to the circle.',mount:mountTan}],
 vocab:[['Tangent line','Touches the circle at exactly one point (point of tangency).'],['Tangent ⊥ radius','The radius to the point of tangency is perpendicular to the tangent.'],['Two-tangent theorem','Tangent segments from the same outside point are congruent.'],['Test for tangency','If OA² + PA² = OP², then PA is tangent at A (converse of Pythagoras).']],
 examples:[
  {title:'Example 1 — Tangent length',prob:'Radius 5, distance from center to P is 13. Find the tangent length PA.',raw:true,lines:[['∠OAP = 90°','Tangent ⊥ radius.'],['PA² + 5² = 13²','Pythagorean Theorem.'],['PA = 12','√144.']]},
  {title:'Example 2 — Two tangents',prob:'PA and PB are tangent. PA = 2x + 3, PB = 5x − 9. Find PA.',raw:true,lines:[['2x + 3 = 5x − 9','Tangents from one point are equal.'],['x = 4 → PA = 11','Solve, substitute.']]}],
 mistake:{bad:'OP² = OA² + ... use OP as a leg',good:'OP (center to outside point) is the hypotenuse',why:'The right angle is at the point of tangency A, so the side across from it, OP, is the hypotenuse.'},
 practice(){const t=rand(0,2);
  if(t===0){const T=pick([[5,12,13],[3,4,5],[8,15,17],[7,24,25],[6,8,10],[9,12,15]]);return {q:`A circle has radius ${T[0]}. Point P is ${T[2]} from the center. Find the length of a tangent segment from P.`,fields:[{label:'PA =',answer:T[1]}],raw:true,hint:'Tangent ⊥ radius → right triangle with hypotenuse OP.',sol:[[`PA² = ${T[2]}² − ${T[0]}² = ${T[1]*T[1]}`,'Pythagorean Theorem.'],[`PA = ${T[1]}`,'Square root.']]};}
  if(t===1){const x=rand(2,9),a=rand(2,4),c=a+rand(1,3),b=rand(1,9),d=(a*x+b)-c*x;return {q:`PA and PB are tangent to a circle from point P. PA = ${a}x + ${b}, PB = ${c}x ${d<0?'− '+(-d):'+ '+d}. Find PA.`,fields:[{label:'PA =',answer:a*x+b}],raw:true,hint:'Tangent segments from one point are equal.',sol:[[`${a}x + ${b} = ${c}x ${d<0?'− '+(-d):'+ '+d} → x = ${x}`,'Set equal.'],[`PA = ${a*x+b}`,'Substitute.']]};}
  const T=pick([[5,12,13],[3,4,5],[8,15,17]]),tan=Math.random()<.5,hyp=tan?T[2]:T[2]+1,m=mcU(tan?'yes':'no',['yes','no']);
  return {type:'mc',q:`OA = ${T[0]} (radius), PA = ${T[1]}, OP = ${hyp}. Is PA tangent to the circle at A?`,opts:m.opts,a:m.a,why:`${T[0]}² + ${T[1]}² = ${T[0]**2+T[1]**2}; OP² = ${hyp*hyp}. ${tan?'Equal → right angle → tangent.':'Not equal → not tangent.'}`};},
 check:[
  {q:'The angle between a tangent and the radius at the point of tangency is…',o:['45°','90°','180°','depends'],a:1,why:'Tangent ⊥ radius.'},
  {q:'r = 6, OP = 10. Tangent length?',o:['4','8','16','√136'],a:1,why:'√(100 − 36) = 8.'},
  {q:'Two tangents from P have lengths x + 5 and 12. x = ?',o:['7','17','12','5'],a:0,why:'x + 5 = 12.'}]
};
})();
