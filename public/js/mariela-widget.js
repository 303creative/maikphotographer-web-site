/**
 * Mariela — Widget de chat de The303 (v3, self-contained)
 * Sin dependencias externas: envía {action,sessionId,chatInput} al webhook de n8n
 * (contrato probado del workflow "Mariela Web — Widget THE303") y renderiza la respuesta.
 * Robusto a cambios de versión de @n8n/chat (ya no lo usa).
 */
(function () {
  var WEBHOOK = 'https://the303photography.app.n8n.cloud/webhook/2a1d3c2e-1dd1-4734-9cf5-7ec2922e9d04/chat';

  // ── sessionId persistente (memoria por usuario) ──
  function uuid() {
    try { return crypto.randomUUID(); } catch (e) {}
    return 'web-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  }
  var sessionId;
  try {
    sessionId = localStorage.getItem('mariela_session');
    if (!sessionId) { sessionId = uuid(); localStorage.setItem('mariela_session', sessionId); }
  } catch (e) { sessionId = uuid(); }

  // ── estilos ──
  var css = document.createElement('style');
  css.textContent = [
    '.mk-toggle{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;border:0;cursor:pointer;z-index:2147483000;',
    'background:linear-gradient(135deg,#FF5722,#E64A19);color:#fff;font:600 22px/1 -apple-system,BlinkMacSystemFont,Segoe UI,Inter,sans-serif;',
    'box-shadow:0 10px 32px rgba(255,87,34,.45),0 2px 8px rgba(0,0,0,.35);transition:transform .25s cubic-bezier(.34,1.56,.64,1)}',
    '.mk-toggle:hover{transform:scale(1.07)}',
    '.mk-panel{position:fixed;right:20px;bottom:88px;width:392px;max-width:calc(100vw - 32px);height:620px;max-height:calc(100dvh - 120px);',
    'z-index:2147483000;display:none;flex-direction:column;background:#121214;border:1px solid rgba(255,255,255,.08);border-radius:22px;overflow:hidden;',
    'box-shadow:0 24px 80px rgba(0,0,0,.55),0 2px 8px rgba(0,0,0,.3);font-family:-apple-system,BlinkMacSystemFont,SF Pro Text,Segoe UI,Inter,sans-serif}',
    '.mk-panel.open{display:flex}',
    '.mk-head{background:rgba(18,18,20,.92);backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);',
    'border-bottom:1px solid rgba(255,255,255,.07);padding:15px 18px;display:flex;align-items:center;justify-content:space-between;color:#fff}',
    '.mk-head b{font-size:16px;font-weight:600;letter-spacing:-.2px;display:block}',
    '.mk-head span{font-size:12px;opacity:.6}',
    '.mk-x{background:0;border:0;color:#fff;opacity:.6;font-size:22px;cursor:pointer;line-height:1}',
    '.mk-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#121214}',
    '.mk-msg{max-width:84%;padding:11px 15px;border-radius:18px;font-size:15px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;box-shadow:0 1px 2px rgba(0,0,0,.25)}',
    '.mk-bot{align-self:flex-start;background:#1F1F23;color:#F5F5F7;border-bottom-left-radius:6px}',
    '.mk-user{align-self:flex-end;background:linear-gradient(135deg,#FF5722,#E8501E);color:#fff;border-bottom-right-radius:6px}',
    '.mk-bot a{color:#FF8A65}',
    '.mk-typing{align-self:flex-start;color:#8A8A87;font-size:13px;padding:4px 8px}',
    '.mk-chips{display:flex;flex-wrap:wrap;gap:8px;padding:10px 14px;background:rgba(18,18,20,.96);border-top:1px solid rgba(255,255,255,.05)}',
    '.mk-chip{font:500 12.5px/1 inherit;color:#F5F5F7;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:7px 13px;cursor:pointer;transition:all .2s}',
    '.mk-chip:hover{background:rgba(255,87,34,.18);border-color:rgba(255,87,34,.55);color:#FF8A65}',
    '.mk-input{display:flex;gap:8px;align-items:flex-end;padding:10px 12px;background:rgba(18,18,20,.96);border-top:1px solid rgba(255,255,255,.07)}',
    '.mk-input textarea{flex:1;resize:none;max-height:120px;background:#1F1F23;color:#F5F5F7;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:11px 16px;font:15px/1.4 inherit}',
    '.mk-input textarea::placeholder{color:rgba(245,245,247,.4)}',
    '.mk-send{width:42px;height:42px;flex:none;border:0;border-radius:50%;cursor:pointer;background:linear-gradient(135deg,#FF5722,#E64A19);color:#fff;font-size:18px}',
    '.mk-send:disabled{opacity:.5;cursor:default}',
    '@media(max-width:480px){.mk-panel{right:0;bottom:0;width:100vw;max-width:100vw;height:100dvh;max-height:100dvh;border-radius:0}.mk-toggle{right:16px;bottom:16px}}'
  ].join('');
  document.head.appendChild(css);

  // ── DOM ──
  var toggle = document.createElement('button');
  toggle.className = 'mk-toggle'; toggle.setAttribute('aria-label', 'Chat con Mariela'); toggle.textContent = 'M';

  var panel = document.createElement('div'); panel.className = 'mk-panel';
  panel.innerHTML =
    '<div class="mk-head"><div><b>Mariela · The303</b><span>Asistente — respuesta al instante</span></div><button class="mk-x" aria-label="Cerrar">×</button></div>' +
    '<div class="mk-body" id="mk-body"></div>' +
    '<div class="mk-chips" id="mk-chips"></div>' +
    '<div class="mk-input"><textarea id="mk-ta" rows="1" placeholder="Escribe tu mensaje…"></textarea><button class="mk-send" id="mk-send" aria-label="Enviar">↑</button></div>';

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  var body = panel.querySelector('#mk-body');
  var ta = panel.querySelector('#mk-ta');
  var sendBtn = panel.querySelector('#mk-send');
  var chipsBar = panel.querySelector('#mk-chips');

  function add(text, who) {
    var d = document.createElement('div');
    d.className = 'mk-msg ' + (who === 'user' ? 'mk-user' : 'mk-bot');
    // links simples
    d.innerHTML = String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/(cal\.com\/[^\s]+)/g, '<a href="https://$1" target="_blank" rel="noopener">$1</a>');
    body.appendChild(d); body.scrollTop = body.scrollHeight;
    return d;
  }

  var greeted = false;
  function greet() {
    if (greeted) return; greeted = true;
    add('¡Hola! Soy Mariela de The303 📸', 'bot');
    add('Puedo ayudarte: precios, elegir un servicio o agendar con Maikel. Toca una opción o escríbeme.', 'bot');
  }

  var CHIPS = [
    { label: '💰 Ver precios', msg: '¿Me das los precios de los paquetes?' },
    { label: '📋 ¿Qué me conviene?', msg: 'No sé qué servicio necesito, ¿me ayudas a elegir?' },
    { label: '📅 Agendar', msg: 'Quiero agendar una cita con Maikel' },
    { label: '🏠 Real estate', msg: '¿Cómo funciona el contenido para real estate?' }
  ];
  CHIPS.forEach(function (c) {
    var b = document.createElement('button'); b.className = 'mk-chip'; b.type = 'button'; b.textContent = c.label;
    b.addEventListener('click', function () { send(c.msg); chipsBar.style.display = 'none'; });
    chipsBar.appendChild(b);
  });

  var sending = false;
  function send(text) {
    text = (text || ta.value).trim();
    if (!text || sending) return;
    ta.value = ''; ta.style.height = 'auto';
    add(text, 'user');
    sending = true; sendBtn.disabled = true;
    var typing = document.createElement('div'); typing.className = 'mk-typing'; typing.textContent = 'Mariela está escribiendo…';
    body.appendChild(typing); body.scrollTop = body.scrollHeight;

    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sendMessage', sessionId: sessionId, chatInput: text })
    }).then(function (r) { return r.text(); }).then(function (txt) {
      typing.remove();
      var out = '';
      try { var j = JSON.parse(txt); if (Array.isArray(j)) j = j[0] || {}; out = j.output || j.text || j.message || j.response || j.reply || ''; }
      catch (e) { out = txt; }
      if (!out) out = 'Perdón, no pude procesar eso. Escríbeme por WhatsApp al +1 786 332 9815 y te ayudo. 📲';
      add(out, 'bot');
    }).catch(function () {
      typing.remove();
      add('Tuve un problema de conexión. Escríbeme por WhatsApp al +1 786 332 9815 y te atiendo enseguida. 📲', 'bot');
    }).then(function () { sending = false; sendBtn.disabled = false; ta.focus(); });
  }

  // eventos
  function open() { panel.classList.add('open'); greet(); setTimeout(function(){ta.focus();}, 100); }
  function close() { panel.classList.remove('open'); }
  toggle.addEventListener('click', function () { panel.classList.contains('open') ? close() : open(); });
  panel.querySelector('.mk-x').addEventListener('click', close);
  sendBtn.addEventListener('click', function () { send(); });
  ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  ta.addEventListener('input', function () { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; });

  // auto-abrir una vez por sesión a los 6s
  setTimeout(function () {
    try { if (!sessionStorage.getItem('mariela_auto_opened')) { open(); sessionStorage.setItem('mariela_auto_opened', '1'); } }
    catch (e) {}
  }, 6000);
})();
