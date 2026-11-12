/* Geometry · Module 1 · Performing Transformations */
(function(){
const G8=o=>grid(Object.assign({x0:-8,x1:8,y0:-8,y1:8,u:24,lab:2},o||{}));
const TRI=[[-1,-1],[2,-1],[0,2]];
const ptsList=(pts,pr='')=>pts.map((p,i)=>`${VN[i]}${pr}${XYs(p)}`).join(', ');

/* ---- L1 widgets ---- */
function mountObjects(el){
 const K=[
  {n:'Point',d:'A location with no size. Named by one capital letter.',nt:'A',f:()=>fDot([200,90],'#2563eb',7)+fT(200,70,'A',{col:'#2563eb'})},
  {n:'Line',d:'Straight, goes on forever in both directions. Two points name it.',nt:'line AB  (AB with ↔ on top)',f:()=>fL([40,110],[360,70],'#2563eb')+`<path d="M40 110 l14 -9 l-3 12z M360 70 l-14 9 l3 -12z" fill="#2563eb"/>`+fDot([130,99],'#1f2937')+fDot([270,81],'#1f2937')+fT(130,128,'A')+fT(270,108,'B')},
  {n:'Segment',d:'Part of a line with two endpoints. It has a length you can measure.',nt:'segment AB  (AB with a bar on top)',f:()=>fL([80,100],[320,70],'#2563eb')+fDot([80,100])+fDot([320,70])+fT(80,128,'A')+fT(320,98,'B')},
  {n:'Ray',d:'Starts at one endpoint and goes on forever in one direction. Name the endpoint first.',nt:'ray AB  (AB with → on top)',f:()=>fL([80,100],[360,65],'#2563eb')+`<path d="M360 65 l-14 9 l3 -12z" fill="#2563eb"/>`+fDot([80,100])+fDot([230,81])+fT(80,128,'A')+fT(230,108,'B')},
  {n:'Angle',d:'Two rays with the same endpoint (the vertex). The vertex letter goes in the middle.',nt:'∠ABC or ∠B',f:()=>fL([150,130],[340,130],'#2563eb')+fL([150,130],[290,30],'#2563eb')+fA([150,130],[340,130],[290,30],36)+fDot([150,130])+fT(150,155,'B')+fT(340,155,'C')+fT(300,30,'A')},
  {n:'Parallel / perpendicular',d:'Parallel lines never meet (same direction). Perpendicular lines meet at a right angle (90°).',nt:'ℓ ∥ m     ℓ ⊥ n',f:()=>fL([40,50],[230,50],'#2563eb')+fL([40,100],[230,100],'#2563eb')+fT(245,55,'ℓ',{a:'start'})+fT(245,105,'m',{a:'start'})+fL([300,130],[380,130],'#059669')+fL([340,30],[340,130],'#059669')+fRt([340,130],[380,130],[340,30])}];
 el.innerHTML=btns(K.map(k=>k.n))+`<div id="og"></div><div class="readout" id="or"></div>`;
 const draw=i=>{const k=K[i];$('#og',el).innerHTML=svgF(400,160,k.f(),420);$('#or',el).innerHTML=`<b>${k.n}:</b> ${k.d}<br>Write it: <b>${k.nt}</b>`;selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountAngle(el){
 el.innerHTML=`<div class="ctrl">${ctl('an','Angle',0,180,50)}</div><div id="ag"></div><div class="readout" id="ar"></div>`;
 const draw=()=>{const a=+$('#an',el).value;$('#anv',el).textContent=a+DEG;const V=[200,170],t=-a*Math.PI/180,P=[V[0]+150*Math.cos(t),V[1]+150*Math.sin(t)];
  const typ=a===0?'zero angle':a<90?'acute':a===90?'right':a<180?'obtuse':'straight';
  $('#ag',el).innerHTML=svgF(400,200,fL(V,[350,170],'#2563eb')+fL(V,P,'#2563eb')+(a===90?fRt(V,[350,170],P,18):fA(V,[350,170],P,34,'#ea580c',a+DEG))+fDot(V),400);
  $('#ar',el).innerHTML=`This angle is <b>${a}${DEG}</b> → <b>${typ}</b>. ${a<90?'Acute: less than 90°.':a===90?'Right: exactly 90° (the little square).':a<180?'Obtuse: between 90° and 180°.':'Straight: exactly 180° — a line.'}`;};
 onIn(el,['an'],draw);draw();
}
function mountSegAdd(el){
 el.innerHTML=`<div class="ctrl">${ctl('sa','AB',1,9,3)}${ctl('sb','BC',1,9,5)}</div><div id="sg"></div><div class="readout" id="sr"></div>`;
 const draw=()=>{const [a,b]=vals(el,['sa','sb']);$('#sav',el).textContent=a;$('#sbv',el).textContent=b;const sc=360/(a+b),A=[20,60],B=[20+a*sc,60],C=[380,60];
  $('#sg',el).innerHTML=svgF(400,110,fL(A,B,'#2563eb',6)+fL(B,C,'#ea580c',6)+[A,B,C].map(p=>fDot(p)).join('')+fT(A[0],90,'A')+fT(B[0],90,'B')+fT(C[0],90,'C')+fT((A[0]+B[0])/2,45,a,{col:'#2563eb'})+fT((B[0]+C[0])/2,45,b,{col:'#ea580c'}),400);
  $('#sr',el).innerHTML=`<b>Segment Addition Postulate:</b> if B is between A and C, then AB + BC = AC → ${a} + ${b} = <b>${a+b}</b>.`;};
 onIn(el,['sa','sb'],draw);draw();
}
/* ---- L2 translation ---- */
function mountTrans(el){
 el.innerHTML=`<div class="ctrl">${ctl('ta','a (left/right)',-5,5,4)}${ctl('tb','b (down/up)',-5,5,-3)}</div><div class="eqline math" id="te"></div><div id="tg"></div><div class="readout" id="tr"></div>`;
 const draw=()=>{const [a,b]=vals(el,['ta','tb']);$('#tav',el).textContent=fmtNeg(a);$('#tbv',el).textContent=fmtNeg(b);const G=G8(),im=TRI.map(p=>tT(p,a,b));
  $('#tg',el).innerHTML=G.svg(gPoly(G,TRI,{fill:'rgba(107,114,128,.15)',stroke:'#6b7280',dash:'6 4',names:VN})+gArrow(G,TRI[2],im[2])+gPoly(G,im,{names:VN,prime:'′',fill:'rgba(234,88,12,.18)',stroke:'#ea580c'}));
  $('#te',el).innerHTML=`(x, y) → (x ${a<0?MINUS:'+'} ${Math.abs(a)}, y ${b<0?MINUS:'+'} ${Math.abs(b)})`;
  $('#tr',el).innerHTML=`Every point slides <b>${a>0?'right '+a:a<0?'left '+(-a):'0 sideways'}</b> and <b>${b>0?'up '+b:b<0?'down '+(-b):'0 up/down'}</b>.<br>${ptsList(TRI)} → ${ptsList(im,'′')}<br>Same size, same shape, same direction — only the position changes.`;};
 onIn(el,['ta','tb'],draw);draw();
}
/* ---- L3 rotation ---- */
const ROTS=[[90,'(x, y) → (−y, x)'],[180,'(x, y) → (−x, −y)'],[270,'(x, y) → (y, −x)'],[-90,'(x, y) → (y, −x)']];
function mountRot(el){
 const P0=[[1,1],[4,1],[1,3]];let k=0,an=0,tm=null;
 el.innerHTML=btns(['90° counterclockwise','180°','270° counterclockwise','90° clockwise'])+`<div class="eqline math" id="re"></div><div id="rg"></div><div class="readout" id="rr"></div>`;
 const draw=()=>{const G=G8(),deg=ROTS[k][0],cur=P0.map(p=>tR(p,an)),fin=P0.map(p=>tR(p,deg));
  let s=gPoly(G,P0,{fill:'rgba(107,114,128,.15)',stroke:'#6b7280',dash:'6 4',names:VN})+gSeg(G,[0,0],P0[1],'#9ca3af',1.5,'4 4')+gSeg(G,[0,0],cur[1],'#ea580c',1.5,'4 4')+gdot(G,0,0,'#1f2937',5,'center');
  s+=gPoly(G,cur,{names:Math.abs(an-deg)<1?VN:null,prime:'′',fill:'rgba(234,88,12,.18)',stroke:'#ea580c'});
  $('#rg',el).innerHTML=G.svg(s);$('#re',el).innerHTML=ROTS[k][1];
  $('#rr',el).innerHTML=`Rotate <b>${Math.abs(deg)}° ${deg<0?'clockwise':'counterclockwise'}</b> about the origin.<br>${ptsList(P0)} → ${ptsList(fin,'′')}<br>Distance from the center stays the same (dashed spokes). ${k===3?'Note: 90° clockwise = 270° counterclockwise.':''}`;selBtn(el,k);};
 const go=i=>{k=i;const deg=ROTS[k][0];an=0;clearInterval(tm);tm=setInterval(()=>{an+=Math.sign(deg)*6;if(Math.abs(an)>=Math.abs(deg)){an=deg;clearInterval(tm);}draw();},30);};
 onBtn(el,go);an=90;draw();
}
/* ---- L4 reflection ---- */
const REFS=[['x-axis','x','(x, y) → (x, −y)'],['y-axis','y','(x, y) → (−x, y)'],['y = x','y=x','(x, y) → (y, x)'],['y = −x','y=-x','(x, y) → (−y, −x)'],['x = 2',{x:2},'(x, y) → (4 − x, y)'],['y = −1',{y:-1},'(x, y) → (x, −2 − y)']];
function mirror(G,ax){if(ax==='x')return gSeg(G,[G.x0,0],[G.x1,0],'#7c3aed',4);if(ax==='y')return gSeg(G,[0,G.y0],[0,G.y1],'#7c3aed',4);if(ax==='y=x')return gSeg(G,[G.x0,G.y0],[G.x1,G.y1],'#7c3aed',4);if(ax==='y=-x')return gSeg(G,[G.x0,G.y1],[G.x1,G.y0],'#7c3aed',4);
 if(ax.x!==undefined)return gSeg(G,[ax.x,G.y0],[ax.x,G.y1],'#7c3aed',4);return gSeg(G,[G.x0,ax.y],[G.x1,ax.y],'#7c3aed',4);}
function mountRef(el){
 const P0=[[2,3],[5,4],[4,6]];let k=0;
 el.innerHTML=btns(REFS.map(r=>'Line '+r[0]))+`<div class="eqline math" id="fe"></div><div id="fg"></div><div class="readout" id="fr"></div>`;
 const draw=i=>{k=i;const r=REFS[k],G=G8(),im=P0.map(p=>tF(p,r[1]));let s=mirror(G,r[1])+P0.map((p,j)=>gSeg(G,p,im[j],'#9ca3af',1.5,'4 4')).join('');
  s+=gPoly(G,P0,{names:VN})+gPoly(G,im,{names:VN,prime:'′',fill:'rgba(234,88,12,.18)',stroke:'#ea580c'});
  $('#fg',el).innerHTML=G.svg(s);$('#fe',el).innerHTML=r[2];
  $('#fr',el).innerHTML=`Mirror line (purple): <b>${r[0]}</b>.<br>${ptsList(P0)} → ${ptsList(im,'′')}<br>Each dashed segment is <b>perpendicular</b> to the mirror and cut in half by it. The figure is <b>flipped</b> — the order A→B→C now runs the other way.`;selBtn(el,k);};
 onBtn(el,draw);draw(0);
}
/* ---- L5 dilation ---- */
function mountDil(el){
 const P0=[[1,1],[3,1],[1,2]],KS=[0.5,1,1.5,2,2.5,3];
 el.innerHTML=`<div class="ctrl">${ctl('dk','scale factor k',0,5,3)}</div>`+btns(['center (0, 0)','center (−4, −4)'],'data-c')+`<div id="dg"></div><div class="readout" id="dr"></div>`;let c=0;
 const draw=()=>{const k=KS[+$('#dk',el).value];$('#dkv',el).textContent=k;const C=c?[-4,-4]:[0,0],G=G8(),im=P0.map(p=>tD(p,k,C));
  let s=im.map(p=>gSeg(G,C,p.map((v,j)=>C[j]+(v-C[j])*1.15),'#9ca3af',1.5,'4 4')).join('')+gdot(G,C[0],C[1],'#1f2937',5)+gTxt(G,C[0]-0.2,C[1]-1.1,'center');
  s+=gPoly(G,P0,{names:VN})+`<g clip-path="url(#${G.clip})">`+gPoly(G,im,{names:VN,prime:'′',fill:'rgba(234,88,12,.18)',stroke:'#ea580c'})+'</g>';
  $('#dg',el).innerHTML=G.svg(s);const ab=dist2(P0[0],P0[1]),ab2=dist2(im[0],im[1]);
  $('#dr',el).innerHTML=`k = <b>${k}</b> → ${k>1?'<b>enlargement</b> (bigger)':k<1?'<b>reduction</b> (smaller)':'same size'}. Center ${XYs(C)}.<br>A${XYs(P0[0])} → A′${XYs(im[0])} &nbsp; AB = ${ab} → A′B′ = ${rd(ab2,2)} (× ${k}).<br>Every image point lies on a ray from the center, k times as far away. Angles stay the same; lengths multiply by k.`;$$('[data-c]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.c===c));};
 onIn(el,['dk'],draw);el.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b){c=+b.dataset.c;draw();}});draw();
}
const RP=()=>[rand(-6,6)||1,rand(-6,6)||2];
const ptFields=p=>[{label:'x =',answer:p[0]},{label:'y =',answer:p[1]}];

L['GEO-1-1']={
 goal:'I can name and draw points, lines, segments, rays, and angles, and use segment addition.',
 life:{title:'Geometry on a city map',html:'A <b>bus stop</b> is a point. A <b>street</b> that keeps going is like a line. The <b>block</b> from one corner to the next is a segment. A <b>laser pointer</b> beam is a ray. Two streets meeting at a corner make an <b>angle</b>.'},
 see:[{title:'The building blocks',hint:'Tap each word to see the picture and how to write it.',mount:mountObjects},{title:'Classify the angle',hint:'Drag the slider from 0° to 180°.',mount:mountAngle},{title:'Segment addition',hint:'Change the two parts. The whole is the sum.',mount:mountSegAdd}],
 vocab:[['Point, line, plane','Undefined terms: a location; a straight path forever both ways; a flat surface forever in all directions.'],['Segment AB','Part of a line between endpoints A and B. AB (no bar) means its length.'],['Ray AB','Starts at A and passes through B forever.'],['Angle','Two rays with a common endpoint, the vertex. Acute < 90°, right = 90°, obtuse between 90° and 180°, straight = 180°.'],['Congruent','Same size: congruent segments have equal lengths, congruent angles have equal measures.'],['Midpoint','The point that splits a segment into two congruent halves.']],
 examples:[
  {title:'Example 1 — Segment addition',prob:'B is between A and C. AB = 7 and AC = 19. Find BC.',raw:true,lines:[['AB + BC = AC','Segment Addition Postulate: the parts add to the whole.'],['7 + BC = 19','Substitute what you know.'],['BC = 12','Subtract 7 from both sides.']]},
  {title:'Example 2 — Algebra with a midpoint',prob:'M is the midpoint of PQ. PM = 3x + 2 and MQ = 5x − 6. Find PQ.',raw:true,lines:[['3x + 2 = 5x − 6','A midpoint makes the two halves equal.'],['8 = 2x → x = 4','Subtract 3x, add 6, divide by 2.'],['PM = 3(4) + 2 = 14','Substitute x = 4.'],['PQ = 2 · 14 = 28','The whole is two halves.']]}],
 mistake:{bad:'Ray AB = ray BA',good:'Ray AB ≠ ray BA',why:'A ray is named from its <b>endpoint</b>. Ray AB starts at A; ray BA starts at B and points the other way. (Line AB and line BA are the same line.)'},
 practice(){const t=rand(0,2);
  if(t===0){const ab=rand(3,15),bc=rand(3,15);return Math.random()<.5?{q:`B is between A and C. AB = ${ab} and BC = ${bc}. Find AC.`,fields:[{label:'AC =',answer:ab+bc}],raw:true,hint:'The parts add up to the whole.',sol:[[`AC = ${ab} + ${bc} = ${ab+bc}`,'Segment Addition Postulate.']]}
   :{q:`B is between A and C. AC = ${ab+bc} and AB = ${ab}. Find BC.`,fields:[{label:'BC =',answer:bc}],raw:true,hint:'AB + BC = AC.',sol:[[`${ab} + BC = ${ab+bc}`,'Segment Addition Postulate.'],[`BC = ${bc}`,'Subtract.']]};}
  if(t===1){const x=rand(2,9),a=rand(2,5),c=a+rand(1,3),b=rand(1,9),d=(a*x+b)-c*x;const half=a*x+b;
   return {q:`M is the midpoint of segment PQ. PM = ${a}x + ${b} and MQ = ${c}x ${d<0?'− '+(-d):'+ '+d}. Find x and PQ.`,fields:[{label:'x =',answer:x},{label:'PQ =',answer:2*half}],raw:true,hint:'Set the two halves equal.',sol:[[`${a}x + ${b} = ${c}x ${d<0?'− '+(-d):'+ '+d}`,'Midpoint → halves equal.'],[`x = ${x}`,'Solve.'],[`PM = ${half}, PQ = ${2*half}`,'Double the half.']]};}
  const a=pick([15,35,60,89,90,91,120,150,180]);const typ=a<90?'acute':a===90?'right':a<180?'obtuse':'straight';const m=mcU(typ,['acute','right','obtuse','straight']);
  return {type:'mc',q:`An angle measures <b>${a}°</b>. Classify it.`,opts:m.opts,a:m.a,why:`${a}° is ${typ}.`};},
 check:[
  {q:'How many endpoints does a ray have?',o:['0','1','2','infinitely many'],a:1,why:'A ray starts at one endpoint and goes on forever.'},
  {q:'B is between A and C, AB = 4, AC = 10. BC = ?',o:['14','6','2.5','40'],a:1,why:'4 + BC = 10 → BC = 6.'},
  {q:'∠PQR has its vertex at…',o:['P','Q','R','the midpoint'],a:1,why:'The middle letter is the vertex.'}]
};

L['GEO-1-2']={
 goal:'I can translate a figure on the coordinate plane and write the rule (x, y) → (x + a, y + b).',
 life:{title:'Moving a game piece',html:'In a video game, when your character walks 4 squares right and 3 squares down, every pixel of the character moves the same way. That slide is a <b>translation</b>. A chess rook sliding along the board is another one.'},
 see:[{title:'Slide the triangle',hint:'Move a and b. The orange arrow shows how far every point moves.',mount:mountTrans}],
 vocab:[['Transformation','A rule that moves or changes a figure. The original is the pre-image; the result is the image.'],['Translation','A slide: every point moves the same distance in the same direction.'],['Image notation','A′ (A prime) is the image of A.'],['Rule','(x, y) → (x + a, y + b): a moves left/right, b moves up/down.'],['Rigid motion','A transformation that keeps lengths and angle measures. Translations are rigid.']],
 examples:[
  {title:'Example 1 — Apply a rule',prob:'Translate A(−2, 5) by (x, y) → (x + 6, y − 4).',raw:true,lines:[['x: −2 + 6 = 4','Add 6 to x (6 right).'],['y: 5 − 4 = 1','Subtract 4 from y (4 down).'],['A′(4, 1)','The image.']]},
  {title:'Example 2 — Find the rule',prob:'P(3, −1) maps to P′(−2, 4). Write the translation rule.',raw:true,lines:[['a = −2 − 3 = −5','Change in x: image minus pre-image.'],['b = 4 − (−1) = 5','Change in y.'],['(x, y) → (x − 5, y + 5)','5 left, 5 up.']]}],
 mistake:{bad:'P(3, −1) → P′(−2, 4): a = 3 − (−2) = 5',good:'a = −2 − 3 = −5',why:'Always subtract <b>image − pre-image</b> (where it ended minus where it started). Backwards gives the wrong direction.'},
 practice(){const p=RP(),a=rand(-6,6)||3,b=rand(-6,6)||-2,im=tT(p,a,b),r=`(x, y) → (x ${a<0?'−':'+'} ${Math.abs(a)}, y ${b<0?'−':'+'} ${Math.abs(b)})`;
  if(Math.random()<.5)return {q:`Translate A${XYs(p)} using <b>${r}</b>. Find A′.`,fields:ptFields(im),raw:true,hint:'Add a to x and b to y.',sol:[[`x: ${fmtNeg(p[0])} ${a<0?'−':'+'} ${Math.abs(a)} = ${fmtNeg(im[0])}`,'Horizontal move.'],[`y: ${fmtNeg(p[1])} ${b<0?'−':'+'} ${Math.abs(b)} = ${fmtNeg(im[1])}`,'Vertical move.'],[`A′${XYs(im)}`,'Image.']]};
  const m=mcU(r,[`(x, y) → (x ${-a<0?'−':'+'} ${Math.abs(a)}, y ${-b<0?'−':'+'} ${Math.abs(b)})`,`(x, y) → (x ${b<0?'−':'+'} ${Math.abs(b)}, y ${a<0?'−':'+'} ${Math.abs(a)})`,`(x, y) → (x ${a<0?'−':'+'} ${Math.abs(a)}, y ${-b<0?'−':'+'} ${Math.abs(b)})`,`(x, y) → (x ${-a<0?'−':'+'} ${Math.abs(a)}, y ${b<0?'−':'+'} ${Math.abs(b)})`]);
  return {type:'mc',q:`B${XYs(p)} is translated to B′${XYs(im)}. Which rule was used?`,opts:m.opts,a:m.a,why:`a = ${fmtNeg(im[0])} − ${P(p[0])} = ${fmtNeg(a)}, b = ${fmtNeg(im[1])} − ${P(p[1])} = ${fmtNeg(b)}.`};},
 check:[
  {q:'(x, y) → (x − 3, y + 2) moves a figure…',o:['3 right, 2 up','3 left, 2 up','3 left, 2 down','2 left, 3 up'],a:1,why:'x − 3 → left 3; y + 2 → up 2.'},
  {q:'Image of (4, 4) under (x, y) → (x + 1, y − 5)?',o:['(5, −1)','(3, 9)','(5, 9)','(−1, 5)'],a:0,why:'4 + 1 = 5, 4 − 5 = −1.'},
  {q:'After a translation, the image is…',o:['bigger','flipped','the same size and shape','rotated'],a:2,why:'Translations are rigid motions.'}]
};

L['GEO-1-3']={
 goal:'I can rotate a figure 90°, 180°, and 270° about the origin and use the coordinate rules.',
 life:{title:'Ferris wheels and clock hands',html:'A Ferris wheel seat travels around the center but always stays the same distance from it. A clock’s minute hand turns <b>90° clockwise</b> every 15 minutes. That turning is a <b>rotation</b>.'},
 see:[{title:'Turn the triangle around the origin',hint:'Pick an angle and watch it turn. Compare coordinates with the rule.',mount:mountRot}],
 vocab:[['Rotation','A turn around a fixed point (the center of rotation) through a given angle.'],['Counterclockwise','The positive direction in math (opposite a clock). Clockwise angles are negative.'],['90° CCW','(x, y) → (−y, x)'],['180°','(x, y) → (−x, −y) — same either direction.'],['270° CCW = 90° CW','(x, y) → (y, −x)']],
 examples:[
  {title:'Example 1 — 90° counterclockwise',prob:'Rotate A(3, 1) 90° counterclockwise about the origin.',raw:true,lines:[['(x, y) → (−y, x)','Rule for 90° CCW.'],['(3, 1) → (−1, 3)','Swap, then make the new x the opposite.'],['A′(−1, 3)','Quadrant I → quadrant II. ✓']]},
  {title:'Example 2 — 180°',prob:'Rotate B(−4, 2) 180° about the origin.',raw:true,lines:[['(x, y) → (−x, −y)','Rule for 180°.'],['B′(4, −2)','Both signs flip; B′ is directly across the origin.']]}],
 mistake:{bad:'90° CCW: (3, 1) → (1, −3)',good:'(3, 1) → (−1, 3)',why:'(1, −3) is the <b>clockwise</b> turn. Check with a quick sketch: counterclockwise from quadrant I lands in quadrant II.'},
 practice(){const p=[rand(-6,6)||2,rand(-6,6)||-3],k=rand(0,3),deg=ROTS[k][0],im=tR(p,deg),nm=deg<0?'90° clockwise':deg===180?'180°':`${deg}° counterclockwise`;
  if(Math.random()<.6)return {q:`Rotate P${XYs(p)} <b>${nm}</b> about the origin. Find P′.`,fields:ptFields(im),raw:true,hint:`Rule: ${ROTS[k][1]}.`,sol:[[ROTS[k][1],'Rule.'],[`P′${XYs(im)}`,'Apply it.']]};
  const m=mcU(ROTS[k][1],['(x, y) → (−y, x)','(x, y) → (−x, −y)','(x, y) → (y, −x)','(x, y) → (y, x)','(x, y) → (−x, y)']);
  return {type:'mc',q:`Which rule describes a rotation of <b>${nm}</b> about the origin?`,opts:m.opts,a:m.a,why:`${nm}: ${ROTS[k][1]}.`};},
 check:[
  {q:'Rotate (2, 5) 180° about the origin.',o:['(−2, −5)','(5, 2)','(−5, 2)','(2, −5)'],a:0,why:'(x, y) → (−x, −y).'},
  {q:'A 90° clockwise rotation is the same as…',o:['90° counterclockwise','180°','270° counterclockwise','a reflection'],a:2,why:'360° − 90° = 270° the other way.'},
  {q:'Rotate (1, 4) 90° counterclockwise about the origin.',o:['(4, −1)','(−4, 1)','(−1, −4)','(4, 1)'],a:1,why:'(x, y) → (−y, x) = (−4, 1).'}]
};

L['GEO-1-4']={
 goal:'I can reflect a figure across the axes, y = x, y = −x, and horizontal or vertical lines.',
 life:{title:'Mirrors and lake reflections',html:'A mountain reflected in a calm lake looks upside-down: the water surface is the <b>line of reflection</b>. Each point of the mountain and its reflection are the same distance from the water.'},
 see:[{title:'Choose a mirror line',hint:'Tap a line. Dashed segments connect each point to its image.',mount:mountRef}],
 vocab:[['Reflection','A flip across a line (the line of reflection). It is a rigid motion.'],['Across the x-axis','(x, y) → (x, −y)'],['Across the y-axis','(x, y) → (−x, y)'],['Across y = x','(x, y) → (y, x)'],['Across y = −x','(x, y) → (−y, −x)'],['Perpendicular bisector','The mirror line cuts each segment PP′ in half at a right angle.']],
 examples:[
  {title:'Example 1 — Across y = x',prob:'Reflect C(5, −2) across the line y = x.',raw:true,lines:[['(x, y) → (y, x)','Swap the coordinates.'],['C′(−2, 5)','Image.']]},
  {title:'Example 2 — Across a vertical line',prob:'Reflect D(6, 3) across x = 2.',raw:true,lines:[['distance to the line: 6 − 2 = 4','D is 4 units right of x = 2.'],['go 4 units left of x = 2: x = −2','Same distance on the other side.'],['D′(−2, 3)','y does not change for a vertical mirror.']]}],
 mistake:{bad:'Reflect across the x-axis: (3, 4) → (−3, 4)',good:'(3, 4) → (3, −4)',why:'Across the <b>x-axis</b> the point flips <b>up/down</b>, so y changes sign. The x-coordinate stays.'},
 practice(){const p=[rand(-6,6)||3,rand(-6,6)||-4],t=rand(0,5);let ax,nm;
  if(t<4){ax=REFS[t][1];nm=REFS[t][0];}else if(t===4){const k=rand(-3,3);ax={x:k};nm=`x = ${fmtNeg(k)}`;}else{const k=rand(-3,3);ax={y:k};nm=`y = ${fmtNeg(k)}`;}
  const im=tF(p,ax);
  if(t>=4||Math.random()<.6)return {q:`Reflect Q${XYs(p)} across the line <b>${nm}</b>. Find Q′.`,fields:ptFields(im),raw:true,hint:t<4?`Rule: ${REFS[t][2]}.`:'Find the distance to the line, then go the same distance on the other side.',sol:[[`Q′${XYs(im)}`,t<4?REFS[t][2]:'Same distance from the line, opposite side.']]};
  const m=mcU(XYs(im),[XYs(tF(p,'x')),XYs(tF(p,'y')),XYs(tF(p,'y=x')),XYs(tF(p,'y=-x')),XYs([p[0]+1,-p[1]])]);
  return {type:'mc',q:`Reflect Q${XYs(p)} across <b>${nm}</b>.`,opts:m.opts,a:m.a,why:REFS[t][2]+'.'};},
 check:[
  {q:'Reflect (−3, 7) across the y-axis.',o:['(3, 7)','(−3, −7)','(7, −3)','(3, −7)'],a:0,why:'(x, y) → (−x, y).'},
  {q:'Reflect (2, −6) across y = x.',o:['(−2, 6)','(−6, 2)','(−6, −2)','(6, −2)'],a:1,why:'Swap: (−6, 2).'},
  {q:'Point A is 3 units above the line of reflection. Its image is…',o:['3 units above','3 units below','6 units below','on the line'],a:1,why:'Same distance, opposite side.'}]
};

L['GEO-1-5']={
 goal:'I can dilate a figure by a scale factor k from a center and tell if it is an enlargement or reduction.',
 life:{title:'Zooming a photo',html:'When you pinch-zoom a photo, every part grows from the point under your fingers. Zoom 2× and every length doubles, but the shapes and angles stay the same. A projector does the same thing with light.'},
 see:[{title:'Grow and shrink from a center',hint:'Change k and the center. Dashed rays come from the center.',mount:mountDil}],
 vocab:[['Dilation','A transformation that enlarges or reduces a figure from a center by a scale factor k.'],['Scale factor k','k > 1 enlargement, 0 < k < 1 reduction, k = 1 same size.'],['Center at origin','(x, y) → (kx, ky)'],['Center (a, b)','Image = center + k × (point − center).'],['Not rigid','Lengths change (× k) but angle measures stay the same. The image is similar, not congruent.']],
 examples:[
  {title:'Example 1 — Center at the origin',prob:'Dilate A(4, −2) by k = 1.5 with center (0, 0).',raw:true,lines:[['(x, y) → (1.5x, 1.5y)','Multiply both coordinates by k.'],['A′(6, −3)','4 × 1.5 = 6, −2 × 1.5 = −3.']]},
  {title:'Example 2 — Center not at the origin',prob:'Dilate P(5, 4) by k = 2 with center C(1, 2).',raw:true,lines:[['P − C = (4, 2)','How far P is from the center.'],['2 × (4, 2) = (8, 4)','Scale that distance.'],['P′ = C + (8, 4) = (9, 6)','Add back the center.']]}],
 mistake:{bad:'Dilate (5, 4) by 2 from (1, 2): (10, 8)',good:'(9, 6)',why:'Multiplying the coordinates only works when the center is the <b>origin</b>. Otherwise scale the distance from the center.'},
 practice(){const t=rand(0,2);
  if(t===0){const k=pick([2,3,0.5,1.5]),p=k===0.5?[2*rand(-4,4)||4,2*rand(-4,4)||-2]:[rand(-4,4)||2,rand(-4,4)||3],im=tD(p,k);return {q:`Dilate A${XYs(p)} by scale factor <b>${k}</b> with center at the origin.`,fields:ptFields(im),raw:true,hint:'Multiply each coordinate by k.',sol:[[`(${k}·${P(p[0])}, ${k}·${P(p[1])}) = ${XYs(im)}`,'(x, y) → (kx, ky).']]};}
  if(t===1){const c=[rand(-3,3),rand(-3,3)],k=pick([2,3]),p=[c[0]+rand(-3,3)||c[0]+2,c[1]+rand(-3,3)],im=tD(p,k,c);return {q:`Dilate P${XYs(p)} by k = <b>${k}</b> with center C${XYs(c)}.`,fields:ptFields(im),raw:true,hint:'Find P − C, multiply by k, then add C.',sol:[[`P − C = ${XYs([p[0]-c[0],p[1]-c[1]])}`,'Distance from center.'],[`× ${k} = ${XYs([k*(p[0]-c[0]),k*(p[1]-c[1])])}`,'Scale.'],[`P′ = ${XYs(im)}`,'Add C.']]};}
  const L0=rand(2,9),k=pick([0.5,2,3,1.5,0.25]),L1=L0*k,m=mcU(k>1?'enlargement':'reduction',['enlargement','reduction','congruent (same size)','cannot tell']);
  return Math.random()<.5?{q:`A segment of length ${L0} is dilated to length ${L1}. What is the scale factor?`,fields:[{label:'k =',answer:k}],raw:true,hint:'k = image length ÷ original length.',sol:[[`k = ${L1} ÷ ${L0} = ${k}`,'Image over pre-image.']]}
   :{type:'mc',q:`A dilation has scale factor <b>${k}</b>. The image is…`,opts:m.opts,a:m.a,why:k>1?'k > 1 → bigger.':'0 < k < 1 → smaller.'};},
 check:[
  {q:'Dilate (6, −4) by 1/2 from the origin.',o:['(3, −2)','(12, −8)','(6.5, −3.5)','(−3, 2)'],a:0,why:'Multiply each coordinate by 1/2.'},
  {q:'Which property does a dilation keep?',o:['side lengths','angle measures','area','distance from the origin'],a:1,why:'Angles stay the same; lengths scale by k.'},
  {q:'A side of 8 becomes 20. Scale factor?',o:['12','0.4','2.5','160'],a:2,why:'20 ÷ 8 = 2.5.'}]
};
})();
