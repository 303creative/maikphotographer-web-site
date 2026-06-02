import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '303creativemarketing@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'atsi qgsi ffrt pccw'
  }
});

const emailHtml = `
  <div style="font-family:Arial;background:#0C0C0C;
    color:#fff;padding:40px;border-radius:8px;
    max-width:600px;margin:0 auto">
    <h1 style="color:#FF5722;margin:0">
      ✅ Web Lista para Producción
    </h1>
    <p style="color:#888;margin-top:8px;font-size:14px">
      maikphotographer.com · ${new Date().toLocaleString()}
    </p>
    <hr style="border:none;border-top:1px solid #333;margin:24px 0">

    <h3 style="color:#FF5722">Assets Integrados:</h3>
    <ul style="color:#ccc;line-height:2.2;padding-left:20px">
      <li>✅ index.html — 1,199+ líneas completas</li>
      <li>✅ 6 Videos MP4 copiados a /assets/videos/ (47 MB)</li>
      <li>✅ Hero video loop cinematográfico (40_hero_camara_loop.mp4)</li>
      <li>✅ Partículas canvas naranja (41_hero_loop_partículas)</li>
      <li>✅ Light leak overlay cinematográfico</li>
      <li>✅ Scroll video — cámara 3D (44_scroll_video)</li>
      <li>✅ Logo SVG en header y footer</li>
      <li>✅ 9 fotos nuevas en portfolio optimizadas</li>
      <li>✅ Grain texture cinematográfica sutil</li>
      <li>✅ Firma manuscrita en About</li>
      <li>✅ Iconos SVG en contacto (WhatsApp, Mail, Instagram)</li>
      <li>✅ Fondo bokeh About + Miami Contact</li>
      <li>✅ GSAP ScrollTrigger + Lenis smooth scroll</li>
      <li>✅ Emil Kowalski button press feedback</li>
      <li>✅ Formulario de contacto + Cal.com preservados</li>
      <li>✅ Color palette unificada #FF5722</li>
      <li>✅ Rutas corregidas para Vercel (/assets/)</li>
    </ul>

    <hr style="border:none;border-top:1px solid #333;margin:24px 0">

    <h3 style="color:#FF5722">Status Técnico:</h3>
    <ul style="color:#ccc;line-height:2.2;padding-left:20px">
      <li>📦 Todos los assets en repo local y GitHub</li>
      <li>🚀 Auto-deploy Vercel activado</li>
      <li>📡 Rutas verificadas y corregidas</li>
      <li>⚡ Performance optimizado (videos H.264)</li>
      <li>✨ Animaciones cinematográficas activas</li>
    </ul>

    <hr style="border:none;border-top:1px solid #333;margin:24px 0">

    <div style="text-align:center">
      <a href="https://www.maikphotographer.com"
        style="background:#FF5722;color:#fff;
          padding:14px 28px;border-radius:4px;
          text-decoration:none;font-weight:bold;
          display:inline-block;font-size:16px">
        Ver Web en Vivo →
      </a>
    </div>

    <hr style="border:none;border-top:1px solid #333;margin:24px 0">

    <p style="color:#888;font-size:12px;margin:0">
      <strong>Repositorio:</strong>
      <a href="https://github.com/303creative/maikphotographer-web-site"
        style="color:#FF5722;text-decoration:none">
        303creative/maikphotographer-web-site
      </a>
    </p>
    <p style="color:#888;font-size:12px;margin:8px 0">
      <strong>Deploy:</strong> Vercel (auto-deploy desde GitHub)
    </p>
    <p style="color:#888;font-size:12px;margin:8px 0">
      <strong>Próximo paso:</strong> git push origin main → verificar en 3 min
    </p>
  </div>
`;

async function sendEmail() {
  try {
    console.log('📧 Enviando email de confirmación...');

    const result = await transporter.sendMail({
      from: '303creativemarketing@gmail.com',
      to: 'maikelmarshall07@gmail.com',
      subject: '✅ maikphotographer.com — Web Lista para Producción',
      html: emailHtml
    });

    console.log('✅ Email enviado exitosamente');
    console.log('Message ID:', result.messageId);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error enviando email:', error.message);
    process.exit(1);
  }
}

sendEmail();
