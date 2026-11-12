/* Geometry · Module 4 · Similarity */
(function(){
/* triangle from side c (base AB) and angles A, B at pixel scale u, origin O */
function triAng(O,c,a,b,u){const ta=a*Math.PI/180,tb=b*Math.PI/180,L=c*Math.sin(tb)/Math.sin(ta+tb);return [O,[O[0]+c*u,O[1]],[O[0]+L*u*Math.cos(ta),O[1]-L*u*Math.sin(ta)]];}
const len=(p,q,u)=>Math.hypot(p[0]-q[0],p[1]-q[1])/u;

function mountScale(el){
 el.innerHTML=`<div class="ctrl">${ctl('sk','scale factor k',0.5,2.5,1.5,0.25)}</div><div id="sg"></div><div class="readout" id="sr"></div>`;
 const draw=()=>{const k=+$('#sk',el).value;$('#skv',el).textContent=k;const u=26,T1=[[20,230],[20+4*u,230],[20,230-3*u]],o=150,T2=[[o,230],[o+4*k*u,230],[o,230-3*k*u]];
  let s=fP(T1)+fRt(T1[0],T1[1],T1[2])+fVert(T1,['A','B','C'])+fSide(T1[0],T1[1],cen(T1),'4')+fSide(T1[0],T1[2],cen(T1),'3')+fSide(T1[1],T1[2],cen(T1),'5');
  s+=fP(T2,'rgba(234,88,12,.12)')+fRt(T2[0],T2[1],T2[2])+fVert(T2,['D','E','F'])+fSide(T2[0],T2[1],cen(T2),rd(4*k,2))+fSide(T2[0],T2[2],cen(T2),rd(3*k,2))+fSide(T2[1],T2[2],cen(T2),rd(5*k,2));
  $('#sg',el).innerHTML=svgF(o+4*2.5*u+40,250,s,520);
  $('#sr',el).innerHTML=`△ABC ~ △DEF with scale factor <b>${k}</b>: DE/AB = ${rd(4*k,2)}/4 = EF/BC = ${rd(5*k,2)}/5 = DF/AC = ${rd(3*k,2)}/3 = <b>${k}</b>.<br>Angles match exactly. Perimeter: 12 → ${rd(12*k,2)} (× k). Area: 6 → ${rd(6*k*k,2)} (× k² = ${rd(k*k,3)}).`;};
 onIn(el,['sk'],draw);draw();
}
const SIMC=[
 {n:'AA',d:'Two pairs of equal angles → similar. (The third pair must match too, since angles add to 180°.)'},
 {n:'SSS~',d:'All three pairs of sides in the same ratio: 6/3 = 8/4 = 10/5 = 2 → similar.'},
 {n:'SAS~',d:'Two pairs of sides in the same ratio (6/3 = 8/4 = 2) and the included angles equal → similar.'}];
function mountSimCrit(el){
 el.innerHTML=btns(SIMC.map(c=>c.n))+`<div id="cg"></div><div class="readout" id="cr"></div>`;
 const draw=i=>{const T1=triAng([30,200],5,53.13,36.87,24),T2=triAng([200,200],10,53.13,36.87,24);const C1=cen(T1),C2=cen(T2);let s=fP(T1)+fP(T2,'rgba(234,88,12,.12)')+fVert(T1,['A','B','C'])+fVert(T2,['D','E','F']);
  if(i===0)s+=fA(T1[0],T1[1],T1[2],22,'#b91c1c','53°')+fA(T1[1],T1[2],T1[0],22,'#b91c1c','37°')+fA(T2[0],T2[1],T2[2],22,'#b91c1c','53°')+fA(T2[1],T2[2],T2[0],22,'#b91c1c','37°');
  if(i>=1)s+=fSide(T1[0],T1[1],C1,'5')+fSide(T1[0],T1[2],C1,'3')+fSide(T2[0],T2[1],C2,'10')+fSide(T2[0],T2[2],C2,'6');
  if(i===1)s+=fSide(T1[1],T1[2],C1,'4')+fSide(T2[1],T2[2],C2,'8');
  if(i===2)s+=fA(T1[0],T1[1],T1[2],22,'#b91c1c','53°')+fA(T2[0],T2[1],T2[2],22,'#b91c1c','53°');
  if(i!==0){s=s.replace('>5<','>5<');}
  $('#cg',el).innerHTML=svgF(470,220,s,480);$('#cr',el).innerHTML=`<b>${SIMC[i].n}</b>: ${i===1?'All three pairs of sides in the same ratio: 10/5 = 8/4 = 6/3 = 2 → similar.':i===2?'Two pairs of sides in the same ratio (10/5 = 6/3 = 2) and the included angle ∠A = ∠D = 53° → similar.':SIMC[0].d}`;selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountSplit(el){
 el.innerHTML=`<div class="ctrl">${ctl('st','DE position',2,8,4)}</div><div id="pg"></div><div class="readout" id="pr"></div>`;
 const draw=()=>{const t=+$('#st',el).value/10;$('#stv',el).textContent='';const A=[200,30],B=[40,250],C=[380,250],D=[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t],E=[A[0]+(C[0]-A[0])*t,A[1]+(C[1]-A[1])*t];
  const AB=10,AC=12,AD=rd(AB*t,1),AE=rd(AC*t,1);
  let s=fP([A,B,C])+fP([A,D,E],'rgba(234,88,12,.18)','#ea580c')+fL(D,E,'#ea580c',4)+fVert([A,B,C],['A','B','C'])+fT(D[0]-16,D[1]+5,'D')+fT(E[0]+16,E[1]+5,'E');
  s+=fT((A[0]+D[0])/2-18,(A[1]+D[1])/2,AD,{col:'#ea580c'})+fT((D[0]+B[0])/2-18,(D[1]+B[1])/2,rd(AB-AD,1))+fT((A[0]+E[0])/2+20,(A[1]+E[1])/2,AE,{col:'#ea580c'})+fT((E[0]+C[0])/2+20,(E[1]+C[1])/2,rd(AC-AE,1));
  $('#pg',el).innerHTML=svgF(420,270,s,440);
  $('#pr',el).innerHTML=`DE ∥ BC, so △ADE ~ △ABC (AA: they share ∠A, and corresponding angles are equal).<br><b>Triangle Proportionality:</b> AD/DB = AE/EC → ${AD}/${rd(AB-AD,1)} = ${AE}/${rd(AC-AE,1)} = ${rd(AD/(AB-AD),3)}.<br>Also AD/AB = AE/AC = DE/BC = ${t}.`;};
 onIn(el,['st'],draw);draw();
}
function mountBis(el){
 el.innerHTML=`<div class="ctrl">${ctl('ba','AC',3,10,6)}${ctl('bb','BC',3,10,9)}</div><div id="bg"></div><div class="readout" id="br"></div>`;
 const draw=()=>{let [b,a]=vals(el,['ba','bb']);$('#bav',el).textContent=b;$('#bbv',el).textContent=a;const c=Math.max(Math.abs(a-b)+1.5,Math.min(a+b-1.5,10));
  const u=320/Math.max(c,a,b)*0.9,A=[40,240],B=[40+c*u,240],xC=(b*b-a*a+c*c)/(2*c),yC=Math.sqrt(Math.max(b*b-xC*xC,0.01)),C=[40+xC*u,240-yC*u],ad=c*b/(a+b),D=[40+ad*u,240];
  let s=fP([A,B,C])+fL(C,D,'#ea580c',3)+fA(C,A,D,24,'#ea580c')+fA(C,D,B,30,'#ea580c')+fDot(D,'#ea580c')+fVert([A,B,C],['A','B','C'])+fT(D[0],262,'D',{col:'#ea580c'});
  s+=fSide(A,C,cen([A,B,C]),b)+fSide(B,C,cen([A,B,C]),a)+fT((A[0]+D[0])/2,232,rd(ad,2),{col:'#2563eb',sz:13})+fT((D[0]+B[0])/2,232,rd(c-ad,2),{col:'#2563eb',sz:13});
  $('#bg',el).innerHTML=svgF(Math.max(B[0],C[0])+40,275,s,460);
  $('#br',el).innerHTML=`CD bisects ∠C. <b>Angle Bisector Theorem:</b> AD/DB = AC/BC.<br>${rd(ad,2)}/${rd(c-ad,2)} = ${b}/${a} = ${rd(b/a,3)}. The bisector cuts the opposite side in the same ratio as the two sides next to the angle.`;};
 onIn(el,['ba','bb'],draw);draw();
}
function mountShadow(el){
 el.innerHTML=`<div class="ctrl">${ctl('hp','your height (ft)',4,7,5.5,0.5)}${ctl('hs','your shadow (ft)',2,10,4,0.5)}${ctl('ht','tree shadow (ft)',10,40,24,1)}</div><div id="hg"></div><div class="readout" id="hr"></div>`;
 const draw=()=>{const [h,s1,s2]=vals(el,['hp','hs','ht']);['hp','hs','ht'].forEach((i,j)=>$('#'+i+'v',el).textContent=[h,s1,s2][j]);const H=h*s2/s1,u=Math.min(9,200/H,(440-60)/(s2+s1+6));
  const g=250,Tx=40,Px=Tx+s2*u+30;let s=fL([10,g],[470,g],'#6b7280',2);
  s+=fP([[Tx,g],[Tx,g-H*u],[Tx+s2*u,g]],'rgba(107,114,128,.18)','#9ca3af',1.5)+fL([Tx,g],[Tx,g-H*u],'#059669',8)+`<circle cx="${Tx}" cy="${g-H*u}" r="14" fill="#16a34a"/>`;
  s+=fP([[Px,g],[Px,g-h*u],[Px+s1*u,g]],'rgba(107,114,128,.18)','#9ca3af',1.5)+fL([Px,g],[Px,g-h*u],'#2563eb',5)+fDot([Px,g-h*u-6],'#2563eb',6);
  s+=fT(Tx-8,g-H*u/2,`${rd(H,2)} ft`,{a:'end',col:'#059669'})+fT(Tx+s2*u/2,g+20,`${s2} ft`)+fT(Px+s1*u/2,g+20,`${s1} ft`)+fT(Px-8,g-h*u/2,`${h}`,{a:'end',col:'#2563eb'});
  $('#hg',el).innerHTML=svgF(480,280,s,480);
  $('#hr',el).innerHTML=`The sun’s rays hit you and the tree at the same angle → the two triangles are similar (AA).<br>tree/${s2} = ${h}/${s1} → tree = ${h} × ${s2} ÷ ${s1} = <b>${rd(H,2)} ft</b>.`;};
 onIn(el,['hp','hs','ht'],draw);draw();
}

L['GEO-4-1']={
 goal:'I can define similar figures using dilations and find scale factors and missing sides.',
 life:{title:'Phone screens and posters',html:'A movie poster and its thumbnail on your phone are similar: the thumbnail is a dilation of the poster. Every length shrinks by the same scale factor, and every angle stays the same, so nothing looks stretched.'},
 see:[{title:'Scale a 3-4-5 triangle',hint:'Change k. Compare the side ratios, the perimeter, and the area.',mount:mountScale}],
 vocab:[['Similar (~)','Same shape: a dilation followed by rigid motions maps one figure onto the other.'],['Scale factor','Ratio of corresponding lengths (image ÷ original).'],['Corresponding angles','Equal in similar figures.'],['Proportional sides','All pairs of corresponding sides have the same ratio.'],['Perimeter ratio / area ratio','k and k².']],
 examples:[
  {title:'Example 1 — Missing side',prob:'△ABC ~ △DEF. AB = 6, BC = 9, DE = 10. Find EF.',raw:true,lines:[['k = DE/AB = 10/6 = 5/3','Scale factor from a known pair.'],['EF = 9 × 5/3 = 15','Multiply the matching side.']]},
  {title:'Example 2 — Area',prob:'Two similar rectangles have scale factor 3. The small one has area 8 cm².',raw:true,lines:[['area ratio = 3² = 9','Area scales by k².'],['8 × 9 = 72 cm²','Large rectangle.']]}],
 mistake:{bad:'Scale factor 2 → area doubles',good:'Area × 4',why:'Area uses two lengths (length × width), and each one doubles: 2 × 2 = 4.'},
 practice(){const t=rand(0,2);
  if(t===0){const a=rand(3,9),b=rand(3,9),k=pick([2,3,1.5,0.5,2.5]);return {q:`△ABC ~ △DEF. AB = ${a}, BC = ${b}, and DE = ${rd(a*k,2)}. Find EF.`,fields:[{label:'EF =',answer:rd(b*k,4)}],raw:true,hint:'Scale factor = DE ÷ AB.',sol:[[`k = ${rd(a*k,2)} ÷ ${a} = ${k}`,'Scale factor.'],[`EF = ${b} × ${k} = ${rd(b*k,2)}`,'Corresponding side.']]};}
  if(t===1){const k=pick([2,3,4,5]),A=rand(3,12);return {q:`Two similar figures have scale factor ${k}. The smaller has area ${A} in². Find the larger area.`,fields:[{label:'area =',answer:A*k*k,unit:'in²'}],raw:true,hint:'Area scales by k².',sol:[[`${A} × ${k}² = ${A*k*k}`,'k² = '+k*k+'.']]};}
  const p=rand(10,30),k=pick([2,3,0.5,1.5]);return {q:`Two similar triangles have scale factor ${k}. The first has perimeter ${p}. Find the perimeter of the second.`,fields:[{label:'perimeter =',answer:p*k}],raw:true,hint:'Perimeter scales by k.',sol:[[`${p} × ${k} = ${p*k}`,'Perimeters scale like lengths.']]};},
 check:[
  {q:'Similar figures always have…',o:['equal sides','equal angles and proportional sides','equal areas','equal perimeters'],a:1,why:'Same shape, any size.'},
  {q:'Scale factor 1/2: a side of 14 becomes…',o:['28','7','12','3.5'],a:1,why:'14 × 1/2 = 7.'},
  {q:'Scale factor 3: area is multiplied by…',o:['3','6','9','27'],a:2,why:'k² = 9.'}]
};

L['GEO-4-2']={
 goal:'I can prove triangles similar with AA, SSS~, and SAS~ and write a similarity statement.',
 life:{title:'Measuring with your thumb',html:'Hold your thumb at arm’s length and line it up with a distant flagpole. Your eye, thumb, and pole form two triangles that share the angle at your eye and both have right angles — <b>AA similarity</b> — so their sides are proportional.'},
 see:[{title:'Three ways to prove similarity',hint:'Tap AA, SSS~, and SAS~.',mount:mountSimCrit}],
 vocab:[['AA Similarity','Two pairs of congruent angles.'],['SSS Similarity','All three side ratios equal.'],['SAS Similarity','Two side ratios equal and the included angles congruent.'],['Similarity statement','△ABC ~ △DEF: order shows which vertices correspond.'],['Check ratios','Compare shortest to shortest, middle to middle, longest to longest.']],
 examples:[
  {title:'Example 1 — SSS~',prob:'△ABC: 4, 6, 8. △DEF: 6, 9, 12. Similar?',raw:true,lines:[['6/4 = 1.5, 9/6 = 1.5, 12/8 = 1.5','Shortest/shortest, middle/middle, longest/longest.'],['similar by SSS~, k = 1.5','All ratios equal.']]},
  {title:'Example 2 — AA',prob:'△PQR: ∠P = 40°, ∠Q = 75°. △XYZ: ∠X = 40°, ∠Z = 65°.',raw:true,lines:[['∠R = 180 − 40 − 75 = 65°','Find the missing angle.'],['∠P = ∠X, ∠R = ∠Z','Two pairs of equal angles.'],['△PQR ~ △XYZ by AA','Similar.']]}],
 mistake:{bad:'Compare sides in the order they are listed',good:'Match smallest with smallest',why:'Sides 3, 5, 4 and 8, 6, 10 look different, but sorted they are 3, 4, 5 and 6, 8, 10 — ratio 2 every time.'},
 practice(){const t=rand(0,1);
  if(t===0){const base=pick([[3,4,5],[4,6,7],[5,7,9],[2,3,4],[6,8,9]]),k=pick([2,3,1.5]),sim=Math.random()<.6,B=base.map(v=>v*k);if(!sim)B[2]+=pick([1,2]);const m=mcU(sim?`yes — SSS~, k = ${k}`:'no — ratios are not all equal',[`yes — SSS~, k = ${k}`,'no — ratios are not all equal',`yes — SSS~, k = ${k+1}`,'yes — AA']);
   return {type:'mc',q:`Triangle 1 sides: ${shuffle(base).join(', ')}. Triangle 2 sides: ${shuffle(B).join(', ')}. Are they similar?`,opts:m.opts,a:m.a,why:`Sorted ratios: ${base.map((v,i)=>`${B[i]}/${v} = ${rd(B[i]/v,3)}`).join(', ')}.`};}
  const a=rand(30,80),b=rand(30,150-a),c=180-a-b,sim=Math.random()<.6,c2=sim?c:c+pick([5,10,-5]);const m=mcU(sim?'similar by AA':'not similar',['similar by AA','not similar','similar by SSS~','congruent by ASA']);
  return {type:'mc',q:`△ABC: ∠A = ${a}°, ∠B = ${b}°. △DEF: ∠D = ${a}°, ∠F = ${c2}°. Similar?`,opts:m.opts,a:m.a,why:`∠C = 180 − ${a} − ${b} = ${c}°. ${sim?'∠A = ∠D and ∠C = ∠F → AA.':`∠F = ${c2}° ≠ ∠C, and ∠E = ${180-a-c2}° ≠ ∠B → not similar.`}`};},
 check:[
  {q:'Which is NOT a similarity shortcut?',o:['AA','SSS~','SAS~','SSA~'],a:3,why:'SSA does not work.'},
  {q:'Sides 5, 12, 13 and 10, 24, 26. Similar?',o:['Yes, k = 2','Yes, k = 5','No','Only congruent'],a:0,why:'Every ratio is 2.'},
  {q:'Two angles of one triangle equal two angles of another. Then…',o:['congruent','similar','not related','right triangles'],a:1,why:'AA similarity.'}]
};

L['GEO-4-3']={
 goal:'I can set up and solve proportions with similar triangles, including the Triangle Proportionality Theorem.',
 life:{title:'Ramps and roof braces',html:'A brace placed parallel to the floor across a triangular roof truss cuts the sides proportionally. Builders use this to find where to cut boards without measuring every piece.'},
 see:[{title:'A line parallel to one side',hint:'Slide DE up and down. The ratios stay equal.',mount:mountSplit}],
 vocab:[['Triangle Proportionality Theorem','A line parallel to one side of a triangle divides the other two sides proportionally: AD/DB = AE/EC.'],['Converse','If AD/DB = AE/EC, then DE ∥ BC.'],['Nested triangles','△ADE ~ △ABC share ∠A; compare the WHOLE sides AD/AB = DE/BC.'],['Cross-multiply','a/b = c/d → ad = bc.']],
 examples:[
  {title:'Example 1 — Side splitter',prob:'DE ∥ BC. AD = 6, DB = 4, AE = 9. Find EC.',raw:true,lines:[['6/4 = 9/EC','AD/DB = AE/EC.'],['6 · EC = 36','Cross-multiply.'],['EC = 6','Divide.']]},
  {title:'Example 2 — Whole sides',prob:'DE ∥ BC. AD = 5, AB = 15, DE = 4. Find BC.',raw:true,lines:[['AD/AB = DE/BC','Nested similar triangles: part of whole.'],['5/15 = 4/BC','Substitute.'],['BC = 12','Cross-multiply: 5 · BC = 60.']]}],
 mistake:{bad:'AD/DB = DE/BC',good:'AD/AB = DE/BC',why:'DE and BC are sides of the small and big triangles, so compare with AD and the <b>whole</b> side AB — not the piece DB.'},
 practice(){const t=rand(0,1);
  if(t===0){const ad=rand(2,9),db=rand(2,9),k=pick([1,1.5,2,0.5]),ae=ad*k,ec=db*k;return {q:`In △ABC, DE ∥ BC with D on AB and E on AC. AD = ${ad}, DB = ${db}, AE = ${ae}. Find EC.`,fields:[{label:'EC =',answer:ec}],raw:true,hint:'AD/DB = AE/EC.',sol:[[`${ad}/${db} = ${ae}/EC`,'Triangle Proportionality.'],[`EC = ${db} × ${ae} ÷ ${ad} = ${rd(ec,2)}`,'Cross-multiply.']]};}
  const ad=rand(2,8),db=rand(2,8),de=rand(2,9),bc=de*(ad+db)/ad;if(Math.abs(bc*100-Math.round(bc*100))>1e-6)return this.practice();
  return {q:`In △ABC, DE ∥ BC. AD = ${ad}, DB = ${db}, DE = ${de}. Find BC.`,fields:[{label:'BC =',answer:rd(bc,2)}],raw:true,hint:`AD/AB = DE/BC, and AB = ${ad} + ${db}.`,sol:[[`AB = ${ad+db}`,'Whole side.'],[`${ad}/${ad+db} = ${de}/BC`,'Nested triangles.'],[`BC = ${rd(bc,2)}`,'Cross-multiply.']]};},
 check:[
  {q:'DE ∥ BC, AD = 3, DB = 6, AE = 4. EC = ?',o:['2','8','4.5','12'],a:1,why:'3/6 = 4/EC → EC = 8.'},
  {q:'DE ∥ BC, AD = 2, AB = 8, DE = 3. BC = ?',o:['12','6','9','4'],a:0,why:'2/8 = 3/BC → BC = 12.'},
  {q:'If AD/DB = AE/EC, then…',o:['DE ⊥ BC','DE ∥ BC','DE = BC','nothing'],a:1,why:'Converse of the Triangle Proportionality Theorem.'}]
};

L['GEO-4-4']={
 goal:'I can use the Angle Bisector Theorem to find segment lengths.',
 life:{title:'Splitting a corner lot',html:'A city splits a triangular corner lot with a fence that bisects the corner angle. The fence meets the far side at a point that divides it in the same ratio as the two streets — so the longer street gets the longer piece.'},
 see:[{title:'The bisector splits the opposite side',hint:'Change the two sides next to ∠C.',mount:mountBis}],
 vocab:[['Angle bisector','A ray that splits an angle into two congruent angles.'],['Angle Bisector Theorem','In △ABC, if CD bisects ∠C, then AD/DB = AC/BC.'],['Adjacent sides','The two sides that form the bisected angle.'],['Opposite side','The side the bisector hits.']],
 examples:[
  {title:'Example 1 — Find a piece',prob:'CD bisects ∠C. AC = 8, BC = 12, AD = 6. Find DB.',raw:true,lines:[['AD/DB = AC/BC','Angle Bisector Theorem.'],['6/DB = 8/12','Substitute.'],['8 · DB = 72 → DB = 9','Cross-multiply.']]},
  {title:'Example 2 — Split a whole side',prob:'CD bisects ∠C. AC = 4, BC = 6, AB = 15. Find AD.',raw:true,lines:[['AD : DB = 4 : 6 = 2 : 3','Same ratio as the sides.'],['AD = 15 × 2/5 = 6','2 of 5 equal parts.'],['DB = 9','Check: 6/9 = 4/6. ✓']]}],
 mistake:{bad:'The bisector hits the midpoint of the opposite side',good:'Only when the two adjacent sides are equal',why:'The longer adjacent side gets the longer piece. Midpoint only happens in an isosceles triangle.'},
 practice(){const t=rand(0,1),ac=rand(3,10),bc=rand(3,12);if(ac===bc)return this.practice();
  if(t===0){const ad=pick([2,3,4,5,6]),db=ad*bc/ac;if(Math.abs(db*100-Math.round(db*100))>1e-6)return this.practice();return {q:`In △ABC, CD bisects ∠C (D on AB). AC = ${ac}, BC = ${bc}, AD = ${ad}. Find DB.`,fields:[{label:'DB =',answer:rd(db,2)}],raw:true,hint:'AD/DB = AC/BC.',sol:[[`${ad}/DB = ${ac}/${bc}`,'Angle Bisector Theorem.'],[`DB = ${ad} × ${bc} ÷ ${ac} = ${rd(db,2)}`,'Cross-multiply.']]};}
  const ab=(ac+bc)*rand(1,3),ad=ab*ac/(ac+bc);return {q:`In △ABC, CD bisects ∠C. AC = ${ac}, BC = ${bc}, AB = ${ab}. Find AD.`,fields:[{label:'AD =',answer:ad}],raw:true,hint:`AB is split in the ratio ${ac} : ${bc}.`,sol:[[`AD = ${ab} × ${ac}/${ac+bc}`,'Fraction of the whole.'],[`AD = ${ad}`,'Compute.']]};},
 check:[
  {q:'CD bisects ∠C. AC = 5, BC = 10, AD = 3. DB = ?',o:['1.5','6','8','15'],a:1,why:'3/DB = 5/10 → DB = 6.'},
  {q:'When does the bisector hit the midpoint of the opposite side?',o:['always','when AC = BC','never','when ∠C = 90°'],a:1,why:'Equal sides → equal pieces.'},
  {q:'AC = 3, BC = 7, AB = 20. AD = ?',o:['6','14','10','8.6'],a:0,why:'20 × 3/10 = 6.'}]
};

L['GEO-4-5']={
 goal:'I can model real situations with similar triangles to find heights and distances I can’t measure directly.',
 life:{title:'How tall is that tree?',html:'At the same moment of the day, the sun makes every vertical object’s shadow proportional to its height. Measure your own height and shadow, then the tree’s shadow — the tree’s height follows from a proportion.'},
 see:[{title:'Shadow method',hint:'Change your height, your shadow, and the tree’s shadow.',mount:mountShadow}],
 vocab:[['Indirect measurement','Finding a length using similar triangles instead of measuring it.'],['Shadow method','object height / object shadow = your height / your shadow.'],['Mirror method','Angles of incidence and reflection are equal → AA similar triangles.'],['Same-units rule','Keep the units the same on both sides of the proportion.']],
 examples:[
  {title:'Example 1 — Flagpole',prob:'A 6-ft person casts a 4-ft shadow. A flagpole casts a 30-ft shadow. How tall is the pole?',raw:true,lines:[['h/30 = 6/4','Height over shadow in both triangles.'],['h = 30 × 6 ÷ 4 = 45','Cross-multiply.'],['45 ft','The flagpole.']]},
  {title:'Example 2 — Mirror on the ground',prob:'A mirror is 10 ft from a building and 2.5 ft from you; your eyes are 5 ft up. Building height?',raw:true,lines:[['h/10 = 5/2.5','Similar triangles (equal reflection angles).'],['h = 20 ft','Multiply: 10 × 2.']]}],
 mistake:{bad:'h/6 = 30/4 mixed up (height with shadow)',good:'h/30 = 6/4',why:'Keep the same kind of quantity in the same position: height on top, shadow on the bottom, in both ratios.'},
 practice(){const t=rand(0,1);
  if(t===0){const h=pick([5,5.5,6,4.5]),s=pick([2,3,4,5]),T=pick([12,15,18,20,24,30,36]),H=h*T/s;if(Math.abs(H*10-Math.round(H*10))>1e-6)return this.practice();
   return {q:`A ${h}-ft person casts a ${s}-ft shadow. At the same time a tree casts a ${T}-ft shadow. How tall is the tree?`,fields:[{label:'height =',answer:H,unit:'ft'}],raw:true,hint:'tree/tree shadow = person/person shadow.',sol:[[`h/${T} = ${h}/${s}`,'Similar triangles.'],[`h = ${rd(H,2)} ft`,'Cross-multiply.']]};}
  const e=pick([5,5.5,6]),d1=pick([2,2.5,3,4]),d2=pick([12,15,18,20,24]),H=e*d2/d1;if(Math.abs(H*10-Math.round(H*10))>1e-6)return this.practice();
  return {q:`A mirror lies on the ground ${d2} m from a wall. You stand ${d1} m from the mirror; your eyes are ${e} m high. You see the top of the wall in the mirror. How high is the wall?`,fields:[{label:'height =',answer:H,unit:'m'}],raw:true,hint:'wall/d(wall to mirror) = eye height/d(you to mirror).',sol:[[`h/${d2} = ${e}/${d1}`,'AA similar triangles.'],[`h = ${rd(H,2)} m`,'Solve.']]};},
 check:[
  {q:'A 4-ft child casts a 3-ft shadow; a pole casts 12 ft. Pole height?',o:['9 ft','16 ft','15 ft','36 ft'],a:1,why:'h/12 = 4/3 → 16.'},
  {q:'Why are the shadow triangles similar?',o:['Same sun angle and both have right angles (AA)','Same height','SSS','They are congruent'],a:0,why:'Two pairs of equal angles.'},
  {q:'h/20 = 5/2. h = ?',o:['8','50','25','4'],a:1,why:'h = 20 × 5 ÷ 2 = 50.'}]
};
})();
