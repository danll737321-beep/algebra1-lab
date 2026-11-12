/* Geometry · Module 9 · Solid Geometry */
(function(){
const PI=Math.PI;
const ell=(cx,cy,rx,ry,o={})=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.fill||'none'}" stroke="${o.col||'#1f2937'}" stroke-width="${o.w||2.5}" ${o.dash?`stroke-dasharray="${o.dash}"`:''}/>`;
const halfE=(cx,cy,rx,ry,front,col='#1f2937',dash='')=>`<path d="M${cx-rx} ${cy} A${rx} ${ry} 0 0 ${front?0:1} ${cx+rx} ${cy}" fill="none" stroke="${col}" stroke-width="2.5" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
function cyl(cx,top,rx,h,o={}){const ry=rx*0.3,b=top+h;return `<path d="M${cx-rx} ${top} L${cx-rx} ${b} A${rx} ${ry} 0 0 0 ${cx+rx} ${b} L${cx+rx} ${top}" fill="${o.fill||'rgba(37,99,235,.15)'}" stroke="none"/>`+ell(cx,top,rx,ry,{fill:o.topfill||'rgba(37,99,235,.25)'})+fL([cx-rx,top],[cx-rx,b])+fL([cx+rx,top],[cx+rx,b])+halfE(cx,b,rx,ry,true)+halfE(cx,b,rx,ry,false,'#1f2937','5 4');}
function cone(cx,top,rx,h,o={}){const ry=rx*0.3,b=top+h;return `<path d="M${cx} ${top} L${cx-rx} ${b} A${rx} ${ry} 0 0 0 ${cx+rx} ${b}Z" fill="${o.fill||'rgba(234,88,12,.15)'}" stroke="none"/>`+fL([cx,top],[cx-rx,b])+fL([cx,top],[cx+rx,b])+halfE(cx,b,rx,ry,true)+halfE(cx,b,rx,ry,false,'#1f2937','5 4');}
function box(x,y,w,h,d,fill='rgba(37,99,235,.15)'){const dx=d*0.6,dy=-d*0.4;const F=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],T=[[x,y],[x+dx,y+dy],[x+w+dx,y+dy],[x+w,y]],S=[[x+w,y],[x+w+dx,y+dy],[x+w+dx,y+h+dy],[x+w,y+h]];
 return fP(F,fill,'#1f2937',2.5)+fP(T,'rgba(37,99,235,.28)','#1f2937',2.5)+fP(S,'rgba(37,99,235,.2)','#1f2937',2.5)+fL([x,y+h],[x+dx,y+h+dy],'#1f2937',1.5,'5 4')+fL([x+dx,y+h+dy],[x+w+dx,y+h+dy],'#1f2937',1.5,'5 4')+fL([x+dx,y+dy],[x+dx,y+h+dy],'#1f2937',1.5,'5 4');}
function pyr(x,y,w,h,d){const dx=d*0.6,dy=-d*0.4,A=[x,y+h],B=[x+w,y+h],C=[x+w+dx,y+h+dy],D=[x+dx,y+h+dy],T=[x+w/2+dx/2,y+dy/2];
 return fP([A,B,T],'rgba(5,150,105,.18)','#1f2937',2.5)+fP([B,C,T],'rgba(5,150,105,.28)','#1f2937',2.5)+fL(A,D,'#1f2937',1.5,'5 4')+fL(D,C,'#1f2937',1.5,'5 4')+fL(D,T,'#1f2937',1.5,'5 4')+fL(T,[T[0],y+h+dy/2],'#ea580c',2,'4 4');}

const SOL=[
 {n:'Cube',cuts:[['horizontal','square'],['vertical (parallel to a face)','square'],['diagonal through 3 corners','triangle']]},
 {n:'Cylinder',cuts:[['horizontal','circle'],['vertical through the axis','rectangle'],['slanted','ellipse (oval)']]},
 {n:'Cone',cuts:[['horizontal','circle'],['vertical through the apex','triangle'],['slanted','ellipse (oval)']]},
 {n:'Square pyramid',cuts:[['horizontal','square'],['vertical through the apex','triangle'],['vertical, not through the apex','trapezoid']]},
 {n:'Sphere',cuts:[['any plane','circle'],['through the center','great circle (largest circle)'],['near the edge','small circle']]}];
function mountCut(el){
 let s0=1,c0=0;el.innerHTML=btns(SOL.map(s=>s.n),'data-s')+`<div id="cb"></div><div id="cg"></div><div class="readout" id="cr"></div>`;
 const draw=()=>{const S=SOL[s0],cut=S.cuts[c0];$('#cb',el).innerHTML=btns(S.cuts.map(c=>'Cut: '+c[0]),'data-c');$$('[data-c]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.c===c0));$$('[data-s]',el).forEach(x=>x.classList.toggle('sel',+x.dataset.s===s0));
  let fig='';const cx=140;
  if(s0===0)fig=box(70,90,120,120,80);if(s0===1)fig=cyl(cx,70,70,150);if(s0===2)fig=cone(cx,50,80,170);if(s0===3)fig=pyr(60,40,140,170,80);if(s0===4)fig=`<circle cx="${cx}" cy="140" r="95" fill="rgba(124,58,237,.12)" stroke="#1f2937" stroke-width="2.5"/>`+halfE(cx,140,95,26,true,'#1f2937','5 4');
  const plane=c0===0||s0===4?`<path d="M20 ${s0===4&&c0===2?90:140} L250 ${s0===4&&c0===2?90:140} L290 ${s0===4&&c0===2?70:120} L60 ${s0===4&&c0===2?70:120}Z" fill="rgba(234,88,12,.25)" stroke="#ea580c" stroke-width="2"/>`:c0===1?`<path d="M${cx-10} 20 L${cx-10} 260 L${cx+30} 240 L${cx+30} 0Z" fill="rgba(234,88,12,.25)" stroke="#ea580c" stroke-width="2"/>`:`<path d="M30 200 L260 80 L290 100 L60 220Z" fill="rgba(234,88,12,.25)" stroke="#ea580c" stroke-width="2"/>`;
  const shapes={square:fP([[360,90],[440,90],[440,170],[360,170]],'rgba(234,88,12,.3)','#ea580c'),triangle:fP([[400,80],[350,180],[450,180]],'rgba(234,88,12,.3)','#ea580c'),circle:`<circle cx="400" cy="130" r="50" fill="rgba(234,88,12,.3)" stroke="#ea580c" stroke-width="3"/>`,rectangle:fP([[365,70],[435,70],[435,190],[365,190]],'rgba(234,88,12,.3)','#ea580c'),trapezoid:fP([[380,90],[420,90],[450,180],[350,180]],'rgba(234,88,12,.3)','#ea580c')};
  const key=cut[1].startsWith('ellipse')?'ell':cut[1].includes('circle')?'circle':cut[1];const shp=key==='ell'?ell(400,130,60,32,{fill:'rgba(234,88,12,.3)',col:'#ea580c',w:3}):key==='circle'&&cut[1].startsWith('small')?`<circle cx="400" cy="130" r="28" fill="rgba(234,88,12,.3)" stroke="#ea580c" stroke-width="3"/>`:shapes[key]||'';
  $('#cg',el).innerHTML=svgF(480,270,fig+plane+fT(330,135,'→',{sz:30})+shp+fT(400,240,cut[1],{col:'#ea580c'}),480);
  $('#cr',el).innerHTML=`A <b>${cut[0]}</b> cut through a <b>${S.n.toLowerCase()}</b> makes a <b>${cut[1]}</b>.`;};
 el.addEventListener('click',e=>{const x=e.target.closest('[data-s],[data-c]');if(!x)return;if(x.dataset.s!==undefined){s0=+x.dataset.s;c0=0;}else c0=+x.dataset.c;draw();});draw();
}
const REV=[['Rectangle spun around one side','cylinder'],['Right triangle spun around a leg','cone'],['Semicircle spun around its diameter','sphere'],['Rectangle spun around a line away from it','cylinder with a hole (washer shape)']];
function mountRev(el){
 el.innerHTML=btns(REV.map(r=>r[0]))+`<div id="rg"></div><div class="readout" id="rr"></div>`;
 const draw=i=>{let a='',b='';const ax=fL([120,20],[120,250],'#7c3aed',2,'8 5');
  if(i===0){a=fP([[120,60],[190,60],[190,220],[120,220]],'rgba(37,99,235,.3)','#2563eb');b=cyl(380,60,70,160);}
  if(i===1){a=fP([[120,40],[120,220],[200,220]],'rgba(37,99,235,.3)','#2563eb');b=cone(380,40,80,180);}
  if(i===2){a=`<path d="M120 40 A90 90 0 0 1 120 220Z" fill="rgba(37,99,235,.3)" stroke="#2563eb" stroke-width="3"/>`;b=`<circle cx="380" cy="130" r="90" fill="rgba(124,58,237,.12)" stroke="#1f2937" stroke-width="2.5"/>`+halfE(380,130,90,25,true,'#1f2937','5 4');}
  if(i===3){a=fP([[150,60],[200,60],[200,220],[150,220]],'rgba(37,99,235,.3)','#2563eb');b=cyl(380,60,80,160)+ell(380,60,30,9,{fill:'#fff'})+halfE(380,220,30,9,true,'#9ca3af','4 4');}
  $('#rg',el).innerHTML=svgF(480,260,ax+a+fT(250,140,'spin ⟳',{sz:18,col:'#7c3aed'})+b,480);$('#rr',el).innerHTML=`${REV[i][0]} (purple axis) → <b>${REV[i][1]}</b>.`;selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountCylV(el){
 el.innerHTML=`<div class="ctrl">${ctl('vr','radius r',1,5,3)}${ctl('vh','height h',1,8,5)}</div><div id="vg"></div><div class="readout" id="vrr"></div>`;
 const draw=()=>{const [r,h]=vals(el,['vr','vh']);$('#vrv',el).textContent=r;$('#vhv',el).textContent=h;const u=22,B=PI*r*r;let s='';
  for(let i=h-1;i>=0;i--){s+=ell(160,250-i*u,r*u,r*u*0.3,{fill:i===h-1?'rgba(37,99,235,.3)':'rgba(37,99,235,.08)',col:i===h-1?'#2563eb':'#93c5fd',w:i===h-1?2.5:1.5});}
  s=cyl(160,250-(h-1)*u-u,r*u,h*u,{fill:'rgba(37,99,235,.08)',topfill:'rgba(37,99,235,.3)'})+s.split('</ellipse>').join('');
  s+=fT(160,250-(h)*u-r*u*0.3-10,`B = π(${r})² ≈ ${rd(B,2)}`,{col:'#2563eb'})+fT(160+r*u+14,250-h*u/2,`h = ${h}`,{a:'start'});
  $('#vg',el).innerHTML=svgF(380,300,s,400);
  $('#vrr',el).innerHTML=`Think of the cylinder as <b>${h}</b> stacked layers, each with area B = πr² = ${r*r}π.<br>V = Bh = πr²h = π(${r})²(${h}) = <b>${r*r*h}π ≈ ${rd(B*h,2)}</b> cubic units. (Prisms work the same way: V = Bh.)`;};
 onIn(el,['vr','vh'],draw);draw();
}
function mountThird(el){
 el.innerHTML=btns(['Cone vs. cylinder','Pyramid vs. prism','Sphere vs. cylinder'])+`<div id="tg"></div><div class="readout" id="tr"></div>`;
 const draw=i=>{let s='';
  if(i===0)s=cyl(110,40,70,180,{fill:'rgba(37,99,235,.06)'})+cone(110,40,70,180)+cyl(330,40,70,180,{fill:'rgba(37,99,235,.06)'})+`<rect x="262" y="160" width="136" height="60" fill="rgba(234,88,12,.25)"/>`+fT(330,150,'⅓ full',{col:'#ea580c'});
  if(i===1)s=box(40,60,130,160,80,'rgba(37,99,235,.06)')+pyr(40,60,130,160,80)+box(270,60,130,160,80,'rgba(37,99,235,.06)')+`<rect x="270" y="168" width="130" height="52" fill="rgba(5,150,105,.3)"/>`+fT(335,155,'⅓ full',{col:'#059669'});
  if(i===2)s=`<circle cx="110" cy="130" r="80" fill="rgba(124,58,237,.15)" stroke="#1f2937" stroke-width="2.5"/>`+cyl(330,50,80,160,{fill:'rgba(37,99,235,.06)'})+`<rect x="250" y="103" width="160" height="107" fill="rgba(124,58,237,.25)"/>`+fT(330,95,'⅔ full',{col:'#7c3aed'});
  $('#tg',el).innerHTML=svgF(470,250,s,480);
  $('#tr',el).innerHTML=[`Pour a full cone (same base and height) into the cylinder: it fills exactly <b>one third</b>. V(cone) = ⅓ πr²h.`,`A pyramid holds <b>one third</b> of the prism with the same base and height. V(pyramid) = ⅓ Bh.`,`A sphere fills <b>two thirds</b> of the cylinder that just contains it (height 2r): ⅔ · πr² · 2r = <b>⁴⁄₃ πr³</b>.`][i];selBtn(el,i);};
 onBtn(el,draw);draw(0);
}
function mountCav(el){
 el.innerHTML=`<div class="ctrl">${ctl('cs','slant',0,60,30,5)}</div><div id="kg"></div><div class="readout" id="kr"></div>`;
 const draw=()=>{const sl=+$('#cs',el).value;$('#csv',el).textContent='';const n=12,hgt=16;let L='',R='';
  for(let i=0;i<n;i++){const y=240-i*hgt;L+=`<rect x="40" y="${y-hgt}" width="120" height="${hgt-2}" rx="3" fill="rgba(37,99,235,${.2+.04*(i%2)})" stroke="#2563eb"/>`;R+=`<rect x="${260+sl*i/ (n-1)*2}" y="${y-hgt}" width="120" height="${hgt-2}" rx="3" fill="rgba(234,88,12,${.2+.04*(i%2)})" stroke="#ea580c"/>`;}
  $('#kg',el).innerHTML=svgF(520,260,L+R+fT(100,30,'right stack'),520);
  $('#kr',el).innerHTML=`Two stacks of the same ${n} coins. Sliding the coins sideways (slant = ${sl}) changes the shape but not the amount of material.<br><b>Cavalieri’s Principle:</b> if two solids have the same height and the same cross-section area at every level, they have the <b>same volume</b>. So an oblique cylinder or prism still has V = Bh (h = perpendicular height).`;};
 onIn(el,['cs'],draw);draw();
}
function mountDens(el){
 el.innerHTML=`<div class="ctrl">${ctl('dm','mass (g)',20,400,190,10)}${ctl('dv','volume (cm³)',10,100,24,2)}</div><div id="dg"></div><div class="readout" id="dr"></div>`;
 const MAT=[['cork',0.24],['wood (pine)',0.5],['ice',0.92],['water',1],['aluminum',2.7],['iron',7.87],['copper',8.96],['gold',19.3]];
 const draw=()=>{const [m,v]=vals(el,['dm','dv']);$('#dmv',el).textContent=m;$('#dvv',el).textContent=v;const d=m/v;let best=MAT[0];MAT.forEach(x=>{if(Math.abs(Math.log(x[1]/d))<Math.abs(Math.log(best[1]/d)))best=x;});
  const n=Math.min(60,Math.round(d*6));let s=box(60,60,150,150,90,'rgba(37,99,235,.08)');for(let i=0;i<n;i++){const x=70+((i*37)%130),y=75+((i*53)%125);s+=fDot([x,y],'#ea580c',4);}
  s+=fT(330,110,`density = ${m} ÷ ${v}`,{a:'start'})+fT(330,140,`≈ ${rd(d,2)} g/cm³`,{a:'start',col:'#ea580c',sz:18})+fT(330,175,`closest: ${best[0]} (${best[1]})`,{a:'start',col:'#059669'})+fT(330,205,d<1?'floats in water':'sinks in water',{a:'start',col:d<1?'#2563eb':'#b91c1c'});
  $('#dg',el).innerHTML=svgF(520,240,s,520);
  $('#dr',el).innerHTML=`Density = mass ÷ volume = how tightly packed the material is (more orange dots = denser). Objects less dense than water (1 g/cm³) float.`;};
 onIn(el,['dm','dv'],draw);draw();
}
const piS=(k)=>`${rd(k,4)}π`;

L['GEO-9-1']={
 goal:'I can identify cross sections of solids and the solids formed by rotating 2-D shapes.',
 life:{title:'Slicing food and 3-D printing',html:'Slice a loaf of bread straight down and every slice is roughly a rectangle; slice a carrot (a cone) crosswise and you get circles. A 3-D printer builds objects one cross section at a time. A potter’s wheel spins a 2-D profile into a vase — a solid of revolution.'},
 see:[{title:'Slice a solid',hint:'Pick a solid, then pick a cut.',mount:mountCut},{title:'Spin a shape',hint:'Each flat shape spins around the purple axis.',mount:mountRev}],
 vocab:[['Cross section','The 2-D shape you get when a plane slices a solid.'],['Prism / cylinder','Cross sections parallel to the base match the base.'],['Pyramid / cone','Horizontal cross sections are smaller copies of the base.'],['Solid of revolution','A 3-D solid formed by rotating a 2-D shape around an axis.'],['Axis of rotation','The line the shape spins around.']],
 examples:[
  {title:'Example 1 — Cross section',prob:'A plane cuts a square pyramid parallel to its base.',raw:true,lines:[['square','Same shape as the base, smaller.']]},
  {title:'Example 2 — Revolution',prob:'A right triangle with legs 3 (vertical) and 4 (horizontal) spins around the vertical leg.',raw:true,lines:[['cone','The vertical leg becomes the height.'],['radius 4, height 3','The horizontal leg sweeps out the base.']]}],
 mistake:{bad:'Every cut of a cylinder is a circle',good:'Depends on the direction of the cut',why:'Horizontal → circle, vertical through the axis → rectangle, slanted → ellipse.'},
 practice(){const t=rand(0,1);
  if(t===0){const S=pick(SOL),c=pick(S.cuts);const all=['square','triangle','circle','rectangle','trapezoid','ellipse (oval)','great circle (largest circle)','small circle'];const m=mcU(c[1],shuffle(all));
   return {type:'mc',q:`What is the cross section of a <b>${S.n.toLowerCase()}</b> cut by a <b>${c[0]}</b> plane?`,opts:m.opts,a:m.a,why:`${S.n}, ${c[0]} cut → ${c[1]}.`};}
  const r=pick(REV),m=mcU(r[1],['cylinder','cone','sphere','cylinder with a hole (washer shape)','pyramid']);return {type:'mc',q:`${r[0]}. What solid is formed?`,opts:m.opts,a:m.a,why:`→ ${r[1]}.`};},
 check:[
  {q:'A horizontal slice of a cone is a…',o:['triangle','circle','rectangle','square'],a:1,why:'Parallel to the circular base.'},
  {q:'Spinning a rectangle around one of its sides makes a…',o:['cone','sphere','cylinder','prism'],a:2,why:'The opposite side sweeps a circle.'},
  {q:'A vertical cut through the apex of a cone gives a…',o:['circle','triangle','ellipse','trapezoid'],a:1,why:'Two slanted sides and the base diameter.'}]
};

L['GEO-9-2']={
 goal:'I can find the volume of prisms and cylinders with V = Bh.',
 life:{title:'How much does the can hold?',html:'A soda can has radius about 3.3 cm and height 12 cm: V = π(3.3)²(12) ≈ 410 cm³ — a bit more than the 355 mL printed on it (the can isn’t filled to the top). Aquariums and shipping boxes are prisms: V = length × width × height.'},
 see:[{title:'Stack the layers',hint:'Change r and h. Each layer has area B.',mount:mountCylV}],
 vocab:[['Volume','The space inside a solid, in cubic units.'],['Base area B','Area of the base shape.'],['Prism','V = Bh (rectangular prism: lwh).'],['Cylinder','V = πr²h.'],['Units','cm³, in³, ft³; 1 mL = 1 cm³.']],
 examples:[
  {title:'Example 1 — Triangular prism',prob:'Base: triangle with base 6 and height 4. Prism length 10.',raw:true,lines:[['B = ½ · 6 · 4 = 12','Area of the triangular base.'],['V = 12 · 10 = 120','V = Bh.']]},
  {title:'Example 2 — Cylinder',prob:'r = 5 in, h = 8 in.',raw:true,lines:[['V = π(5²)(8) = 200π','πr²h.'],['≈ 628.32 in³','Decimal.']]}],
 mistake:{bad:'Cylinder: V = π · diameter² · h',good:'Use the radius: πr²h',why:'If the diameter is 10, r = 5: π · 25 · h, not π · 100 · h (four times too big).'},
 practice(){const t=rand(0,2);
  if(t===0){const l=rand(2,12),w=rand(2,12),h=rand(2,12);return {q:`A rectangular prism is ${l} cm by ${w} cm by ${h} cm. Find its volume.`,fields:[{label:'V =',answer:l*w*h,unit:'cm³'}],raw:true,hint:'V = lwh.',sol:[[`${l} · ${w} · ${h} = ${l*w*h}`,'V = Bh.']]};}
  if(t===1){const r=rand(1,10),h=rand(2,15),d=Math.random()<.4;const V=PI*r*r*h;return {q:`A cylinder has ${d?'diameter '+2*r:'radius '+r} and height ${h}. Find its volume to the nearest hundredth.`,fields:[{label:'V ≈',answer:rd(V,2),tol:0.011}],raw:true,hint:d?'Halve the diameter first, then πr²h.':'V = πr²h.',sol:[[`V = π(${r})²(${h}) = ${r*r*h}π`,'Formula.'],[`≈ ${rd(V,2)}`,'Decimal.']]};}
  const b=rand(2,10),hh=rand(2,10),L=rand(3,15);return {q:`A triangular prism has a triangular base with base ${b} and height ${hh}. The prism is ${L} long. Find its volume.`,fields:[{label:'V =',answer:b*hh*L/2}],raw:true,hint:'B = ½ · base · height, then V = B · length.',sol:[[`B = ½ · ${b} · ${hh} = ${b*hh/2}`,'Triangle area.'],[`V = ${b*hh/2} · ${L} = ${b*hh*L/2}`,'V = Bh.']]};},
 check:[
  {q:'Cylinder r = 2, h = 10. V = ?',o:['20π','40π','4π','400π'],a:1,why:'π · 4 · 10.'},
  {q:'A cube with side 3 has volume…',o:['9','18','27','54'],a:2,why:'3³.'},
  {q:'V = Bh works for…',o:['prisms and cylinders','cones only','spheres','pyramids only'],a:0,why:'Solids with the same cross section all the way up.'}]
};

L['GEO-9-3']={
 goal:'I can find the volume of pyramids, cones, and spheres.',
 life:{title:'Ice cream and basketballs',html:'A waffle cone of radius 3 cm and height 12 cm holds ⅓π(3²)(12) = 36π ≈ 113 cm³ of ice cream. A basketball (radius about 12 cm) holds ⁴⁄₃π(12³) ≈ 7,238 cm³ of air.'},
 see:[{title:'Where the ⅓ comes from',hint:'Compare each solid with its matching container.',mount:mountThird}],
 vocab:[['Pyramid','V = ⅓ Bh.'],['Cone','V = ⅓ πr²h.'],['Sphere','V = ⁴⁄₃ πr³.'],['Hemisphere','Half a sphere: ⅔ πr³.'],['Height','Always the perpendicular height, not the slant height.']],
 examples:[
  {title:'Example 1 — Square pyramid',prob:'Base 6 × 6, height 10.',raw:true,lines:[['B = 36','Square base.'],['V = ⅓ · 36 · 10 = 120','⅓ Bh.']]},
  {title:'Example 2 — Sphere',prob:'Radius 3.',raw:true,lines:[['V = ⁴⁄₃ π (27)','r³ = 27.'],['= 36π ≈ 113.10','Simplify.']]}],
 mistake:{bad:'Cone: use the slant height',good:'Use the perpendicular height',why:'The volume formula needs how tall the cone stands straight up. If you only know the slant height, use the Pythagorean Theorem first.'},
 practice(){const t=rand(0,2);
  if(t===0){const s=rand(2,12),h=3*rand(1,6);return {q:`A square pyramid has base edge ${s} and height ${h}. Find its volume.`,fields:[{label:'V =',answer:s*s*h/3}],raw:true,hint:'V = ⅓ Bh.',sol:[[`B = ${s*s}`,'Square base.'],[`V = ⅓ · ${s*s} · ${h} = ${s*s*h/3}`,'⅓ Bh.']]};}
  if(t===1){const r=rand(1,9),h=rand(2,15),V=PI*r*r*h/3;return {q:`A cone has radius ${r} and height ${h}. Find its volume to the nearest hundredth.`,fields:[{label:'V ≈',answer:rd(V,2),tol:0.011}],raw:true,hint:'V = ⅓ πr²h.',sol:[[`V = ⅓ π(${r*r})(${h}) = ${rd(r*r*h/3,4)}π`,'Formula.'],[`≈ ${rd(V,2)}`,'Decimal.']]};}
  const r=rand(1,10),V=4/3*PI*r**3;return {q:`A sphere has radius ${r}. Find its volume to the nearest hundredth.`,fields:[{label:'V ≈',answer:rd(V,2),tol:0.011}],raw:true,hint:'V = ⁴⁄₃ πr³.',sol:[[`V = ⁴⁄₃ π(${r**3}) = ${rd(4*r**3/3,4)}π`,'Formula.'],[`≈ ${rd(V,2)}`,'Decimal.']]};},
 check:[
  {q:'A cone and a cylinder have the same base and height. The cone’s volume is…',o:['the same','half','one third','twice'],a:2,why:'⅓ πr²h.'},
  {q:'Sphere with r = 3. V = ?',o:['36π','12π','27π','108π'],a:0,why:'⁴⁄₃ · 27 = 36.'},
  {q:'Pyramid with B = 50 and h = 6. V = ?',o:['300','100','150','56'],a:1,why:'⅓ · 300.'}]
};

L['GEO-9-4']={
 goal:'I can use Cavalieri’s Principle to explain why oblique solids have the same volume formulas.',
 life:{title:'A leaning stack of coins',html:'Push a neat stack of coins so it leans. It looks different, but it’s the same coins — the same volume. That idea, Cavalieri’s Principle, is why a leaning (oblique) cylinder still has V = πr²h.'},
 see:[{title:'Slide the layers',hint:'Change the slant. The amount of material does not change.',mount:mountCav}],
 vocab:[['Cavalieri’s Principle','Same height + same cross-section area at every level → same volume.'],['Oblique solid','Its sides lean; the top is shifted from the base.'],['Right solid','The sides are perpendicular to the base.'],['Height','Use the perpendicular height, not the slanted edge.']],
 examples:[
  {title:'Example 1 — Oblique cylinder',prob:'An oblique cylinder has r = 4 and perpendicular height 9 (slanted side 11).',raw:true,lines:[['V = π(4²)(9)','Cavalieri: same as a right cylinder with h = 9.'],['= 144π ≈ 452.39','Ignore the slanted 11.']]},
  {title:'Example 2 — Compare',prob:'Solid A and solid B have the same height, and every horizontal slice of each has area 20 cm². Height 15 cm.',raw:true,lines:[['V = 20 · 15 = 300 cm³ for both','Cavalieri’s Principle.']]}],
 mistake:{bad:'Oblique cylinder: h = slanted side length',good:'h = perpendicular height',why:'Leaning the layers doesn’t make the stack taller. Measure straight up from the base plane.'},
 practice(){const t=rand(0,2);
  if(t===0){const r=rand(2,8),h=rand(3,12),sl=h+rand(1,4),V=PI*r*r*h;return {q:`An oblique cylinder has radius ${r}, perpendicular height ${h}, and slanted side ${sl}. Find its volume to the nearest hundredth.`,fields:[{label:'V ≈',answer:rd(V,2),tol:0.011}],raw:true,hint:'Use the perpendicular height.',sol:[[`V = π(${r*r})(${h}) = ${r*r*h}π`,'Cavalieri: V = Bh.'],[`≈ ${rd(V,2)}`,'Decimal.']]};}
  if(t===1){const B=rand(5,40),h=rand(3,20);return {q:`Two solids both have height ${h}, and every cross section parallel to the base has area ${B}. One is a right prism. What is the volume of the other (an oblique solid)?`,fields:[{label:'V =',answer:B*h}],raw:true,hint:'Cavalieri’s Principle.',sol:[[`${B} · ${h} = ${B*h}`,'Same volume.']]};}
  const m=mcU('They have equal volumes',['They have equal volumes','The oblique one is bigger','The right one is bigger','You can’t compare them']);return {type:'mc',q:'A right prism and an oblique prism have congruent bases and the same perpendicular height. Compare their volumes.',opts:m.opts,a:m.a,why:'Same cross-section area at every height → same volume.'};},
 check:[
  {q:'Cavalieri’s Principle needs the same height and…',o:['the same surface area','the same cross-section area at every level','the same slant','the same shape'],a:1,why:'Equal slices at every level.'},
  {q:'Oblique cylinder: r = 3, height 10, slant 12. V = ?',o:['90π','108π','30π','120π'],a:0,why:'π · 9 · 10.'},
  {q:'Leaning a stack of 20 coins changes its…',o:['volume','shape only','mass','number of coins'],a:1,why:'Same coins, same volume.'}]
};

L['GEO-9-5']={
 goal:'I can use density (mass per volume, or people per area) to solve modeling problems.',
 life:{title:'Will it float? How crowded is it?',html:'Ice (0.92 g/cm³) floats on water (1 g/cm³); iron (7.87 g/cm³) sinks. Cities use population density — people per square mile — to plan buses and schools. Both are “how much stuff per unit of space.”'},
 see:[{title:'Mass ÷ volume',hint:'Change the mass and the volume. Which material is it?',mount:mountDens}],
 vocab:[['Density','mass ÷ volume (g/cm³, kg/m³).'],['Rearranged','mass = density × volume; volume = mass ÷ density.'],['Population density','people ÷ area (people per mi²).'],['Floats / sinks','Less dense than the liquid → floats.']],
 examples:[
  {title:'Example 1 — Identify the metal',prob:'A 5 cm × 2 cm × 2 cm block has mass 54 g.',raw:true,lines:[['V = 20 cm³','Rectangular prism.'],['d = 54 ÷ 20 = 2.7 g/cm³','Mass ÷ volume.'],['aluminum','Matches 2.7.']]},
  {title:'Example 2 — Population',prob:'A town of 18,000 people covers 12 mi².',raw:true,lines:[['18,000 ÷ 12 = 1,500','People per square mile.']]}],
 mistake:{bad:'density = volume ÷ mass',good:'density = mass ÷ volume',why:'Units help: g/cm³ means grams <b>per</b> cubic centimeter — grams on top.'},
 practice(){const t=rand(0,2);
  if(t===0){const l=rand(2,6),w=rand(2,6),h=rand(2,6),d=pick([0.5,0.92,1,2.7,7.87,8.96]),V=l*w*h,m=rd(V*d,2);return {q:`A ${l} cm × ${w} cm × ${h} cm block has mass ${m} g. Find its density (g/cm³).`,fields:[{label:'density =',answer:d,tol:0.011,unit:'g/cm³'}],raw:true,hint:'Volume first, then mass ÷ volume.',sol:[[`V = ${V} cm³`,'lwh.'],[`d = ${m} ÷ ${V} = ${d}`,'Density.']]};}
  if(t===1){const p=rand(20,300)*100,a=pick([4,5,8,10,12,20,25]);return {q:`A town has ${p.toLocaleString('en-US')} people living on ${a} square miles. Find the population density.`,fields:[{label:'density =',answer:p/a,unit:'people/mi²',tol:0.6}],raw:true,hint:'People ÷ area.',sol:[[`${p} ÷ ${a} = ${rd(p/a,1)}`,'People per square mile.']]};}
  const r=rand(1,5),d=pick([2.7,7.87,19.3]),V=4/3*PI*r**3,m=V*d;return {q:`A solid metal ball has radius ${r} cm and density ${d} g/cm³. Find its mass to the nearest gram.`,fields:[{label:'mass ≈',answer:Math.round(m),unit:'g',tol:1.01}],raw:true,hint:'Volume of a sphere, then multiply by density.',sol:[[`V = ⁴⁄₃π(${r}³) ≈ ${rd(V,2)} cm³`,'Sphere.'],[`m ≈ ${rd(V,2)} × ${d} ≈ ${Math.round(m)} g`,'mass = density × volume.']]};},
 check:[
  {q:'Mass 60 g, volume 20 cm³. Density?',o:['3 g/cm³','1200 g/cm³','0.33 g/cm³','80 g/cm³'],a:0,why:'60 ÷ 20.'},
  {q:'Which floats in water?',o:['iron (7.87)','aluminum (2.7)','cork (0.24)','copper (8.96)'],a:2,why:'Less than 1 g/cm³.'},
  {q:'5,000 people in 2 mi². Density?',o:['2,500 per mi²','10,000 per mi²','5,002','2,500 mi²'],a:0,why:'5,000 ÷ 2.'}]
};
})();
