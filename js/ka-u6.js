/* Khan Algebra 1 · Unit 6 · Systems of equations (6-5 new; others shared) */
(function(){const {lin,eqAB,sysH}=KA;
function mountNS(el){let m2=1,b2=-2;
 el.innerHTML=`<div style="text-align:center">Line 1 (fixed): <b style="color:#2563eb">y = 2x + 1</b></div><div class="ctrl"><label>Line 2 slope <input type="range" id="sm" min="-3" max="4" value="1"></label><label>Line 2 intercept <input type="range" id="sb" min="-5" max="5" value="-2"></label></div><div class="eqline math" id="se"></div><div id="sg"></div><div class="readout" id="sr"></div>`;
 const draw=()=>{const G=grid({u:30});let s=gline(G,2,1,'',`stroke="#2563eb" stroke-width="5"`)+gline(G,m2,b2,'',`stroke="#ea580c" stroke-width="3" ${m2===2&&b2===1?'stroke-dasharray="10 8"':''}`);
  let msg;if(m2!==2){const x=(b2-1)/(2-m2),y=2*x+1;s+=gdot(G,x,y,'#15803d',9,`(${KA.nf(x)}, ${KA.nf(y)})`);msg=`Subtract the equations: ${fmtNeg(2-m2)}x = ${fmtNeg(b2-1)} → x = ${KA.nf(x)}. <b>Different slopes → exactly one solution.</b>`;}
  else if(b2!==1)msg=`Subtract: 0 = ${fmtNeg(b2-1)} — <b>false</b>. Same slope, different intercepts → parallel → <b>no solution</b>.`;else msg='Subtract: 0 = 0 — <b>always true</b>. Same line → <b>infinitely many solutions</b>.';
  $('#sg',el).innerHTML=G.svg(s);$('#se',el).innerHTML=sysH('y = 2x + 1',`y = ${lin(m2,b2)}`);$('#sr',el).innerHTML=msg+' Try slope 2.';};
 [['sm',v=>m2=v],['sb',v=>b2=v]].forEach(([id,f])=>$('#'+id,el).addEventListener('input',e=>{f(+e.target.value);draw();}));draw();}
L['KA-6-5']={goal:'I can tell how many solutions a system has by looking at slopes and intercepts or by solving algebraically.',
 life:{title:'Two runners',html:'Two runners go the same speed. If one starts 100 m ahead, they <b>never</b> meet (no solution). If they start at the same spot, they are together <b>the whole race</b> (infinitely many). Different speeds → they meet <b>once</b>.'},
 see:[{title:'Classify by slope and intercept',hint:'Change line 2. Make it parallel, then make it the same line.',mount:mountNS}],
 vocab:[['One solution','Different slopes.'],['No solution','Same slope, different y-intercepts; algebra gives a false statement (0 = 5).'],['Infinitely many','Same slope and same y-intercept; algebra gives a true statement (0 = 0).']],
 examples:[{title:'Example',prob:'How many solutions? '+sysH('6x − 3y = 9','y = 2x − 3'),raw:true,lines:[[mx('6x − 3(2x − 3) = 9'),'Substitute.'],[mx('6x − 6x + 9 = 9 → 9 = 9'),'True, and x disappeared.'],['infinitely many solutions','The equations are the same line.']]},{title:'Example',prob:sysH('y = −x + 4','2x + 2y = 3'),raw:true,lines:[[mx('2y = −2x + 3 → y = −x + 1.5'),'Rewrite the second equation.'],['same slope −1, different b','Parallel.'],['no solution','—']]}],
 mistake:{bad:'0 = 0 → the solution is (0, 0)',good:'0 = 0 → infinitely many solutions',why:'A true statement with no variables left means <b>every</b> point on the line works.'},
 practice(){const t=rand(0,2),m=pick([-3,-2,-1,1,2,3]),b=rand(-5,5),k=pick([2,3,-2]);let e2;
  if(t===0)e2=`y = ${lin(m+pick([1,-1,2]),rand(-5,5))}`;else if(t===1)e2=eqAB(-k*m,k,k*(b+pick([2,-3,1])));else e2=eqAB(-k*m,k,k*b);
  return {type:'mc',q:`How many solutions does this system have? ${sysH(`y = ${lin(m,b)}`,e2)}`,opts:['Exactly one','No solution','Infinitely many'],a:t,why:['The slopes are different.','Rewrite the second equation: same slope, different y-intercept.',`Divide the second equation by ${k}: it’s the same line.`][t]};},
 check:[{q:'y = 3x + 1 and y = 3x − 4 have…',o:['one solution','no solution','infinitely many'],a:1,why:'Parallel lines.'},{q:'Solving a system gives −2 = −2. So…',o:['x = −2','no solution','infinitely many solutions','y = −2'],a:2,why:'Always true.'},{q:'y = 2x and y = −2x have…',o:['one solution','no solution','infinitely many'],a:0,why:'Different slopes: they meet at (0, 0).'}]};
})();
