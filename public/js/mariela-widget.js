/**
 * Mariela — Widget de chat de THE303
 * Conecta con n8n (workflow "Mariela Web — Widget THE303")
 */
import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

// Tema de marca (oscuro + naranja THE303)
const style = document.createElement('style');
style.textContent = `
  :root {
    --chat--color-primary: #FF5722;
    --chat--color-primary-shade-50: #E64A19;
    --chat--color-primary-shade-100: #D84315;
    --chat--color-secondary: #FF5722;
    --chat--color-dark: #0C0C0C;
    --chat--color-typing: #888888;
    --chat--toggle--background: #FF5722;
    --chat--toggle--hover--background: #E64A19;
    --chat--toggle--active--background: #D84315;
    --chat--toggle--size: 60px;
    --chat--header--background: #0C0C0C;
    --chat--header--color: #FFFFFF;
    --chat--message--bot--background: #1A1A1A;
    --chat--message--bot--color: #FFFFFF;
    --chat--message--user--background: #FF5722;
    --chat--message--user--color: #FFFFFF;
    --chat--window--width: 380px;
    --chat--window--height: 600px;
  }
  @media (max-width: 480px) {
    :root { --chat--window--width: 100vw; --chat--window--height: 100dvh; }
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
    '¡Hola! Soy Mariela de THE303 📸',
    'Puedo darte precios, comparar sesiones y agendar tu cita con Maikel. ¿En qué te ayudo?'
  ],
  i18n: {
    en: {
      title: 'Mariela · THE303',
      subtitle: 'Tu asistente — respuesta inmediata',
      inputPlaceholder: 'Escribe tu mensaje…',
      getStarted: 'Nueva conversación',
      closeButtonTooltip: 'Cerrar'
    }
  }
});

// Bienvenida automática: abre el chat una vez por sesión, a los 6 segundos
setTimeout(function () {
  try {
    if (!sessionStorage.getItem('mariela_auto_opened')) {
      var toggle = document.querySelector('.chat-window-toggle');
      if (toggle) {
        toggle.click();
        sessionStorage.setItem('mariela_auto_opened', '1');
      }
    }
  } catch (e) { /* sin sessionStorage no pasa nada */ }
}, 6000);
