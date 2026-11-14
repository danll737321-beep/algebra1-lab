/* Statistics & Probability · Unit 3 · The normal distribution */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser}=A2;const S=ST;
function mZ(el){sliders(el,[{k:'m',l:'mean μ',min:50,max:90,v:70},{k:'s',l:'SD σ',min:2,max:15,v:8},{k:'x',l:'score x',min:30,max:110,v:86}],V=>{const z=(V.x-V.m)/V.s;
 $('.z-g',el).innerHTML=S.normalFig(V.m,V.s,null,null,{extra:(A,b,py)=>V.x>=V.m-4*V.s&&V.x<=V.m+4*V.s?`<line x1="${A.X(V.x)}" y1="${py(V.x)-20}" x2="${A.X(V.x)}" y2="${b}" stroke="#e11d48" stroke-width="3"/><text x="${A.X(V.x)}" y="${py(V.x)-26}" text-anchor="middle" font-weight="800" fill="#e11d48">x = ${V.x}</text>`:''});
 $('.z-r',el).innerHTML=`<div class="eqline math">z = (x − μ)/σ = (${V.x} − ${V.m})/${V.s} = <b>${nf(+z.toFixed(3))}</b></div>The score is <b>${nf(Math.abs(+z.toFixed(2)))} standard deviations ${z>=0?'above':'below'}</b> the mean. <span class="mute">Ticks on the axis are 1σ apart, so you can count z directly.</span>`;},`<div class="z-g"></div><div class="readout z-r"></div>`).run();}
function mEmp(el){chooser(el,[1,2,3].map(k=>({t:`within ${k}σ`,html:()=>S.normalFig(100,15,100-k*15,100+k*15)+`<div class="readout">About <b>${[68,95,99.7][k-1]}%</b> of values are within ${k} SD of the mean: between ${100-k*15} and ${100+k*15} (μ = 100, σ = 15).<br><span class="mute">Each tail outside holds ${[16,2.5,0.15][k-1]}%. Use symmetry: half of ${[68,95,99.7][k-1]}% is on each side of the mean.</span></div>`})));}
function mArea(el){sliders(el,[{k:'a',l:'from a',min:40,max:160,v:85},{k:'b',l:'to b',min:40,max:160,v:115}],V=>{const a=Math.min(V.a,V.b),b=Math.max(V.a,V.b),m=100,s=15;const p=S.ncdf(b,m,s)-S.ncdf(a,m,s);
 $('.ar-g',el).innerHTML=S.normalFig(m,s,a,b);
 $('.ar-r',el).innerHTML=`P(${a} &lt; X &lt; ${b}) = <b>${S.pct(p)}</b> &nbsp; (z from ${nf(+((a-m)/s).toFixed(2))} to ${nf(+((b-m)/s).toFixed(2))})<br>Percentile of ${b}: <b>${nf(+(S.ncdf(b,m,s)*100).toFixed(1))}th</b> — that share of values is below it.<br><span class="mute">The total area under the curve is 1 (100%). On a calculator: normalcdf(${a}, ${b}, 100, 15).</span>`;},`<div class="ar-g"></div><div class="readout ar-r"></div>`).run();}

L['ST-3-1']={goal:'I can compute and interpret z-scores to compare values from different distributions.',
 life:{title:'Which test went better?',html:'You scored 86 in math (class mean 70, SD 8) and 90 in English (mean 85, SD 4). Raw scores say English. But <b>z-scores</b> say math: z = 2 versus z = 1.25. You were further above your classmates in math.'},
 see:[{title:'z-score on the curve',hint:'Move the score, the mean, and the SD.',mount:mZ}],
 vocab:[['z-score','z = (x − μ)/σ: how many SDs a value is from the mean.'],['Positive z','Above the mean.'],['Standardizing','Turning values into z-scores so different scales can be compared.']],
 examples:[ex('Example 1','Heights: μ = 64 in, σ = 3 in. z for 70 in?',[['(70 − 64)/3 = 2','Two SDs above.']]),
  ex('Example 2','z = −1.5, μ = 50, σ = 4. Find x.',[['x = μ + zσ = 50 − 6 = 44','Undo the formula.']])],
 mistake:{bad:'z = (μ − x)/σ',good:'(x − μ)/σ',why:'Value minus mean, so values above the mean get a <b>positive</b> z.'},
 practice(){const m=rand(40,90),s=rand(2,12),z=pick([-2.5,-2,-1.5,-1,-0.5,0.5,1,1.5,2,2.5,3]);const x=m+z*s;if(Math.random()<.5)return num(`μ = ${m}, σ = ${s}. Find the z-score of x = ${nf(x)}.`,[['z =',z,0.011]],'z = (x − μ)/σ.',[[`(${nf(x)} − ${m})/${s} = ${z}`,'']]);
  return num(`μ = ${m}, σ = ${s}. Which value has z = ${z}?`,[['x =',x,0.011]],'x = μ + zσ.',[[`${m} + ${P(z)}·${s} = ${nf(x)}`,'']]);},
 check:[q('z = 0 means the value is…',['0','the mean','an outlier','1 SD above'],1,''),q('μ = 10, σ = 2. z of 7?',['−1.5','1.5','−3','3'],0,''),q('Which is more unusual?',['z = 1.8','z = −2.4','z = 0.5','z = 2'],1,'Largest |z|.')]};

L['ST-3-2']={goal:'I can use the empirical rule (68–95–99.7) to estimate percents in a normal distribution.',
 life:{title:'IQ scores',html:'IQ scores are designed to be normal with mean 100 and SD 15. Without any calculator you can say: about 68% of people score 85–115, about 95% score 70–130, and almost everyone (99.7%) scores 55–145.'},
 see:[{title:'Shade 1, 2, 3 SDs',hint:'Click each band.',mount:mEmp}],
 vocab:[['Normal distribution','Symmetric, bell-shaped, mean = median.'],['Empirical rule','≈68% within 1σ, 95% within 2σ, 99.7% within 3σ.'],['Tail','The region beyond some value on one side.']],
 examples:[ex('Example','μ = 100, σ = 15. Percent above 130?',[['130 is 2σ above','z = 2.'],['95% between 70 and 130 → 5% outside','Two tails.'],['half → 2.5% above 130','Symmetry.']])],
 mistake:{bad:'68% are above the mean + 1σ',good:'68% are between μ − σ and μ + σ',why:'The 68% is the <b>middle</b> band; only 16% are above μ + σ.'},
 practice(){const m=rand(5,20)*10,s=rand(2,10);const t=pick([['between',-1,1,68],['between',-2,2,95],['between',-3,3,99.7],['above',1,null,16],['above',2,null,2.5],['below',-1,null,16],['below',-2,null,2.5],['between',0,1,34],['between',-2,0,47.5]]);
  const txt=t[0]==='between'?`between ${m+t[1]*s} and ${m+t[2]*s}`:`${t[0]} ${m+t[1]*s}`;return num(`A normal distribution has μ = ${m} and σ = ${s}. About what percent of values are ${txt}?`,[['percent ≈',t[3],0.01]],'Convert to SDs from the mean; use 68–95–99.7 and symmetry.',[[`${t[0]==='between'?`${t[1]}σ to ${t[2]}σ`:`${t[0]} ${t[1]}σ`}`,'In SD units.'],[`≈ ${t[3]}%`,'Empirical rule.']]);},
 check:[q('% within 2σ?',['68%','95%','99.7%','50%'],1,''),q('% above the mean?',['34%','50%','68%','16%'],1,'Symmetric.'),q('% between μ and μ + σ?',['68%','34%','16%','47.5%'],1,'')]};

L['ST-3-3']={goal:'I can find areas (probabilities) and percentiles under a normal curve.',
 life:{title:'Will the cereal box pass?',html:'A factory fills boxes with mean 16 oz and SD 0.2 oz. What fraction of boxes are under 15.7 oz? That’s an <b>area under the normal curve</b> to the left of 15.7: z = −1.5, about 6.7%.'},
 see:[{title:'Shade an area',hint:'Move a and b. Read the probability and the percentile.',mount:mArea}],
 vocab:[['Area = probability','The shaded area is the chance a value falls in that range.'],['Percentile','Percent of values below a given value.'],['normalcdf','Calculator command for area between two values.']],
 examples:[ex('Example 1','μ = 16, σ = 0.2. P(X < 15.7)?',[['z = −1.5','Standardize.'],['area left of −1.5 ≈ 0.0668','Table or calculator.'],['≈ 6.7% of boxes','']]),
  ex('Example 2','What score is the 90th percentile? μ = 500, σ = 100',[['z ≈ 1.28 has 90% below','Inverse normal.'],['x = 500 + 1.28·100 = 628','']])],
 mistake:{bad:'P(X < 120) = 120%',good:'an area between 0 and 1',why:'Probabilities are areas — always between 0 and 1 (0% to 100%).'},
 practice(){const m=rand(5,20)*10,s=rand(5,20),z=pick([-2,-1.5,-1,-0.5,0.5,1,1.5,2]),x=m+z*s;const p=S.ncdf(z);if(Math.random()<.6)return num(`X is normal with μ = ${m}, σ = ${s}. Find P(X &lt; ${nf(x)}) as a percent (nearest tenth).`,[['percent ≈',+(p*100).toFixed(1),0.15]],'Find z, then the area to the left.',[[`z = (${nf(x)} − ${m})/${s} = ${z}`,'Standardize.'],[`area ≈ ${(p*100).toFixed(1)}%`,'normalcdf.']]);
  const pc=pick([10,25,50,75,90,95]);const zz=S.invN(pc/100);return num(`μ = ${m}, σ = ${s}. Find the ${pc}th percentile (nearest tenth).`,[['x ≈',+(m+zz*s).toFixed(1),0.25]],'Find z with that area to the left (invNorm), then x = μ + zσ.',[[`z ≈ ${zz.toFixed(3)}`,'Inverse normal.'],[`x ≈ ${(m+zz*s).toFixed(1)}`,'']]);},
 check:[q('Total area under a normal curve?',['100','1','0.5','depends'],1,''),q('P(z < 0) = ?',['0','0.5','1','0.68'],1,''),q('The 50th percentile of a normal distribution is the…',['mean','Q3','SD','max'],0,'')]};

TOOLS['ST-3']={title:'Normal curve areas',hint:'Shade a range and read the probability and percentile.',mount:mArea};
})();
