/* Sidebar única do HUB Motor de Conteúdo, injeta CSS + nav em todas as páginas.
   Uso: <script src="sidebar.js" defer></script> antes de </body>. Marca o item ativo pelo arquivo. */
(function(){
  var ICON={
    home:'<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1z"/>',
    chart:'<path d="M4 13h3v7H4zM10 6h3v14h-3zM16 10h3v10h-3z"/>',
    send:'<path d="M2 21l21-9L2 3v7l14 2-14 2z"/>',
    cal:'<path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 9h14v10H5z"/>',
    lib:'<path d="M3 4h7l2 2h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>',
    target:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>',
    pen:'<path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75zM20.7 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"/>',
    link:'<path d="M10.6 13.4a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1.5 1.5 1.42 1.42 1.5-1.5a2 2 0 1 1 2.82 2.82l-3 3a2 2 0 0 1-2.82 0zM13.4 10.6a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5-1.42-1.42-1.5 1.5a2 2 0 1 1-2.82-2.82l3-3a2 2 0 0 1 2.82 0z"/>',
    gear:'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm8.9 4a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 2h-4l-.4 2.4a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 3.1 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1c.6.5 1.3.9 2 1.2L10 22h4l.4-2.4c.7-.3 1.4-.7 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>',
    bolt:'<path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z"/>',
    users:'<path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 13c-4 0-7 2-7 4.5V20h14v-2.5C16 15 13 13 9 13zm7.6.2c1.5.9 2.4 2.2 2.4 4.3V20h3v-2.3c0-2.3-2.6-4-5.4-4.5z"/>',
    chat:'<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm2 4v2h12V8H6zm0 4v2h8v-2H6z"/>',
    globe:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.5 0 3.6 2.3 4 6H8c.4-3.7 2.5-6 4-6zM4.3 10H7c0 1.4.1 2.8.3 4H4.6A8 8 0 0 1 4.3 10zm0 6h3.3c.5 2 1.3 3.5 2 4.4A8 8 0 0 1 4.3 16zM12 20c-1.2 0-2.9-1.6-3.7-4h7.4c-.8 2.4-2.5 4-3.7 4zm.7-.6c.7-.9 1.5-2.4 2-4.4h3.3a8 8 0 0 1-5.3 4.4zM16.7 14c.2-1.2.3-2.6.3-4h2.7a8 8 0 0 1-.3 4h-2.7z"/>',
    burger:'<path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>'
  };
  var NAV=[
    {item:'Início', href:'index.html', ic:'⌂'},
    {cat:'Métricas'},
    {item:'Panorama', href:'panorama.html', ic:'📈'},
    {item:'Dashboard Link Bio', href:'dashbio.html', ic:'🔗'},
    {cat:'Ferramentas'},
    {item:'Publicador', href:'publicador.html', ic:'📤'},
    {item:'Calendário de posts', href:'calendario.html', ic:'📅'},
    {item:'Calendário de produtos', href:'calendario.html?visao=produtos', ic:'🛍️'},
    {item:'Biblioteca de mídia', href:'midia.html', ic:'🎞️'},
    {item:'Automações', href:'automacoes.html', ic:'⚡'},
    {item:'Caixa de entrada', href:'inbox.html', ic:'💬'},
    {item:'Contatos', href:'contatos.html', ic:'👥'},
    {cat:'Admin'},
    {item:'Admin', href:'admin.html', ic:'⚙'}
  ];
  var path=(location.pathname.split('/').pop()||'index.html').toLowerCase()||'index.html';
  var svg=function(k){return ICON[k]?'<svg viewBox="0 0 24 24">'+ICON[k]+'</svg>':'<i class="em">'+k+'</i>';};

  // Estilo do CRM (pedido Bruno 08/Out): menu verde FLUTUANTE (solto da borda, cantos 24px, sombra), itens em
  // maiúscula pequena, item ativo = pílula clara com sombra, cards com cantos 16px e sombra suave, miolo mais largo.
  // 08/Out (Bruno): fundo e ícones também iguais ao CRM — fundo verde-claro #E8F1F0 (era mostarda desde 02/Out), ícones emoji, texto branco.
  var estreita=/^(admin|hashtags|legendas)\.html$/.test(path); // telas de formulário ficam mais estreitas
  var css=''
   +'.top{display:none!important}'
   +'body{padding-left:260px;background:#E8F1F0 !important}'
   +'.wrap{max-width:'+(estreita?'1100px':'1480px')+' !important;padding-left:24px !important;padding-right:24px !important;padding-top:24px !important}'
   +'*::-webkit-scrollbar{width:8px;height:8px}*::-webkit-scrollbar-track{background:transparent}*::-webkit-scrollbar-thumb{background:#CBDCD8;border-radius:8px}*::-webkit-scrollbar-thumb:hover{background:#B4CCC6}'
   +'.panel,.card,.kpi,.col,.igcard,.idcard,.insight,.panelf,.pessoas{border-radius:16px !important;box-shadow:0 1px 2px rgba(35,51,47,.06),0 4px 16px -6px rgba(35,51,47,.12) !important}'
   +'.sb{position:fixed;left:12px;top:12px;bottom:12px;width:236px;background:#3A5049;color:#E7EEEC;display:flex;flex-direction:column;z-index:40;overflow:hidden;border-radius:24px;box-shadow:0 12px 32px rgba(35,50,45,.22);font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}'
   +'.sb nav{padding:20px 12px 12px;flex:1;overflow-y:auto}'
   +'.sb nav::-webkit-scrollbar-thumb{background:#4A625A}'
   +'#insight,#note{display:none !important}#row2{grid-template-columns:1fr !important}'
   +'.panel h2,.listhead h2,.sec,.kpi:not(.hero) .lb,.kpi:not(.hero) .lab,.netbar .nh,.filters .flabel,.drow.dhead span,label.f,label.ff{color:#111 !important}'
   +'.pagehdr p,.pagehdr .up,.pagehdr small{color:#6E827D !important}'
   +'.sb .cat{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.62);padding:16px 12px 6px}'
   +'.sb .cat:first-child{padding-top:0}'
   +'.sb a.n{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;color:#E7EEEC;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px;text-decoration:none;transition:background .15s,color .15s}'
   +'.sb a.n span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
   +'.sb a.n svg{width:17px;height:17px;fill:currentColor;opacity:.8;flex:0 0 auto}.sb a.n .em{font-style:normal;font-size:16px;line-height:1;width:18px;text-align:center;flex:0 0 auto;opacity:.85}.sb a.n.on .em{opacity:1}'
   +'.sb a.n:hover{background:rgba(255,255,255,.06);color:#fff}'
   +'.sb a.n.on{background:#E8F1F0;color:#23332F;font-weight:700;box-shadow:0 1px 2px rgba(35,51,47,.06),0 4px 16px -6px rgba(35,51,47,.12)}'
   +'.sb a.n.on svg{opacity:1;fill:#3A5049}'
   +'.sb a.n .ex{flex:0 0 auto;font-size:11px;opacity:.5}'
   +'.sb .ft{padding:14px 20px 16px;border-top:1px solid rgba(255,255,255,.1);font-size:11px;color:#9DB3AD;line-height:1.45}'
   +'.sb .ft b{display:block;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#E3A31B;font-weight:700;margin-bottom:3px}'
   +'.sbtop{display:none}'
   +'@media(max-width:900px){'
   +'  body{padding-left:0}'
   +'  .wrap{padding-left:12px !important;padding-right:12px !important;padding-top:14px !important}'
   +'  .sb{left:0;top:0;bottom:0;border-radius:0 24px 24px 0;transform:translateX(-105%);transition:transform .22s ease;box-shadow:0 0 44px rgba(0,0,0,.35)}'
   +'  .sb.open{transform:none}'
   +'  .sbtop{display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:35;background:#3A5049;color:#fff;padding:12px 15px}'
   +'  .sbtop .hb{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.10);display:grid;place-items:center;cursor:pointer;border:none;color:#fff;flex:0 0 auto}'
   +'  .sbtop .hb svg{width:20px;height:20px;fill:currentColor}'
   +'  .sbtop b{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
   +'  .sbscrim{display:none;position:fixed;inset:0;background:rgba(20,30,27,.5);z-index:38}'
   +'  .sbscrim.on{display:block}'
   +'}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  if(window.self!==window.top){ var em=document.createElement('style'); em.textContent='body{padding-left:0!important;background:transparent!important}.top,footer{display:none!important}.wrap{padding:0 0 6px!important;max-width:none!important}'; document.head.appendChild(em); return; }

  var active=null;
  var nav=NAV.map(function(x){
    if(x.cat) return '<div class="cat">'+x.cat+'</div>';
    var base=x.href.split('/').pop().toLowerCase();
    var aqui=path+(location.search.indexOf('visao=produtos')>=0?'?visao=produtos':'');
    var on=(!x.ext && (base===aqui || (aqui==='index.html'&&base==='index.html')));
    if(on) active=x.item;
    return '<a class="n'+(on?' on':'')+'" href="'+x.href+'"'+(x.ext?' target="_blank" rel="noopener"':'')+'>'+svg(x.ic)+'<span>'+x.item+'</span>'+(x.ext?'<span class="ex">↗</span>':'')+'</a>';
  }).join('');

  var aside=document.createElement('aside'); aside.className='sb';
  aside.innerHTML=''
   +'<nav>'+nav+'</nav>'
   +'<div class="ft"><b>Publicação</b>Automática ligada: agendados saem sozinhos no horário.</div>';

  var top=document.createElement('div'); top.className='sbtop';
  top.innerHTML='<button class="hb" aria-label="Menu">'+svg('burger')+'</button><b>'+(active||'Motor de Conteúdo')+'</b>';

  var scrim=document.createElement('div'); scrim.className='sbscrim';

  document.body.insertBefore(scrim, document.body.firstChild);
  document.body.insertBefore(aside, document.body.firstChild);
  document.body.insertBefore(top, document.body.firstChild);

  function toggle(o){ aside.classList.toggle('open',o); scrim.classList.toggle('on',o); }
  top.querySelector('.hb').addEventListener('click',function(){ toggle(!aside.classList.contains('open')); });
  scrim.addEventListener('click',function(){ toggle(false); });
})();
