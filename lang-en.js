/* Modo inglês da interface (pedido da análise do app da Meta, 18/11/2026).
   Liga com ?lang=en na URL (fica lembrado neste navegador); desliga com ?lang=pt.
   Troca só textos fixos da tela; mensagens e comentários das pessoas ficam como vieram. */
(function () {
  var q = new URLSearchParams(location.search).get('lang');
  try { if (q) localStorage.setItem('hub_lang', q); } catch (e) {}
  var lang = q; try { lang = lang || localStorage.getItem('hub_lang'); } catch (e) {}
  if (lang !== 'en') return;
  document.documentElement.lang = 'en';
  var D = {
    'Caixa de entrada · HUB Manual': 'Inbox · Manual HUB',
    'Caixa de entrada': 'Inbox', 'Mensagens': 'Messages', 'Comentários': 'Comments',
    '✍️ Conversas': '✍️ Conversations', '⚡ Automações': '⚡ Automations', 'Automações': 'Automations',
    '⚡ Com automação': '⚡ With automation', '💬 Normais': '💬 Regular',
    'Todas': 'All', 'não lidas': 'unread', 'Todas as etiquetas / funis': 'All tags / funnels',
    'Abrir conversa': 'Open conversation', 'Abrir post ↗': 'Open post ↗', 'Enviar': 'Send',
    'Selecione um post': 'Select a post', 'Selecione uma conversa': 'Select a conversation',
    'Ainda não houve direct com essa pessoa.': 'No direct messages with this person yet.',
    'Pessoa do Facebook': 'Facebook user', 'carregando…': 'loading…', '(post sem legenda)': '(post without caption)',
    'Início': 'Home', 'Panorama': 'Overview', 'Publicador': 'Publisher', 'Calendário': 'Calendar',
    'Biblioteca de mídia': 'Media library', 'Contatos': 'Contacts', 'Carrosséis': 'Carousels',
    'Métricas': 'Metrics', 'Ferramentas': 'Tools', 'Conteúdo': 'Content', 'Link da bio': 'Link in bio',
    'Funil das automações': 'Automation funnel', 'Sair': 'Log out', 'Buscar': 'Search',
    'Buscar nome, @ ou mensagem': 'Search name, @ or message', 'Responder': 'Reply',
    'Respondemos:': 'We replied:', 'Etiquetas': 'Tags', 'Seguidores': 'Followers',
    'Segue você': 'Follows you', 'Primeiro contato': 'First contact', 'Último contato': 'Last contact',
    'agora': 'now', 'hoje': 'today', 'ontem': 'yesterday',
    'Buscar por @, nome ou mensagem': 'Search by @, name or message', 'Escreva a resposta…': 'Write a reply…',
    'Buscar por @ ou nome': 'Search by @ or name',
    'Directs, respostas de story, toques em botão e mensagens das automações.': 'Direct messages, story replies, button taps and automation messages.',
    'Contatos · HUB Manual': 'Contacts · Manual HUB', 'Interação mais recente': 'Most recent interaction',
    'Interações': 'Interactions', 'Mais seguidores': 'Most followers', 'Nenhum contato com esse filtro.': 'No contacts match this filter.',
    'Primeira interação': 'First interaction', 'Todos os fluxos': 'All flows', 'Última': 'Last'
  };
  var RX = [
    [/^Nenhum comentário( nessa rede)? ainda\.$/, function (m, a) { return 'No comments' + (a ? ' on this network' : '') + ' yet.'; }],
    [/^Respondemos: /, 'We replied: '],
    [/^(\d+) contatos?( · (\d+) com mensagem nova)?$/, function (m, a, b, c) { return a + ' contact' + (a === '1' ? '' : 's') + (b ? ' · ' + c + ' with new messages' : ''); }],
    [/^Contato (\d+)$/, 'Contact $1'],
    [/^há (\d+) ?min$/, '$1 min ago'], [/^há (\d+) ?h$/, '$1 h ago'], [/^há (\d+) dias?$/, '$1 days ago'],
    [/^Não consegui carregar \((.*)\)\.$/, 'Could not load ($1).'], [/^Não consegui abrir \((.*)\)\.$/, 'Could not open ($1).']
  ];
  function tr(s) {
    var t = s.trim(); if (!t) return s;
    if (D[t]) return s.replace(t, D[t]);
    for (var i = 0; i < RX.length; i++) if (RX[i][0].test(t)) return s.replace(t, t.replace(RX[i][0], RX[i][1]));
    return s;
  }
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA)$/;
  function walk(root) {
    if (root.nodeType === 3) { var p = root.parentElement; if (p && p.closest('.m,.txt,[data-livre]')) return; var n = tr(root.nodeValue); if (n !== root.nodeValue) root.nodeValue = n; return; }
    if (root.nodeType !== 1 || SKIP.test(root.tagName)) return;
    if (root.closest && root.closest('.m,.txt,[data-livre]')) return;
    ['placeholder', 'title', 'aria-label'].forEach(function (a) { var v = root.getAttribute && root.getAttribute(a); if (v) { var n = tr(v); if (n !== v) root.setAttribute(a, n); } });
    for (var c = root.firstChild; c; c = c.nextSibling) walk(c);
  }
  function go() { walk(document.body); document.title = tr(document.title); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(walk); if (m.type === 'characterData') walk(m.target); }); })
    .observe(document.documentElement, { childList: true, subtree: true });
})();
