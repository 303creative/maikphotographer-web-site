/**
 * Mariela — Widget de chat de THE303 (v2, estilo Apple)
 * Conecta con n8n (workflow "Mariela Web — Widget THE303")
 */
import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

// ── Tema: Apple-like, oscuro, bordes suaves, glass ──
const style = document.createElement('style');
style.textContent = `
  :root {
    --chat--color-primary: #FF5722;
    --chat--color-primary-shade-50: #E64A19;
    --chat--color-primary-shade-100: #D84315;
    --chat--color-secondary: #FF5722;
    --chat--toggle--background: linear-gradient(135deg, #FF5722, #E64A19);
    --chat--toggle--hover--background: #E64A19;
    --chat--toggle--active--background: #D84315;
    --chat--toggle--size: 58px;
    --chat--border-radius: 22px;
    --chat--window--width: 392px;
    --chat--window--height: 620px;
    --chat--header--background: rgba(18,18,20,0.92);
    --chat--header--color: #FFFFFF;
    --chat--header--padding: 16px 20px;
    --chat--message--font-size: 15px;
    --chat--message--padding: 11px 15px;
    --chat--message--border-radius: 18px;
    --chat--message--bot--background: #1F1F23;
    --chat--message--bot--color: #F5F5F7;
    --chat--message--user--background: linear-gradient(135deg, #FF5722, #E8501E);
    --chat--message--user--color: #FFFFFF;
    --chat--message-line-height: 1.55;
    --chat--input--font-size: 15px;
  }

  /* Ventana: vidrio oscuro, esquinas suaves, sombra profunda */
  .chat-window {
    border-radius: 22px !important;
    overflow: hidden !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    box-shadow: 0 24px 80px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3) !important;
    background: #121214 !important;
  }
  .chat-header {
    background: rgba(18,18,20,0.92) !important;
    backdrop-filter: blur(24px) saturate(160%) !important;
    -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
    border-bottom: 1px solid rgba(255,255,255,0.07) !important;
  }
  .chat-header h1 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Inter, sans-serif !important;
    font-size: 17px !important;
    font-weight: 600 !important;
    letter-spacing: -0.2px !important;
  }
  .chat-header p {
    font-size: 12.5px !important;
    opacity: 0.65 !important;
  }

  /* Cuerpo y burbujas */
  .chat-body, .chat-messages-list {
    background: #121214 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Inter, sans-serif !important;
  }
  .chat-message {
    border-radius: 18px !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.25) !important;
    max-width: 84% !important;
  }
  .chat-message.chat-message-from-bot {
    background: #1F1F23 !important;
    color: #F5F5F7 !important;
    border-bottom-left-radius: 6px !important;
  }
  .chat-message.chat-message-from-user {
    background: linear-gradient(135deg, #FF5722, #E8501E) !important;
    color: #fff !important;
    border-bottom-right-radius: 6px !important;
  }
  .chat-message a { color: #FF8A65 !important; }

  /* Input flotante estilo iOS */
  .chat-input {
    background: rgba(18,18,20,0.96) !important;
    border-top: 1px solid rgba(255,255,255,0.07) !important;
  }
  .chat-input textarea {
    background: #1F1F23 !important;
    color: #F5F5F7 !important;
    border-radius: 20px !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    padding: 11px 16px !important;
    margin: 10px 8px 10px 12px !important;
    font-family: inherit !important;
  }
  .chat-input textarea::placeholder { color: rgba(245,245,247,0.4) !important; }

  /* Burbuja flotante con halo */
  .chat-window-toggle {
    box-shadow: 0 10px 32px rgba(255,87,34,0.45), 0 2px 8px rgba(0,0,0,0.35) !important;
    transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease !important;
  }
  .chat-window-toggle:hover { transform: scale(1.07) !important; }

  /* Chips de guía */
  .mariela-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 14px 12px;
    background: rgba(18,18,20,0.96);
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .mariela-chip {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Inter, sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    color: #F5F5F7;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    padding: 7px 13px;
    cursor: pointer;
    transition: all .2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .mariela-chip:hover, .mariela-chip:active {
    background: rgba(255,87,34,0.18);
    border-color: rgba(255,87,34,0.55);
    color: #FF8A65;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    :root {
      --chat--window--width: 100vw;
      --chat--window--height: 100dvh;
    }
    .chat-window { border-radius: 0 !important; }
  }
`;
document.head.appendChild(style);

createChat({
  webhookUrl: 'https://the303photography.app.n8n.cloud/webhook/2a1d3c2e-1dd1-4734-9cf5-7ec2922e9d04/chat',
  mode: 'window',
  loadPreviousSession: true,
  showWelcomeScreen: false,
  defaultLanguage: 'en',
  initialMessages: [
    '¡Hola! Soy Mariela, tu asistente en THE303 📸',
    'Puedo guiarte: precios, comparar sesiones o agendar tu cita con Maikel. Toca una opción o escríbeme.'
  ],
  i18n: {
    en: {
      title: 'Mariela · THE303',
      subtitle: 'Asistente — respuesta al instante',
      inputPlaceholder: 'Escribe tu mensaje…',
      getStarted: 'Nueva conversación',
      closeButtonTooltip: 'Cerrar'
    }
  }
});

// ── Chips de guía (botones rápidos sobre el input) ──
const CHIPS = [
  { label: '💰 Ver precios', msg: '¿Me das los precios de todas las sesiones?' },
  { label: '📸 ¿Qué sesión me conviene?', msg: 'No sé qué tipo de sesión necesito, ¿me ayudas a elegir?' },
  { label: '📅 Agendar cita', msg: 'Quiero agendar una cita con Maikel' },
  { label: '🏠 Real Estate', msg: '¿Cómo funciona la fotografía de real estate?' }
];

function sendChip(msg) {
  const ta = document.querySelector('.chat-input textarea, .chat-window textarea');
  if (!ta) return;
  const proto = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value');
  proto.set.call(ta, msg);
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  setTimeout(function () {
    ta.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
  }, 60);
}

function mountChips() {
  const input = document.querySelector('.chat-input');
  if (!input || document.querySelector('.mariela-chips')) return;
  const bar = document.createElement('div');
  bar.className = 'mariela-chips';
  CHIPS.forEach(function (c) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mariela-chip';
    b.textContent = c.label;
    b.addEventListener('click', function () {
      sendChip(c.msg);
      bar.style.display = 'none'; // se ocultan tras el primer uso
    });
    bar.appendChild(b);
  });
  input.parentNode.insertBefore(bar, input);
}

// Montar chips cuando exista la ventana (y re-montar si se cierra/abre)
const chipObserver = new MutationObserver(function () { mountChips(); });
chipObserver.observe(document.body, { childList: true, subtree: true });

// ── Bienvenida automática: abre una vez por sesión a los 6s ──
setTimeout(function () {
  try {
    if (!sessionStorage.getItem('mariela_auto_opened')) {
      const toggle = document.querySelector('.chat-window-toggle');
      if (toggle) {
        toggle.click();
        sessionStorage.setItem('mariela_auto_opened', '1');
      }
    }
  } catch (e) { /* sin sessionStorage no pasa nada */ }
}, 6000);
