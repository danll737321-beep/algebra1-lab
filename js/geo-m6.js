/* Geometry · Module 6 · Analytic Geometry */
(function(){
const G8=o=>grid(Object.assign({x0:-8,x1:8,y0:-8,y1:8,u:24,lab:2},o||{}));
const ptFields=p=>[{label:'x =',answer:p[0]},{label:'y =',answer:p[1]}];
const sq=n=>Number.isInteger(Math.sqrt(n))?String(Math.sqrt(n)):`√${n} ≈ ${rd(Math.sqrt(n),2)}`;
const lineS=(m,b)=>{const ms=m===0?'':m===1?'x':m===-1?'−x':`${frac(Math.round(m*60),60)}x`;return `y = ${ms}${b===0?(m===0?'0':''):(ms?(b<0?' − '+fmtNeg(-b):' + '+fmtNeg(b)):fmtNeg(b))}`;};
function slopeFrac(dy,dx){return frac(dy,dx);}

function mountDist(el){
 el.innerHTML=`<div class="ctrl">${ctl('ax','A x',-7,7,-5)}${ctl('ay','A y',-7,7,-3)}${ctl('bx','B x',-7,7,4)}${ctl('by','B y',-7,7,5)}</div><div id="dg"></div><div class="readout" id="dr"></div>`;
 const draw=()=>{const [ax,ay,bx,by]=vals(el,['ax','ay','bx','by']);['ax','ay','bx','by'].forEach((i,j)=>$('#'+i+'v',el).textContent=[ax,ay,bx,by][j]);const G=G8(),M=midp([ax,ay],[bx,by]),dx=bx-ax,dy=by-ay;
  let s=gSeg(G,[ax,ay],[bx,ay],'#059669',3,'6 4')+gSeg(G,[bx,ay],[bx,by],'#7c3aed',3,'6 4')+gSeg(G,[ax,ay],[bx,by],'#2563eb',4)+gTxt(G,(ax+bx)/2,ay-0.8,`|Δx| = ${Math.abs(dx)}`,'#059669')+gTxt(G,bx+1.4,(ay+by)/2,`|Δy| = ${Math.abs(dy)}`,'#7c3aed');
  s+=gdot(G,ax,ay,'#2563eb',6,'A')+gdot(G,bx,by,'#2563eb',6,'B')+gdot(G,M[0],M[1],'#ea580c',7,'M');
  $('#dg',el).innerHTML=G.svg(s);
  $('#dr',el).innerHTML=`<b>Distance:</b> AB = √(Δx² + Δy²) = √(${dx*dx} + ${dy*dy}) = <b>${sq(dx*dx+dy*dy)}</b> (the Pythagorean Theorem on the dashed right triangle).<br><b>Midpoint:</b> M = ((${ax} + ${bx})/2, (${ay} + ${by})/2) = <b>${XYs(M)}</b> — the average of the coordinates.`;};
 onIn(el,['ax','ay','bx','by'],draw);draw();
}
function mountPart(el){
 const A=[-6,-4],B=[6,5];
 el.innerHTML=`<div class="ctrl">${ctl('pa','a',1,5,1)}${ctl('pb','b',1,5,2)}</div><div id="pg"></div><div class="readout" id="pr"></div>`;
 const draw=()=>{const [a,b]=vals(el,['pa','pb']);$('#pav',el).textContent=a;$('#pbv',el).textContent=b;const t=a/(a+b),Pp=[A[0]+t*(B[0]-A[0]),A[1]+t*(B[1]-A[1])],G=G8();let s=gSeg(G,A,B,'#2563eb',4);
  for(let i=1;i<a+b;i++){const q=[A[0]+i/(a+b)*(B[0]-A[0]),A[1]+i/(a+b)*(B[1]-A[1])];s+=gdot(G,q[0],q[1],'#9ca3af',3);}
  s+=gdot(G,A[0],A[1],'#2563eb',6,'A(−6, −4)')+gdot(G,B[0],B[1],'#2563eb',6,'B(6, 5)')+gdot(G,Pp[0],Pp[1],'#ea580c',8,'P');
  $('#pg',el).innerHTML=G.svg(s);
  $('#pr',el).innerHTML=`P divides AB in the ratio <b>${a} : ${b}</b> (from A). The segment is cut into ${a+b} equal parts; P is ${a} part${a>1?'s':''} from A, so P is <b>${a}/${a+b}</b> of the way.<br>P = A + ${a}/${a+b} · (B − A) = (−6 + ${a}/${a+b} · 12, −4 + ${a}/${a+b} · 9) = <b>${XYs([rd(Pp[0],2),rd(Pp[1],2)])}</b>.`;};
 onIn(el,['pa','pb'],draw);draw();
}
const SHAPES=[{n:'Right triangle',p:[[-5,-3],[3,-3],[3,3]]},{n:'Isosceles triangle',p:[[-4,-3],[4,-3],[0,4]]},{n:'Parallelogram',p:[[-6,-3],[2,-3],[5,3],[-3,3]]},{n:'Rhombus',p:[[0,-5],[3,-1],[0,3],[-3,-1]]},{n:'Rectangle',p:[[-5,-4],[3,-4],[3,2],[-5,2]]}];
function mountPoly(el){
 el.innerHTML=btns(SHAPES.map(s=>s.n))+`<div id="yg"></div><div class="readout" id="yr"></div>`;
 const draw=i=>{const S=SHAPES[i],G=G8(),n=S.p.length;let s=gPoly(G,S.p,{names:VN}),per=0,rows=[];
  for(let j=0;j<n;j++){const a=S.p[j],b=S.p[(j+1)%n],d2=(a[0]-b[0])**2+(a[1]-b[1])**2;per+=Math.sqrt(d2);rows.push(`${VN[j]}${VN[(j+1)%n]} = ${sq(d2)}`);s+=gTxt(G,(a[0]+b[0])/2,(a[1]+b[1])/2+0.3,rd(Math.sqrt(d2),2),'#ea580c',12);}
  const area=Math.abs(S.p.reduce((t,a,j)=>{const b=S.p[(j+1)%n];return t+a[0]*b[1]-b[0]*a[1];},0))/2;
  $('#yg',el).innerHTML=G.svg(s);$('#yr',el).innerHTML=`${rows.join(', ')}<br>Perimeter ≈ <b>${rd(per,2)}</b>. Area = <b>${area}</b> square units.<br>${['AB ⊥ BC (horizontal and vertical) → right angle at B.','AC = BC → isosceles.','Opposite sides equal: AB = CD, BC = DA.','All four sides equal → rhombus.','Opposite sides equal and all angles 90°.'][i]}`;selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountPerp(el){
 const M=[-3,-2,-1.5,-1,-0.5,-1/3,0,1/3,0.5,1,1.5,2,3];
 el.innerHTML=`<div class="ctrl">${ctl('sm','slope m',0,M.length-1,10)}</div><div class="eqline math" id="se"></div><div id="sg"></div><div class="readout" id="sr"></div>`;
 const draw=()=>{const m=M[+$('#sm',el).value];$('#smv',el).textContent=frac(Math.round(m*6),6);const G=G8();let s=gline(G,m,1,'',`stroke="#2563eb" stroke-width="3"`)+gline(G,m,-3,'',`stroke="#059669" stroke-width="3"`);
  if(m!==0){const pm=-1/m,x0=(1+3*0)/1;const ix=(0-1)/(m-pm);s+=gline(G,pm,0,'',`stroke="#ea580c" stroke-width="3" stroke-dasharray="8 5"`);}else s+=gSeg(G,[0,-8],[0,8],'#ea580c',3,'8 5');
  $('#sg',el).innerHTML=G.svg(s);const ps=m===0?'undefined (vertical)':frac(Math.round(-6/m),6);
  $('#se',el).innerHTML=`<span style="color:#2563eb">m = ${frac(Math.round(m*6),6)}</span> &nbsp; <span style="color:#059669">m = ${frac(Math.round(m*6),6)}</span> &nbsp; <span style="color:#ea580c">m⊥ = ${ps}</span>`;
  $('#sr',el).innerHTML=`Blue and green have the <b>same slope</b> → parallel (they never meet).<br>Orange is perpendicular: slope = <b>opposite reciprocal</b> of ${frac(Math.round(m*6),6)} = ${ps}.${m!==0?` Check: ${frac(Math.round(m*6),6)} × ${ps} = −1.`:' A horizontal line is perpendicular to a vertical line.'}`;};
 onIn(el,['sm'],draw);draw();
}
function mountWrite(el){
 el.innerHTML=`<div class="ctrl">${ctl('wm','given slope',-3,3,2)}${ctl('wx','point x',-5,5,2)}${ctl('wy','point y',-5,5,-1)}</div>`+btns(['parallel','perpendicular'],'data-t')+`<div id="wg"></div><div class="readout" id="wr"></div>`;let ty=0;
 const draw=()=>{let [m,px,py]=vals(el,['wm','wx','wy']);if(m===0&&ty===1)m=1;['wm','wx','wy'].forEach((i,j)=>$('#'+i+'v',el).textContent=[m,px,py][j]);const nm=ty?-1/m:m,b=py-nm*px,G=G8();
  $('#wg',el).innerHTML=G.svg(gline(G,m,3,'',`stroke="#9ca3af" stroke-width="3"`)+gline(G,nm,b,'',`stroke="#ea580c" stroke-width="3"`)+gdot(G,px,py,'#ea580c',7,`(${px}, ${py})`));
  $('#wr',el).innerHTML=`Given line (gray): y = ${m}x + 3. New line ${ty?'⊥':'∥'} through (${px}, ${py}).<br>1) slope: <b>${ty?`−1/${m} = ${frac(-1,m)}`:m}</b> &nbsp; 2) ${py} = ${frac(Math.round(nm*60),60)}(${px}) + b → b = <b>${frac(Math.round(b*60),60)}</b><br>3) <b>${lineS(nm,b)}</b>`;$$('[data-t]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.t===ty));};
 onIn(el,['wm','wx','wy'],draw);el.addEventListener('click',e=>{const x=e.target.closest('[data-t]');if(x){ty=+x.dataset.t;draw();}});draw();
}

L['GEO-6-1']={
 goal:'I can find the distance between two points and the midpoint of a segment on the coordinate plane.',
 life:{title:'As the crow flies',html:'A map app says your friend’s house is 3 blocks east and 4 blocks north. Walking takes 7 blocks, but a drone flies straight: √(3² + 4²) = 5 blocks. The halfway meeting spot is the midpoint.'},
 see:[{title:'Distance and midpoint',hint:'Move A and B. The dashed legs make a right triangle.',mount:mountDist}],
 vocab:[['Distance formula','d = √((x₂ − x₁)² + (y₂ − y₁)²) — the Pythagorean Theorem on the grid.'],['Midpoint formula','M = ((x₁ + x₂)/2, (y₁ + y₂)/2).'],['Missing endpoint','B = 2M − A (double the midpoint, subtract the known endpoint).']],
 examples:[
  {title:'Example 1 — Distance',prob:'Find the distance from A(−2, 1) to B(4, 9).',raw:true,lines:[['Δx = 6, Δy = 8','Subtract the coordinates.'],['d = √(36 + 64) = √100','Square, add.'],['d = 10','Square root.']]},
  {title:'Example 2 — Missing endpoint',prob:'M(3, −1) is the midpoint of AB with A(7, 4). Find B.',raw:true,lines:[['(7 + x)/2 = 3 → x = −1','Solve for each coordinate.'],['(4 + y)/2 = −1 → y = −6','Same for y.'],['B(−1, −6)','Check: average of A and B is (3, −1). ✓']]}],
 mistake:{bad:'d = √((x₂ − x₁) + (y₂ − y₁))',good:'Square each difference first',why:'The legs of the right triangle are Δx and Δy; the Pythagorean Theorem squares them before adding.'},
 practice(){const t=rand(0,2);
  if(t===0){const T=pick([[3,4],[6,8],[5,12],[8,6],[4,3],[0,7],[9,12]]),A=[rand(-6,3),rand(-6,3)],sx=pick([1,-1]),sy=pick([1,-1]),B=[A[0]+sx*T[0],A[1]+sy*T[1]];return {q:`Find the distance between A${XYs(A)} and B${XYs(B)}.`,fields:[{label:'d =',answer:Math.hypot(T[0],T[1])}],raw:true,hint:'d = √(Δx² + Δy²).',sol:[[`Δx = ${fmtNeg(B[0]-A[0])}, Δy = ${fmtNeg(B[1]-A[1])}`,'Differences.'],[`d = √(${T[0]**2} + ${T[1]**2}) = ${Math.hypot(T[0],T[1])}`,'Pythagorean Theorem.']]};}
  if(t===1){const A=[rand(-8,8),rand(-8,8)],B=[rand(-8,8),rand(-8,8)],M=midp(A,B);return {q:`Find the midpoint of A${XYs(A)} and B${XYs(B)}.`,fields:ptFields(M),raw:true,hint:'Average the x’s and the y’s.',sol:[[`M = ${XYs(M)}`,'((x₁ + x₂)/2, (y₁ + y₂)/2).']]};}
  const A=[rand(-6,6),rand(-6,6)],M=[rand(-5,5),rand(-5,5)],B=[2*M[0]-A[0],2*M[1]-A[1]];return {q:`M${XYs(M)} is the midpoint of AB, and A${XYs(A)}. Find B.`,fields:ptFields(B),raw:true,hint:'B = 2M − A.',sol:[[`x = 2(${fmtNeg(M[0])}) − ${P(A[0])} = ${fmtNeg(B[0])}`,'Double M, subtract A.'],[`y = 2(${fmtNeg(M[1])}) − ${P(A[1])} = ${fmtNeg(B[1])}`,'Same for y.']]};},
 check:[
  {q:'Distance from (1, 1) to (4, 5)?',o:['5','7','25','√7'],a:0,why:'√(9 + 16) = 5.'},
  {q:'Midpoint of (−4, 6) and (2, 0)?',o:['(−1, 3)','(−2, 6)','(3, −3)','(−1, 6)'],a:0,why:'(−2/2, 6/2).'},
  {q:'The distance formula comes from…',o:['the slope formula','the Pythagorean Theorem','the midpoint formula','area'],a:1,why:'Δx and Δy are the legs.'}]
};

L['GEO-6-2']={
 goal:'I can find the point that divides a segment in a given ratio.',
 life:{title:'Road trip stops',html:'You drive from home to grandma’s and want to stop for gas 2/3 of the way there. On a coordinate map, that stop is the point dividing the route in a 2 : 1 ratio.'},
 see:[{title:'Divide a segment a : b',hint:'Change a and b. Gray dots mark the equal parts.',mount:mountPart}],
 vocab:[['Ratio a : b','From A, P is a parts along and b parts remain.'],['Fraction of the way','t = a/(a + b).'],['Formula','P = (x₁ + t(x₂ − x₁), y₁ + t(y₂ − y₁)).'],['Midpoint','The special case 1 : 1 (t = 1/2).']],
 examples:[
  {title:'Example 1 — Ratio 1 : 3',prob:'A(2, 1), B(10, 9). Find P dividing AB in the ratio 1 : 3.',raw:true,lines:[['t = 1/(1 + 3) = 1/4','Fraction of the way from A.'],['B − A = (8, 8)','Full change.'],['P = (2 + 2, 1 + 2) = (4, 3)','Add 1/4 of the change to A.']]},
  {title:'Example 2 — Ratio 2 : 1',prob:'A(−3, 6), B(6, −3). Ratio 2 : 1.',raw:true,lines:[['t = 2/3','Two of three parts.'],['B − A = (9, −9)','Change.'],['P = (−3 + 6, 6 − 6) = (3, 0)','Add 2/3 of the change.']]}],
 mistake:{bad:'Ratio 1 : 3 means 1/3 of the way',good:'1 : 3 means 1/4 of the way',why:'A ratio compares the two pieces. 1 : 3 cuts the segment into 1 + 3 = 4 equal parts, and P is 1 part from A.'},
 practice(){const a=rand(1,4),b=rand(1,4),n=a+b,A=[rand(-6,2),rand(-6,2)],dx=n*rand(-2,2)||n,dy=n*rand(-2,2)||-n,B=[A[0]+dx,A[1]+dy],Pp=[A[0]+a*dx/n,A[1]+a*dy/n];
  return {q:`Find point P on the segment from A${XYs(A)} to B${XYs(B)} that divides it in the ratio <b>${a} : ${b}</b> (from A).`,fields:ptFields(Pp),raw:true,hint:`P is ${a}/${n} of the way from A to B.`,sol:[[`t = ${a}/${n}`,'Fraction of the way.'],[`B − A = ${XYs([dx,dy])}`,'Change.'],[`P = ${XYs(A)} + ${a}/${n}·${XYs([dx,dy])} = ${XYs(Pp)}`,'Add.']]};},
 check:[
  {q:'Ratio 3 : 2 from A means P is what fraction of the way?',o:['3/2','2/3','3/5','2/5'],a:2,why:'3 of 5 parts.'},
  {q:'A(0, 0), B(10, 0), ratio 1 : 4. P = ?',o:['(2, 0)','(2.5, 0)','(4, 0)','(8, 0)'],a:0,why:'1/5 × 10 = 2.'},
  {q:'The midpoint divides a segment in the ratio…',o:['1 : 2','1 : 1','2 : 1','0 : 1'],a:1,why:'Two equal parts.'}]
};

L['GEO-6-3']={
 goal:'I can use distance and slope to find perimeters and areas and to classify figures on the coordinate plane.',
 life:{title:'Fencing a garden on a grid',html:'A community garden plot is drawn on graph paper with corners at grid points. To buy fence you need the perimeter; to buy soil you need the area. The distance formula handles the slanted sides.'},
 see:[{title:'Shapes on the grid',hint:'Tap a shape to see side lengths, perimeter, and area.',mount:mountPoly}],
 vocab:[['Perimeter','Sum of the side lengths (use the distance formula for slanted sides).'],['Area of a rectangle / triangle','base × height; ½ × base × height (use horizontal/vertical sides when possible).'],['Classify by sides','Equal sides → isosceles, rhombus, square.'],['Classify by slopes','Equal slopes → parallel; product −1 → perpendicular (right angle).']],
 examples:[
  {title:'Example 1 — Perimeter',prob:'Triangle A(0, 0), B(6, 0), C(6, 8). Perimeter?',raw:true,lines:[['AB = 6, BC = 8','Horizontal and vertical sides: count.'],['AC = √(36 + 64) = 10','Distance formula.'],['P = 6 + 8 + 10 = 24','Add.']]},
  {title:'Example 2 — Right triangle?',prob:'P(1, 2), Q(4, 6), R(8, 3). Is ∠Q a right angle?',raw:true,lines:[['slope PQ = 4/3','Rise over run.'],['slope QR = −3/4','Rise over run.'],['4/3 × (−3/4) = −1 → yes','Perpendicular sides.']]}],
 mistake:{bad:'Count grid squares along a slanted side',good:'Use the distance formula',why:'A diagonal side crossing 3 squares right and 4 up is 5 units long, not 7.'},
 practice(){const t=rand(0,2);
  if(t===0){const T=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17]]),A=[rand(-7,-2),rand(-7,-2)];return {q:`Find the perimeter of the triangle A${XYs(A)}, B${XYs([A[0]+T[0],A[1]])}, C${XYs([A[0]+T[0],A[1]+T[1]])}.`,fields:[{label:'perimeter =',answer:T[0]+T[1]+T[2]}],raw:true,hint:'Two sides are horizontal/vertical; use the distance formula for AC.',sol:[[`AB = ${T[0]}, BC = ${T[1]}`,'Count.'],[`AC = ${T[2]}`,'Distance formula.'],[`P = ${T[0]+T[1]+T[2]}`,'Add.']]};}
  if(t===1){const w=rand(2,8),h=rand(2,8),A=[rand(-7,0),rand(-7,0)];return {q:`Find the area of the rectangle with vertices ${XYs(A)}, ${XYs([A[0]+w,A[1]])}, ${XYs([A[0]+w,A[1]+h])}, ${XYs([A[0],A[1]+h])}.`,fields:[{label:'area =',answer:w*h}],raw:true,hint:'Length × width.',sol:[[`${w} × ${h} = ${w*h}`,'Area.']]};}
  const Q=[rand(-3,3),rand(-3,3)],a=rand(1,4),b=rand(1,4),right=Math.random()<.5,Pp=[Q[0]-a,Q[1]-b],R=right?[Q[0]+b*2,Q[1]-a*2]:[Q[0]+b*2,Q[1]-a*2+pick([1,2])];const m=mcU(right?'yes':'no',['yes','no']);
  return {type:'mc',q:`P${XYs(Pp)}, Q${XYs(Q)}, R${XYs(R)}. Is ∠Q a right angle?`,opts:m.opts,a:m.a,why:`slope QP = ${frac(b,a)}, slope QR = ${frac(R[1]-Q[1],R[0]-Q[0])}. Product ${right?'= −1 → perpendicular':'≠ −1 → not perpendicular'}.`};},
 check:[
  {q:'Rectangle with corners (0, 0), (5, 0), (5, 3), (0, 3). Perimeter?',o:['15','16','8','30'],a:1,why:'2(5 + 3) = 16.'},
  {q:'Two sides have slopes 2 and −1/2. The angle between them is…',o:['acute','right','obtuse','straight'],a:1,why:'2 × (−1/2) = −1.'},
  {q:'A quadrilateral has four equal sides. It must be a…',o:['rectangle','rhombus','trapezoid','kite only'],a:1,why:'Four equal sides → rhombus.'}]
};

L['GEO-6-4']={
 goal:'I can decide whether two lines are parallel, perpendicular, or neither from their slopes.',
 life:{title:'City street grids',html:'In many cities, avenues run parallel to each other and streets cross them at right angles. On a coordinate map, parallel avenues have the same slope; a cross street has the opposite reciprocal slope.'},
 see:[{title:'Same slope vs. opposite reciprocal',hint:'Change the slope. Blue ∥ green; orange ⊥ both.',mount:mountPerp}],
 vocab:[['Slope','m = (y₂ − y₁)/(x₂ − x₁) = rise/run.'],['Parallel lines','Same slope, different y-intercepts.'],['Perpendicular lines','Slopes multiply to −1: m₂ = −1/m₁.'],['Special case','Horizontal (m = 0) ⊥ vertical (undefined slope).']],
 examples:[
  {title:'Example 1 — From equations',prob:'y = 3x − 2 and 6x − 2y = 8. Parallel, perpendicular, or neither?',raw:true,lines:[['2y = 6x − 8 → y = 3x − 4','Solve for y.'],['both slopes 3','Same slope.'],['parallel','Different intercepts.']]},
  {title:'Example 2 — From points',prob:'Line 1 through (0, 1) and (2, 5). Line 2 through (−1, 3) and (3, 1).',raw:true,lines:[['m₁ = 4/2 = 2','Slope.'],['m₂ = −2/4 = −1/2','Slope.'],['2 × (−1/2) = −1 → perpendicular','Opposite reciprocals.']]}],
 mistake:{bad:'Perpendicular to slope 3 is slope −3',good:'Slope −1/3',why:'Flip <b>and</b> change the sign: the opposite reciprocal. Check: 3 × (−1/3) = −1.'},
 practice(){const t=rand(0,1);const S=[[2,1],[1,3],[-3,2],[3,4],[-1,2],[5,1],[-2,1],[1,1]];const [n,d]=pick(S),m=n/d;
  if(t===0){return {q:`A line has slope ${frac(n,d)}. What is the slope of a line perpendicular to it? (A fraction like −2/3 is fine.)`,fields:[{label:'m⊥ =',answer:-d/n,tol:0.006}],raw:true,hint:'Opposite reciprocal: flip and change the sign.',sol:[[`m⊥ = ${frac(-d,n)}`,'Product is −1.']]};}
  const k=rand(0,2),m2s=[frac(n,d),frac(-d,n),frac(2*n+d,d)][k],ans=['parallel','perpendicular','neither'][k],b1=rand(-5,5),b2=b1+rand(1,4);const opts=mcU(ans,['parallel','perpendicular','neither','the same line']);
  return {type:'mc',q:`Line 1: y = ${frac(n,d)}x ${b1<0?'− '+(-b1):'+ '+b1}. Line 2: y = ${m2s}x ${b2<0?'− '+(-b2):'+ '+b2}. These lines are…`,opts:opts.opts,a:opts.a,why:`Slopes ${frac(n,d)} and ${m2s}: ${ans}.`};},
 check:[
  {q:'Slopes 4 and −1/4. The lines are…',o:['parallel','perpendicular','neither','the same'],a:1,why:'4 × (−1/4) = −1.'},
  {q:'Which is parallel to y = −2x + 7?',o:['y = 2x + 7','y = −2x − 1','y = ½x','y = −½x + 7'],a:1,why:'Same slope −2.'},
  {q:'A line perpendicular to a horizontal line is…',o:['horizontal','vertical','slope 1','slope −1'],a:1,why:'Horizontal ⊥ vertical.'}]
};

L['GEO-6-5']={
 goal:'I can write the equation of a line parallel or perpendicular to a given line through a given point.',
 life:{title:'Planning a new bike path',html:'The city wants a bike path that runs parallel to Main Street and passes the library at (2, −1), and a footbridge perpendicular to Main Street. Each needs an equation on the city’s coordinate map.'},
 see:[{title:'Build the new line',hint:'Choose parallel or perpendicular, then move the point.',mount:mountWrite}],
 vocab:[['Point-slope form','y − y₁ = m(x − x₁).'],['Slope-intercept form','y = mx + b.'],['Recipe','1) find the new slope, 2) substitute the point to find b, 3) write the equation.'],['Check','Plug the point into your equation — it must make it true.']],
 examples:[
  {title:'Example 1 — Parallel',prob:'Parallel to y = 3x + 1 through (2, 5).',raw:true,lines:[['m = 3','Parallel → same slope.'],['5 = 3(2) + b → b = −1','Substitute the point.'],['y = 3x − 1','Equation.']]},
  {title:'Example 2 — Perpendicular',prob:'Perpendicular to y = 2x − 4 through (4, 1).',raw:true,lines:[['m = −1/2','Opposite reciprocal of 2.'],['1 = −½(4) + b → b = 3','Substitute.'],['y = −½x + 3','Equation.']]}],
 mistake:{bad:'Parallel line: keep the same b too',good:'Same slope, new b',why:'Keeping the same b gives the <b>same</b> line, not a parallel one. Find the new b from the given point.'},
 practice(){const per=Math.random()<.5,[n,d]=pick([[1,1],[2,1],[3,1],[-1,1],[-2,1],[1,2],[-1,2],[2,3]]),m=n/d,nm=per?-d/n:m,x=rand(-4,4)*(per?Math.abs(n):d),y=rand(-6,6),b=y-nm*x,b0=rand(-5,5);
  return {q:`Write the equation of the line <b>${per?'perpendicular':'parallel'}</b> to y = ${frac(n,d)}x ${b0<0?'− '+(-b0):'+ '+b0} through (${fmtNeg(x)}, ${fmtNeg(y)}). Give m and b in y = mx + b.`,fields:[{label:'m =',answer:nm,tol:0.006},{label:'b =',answer:b,tol:0.006}],raw:true,hint:per?'Opposite reciprocal slope, then substitute the point.':'Same slope, then substitute the point.',sol:[[`m = ${frac(per?-d:n,per?n:d)}`,per?'Opposite reciprocal.':'Same slope.'],[`${fmtNeg(y)} = ${frac(per?-d:n,per?n:d)}(${fmtNeg(x)}) + b → b = ${fmtNeg(rd(b,4))}`,'Substitute.']]};},
 check:[
  {q:'Parallel to y = −x + 4 through (0, 2)?',o:['y = −x + 2','y = x + 2','y = −x + 4','y = x − 2'],a:0,why:'Slope −1, intercept 2.'},
  {q:'Perpendicular to y = 3x through the origin?',o:['y = −3x','y = −⅓x','y = ⅓x','y = 3x + 1'],a:1,why:'Opposite reciprocal of 3.'},
  {q:'Line with slope 2 through (1, 5). b = ?',o:['3','5','7','−3'],a:0,why:'5 = 2 + b.'}]
};
})();
