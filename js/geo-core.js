/* Geometry · shared helpers (loaded before any Geometry module) */
function rd(v,n=1){const f=10**n;return Math.round((+v+Number.EPSILON)*f)/f;}
function XYs(p){return `(${fmtNeg(rd(p[0],2))}, ${fmtNeg(rd(p[1],2))})`;}
const R9=v=>Math.abs(v)<1e-9?0:Math.round(v*1e9)/1e9;
/* transformations on points [x,y] */
function tT(p,a,b){return [p[0]+a,p[1]+b];}
function tR(p,deg,c=[0,0]){const t=deg*Math.PI/180,x=p[0]-c[0],y=p[1]-c[1];return [R9(c[0]+x*Math.cos(t)-y*Math.sin(t)),R9(c[1]+x*Math.sin(t)+y*Math.cos(t))];}
function tF(p,ax){const [x,y]=p;if(ax==='x')return [x,-y];if(ax==='y')return [-x,y];if(ax==='y=x')return [y,x];if(ax==='y=-x')return [-y,-x];if(ax.x!==undefined)return [2*ax.x-x,y];if(ax.y!==undefined)return [x,2*ax.y-y];return p;}
function tD(p,k,c=[0,0]){return [R9(c[0]+k*(p[0]-c[0])),R9(c[1]+k*(p[1]-c[1]))];}
function dist2(a,b){return Math.hypot(a[0]-b[0],a[1]-b[1]);}
function midp(a,b){return [(a[0]+b[0])/2,(a[1]+b[1])/2];}
/* drawing on a coordinate grid G (from grid()) */
const VN=['A','B','C','D','E','F'];
function gPoly(G,pts,o={}){const {fill='rgba(37,99,235,.18)',stroke='#2563eb',dash='',names=null,prime='',lc=stroke,w=3}=o;
 let s=`<polygon points="${pts.map(p=>G.X(p[0])+','+G.Y(p[1])).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''} stroke-linejoin="round"/>`;
 if(names){const c=pts.reduce((a,p)=>[a[0]+p[0]/pts.length,a[1]+p[1]/pts.length],[0,0]);
  pts.forEach((p,i)=>{let dx=p[0]-c[0],dy=p[1]-c[1];const m=Math.hypot(dx,dy)||1;dx/=m;dy/=m;s+=`<circle cx="${G.X(p[0])}" cy="${G.Y(p[1])}" r="4" fill="${lc}"/><text x="${G.X(p[0])+dx*15}" y="${G.Y(p[1])-dy*15+5}" text-anchor="middle" font-size="14" font-weight="800" fill="${lc}" paint-order="stroke" stroke="#fff" stroke-width="4">${names[i]}${prime}</text>`;});}
 return s;}
function gSeg(G,a,b,col='#374151',w=2,dash=''){return `<line x1="${G.X(a[0])}" y1="${G.Y(a[1])}" x2="${G.X(b[0])}" y2="${G.Y(b[1])}" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''} stroke-linecap="round"/>`;}
function gTxt(G,x,y,t,col='#374151',sz=13){return `<text x="${G.X(x)}" y="${G.Y(y)}" font-size="${sz}" font-weight="700" fill="${col}" text-anchor="middle" paint-order="stroke" stroke="#fff" stroke-width="4">${t}</text>`;}
function gArrow(G,a,b,col='#ea580c'){const id='ar'+(++GID);return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${col}"/></marker></defs><line x1="${G.X(a[0])}" y1="${G.Y(a[1])}" x2="${G.X(b[0])}" y2="${G.Y(b[1])}" stroke="${col}" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#${id})"/>`;}
function gCirc(G,c,r,col='#2563eb',fill='none',w=3){return `<ellipse cx="${G.X(c[0])}" cy="${G.Y(c[1])}" rx="${r*G.u}" ry="${r*G.uy}" fill="${fill}" stroke="${col}" stroke-width="${w}"/>`;}
/* free figures (pixel coordinates, y down) */
function svgF(W,H,inner,max){return `<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${max||W}px">${inner}</svg>`;}
function fL(a,b,col='#1f2937',w=3,dash=''){return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''} stroke-linecap="round"/>`;}
function fT(x,y,t,o={}){const {col='#1f2937',sz=15,a='middle',w=700}=o;return `<text x="${x}" y="${y}" font-size="${sz}" font-weight="${w}" fill="${col}" text-anchor="${a}" paint-order="stroke" stroke="#fff" stroke-width="4">${t}</text>`;}
function fP(pts,fill='rgba(37,99,235,.12)',stroke='#1f2937',w=3){return `<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"/>`;}
function fDot(p,col='#1f2937',r=5){return `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${col}"/>`;}
/* angle arc at vertex V between rays to P and Q (pixel coords) */
function fA(V,P,Q,r=26,col='#ea580c',lab=''){const a1=Math.atan2(P[1]-V[1],P[0]-V[0]),a2=Math.atan2(Q[1]-V[1],Q[0]-V[0]);let d=a2-a1;while(d<=-Math.PI)d+=2*Math.PI;while(d>Math.PI)d-=2*Math.PI;
 const s=[V[0]+r*Math.cos(a1),V[1]+r*Math.sin(a1)],e=[V[0]+r*Math.cos(a1+d),V[1]+r*Math.sin(a1+d)],m=a1+d/2;
 return `<path d="M${s[0]} ${s[1]} A${r} ${r} 0 0 ${d>0?1:0} ${e[0]} ${e[1]}" fill="none" stroke="${col}" stroke-width="2.5"/>`+(lab?fT(V[0]+(r+16)*Math.cos(m),V[1]+(r+16)*Math.sin(m)+5,lab,{col,sz:14}):'');}
function fRt(V,P,Q,s=13,col='#1f2937'){const u=(A)=>{const d=Math.hypot(A[0]-V[0],A[1]-V[1]);return [(A[0]-V[0])/d*s,(A[1]-V[1])/d*s];};const a=u(P),b=u(Q);
 return `<path d="M${V[0]+a[0]} ${V[1]+a[1]} L${V[0]+a[0]+b[0]} ${V[1]+a[1]+b[1]} L${V[0]+b[0]} ${V[1]+b[1]}" fill="none" stroke="${col}" stroke-width="2"/>`;}
function fTk(a,b,n=1,col='#1f2937'){const m=[(a[0]+b[0])/2,(a[1]+b[1])/2],d=Math.hypot(b[0]-a[0],b[1]-a[1]),u=[(b[0]-a[0])/d,(b[1]-a[1])/d],p=[-u[1]*8,u[0]*8];let s='';
 for(let i=0;i<n;i++){const o=(i-(n-1)/2)*6,c=[m[0]+u[0]*o,m[1]+u[1]*o];s+=fL([c[0]-p[0],c[1]-p[1]],[c[0]+p[0],c[1]+p[1]],col,2.5);}return s;}
/* side label placed outside polygon edge a→b (centroid C) */
function fSide(a,b,C,t,col='#1f2937',off=16){const m=[(a[0]+b[0])/2,(a[1]+b[1])/2];let dx=m[0]-C[0],dy=m[1]-C[1];const d=Math.hypot(dx,dy)||1;return fT(m[0]+dx/d*off,m[1]+dy/d*off+5,t,{col,sz:15});}
function cen(pts){return pts.reduce((a,p)=>[a[0]+p[0]/pts.length,a[1]+p[1]/pts.length],[0,0]);}
function fVert(pts,names,col='#1f2937'){const C=cen(pts);return pts.map((p,i)=>{let dx=p[0]-C[0],dy=p[1]-C[1];const d=Math.hypot(dx,dy)||1;return fT(p[0]+dx/d*16,p[1]+dy/d*16+5,names[i],{col,sz:16});}).join('');}
/* multiple choice with unique options */
function mcU(correct,wrongs){const seen=new Set([String(correct)]),w=[];for(const x of wrongs){const k=String(x);if(!seen.has(k)){seen.add(k);w.push(x);}if(w.length===3)break;}return mcFrom(correct,w);}
function mcNum(correct,wrongs,fmt=v=>fmtNeg(v)){return mcU(fmt(correct),wrongs.filter(v=>isFinite(v)).map(fmt));}
/* slider html + binding */
function ctl(id,lab,min,max,val,step=1){return `<label>${lab} <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><b id="${id}v"></b></label>`;}
function onIn(el,ids,cb){ids.forEach(i=>$('#'+i,el).addEventListener('input',cb));}
function vals(el,ids){return ids.map(i=>+$('#'+i,el).value);}
function btns(list,attr='data-k'){return `<div class="row">${list.map((t,i)=>`<button ${attr}="${i}">${t}</button>`).join('')}</div>`;}
function onBtn(el,cb,attr='k'){el.addEventListener('click',e=>{const b=e.target.closest(`[data-${attr}]`);if(!b||!el.contains(b))return;$$(`[data-${attr}]`,el).forEach(x=>x.classList.toggle('sel',x===b));cb(+b.dataset[attr]);});}
function selBtn(el,i,attr='k'){$$(`[data-${attr}]`,el).forEach(x=>x.classList.toggle('sel',+x.dataset[attr]===i));}
const DEG='°',SQ='√';
function sqrtS(n){/* simplest radical form of √n */let a=1,b=n;for(let k=Math.floor(Math.sqrt(n));k>1;k--)if(n%(k*k)===0){a=k;b=n/(k*k);break;}return b===1?String(a):(a===1?'':a)+SQ+b;}
