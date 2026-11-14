/* Pre-Calculus · Unit 6 · Matrices */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,graphLab,chooser,curve,hline,vline,hole,ps,pmul,cs,circleFig}=A2;const C=PC,PI=Math.PI;const {stepper}=KA;const M=C.mat;
const AUG=(R)=>`<div style="text-align:center">${M(R.map(r=>r.slice(0,3).concat(['|',r[3]])))}</div>`;
function mElim(el){stepper(el,[{t:'x + y + z = 6 · 2x − y + z = 3 · x + 2y − z = 2',steps:[
 {h:AUG([[1,1,1,6],[2,-1,1,3],[1,2,-1,2]]),n:'Write the augmented matrix: coefficients | constants.'},
 {h:AUG([[1,1,1,6],[0,-3,-1,-9],[1,2,-1,2]]),n:'R₂ → R₂ − 2R₁ (eliminate x from row 2).'},
 {h:AUG([[1,1,1,6],[0,-3,-1,-9],[0,1,-2,-4]]),n:'R₃ → R₃ − R₁ (eliminate x from row 3).'},
 {h:AUG([[1,1,1,6],[0,1,-2,-4],[0,-3,-1,-9]]),n:'Swap R₂ and R₃ so the pivot is 1.'},
 {h:AUG([[1,1,1,6],[0,1,-2,-4],[0,0,-7,-21]]),n:'R₃ → R₃ + 3R₂. Row-echelon form: a staircase of zeros.'},
 {h:`<div class="eqline math">z = 3 → y = −4 + 2(3) = 2 → x = 6 − 2 − 3 = 1</div>`,n:'Back-substitute from the bottom up. Solution (1, 2, 3) — one point where three planes meet.'}]}]);}
function mOps(el){sliders(el,[{k:'a',l:'a',min:-3,max:3,v:2},{k:'b',l:'b',min:-3,max:3,v:1},{k:'c',l:'c',min:-3,max:3,v:0},{k:'d',l:'d',min:-3,max:3,v:1}],V=>{const A=[[V.a,V.b],[V.c,V.d]],B=[[1,2],[3,-1]];const AB=C.mmul(A,B),BA=C.mmul(B,A);const same=JSON.stringify(AB)===JSON.stringify(BA);
  $('.mo-r',el).innerHTML=`<div style="text-align:center;font-size:1.1em">A = ${M(A)} &nbsp; B = ${M(B)}</div><div style="text-align:center;margin:8px 0">A + B = ${M(A.map((r,i)=>r.map((v,j)=>v+B[i][j])))} &nbsp; 2A = ${M(A.map(r=>r.map(v=>2*v)))}</div><div style="text-align:center">AB = ${M(AB)} &nbsp; BA = ${M(BA)}</div><p>${same?'<span class="good">AB = BA for this A — that is unusual.</span>':'<b>AB ≠ BA</b>: matrix multiplication is not commutative.'} <span class="mute">Entry (i, j) of AB = row i of A · column j of B. Top-left of AB: ${V.a}·1 + ${V.b}·3 = ${AB[0][0]}.</span></p>`;},`<div class="mo-r"></div>`).run();}
function mDet(el){sliders(el,[{k:'a',l:'a',min:-3,max:3,step:.5,v:2},{k:'b',l:'b',min:-3,max:3,step:.5,v:1},{k:'c',l:'c',min:-3,max:3,step:.5,v:0.5},{k:'d',l:'d',min:-3,max:3,step:.5,v:1.5}],V=>{const G=grid({x0:-5,x1:5,y0:-5,y1:5,u:32,lab:1,laby:1});const A=[[V.a,V.b],[V.c,V.d]],D=C.det2(A);const T=p=>[V.a*p[0]+V.b*p[1],V.c*p[0]+V.d*p[1]];const sq=[[0,0],[1,0],[1,1],[0,1]];
  const poly=(P,f,st)=>`<polygon points="${P.map(p=>G.X(p[0])+','+G.Y(p[1])).join(' ')}" fill="${f}" stroke="${st}" stroke-width="2.5"/>`;
  let s=poly(sq,'rgba(148,163,184,.25)','#94a3b8')+poly(sq.map(T),D<0?'rgba(225,29,72,.22)':'rgba(37,99,235,.22)',D<0?'#e11d48':'#2563eb')+C.arrow(G,[0,0],T([1,0]),'#059669',3,'col 1')+C.arrow(G,[0,0],T([0,1]),'#f59e0b',3,'col 2');
  $('.dt-g',el).innerHTML=G.svg(s);$('.dt-r',el).innerHTML=`A = ${M(A)} sends the gray unit square to the colored parallelogram. det A = ad − bc = <b>${nf(D)}</b> = signed area${D<0?' (negative: orientation flipped)':''}.<br>${Math.abs(D)<1e-9?'<span class="bad">det = 0: the square collapses to a line — A has <b>no inverse</b>.</span>':`A⁻¹ = (1/${nf(D)})${M([[V.d,-V.b],[-V.c,V.a]])} = ${M([[V.d/D,-V.b/D],[-V.c/D,V.a/D]].map(r=>r.map(v=>nf(v))))} undoes the transformation.`}`;},`<div class="dt-g"></div><div class="readout dt-r"></div>`).run();}
const SYS=[{eq:['2x + 3y = 7','x − 4y = −2'],A:[[2,3,7],[1,-4,-2]],v:['x','y']},{eq:['x + y + z = 6','2x − y + 3z = 9','−x + 4y − z = 4'],A:[[1,1,1,6],[2,-1,3,9],[-1,4,-1,4]],v:['x','y','z']},{eq:['5x − 2z = 1','y + z = 3','x + 2y = 0'],A:[[5,0,-2,1],[0,1,1,3],[1,2,0,0]],v:['x','y','z']}];
function mAug(el){let k=0;el.innerHTML=`<div class="row">${SYS.map((S,i)=>`<button data-k="${i}">System ${i+1}</button>`).join('')}</div><div class="ag-s"></div>`;
 const sp=()=>{const S=SYS[k],m=S.A.length,n=S.A[0].length;el.querySelector('.ag-s').innerHTML=`<div class="ctrl"><label>row i <input type="range" data-s="i" min="1" max="${m}" value="1"><b data-o="i">1</b></label><label>column j <input type="range" data-s="j" min="1" max="${n}" value="1"><b data-o="j">1</b></label></div><div class="ag-b"></div>`;draw();};
 const draw=()=>{const S=SYS[k],m=S.A.length,n=S.A[0].length;const i=+$('[data-s="i"]',el).value,j=+$('[data-s="j"]',el).value;$('[data-o="i"]',el).textContent=i;$('[data-o="j"]',el).textContent=j;
  const cols=['#dbeafe','#dcfce7','#fef3c7','#fce7f3'];
  const tbl=`<table class="t" style="margin:8px auto"><tr><th></th>${S.v.map((v,c)=>`<th style="background:${cols[c]}">${v}</th>`).join('')}<th>const</th></tr>${S.A.map((r,ri)=>`<tr><th>R${ri+1}</th>${r.map((x,c)=>`<td style="font-weight:800;${c===n-1?'border-left:3px solid #1f2937;':''}background:${ri+1===i&&c+1===j?'#fca5a5':c<n-1?cols[c]:'#f8fafc'}">${fmtNeg(x)}</td>`).join('')}</tr>`).join('')}</table>`;
  $('.ag-b',el).innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:center"><div class="card" style="margin:0">${S.eq.map(e=>`<div class="math">${mx(e)}</div>`).join('')}</div><div>${tbl}</div></div><div class="readout">This augmented matrix has <b>${m} rows</b> and <b>${n} columns</b>: dimensions ${m} × ${n}. Entry a<sub>${i}${j}</sub> (row ${i}, column ${j}) = <b>${fmtNeg(S.A[i-1][j-1])}</b>${j===n?' — a constant from the right side.':` — the coefficient of ${S.v[j-1]} in equation ${i}.`}${S.A.some(r=>r.slice(0,-1).some(x=>!x))?' <span class="mute">A missing variable gets a 0.</span>':''}</div>`;};
 el.addEventListener('input',e=>{if(e.target.dataset.s)draw();});
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;k=+b.dataset.k;$$('[data-k]',el).forEach(x=>x.classList.toggle('sel',x===b));sp();});$('[data-k]',el).classList.add('sel');sp();}
const TR=[{t:'Rotate 90°',A:[[0,-1],[1,0]]},{t:'Reflect over y-axis',A:[[-1,0],[0,1]]},{t:'Reflect over y = x',A:[[0,1],[1,0]]},{t:'Scale ×2, ×0.5',A:[[2,0],[0,0.5]]},{t:'Shear',A:[[1,1],[0,1]]},{t:'Rotate 45°',A:[[0.707,-0.707],[0.707,0.707]]}];
function mTransform(el){const F=[[0,0],[0,3],[2,3],[2,2.4],[0.6,2.4],[0.6,1.8],[1.6,1.8],[1.6,1.2],[0.6,1.2],[0.6,0]];
 chooser(el,TR.map(T=>({t:T.t,html:()=>{const G=grid({x0:-4,x1:4,y0:-4,y1:4,u:36,lab:1,laby:1});const A=T.A,f=p=>[A[0][0]*p[0]+A[0][1]*p[1],A[1][0]*p[0]+A[1][1]*p[1]];
  const poly=(P,fill,st)=>`<polygon points="${P.map(p=>G.X(p[0])+','+G.Y(p[1])).join(' ')}" fill="${fill}" stroke="${st}" stroke-width="2"/>`;
  const s=poly(F,'rgba(148,163,184,.3)','#94a3b8')+poly(F.map(f),'rgba(37,99,235,.3)','#2563eb')+C.arrow(G,[0,0],f([1,0]),'#059669',3,'A·i')+C.arrow(G,[0,0],f([0,1]),'#f59e0b',3,'A·j');
  return G.svg(s)+`<div class="readout">A = ${M(A)}<br>Column 1 ${M([[A[0][0]],[A[1][0]]])} is where <b>i = (1, 0)</b> lands (green). Column 2 ${M([[A[0][1]],[A[1][1]]])} is where <b>j = (0, 1)</b> lands (orange). Every other point follows: A·(x, y) = x·(col 1) + y·(col 2).</div>`;}})));}
function mSolveInv(el){sliders(el,[{k:'b1',l:'right side b₁',min:-6,max:10,v:5},{k:'b2',l:'right side b₂',min:-6,max:10,v:5}],V=>{const A=[[2,1],[1,3]],D=5,inv=[[3/5,-1/5],[-1/5,2/5]];const x=inv[0][0]*V.b1+inv[0][1]*V.b2,y=inv[1][0]*V.b1+inv[1][1]*V.b2;
  const G=grid({x0:-4,x1:6,y0:-4,y1:6,u:30,lab:2,laby:2});let s=curve(G,t=>V.b1-2*t,'#2563eb',3)+curve(G,t=>(V.b2-t)/3,'#059669',3)+gdot(G,x,y,'#e11d48',7,`(${nf(x)}, ${nf(y)})`);
  $('.si-g',el).innerHTML=G.svg(s);
  $('.si-r',el).innerHTML=`<span style="color:#2563eb">2x + y = ${V.b1}</span>, <span style="color:#059669">x + 3y = ${V.b2}</span> → A = ${M(A)}, det A = ${D}<br>A⁻¹ = (1/5)${M([[3,-1],[-1,2]])} — computed <b>once</b>.<br>X = A⁻¹B = A⁻¹${M([[V.b1],[V.b2]])} = ${M([[nf(x)],[nf(y)]])}: the red intersection point.<br><span class="mute">Change B and the same A⁻¹ instantly solves the new system.</span>`;},`<div class="si-g"></div><div class="readout si-r"></div>`).run();}

L['PC-6-1']={goal:'I can describe a matrix by its dimensions and entries and write a linear system as an augmented matrix.',
 life:{title:'Spreadsheets',html:'A spreadsheet of game scores — players as rows, games as columns — is a <b>matrix</b>. Writing a system of equations as a matrix strips away the x’s and y’s so a computer (or you) can work only with the numbers.'},
 see:[{title:'System → augmented matrix',hint:'Pick a system. Move the row and column sliders to read any entry.',mount:mAug}],
 vocab:[['Matrix','A rectangular array of numbers.'],['Dimensions m × n','m rows by n columns (rows first).'],['Entry aᵢⱼ','The number in row i, column j.'],['Augmented matrix','Coefficients of a system with the constants added as a last column.'],['Square matrix','Same number of rows and columns.']],
 examples:[ex('Example 1','Write the augmented matrix for 3x − y = 4, x + 2y = −1.',[['row 1: [3, −1 | 4]','Coefficients, then constant.'],['row 2: [1, 2 | −1]',''],['dimensions 2 × 3','2 rows, 3 columns.']]),
  ex('Example 2','Which system does [1, 0, 2 | 5 ; 0, 1, −1 | 3 ; 0, 0, 1 | 4] represent?',[['x + 2z = 5',''],['y − z = 3',''],['z = 4','Back-substitute: x = −3, y = 7.']])],
 mistake:{bad:'a 2 × 3 matrix has 2 columns',good:'2 rows and 3 columns',why:'Dimensions are always <b>rows × columns</b> — like reading a table row by row.'},
 practice(){const m=rand(2,4),n=rand(2,4);const A=Array.from({length:m},()=>Array.from({length:n},()=>rand(-9,9)));const i=rand(1,m),j=rand(1,n);
  return num(`A = ${M(A)}. Give the number of rows, the number of columns, and the entry a<sub>${i}${j}</sub>.`,[['rows =',m],['columns =',n],[`a${i}${j} =`,A[i-1][j-1]]],'Rows go across, columns go down. aᵢⱼ: row i first, then column j.',[[`${m} × ${n}`,'Rows × columns.'],[`a${i}${j} = ${fmtNeg(A[i-1][j-1])}`,`Row ${i}, column ${j}.`]]);},
 check:[q('A 3 × 2 matrix has…',['3 columns, 2 rows','3 rows, 2 columns','6 rows','5 entries'],1,''),q('The augmented matrix of x − y = 2, 4x = 8 is…',['[1, −1 | 2 ; 4, 0 | 8]','[1, −1 | 2 ; 4 | 8]','[1, 1 | 2 ; 4, 0 | 8]','[2, 1, −1 ; 8, 4, 0]'],0,'Missing y → 0.'),q('In [[5, 7], [2, 9]], a₂₁ =',['7','2','9','5'],1,'')]};

L['PC-6-2']={goal:'I can solve a system of three linear equations by elimination and row operations.',
 life:{title:'Mixing three ingredients',html:'A café blends three coffees to hit a target weight, cost, and caffeine level. Three unknowns, three conditions: a 3 × 3 system. Each equation is a plane; the solution is where all three planes meet.'},
 see:[{title:'Gaussian elimination',hint:'Step through the row operations.',mount:mElim}],
 vocab:[['Augmented matrix','Coefficients and constants in one array.'],['Row operations','Swap rows, multiply a row by a nonzero number, add a multiple of one row to another.'],['Row-echelon form','Zeros below each leading entry (a staircase).'],['Back-substitution','Solve the last equation, then work upward.']],
 examples:[ex('Example','x + y = 5, y + z = 7, x + z = 6',[['add all: 2(x + y + z) = 18','A shortcut for this symmetric system.'],['x + y + z = 9',''],['z = 4, x = 2, y = 3','Subtract each equation.']])],
 mistake:{bad:'A row of 0 0 0 | 5 means z = 5',good:'0 = 5 is impossible → no solution',why:'A row of zeros with a nonzero constant means the system is <b>inconsistent</b>. A row 0 0 0 | 0 means infinitely many solutions.'},
 practice(){const x=rand(-4,4),y=rand(-4,4),z=rand(-4,4);const A=[[1,1,1],[1,-1,2],[2,1,-1]];const b=A.map(r=>r[0]*x+r[1]*y+r[2]*z);
  return num(`Solve: x + y + z = ${b[0]}, x − y + 2z = ${b[1]}, 2x + y − z = ${b[2]}.`,[['x =',x],['y =',y],['z =',z]],'Eliminate x from equations 2 and 3 using equation 1, then solve the 2 × 2 system.',[[`R₂ − R₁: −2y + z = ${b[1]-b[0]}`,''],[`R₃ − 2R₁: −y − 3z = ${b[2]-2*b[0]}`,''],[`(x, y, z) = (${x}, ${y}, ${z})`,'Solve and back-substitute.']]);},
 check:[q('Which is NOT a row operation?',['swap two rows','multiply a row by 3','add 2 to every entry of a row','add R₁ to R₂'],2,''),q('A final row [0 0 0 | 0] means…',['no solution','one solution','infinitely many solutions','z = 0'],2,''),q('A 3-variable linear equation graphs as a…',['line','plane','circle','point'],1,'')]};
L['PC-6-3']={goal:'I can add, scale, and multiply matrices and know when a product is defined.',
 life:{title:'Store inventory',html:'A matrix of item counts at three stores times a column of prices gives the total value at each store in one multiplication. Spreadsheets, graphics, and AI all run on matrix multiplication.'},
 see:[{title:'Matrix operations',hint:'Change the entries of A. Compare AB and BA.',mount:mOps}],
 vocab:[['Dimensions','m × n: m rows, n columns.'],['Product defined','(m × n)(n × p) → m × p; inner numbers must match.'],['Entry of AB','Row i of A · column j of B.'],['Identity I','AI = IA = A.']],
 examples:[ex('Example','A = [[1, 2], [0, 3]], B = [[4], [−1]]. Find AB.',[['2 × 2 times 2 × 1 → 2 × 1','Defined.'],['row 1: 1·4 + 2·(−1) = 2',''],['row 2: 0·4 + 3·(−1) = −3','AB = [[2], [−3]].']])],
 mistake:{bad:'Multiply matching entries: [[a, b], [c, d]]·[[e, f], [g, h]] = [[ae, bf], [cg, dh]]',good:'row times column',why:'Each entry combines a whole <b>row</b> with a whole <b>column</b>.'},
 practice(){const A=[[nz(-4,4),rand(-4,4)],[rand(-4,4),nz(-4,4)]],B=[[rand(-4,4),rand(-4,4)],[rand(-4,4),rand(-4,4)]];const Pm=C.mmul(A,B);
  return num(`A = ${M(A)}, B = ${M(B)}. Find the top row of AB.`,[['(AB)₁₁ =',Pm[0][0]],['(AB)₁₂ =',Pm[0][1]]],'Row 1 of A times column 1, then column 2, of B.',[[`${A[0][0]}·${P(B[0][0])} + ${A[0][1]}·${P(B[1][0])} = ${Pm[0][0]}`,'Entry (1, 1).'],[`${A[0][0]}·${P(B[0][1])} + ${A[0][1]}·${P(B[1][1])} = ${Pm[0][1]}`,'Entry (1, 2).']]);},
 check:[q('A is 2 × 3, B is 3 × 4. AB is…',['3 × 3','2 × 4','not defined','4 × 2'],1,''),q('A is 2 × 3, B is 2 × 3. AB is…',['2 × 3','3 × 2','not defined','2 × 2'],2,''),q('In general AB and BA are…',['always equal','not always equal','both undefined','transposes'],1,'')]};

L['PC-6-4']={goal:'I can see a 2 × 2 matrix as a transformation of the plane and find the image of a point.',
 life:{title:'Video-game graphics',html:'Every time a game character turns or a phone photo rotates, the computer multiplies thousands of points by a small matrix. A <b>matrix is a transformation</b>: its columns tell you where the basic unit arrows go.'},
 see:[{title:'What does A do to the F?',hint:'Pick a matrix. Watch the gray F move to the blue F.',mount:mTransform}],
 vocab:[['Transformation matrix','A·(x, y) moves each point (x, y) to a new point.'],['Columns of A','Column 1 = image of i = (1, 0); column 2 = image of j = (0, 1).'],['Rotation by θ','[[cos θ, −sin θ], [sin θ, cos θ]].'],['Composition','Do B then A: the single matrix AB.']],
 examples:[ex('Example 1','Image of (3, 1) under A = [[0, −1], [1, 0]].',[['A·(3, 1) = (0·3 − 1·1, 1·3 + 0·1)','Row times column.'],['= (−1, 3)','A 90° counterclockwise rotation.']]),
  ex('Example 2','Find the matrix that reflects over the x-axis.',[['i = (1, 0) stays (1, 0)','Column 1.'],['j = (0, 1) goes to (0, −1)','Column 2.'],['[[1, 0], [0, −1]]','']])],
 mistake:{bad:'A(x, y) = (a·x, d·y) using only the diagonal',good:'(ax + by, cx + dy)',why:'Each output coordinate uses a whole row of A times the whole input vector.'},
 practice(){if(Math.random()<0.7){const A=[[rand(-3,3),rand(-3,3)],[rand(-3,3),rand(-3,3)]],p=[rand(-4,4),rand(-4,4)];const r=[A[0][0]*p[0]+A[0][1]*p[1],A[1][0]*p[0]+A[1][1]*p[1]];
   return num(`A = ${M(A)}. Find the image of the point (${p.map(fmtNeg).join(', ')}).`,[['x′ =',r[0]],['y′ =',r[1]]],'x′ = (row 1)·(x, y), y′ = (row 2)·(x, y).',[[`x′ = ${A[0][0]}·${P(p[0])} + ${P(A[0][1])}·${P(p[1])} = ${r[0]}`,''],[`y′ = ${A[1][0]}·${P(p[0])} + ${P(A[1][1])}·${P(p[1])} = ${r[1]}`,'']]);}
  const T=pick([{t:'rotate 90° counterclockwise',a:'[[0, −1], [1, 0]]'},{t:'reflect over the x-axis',a:'[[1, 0], [0, −1]]'},{t:'reflect over the y-axis',a:'[[−1, 0], [0, 1]]'},{t:'rotate 180°',a:'[[−1, 0], [0, −1]]'},{t:'reflect over y = x',a:'[[0, 1], [1, 0]]'},{t:'rotate 90° clockwise',a:'[[0, 1], [−1, 0]]'}]);
  return mc(`Which matrix will ${T.t}?`,T.a,['[[0, −1], [1, 0]]','[[1, 0], [0, −1]]','[[−1, 0], [0, 1]]','[[0, 1], [1, 0]]','[[0, 1], [−1, 0]]','[[−1, 0], [0, −1]]'].filter(x=>x!==T.a).sort(()=>Math.random()-0.5),'Ask: where do (1, 0) and (0, 1) go? Those are the columns.');},
 check:[q('Column 1 of A is the image of…',['(0, 1)','(1, 0)','(1, 1)','the origin'],1,''),q('[[2, 0], [0, 2]] does what?',['rotates','reflects','doubles every distance','shears'],2,''),q('Image of (1, 2) under [[1, 1], [0, 1]]?',['(3, 2)','(1, 3)','(2, 2)','(1, 2)'],0,'')]};

L['PC-6-5']={goal:'I can compute 2 × 2 and 3 × 3 determinants and explain the determinant as an area scale factor.',
 life:{title:'How much does it stretch?',html:'A map projection, a camera lens, or a game zoom changes areas. The <b>determinant</b> of the transformation matrix says exactly how much: det 3 triples every area, det 0 flattens everything onto a line.'},
 see:[{title:'Determinant as area',hint:'Change the matrix. The colored area equals |det A|.',mount:mDet}],
 vocab:[['2 × 2 determinant','det [[a, b], [c, d]] = ad − bc.'],['3 × 3 determinant','Expand along row 1: a(ei − fh) − b(di − fg) + c(dh − eg).'],['Area meaning','|det A| = area of the image of the unit square.'],['Sign','Negative det: the transformation flips orientation.'],['det = 0','Everything collapses onto a line or point; no inverse.']],
 examples:[ex('Example 1','det [[4, −2], [3, 5]].',[['4·5 − (−2)·3','ad − bc.'],['= 20 + 6 = 26','']]),
  ex('Example 2','det [[1, 2, 0], [3, −1, 4], [2, 0, 1]].',[['1·(−1·1 − 4·0) = −1','First term.'],['− 2·(3·1 − 4·2) = +10','Second term (note the minus).'],['+ 0·(…) = 0','Third term.'],['det = 9','']])],
 mistake:{bad:'det [[a, b], [c, d]] = ab − cd',good:'ad − bc',why:'Multiply the <b>diagonals</b>: main diagonal (a, d) minus the other diagonal (b, c).'},
 practice(){if(Math.random()<0.6){const A=[[rand(-6,6),rand(-6,6)],[rand(-6,6),rand(-6,6)]];const D=C.det2(A);
   return num(`Find det ${M(A)}.`,[['det =',D]],'ad − bc.',[[`${P(A[0][0])}·${P(A[1][1])} − ${P(A[0][1])}·${P(A[1][0])} = ${D}`,'']]);}
  const A=[[rand(-3,3),rand(-3,3),rand(-3,3)],[rand(-3,3),rand(-3,3),rand(-3,3)],[rand(-3,3),rand(-3,3),rand(-3,3)]];const D=C.det3(A);
  return num(`Find det ${M(A)}.`,[['det =',D]],'Expand along the first row with signs + − +.',[[`${P(A[0][0])}(${P(A[1][1])}·${P(A[2][2])} − ${P(A[1][2])}·${P(A[2][1])}) − ${P(A[0][1])}(${P(A[1][0])}·${P(A[2][2])} − ${P(A[1][2])}·${P(A[2][0])}) + ${P(A[0][2])}(${P(A[1][0])}·${P(A[2][1])} − ${P(A[1][1])}·${P(A[2][0])})`,'Cofactor expansion.'],[`= ${D}`,'']]);},
 check:[q('det [[3, 1], [2, 4]] =',['10','14','12','−10'],0,''),q('det A = −2 means A…',['shrinks areas to half','doubles areas and flips orientation','has no inverse','is the identity'],1,''),q('A matrix with two equal rows has det…',['1','0','−1','undefined'],1,'')]};

L['PC-6-6']={goal:'I can find determinants and inverses of matrices and use an inverse to solve a system.',
 life:{title:'Secret codes',html:'Multiply a message (as numbers) by a matrix to encode it; multiply by the <b>inverse</b> matrix to decode. If the determinant is 0, no inverse exists — the message is lost.'},
 see:[{title:'Determinant as area',hint:'Change the matrix. The colored area equals |det A|.',mount:mDet}],
 vocab:[['det [[a, b], [c, d]]','ad − bc.'],['Inverse (2 × 2)','(1/det)[[d, −b], [−c, a]].'],['Singular','det = 0; no inverse.'],['Solve AX = B','X = A⁻¹B.']],
 examples:[ex('Example','Solve 3x + 2y = 7, x + y = 3 with an inverse.',[['A = [[3, 2], [1, 1]], det = 1',''],['A⁻¹ = [[1, −2], [−1, 3]]','Swap a, d; negate b, c; divide by det.'],['X = A⁻¹[7, 3] = [1, 2]','x = 1, y = 2.']])],
 mistake:{bad:'A⁻¹ = [[1/a, 1/b], [1/c, 1/d]]',good:'(1/det)[[d, −b], [−c, a]]',why:'An inverse undoes the whole transformation. Check: AA⁻¹ should equal I.'},
 practice(){let A;do A=[[rand(-5,5),rand(-5,5)],[rand(-5,5),rand(-5,5)]];while(!C.det2(A));const D=C.det2(A);
  return num(`A = ${M(A)}. Find det A and the top-left entry of A⁻¹.`,[['det A =',D],['(A⁻¹)₁₁ =',A[1][1]/D]],'det = ad − bc. Top-left of A⁻¹ = d/det.',[[`det = ${P(A[0][0])}·${P(A[1][1])} − ${P(A[0][1])}·${P(A[1][0])} = ${D}`,''],[`(A⁻¹)₁₁ = ${A[1][1]}/${D} = ${frac(A[1][1],D)}`,'']]);},
 check:[q('det [[2, 3], [4, 6]] =',['0','24','−24','12'],0,''),q('A matrix with det 0…',['has an inverse','has no inverse','is the identity','is 3 × 3'],1,''),q('|det A| measures how A scales…',['length','area','angles','slope'],1,'')]};
L['PC-6-6'].see=[{title:'One inverse, many systems',hint:'Change the right-hand side. The same A⁻¹ solves every version.',mount:mSolveInv}];

TOOLS['PC-6']={title:'Matrix as a transformation',hint:'See a 2 × 2 matrix move the unit square; the area is the determinant.',mount:mDet};
})();
