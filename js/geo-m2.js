/* Geometry · Module 2 · Transformation Properties and Proofs */
(function(){
const G8=o=>grid(Object.assign({x0:-8,x1:8,y0:-8,y1:8,u:24,lab:2},o||{}));
const T0=[[1,1],[4,1],[1,3]];
const ptFields=p=>[{label:'x =',answer:p[0]},{label:'y =',answer:p[1]}];
const MOVES=[
 {n:'Translate (x + 3, y − 2)',f:p=>tT(p,3,-2),r:'(x, y) → (x + 3, y − 2)'},
 {n:'Reflect across y-axis',f:p=>tF(p,'y'),r:'(x, y) → (−x, y)'},
 {n:'Reflect across x-axis',f:p=>tF(p,'x'),r:'(x, y) → (x, −y)'},
 {n:'Rotate 90° CCW',f:p=>tR(p,90),r:'(x, y) → (−y, x)'},
 {n:'Rotate 180°',f:p=>tR(p,180),r:'(x, y) → (−x, −y)'},
 {n:'Dilate × 2 (origin)',f:p=>tD(p,2),r:'(x, y) → (2x, 2y)',nr:1}];

function mountCompose(el){
 let a=1,b=0;
 el.innerHTML=`<div><b>First:</b></div>${btns(MOVES.map(m=>m.n),'data-a')}<div style="margin-top:8px"><b>Then:</b></div>${btns(MOVES.map(m=>m.n),'data-b')}<div id="cg"></div><div class="readout" id="cr"></div>`;
 const draw=()=>{const G=G8(),m1=T0.map(MOVES[a].f),m2=m1.map(MOVES[b].f);
  $('#cg',el).innerHTML=G.svg(gPoly(G,T0,{names:VN})+gPoly(G,m1,{names:VN,prime:'′',fill:'rgba(124,58,237,.12)',stroke:'#7c3aed',dash:'6 4'})+`<g clip-path="url(#${G.clip})">`+gPoly(G,m2,{names:VN,prime:'″',fill:'rgba(234,88,12,.2)',stroke:'#ea580c'})+'</g>');
  const rigid=!MOVES[a].nr&&!MOVES[b].nr;
  $('#cr',el).innerHTML=`Blue = ABC. Purple dashed = after step 1 (A′B′C′). Orange = after step 2 (A″B″C″).<br>A${XYs(T0[0])} → A′${XYs(m1[0])} → A″${XYs(m2[0])}<br>${rigid?'Both steps are <b>rigid motions</b>, so A″B″C″ is <b>congruent</b> to ABC (same side lengths and angles).':'A dilation is <b>not rigid</b>: the final triangle has the same angles but different side lengths — it is <b>similar</b>, not congruent.'}`;
  $$('[data-a]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.a===a));$$('[data-b]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.b===b));};
 el.addEventListener('click',e=>{const x=e.target.closest('[data-a],[data-b]');if(!x)return;if(x.dataset.a!==undefined)a=+x.dataset.a;else b=+x.dataset.b;draw();});draw();
}
function mountDilLine(el){
 el.innerHTML=`<div class="ctrl">${ctl('lm','slope m',-2,2,0.5,0.5)}${ctl('lb','intercept b',-3,3,2)}${ctl('lk','scale factor k',0.5,3,2,0.5)}</div><div class="eqline math" id="le"></div><div id="lg"></div><div class="readout" id="lr"></div>`;
 const draw=()=>{const [m,b,k]=vals(el,['lm','lb','lk']);$('#lmv',el).textContent=m;$('#lbv',el).textContent=b;$('#lkv',el).textContent=k;const G=G8();
  const A=[-2,m*-2+b],B=[2,m*2+b];
  $('#lg',el).innerHTML=G.svg(gline(G,m,b,'',`stroke="#2563eb" stroke-width="3"`)+gline(G,m,k*b,'',`stroke="#ea580c" stroke-width="3" stroke-dasharray="8 5"`)+gSeg(G,[0,0],tD(B,k),'#9ca3af',1.5,'4 4')+gSeg(G,[0,0],tD(A,k),'#9ca3af',1.5,'4 4')+gdot(G,A[0],A[1],'#2563eb',5,'A')+gdot(G,B[0],B[1],'#2563eb',5,'B')+gdot(G,...tD(A,k),'#ea580c',5,'A′')+gdot(G,...tD(B,k),'#ea580c',5,'B′')+gdot(G,0,0));
  $('#le',el).innerHTML=`y = ${m}x ${b<0?'− '+(-b):'+ '+b} &nbsp;→&nbsp; y = ${m}x ${k*b<0?'− '+rd(-k*b,2):'+ '+rd(k*b,2)}`;
  $('#lr',el).innerHTML=`Dilating from the origin keeps the <b>slope</b> (${m}) and multiplies the intercept by k: ${b} × ${k} = ${rd(k*b,2)}.<br>${b===0?'This line passes through the center, so it maps <b>onto itself</b>.':'The image line is <b>parallel</b> to the original.'}<br>AB = ${rd(dist2(A,B),2)} → A′B′ = ${rd(k*dist2(A,B),2)} (× ${k}).`;};
 onIn(el,['lm','lb','lk'],draw);draw();
}
function mountPerpBis(el){
 el.innerHTML=`<div class="ctrl">${ctl('px','P x',-6,6,-4)}${ctl('py','P y',-6,6,3)}${ctl('pk','mirror x =',-3,3,1)}</div><div id="pg"></div><div class="readout" id="pr"></div>`;
 const draw=()=>{const [x,y,k]=vals(el,['px','py','pk']);['px','py','pk'].forEach((i,j)=>$('#'+i+'v',el).textContent=[x,y,k][j]);const G=G8(),Pp=tF([x,y],{x:k});
  $('#pg',el).innerHTML=G.svg(gSeg(G,[k,-8],[k,8],'#7c3aed',4)+gSeg(G,[x,y],Pp,'#ea580c',2.5,'6 4')+gdot(G,k,y,'#7c3aed',5,'M')+gdot(G,x,y,'#2563eb',7,'P')+gdot(G,Pp[0],Pp[1],'#ea580c',7,'P′'));
  $('#pr',el).innerHTML=`P${XYs([x,y])} → P′${XYs(Pp)}. Distance P to the line: <b>${Math.abs(x-k)}</b>; P′ to the line: <b>${Math.abs(Pp[0]-k)}</b>.<br>Segment PP′ is horizontal, the mirror is vertical → <b>perpendicular</b>; M${XYs([k,y])} is the midpoint. So the line of reflection is the <b>perpendicular bisector</b> of PP′.`;};
 onIn(el,['px','py','pk'],draw);draw();
}
function mountSym(el){
 el.innerHTML=`<div class="ctrl">${ctl('sn','sides n',3,10,5)}${ctl('sr','turn',0,10,0)}</div><div id="sg"></div><div class="readout" id="srr"></div>`;
 const draw=()=>{const [n,t]=vals(el,['sn','sr']);$('#snv',el).textContent=n;const ang=360/n*t;$('#srv',el).textContent=`${t} × ${rd(360/n,1)}° = ${rd(ang,1)}°`;const C=[200,170],R=120;
  const V=[...Array(n)].map((_,i)=>{const a=(-90+360/n*i+ang)*Math.PI/180;return [C[0]+R*Math.cos(a),C[1]+R*Math.sin(a)];});
  let s='';for(let i=0;i<n;i++){const a=(-90+180/n*i)*Math.PI/180;s+=fL([C[0]-150*Math.cos(a),C[1]-150*Math.sin(a)],[C[0]+150*Math.cos(a),C[1]+150*Math.sin(a)],'#7c3aed',1.5,'5 5');}
  s+=fP(V,'rgba(37,99,235,.15)','#2563eb')+fDot(V[0],'#ea580c',8)+fDot(C);
  $('#sg',el).innerHTML=svgF(400,340,s,400);
  $('#srr',el).innerHTML=`A regular ${n}-gon has <b>${n} lines of symmetry</b> (purple) and <b>rotational symmetry</b> of order ${n}: the smallest turn that maps it onto itself is 360° ÷ ${n} = <b>${rd(360/n,1)}°</b>.<br>Move "turn": every multiple of ${rd(360/n,1)}° lands it exactly on itself (watch the orange vertex).`;};
 onIn(el,['sn','sr'],draw);draw();
}
function mountProof(el){
 const A0=[[-6,1],[-3,1],[-6,5]],TG=[[5,-2],[5,1],[1,-2]];
 const ST=[['Start: △ABC and △DEF',p=>p],['Translate (x, y) → (x + 11, y − 3)',p=>tT(p,11,-3)],['Rotate 90° counterclockwise about D(5, −2)',p=>tR(tT(p,11,-3),90,[5,-2])]];let k=0;
 el.innerHTML=btns(ST.map(s=>s[0]))+`<div id="xg"></div><div class="readout" id="xr"></div>`;
 const draw=i=>{k=i;const G=G8(),cur=A0.map(ST[k][1]);
  $('#xg',el).innerHTML=G.svg(gPoly(G,TG,{names:['D','E','F'],fill:'rgba(5,150,105,.15)',stroke:'#059669'})+gPoly(G,cur,{names:VN,prime:k?'′'.repeat(k):'',fill:'rgba(234,88,12,.2)',stroke:'#ea580c',dash:k<2?'6 4':''}));
  $('#xr',el).innerHTML=[`AB = 3, AC = 4, ∠A = 90°. DE = 3, DF = 4, ∠D = 90°. Are they congruent? Show a <b>sequence of rigid motions</b> that maps one onto the other.`,`Step 1 moves A onto D: A(−6, 1) → (5, −2). Lengths and angles are unchanged.`,`Step 2 turns the triangle about D. Now A″ = D, B″ = E, C″ = F. Rigid motions mapped △ABC exactly onto △DEF, so <b>△ABC ≅ △DEF</b>.`][k];selBtn(el,k);};
 onBtn(el,draw);draw(0);
}

L['GEO-2-1']={
 goal:'I can tell which transformations are rigid and find the image after a sequence of transformations.',
 life:{title:'Rearranging furniture',html:'Sliding a couch across the room, turning it, or flipping a rug over changes where it is — but not its size. Those are <b>rigid motions</b>. Printing a smaller photo of the couch is a dilation: same shape, different size.'},
 see:[{title:'Do two moves in a row',hint:'Pick a first move and a second move. Compare the three triangles.',mount:mountCompose}],
 vocab:[['Rigid motion (isometry)','Keeps distances and angle measures: translations, rotations, reflections.'],['Non-rigid','Changes size: dilations (k ≠ 1), stretches.'],['Composition','Doing one transformation, then another to the image. Order can matter.'],['Double prime','A″ is the image after two transformations.'],['Congruent figures','One can be mapped onto the other by rigid motions.']],
 examples:[
  {title:'Example 1 — A sequence',prob:'Reflect A(2, 5) across the x-axis, then translate (x, y) → (x − 4, y + 1).',raw:true,lines:[['A′(2, −5)','x-axis: (x, y) → (x, −y).'],['A″(2 − 4, −5 + 1) = (−2, −4)','Apply the translation to A′.']]},
  {title:'Example 2 — Identify the transformation',prob:'(3, 1) → (−1, 3), (5, 2) → (−2, 5). What happened?',raw:true,lines:[['(x, y) → (−y, x)','The coordinates swap and the new x is the opposite.'],['90° counterclockwise rotation about the origin','Rigid: lengths stay the same.']]}],
 mistake:{bad:'Order never matters in a sequence',good:'Order can change the result',why:'Reflect (1, 2) across the y-axis then translate x + 3 → (2, 2). Translate first then reflect → (−4, 2). Do the steps in the given order.'},
 practice(){const t=rand(0,2);
  if(t===0){const p=[rand(-5,5)||2,rand(-5,5)||3],i=rand(0,4),j=(i+rand(1,4))%5,im=MOVES[j].f(MOVES[i].f(p));
   return {q:`Start with P${XYs(p)}. First: <b>${MOVES[i].n}</b>. Then: <b>${MOVES[j].n}</b>. Find P″.`,fields:ptFields(im),raw:true,hint:'Do step 1, write P′, then apply step 2 to P′.',sol:[[`P′${XYs(MOVES[i].f(p))}`,MOVES[i].r],[`P″${XYs(im)}`,MOVES[j].r]]};}
  if(t===1){const m=mcU('dilation by 3',['translation 5 left','reflection across y = x','rotation 270°','dilation by 3']);return {type:'mc',q:'Which transformation is <b>not</b> a rigid motion?',opts:m.opts,a:m.a,why:'A dilation with k ≠ 1 changes lengths.'};}
  const i=rand(0,4),p=[rand(1,5),rand(1,5)];if(p[0]===p[1])p[1]++;const im=MOVES[i].f(p),nm=['translation','reflection across the y-axis','reflection across the x-axis','90° counterclockwise rotation','180° rotation'][i];
  const m=mcU(nm,['translation','reflection across the y-axis','reflection across the x-axis','90° counterclockwise rotation','180° rotation']);
  return {type:'mc',q:`P${XYs(p)} maps to P′${XYs(im)}. Which transformation fits?`,opts:m.opts,a:m.a,why:MOVES[i].r+'.'};},
 check:[
  {q:'Which keeps side lengths the same?',o:['dilation by 2','dilation by 1/2','rotation 90°','all of these'],a:2,why:'Rotations are rigid; dilations with k ≠ 1 are not.'},
  {q:'Reflect (4, 1) across the y-axis, then rotate 180° about the origin.',o:['(4, −1)','(−4, 1)','(−4, −1)','(4, 1)'],a:0,why:'(−4, 1) → (4, −1).'},
  {q:'A sequence of rigid motions maps △PQR onto △XYZ. Then the triangles are…',o:['similar only','congruent','not related','reflections only'],a:1,why:'Rigid motions keep size and shape → congruent.'}]
};

L['GEO-2-2']={
 goal:'I can describe what a dilation keeps (angles, slope, parallel lines) and what it changes (lengths).',
 life:{title:'Blueprints and scale models',html:'An architect’s blueprint is a dilation of the real house: every wall is, say, 1/48 as long, but every corner is still 90° and parallel walls stay parallel. That is why the drawing is useful.'},
 see:[{title:'Dilate a line from the origin',hint:'Change the line and k. Compare the blue line with the orange image.',mount:mountDilLine}],
 vocab:[['Preserved by dilation','Angle measures, parallel lines, slope of lines, betweenness, the shape.'],['Changed by dilation','Lengths (× k), perimeter (× k), area (× k²), position.'],['Line through the center','Maps onto itself.'],['Line not through the center','Maps to a parallel line.'],['Similar figures','Same shape, possibly different size.']],
 examples:[
  {title:'Example 1 — Dilate a line',prob:'Dilate y = 2x + 3 by k = 4 with center (0, 0).',raw:true,lines:[['slope stays 2','Dilations keep the direction of lines.'],['(0, 3) → (0, 12)','The y-intercept point is multiplied by 4.'],['y = 2x + 12','Parallel to the original.']]},
  {title:'Example 2 — Lengths and angles',prob:'△ABC has AB = 6 and ∠B = 40°. It is dilated by k = 1/3.',raw:true,lines:[['A′B′ = 6 × 1/3 = 2','Lengths multiply by k.'],['∠B′ = 40°','Angles stay the same.']]}],
 mistake:{bad:'Dilating by 3 makes angles 3 times bigger',good:'Angles stay the same',why:'A dilation stretches distances from the center, but the <b>shape</b> (and so every angle) is unchanged.'},
 practice(){const t=rand(0,2);
  if(t===0){const m=pick([-3,-2,-1,1,2,3,0.5]),b=rand(-5,5)||2,k=pick([2,3,4,0.5]);return {q:`Dilate the line <b>y = ${m}x ${b<0?'− '+(-b):'+ '+b}</b> by k = ${k} with center (0, 0). The image is y = mx + b. Find m and b.`,fields:[{label:'m =',answer:m},{label:'b =',answer:k*b}],raw:true,hint:'Slope stays the same; the intercept is multiplied by k.',sol:[[`m = ${m}`,'Slope is preserved.'],[`b = ${b} × ${k} = ${rd(k*b,2)}`,'(0, b) → (0, kb).']]};}
  if(t===1){const s=rand(3,12),k=pick([2,3,0.5,1.5]),a=rand(25,80);return Math.random()<.5?{q:`A triangle has a side of ${s} cm and an angle of ${a}°. After a dilation by k = ${k}, how long is the image of that side?`,fields:[{label:'length =',answer:s*k,unit:'cm'}],raw:true,hint:'Multiply by k.',sol:[[`${s} × ${k} = ${s*k}`,'Lengths scale by k.']]}
   :{q:`A triangle has a side of ${s} cm and an angle of ${a}°. After a dilation by k = ${k}, what is the measure of the image of that angle?`,fields:[{label:'angle =',answer:a,unit:'°'}],raw:true,hint:'What does a dilation keep?',sol:[[`${a}°`,'Angles are preserved.']]};}
  const m=mcU('it maps onto itself',['it maps onto itself','it becomes perpendicular','its slope is multiplied by k','it shifts up k units']);return {type:'mc',q:'A line passes through the center of a dilation. After the dilation…',opts:m.opts,a:m.a,why:'Every point on that line slides along the same line.'};},
 check:[
  {q:'Dilate y = −x + 2 by k = 3 from the origin.',o:['y = −3x + 6','y = −x + 6','y = −x + 2','y = −3x + 2'],a:1,why:'Slope same, intercept × 3.'},
  {q:'Under a dilation, parallel lines…',o:['become perpendicular','stay parallel','meet at the center','disappear'],a:1,why:'Angles are preserved, so parallel stays parallel.'},
  {q:'A 5-inch side is dilated by k = 0.4. New length?',o:['2 in','5.4 in','12.5 in','4.6 in'],a:0,why:'5 × 0.4 = 2.'}]
};

L['GEO-2-3']={
 goal:'I can define translations, rotations, and reflections precisely and find a line of reflection.',
 life:{title:'Exact instructions for a robot',html:'A robot arm can’t follow “flip it over there.” It needs: <b>reflect across the line x = 1</b>, or <b>rotate 90° counterclockwise about (0, 0)</b>. Precise definitions are the instructions.'},
 see:[{title:'The mirror is the perpendicular bisector',hint:'Move P and the mirror line. Compare the two distances.',mount:mountPerpBis}],
 vocab:[['Translation by vector ⟨a, b⟩','Every point moves a units horizontally and b units vertically.'],['Rotation','Needs a center and an angle (with direction). Each point stays the same distance from the center.'],['Reflection across line ℓ','Points on ℓ stay put; otherwise ℓ is the perpendicular bisector of PP′.'],['Perpendicular bisector','A line through the midpoint of a segment at 90°.'],['Fixed point','A point that maps to itself.']],
 examples:[
  {title:'Example 1 — Find a vertical mirror',prob:'P(−3, 4) reflects to P′(7, 4). Find the line of reflection.',raw:true,lines:[['midpoint x = (−3 + 7) ÷ 2 = 2','The mirror passes through the midpoint.'],['PP′ is horizontal → the mirror is vertical','Perpendicular to PP′.'],['x = 2','Line of reflection.']]},
  {title:'Example 2 — A slanted mirror',prob:'A(1, 5) reflects to A′(5, 1). Find the line.',raw:true,lines:[['midpoint (3, 3)','Average the coordinates.'],['slope of AA′ = (1 − 5)/(5 − 1) = −1','The mirror is perpendicular: slope 1.'],['y − 3 = 1(x − 3) → y = x','Line of reflection.']]}],
 mistake:{bad:'A rotation is defined by its angle only',good:'A rotation needs a center AND an angle',why:'Rotating 90° about (0, 0) and 90° about (2, 1) give different images. Also state the direction (clockwise or counterclockwise).'},
 practice(){const t=rand(0,2);
  if(t<2){const k=rand(-5,5),d=rand(1,6),y=rand(-6,6),hz=t===0;const P1=hz?[k-d,y]:[y,k-d],P2=hz?[k+d,y]:[y,k+d];
   return {q:`P${XYs(P1)} is reflected to P′${XYs(P2)}. The line of reflection is <b>${hz?'x':'y'} = ?</b>`,fields:[{label:`${hz?'x':'y'} =`,answer:k}],raw:true,hint:'The mirror goes through the midpoint of PP′.',sol:[[`(${fmtNeg(hz?P1[0]:P1[1])} + ${P(hz?P2[0]:P2[1])}) ÷ 2 = ${fmtNeg(k)}`,'Midpoint.'],[`${hz?'x':'y'} = ${fmtNeg(k)}`,`PP′ is ${hz?'horizontal → vertical':'vertical → horizontal'} mirror.`]]};}
  const m=mcU('a center of rotation and an angle with direction',['a center of rotation and an angle with direction','only an angle','a line of reflection','a scale factor']);return {type:'mc',q:'To define a rotation precisely you need…',opts:m.opts,a:m.a,why:'Center + angle + direction.'};},
 check:[
  {q:'A(2, −1) reflects to A′(2, 7). Line of reflection?',o:['x = 2','y = 3','y = 4','y = x'],a:1,why:'Midpoint y = (−1 + 7) ÷ 2 = 3; horizontal line.'},
  {q:'For a reflection, the line of reflection is ___ of PP′.',o:['parallel to','the perpendicular bisector','longer than','an endpoint'],a:1,why:'It meets PP′ at its midpoint at 90°.'},
  {q:'Which points stay fixed in a reflection?',o:['none','points on the mirror line','only the origin','all points'],a:1,why:'Points on ℓ map to themselves.'}]
};

L['GEO-2-4']={
 goal:'I can find lines of symmetry and the angles of rotational symmetry of a figure.',
 life:{title:'Logos, snowflakes, and hubcaps',html:'A snowflake looks the same after a 60° turn — 6-fold rotational symmetry. A butterfly has one line of symmetry. Car hubcaps and many logos are designed with rotational symmetry so they look balanced while spinning.'},
 see:[{title:'Symmetry of regular polygons',hint:'Change the number of sides, then use "turn" to rotate.',mount:mountSym}],
 vocab:[['Line symmetry','A reflection across the line maps the figure onto itself.'],['Rotational symmetry','A rotation of less than 360° maps the figure onto itself.'],['Angle of rotation','Smallest such angle; for a regular n-gon it is 360° ÷ n.'],['Order','How many times it matches itself in one full turn (n for a regular n-gon).'],['Point symmetry','Rotational symmetry of 180°.']],
 examples:[
  {title:'Example 1 — Regular hexagon',prob:'Describe the symmetry of a regular hexagon.',raw:true,lines:[['6 lines of symmetry','A regular n-gon has n lines.'],['360° ÷ 6 = 60°','Smallest rotation angle.'],['60°, 120°, 180°, 240°, 300°','All rotations that map it onto itself.']]},
  {title:'Example 2 — Rectangle (not a square)',prob:'Describe the symmetry of a rectangle.',raw:true,lines:[['2 lines','Through midpoints of opposite sides (not the diagonals!).'],['180°','Rotational symmetry of order 2.']]}],
 mistake:{bad:'A rectangle’s diagonals are lines of symmetry',good:'Only the two midlines are',why:'Fold a rectangle along a diagonal and the corners don’t match. Only a square has diagonal symmetry lines.'},
 practice(){const t=rand(0,2);const n=rand(3,12);
  if(t===0)return {q:`A <b>regular ${n}-gon</b>: what is the smallest angle of rotation that maps it onto itself?`,fields:[{label:'angle =',answer:rd(360/n,2),unit:'°',tol:0.06}],raw:true,hint:'360° ÷ number of sides.',sol:[[`360 ÷ ${n} = ${rd(360/n,2)}°`,'Regular n-gon.']]};
  if(t===1)return {q:`How many lines of symmetry does a <b>regular ${n}-gon</b> have?`,fields:[{label:'lines =',answer:n}],raw:true,hint:'One for each side.',sol:[[`${n}`,'A regular n-gon has n lines of symmetry.']]};
  const S=pick([['square','4 lines, 90° rotation'],['rectangle','2 lines, 180° rotation'],['rhombus','2 lines, 180° rotation'],['parallelogram (not a rectangle or rhombus)','0 lines, 180° rotation'],['isosceles trapezoid','1 line, no rotational symmetry'],['equilateral triangle','3 lines, 120° rotation']]);
  const m=mcU(S[1],['4 lines, 90° rotation','2 lines, 180° rotation','0 lines, 180° rotation','1 line, no rotational symmetry','3 lines, 120° rotation']);
  return {type:'mc',q:`Describe the symmetry of a <b>${S[0]}</b>.`,opts:m.opts,a:m.a,why:`${S[0]}: ${S[1]}.`};},
 check:[
  {q:'Smallest rotation for a regular octagon?',o:['8°','45°','60°','90°'],a:1,why:'360 ÷ 8 = 45°.'},
  {q:'Which has rotational symmetry but no line symmetry?',o:['square','parallelogram (general)','isosceles triangle','circle'],a:1,why:'A general parallelogram matches itself after 180° but has no mirror line.'},
  {q:'Lines of symmetry of an equilateral triangle?',o:['1','2','3','6'],a:2,why:'One through each vertex.'}]
};

L['GEO-2-5']={
 goal:'I can use a sequence of rigid motions to show two figures are congruent.',
 life:{title:'Puzzle pieces',html:'To check if a puzzle piece fits a hole, you slide it over, turn it, and maybe flip it. If it lands exactly on the hole, they are congruent. A proof with transformations is the written version of that.'},
 see:[{title:'Map △ABC onto △DEF',hint:'Tap each step in order.',mount:mountProof}],
 vocab:[['Congruence (transformations)','Two figures are congruent if a sequence of rigid motions maps one exactly onto the other.'],['Corresponding parts','Parts that land on each other: A → D, B → E, C → F.'],['Two reflections, parallel lines','= a translation by twice the distance between the lines.'],['Two reflections, intersecting lines','= a rotation about the intersection by twice the angle between the lines.'],['Orientation','Reflections reverse it (clockwise ↔ counterclockwise); translations and rotations keep it.']],
 examples:[
  {title:'Example 1 — Write a sequence',prob:'△ABC: A(1, 1), B(3, 1), C(1, 4). △DEF: D(−1, 1), E(−3, 1), F(−1, 4). Show △ABC ≅ △DEF.',raw:true,lines:[['Reflect across the y-axis','(x, y) → (−x, y).'],['A → (−1, 1) = D, B → (−3, 1) = E, C → (−1, 4) = F','Every vertex lands on its partner.'],['△ABC ≅ △DEF','A rigid motion maps one onto the other.']]},
  {title:'Example 2 — Two reflections',prob:'Reflect across x = 1, then across x = 4. What single transformation is this?',raw:true,lines:[['the lines are parallel, 3 units apart','4 − 1 = 3.'],['translation 2 × 3 = 6 units right','Twice the distance, in the direction from the first line to the second.'],['(x, y) → (x + 6, y)','Check: (0, 0) → (2, 0) → (6, 0). ✓']]}],
 mistake:{bad:'Two triangles with the same area are congruent',good:'Same area is not enough',why:'A 2 × 6 right triangle and a 3 × 4 right triangle both have area 6, but no rigid motion maps one onto the other.'},
 practice(){const t=rand(0,2);
  if(t===0){const a=rand(-4,3),d=rand(1,4),b=a+d;return {q:`Reflect a figure across x = ${fmtNeg(a)}, then across x = ${fmtNeg(b)}. This equals a translation of how many units to the right?`,fields:[{label:'units =',answer:2*d}],raw:true,hint:'Twice the distance between the parallel lines.',sol:[[`distance = ${fmtNeg(b)} − ${P(a)} = ${d}`,'Between the lines.'],[`2 × ${d} = ${2*d}`,'Translation distance.']]};}
  if(t===1){const th=pick([20,30,35,45,60,90]);return {q:`Two lines meet at an angle of ${th}°. Reflecting across one, then the other, is a rotation of how many degrees?`,fields:[{label:'angle =',answer:2*th,unit:'°'}],raw:true,hint:'Twice the angle between the lines.',sol:[[`2 × ${th} = ${2*th}°`,'Rotation about the intersection point.']]};}
  const p=[rand(1,5),rand(1,5)],a=rand(-5,5)||2,m0=tT(tF(p,'x'),a,0);const m=mcU(`reflect across the x-axis, then translate ${Math.abs(a)} ${a>0?'right':'left'}`,[`reflect across the y-axis, then translate ${Math.abs(a)} ${a>0?'right':'left'}`,`rotate 90° counterclockwise`,`reflect across the x-axis, then translate ${Math.abs(a)} ${a>0?'left':'right'}`,'dilate by 2']);
  return {type:'mc',q:`A${XYs(p)} maps to A″${XYs(m0)}. Which sequence works?`,opts:m.opts,a:m.a,why:`x-axis: ${XYs(tF(p,'x'))}; then x ${a>0?'+':'−'} ${Math.abs(a)} → ${XYs(m0)}.`};},
 check:[
  {q:'Which proves △ABC ≅ △DEF?',o:['They have the same perimeter','A dilation maps one onto the other','A sequence of rigid motions maps one onto the other','They look the same'],a:2,why:'That is the transformation definition of congruence.'},
  {q:'Reflect across y = 0, then across y = 5. Result?',o:['translation 5 up','translation 10 up','rotation 180°','no change'],a:1,why:'Parallel lines 5 apart → translation 10.'},
  {q:'Which transformation reverses orientation?',o:['translation','rotation','reflection','none'],a:2,why:'A reflection flips the figure.'}]
};
})();
