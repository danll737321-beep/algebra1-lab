/* Geometry · Module 5 · Right Triangles and Trigonometry */
(function(){
const DR=Math.PI/180,sn=d=>Math.sin(d*DR),cs=d=>Math.cos(d*DR),tn=d=>Math.tan(d*DR);
const asn=x=>Math.asin(x)/DR,acs=x=>Math.acos(x)/DR,atn=x=>Math.atan(x)/DR;
const TRIPLES=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29],[9,40,41]];
/* right triangle: A bottom-left, C right angle bottom-right, B top-right; legs b=AC (horizontal), a=BC (vertical) */
function rtri(b,a,u,o=[40,0],labs={}){const H=a*u;const A=[o[0],o[1]+H+30],C=[o[0]+b*u,o[1]+H+30],B=[o[0]+b*u,o[1]+30];
 let s=fP([A,C,B])+fRt(C,A,B,14)+fVert([A,C,B],['A','C','B']);const Ce=cen([A,B,C]);
 if(labs.b!==undefined)s+=fSide(A,C,Ce,labs.b,labs.bc||'#1f2937');if(labs.a!==undefined)s+=fSide(C,B,Ce,labs.a,labs.ac||'#1f2937');if(labs.c!==undefined)s+=fSide(A,B,Ce,labs.c,labs.cc||'#1f2937');
 if(labs.ang)s+=fA(A,C,B,34,'#ea580c',labs.ang);return {s,A,B,C,W:o[0]+b*u+60,H:H+70};}

function mountPyth(el){
 el.innerHTML=`<div class="ctrl">${ctl('pa','a',1,6,3)}${ctl('pb','b',1,6,4)}</div><div id="pg"></div><div class="readout" id="pr"></div>`;
 const draw=()=>{const [a,b]=vals(el,['pa','pb']);$('#pav',el).textContent=a;$('#pbv',el).textContent=b;const u=22,c=Math.hypot(a,b);
  const C=[150,250],A=[150+b*u,250],B=[150,250-a*u];
  const sqA=[C,B,[B[0]-a*u,B[1]],[C[0]-a*u,C[1]]],sqB=[C,A,[A[0],A[1]+b*u],[C[0],C[1]+b*u]];
  const dx=A[0]-B[0],dy=A[1]-B[1],sqC=[B,A,[A[0]+dy,A[1]-dx],[B[0]+dy,B[1]-dx]];
  let s=fP(sqA,'rgba(37,99,235,.2)','#2563eb',2)+fP(sqB,'rgba(5,150,105,.2)','#059669',2)+fP(sqC,'rgba(234,88,12,.2)','#ea580c',2)+fP([C,A,B],'#fff')+fRt(C,A,B,12);
  s+=fT(C[0]-a*u/2,C[1]-a*u/2+5,a*a,{col:'#2563eb'})+fT(C[0]+b*u/2,C[1]+b*u/2+5,b*b,{col:'#059669'})+fT(cen(sqC)[0],cen(sqC)[1]+5,rd(c*c,2),{col:'#ea580c'});
  const xs=[...sqA,...sqB,...sqC].map(p=>p[0]),ys=[...sqA,...sqB,...sqC].map(p=>p[1]),x0=Math.min(...xs)-10,y0=Math.min(...ys)-10;
  $('#pg',el).innerHTML=`<svg viewBox="${x0} ${y0} ${Math.max(...xs)-x0+10} ${Math.max(...ys)-y0+10}" class="fig" style="max-width:380px">${s}</svg>`;
  $('#pr',el).innerHTML=`Blue square a² = ${a*a}, green square b² = ${b*b}. Together: <b>${a*a+b*b}</b> = the orange square on the hypotenuse.<br>c = √${a*a+b*b} = <b>${Number.isInteger(c)?c:rd(c,3)}</b>${Number.isInteger(c)?' — a Pythagorean triple!':''}`;};
 onIn(el,['pa','pb'],draw);draw();
}
function mountSpecial(el){
 let m=0;el.innerHTML=btns(['45°-45°-90°','30°-60°-90°'],'data-m')+`<div class="ctrl">${ctl('sx','short leg x',1,6,3)}</div><div id="xg"></div><div class="readout" id="xr"></div>`;
 const draw=()=>{const x=+$('#sx',el).value;$('#sxv',el).textContent=x;const u=34;let T;
  if(m===0)T=rtri(x,x,u,[40,0],{b:x,a:x,c:`${x}√2 ≈ ${rd(x*Math.SQRT2,2)}`,ang:'45°'});else T=rtri(x*Math.sqrt(3),x,u,[40,0],{b:`${x}√3 ≈ ${rd(x*Math.sqrt(3),2)}`,a:x,c:2*x,ang:'30°'});
  $('#xg',el).innerHTML=svgF(Math.max(T.W,300),T.H,T.s+(m?fA(T.B,T.A,T.C,26,'#059669','60°'):fA(T.B,T.A,T.C,26,'#ea580c','45°')),460);
  $('#xr',el).innerHTML=m===0?`<b>45°-45°-90°</b> (half a square): legs x and x, hypotenuse <b>x√2</b>. Here: ${x}, ${x}, ${x}√2.`:`<b>30°-60°-90°</b> (half an equilateral triangle): short leg x (across from 30°), long leg <b>x√3</b>, hypotenuse <b>2x</b>. Here: ${x}, ${x}√3, ${2*x}.`;$$('[data-m]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.m===m));};
 onIn(el,['sx'],draw);el.addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(b){m=+b.dataset.m;draw();}});draw();
}
function mountRatios(el){
 el.innerHTML=`<div class="ctrl">${ctl('ra','angle A',10,80,35)}${ctl('rs','size (hypotenuse)',4,10,8)}</div><div id="rg"></div><div class="readout" id="rr"></div>`;
 const draw=()=>{const [A,h]=vals(el,['ra','rs']);$('#rav',el).textContent=A+'°';$('#rsv',el).textContent=h;const b=h*cs(A),a=h*sn(A),u=34;
  const T=rtri(b,a,u,[40,0],{b:rd(b,2)+' adj',a:rd(a,2)+' opp',c:h+' hyp',ang:A+'°',bc:'#059669',ac:'#2563eb',cc:'#ea580c'});
  $('#rg',el).innerHTML=svgF(400,Math.max(T.H,120),T.s,420);
  $('#rr',el).innerHTML=`<b>sin A</b> = opp/hyp = ${rd(a,2)}/${h} = <b>${rd(sn(A),4)}</b><br><b>cos A</b> = adj/hyp = ${rd(b,2)}/${h} = <b>${rd(cs(A),4)}</b><br><b>tan A</b> = opp/adj = ${rd(a,2)}/${rd(b,2)} = <b>${rd(tn(A),4)}</b><br>Change the size: the ratios do not change! They depend only on the angle (all these triangles are similar by AA).`;};
 onIn(el,['ra','rs'],draw);draw();
}
function mountSolveSide(el){
 el.innerHTML=`<div class="ctrl">${ctl('va','angle A',15,75,40)}${ctl('vh','hypotenuse',5,12,10)}</div><div id="vg"></div><div class="readout" id="vr"></div>`;
 const draw=()=>{const [A,h]=vals(el,['va','vh']);$('#vav',el).textContent=A+'°';$('#vhv',el).textContent=h;const a=h*sn(A),b=h*cs(A),u=28;
  const T=rtri(b,a,u,[40,0],{c:h,a:'x = ?',b:'y = ?',ang:A+'°',ac:'#2563eb',bc:'#059669'});
  $('#vg',el).innerHTML=svgF(420,Math.max(T.H,120),T.s,440);
  $('#vr',el).innerHTML=`x is <b>opposite</b> A, the hypotenuse is known → use <b>sine</b>: sin ${A}° = x/${h} → x = ${h} · sin ${A}° = <b>${rd(a,2)}</b>.<br>y is <b>adjacent</b> → use <b>cosine</b>: y = ${h} · cos ${A}° = <b>${rd(b,2)}</b>.`;};
 onIn(el,['va','vh'],draw);draw();
}
function mountSolveAng(el){
 el.innerHTML=`<div class="ctrl">${ctl('wo','opposite',1,10,5)}${ctl('wa','adjacent',1,10,8)}</div><div id="wg"></div><div class="readout" id="wr"></div>`;
 const draw=()=>{const [o,a]=vals(el,['wo','wa']);$('#wov',el).textContent=o;$('#wav',el).textContent=a;const u=Math.min(30,300/a,180/o),A=atn(o/a);
  const T=rtri(a,o,u,[40,0],{a:o,b:a,ang:'A = ?',ac:'#2563eb',bc:'#059669'});
  $('#wg',el).innerHTML=svgF(400,Math.max(T.H,120),T.s,420);
  $('#wr',el).innerHTML=`tan A = ${o}/${a} = ${rd(o/a,4)} → A = tan⁻¹(${rd(o/a,4)}) = <b>${rd(A,1)}°</b>.<br>Then ∠B = 90° − ${rd(A,1)}° = ${rd(90-A,1)}°. The inverse ratio (tan⁻¹, sin⁻¹, cos⁻¹) turns a ratio back into an angle.`;};
 onIn(el,['wo','wa'],draw);draw();
}
function mountComp(el){
 el.innerHTML=`<div class="ctrl">${ctl('ca','angle A',5,85,30)}</div><div id="cg"></div><div class="readout" id="cr"></div>`;
 const draw=()=>{const A=+$('#ca',el).value;$('#cav',el).textContent=A+'°';const h=8,a=h*sn(A),b=h*cs(A),u=30;
  const T=rtri(b,a,u,[40,0],{a:rd(a,2),b:rd(b,2),c:h,ang:A+'°',ac:'#2563eb'});
  $('#cg',el).innerHTML=svgF(400,Math.max(T.H,120),T.s+fA(T.B,T.A,T.C,28,'#059669',(90-A)+'°'),420);
  $('#cr',el).innerHTML=`∠A + ∠B = 90°: they are <b>complementary</b>. The side opposite A (${rd(a,2)}) is the side adjacent to B.<br>sin ${A}° = ${rd(a,2)}/${h} = ${rd(sn(A),4)} and cos ${90-A}° = ${rd(a,2)}/${h} = ${rd(cs(90-A),4)} → <b>sin A = cos (90° − A)</b>.`;};
 onIn(el,['ca'],draw);draw();
}
function mountElev(el){
 el.innerHTML=`<div class="ctrl">${ctl('ea','angle of elevation',10,70,35)}${ctl('ed','distance (m)',10,60,40)}</div><div id="eg"></div><div class="readout" id="er"></div>`;
 const draw=()=>{const [A,d]=vals(el,['ea','ed']);$('#eav',el).textContent=A+'°';$('#edv',el).textContent=d;const h=d*tn(A),u=Math.min(6,340/d,200/h),g=250,X=40;
  let s=fL([10,g],[460,g],'#6b7280',2)+fP([[X+d*u,g],[X+d*u+30,g],[X+d*u+30,g-h*u],[X+d*u,g-h*u]],'rgba(107,114,128,.25)','#4b5563',2)+fL([X,g],[X+d*u,g-h*u],'#ea580c',2.5,'6 4')+fA([X,g],[X+60,g],[X+d*u,g-h*u],40,'#ea580c',A+'°')+fDot([X,g],'#2563eb',7);
  s+=fT(X+d*u/2,g+22,`${d} m`)+fT(X+d*u+40,g-h*u/2,`h ≈ ${rd(h,1)} m`,{a:'start',col:'#059669'})+fT(X,g+22,'you');
  $('#eg',el).innerHTML=svgF(470,280,s,480);
  $('#er',el).innerHTML=`Looking <b>up</b> at the top: angle of elevation ${A}°. Opposite = height, adjacent = distance → <b>tan</b>.<br>tan ${A}° = h/${d} → h = ${d} · tan ${A}° ≈ <b>${rd(h,1)} m</b>.`;};
 onIn(el,['ea','ed'],draw);draw();
}

L['GEO-5-1']={
 goal:'I can use the Pythagorean Theorem and its converse to find lengths and classify triangles.',
 life:{title:'TV screen sizes',html:'A “55-inch TV” is measured along the diagonal. A screen 48 in wide and 27 in tall has diagonal √(48² + 27²) ≈ 55 in. Builders also check square corners with 3-4-5: if the diagonal of a 3 ft by 4 ft corner is exactly 5 ft, the corner is 90°.'},
 see:[{title:'Squares on the sides',hint:'Change a and b. Compare the areas of the squares.',mount:mountPyth}],
 vocab:[['Legs','The two sides that form the right angle (a, b).'],['Hypotenuse','The longest side, across from the right angle (c).'],['Pythagorean Theorem','a² + b² = c².'],['Pythagorean triple','Whole numbers that work: 3-4-5, 5-12-13, 8-15-17, 7-24-25.'],['Converse','c² = a² + b² → right; c² < a² + b² → acute; c² > a² + b² → obtuse (c = longest side).']],
 examples:[
  {title:'Example 1 — Missing leg',prob:'A 13-ft ladder reaches 12 ft up a wall. How far is its foot from the wall?',raw:true,lines:[['a² + 12² = 13²','The ladder is the hypotenuse.'],['a² = 169 − 144 = 25','Subtract.'],['a = 5 ft','Square root.']]},
  {title:'Example 2 — Classify',prob:'Sides 6, 7, 10. Acute, right, or obtuse?',raw:true,lines:[['10² = 100, 6² + 7² = 85','Compare c² with a² + b².'],['100 > 85 → obtuse','The longest side is “too long” for a right angle.']]}],
 mistake:{bad:'Leg: 12² + 13² = a²',good:'a² + 12² = 13²',why:'The hypotenuse (longest side) is always c, alone on its side of the equation. To find a leg, subtract.'},
 practice(){const t=rand(0,2),T=pick(TRIPLES),k=pick([1,1,2]);const [a,b,c]=T.map(v=>v*k);
  if(t===0)return {q:`A right triangle has legs ${a} and ${b}. Find the hypotenuse.`,fields:[{label:'c =',answer:c}],raw:true,hint:'c² = a² + b².',sol:[[`c² = ${a*a} + ${b*b} = ${c*c}`,'Square and add.'],[`c = ${c}`,'Square root.']]};
  if(t===1)return {q:`A right triangle has hypotenuse ${c} and one leg ${a}. Find the other leg.`,fields:[{label:'b =',answer:b}],raw:true,hint:'b² = c² − a².',sol:[[`b² = ${c*c} − ${a*a} = ${b*b}`,'Subtract.'],[`b = ${b}`,'Square root.']]};
  const x=rand(3,9),y=rand(x,12),z=rand(y+1,x+y-1),c2=z*z,s2=x*x+y*y,typ=c2===s2?'right':c2<s2?'acute':'obtuse',m=mcU(typ,['acute','right','obtuse','not a triangle']);
  return {type:'mc',q:`A triangle has sides ${x}, ${y}, ${z}. Classify it.`,opts:m.opts,a:m.a,why:`${z}² = ${c2}; ${x}² + ${y}² = ${s2}. ${c2===s2?'Equal → right.':c2<s2?'Less → acute.':'Greater → obtuse.'}`};},
 check:[
  {q:'Legs 9 and 12. Hypotenuse?',o:['15','21','√63','108'],a:0,why:'81 + 144 = 225 → 15.'},
  {q:'Sides 5, 6, 8 form which kind of triangle?',o:['acute','right','obtuse','none'],a:2,why:'64 > 25 + 36 = 61.'},
  {q:'Hypotenuse 25, leg 7. Other leg?',o:['18','24','32','26'],a:1,why:'625 − 49 = 576 → 24.'}]
};

L['GEO-5-2']={
 goal:'I can find side lengths in 45°-45°-90° and 30°-60°-90° triangles in simplest radical form.',
 life:{title:'Folding a square napkin',html:'Fold a square napkin corner to corner and you get two 45°-45°-90° triangles: the fold (diagonal) is always side × √2. Cut an equilateral triangle in half and you get two 30°-60°-90° triangles — the shape of many roof trusses and drafting set squares.'},
 see:[{title:'The two special triangles',hint:'Switch the type and change x.',mount:mountSpecial}],
 vocab:[['45°-45°-90°','Legs x, x; hypotenuse x√2.'],['30°-60°-90°','Short leg x (opposite 30°), long leg x√3 (opposite 60°), hypotenuse 2x.'],['Simplest radical form','No perfect-square factor under √: √50 = 5√2.'],['Rationalize','6/√2 = 6√2/2 = 3√2.']],
 examples:[
  {title:'Example 1 — 45-45-90',prob:'A square has side 7. Find its diagonal.',raw:true,lines:[['diagonal = 7√2','Hypotenuse = leg × √2.'],['≈ 9.90','Decimal check.']]},
  {title:'Example 2 — 30-60-90',prob:'The hypotenuse is 18. Find both legs.',raw:true,lines:[['short leg = 18 ÷ 2 = 9','Hypotenuse = 2 × short leg.'],['long leg = 9√3','Long leg = short leg × √3.']]}],
 mistake:{bad:'30-60-90: long leg = 2x',good:'Long leg = x√3, hypotenuse = 2x',why:'The hypotenuse is always the longest side. 2x > x√3 (≈ 1.73x), so the 2x side must be the hypotenuse.'},
 practice(){const k=rand(2,9),t=rand(0,5);const C=[
  [`In a 45°-45°-90° triangle, each leg is ${k}. The hypotenuse is a√2. Find a.`,k,'Hypotenuse = leg × √2.',`hypotenuse = ${k}√2`],
  [`In a 45°-45°-90° triangle, the hypotenuse is ${k}√2. Find a leg.`,k,'Leg = hypotenuse ÷ √2.',`leg = ${k}`],
  [`In a 45°-45°-90° triangle, the hypotenuse is ${2*k}. A leg is a√2. Find a.`,k,`Leg = ${2*k}/√2 = ${2*k}√2/2.`,`leg = ${k}√2`],
  [`In a 30°-60°-90° triangle, the short leg is ${k}. Find the hypotenuse.`,2*k,'Hypotenuse = 2 × short leg.',`hypotenuse = ${2*k}`],
  [`In a 30°-60°-90° triangle, the hypotenuse is ${2*k}. The long leg is a√3. Find a.`,k,'Short leg = half the hypotenuse; long leg = short × √3.',`short = ${k}, long = ${k}√3`],
  [`In a 30°-60°-90° triangle, the long leg is ${k}√3. Find the hypotenuse.`,2*k,'Short leg = long ÷ √3; then double.',`short = ${k}, hypotenuse = ${2*k}`]][t];
  return {q:C[0],fields:[{label:t===0||t===2||t===4?'a =':'answer =',answer:C[1]}],raw:true,hint:C[2],sol:[[C[3],C[2]]]};},
 check:[
  {q:'45-45-90 with leg 10. Hypotenuse?',o:['10','10√2','20','10√3'],a:1,why:'Leg × √2.'},
  {q:'30-60-90 with short leg 4. Long leg?',o:['8','4√2','4√3','2'],a:2,why:'Short × √3.'},
  {q:'30-60-90 with hypotenuse 14. Short leg?',o:['7','7√3','28','14√2'],a:0,why:'Half the hypotenuse.'}]
};

L['GEO-5-3']={
 goal:'I can find the sine, cosine, and tangent of an acute angle in a right triangle.',
 life:{title:'Wheelchair ramps',html:'Building codes say a ramp may rise at most 1 inch for every 12 inches of run. That ratio, rise/run = 1/12, is the <b>tangent</b> of the ramp’s angle (about 4.8°). Trig ratios turn angles into side ratios.'},
 see:[{title:'Ratios depend only on the angle',hint:'Change angle A, then change the size.',mount:mountRatios}],
 vocab:[['Opposite','The leg across from the angle.'],['Adjacent','The leg next to the angle (not the hypotenuse).'],['SOH','sin = Opposite / Hypotenuse'],['CAH','cos = Adjacent / Hypotenuse'],['TOA','tan = Opposite / Adjacent']],
 examples:[
  {title:'Example 1 — All three ratios',prob:'Right △ABC, ∠C = 90°, BC = 8, AC = 15, AB = 17. Find sin A, cos A, tan A.',raw:true,lines:[['opposite A = BC = 8, adjacent = AC = 15','Label from angle A’s point of view.'],['sin A = 8/17, cos A = 15/17','Over the hypotenuse.'],['tan A = 8/15','Opposite over adjacent.']]},
  {title:'Example 2 — From the other angle',prob:'Same triangle: find sin B.',raw:true,lines:[['opposite B = AC = 15','Opposite and adjacent switch for the other angle.'],['sin B = 15/17','Same as cos A.']]}],
 mistake:{bad:'tan A = adjacent/opposite',good:'tan A = opposite/adjacent',why:'SOH-CAH-<b>TOA</b>: Tangent = Opposite over Adjacent. Labels also change when you switch angles.'},
 practice(){const T=pick(TRIPLES),[o,a,h]=Math.random()<.5?[T[0],T[1],T[2]]:[T[1],T[0],T[2]],f=pick(['sin','cos','tan']),v={sin:[o,h],cos:[a,h],tan:[o,a]}[f];
  const R=rtri(a,o,Math.min(16,260/a,170/o),[30,0],{a:o,b:a,c:h,ang:'A',ac:'#2563eb',bc:'#059669',cc:'#ea580c'});
  return {q:`Find <b>${f} A</b>. Enter a fraction like 3/5 or a decimal.`,fig:svgF(R.W+20,R.H,R.s,360),fields:[{label:`${f} A =`,answer:v[0]/v[1],tol:0.006}],raw:true,hint:{sin:'opposite / hypotenuse',cos:'adjacent / hypotenuse',tan:'opposite / adjacent'}[f],sol:[[`${f} A = ${v[0]}/${v[1]}`,{sin:'SOH',cos:'CAH',tan:'TOA'}[f]+'.']]};},
 check:[
  {q:'Opposite 3, adjacent 4, hypotenuse 5. cos A = ?',o:['3/5','4/5','3/4','5/4'],a:1,why:'Adjacent/hypotenuse.'},
  {q:'Which ratio is opposite/adjacent?',o:['sine','cosine','tangent','none'],a:2,why:'TOA.'},
  {q:'If you double all sides of a right triangle, sin A…',o:['doubles','halves','stays the same','squares'],a:2,why:'Similar triangles → same ratios.'}]
};

L['GEO-5-4']={
 goal:'I can use sine, cosine, or tangent to find a missing side of a right triangle.',
 life:{title:'How high does the kite fly?',html:'You let out 60 m of string and it makes a 50° angle with the ground. The string is the hypotenuse, the height is opposite the angle: height = 60 · sin 50° ≈ 46 m.'},
 see:[{title:'Pick the right ratio',hint:'Change the angle and the hypotenuse.',mount:mountSolveSide}],
 vocab:[['Step 1','Label the sides from the known angle: opposite, adjacent, hypotenuse.'],['Step 2','Choose the ratio that uses the known side and the unknown side.'],['Step 3','Write the equation and solve (multiply or divide).'],['Calculator','Make sure it is in degree mode.']],
 examples:[
  {title:'Example 1 — Unknown on top',prob:'∠A = 32°, hypotenuse 20. Find the side opposite A.',raw:true,lines:[['sin 32° = x/20','Opposite and hypotenuse → sine.'],['x = 20 sin 32°','Multiply both sides by 20.'],['x ≈ 10.6','sin 32° ≈ 0.5299.']]},
  {title:'Example 2 — Unknown on the bottom',prob:'∠A = 55°, adjacent side 9. Find the hypotenuse.',raw:true,lines:[['cos 55° = 9/h','Adjacent and hypotenuse → cosine.'],['h = 9 / cos 55°','The unknown is in the denominator: divide.'],['h ≈ 15.7','cos 55° ≈ 0.5736.']]}],
 mistake:{bad:'cos 55° = 9/h → h = 9 · cos 55°',good:'h = 9 ÷ cos 55°',why:'When the unknown is in the <b>denominator</b>, multiply both sides by h, then divide by cos 55°. Check: the hypotenuse must be longer than 9.'},
 practice(){const A=rand(15,75),k=rand(5,30),t=rand(0,3);let q,ans,eq,sol;
  if(t===0){ans=k*sn(A);q=`∠A = ${A}°, hypotenuse = ${k}. Find the side opposite ∠A.`;eq=`sin ${A}° = x/${k} → x = ${k} sin ${A}°`;}
  else if(t===1){ans=k*cs(A);q=`∠A = ${A}°, hypotenuse = ${k}. Find the side adjacent to ∠A.`;eq=`cos ${A}° = x/${k} → x = ${k} cos ${A}°`;}
  else if(t===2){ans=k*tn(A);q=`∠A = ${A}°, adjacent side = ${k}. Find the side opposite ∠A.`;eq=`tan ${A}° = x/${k} → x = ${k} tan ${A}°`;}
  else{ans=k/cs(A);q=`∠A = ${A}°, adjacent side = ${k}. Find the hypotenuse.`;eq=`cos ${A}° = ${k}/x → x = ${k} ÷ cos ${A}°`;}
  return {q:q+' Round to the nearest tenth.',fields:[{label:'x ≈',answer:rd(ans,1),tol:0.06}],raw:true,hint:'Label opposite / adjacent / hypotenuse from ∠A, then pick SOH, CAH, or TOA.',sol:[[eq,'Set up the ratio.'],[`x ≈ ${rd(ans,1)}`,'Calculator in degree mode.']]};},
 check:[
  {q:'Known: angle and hypotenuse. Want: opposite side. Use…',o:['sin','cos','tan','Pythagorean Theorem only'],a:0,why:'Opposite/hypotenuse.'},
  {q:'tan 40° = x/10. x ≈ ?',o:['8.4','11.9','6.4','7.7'],a:0,why:'10 × 0.839 ≈ 8.4.'},
  {q:'cos 60° = 5/h. h = ?',o:['2.5','10','5','8.7'],a:1,why:'cos 60° = 0.5, h = 5 ÷ 0.5 = 10.'}]
};

L['GEO-5-5']={
 goal:'I can use inverse trig ratios to find an acute angle of a right triangle.',
 life:{title:'Steepest street you can drive',html:'A road rises 18 m over 100 m of horizontal distance. Its angle is tan⁻¹(18/100) ≈ 10.2°. Engineers use inverse tangent to turn “grade” percentages into angles.'},
 see:[{title:'From sides to an angle',hint:'Change the two legs and watch angle A.',mount:mountSolveAng}],
 vocab:[['Inverse sine','sin⁻¹(x) gives the angle whose sine is x.'],['Inverse cosine','cos⁻¹(x)'],['Inverse tangent','tan⁻¹(x)'],['Choose by the sides','Opposite & hypotenuse → sin⁻¹; adjacent & hypotenuse → cos⁻¹; opposite & adjacent → tan⁻¹.'],['Check','The two acute angles add to 90°.']],
 examples:[
  {title:'Example 1 — Two legs',prob:'Opposite 7, adjacent 10. Find ∠A.',raw:true,lines:[['tan A = 7/10 = 0.7','Two legs → tangent.'],['A = tan⁻¹(0.7) ≈ 35.0°','Inverse tangent.']]},
  {title:'Example 2 — Leg and hypotenuse',prob:'Adjacent 6, hypotenuse 11. Find ∠A and ∠B.',raw:true,lines:[['cos A = 6/11','Adjacent/hypotenuse.'],['A = cos⁻¹(6/11) ≈ 56.9°','Inverse cosine.'],['B ≈ 90 − 56.9 = 33.1°','Complementary.']]}],
 mistake:{bad:'sin⁻¹(x) = 1/sin(x)',good:'sin⁻¹ means “the angle whose sine is”',why:'The −1 is not an exponent here. It undoes sine: sin⁻¹(0.5) = 30° because sin 30° = 0.5.'},
 practice(){const t=rand(0,2);let o,a,h,ans,q,eq;
  if(t===0){o=rand(2,15);a=rand(2,15);ans=atn(o/a);q=`Opposite = ${o}, adjacent = ${a}. Find ∠A.`;eq=`A = tan⁻¹(${o}/${a})`;}
  else if(t===1){h=rand(8,20);o=rand(2,h-1);ans=asn(o/h);q=`Opposite = ${o}, hypotenuse = ${h}. Find ∠A.`;eq=`A = sin⁻¹(${o}/${h})`;}
  else{h=rand(8,20);a=rand(2,h-1);ans=acs(a/h);q=`Adjacent = ${a}, hypotenuse = ${h}. Find ∠A.`;eq=`A = cos⁻¹(${a}/${h})`;}
  return {q:q+' Round to the nearest tenth of a degree.',fields:[{label:'∠A ≈',answer:rd(ans,1),unit:'°',tol:0.06}],raw:true,hint:'Pick the ratio from the two sides you know, then use the inverse.',sol:[[eq,'Inverse ratio.'],[`A ≈ ${rd(ans,1)}°`,'Calculator in degree mode.']]};},
 check:[
  {q:'Opposite 5, hypotenuse 10. ∠A = ?',o:['30°','60°','45°','26.6°'],a:0,why:'sin⁻¹(0.5) = 30°.'},
  {q:'Which do you use with opposite and adjacent?',o:['sin⁻¹','cos⁻¹','tan⁻¹','none'],a:2,why:'TOA.'},
  {q:'∠A ≈ 37°. The other acute angle ≈ ?',o:['37°','53°','143°','90°'],a:1,why:'90 − 37 = 53.'}]
};

L['GEO-5-6']={
 goal:'I can explain and use sin θ = cos (90° − θ) for complementary angles.',
 life:{title:'Two people, one ladder',html:'A ladder leans against a wall. From the ground, the angle at the foot is 70°; at the top, the ladder meets the wall at 20°. The side “opposite” one angle is “adjacent” to the other — so sin 70° = cos 20°.'},
 see:[{title:'Complementary angles swap roles',hint:'Change ∠A. Compare sin A with cos B.',mount:mountComp}],
 vocab:[['Complementary','Two angles that add to 90°. The acute angles of a right triangle are complementary.'],['Co-function','sin θ = cos (90° − θ) and cos θ = sin (90° − θ).'],['Why','The side opposite one acute angle is adjacent to the other.']],
 examples:[
  {title:'Example 1 — Find the angle',prob:'sin 28° = cos x°. Find x.',raw:true,lines:[['x = 90 − 28','Sine of an angle = cosine of its complement.'],['x = 62','Check: cos 62° ≈ 0.4695 ≈ sin 28°. ✓']]},
  {title:'Example 2 — Algebra',prob:'cos (2x + 10)° = sin (x + 20)°. Find x.',raw:true,lines:[['(2x + 10) + (x + 20) = 90','The angles are complementary.'],['3x + 30 = 90 → x = 20','Solve.']]}],
 mistake:{bad:'sin 30° = cos 30°',good:'sin 30° = cos 60°',why:'Sine and cosine are equal for <b>complementary</b> angles (adding to 90°), not for the same angle (except 45°).'},
 practice(){const t=rand(0,2);
  if(t===0){const a=rand(5,85);return {q:`sin ${a}° = cos x°, where 0 < x < 90. Find x.`,fields:[{label:'x =',answer:90-a}],raw:true,hint:'The two angles add to 90°.',sol:[[`x = 90 − ${a} = ${90-a}`,'Co-function identity.']]};}
  if(t===1){const x=rand(5,20),a=rand(1,3),b=rand(0,15),c=90-(a+1)*x-b;if(c<1)return this.practice();return {q:`cos (${a}x + ${b})° = sin (x + ${c})°. Find x.`,fields:[{label:'x =',answer:x}],raw:true,hint:'The angles are complementary: add them and set equal to 90.',sol:[[`${a}x + ${b} + x + ${c} = 90`,'Complementary.'],[`${a+1}x = ${90-b-c} → x = ${x}`,'Solve.']]};}
  const T=pick(TRIPLES),m=mcU(`${T[0]}/${T[2]}`,[`${T[1]}/${T[2]}`,`${T[0]}/${T[1]}`,`${T[2]}/${T[0]}`,`${T[1]}/${T[0]}`]);return {type:'mc',q:`In right △ABC with right angle C, sin A = ${T[0]}/${T[2]}. What is cos B?`,opts:m.opts,a:m.a,why:'A and B are complementary, so cos B = sin A.'};},
 check:[
  {q:'cos 15° equals…',o:['sin 15°','sin 75°','cos 75°','tan 75°'],a:1,why:'15 + 75 = 90.'},
  {q:'sin A = 0.8 in a right triangle. cos B = ?',o:['0.2','0.6','0.8','1.25'],a:2,why:'A and B are complementary.'},
  {q:'sin x° = cos 40°. x = ?',o:['40','50','140','60'],a:1,why:'90 − 40.'}]
};

L['GEO-5-7']={
 goal:'I can solve real-world problems with angles of elevation and depression.',
 life:{title:'Lighthouses, ramps, and drones',html:'A lighthouse keeper spots a boat with a 12° angle of depression from 40 m up; the boat is 40 ÷ tan 12° ≈ 188 m away. Surveyors, pilots, and drone operators use these right-triangle models every day.'},
 see:[{title:'Height from an angle',hint:'Change the angle of elevation and your distance from the building.',mount:mountElev}],
 vocab:[['Angle of elevation','From horizontal up to the line of sight.'],['Angle of depression','From horizontal down to the line of sight.'],['Equal angles','The angle of depression from A to B equals the angle of elevation from B to A (alternate interior angles).'],['Model','Draw a right triangle: horizontal, vertical, line of sight.']],
 examples:[
  {title:'Example 1 — Elevation',prob:'From 50 m away, the top of a tower is at a 38° angle of elevation. Height?',raw:true,lines:[['tan 38° = h/50','Opposite = height, adjacent = distance.'],['h = 50 tan 38° ≈ 39.1 m','Multiply.']]},
  {title:'Example 2 — Depression',prob:'A drone 80 m up sees a car at a 25° angle of depression. Ground distance to the car?',raw:true,lines:[['angle of elevation from the car = 25°','Alternate interior angles.'],['tan 25° = 80/d','Height is opposite the 25° angle at the car.'],['d = 80 / tan 25° ≈ 171.6 m','Divide.']]}],
 mistake:{bad:'Put the angle of depression at the top, inside the triangle',good:'Put it at the bottom (the elevation angle)',why:'The angle of depression is measured from the horizontal, outside the triangle. It equals the angle at the ground point, which is inside the triangle.'},
 practice(){const t=rand(0,2),A=rand(10,70);let q,ans,eq;
  if(t===0){const d=rand(20,120);ans=d*tn(A);q=`From ${d} m away, the angle of elevation to the top of a building is ${A}°. How tall is the building?`;eq=`h = ${d} tan ${A}°`;}
  else if(t===1){const h=rand(20,150);ans=h/tn(A);q=`From a cliff ${h} m high, the angle of depression to a boat is ${A}°. How far is the boat from the base of the cliff?`;eq=`d = ${h} ÷ tan ${A}°`;}
  else{const L=rand(10,30),B=rand(55,80);ans=L*sn(B);q=`A ${L}-ft ladder makes a ${B}° angle with the ground. How high up the wall does it reach?`;eq=`h = ${L} sin ${B}°`;}
  return {q:q+' Round to the nearest tenth.',fields:[{label:'answer ≈',answer:rd(ans,1),tol:0.06}],raw:true,hint:'Sketch the right triangle and label the angle at the ground.',sol:[[eq,'Choose the ratio.'],[`≈ ${rd(ans,1)}`,'Calculate.']]};},
 check:[
  {q:'Angle of depression from a plane to a runway is 10°. The angle of elevation from the runway to the plane is…',o:['80°','10°','90°','170°'],a:1,why:'Alternate interior angles are equal.'},
  {q:'A 20-ft ladder at 60° to the ground reaches how high?',o:['10 ft','17.3 ft','20 ft','34.6 ft'],a:1,why:'20 sin 60° ≈ 17.3.'},
  {q:'Height 30 m, elevation angle 45°. Distance?',o:['30 m','42.4 m','21.2 m','15 m'],a:0,why:'tan 45° = 1.'}]
};
})();
