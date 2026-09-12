/* Sidebar única do HUB Motor de Conteúdo — injeta CSS + nav em todas as páginas.
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
    burger:'<path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>'
  };
  var NAV=[
    {item:'Início', href:'index.html', ic:'home'},
    {cat:'Métricas'},
    {item:'Melhores conteúdos', href:'desempenho.html', ic:'chart'},
    {cat:'Ferramentas'},
    {item:'Publicador', href:'publicador.html', ic:'send'},
    {item:'Calendário de posts', href:'calendario.html', ic:'cal'},
    {item:'Biblioteca de mídia', href:'midia.html', ic:'lib'},
    {cat:'Campanhas'},
    {item:'Anúncios', href:'anuncios.html', ic:'target'},
    {cat:'Utilidades'},
    {item:'Agente de copy', href:'agente-copy.html', ic:'pen'},
    {item:'UTM do Manual', href:'https://utm.brunotropolis.com.br', ic:'link', ext:true},
    {cat:'Admin'},
    {item:'Admin', href:'admin.html', ic:'gear'}
  ];
  var path=(location.pathname.split('/').pop()||'index.html').toLowerCase()||'index.html';
  var svg=function(k){return '<svg viewBox="0 0 24 24">'+ICON[k]+'</svg>';};

  var css=''
   +'.top{display:none!important}'
   +'body{padding-left:242px}'
   +'.sb{position:fixed;left:0;top:0;bottom:0;width:242px;background:#33473F;color:#E7EEEC;display:flex;flex-direction:column;z-index:40;overflow-y:auto;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}'
   +'.sb::-webkit-scrollbar{width:8px}.sb::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:8px}'
   +'.sb .brand{display:flex;align-items:center;gap:11px;padding:18px 18px 12px}'
   +'.sb .brand .lg{width:40px;height:40px;border-radius:12px;overflow:hidden;flex:0 0 auto;background:#E3A31B;display:grid;place-items:center}'
   +'.sb .brand .lg img{width:100%;height:100%;display:block}'
   +'.sb .brand b{font-size:14px;font-weight:800;display:block;line-height:1.2}'
   +'.sb .brand small{font-size:10.5px;color:#9DB3AD;display:block;margin-top:1px}'
   +'.sb nav{padding:4px 12px 14px;flex:1}'
   +'.sb .cat{font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#8AA39B;padding:19px 10px 6px}'
   +'.sb a.n{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:11px;color:#D6E4DF;font-size:13.5px;font-weight:600;margin-bottom:2px;text-decoration:none}'
   +'.sb a.n svg{width:18px;height:18px;fill:currentColor;opacity:.82;flex:0 0 auto}'
   +'.sb a.n:hover{background:rgba(255,255,255,.07);color:#fff}'
   +'.sb a.n.on{background:#fff;color:#26332F;font-weight:800;box-shadow:0 3px 10px rgba(0,0,0,.16)}'
   +'.sb a.n.on svg{opacity:1;fill:#3A5049}'
   +'.sb a.n .ex{margin-left:auto;font-size:11px;opacity:.5}'
   +'.sb .ft{padding:12px 18px 16px;border-top:1px solid rgba(255,255,255,.08);font-size:10.5px;color:#8AA39B;line-height:1.5}'
   +'.sbtop{display:none}'
   +'@media(max-width:900px){'
   +'  body{padding-left:0}'
   +'  .sb{transform:translateX(-100%);transition:transform .22s ease;box-shadow:0 0 44px rgba(0,0,0,.35)}'
   +'  .sb.open{transform:none}'
   +'  .sbtop{display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:35;background:#3A5049;color:#fff;padding:12px 15px}'
   +'  .sbtop .hb{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.10);display:grid;place-items:center;cursor:pointer;border:none;color:#fff;flex:0 0 auto}'
   +'  .sbtop .hb svg{width:20px;height:20px;fill:currentColor}'
   +'  .sbtop b{font-size:15px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
   +'  .sbscrim{display:none;position:fixed;inset:0;background:rgba(20,30,27,.5);z-index:38}'
   +'  .sbscrim.on{display:block}'
   +'}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var active=null;
  var nav=NAV.map(function(x){
    if(x.cat) return '<div class="cat">'+x.cat+'</div>';
    var base=x.href.split('/').pop().toLowerCase();
    var on=(!x.ext && (base===path || (path==='index.html'&&base==='index.html')));
    if(on) active=x.item;
    return '<a class="n'+(on?' on':'')+'" href="'+x.href+'"'+(x.ext?' target="_blank" rel="noopener"':'')+'>'+svg(x.ic)+'<span>'+x.item+'</span>'+(x.ext?'<span class="ex">↗</span>':'')+'</a>';
  }).join('');

  var aside=document.createElement('aside'); aside.className='sb';
  aside.innerHTML=''
   +'<div class="brand"><div class="lg"><img src="favicon.svg" alt=""></div><div><b>Motor de Conteúdo</b><small>Manual do Recém-Nascido</small></div></div>'
   +'<nav>'+nav+'</nav>'
   +'<div class="ft">⏸️ Modo seguro ligado — nada posta sozinho ainda.</div>';

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
