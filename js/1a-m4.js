/* Algebra 1A · Module 4 · Linear Systems */
(function(){
const eqAB=(a,b,c,x='x',y='y')=>`${a?T(a,x):''}${a&&b?(b<0?' '+MINUS+' ':' + ')+T(Math.abs(b),y):(b?T(b,y):'')} = ${fmtNeg(c)}`;
const sysH=(e1,e2)=>`<div class="sys">${mx(e1)}<br>${mx(e2)}</div>`;
function shade(G,m,b,above,fill){const a=G.x0-1,z=G.x1+1,t=above?G.y1+80:G.y0-80;return `<polygon clip-path="url(#${G.clip})" points="${G.X(a)},${G.Y(m*a+b)} ${G.X(z)},${G.Y(m*z+b)} ${G.X(z)},${G.Y(t)} ${G.X(a)},${G.Y(t)}" fill="${fill}"/>`;}
function randSys(){let x,y,a1,b1,a2,b2;do{x=rand(-4,5);y=rand(-4,5);a1=pick([1,2,3,-1,-2]);b1=pick([1,2,3,-1,-2,-3]);a2=pick([1,2,3,4,-1,-3]);b2=pick([1,2,-1,-2,-3,4]);}while(a1*b2-a2*b1===0);return {x,y,a1,b1,a2,b2,c1:a1*x+b1*y,c2:a2*x+b2*y};}

/* ---- widgets ---- */
function mountSys(el){
 const PR=[{t:'One solution',l:[[-0.5,2,'y = −0.5x + 2'],[3,2,'y = 3x + 2']]},{t:'Infinitely many',l:[[3,2,'y = 3x + 2'],[3,2,'2y = 6x + 4']]},{t:'No solution',l:[[3,2,'y = 3x + 2'],[3,-1,'y = 3x − 1']]},{t:'💰 Savings race',l:[[5,20,'Maya: y = 5x + 20'],[10,5,'Leo: y = 10x + 5']],story:1}];
 let k=3;
 el.innerHTML=`<div class="row">${PR.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div id="sg4"></div><div class="readout" id="sr4"></div>`;
 const draw=()=>{const p=PR[k],G=p.story?grid({x0:0,x1:6,y0:0,y1:60,u:60,uy:5.5,lab:1,laby:10,gsy:5,xl:'weeks',yl:'saved ($)'}):grid({u:30});const [[m1,b1,t1],[m2,b2,t2]]=p.l;
  let s=gline(G,m1,b1,'',`stroke="#2563eb" stroke-width="5"`)+gline(G,m2,b2,'',`stroke="#ea580c" stroke-width="3" ${m1===m2&&b1===b2?'stroke-dasharray="10 8"':''}`);
  let msg;if(m1!==m2){const x=(b2-b1)/(m1-m2),y=m1*x+b1;s+=gdot(G,x,y,'#15803d',9,`(${fmtNeg(x)}, ${fmtNeg(y)})`);msg=`The lines <b>cross once</b> at (${fmtNeg(x)}, ${fmtNeg(y)}) → <b>one solution</b> (consistent, independent).`+(p.story?` After <b>3 weeks</b> Maya and Leo both have <b>$35</b>. After that, Leo is ahead.`:'');}
  else if(b1===b2)msg='Both equations make the <b>same line</b> → <b>infinitely many solutions</b> (consistent, dependent). Divide 2y = 6x + 4 by 2 and you get y = 3x + 2.';
  else msg='Same slope, different y-intercepts → the lines are <b>parallel</b> and never meet → <b>no solution</b> (inconsistent).';
  $('#sg4',el).innerHTML=`<div style="text-align:center"><span style="color:#2563eb;font-weight:700">${t1}</span> &nbsp;&nbsp; <span style="color:#ea580c;font-weight:700">${t2}</span></div>`+G.svg(s);
  $('#sr4',el).innerHTML=(p.story?'Maya has $20 and saves $5 a week. Leo has $5 and saves $10 a week.<br>':'')+msg;$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}
function mountStepper(el,sets){
 let k=0,st=0;
 el.innerHTML=`<div class="row">${sets.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div class="card" style="margin:10px 0;text-align:center" id="stc"></div><div class="note" id="stn"></div><div class="row"><button data-a="b">◀ Back</button><button class="primary" data-a="n">Next step ▶</button></div>`;
 const draw=()=>{const p=sets[k];$('#stc',el).innerHTML=p.steps[st].h;$('#stn',el).innerHTML=`<b>Step ${st}/${p.steps.length-1}:</b> `+p.steps[st].n;
  $('[data-a=b]',el).disabled=st===0;$('[data-a=n]',el).disabled=st===p.steps.length-1;$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k!==undefined){k=+b.dataset.k;st=0;}if(b.dataset.a==='n')st++;if(b.dataset.a==='b')st--;draw();});draw();
}
const V=(t)=>`<i class="v">${t}</i>`;
const SUBST=[{t:'x − y = −2 and 3x + y = 10',steps:[
 {h:`<div class="sys">${V('x')} − ${V('y')} = −2<br>3${V('x')} + ${V('y')} = 10</div>`,n:'Two equations, two unknowns. Goal: turn it into ONE equation with ONE unknown.'},
 {h:`<div class="sys"><span class="tile">${V('x')} = ${V('y')} − 2</span><br>3${V('x')} + ${V('y')} = 10</div>`,n:'Solve the first equation for x (add y to both sides). Now x has a “name”: <b>y − 2</b>.'},
 {h:`<div class="sys">${V('x')} = ${V('y')} − 2<br>3<span class="tile">(${V('y')} − 2)</span> + ${V('y')} = 10</div>`,n:'<b>Substitute:</b> swap the x in the second equation for its twin (y − 2). Now only y is left!'},
 {h:`<div class="math big">3${V('y')} − 6 + ${V('y')} = 10<br>4${V('y')} = 16<br>${V('y')} = 4</div>`,n:'Solve: distribute, combine like terms, add 6, divide by 4.'},
 {h:`<div class="math big">${V('x')} = 4 − 2 = 2<br><b class="good">(2, 4)</b></div>`,n:'Put y = 4 back into x = y − 2. Check in 3x + y = 10: 3(2) + 4 = 10 ✓'}]},
 {t:'🍔 Burger and fries',steps:[
 {h:`<div class="sys">${V('b')} = ${V('f')} + 3<br>${V('b')} + 2${V('f')} = 12</div>`,n:'A burger costs $3 more than fries. One burger + two fries cost $12.'},
 {h:`<div class="sys"><span class="tile">${V('b')} = ${V('f')} + 3</span><br>${V('b')} + 2${V('f')} = 12</div>`,n:'The first equation already tells us what b equals.'},
 {h:`<div class="sys">${V('b')} = ${V('f')} + 3<br><span class="tile">(${V('f')} + 3)</span> + 2${V('f')} = 12</div>`,n:'Substitute (f + 3) for b in the second equation.'},
 {h:`<div class="math big">3${V('f')} + 3 = 12<br>3${V('f')} = 9<br>${V('f')} = 3</div>`,n:'Fries cost $3.'},
 {h:`<div class="math big">${V('b')} = 3 + 3 = 6<br><b class="good">fries $3, burger $6</b></div>`,n:'Back-substitute. Check: 6 + 2(3) = 12 ✓'}]}];
function elimTable(rows,sumRow,gone){return `<table class="eqt">${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}${sumRow?`<tr class="sum"><td>${sumRow[0]}</td><td class="${gone?'':''}">${sumRow[1]}</td><td>${sumRow[2]}</td><td>${sumRow[3]}</td></tr>`:''}</table>`;}
const ELIM=[{t:'Add: 2x + 3y = 13, 4x − 3y = 17',steps:[
 {h:elimTable([[`2${V('x')}`,`+ 3${V('y')}`,'=','13'],[`4${V('x')}`,`− 3${V('y')}`,'=','17']]),n:'Look at the y-terms: <b>+3y</b> and <b>−3y</b> are opposites — a <b>zero pair</b>.'},
 {h:elimTable([[`2${V('x')}`,`<span class="gone">+ 3${V('y')}</span>`,'=','13'],[`4${V('x')}`,`<span class="gone">− 3${V('y')}</span>`,'=','17']],[`6${V('x')}`,'0','=','30']),n:'<b>Add</b> the equations straight down. +3y and −3y cancel (like 3 steps forward and 3 steps back).'},
 {h:`<div class="math big">6${V('x')} = 30 → ${V('x')} = 5</div>`,n:'Solve the one-variable equation.'},
 {h:`<div class="math big">2(5) + 3${V('y')} = 13 → 3${V('y')} = 3 → ${V('y')} = 1<br><b class="good">(5, 1)</b></div>`,n:'Substitute x = 5 into either original equation. Check: 4(5) − 3(1) = 17 ✓'}]},
 {t:'🌮 Subtract: two receipts',steps:[
 {h:elimTable([[`3${V('t')}`,`+ 2${V('d')}`,'=','13'],[`3${V('t')}`,`+ 4${V('d')}`,'=','17']]),n:'Receipt 1: 3 tacos + 2 drinks = $13. Receipt 2: 3 tacos + 4 drinks = $17. Same number of tacos!'},
 {h:elimTable([[`<span class="gone">3${V('t')}</span>`,`+ 2${V('d')}`,'=','13'],[`<span class="gone">3${V('t')}</span>`,`+ 4${V('d')}`,'=','17']],['0',`− 2${V('d')}`,'=','−4']),n:'<b>Subtract</b> (top − bottom): the tacos cancel. The only difference is 2 extra drinks costing $4.'},
 {h:`<div class="math big">−2${V('d')} = −4 → ${V('d')} = 2</div>`,n:'A drink costs $2.'},
 {h:`<div class="math big">3${V('t')} + 2(2) = 13 → 3${V('t')} = 9 → ${V('t')} = 3<br><b class="good">taco $3, drink $2</b></div>`,n:'Back-substitute into receipt 1. Check receipt 2: 9 + 8 = 17 ✓'}]}];
function mountMult(el){
 const E=[[3,8,7],[2,-2,-10]];let k=[1,1];
 el.innerHTML=`<div style="text-align:center">${sysH('3x + 8y = 7','2x − 2y = −10')}</div><div class="ctrl" style="justify-content:center">${[0,1].map(i=>`<span class="stepper2">Multiply equation ${i+1} by <button data-m="${i}-">−</button><b id="k${i}"></b><button data-m="${i}+">+</button></span>`).join('')}</div><div id="mt"></div><div class="readout" id="mr4"></div>`;
 const cell=(c,v,first)=>first?`${fmtNeg(c)}${V(v)}`:`${c<0?'−':'+'} ${Math.abs(c)}${V(v)}`;
 const draw=()=>{const r=E.map((e,i)=>e.map(c=>c*k[i]));const sum=[r[0][0]+r[1][0],r[0][1]+r[1][1],r[0][2]+r[1][2]];
  $('#k0',el).textContent=fmtNeg(k[0]);$('#k1',el).textContent=fmtNeg(k[1]);
  const gx=sum[0]===0,gy=sum[1]===0;
  $('#mt',el).innerHTML=`<table class="eqt">${r.map(q=>`<tr><td>${cell(q[0],'x',1)}</td><td class="${gy?'gone':''}">${cell(q[1],'y')}</td><td>=</td><td>${fmtNeg(q[2])}</td></tr>`).join('')}<tr class="sum"><td>${gx?'0':cell(sum[0],'x',1)}</td><td>${gy?'0':cell(sum[1],'y')}</td><td>=</td><td>${fmtNeg(sum[2])}</td></tr></table>`;
  $('#mr4',el).innerHTML=gy?`<span class="good">✓ The y-terms cancel!</span> ${fmtNeg(sum[0])}x = ${fmtNeg(sum[2])} → <b>x = ${fmtNeg(sum[2]/sum[0])}</b>. Then 3(−3) + 8y = 7 → 8y = 16 → <b>y = 2</b>. Solution <b>(−3, 2)</b>.`:gx?`<span class="good">✓ The x-terms cancel!</span> ${fmtNeg(sum[1])}y = ${fmtNeg(sum[2])} → <b>y = ${fmtNeg(sum[2]/sum[1])}</b>. Then 2x − 2(2) = −10 → <b>x = −3</b>. Solution <b>(−3, 2)</b>.`:
   'Nothing cancels yet. Goal: make the y-coefficients (8 and −2) or the x-coefficients (3 and 2) <b>opposites</b>. Hint: 8 and −2 → multiply equation 2 by 4.';};
 el.addEventListener('click',e=>{const m=e.target.closest('[data-m]')?.dataset.m;if(!m)return;const i=+m[0];k[i]+=m[1]==='+'?1:-1;if(k[i]===0)k[i]+=m[1]==='+'?1:-1;k[i]=Math.max(-6,Math.min(6,k[i]));draw();});draw();
}
function mountReceipts(el){
 const rc=(x,t,b,p,tot)=>`<g transform="translate(${x},10)"><rect width="190" height="150" rx="8" fill="#fff" stroke="#9ca3af" stroke-width="2" stroke-dasharray="0"/><text x="95" y="26" text-anchor="middle" font-weight="800" font-size="15">${t}</text><line x1="12" y1="36" x2="178" y2="36" stroke="#d1d5db" stroke-dasharray="4 3"/>
 <text x="14" y="62" font-size="15">🖌 brushes</text><text x="176" y="62" text-anchor="end" font-size="16" font-weight="800" fill="#2563eb">× ${b}</text><text x="14" y="90" font-size="15">🎨 paint tubes</text><text x="176" y="90" text-anchor="end" font-size="16" font-weight="800" fill="#ea580c">× ${p}</text>
 <line x1="12" y1="104" x2="178" y2="104" stroke="#374151"/><text x="14" y="130" font-size="16" font-weight="800">TOTAL</text><text x="176" y="130" text-anchor="end" font-size="18" font-weight="800">$${tot}</text></g>`;
 const G=grid({x0:0,x1:10,y0:0,y1:10,u:30,lab:1,laby:2,xl:'x = brush ($)',yl:'y = paint ($)'});
 el.innerHTML=`<svg viewBox="0 0 420 170" class="fig" style="max-width:420px">${rc(10,'Last week',5,6,43)}${rc(220,'This week',4,12,56)}</svg>
 <div style="text-align:center">${sysH('5x + 6y = 43','4x + 12y = 56')}</div>
 <div class="row" style="justify-content:center"><button class="primary" data-g>Show the graph</button></div><div id="rgr"></div>`;
 el.addEventListener('click',e=>{if(!e.target.closest('[data-g]'))return;$('#rgr',el).innerHTML=G.svg(gline(G,-5/6,43/6,'',`stroke="#2563eb" stroke-width="3"`)+gline(G,-4/12,56/12,'',`stroke="#ea580c" stroke-width="3"`)+gdot(G,5,3,'#15803d',9,'(5, 3)'))+'<div class="readout">The lines cross at <b>(5, 3)</b>: a brush costs <b>$5</b> and a tube of paint costs <b>$3</b>. Check: 5(5) + 6(3) = 43 ✓ and 4(5) + 12(3) = 56 ✓</div>';});
}
function mountSysIneq(el){
 const PR=[{t:'Example',I:[[2,3,'≤'],[-1,-6,'>']],G:{x0:-8,x1:8,y0:-8,y1:8,u:26},tp:[0,0]},{t:'💼 Two jobs',I:[[-1,12,'≤'],[-1.5,15,'≥']],G:{x0:0,x1:16,y0:0,y1:16,u:26,lab:2,xl:'tutoring hours (x)',yl:'babysitting hours (y)'},tp:[8,3],story:1}];
 let k=0,tp=null,G;
 el.innerHTML=`<div class="row">${PR.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div id="sie" style="text-align:center"></div><svg class="fig" style="max-width:470px;cursor:crosshair"></svg><div class="readout" id="sir"></div>`;
 const svg=$('svg',el);
 const ok=(m,b,s,x,y)=>{const r=m*x+b;return s==='<'?y<r:s==='≤'?y<=r+1e-9:s==='>'?y>r:y>=r-1e-9;};
 const lbl=(m,b,s)=>`y ${s} ${m===1?'':m===-1?'−':fmtNeg(m)}x${b?S(b):''}`;
 const draw=()=>{const p=PR[k];G=grid(p.G);svg.setAttribute('viewBox',`0 0 ${G.W} ${G.H}`);if(!tp)tp=p.tp.slice();
  const cols=['rgba(37,99,235,.2)','rgba(234,88,12,.2)'],lc=['#2563eb','#ea580c'];let s='';
  p.I.forEach(([m,b,sy],i)=>s+=shade(G,m,b,sy==='>'||sy==='≥',cols[i]));
  p.I.forEach(([m,b,sy],i)=>s+=gline(G,m,b,'',`stroke="${lc[i]}" stroke-width="3" ${sy==='<'||sy==='>'?'stroke-dasharray="9 7"':''}`));
  const r=p.I.map(([m,b,sy])=>ok(m,b,sy,tp[0],tp[1]));s+=gdot(G,tp[0],tp[1],r[0]&&r[1]?'#15803d':'#b91c1c',9,`(${fmtNeg(tp[0])}, ${fmtNeg(tp[1])})`);
  svg.innerHTML=G.base+s;
  $('#sie',el).innerHTML=p.story?sysH('x + y ≤ 12','15x + 10y ≥ 150'):sysH(lbl(...p.I[0].slice(0,2),p.I[0][2]),lbl(...p.I[1].slice(0,2),p.I[1][2]));
  $('#sir',el).innerHTML=`<b>Tap the graph</b> to test a point. (${fmtNeg(tp[0])}, ${fmtNeg(tp[1])}): <span style="color:#2563eb">first ${r[0]?'✓ true':'✗ false'}</span>, <span style="color:#ea580c">second ${r[1]?'✓ true':'✗ false'}</span> → `+(r[0]&&r[1]?'<span class="good">in the overlap → a solution of the system.</span>':'<span class="bad">not in the overlap → not a solution.</span>')+
   (p.story?'<br>Tutoring pays $15/h, babysitting $10/h. You can work <b>at most 12 hours</b> (blue) and want to earn <b>at least $150</b> (orange). The purple overlap shows every schedule that works.':'<br>The solution of the system is where the two shadings <b>overlap</b> (purple).');
  $$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 svg.addEventListener('click',e=>{const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const q=pt.matrixTransform(svg.getScreenCTM().inverse());tp=[Math.max(G.x0,Math.min(G.x1,Math.round((q.x-28)/G.u+G.x0))),Math.max(G.y0,Math.min(G.y1,Math.round(G.y1-(q.y-28)/G.uy)))];draw();});
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;tp=null;draw();}});draw();
}

/* ---- lessons ---- */
const XY=(x,y)=>[{label:'x =',answer:x},{label:'y =',answer:y}];

L['1A-4-1']={
 goal:'I can solve a system of linear equations by graphing and classify it as one solution, no solution, or infinitely many solutions.',
 life:{title:'The savings race',html:'Maya has <b>$20</b> and saves <b>$5</b> a week. Leo has <b>$5</b> and saves <b>$10</b> a week. When will they have the same amount?<br>Each person is a line. The answer is where the lines <b>meet</b> — and the picture also shows who is ahead before and after.'},
 see:[{title:'Two lines, three possibilities',hint:'Try each button. Do the lines cross, sit on top of each other, or run side by side?',mount:mountSys}],
 vocab:[['System of linear equations','Two (or more) linear equations with the same variables, solved together.'],['Solution of a system','An ordered pair that makes BOTH equations true — where the lines meet.'],['Consistent','At least one solution. Independent = exactly one; dependent = infinitely many (same line).'],['Inconsistent','No solution — the lines are parallel.']],
 examples:[
  {title:'Example — Solve by graphing',prob:'Solve '+sysH('y = x + 1','y = −2x + 4')+' by graphing.',raw:true,lines:[
   [mx('y = x + 1'),'Line 1: start at (0, 1), up 1, right 1.'],[mx('y = −2x + 4'),'Line 2: start at (0, 4), down 2, right 1.'],['(1, 2)','The lines intersect at (1, 2).'],['Check: 2 = 1 + 1 ✓, 2 = −2(1) + 4 ✓','The point works in both equations → solution (1, 2).']]},
  {title:'Example — Classify without graphing',prob:'Compare the slopes and y-intercepts.',raw:true,lines:[
   ['different slopes','→ lines cross once → <b>one solution</b>.'],['same slope, different b','→ parallel → <b>no solution</b>.'],['same slope, same b','→ same line → <b>infinitely many solutions</b>.']]}],
 mistake:{bad:'The solution is x = 1',good:'The solution is (1, 2)',why:'A system with two variables needs an <b>ordered pair</b> — both x and y.'},
 practice(){
  if(Math.random()<.55){let m1,m2,b1,b2,x,y;do{m1=pick([-2,-1,1,2,3]);m2=pick([-3,-2,-1,1,2]);x=rand(-3,3);y=rand(-4,4);b1=y-m1*x;b2=y-m2*x;}while(m1===m2||Math.abs(b1)>6||Math.abs(b2)>6);
   const G=grid({u:24});return {q:`Solve the system by graphing: ${sysH(`y = ${T(m1,'x')}${b1?S(b1):''}`,`y = ${T(m2,'x')}${b2?S(b2):''}`)}`,fig:G.svg(gline(G,m1,b1,'',`stroke="#2563eb" stroke-width="3"`)+gline(G,m2,b2,'',`stroke="#ea580c" stroke-width="3"`)),fields:XY(x,y),hint:'Find where the two lines cross. Read x, then y.',sol:[[`(${fmtNeg(x)}, ${fmtNeg(y)})`,'The intersection.'],[`${fmtNeg(y)} = ${fmtNeg(m1*x)}${b1?S(b1):''} ✓`,'Check in line 1.']]};}
  const t=rand(0,2),m=pick([-3,-2,2,3,4]),b=rand(-5,5),k=pick([2,3]);let e1=`y = ${T(m,'x')}${b?S(b):''}`,e2;
  if(t===0){let m2=m+pick([1,-1,2]);if(!m2)m2=5;e2=`y = ${T(m2,'x')}${S(rand(-4,4))}`;}else if(t===1){let b2=b+pick([2,3,-2]);e2=`y = ${T(m,'x')}${b2?S(b2):''}`;}else e2=`${k}y = ${T(k*m,'x')}${b?S(k*b):''}`;
  return {type:'mc',q:`How many solutions does this system have? ${sysH(e1,e2)}`,opts:['One solution','No solution','Infinitely many solutions'],a:t,why:['Different slopes → the lines cross once.','Same slope, different y-intercepts → parallel lines.',`Divide the second equation by ${k}: it is the same line.`][t]};},
 check:[
  {q:'Two lines in a system are parallel. How many solutions?',o:['One','None','Infinitely many','Two'],a:1,why:'Parallel lines never meet.'},
  {q:'y = 3x + 2 and 2y = 6x + 4. How many solutions?',o:['One','None','Infinitely many','Cannot tell'],a:2,why:'2y = 6x + 4 simplifies to y = 3x + 2 — the same line.'},
  {q:'Which point is the solution of y = x + 1 and y = −2x + 4?',o:['(0, 1)','(1, 2)','(2, 0)','(3, 4)'],a:1,why:'(1, 2) works in both: 2 = 1 + 1 and 2 = −2 + 4.'}]
};

L['1A-4-2']={
 goal:'I can solve a system of linear equations using substitution.',
 life:{title:'Burger and fries',html:'A burger costs <b>$3 more</b> than fries, and one burger plus two fries cost <b>$12</b>. The first fact tells you what a burger “is worth” in fries: <span class="math">'+mx('b = f + 3')+'</span>.<br><b>Substitution</b> = swap one thing for something equal to it, the way you’d swap a $10 bill for two $5 bills.'},
 see:[{title:'Swap, then solve',hint:'Step through each example. Watch the yellow tile move into the other equation.',mount:el=>mountStepper(el,SUBST)}],
 vocab:[['Substitution method','Solve one equation for a variable, then replace that variable in the other equation.'],['Isolate','Get a variable alone on one side (x = y − 2).'],['Back-substitute','Put the value you found into an equation to find the other variable.']],
 examples:[
  {title:'Example A',prob:'Solve '+sysH('x − y = −2','3x + y = 10')+' by substitution.',raw:true,lines:[
   [mx('x = y − 2'),'Step 1: Solve the first equation for x.'],[mx('3(y − 2) + y = 10'),'Step 2: Substitute (y − 2) for x in the other equation.'],[mx('4y − 6 = 10 → y = 4'),'Distribute, combine, solve.'],[mx('x = 4 − 2 = 2'),'Step 3: Back-substitute.'],['(2, 4)','Step 4: Write the ordered pair.']]},
  {title:'Example B',prob:'Solve '+sysH('y = 2x − 1','3x + 2y = 12')+'.',raw:true,lines:[
   [mx('3x + 2(2x − 1) = 12'),'y is already isolated — substitute it.'],[mx('7x − 2 = 12 → x = 2'),'Distribute and solve.'],[mx('y = 2(2) − 1 = 3'),'Back-substitute.'],['(2, 3)','Check: 3(2) + 2(3) = 12 ✓']]}],
 mistake:{bad:'3(y − 2) + y = 10 → 3y − 2 + y = 10',good:'3y − 6 + y = 10',why:'Use parentheses when you substitute, and distribute to <b>every</b> term inside.'},
 practice(){
  let x,y,m,b,a2,b2;do{x=rand(-4,5);y=rand(-4,6);m=pick([-3,-2,-1,1,2,3]);b=y-m*x;a2=pick([1,2,3,4,-1,-2]);b2=pick([1,2,3,-1,-2]);}while(Math.abs(b)>9||a2+b2*m===0);
  const c2=a2*x+b2*y,e1=`y = ${T(m,'x')}${b?S(b):''}`,e2=eqAB(a2,b2,c2);
  return {q:`Solve by substitution: ${sysH(e1,e2)}`,fields:XY(x,y),hint:`y is already isolated. Replace y in the second equation with (${T(m,'x')}${b?S(b):''}).`,
   sol:[[`${T(a2,'x')} ${b2<0?MINUS:'+'} ${Math.abs(b2)}(${T(m,'x')}${b?S(b):''}) = ${fmtNeg(c2)}`,'Substitute.'],[`${T(a2+b2*m,'x')}${b2*b?S(b2*b):''} = ${fmtNeg(c2)}`,'Distribute and combine like terms.'],[`x = ${fmtNeg(x)}`,'Solve for x.'],[`y = ${fmtNeg(m)}(${fmtNeg(x)})${b?S(b):''} = ${fmtNeg(y)}`,'Back-substitute.']]};},
 check:[
  {q:'In y = x + 5 and 2x + y = 11, what do you substitute into the second equation?',o:['x + 5 for y','11 for y','5 for x','2x for y'],a:0,why:'y equals x + 5, so replace y with (x + 5).'},
  {q:'Solve: x = y − 2 and 3x + y = 10.',o:['(4, 2)','(2, 4)','(3, 1)','(−2, 0)'],a:1,why:'3(y − 2) + y = 10 → y = 4, x = 2.'},
  {q:'After you find y, what is the next step?',o:['Stop — y is the answer','Substitute y back to find x','Graph y','Multiply both equations'],a:1,why:'You need both values for the ordered pair.'}]
};

L['1A-4-3']={
 goal:'I can solve a system of linear equations by adding or subtracting the equations (elimination).',
 life:{title:'Two receipts',html:'Receipt 1: 3 tacos + 2 drinks = <b>$13</b>. Receipt 2: 3 tacos + 4 drinks = <b>$17</b>.<br>Same tacos, but receipt 2 costs $4 more — so those <b>2 extra drinks cost $4</b>. That is elimination: compare (subtract) the equations so one item disappears.'},
 see:[{title:'Zero pairs disappear',hint:'Step through. When a term and its opposite line up, adding makes them vanish.',mount:el=>mountStepper(el,ELIM)}],
 vocab:[['Elimination method','Add or subtract the equations so one variable cancels.'],['Opposites / zero pair','+3y and −3y add to 0 → ADD the equations.'],['Same terms','3t and 3t → SUBTRACT the equations.']],
 examples:[
  {title:'Example — Adding',prob:'Solve '+sysH('2x + 3y = 13','4x − 3y = 17')+'.',raw:true,lines:[
   [mx('6x = 30'),'+3y and −3y are opposites → add the equations.'],[mx('x = 5'),'Divide by 6.'],[mx('2(5) + 3y = 13 → y = 1'),'Substitute into the first equation.'],['(5, 1)','Check: 4(5) − 3(1) = 17 ✓']]},
  {title:'Example — Subtracting',prob:'Solve '+sysH('3x + 2y = 13','3x + 4y = 17')+'.',raw:true,lines:[
   [mx('−2y = −4'),'3x and 3x are the same → subtract (top − bottom).'],[mx('y = 2'),'Divide by −2.'],[mx('3x + 2(2) = 13 → x = 3'),'Back-substitute.'],['(3, 2)','Check: 9 + 8 = 17 ✓']]}],
 mistake:{bad:'3x + 2y = 13 minus 3x + 4y = 17 → 2y = −4',good:'−2y = −4',why:'When you subtract, subtract <b>every</b> term: 2y − 4y = −2y and 13 − 17 = −4.'},
 practice(){
  let x,y,a1,a2,b,sgn;do{x=rand(-4,6);y=rand(-4,6);a1=pick([1,2,3,4,5]);a2=pick([1,2,3,-1,-2]);b=pick([1,2,3,4]);sgn=pick([1,-1]);}while(sgn===1&&a1===a2||sgn===-1&&a1+a2===0);
  const b2=sgn===1?b:-b,c1=a1*x+b*y,c2=a2*x+b2*y,add=sgn===-1,k=add?a1+a2:a1-a2,kc=add?c1+c2:c1-c2;
  return {q:`Solve by elimination: ${sysH(eqAB(a1,b,c1),eqAB(a2,b2,c2))}`,fields:XY(x,y),hint:add?'The y-terms are opposites → add the equations.':'The y-terms are the same → subtract the equations.',
   sol:[[`${T(k,'x')} = ${fmtNeg(kc)}`,add?'Add the equations: the y-terms cancel.':'Subtract the equations: the y-terms cancel.'],[`x = ${fmtNeg(x)}`,`Divide by ${fmtNeg(k)}.`],[`${a1}(${fmtNeg(x)}) + ${T(b,'y')} = ${fmtNeg(c1)} → y = ${fmtNeg(y)}`,'Back-substitute into the first equation.']]};},
 check:[
  {q:'In x + 4y = 10 and 3x − 4y = 6, which operation eliminates y?',o:['Add the equations','Subtract the equations','Multiply by 4','Divide by 3'],a:0,why:'+4y and −4y are opposites.'},
  {q:'Solve: 2x + 3y = 13 and 4x − 3y = 17.',o:['(1, 5)','(5, 1)','(3, 2)','(5, −1)'],a:1,why:'Add: 6x = 30 → x = 5; then y = 1.'},
  {q:'In 5x + 2y = 9 and 5x − y = 3, which operation eliminates x?',o:['Add','Subtract','Multiply by 5','None'],a:1,why:'5x and 5x are the same → subtract.'}]
};

L['1A-4-4']={
 goal:'I can solve a system by multiplying one or both equations first, then using elimination.',
 life:{title:'Doubling a recipe',html:'If 1 cup of rice needs 2 cups of water, then 2 cups of rice need 4 cups of water. Multiplying <b>everything</b> by the same number keeps a statement true.<br>That’s the trick here: scale an equation so its terms line up with the other equation and cancel.'},
 see:[{title:'Find the multiplier',hint:'Change the multipliers until a column cancels to 0.',mount:mountMult}],
 vocab:[['Common coefficient','A number both coefficients divide into (their LCM), like 8 for 8 and −2.'],['Multiply first','Multiply every term of an equation (both sides) by the same number.'],['Opposite signs','Aim for opposite coefficients so you can ADD.']],
 examples:[
  {title:'Example 1 — Multiply one equation',prob:'Solve '+sysH('3x + 8y = 7','2x − 2y = −10')+'.',raw:true,lines:[
   [mx('8x − 8y = −40'),'y-coefficients 8 and −2: multiply equation 2 by 4.'],[mx('11x = −33'),'Add to equation 1: +8y and −8y cancel.'],[mx('x = −3'),'Divide by 11.'],[mx('3(−3) + 8y = 7 → y = 2'),'Back-substitute: (−3, 2).']]},
  {title:'Example 2 — Multiply both equations',prob:'Solve '+sysH('−3x + 2y = 4','4x − 13y = 5')+'. Prepare the x-terms.',raw:true,lines:[
   ['LCM of 3 and 4 = 12','Find a common coefficient for x.'],[mx('4(−3x + 2y = 4) → −12x + 8y = 16'),'Multiply equation 1 by 4.'],[mx('3(4x − 13y = 5) → 12x − 39y = 15'),'Multiply equation 2 by 3.'],[mx('−31y = 31 → y = −1'),'Add: x cancels. Then −3x − 2 = 4 → x = −2. Solution (−2, −1).']]}],
 mistake:{bad:'4(2x − 2y = −10) → 8x − 8y = −10',good:'8x − 8y = −40',why:'Multiply <b>both sides</b> — the constant too.'},
 practice(){
  let x,y,a1,b1,a2,b2,k;do{x=rand(-4,5);y=rand(-4,5);a2=pick([1,2,3,-1,-2]);b2=pick([1,-1,2,-2]);k=pick([2,3,4]);b1=-k*b2;a1=pick([1,2,3,4,5,-1,-3]);}while(a1+k*a2===0);
  const c1=a1*x+b1*y,c2=a2*x+b2*y,sa=a1+k*a2,sc=c1+k*c2;
  if(Math.random()<.35)return {type:'mc',q:`To eliminate y, what should you multiply the second equation by? ${sysH(eqAB(a1,b1,c1),eqAB(a2,b2,c2))}`,opts:shuffle([k,-k,b1,k+1].filter((v,i,ar)=>ar.indexOf(v)===i)).map(String),a:-1,why:`${fmtNeg(b2)}y × ${k} = ${fmtNeg(k*b2)}y, the opposite of ${fmtNeg(b1)}y.`,_k:k};
  return {q:`Solve: ${sysH(eqAB(a1,b1,c1),eqAB(a2,b2,c2))}`,fields:XY(x,y),hint:`Multiply the second equation by ${k} so the y-terms are opposites.`,
   sol:[[`${eqAB(k*a2,k*b2,k*c2)}`,`Multiply equation 2 by ${k}.`],[`${T(sa,'x')} = ${fmtNeg(sc)}`,'Add the equations.'],[`x = ${fmtNeg(x)}`,`Divide by ${fmtNeg(sa)}.`],[`y = ${fmtNeg(y)}`,'Back-substitute into either equation.']]};},
 check:[
  {q:'For 3x + 8y = 7 and 2x − 2y = −10, multiply equation 2 by what to eliminate y?',o:['2','4','−4','8'],a:1,why:'−2y × 4 = −8y, the opposite of +8y.'},
  {q:'When you multiply an equation by 3, you must multiply…',o:['only the x-term','only the left side','every term on both sides','only the constant'],a:2,why:'Keep the equation balanced: multiply everything.'},
  {q:'Solve 3x + 8y = 7 and 2x − 2y = −10.',o:['(−3, 2)','(3, −2)','(2, −3)','(−2, 3)'],a:0,why:'Multiply eq. 2 by 4, add: 11x = −33 → x = −3, y = 2.'}]
};
/* fix MC answer index for multiplier questions */
const _p4=L['1A-4-4'].practice;L['1A-4-4'].practice=function(){const p=_p4.call(this);if(p._k){p.a=p.opts.indexOf(String(p._k));}return p;};

L['1A-4-5']={
 goal:'I can create a system of linear equations from a real-world situation and solve it.',
 life:{title:'Pierre’s art supplies',html:'Last week Pierre bought <b>5 brushes and 6 tubes of paint for $43</b>. This week he bought <b>4 brushes and 12 tubes for $56</b>. Two receipts, two unknown prices → two equations.<br>Any time you have <b>two unknowns and two facts</b>, think “system”.'},
 see:[{title:'Receipts → equations → graph',hint:'Each receipt becomes one equation. Tap to see where the lines meet.',mount:mountReceipts}],
 vocab:[['Define the variables','Say what x and y mean first: x = cost of a brush, y = cost of a tube.'],['Model','The system of equations that matches the story.'],['Interpret','Answer in words with units: “A brush costs $5.”']],
 examples:[
  {title:'Example — Pierre',prob:'Find the cost of one brush and one tube of paint.',lines:[
   ['x = brush, y = paint','Step 1: Define the variables.',true],['5x + 6y = 43, 4x + 12y = 56','Step 2: One equation per receipt.'],[mx('−10x − 12y = −86'),'Step 3: Multiply the first equation by −2 to match 12y.'],[mx('−6x = −30 → x = 5'),'Add to the second equation.'],[mx('5(5) + 6y = 43 → y = 3'),'Back-substitute.'],['brush $5, paint $3','Step 4: Interpret.',true]]}],
 mistake:{bad:'x = 5 … so a tube of paint costs $5',good:'x is the BRUSH → a brush costs $5',why:'Always go back to how you <b>defined</b> each variable.'},
 practice(){
  const S2=pick([['adult tickets','child tickets'],['pizzas','salads'],['notebooks','pens'],['hot dogs','sodas']]);let p,q,a1,b1,a2,b2;
  do{p=rand(3,15);q=rand(1,9);a1=rand(1,6);b1=rand(1,6);a2=rand(1,6);b2=rand(1,6);}while(a1*b2-a2*b1===0||p===q);
  const t1=a1*p+b1*q,t2=a2*p+b2*q;
  return {q:`Order 1: <b>${a1} ${S2[0]}</b> and <b>${b1} ${S2[1]}</b> cost <b>$${t1}</b>. Order 2: <b>${a2} ${S2[0]}</b> and <b>${b2} ${S2[1]}</b> cost <b>$${t2}</b>. Find the price of each item.`,fields:[{label:`one of the ${S2[0]}: $`,answer:p},{label:`one of the ${S2[1]}: $`,answer:q}],hint:`Let x = price of ${S2[0]}, y = price of ${S2[1]}. Write ${a1}x + ${b1}y = ${t1} and ${a2}x + ${b2}y = ${t2}.`,
   sol:[[sysH(eqAB(a1,b1,t1),eqAB(a2,b2,t2)),'The model.',true],[`x = ${p}, y = ${q}`,'Solve by elimination or substitution.'],[`${S2[0]}: $${p}, ${S2[1]}: $${q}`,`Check: ${a1}(${p}) + ${b1}(${q}) = ${t1} ✓`,true]]};},
 check:[
  {q:'5 brushes and 6 tubes cost $43. With x = brush and y = tube, the equation is…',o:['6x + 5y = 43','5x + 6y = 43','11xy = 43','5x = 6y + 43'],a:1,why:'5 brushes × x + 6 tubes × y = $43.'},
  {q:'You solve and get x = 5, y = 3, where x = brush. What does a brush cost?',o:['$3','$5','$8','$15'],a:1,why:'x is defined as the cost of a brush.'},
  {q:'A system of two equations is useful when a story has…',o:['one unknown','two unknowns and two facts','no numbers','only one equation'],a:1,why:'Two unknowns need two equations.'}]
};

L['1A-4-6']={
 goal:'I can graph a system of linear inequalities and identify solutions in the overlapping region.',
 life:{title:'Two part-time jobs',html:'You tutor for <b>$15/h</b> and babysit for <b>$10/h</b>. You can work <b>at most 12 hours</b> a week, and you want to earn <b>at least $150</b>.<br>Each rule shades part of the graph. The schedules that satisfy <b>both</b> rules are where the shadings <b>overlap</b>.'},
 see:[{title:'Find the overlap',hint:'Blue = first inequality, orange = second. Purple = both. Tap to test points.',mount:mountSysIneq}],
 vocab:[['System of linear inequalities','Two or more inequalities graphed together.'],['Solution region','The overlap of all the shaded half-planes.'],['Boundary lines','Solid for ≤ / ≥, dashed for < / >.']],
 examples:[
  {title:'Example',prob:'Graph '+sysH('y ≤ 2x + 3','y > −x − 6')+'. Give two solutions and two non-solutions.',raw:true,lines:[
   ['y ≤ 2x + 3: solid line, shade below','Graph the first inequality.'],['y > −x − 6: dashed line, shade above','Graph the second inequality.'],['(0, 0) and (4, 6)','In the overlap → solutions.'],['(−4, 4) and (−6, −4)','Outside the overlap → not solutions.']]}],
 mistake:{bad:'A point in only one shaded region is a solution',good:'It must be in BOTH',why:'A solution of a system makes <b>every</b> inequality true.'},
 practice(){
  const m1=pick([-2,-1,1,2,3]),b1=rand(-3,3),s1=pick(SYM),m2=pick([-3,-1,1,2]),b2=rand(-3,3),s2=pick(SYM);const x=rand(-4,4),y=rand(-4,4);
  const ok=(m,b,s)=>{const r=m*x+b;return s==='<'?y<r:s==='≤'?y<=r:s==='>'?y>r:y>=r;};const r1=ok(m1,b1,s1),r2=ok(m2,b2,s2);
  const e1=`y ${s1} ${T(m1,'x')}${b1?S(b1):''}`,e2=`y ${s2} ${T(m2,'x')}${b2?S(b2):''}`;
  return {type:'mc',q:`Is <b>(${fmtNeg(x)}, ${fmtNeg(y)})</b> a solution of the system? ${sysH(e1,e2)}`,opts:['Yes — it satisfies both','No'],a:r1&&r2?0:1,why:`First: ${fmtNeg(y)} ${s1} ${fmtNeg(m1*x+b1)} is ${r1?'true':'false'}. Second: ${fmtNeg(y)} ${s2} ${fmtNeg(m2*x+b2)} is ${r2?'true':'false'}.`};},
 check:[
  {q:'Where are the solutions of a system of inequalities?',o:['On either boundary line','In the overlap of the shaded regions','Outside both regions','Only at the intersection point'],a:1,why:'They must satisfy every inequality.'},
  {q:'Is (0, 0) a solution of y ≤ 2x + 3 and y > −x − 6?',o:['Yes','No'],a:0,why:'0 ≤ 3 ✓ and 0 > −6 ✓.'},
  {q:'x + y ≤ 12 (hours) and 15x + 10y ≥ 150 (pay). Does 3 h tutoring + 3 h babysitting work?',o:['Yes','No — it earns only $75'],a:1,why:'15(3) + 10(3) = 75, which is less than 150.'}]
};
})();
