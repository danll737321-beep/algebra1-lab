/* Geometry · Module 3 · Congruence */
(function(){
/* triangle with marks: sides {ab:n,bc:n,ca:n}, angles {a:n,b:n,c:n}, rt:'a'|'b'|'c' */
function triM(P,names,mk={},col='#1f2937',fill='rgba(37,99,235,.10)'){const [A,B,C]=P;let s=fP(P,fill,col);
 const sides={ab:[A,B],bc:[B,C],ca:[C,A]};Object.keys(sides).forEach(k=>{if(mk[k])s+=fTk(sides[k][0],sides[k][1],mk[k],'#b91c1c');});
 const ang={a:[A,B,C],b:[B,C,A],c:[C,A,B]};Object.keys(ang).forEach(k=>{const [V,X,Y]=ang[k];if(mk.rt===k)s+=fRt(V,X,Y,14,'#b91c1c');else if(mk[k])for(let i=0;i<mk[k];i++)s+=fA(V,X,Y,20+i*6,'#b91c1c');});
 return s+fVert(P,names);}
const T1=[[40,170],[190,170],[80,50]],T2=[[250,170],[400,170],[290,50]];
const CRIT=[
 {n:'SSS',mk:{ab:1,bc:2,ca:3},v:'✓ Congruent. Three pairs of sides are equal.'},
 {n:'SAS',mk:{ab:1,ca:2,a:1},v:'✓ Congruent. Two sides and the angle <b>between</b> them.'},
 {n:'ASA',mk:{a:1,b:2,ab:1},v:'✓ Congruent. Two angles and the side <b>between</b> them.'},
 {n:'AAS',mk:{a:1,b:2,bc:1},v:'✓ Congruent. Two angles and a side <b>not</b> between them.'},
 {n:'HL',mk:{rt:'a',bc:1,ab:2},v:'✓ Congruent (right triangles only). Hypotenuse and a leg.'},
 {n:'SSA ✗',mk:{ab:1,bc:2,c:1},v:'✗ Not enough. Two sides and an angle that is not between them can make two different triangles.'},
 {n:'AAA ✗',mk:{a:1,b:2,c:3},v:'✗ Not enough. Same angles only guarantee the same <b>shape</b> (similar), not the same size.'}];
function mountCrit(el){
 el.innerHTML=btns(CRIT.map(c=>c.n))+`<div id="kg"></div><div class="readout" id="kr"></div>`;
 const draw=i=>{const c=CRIT[i];let s=triM(T1,['A','B','C'],c.mk)+triM(T2,['D','E','F'],c.mk,'#1f2937','rgba(234,88,12,.12)');
  if(i===5){s=triM(T1,['A','B','C'],c.mk)+triM([[250,170],[400,170],[330,50]],['D','E','F'],{ab:1,bc:2,c:1},'#1f2937','rgba(234,88,12,.12)');}
  $('#kg',el).innerHTML=svgF(440,200,s,460);$('#kr',el).innerHTML=`<b>${c.n.replace(' ✗','')}</b>: ${c.v}<br><span class="mute">Matching marks = equal parts (red ticks for sides, arcs for angles).</span>`;selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountCorr(el){
 const PARTS=[['AB','DE','side'],['BC','EF','side'],['CA','FD','side'],['∠A','∠D','angle'],['∠B','∠E','angle'],['∠C','∠F','angle']];
 el.innerHTML=`<div class="eqline math">△ABC ≅ △DEF</div>`+btns(PARTS.map(p=>p[0]))+`<div id="cg"></div><div class="readout" id="cr"></div>`;
 const A=[40,170],B=[190,170],C=[80,50],D=[400,60],E=[250,60],F=[360,180];
 const draw=i=>{const p=PARTS[i];const hl={AB:[A,B],BC:[B,C],CA:[C,A],DE:[D,E],EF:[E,F],FD:[F,D]};let s=fP([A,B,C],'rgba(37,99,235,.1)')+fP([D,E,F],'rgba(234,88,12,.1)')+fVert([A,B,C],['A','B','C'])+fVert([D,E,F],['D','E','F']);
  if(p[2]==='side')s+=fL(...hl[p[0]],'#7c3aed',7)+fL(...hl[p[1]],'#7c3aed',7);else{const V={A:[A,B,C],B:[B,C,A],C:[C,A,B],D:[D,E,F],E:[E,F,D],F:[F,D,E]};s+=fA(...V[p[0][1]],30,'#7c3aed')+fA(...V[p[1][1]],30,'#7c3aed');}
  $('#cg',el).innerHTML=svgF(440,210,s,460);$('#cr',el).innerHTML=`<b>${p[0]} ≅ ${p[1]}</b>. The order of letters in the statement tells you the match: 1st ↔ 1st, 2nd ↔ 2nd, 3rd ↔ 3rd.<br>△DEF is turned and flipped, but the statement still tells you exactly which parts match.`;selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountTriSum(el){
 el.innerHTML=`<div class="ctrl">${ctl('ta','∠A',20,120,50)}${ctl('tb','∠B',20,120,60)}</div><div id="tg"></div><div class="readout" id="tr"></div>`;
 const draw=()=>{let [a,b]=vals(el,['ta','tb']);if(a+b>170){b=170-a;$('#tb',el).value=b;}$('#tav',el).textContent=a+DEG;$('#tbv',el).textContent=b+DEG;const c=180-a-b;
  const A=[60,200],B=[300,200],ta=a*Math.PI/180,tb=b*Math.PI/180,L=240*Math.sin(tb)/Math.sin(ta+tb),C=[A[0]+L*Math.cos(ta),A[1]-L*Math.sin(ta)];
  let s=fL(B,[400,200],'#9ca3af',2,'6 4')+fP([A,B,C])+fA(A,B,C,26,'#2563eb',a+'°')+fA(B,C,A,26,'#059669',b+'°')+fA(C,A,B,22,'#ea580c',c+'°')+fA(B,[400,200],C,40,'#7c3aed',(180-b)+'°')+fVert([A,B,C],['A','B','C']);
  $('#tg',el).innerHTML=svgF(420,230,s,440);
  $('#tr',el).innerHTML=`<b>Triangle Sum:</b> ${a} + ${b} + ∠C = 180 → ∠C = <b>${c}°</b>.<br><b>Exterior Angle</b> at B (purple) = ${180-b}° = ∠A + ∠C = ${a} + ${c}. It equals the two <b>remote interior</b> angles.`;};
 onIn(el,['ta','tb'],draw);draw();
}
function mountPgram(el){
 el.innerHTML=`<div class="ctrl">${ctl('qa','angle',40,90,65)}${ctl('qs','side',3,6,4)}</div>`+btns(['parallelogram','rhombus (all sides equal)'],'data-m')+`<div id="qg"></div><div class="readout" id="qr"></div>`;let mode=0;
 const draw=()=>{let [a,sd]=vals(el,['qa','qs']);$('#qav',el).textContent=a+DEG;$('#qsv',el).textContent=sd;const b=mode?sd:7,u=40,t=a*Math.PI/180;
  const A=[40,220],B=[40+b*u,220],D=[A[0]+sd*u*Math.cos(t),220-sd*u*Math.sin(t)],C=[B[0]+D[0]-A[0],D[1]],M=[(A[0]+C[0])/2,(A[1]+C[1])/2];
  const d1=Math.hypot(C[0]-A[0],C[1]-A[1])/u,d2=Math.hypot(D[0]-B[0],D[1]-B[1])/u;
  let s=fP([A,B,C,D],'rgba(37,99,235,.1)')+fL(A,C,'#7c3aed',2,'6 4')+fL(B,D,'#059669',2,'6 4')+fDot(M)+fA(A,B,D,24,'#ea580c',a+'°')+fA(C,D,B,24,'#ea580c',a+'°')+fA(B,C,A,22,'#2563eb',(180-a)+'°')+fA(D,A,C,22,'#2563eb',(180-a)+'°')+fVert([A,B,C,D],['A','B','C','D']);
  if(a===90)s+=fRt(A,B,D,14);
  $('#qg',el).innerHTML=svgF(Math.max(B[0],C[0])+50,240,s,480);
  $('#qr',el).innerHTML=`Opposite sides: AB = CD = ${b}, AD = BC = ${sd}. Opposite angles equal (${a}° and ${180-a}°); consecutive angles add to <b>180°</b>.<br>Diagonals bisect each other at the black point: AC = ${rd(d1,2)}, BD = ${rd(d2,2)}.${a===90?' <b>Right angle → rectangle: diagonals are equal.</b>':''}${mode?' <b>Rhombus: diagonals are perpendicular.</b>':''}`;$$('[data-m]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.m===mode));};
 onIn(el,['qa','qs'],draw);el.addEventListener('click',e=>{const x=e.target.closest('[data-m]');if(x){mode=+x.dataset.m;draw();}});draw();
}
/* compass constructions */
const arcP=(c,r,a1,a2,col='#7c3aed')=>{const p=a=>[c[0]+r*Math.cos(a*Math.PI/180),c[1]+r*Math.sin(a*Math.PI/180)];const s=p(a1),e=p(a2);return `<path d="M${s[0]} ${s[1]} A${r} ${r} 0 0 1 ${e[0]} ${e[1]}" fill="none" stroke="${col}" stroke-width="2"/>`;};
const CONS=[
 {n:'Perpendicular bisector of AB',st:[
  ['Draw segment AB.',()=>''],
  ['Open the compass more than half of AB. Draw an arc from A.',()=>arcP([100,150],130,-75,75)],
  ['Same opening: draw an arc from B. The arcs cross at two points.',()=>arcP([100,150],130,-75,75)+arcP([300,150],130,105,255)],
  ['Connect the two crossing points. This line is ⊥ to AB through its midpoint M.',()=>arcP([100,150],130,-75,75)+arcP([300,150],130,105,255)+fL([200,48],[200,252],'#ea580c',3)+fDot([200,150],'#ea580c')+fT(214,170,'M',{col:'#ea580c'})+fRt([200,150],[300,150],[200,48],12)]],
  base:()=>fL([100,150],[300,150])+fDot([100,150])+fDot([300,150])+fT(100,175,'A')+fT(300,175,'B')},
 {n:'Angle bisector of ∠A',st:[
  ['Start with ∠A.',()=>''],
  ['From A, draw an arc that crosses both rays (points P and Q).',()=>arcP([60,220],120,-40,2)+fDot([180,220])+fDot([60+120*Math.cos(-36*Math.PI/180),220+120*Math.sin(-36*Math.PI/180)])+fT(185,242,'P')+fT(158,140,'Q')],
  ['From P and from Q, draw equal arcs that cross at R.',()=>arcP([60,220],120,-40,2)+arcP([180,220],90,-70,-15)+arcP([157,149.5],90,-20,30)+fDot([246.5,159.4],'#ea580c')+fT(258,152,'R',{col:'#ea580c'})],
  ['Draw ray AR. It splits ∠A into two equal angles.',()=>arcP([60,220],120,-40,2)+arcP([180,220],90,-70,-15)+arcP([157,149.5],90,-20,30)+fL([60,220],[340,129],'#ea580c',3)]],
  base:()=>fL([60,220],[360,220])+fL([60,220],[330,24])+fDot([60,220])+fT(50,240,'A')}];
function mountCons(el){
 let c=0,st=0;
 el.innerHTML=btns(CONS.map(x=>x.n),'data-c')+`<div class="row"><button data-s="-1">◀ Back</button><button class="primary" data-s="1">Next step ▶</button></div><div id="og"></div><div class="readout" id="or"></div>`;
 const draw=()=>{const C=CONS[c];$('#og',el).innerHTML=svgF(400,270,C.base()+C.st[st][1](),420);$('#or',el).innerHTML=`<b>Step ${st+1} of ${C.st.length}:</b> ${C.st[st][0]}`;$$('[data-c]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.c===c));};
 el.addEventListener('click',e=>{const x=e.target.closest('[data-c],[data-s]');if(!x)return;if(x.dataset.c!==undefined){c=+x.dataset.c;st=0;}else st=Math.max(0,Math.min(CONS[c].st.length-1,st+ +x.dataset.s));draw();});draw();
}

L['GEO-3-1']={
 goal:'I can use a congruence statement to name corresponding sides and angles and solve for unknowns.',
 life:{title:'Replacement parts',html:'When a factory makes two identical car doors, every edge and every corner of one matches the other. A congruence statement like △ABC ≅ △DEF is the “parts list” that says which piece matches which.'},
 see:[{title:'Read the congruence statement',hint:'Tap a part of △ABC to see its partner in △DEF.',mount:mountCorr}],
 vocab:[['Congruent (≅)','Same size and shape. Rigid motions map one figure onto the other.'],['Corresponding parts','Parts that match under the mapping.'],['Order matters','△ABC ≅ △DEF means A ↔ D, B ↔ E, C ↔ F.'],['CPCTC','Corresponding Parts of Congruent Triangles are Congruent.']],
 examples:[
  {title:'Example 1 — Name the parts',prob:'△JKL ≅ △RST. Which side matches KL? Which angle matches ∠L?',raw:true,lines:[['K ↔ S, L ↔ T','2nd letters match, 3rd letters match.'],['KL ≅ ST','Side.'],['∠L ≅ ∠T','Angle.']]},
  {title:'Example 2 — Solve for x',prob:'△ABC ≅ △DEF, AB = 2x + 5, DE = 17. Find x.',raw:true,lines:[['AB = DE','Corresponding sides are equal (CPCTC).'],['2x + 5 = 17','Set up the equation.'],['x = 6','Subtract 5, divide by 2.']]}],
 mistake:{bad:'△ABC ≅ △DEF so AB ≅ EF',good:'AB ≅ DE',why:'Match letter positions: A, B are 1st and 2nd → D, E are 1st and 2nd.'},
 practice(){const t=rand(0,2);const L1=shuffle(['A','B','C']),L2=shuffle(['P','Q','R']),S1=['J','K','L'],S2=['X','Y','Z'];
  if(t===0){const i=rand(0,2),j=(i+1)%3,ans=S2[i]+S2[j],m=mcU(ans,[S2[j]+S2[(j+1)%3],S2[(i+2)%3]+S2[i],S2[i]+S2[(i+2)%3],S2[(j+1)%3]+S2[j]]);
   return {type:'mc',q:`△JKL ≅ △XYZ. Which side corresponds to <b>${S1[i]}${S1[j]}</b>?`,opts:m.opts,a:m.a,why:`${S1[i]} ↔ ${S2[i]}, ${S1[j]} ↔ ${S2[j]}.`};}
  if(t===1){const x=rand(2,9),a=rand(2,5),b=rand(1,12),v=a*x+b;return {q:`△ABC ≅ △DEF. AB = ${a}x + ${b} and DE = ${v}. Find x.`,fields:[{label:'x =',answer:x}],raw:true,hint:'Corresponding sides are equal.',sol:[[`${a}x + ${b} = ${v}`,'AB = DE.'],[`x = ${x}`,'Solve.']]};}
  const x=rand(5,20),a=rand(2,4),b=rand(-10,10),ang=a*x+b;if(ang<=10||ang>=150)return this.practice();return {q:`△PQR ≅ △STU. m∠Q = ${a}x ${b<0?'− '+(-b):'+ '+b} and m∠T = ${ang}°. Find x.`,fields:[{label:'x =',answer:x}],raw:true,hint:'∠Q corresponds to ∠T.',sol:[[`${a}x ${b<0?'− '+(-b):'+ '+b} = ${ang}`,'∠Q ≅ ∠T.'],[`x = ${x}`,'Solve.']]};},
 check:[
  {q:'△MNO ≅ △TUV. Which angle matches ∠O?',o:['∠T','∠U','∠V','∠M'],a:2,why:'3rd letter ↔ 3rd letter.'},
  {q:'△ABC ≅ △XYZ, BC = 3x and YZ = 21. x = ?',o:['7','18','63','24'],a:0,why:'3x = 21.'},
  {q:'CPCTC means…',o:['corresponding parts of congruent triangles are congruent','congruent polygons can’t be triangles','compass and protractor construction','none'],a:0,why:'Once triangles are congruent, all matching parts are.'}]
};

L['GEO-3-2']={
 goal:'I can decide if two triangles are congruent using SSS, SAS, ASA, AAS, or HL.',
 life:{title:'Why bridges use triangles',html:'Bolt three beams together into a triangle and it can’t change shape — three side lengths lock the triangle (SSS). A rectangle of beams can lean and collapse, so trusses on bridges and roofs are made of triangles.'},
 see:[{title:'The shortcuts (and two that fail)',hint:'Tap each criterion and look at the matching marks.',mount:mountCrit}],
 vocab:[['SSS','Three pairs of equal sides.'],['SAS','Two sides and the included angle (between them).'],['ASA','Two angles and the included side.'],['AAS','Two angles and a non-included side.'],['HL','Right triangles: hypotenuse and one leg.'],['Not valid','SSA and AAA do not prove congruence.']],
 examples:[
  {title:'Example 1 — Which shortcut?',prob:'AB ≅ DE, ∠B ≅ ∠E, BC ≅ EF.',raw:true,lines:[['∠B is between AB and BC','Included angle.'],['SAS','Two sides and the included angle.'],['△ABC ≅ △DEF','Congruent.']]},
  {title:'Example 2 — Not enough',prob:'∠A ≅ ∠D, ∠B ≅ ∠E, ∠C ≅ ∠F.',raw:true,lines:[['AAA','Only angles are known.'],['cannot conclude','A small and a large equilateral triangle have the same angles.']]}],
 mistake:{bad:'Two sides + any angle → SAS',good:'The angle must be BETWEEN the sides',why:'If the angle is not between the two sides, it is SSA, which can make two different triangles.'},
 practice(){const C=[
  ['AB ≅ DE, BC ≅ EF, CA ≅ FD','SSS'],['AB ≅ DE, ∠A ≅ ∠D, AC ≅ DF','SAS'],['∠A ≅ ∠D, AB ≅ DE, ∠B ≅ ∠E','ASA'],['∠A ≅ ∠D, ∠B ≅ ∠E, BC ≅ EF','AAS'],
  ['∠C and ∠F are right angles, AB ≅ DE (hypotenuses), BC ≅ EF','HL'],['AB ≅ DE, BC ≅ EF, ∠A ≅ ∠D','not enough (SSA)'],['∠A ≅ ∠D, ∠B ≅ ∠E, ∠C ≅ ∠F','not enough (AAA)'],
  ['BC ≅ EF, ∠B ≅ ∠E, AB ≅ DE','SAS'],['∠B ≅ ∠E, BC ≅ EF, ∠C ≅ ∠F','ASA'],['∠B ≅ ∠E, ∠C ≅ ∠F, AB ≅ DE','AAS']];
  const c=pick(C),m=mcU(c[1],shuffle(['SSS','SAS','ASA','AAS','HL','not enough (SSA)','not enough (AAA)']));
  return {type:'mc',q:`△ABC and △DEF: <b>${c[0]}</b>. Which reason proves congruence?`,opts:m.opts,a:m.a,why:`Answer: ${c[1]}. Check whether the angle/side is <b>between</b> the other two parts.`};},
 check:[
  {q:'∠P ≅ ∠X, PQ ≅ XY, ∠Q ≅ ∠Y. Reason?',o:['SAS','ASA','AAS','SSS'],a:1,why:'Side PQ is between ∠P and ∠Q.'},
  {q:'Which is NOT a congruence shortcut?',o:['AAS','HL','SSA','SSS'],a:2,why:'SSA can give two triangles.'},
  {q:'Two right triangles have equal hypotenuses and one pair of equal legs. Reason?',o:['HL','AAA','SSA','none'],a:0,why:'Hypotenuse-Leg.'}]
};

L['GEO-3-3']={
 goal:'I can use the Triangle Sum, Exterior Angle, Isosceles Triangle, and Midsegment theorems.',
 life:{title:'Roof pitch and A-frames',html:'A roof truss is an isosceles triangle: the two slanted rafters are equal, so the two base angles are equal. If the peak angle is 100°, each base angle must be (180 − 100) ÷ 2 = 40°.'},
 see:[{title:'Angles in a triangle',hint:'Change ∠A and ∠B. Watch ∠C and the exterior angle.',mount:mountTriSum}],
 vocab:[['Triangle Sum Theorem','The interior angles add to 180°.'],['Exterior Angle Theorem','An exterior angle equals the sum of the two remote interior angles.'],['Isosceles Triangle Theorem','If two sides are equal, the angles opposite them (base angles) are equal — and conversely.'],['Midsegment','Joins the midpoints of two sides; it is parallel to the third side and half as long.'],['Perpendicular Bisector Theorem','Any point on the perpendicular bisector of a segment is equally far from both endpoints.']],
 examples:[
  {title:'Example 1 — Exterior angle',prob:'Remote interior angles are 48° and 67°. Find the exterior angle.',raw:true,lines:[['48 + 67 = 115','Exterior Angle Theorem.'],['115°','Check: the adjacent interior angle is 65°, and 48 + 67 + 65 = 180. ✓']]},
  {title:'Example 2 — Isosceles',prob:'An isosceles triangle has vertex angle 36°. Find each base angle.',raw:true,lines:[['180 − 36 = 144','The base angles share what is left.'],['144 ÷ 2 = 72°','Base angles are equal.']]}],
 mistake:{bad:'Exterior angle = 180° − (sum of remote angles)',good:'Exterior angle = sum of remote angles',why:'180° minus the sum gives the <b>interior</b> angle next to it, not the exterior angle.'},
 practice(){const t=rand(0,3);
  if(t===0){const a=rand(25,90),b=rand(20,160-a);return {q:`Two angles of a triangle are ${a}° and ${b}°. Find the third angle.`,fields:[{label:'angle =',answer:180-a-b,unit:'°'}],raw:true,hint:'Angles add to 180°.',sol:[[`180 − ${a} − ${b} = ${180-a-b}`,'Triangle Sum.']]};}
  if(t===1){const a=rand(25,80),b=rand(25,80);return {q:`The remote interior angles are ${a}° and ${b}°. Find the exterior angle.`,fields:[{label:'exterior =',answer:a+b,unit:'°'}],raw:true,hint:'Add the two remote angles.',sol:[[`${a} + ${b} = ${a+b}`,'Exterior Angle Theorem.']]};}
  if(t===2){const v=2*rand(10,70);return {q:`An isosceles triangle has a vertex angle of ${v}°. Find each base angle.`,fields:[{label:'base angle =',answer:(180-v)/2,unit:'°'}],raw:true,hint:'Subtract from 180, then split equally.',sol:[[`(180 − ${v}) ÷ 2 = ${(180-v)/2}`,'Base angles are equal.']]};}
  const s=2*rand(3,15);return Math.random()<.5?{q:`DE is a midsegment of △ABC, parallel to BC. BC = ${s}. Find DE.`,fields:[{label:'DE =',answer:s/2}],raw:true,hint:'Midsegment = half the third side.',sol:[[`${s} ÷ 2 = ${s/2}`,'Midsegment Theorem.']]}
   :{q:`DE is a midsegment of △ABC, parallel to BC. DE = ${s/2}. Find BC.`,fields:[{label:'BC =',answer:s}],raw:true,hint:'The third side is twice the midsegment.',sol:[[`2 × ${s/2} = ${s}`,'Midsegment Theorem.']]};},
 check:[
  {q:'Angles of 35° and 85°. Third angle?',o:['60°','120°','70°','50°'],a:0,why:'180 − 120 = 60.'},
  {q:'Base angles of an isosceles triangle are 50° each. Vertex angle?',o:['50°','80°','100°','130°'],a:1,why:'180 − 100 = 80.'},
  {q:'A midsegment is 9. The parallel side is…',o:['4.5','9','18','27'],a:2,why:'Twice the midsegment.'}]
};

L['GEO-3-4']={
 goal:'I can use properties of parallelograms, rectangles, rhombuses, and squares to find sides, angles, and diagonals.',
 life:{title:'Scissor lifts and folding gates',html:'A scissor lift is a chain of rhombuses: as it rises, the angles change but opposite sides stay parallel and equal, and the diagonals keep bisecting each other. That is why the platform stays level.'},
 see:[{title:'Explore a parallelogram',hint:'Change the angle (try 90°) and switch to a rhombus.',mount:mountPgram}],
 vocab:[['Parallelogram','Both pairs of opposite sides parallel. Opposite sides equal, opposite angles equal, consecutive angles supplementary, diagonals bisect each other.'],['Rectangle','Parallelogram with 4 right angles. Diagonals are congruent.'],['Rhombus','Parallelogram with 4 equal sides. Diagonals are perpendicular and bisect the angles.'],['Square','Both a rectangle and a rhombus.'],['Supplementary','Two angles that add to 180°.']],
 examples:[
  {title:'Example 1 — Angles',prob:'In parallelogram ABCD, m∠A = 72°. Find ∠B, ∠C, ∠D.',raw:true,lines:[['∠B = 180 − 72 = 108°','Consecutive angles are supplementary.'],['∠C = 72°, ∠D = 108°','Opposite angles are equal.']]},
  {title:'Example 2 — Diagonals bisect',prob:'Diagonals of parallelogram PQRS meet at T. PT = 3x − 1 and TR = x + 9. Find PR.',raw:true,lines:[['3x − 1 = x + 9','T is the midpoint of PR.'],['x = 5','Solve.'],['PT = 14, PR = 28','Whole diagonal = 2 × half.']]}],
 mistake:{bad:'Diagonals of every parallelogram are equal',good:'Only in rectangles (and squares)',why:'In a slanted parallelogram one diagonal is clearly longer. Equal diagonals is what makes a parallelogram a rectangle.'},
 practice(){const t=rand(0,3);
  if(t===0){const a=rand(40,140);if(a===90)return this.practice();return {q:`In parallelogram ABCD, m∠A = ${a}°. Find m∠B.`,fields:[{label:'∠B =',answer:180-a,unit:'°'}],raw:true,hint:'Consecutive angles add to 180°.',sol:[[`180 − ${a} = ${180-a}`,'Consecutive angles are supplementary.']]};}
  if(t===1){const x=rand(2,9),a=rand(3,5),c=rand(1,a-1),b=rand(-3,6),d=(a-c)*x+b,h=a*x+b;if(h<=0)return this.practice();return {q:`Diagonals of parallelogram ABCD meet at E. AE = ${a}x ${b<0?'− '+(-b):'+ '+b} and EC = ${c===1?'':c}x ${d<0?'− '+(-d):'+ '+d}. Find x and AC.`,fields:[{label:'x =',answer:x},{label:'AC =',answer:2*h}],raw:true,hint:'Diagonals bisect each other: AE = EC.',sol:[[`x = ${x}`,'Solve AE = EC.'],[`AE = ${h}, AC = ${2*h}`,'AC = 2 · AE.']]};}
  if(t===2){const a=rand(3,12),b=rand(3,12),dd=Math.hypot(a,b);return {q:`Rectangle ABCD has diagonal AC = ${rd(dd,2)}. How long is diagonal BD?`,fields:[{label:'BD =',answer:rd(dd,2)}],raw:true,hint:'What is special about a rectangle’s diagonals?',sol:[[`BD = ${rd(dd,2)}`,'Rectangle diagonals are congruent.']]};}
  const S=pick([['Diagonals are perpendicular','rhombus'],['Diagonals are congruent','rectangle'],['All four angles are right and all sides equal','square'],['Opposite sides parallel, nothing more','parallelogram']]);const m=mcU(S[1],['rhombus','rectangle','square','parallelogram','trapezoid']);
  return {type:'mc',q:`A parallelogram has this extra property: <b>${S[0]}</b>. The most specific name is…`,opts:m.opts,a:m.a,why:`${S[0]} → ${S[1]}.`};},
 check:[
  {q:'In parallelogram ABCD, ∠A = 115°. ∠C = ?',o:['65°','115°','245°','90°'],a:1,why:'Opposite angles are equal.'},
  {q:'Which quadrilateral always has perpendicular diagonals?',o:['rectangle','rhombus','parallelogram','trapezoid'],a:1,why:'Rhombus diagonals meet at 90°.'},
  {q:'Diagonals of a parallelogram…',o:['are always equal','bisect each other','are always perpendicular','never meet'],a:1,why:'They cut each other in half.'}]
};

L['GEO-3-5']={
 goal:'I can construct a perpendicular bisector and an angle bisector with a compass and straightedge and explain why they work.',
 life:{title:'Finding the fair spot',html:'Two friends live at A and B and want to meet at a park the same distance from both. Every point on the <b>perpendicular bisector</b> of AB is equally far from A and B — a compass construction finds that line exactly.'},
 see:[{title:'Compass constructions, step by step',hint:'Pick a construction, then tap Next step.',mount:mountCons}],
 vocab:[['Compass','Draws arcs; every point on an arc is the same distance from the center.'],['Straightedge','Draws straight lines (no measuring).'],['Perpendicular bisector','Arcs of equal radius from A and B cross at points equally far from A and B.'],['Angle bisector','A ray that splits an angle into two equal angles.'],['Why it works','The constructions build congruent triangles (SSS), so the matching parts are equal (CPCTC).']],
 examples:[
  {title:'Example 1 — Using the bisector',prob:'Ray AR bisects ∠PAQ, which measures 86°. Find m∠PAR.',raw:true,lines:[['86 ÷ 2 = 43°','A bisector makes two equal halves.']]},
  {title:'Example 2 — Why the perpendicular bisector works',prob:'Arcs from A and B with the same radius cross at X.',raw:true,lines:[['XA = XB','Both are radii of the same opening.'],['X is on the perpendicular bisector','Points equally far from A and B lie on it.'],['Two such points X and Y determine the line','Two points make a line.']]}],
 mistake:{bad:'Compass opening less than half of AB',good:'Open the compass MORE than half of AB',why:'If the radius is too small, the arcs from A and B never cross, so you get no points.'},
 practice(){const t=rand(0,2);
  if(t===0){const a=2*rand(15,80);return {q:`A ray bisects an angle of ${a}°. What is the measure of each new angle?`,fields:[{label:'angle =',answer:a/2,unit:'°'}],raw:true,hint:'Bisect = cut in half.',sol:[[`${a} ÷ 2 = ${a/2}`,'Angle bisector.']]};}
  if(t===1){const A=[rand(-6,4),rand(-6,6)],B=[A[0]+2*rand(1,5),A[1]+2*rand(-3,3)],M=midp(A,B);return {q:`You construct the perpendicular bisector of AB with A${XYs(A)} and B${XYs(B)}. Where does it cross AB?`,fields:[{label:'x =',answer:M[0]},{label:'y =',answer:M[1]}],raw:true,hint:'At the midpoint.',sol:[[`M = ((${fmtNeg(A[0])} + ${P(B[0])})/2, (${fmtNeg(A[1])} + ${P(B[1])})/2) = ${XYs(M)}`,'Midpoint.']]};}
  const d=rand(4,12),m=mcU(String(d),[String(2*d),String(d/2),String(d+2)]);return {type:'mc',q:`Point X is on the perpendicular bisector of AB, and XA = ${d}. What is XB?`,opts:m.opts,a:m.a,why:'Points on the perpendicular bisector are equidistant from A and B.'};},
 check:[
  {q:'In the perpendicular bisector construction, the compass opening must be…',o:['less than half of AB','more than half of AB','exactly AB','any size'],a:1,why:'Otherwise the arcs don’t meet.'},
  {q:'An angle bisector splits a 130° angle into…',o:['two 65° angles','two 130° angles','65° and 115°','four angles'],a:0,why:'130 ÷ 2 = 65.'},
  {q:'Why does the angle-bisector construction work?',o:['It makes congruent triangles (SSS)','It guesses','It uses a protractor','It makes parallel lines'],a:0,why:'The arcs create equal sides, so the triangles are congruent by SSS.'}]
};
})();
