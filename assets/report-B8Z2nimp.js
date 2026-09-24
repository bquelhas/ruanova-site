import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _}from"./index-BEVSC0vH.js";var v=e=>e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),y=[[`Espaço para peões`,e=>e.area.peao,`m²`],[`Espaço para automóveis`,e=>e.area.auto,`m²`],[`Espaço para bicicletas`,e=>e.area.bici,`m²`],[`Faixas BUS (área)`,e=>e.area.bus,`m²`],[`Metro/elétrico (área)`,e=>e.area.tp,`m²`],[`Área verde`,e=>e.area.verde,`m²`],[`Árvores`,e=>e.trees,``],[`Lugares de estacionamento`,e=>e.parking,``],[`Faixa BUS (extensão)`,e=>e.busKm*1e3,`m`],[`Ciclovia (extensão)`,e=>e.bikeKm*1e3,`m`]],b={nenhum:`sem sinal`,prioridade:`prioridade`,cedencia:`cedência`,stop:`STOP`,semaforo:`semáforo`},x=e=>e.direction===`forward`?` ↑`:e.direction===`backward`?` ↓`:e.direction===`both`?` ↕`:``,S=t=>t.map(t=>`${e[t.type].label.toLowerCase()} ${_(t.width)}${x(t)}`).join(` · `);function C(n,a,c={},m=new Date){let x=n.proposal,C=r(x,a),w=n.current&&n.current.roads.length?r(n.current,a):null,T=(e,t)=>{let n=e.roads.findIndex(e=>e.id===t);return e.roads[n]?.name||`Rua ${n+1}`},E=y.map(([e,t,n])=>{let r=t(C.stats),i=w?t(w.stats):null,a=i===null?``:r-i,o=a===``?``:`${a>0?`+`:a<0?`−`:``}${_(Math.abs(a),0)}`;return`<tr><td>${e}</td>${w?`<td class="n">${_(i,0)}</td>`:``}<td class="n">${_(r,0)}</td>${w?`<td class="n ${a!==``&&a>0?`up`:a!==``&&a<0?`down`:``}">${o}</td>`:``}<td>${n}</td></tr>`}).join(``),D=e=>{let t=[[`Peões`,e.area.peao,`#d9d1c1`],[`Bicicleta`,e.area.bici,`#b0473f`],[`BUS`,e.area.bus,`#b5553c`],[`Metro/elétrico`,e.area.tp,`#7d7a70`],[`Automóvel`,e.area.auto,`#4a4d52`]],n=t.reduce((e,t)=>e+t[1],0);return n?`<div class="bar">${t.filter(e=>e[1]>0).map(([e,t,r])=>`<span style="flex-grow:${t};background:${r}" title="${e}">${t/n>=.08?`${e} ${Math.round(t/n*100)}%`:``}</span>`).join(``)}</div>`:``},O=x.roads.map(e=>{let t=g(x,e,a),n=l(o(e.profile)),r=u(e.profile),i=Object.keys(r).filter(e=>r[e]>0).map(e=>`${h[e]} ${_(r[e],0)}`).join(`, `),s=e.level===1?`elevada`:e.level===-1?`subterrânea`:``;return`<tr><td>${v(T(x,e.id))}${s?` <span class="tag">${s}</span>`:``}</td><td class="n">${_(t,0)} m</td><td class="n">${_(n.left-n.right)} m</td><td class="n">${f(e)}</td><td class="n">${_(p(r),0)}</td><td class="small">${i}</td></tr>`}).join(``),k=new Map;for(let e of x.roads){let t=[[e.profile,T(x,e.id)],...(e.sections??[]).map((t,n)=>[t.profile,`${T(x,e.id)}, troço ${n+2} (a ${_(t.at,0)} m)`])];for(let[e,n]of t){let t=JSON.stringify(e.map(e=>[e.type,e.width,e.direction]));k.has(t)||k.set(t,{profile:e,where:[]}),k.get(t).where.push(n)}}let A=[...k.values()].map(({profile:e,where:t})=>`
    <figure class="section">
      ${d(e,t[0]).replace(/^<\?xml[^>]*>/,``)}
      <figcaption><b>${v(t.slice(0,4).join(`; `))}${t.length>4?` e mais ${t.length-4}`:``}</b><br><span class="small">${v(S(e))}</span></figcaption>
    </figure>`).join(``),j=new Map;for(let e of x.roads)for(let t of[e.nodeA,e.nodeB])j.set(t,(j.get(t)??0)+1);let M=x.nodes.filter(e=>e.roundabout||(j.get(e.id)??0)>=3),N=M.map(e=>{let t=i(x,e.id,a),n=[...new Set(t.map(e=>T(x,e.road.id)))].join(`, `),r;r=e.roundabout?`Rotunda (raio ${_(e.roundabout.radius,1)} m, anel ${_(e.roundabout.ring,1)} m)`:`Cruzamento de ${t.length} braços${e.raised?`, elevado`:``}`;let o=new Map;for(let n of t){let t=e.control?.[n.key]??(e.roundabout?`cedencia`:`nenhum`);o.set(b[t],(o.get(b[t])??0)+1)}let s=[...o].map(([e,t])=>`${e} ×${t}`).join(`, `),c=Object.values(e.control??{}).includes(`semaforo`)?` · fase de ${e.signalCycle??25} s`:``,l=C.nodeUI.get(e.id),u=l?l.crossings.filter(e=>e.type!==`nenhuma`):[],d=u.reduce((e,t)=>Math.max(e,t.width),0),f=u.length?`${u.length} passadeira(s), a mais longa com ${_(d,1)} m (${_(d/1,0)} s a 1 m/s)`:`sem passadeiras`;return`<tr><td>${v(n)}</td><td>${r}</td><td>${s}${c}</td><td class="small">${f}</td></tr>`}).join(``),P=new Set(n.ignored??[]),F=t(x,a,n.buildings??[]).filter(e=>!P.has(s(e))),I=F.length?`<ul>${F.slice(0,60).map(e=>`<li>${v(e.msg)}${e.roadId?` <span class="small">(${v(T(x,e.roadId))})</span>`:``}</li>`).join(``)}${F.length>60?`<li>… e mais ${F.length-60}</li>`:``}</ul>`:`<p>Sem problemas por resolver.</p>`,L=[...new Set(x.roads.flatMap(e=>[e.profile,...(e.sections??[]).map(e=>e.profile)]).flat().map(e=>e.type))].filter(t=>e[t].ref).map(t=>`<li><b>${e[t].label}</b>: ${v(e[t].ref)}</li>`).join(``),R=m.toLocaleDateString(`pt-PT`,{day:`numeric`,month:`long`,year:`numeric`}),z=[c.before&&`<figure><img src="${c.before}" alt="Antes"><figcaption>Antes (estado atual)</figcaption></figure>`,c.after&&`<figure><img src="${c.after}" alt="Depois"><figcaption>${c.before?`Depois (proposta)`:`Proposta`}</figcaption></figure>`,c.view3d&&`<figure class="wide"><img src="${c.view3d}" alt="Vista 3D"><figcaption>Proposta em 3D</figcaption></figure>`].filter(Boolean).join(``);return`<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${v(n.name)} · relatório</title>
<style>
  :root { --ink: #1c1d1f; --muted: #666a70; --line: #d8d6d0; --accent: #b8860b; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, -apple-system, 'Segoe UI', sans-serif; color: var(--ink); background: #fff; }
  main { max-width: 980px; margin: 0 auto; padding: 32px 24px 64px; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  h2 { font-size: 18px; margin: 36px 0 10px; padding-bottom: 4px; border-bottom: 2px solid var(--ink); break-after: avoid; }
  .meta { color: var(--muted); margin: 0 0 16px; }
  .desc { white-space: pre-wrap; }
  table { border-collapse: collapse; width: 100%; }
  th, td { text-align: left; padding: 5px 8px; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--muted); }
  td.n, th.n { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .up { color: #1e7a3c; } .down { color: #b3261e; }
  .small { font-size: 12px; color: var(--muted); }
  .tag { font-size: 11px; background: #eee; border-radius: 4px; padding: 0 5px; color: #444; }
  .imgs { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; }
  figure { margin: 0; break-inside: avoid; }
  .imgs figure.wide { grid-column: 1 / -1; }
  .imgs figure.wide img { max-height: 340px; object-fit: cover; }
  figure img { width: 100%; display: block; border-radius: 6px; border: 1px solid var(--line); }
  figcaption { font-size: 13px; margin-top: 4px; }
  .bar { display: flex; height: 26px; border-radius: 5px; overflow: hidden; margin: 6px 0 2px; font-size: 11px; }
  .bar span { display: flex; align-items: center; justify-content: center; color: #fff; text-shadow: 0 0 3px #000; white-space: nowrap; overflow: hidden; }
  .section { margin: 14px 0 22px; }
  .section svg { width: 100%; height: auto; max-height: 260px; }
  .toolbar { position: sticky; top: 0; background: #fff; border-bottom: 1px solid var(--line); padding: 8px 24px; display: flex; gap: 8px; justify-content: flex-end; z-index: 1; }
  .toolbar button { font: inherit; padding: 6px 14px; border-radius: 6px; border: 1px solid #999; background: #fff; cursor: pointer; }
  .toolbar button.primary { background: var(--ink); color: #fff; border-color: var(--ink); }
  footer { margin-top: 40px; color: var(--muted); font-size: 12px; }
  @media print {
    .toolbar { display: none; }
    main { padding: 0; max-width: none; }
    h2 { margin-top: 24px; }
    @page { margin: 16mm 14mm; }
  }
  @media (max-width: 600px) { main { padding: 20px 16px 48px; } td, th { padding: 4px 5px; } }
</style>
</head>
<body>
<div class="toolbar"><button onclick="window.close()">Fechar</button><button class="primary" onclick="window.print()">Imprimir / guardar PDF</button></div>
<main>
  <h1>${v(n.name)}</h1>
  <p class="meta">Proposta de rua · ${R} · ${x.roads.length} rua(s), ${M.length} cruzamento(s)</p>
  ${n.description?`<p class="desc">${v(n.description)}</p>`:``}
  ${z?`<div class="imgs">${z}</div>`:``}

  <h2>Números</h2>
  ${w?`<p class="small">Antes</p>${D(w.stats)}`:``}
  <p class="small">${w?`Depois`:`Distribuição do espaço`}</p>
  ${D(C.stats)}
  <table>
    <thead><tr><th></th>${w?`<th class="n">Antes</th>`:``}<th class="n">${w?`Depois`:`Proposta`}</th>${w?`<th class="n">Diferença</th>`:``}<th></th></tr></thead>
    <tbody>${E}</tbody>
  </table>
  ${w?``:`<p class="small">Sem «Estado atual» desenhado: não há comparação.</p>`}

  <h2>Ruas</h2>
  <table>
    <thead><tr><th>Rua</th><th class="n">Comprimento</th><th class="n">Largura</th><th class="n">km/h</th><th class="n">Pessoas/hora</th><th>Por modo</th></tr></thead>
    <tbody>${O}</tbody>
  </table>
  <p class="small">Capacidade: valores médios por faixa do NACTO Transit Street Design Guide (pessoas por hora e sentido somados).</p>

  <h2>Cortes transversais</h2>
  ${A}

  ${N?`<h2>Cruzamentos e sinais</h2>
  <table>
    <thead><tr><th>Ruas</th><th>Tipo</th><th>Sinais</th><th>Peões</th></tr></thead>
    <tbody>${N}</tbody>
  </table>`:``}

  <h2>Verificação</h2>
  ${I}
  ${P.size?`<p class="small">${P.size} aviso(s) marcado(s) como ignorado(s) não aparecem.</p>`:``}

  ${L?`<h2>Referências</h2><ul class="small">${L}</ul>`:``}

  <footer>Feito com Rua Nova. Medidas indicativas para discussão pública; não substituem um projeto de execução.${c.attribution?` Imagens: ${v(c.attribution)}.`:``}</footer>
</main>
</body>
</html>`}var w={dgt:`Ortofotomapas © DGT`,esri:`© Esri, Maxar, Earthstar Geographics`,google:`© Google`},T=e=>new Promise(t=>setTimeout(t,e));function E(e){return Promise.race([new Promise(t=>e.once(`idle`,()=>t())),T(5e3)])}async function D(e,t,r=window.open(``,`_blank`)){r?.document.write(`<p style="font:16px system-ui,sans-serif;padding:24px">A preparar o relatório…</p>`);let i={attribution:w[t.basemap]};if(e){let n=a.getState(),r={center:e.getCenter(),zoom:e.getZoom(),bearing:e.getBearing(),pitch:e.getPitch()},o={which:n.which,selection:n.selection,multi:n.multi,animate:n.animate,view3d:n.view3d};n.set({selection:null,multi:[],animate:!1,view3d:!1});try{let a=[...t.proposal.nodes,...t.current?.nodes??[]].map(e=>e.pos);if(a.length>1){let t=[Math.min(...a.map(e=>e[0])),Math.min(...a.map(e=>e[1]))],n=[Math.max(...a.map(e=>e[0])),Math.max(...a.map(e=>e[1]))];e.fitBounds([t,n],{padding:50,maxZoom:19,duration:0,bearing:r.bearing,pitch:0})}let o=async()=>(await T(300),e.triggerRepaint(),await E(e),e.getCanvas().toDataURL(`image/jpeg`,.86));t.current?.roads.length&&(n.set({which:`current`}),i.before=await o()),n.set({which:`proposal`}),i.after=await o(),n.set({view3d:!0}),e.jumpTo({pitch:55,zoom:e.getZoom()+.4}),await T(900),i.view3d=await o()}catch(e){console.warn(`relatório: sem imagens do mapa`,e)}finally{a.getState().set(o),e.jumpTo(r)}}let o=C(t,c(t),i);r&&!r.closed?(r.document.open(),r.document.write(o),r.document.close()):m(`${n(t.name)}-relatorio.html`,o,`text/html`)}export{D as openReport};