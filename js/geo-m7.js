/* Geometry · Module 7 · Conic Sections */
(function(){
const G8=o=>grid(Object.assign({x0:-8,x1:8,y0:-8,y1:8,u:24,lab:2},o||{}));
const sh=(v,h)=>h===0?v:`(${v} ${h<0?'+':'−'} ${Math.abs(h)})`;
const circEq=(h,k,r2)=>`${sh('x',h)}² + ${sh('y',k)}² = ${r2}`;
const sgn=(n,v)=>n===0?'':`${n<0?' − ':' + '}${Math.abs(n)===1&&v?'':Math.abs(n)}${v}`;
const expEq=(D,E,F)=>`x² + y²${sgn(D,'x')}${sgn(E,'y')}${sgn(F,'')} = 0`;

function mountCirc(el){
 el.innerHTML=`<div class="ctrl">${ctl('ch','h',-4,4,2)}${ctl('ck','k',-4,4,-1)}${ctl('cr','r',1,4,3)}${ctl('ct','point angle',0,350,40,10)}</div><div class="eqline math" id="ce"></div><div id="cg"></div><div class="readout" id="crr"></div>`;
 const draw=()=>{const [h,k,r,t]=vals(el,['ch','ck','cr','ct']);['ch','ck','cr'].forEach((i,j)=>$('#'+i+'v',el).textContent=[h,k,r][j]);$('#ctv',el).textContent=t+'°';const G=G8(),Pp=[h+r*Math.cos(t*Math.PI/180),k+r*Math.sin(t*Math.PI/180)];
  $('#cg',el).innerHTML=G.svg(gCirc(G,[h,k],r)+gSeg(G,[h,k],Pp,'#ea580c',3)+gSeg(G,[h,k],[Pp[0],k],'#059669',2,'5 4')+gSeg(G,[Pp[0],k],Pp,'#7c3aed',2,'5 4')+gdot(G,h,k,'#1f2937',6,`(${h}, ${k})`)+gdot(G,Pp[0],Pp[1],'#ea580c',7,'(x, y)'));
  $('#ce',el).innerHTML=circEq(h,k,r*r);
  $('#crr',el).innerHTML=`Every point (x, y) on the circle is exactly r = ${r} from the center (${h}, ${k}).<br>Right triangle: horizontal leg x − h = ${rd(Pp[0]-h,2)}, vertical leg y − k = ${rd(Pp[1]-k,2)} → (x − h)² + (y − k)² = ${rd((Pp[0]-h)**2,2)} + ${rd((Pp[1]-k)**2,2)} = <b>${r*r}</b> = r².`;};
 onIn(el,['ch','ck','cr','ct'],draw);draw();
}
function mountComplete(el){
 const PR=[[4,-6,-12],[-2,8,8],[6,0,-7],[-8,-2,1],[10,4,25]];let i=0;
 el.innerHTML=btns(PR.map(p=>expEq(...p)))+`<div id="xg"></div>`;
 const draw=j=>{i=j;const [D,E,F]=PR[i],h=-D/2,k=-E/2,r2=h*h+k*k-F;
  $('#xg',el).innerHTML=[[expEq(D,E,F),'Start (expanded form).'],[`(x²${sgn(D,'x')}) + (y²${sgn(E,'y')}) = ${-F}`,'Group x-terms and y-terms; move the constant.'],[`(x²${sgn(D,'x')} + ${h*h}) + (y²${sgn(E,'y')} + ${k*k}) = ${-F} + ${h*h} + ${k*k}`,`Complete each square: add (half the coefficient)² to BOTH sides: (${D}/2)² = ${h*h}, (${E}/2)² = ${k*k}.`],[circEq(h,k,r2),'Factor each perfect square.'],[`center (${fmtNeg(h)}, ${fmtNeg(k)}), radius √${r2} = ${sqrtS(r2)}`,'Read the circle.']].map(l=>`<div class="ln-step"><div class="m math">${l[0]}</div><div class="why">${l[1]}</div></div>`).join('');selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountPara(el){
 el.innerHTML=`<div class="ctrl">${ctl('pp','p (focus distance)',-3,3,1,0.5)}${ctl('px','point x',-6,6,3,0.5)}</div><div class="eqline math" id="pe"></div><div id="pg"></div><div class="readout" id="pr"></div>`;
 const draw=()=>{let [p,x]=vals(el,['pp','px']);if(p===0)p=0.5;$('#ppv',el).textContent=p;$('#pxv',el).textContent=x;const G=G8(),a=1/(4*p),y=a*x*x,F=[0,p];
  let d='';for(let t=-8;t<=8.001;t+=0.1){const yy=Math.max(-9,Math.min(9,a*t*t));d+=(d?'L':'M')+G.X(t)+' '+G.Y(yy);}
  let s=`<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="#2563eb" stroke-width="3"/>`+gSeg(G,[-8,-p],[8,-p],'#7c3aed',3,'8 5')+gSeg(G,[x,y],F,'#ea580c',2.5)+gSeg(G,[x,y],[x,-p],'#059669',2.5)+gdot(G,0,p,'#ea580c',7,'focus')+gdot(G,x,y,'#1f2937',6)+gdot(G,0,0,'#2563eb',5);
  $('#pg',el).innerHTML=G.svg(s);$('#pe',el).innerHTML=`y = x² / ${fmtNeg(rd(4*p,2))}`;
  const d1=dist2([x,y],F),d2=Math.abs(y+p);
  $('#pr',el).innerHTML=`Focus (0, ${p}), directrix y = ${fmtNeg(-p)} (purple), vertex (0, 0) halfway between.<br>Point (${x}, ${rd(y,2)}): distance to focus (orange) = <b>${rd(d1,2)}</b>, distance to directrix (green) = <b>${rd(d2,2)}</b> — always equal!<br>Equation: y = x²/(4p) = <b>${rd(a,3)}x²</b>. ${p>0?'Focus above → opens up.':'Focus below → opens down.'}`;};
 onIn(el,['pp','px'],draw);draw();
}

L['GEO-7-1']={
 goal:'I can find the center and radius of a circle from its graph and explain why every point is r from the center.',
 life:{title:'Cell tower coverage',html:'A cell tower reaches every phone within 5 miles. On a map, the edge of its coverage is a circle: all points exactly 5 miles from the tower. The tower is the center, 5 is the radius.'},
 see:[{title:'Build a circle',hint:'Move the center, change r, and slide the point around the circle.',mount:mountCirc}],
 vocab:[['Circle','All points in a plane at a fixed distance (radius) from a fixed point (center).'],['Radius r','Center to any point on the circle.'],['Diameter','2r, through the center.'],['From a graph','Find the center, then count from the center straight left/right/up/down to the circle.']],
 examples:[
  {title:'Example 1 — Read a graph',prob:'A circle passes through (5, 2), (−1, 2), (2, 5), and (2, −1).',raw:true,lines:[['center = midpoint of (5, 2) and (−1, 2) = (2, 2)','These points are at the ends of a horizontal diameter.'],['r = 5 − 2 = 3','Distance from center to (5, 2).']]},
  {title:'Example 2 — Is the point on the circle?',prob:'Center (0, 0), r = 5. Is (3, −4) on the circle?',raw:true,lines:[['distance = √(9 + 16) = 5','Distance formula.'],['5 = r → yes','On the circle.']]}],
 mistake:{bad:'Use the diameter as the radius',good:'r = diameter ÷ 2',why:'If the circle spans from x = −1 to x = 5, that 6 is the diameter. The radius is 3.'},
 practice(){const h=rand(-3,3),k=rand(-3,3),r=rand(1,4),G=G8();const fig=G.svg(gCirc(G,[h,k],r)+gdot(G,h,k,'#1f2937',4));
  if(Math.random()<.6)return {q:'Find the center and radius of the circle.',fig,fields:[{label:'h =',answer:h},{label:'k =',answer:k},{label:'r =',answer:r}],raw:true,hint:'Find the center dot, then count grid units to the circle.',sol:[[`center (${h}, ${k}), r = ${r}`,'Read the graph.']]};
  const T=pick([[3,4],[0,r],[r,0],[1,1]]),on=T[0]*T[0]+T[1]*T[1]===r*r,m=mcU(on?'yes':'no',['yes','no']);
  return {type:'mc',q:`A circle has center (${h}, ${k}) and radius ${r}. Is the point (${h+T[0]}, ${k+T[1]}) on the circle?`,opts:m.opts,a:m.a,why:`Distance = √(${T[0]*T[0]} + ${T[1]*T[1]}) = ${rd(Math.hypot(...T),3)}; ${on?'equals':'does not equal'} r = ${r}.`};},
 check:[
  {q:'A circle crosses the x-axis at −2 and 8 with its center on the x-axis. Radius?',o:['5','10','3','6'],a:0,why:'Diameter 10 → r = 5.'},
  {q:'Center (1, 1), r = 5. Which point is on it?',o:['(4, 5)','(5, 5)','(6, 6)','(1, 5)'],a:0,why:'√(9 + 16) = 5.'},
  {q:'A circle is the set of points…',o:['equally far from a line','a fixed distance from a center','inside a square','on a parabola'],a:1,why:'Definition of a circle.'}]
};

L['GEO-7-2']={
 goal:'I can write the standard equation (x − h)² + (y − k)² = r² of a circle and read its center and radius.',
 life:{title:'Sprinkler zones',html:'A garden sprinkler at (4, −2) sprays 6 m. A landscaper’s software stores its zone as (x − 4)² + (y + 2)² = 36 — every point it waters makes that equation true or less.'},
 see:[{title:'Equation from center and radius',hint:'Watch the equation change as you move the circle.',mount:mountCirc}],
 vocab:[['Standard form','(x − h)² + (y − k)² = r²'],['Center','(h, k) — note the signs flip: (x + 3) means h = −3.'],['r²','The right side is the radius squared.'],['Origin-centered','x² + y² = r²']],
 examples:[
  {title:'Example 1 — Write it',prob:'Center (−3, 5), radius 4.',raw:true,lines:[['(x − (−3))² + (y − 5)² = 4²','Substitute h, k, r.'],['(x + 3)² + (y − 5)² = 16','Simplify.']]},
  {title:'Example 2 — Read it',prob:'(x − 7)² + (y + 1)² = 50',raw:true,lines:[['center (7, −1)','Opposite signs of the numbers inside.'],['r = √50 = 5√2 ≈ 7.07','Square root of the right side.']]}],
 mistake:{bad:'(x + 3)² → h = 3',good:'h = −3',why:'The form is x − h. x + 3 = x − (−3), so h = −3.'},
 practice(){const h=rand(-6,6),k=rand(-6,6),r=rand(1,9),t=rand(0,1);
  if(t===0)return {q:`Find the center and radius of <span class="math">${circEq(h,k,r*r)}</span>.`,fields:[{label:'h =',answer:h},{label:'k =',answer:k},{label:'r =',answer:r}],raw:true,hint:'Flip the signs inside; take √ of the right side.',sol:[[`center (${h}, ${k})`,'Signs flip.'],[`r = √${r*r} = ${r}`,'Square root.']]};
  const m=mcU(circEq(h,k,r*r),[circEq(-h||1,-k||1,r*r),circEq(h,k,r),circEq(-h||2,k,r*r),circEq(h,-k||2,2*r)]);
  return {type:'mc',q:`Which is the equation of the circle with center (${h}, ${k}) and radius ${r}?`,opts:m.opts,a:m.a,why:`(x − h)² + (y − k)² = r² with r² = ${r*r}.`};},
 check:[
  {q:'Center and radius of (x + 2)² + (y − 4)² = 9?',o:['(2, −4), 9','(−2, 4), 3','(−2, 4), 9','(2, −4), 3'],a:1,why:'Signs flip; √9 = 3.'},
  {q:'Equation: center (0, 0), r = 6?',o:['x² + y² = 6','x² + y² = 36','x² + y² = 12','(x − 6)² + y² = 0'],a:1,why:'r² = 36.'},
  {q:'Is (3, 4) on x² + y² = 25?',o:['yes','no'],a:0,why:'9 + 16 = 25.'}]
};

L['GEO-7-3']={
 goal:'I can complete the square to change an expanded circle equation into standard form.',
 life:{title:'Reading a messy equation',html:'GPS software might output a coverage region as x² + y² − 8x + 6y − 11 = 0. That is a circle in disguise. Completing the square reveals its center (4, −3) and radius 6.'},
 see:[{title:'Complete the square, step by step',hint:'Pick an equation.',mount:mountComplete}],
 vocab:[['Expanded form','x² + y² + Dx + Ey + F = 0.'],['Completing the square','Add (half the x-coefficient)² and (half the y-coefficient)² to both sides.'],['Shortcut','Center (−D/2, −E/2); r² = (D/2)² + (E/2)² − F.'],['Check','If r² ≤ 0, it is not a real circle.']],
 examples:[
  {title:'Example 1',prob:'x² + y² − 8x + 6y − 11 = 0',raw:true,lines:[['(x² − 8x) + (y² + 6y) = 11','Group, move the constant.'],['(x² − 8x + 16) + (y² + 6y + 9) = 11 + 16 + 9','Add 16 and 9 to both sides.'],['(x − 4)² + (y + 3)² = 36','Factor.'],['center (4, −3), r = 6','Read it.']]},
  {title:'Example 2',prob:'x² + y² + 10y = 0',raw:true,lines:[['x² + (y² + 10y + 25) = 25','Only y needs completing.'],['x² + (y + 5)² = 25','Center (0, −5), r = 5.']]}],
 mistake:{bad:'Add 16 and 9 only to the left side',good:'Add them to BOTH sides',why:'An equation must stay balanced. Forgetting the right side gives the wrong radius.'},
 practice(){const h=rand(-6,6),k=rand(-6,6),r=rand(1,8);if(h===0&&k===0)return this.practice();const D=-2*h,E=-2*k,F=h*h+k*k-r*r;
  return {q:`Find the center and radius of <span class="math">${expEq(D,E,F)}</span>.`,fields:[{label:'h =',answer:h},{label:'k =',answer:k},{label:'r =',answer:r}],raw:true,hint:'Group, add (half of each coefficient)² to both sides, factor.',sol:[[`(x²${sgn(D,'x')} + ${h*h}) + (y²${sgn(E,'y')} + ${k*k}) = ${-F} + ${h*h} + ${k*k}`,'Complete the squares.'],[circEq(h,k,r*r),'Factor.'],[`center (${h}, ${k}), r = ${r}`,'Read.']]};},
 check:[
  {q:'To complete x² + 12x, add…',o:['6','12','36','144'],a:2,why:'(12/2)² = 36.'},
  {q:'x² + y² − 4x − 5 = 0 has center…',o:['(4, 0)','(2, 0)','(−2, 0)','(0, 2)'],a:1,why:'(x − 2)² + y² = 9.'},
  {q:'Radius of x² + y² − 4x − 5 = 0?',o:['5','√5','3','9'],a:2,why:'r² = 5 + 4 = 9.'}]
};

L['GEO-7-4']={
 goal:'I can use the focus and directrix to write the equation of a parabola.',
 life:{title:'Satellite dishes and headlights',html:'A satellite dish is a parabola: every signal coming straight in bounces to one point, the <b>focus</b>, where the receiver sits. Car headlights work in reverse — a bulb at the focus sends light straight out.'},
 see:[{title:'Equal distances',hint:'Change p and slide the point along the parabola. Compare orange and green.',mount:mountPara}],
 vocab:[['Parabola','All points equally far from a fixed point (focus) and a fixed line (directrix).'],['Vertex','Halfway between the focus and the directrix.'],['p','Directed distance from the vertex to the focus.'],['Equation (vertex at origin)','y = x²/(4p), i.e. x² = 4py.'],['Vertex (h, k)','y − k = (x − h)²/(4p); focus (h, k + p), directrix y = k − p.']],
 examples:[
  {title:'Example 1 — From focus and directrix',prob:'Focus (0, 2), directrix y = −2.',raw:true,lines:[['vertex (0, 0), p = 2','Halfway between; focus is 2 above.'],['y = x²/(4·2) = x²/8','y = x²/(4p).']]},
  {title:'Example 2 — Shifted vertex',prob:'Focus (3, 1), directrix y = 5.',raw:true,lines:[['vertex (3, 3)','Halfway between y = 1 and y = 5.'],['p = 1 − 3 = −2','Focus is below → opens down.'],['y − 3 = (x − 3)²/(−8)','Substitute: 4p = −8.']]}],
 mistake:{bad:'p = distance from focus to directrix',good:'p = distance from vertex to focus (half of that)',why:'The vertex sits halfway, so focus-to-directrix is 2|p|.'},
 practice(){const t=rand(0,2),h=rand(-4,4),k=rand(-4,4),p=pick([-3,-2,-1,1,2,3,0.5,-0.5]);
  if(t===0)return {q:`A parabola has focus (${h}, ${fmtNeg(k+p)}) and directrix y = ${fmtNeg(k-p)}. Find the vertex.`,fields:[{label:'x =',answer:h},{label:'y =',answer:k}],raw:true,hint:'The vertex is halfway between the focus and the directrix.',sol:[[`y = (${fmtNeg(k+p)} + ${P(k-p)}) ÷ 2 = ${k}`,'Average.'],[`vertex (${h}, ${k})`,'Same x as the focus.']]};
  if(t===1)return {q:`Focus (0, ${fmtNeg(p)}), directrix y = ${fmtNeg(-p)}. The parabola is y = ax². Find a.`,fields:[{label:'a =',answer:1/(4*p),tol:0.006}],raw:true,hint:'a = 1/(4p).',sol:[[`p = ${p}`,'Vertex (0, 0) to focus.'],[`a = 1/(4 · ${fmtNeg(p)}) = ${rd(1/(4*p),4)}`,'y = x²/(4p).']]};
  const m=mcU(p>0?'up':'down',['up','down','left','right']);return {type:'mc',q:`Focus (${h}, ${fmtNeg(k+p)}), directrix y = ${fmtNeg(k-p)}. Which way does the parabola open?`,opts:m.opts,a:m.a,why:`It opens toward the focus, which is ${p>0?'above':'below'} the directrix.`};},
 check:[
  {q:'Focus (0, 3), directrix y = −3. Equation?',o:['y = x²/3','y = x²/12','y = 12x²','y = x²/6'],a:1,why:'4p = 12.'},
  {q:'Focus (2, 5), directrix y = 1. Vertex?',o:['(2, 3)','(2, 5)','(2, 1)','(3, 2)'],a:0,why:'Halfway: y = 3.'},
  {q:'Every point on a parabola is equally far from…',o:['two foci','the focus and the directrix','the vertex and the origin','the axis'],a:1,why:'Definition.'}]
};
})();
