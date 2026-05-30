/**
 * 🎨 UNIVERSAL EMAIL TEMPLATE V2 (MINIMALISTA)
 *
 * Diseño simple y directo para CONVERTIR
 * - Una imagen hero grande
 * - Solo servicios (sin precios que asusten)
 * - Copy enfocado en beneficios
 * - CTA clara y directa
 */

export function getUniversalEmailTemplate(config) {
  const {
    clientName,
    businessType,
    heroImage,           // Imagen hero principal
    headline,
    subheadline,
    service1,
    service2,
    service3,
    service4,
    service5,
    benefit1,
    benefit2,
    benefit3,
    ctaText,
    ctaButtonText = 'Conversar Ahora',
    secondaryButtonText = 'Ver Portfolio',
    footerText = 'Maikel Marshall | Fotógrafo & Director Creativo'
  } = config;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      background: #f5f5f5;
    }

    .wrapper {
      width: 100%;
      max-width: 650px;
      margin: 20px auto;
      background: white;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      overflow: hidden;
    }

    /* HERO SECTION */
    .hero {
      position: relative;
      width: 100%;
      height: auto;
      min-height: 350px;
      background: linear-gradient(135deg, #D8C18A 0%, #C7B68A 100%);
      background-size: cover;
      background-position: center;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 40px;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      color: white;
    }

    .hero h1 {
      font-size: clamp(28px, 6vw, 42px);
      font-weight: 300;
      margin-bottom: 15px;
      line-height: 1.2;
      letter-spacing: -0.5px;
    }

    .hero p {
      font-size: 16px;
      opacity: 0.95;
      margin: 0;
      font-weight: 300;
    }

    /* CONTENT */
    .content {
      padding: 50px 40px;
    }

    .greeting {
      font-size: 16px;
      margin-bottom: 20px;
      line-height: 1.6;
      color: #333;
    }

    .greeting strong {
      color: #D8C18A;
      font-weight: 600;
    }

    .intro-text {
      font-size: 15px;
      color: #666;
      margin-bottom: 30px;
      line-height: 1.7;
    }

    .highlight-box {
      background: linear-gradient(135deg, rgba(216, 193, 138, 0.1) 0%, rgba(216, 193, 138, 0.05) 100%);
      border-left: 4px solid #D8C18A;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
      font-size: 15px;
      line-height: 1.6;
    }

    .highlight-box strong {
      color: #D8C18A;
      font-weight: 600;
    }

    /* SECTION TITLE */
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #D8C18A;
      margin: 40px 0 20px 0;
      border-bottom: 2px solid #D8C18A;
      padding-bottom: 12px;
      display: inline-block;
    }

    /* SERVICES LIST */
    .services-list {
      list-style: none;
      margin: 20px 0;
    }

    .services-list li {
      padding: 14px 0;
      padding-left: 28px;
      position: relative;
      font-size: 15px;
      color: #555;
      line-height: 1.6;
    }

    .services-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #D8C18A;
      font-weight: bold;
      font-size: 18px;
      line-height: 1;
    }

    /* BENEFITS BOX */
    .benefits-box {
      background: #f9f9f9;
      border: 1px solid rgba(216, 193, 138, 0.15);
      border-radius: 8px;
      padding: 30px;
      margin: 30px 0;
    }

    .benefits-box p {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
      line-height: 1.6;
    }

    .benefits-box p:last-child {
      margin-bottom: 0;
    }

    /* CTA SECTION */
    .cta-section {
      text-align: center;
      margin: 50px 0;
      padding: 40px 0;
      border-top: 1px solid rgba(216, 193, 138, 0.2);
      border-bottom: 1px solid rgba(216, 193, 138, 0.2);
    }

    .cta-text {
      font-size: 18px;
      margin-bottom: 25px;
      color: #333;
      font-weight: 500;
    }

    .cta-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin: 25px 0;
    }

    .cta-button {
      display: inline-block;
      padding: 16px 40px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: all 0.3s ease;
      border: 2px solid #D8C18A;
      background: #D8C18A;
      color: #111;
      cursor: pointer;
    }

    .cta-button:hover {
      background: #C7B68A;
      border-color: #C7B68A;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(216, 193, 138, 0.3);
    }

    .cta-button-secondary {
      background: transparent;
      color: #D8C18A;
    }

    .cta-button-secondary:hover {
      background: #D8C18A;
      color: #111;
    }

    .cta-note {
      font-size: 13px;
      color: #999;
      margin-top: 20px;
    }

    /* FOOTER */
    .footer {
      background: #f5f5f5;
      padding: 40px;
      text-align: center;
      font-size: 13px;
      color: #999;
      border-top: 1px solid rgba(216, 193, 138, 0.1);
    }

    .footer-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .footer-links {
      margin: 15px 0;
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: #D8C18A;
      text-decoration: none;
      font-weight: 500;
      font-size: 12px;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #C7B68A;
    }

    .footer-divider {
      margin: 15px 0;
      border-top: 1px solid rgba(216, 193, 138, 0.2);
      padding-top: 15px;
    }

    .footer-copy {
      font-size: 11px;
      color: #bbb;
    }

    /* RESPONSIVE */
    @media (max-width: 640px) {
      .wrapper {
        margin: 10px;
        border-radius: 8px;
      }

      .hero {
        min-height: 280px;
        padding: 40px 20px;
      }

      .hero h1 {
        font-size: 24px;
        margin-bottom: 12px;
      }

      .hero p {
        font-size: 14px;
      }

      .content {
        padding: 30px 20px;
      }

      .cta-buttons {
        flex-direction: column;
        gap: 10px;
      }

      .cta-button,
      .cta-button-secondary {
        width: 100%;
        padding: 14px 24px;
      }

      .footer {
        padding: 30px 20px;
      }

      .footer-links {
        flex-direction: column;
        gap: 10px;
      }

      .section-title {
        font-size: 16px;
      }

      .greeting {
        font-size: 14px;
      }

      .intro-text {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .wrapper {
        margin: 5px;
      }

      .hero {
        min-height: 240px;
        padding: 30px 15px;
      }

      .hero h1 {
        font-size: 20px;
      }

      .content {
        padding: 20px 15px;
      }

      .cta-text {
        font-size: 16px;
      }

      .services-list li {
        font-size: 13px;
        padding-left: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- HERO SECTION -->
    <div class="hero" style="background-image: linear-gradient(135deg, rgba(216, 193, 138, 0.95) 0%, rgba(199, 182, 138, 0.95) 100%); background-size: cover;">
      <div class="hero-content">
        <h1>${headline}</h1>
        <p>${subheadline}</p>
      </div>
    </div>

    <!-- CONTENT SECTION -->
    <div class="content">
      <div class="greeting">
        Hola ${clientName},<br><br>
        Encontré tu negocio y me gustó. Aquí va una propuesta que podría cambiar tu presencia online.
      </div>

      <div class="intro-text">
        ${ctaText}
      </div>

      <div class="highlight-box">
        <strong>El dato:</strong> Los negocios con fotos profesionales tienen 3x más conversión que sin ellas. No es opinión, es estadística.
      </div>

      <!-- SERVICES SECTION -->
      <div class="section-title">¿Qué hacemos?</div>
      <ul class="services-list">
        <li>${service1}</li>
        <li>${service2}</li>
        <li>${service3}</li>
        <li>${service4}</li>
        <li>${service5}</li>
      </ul>

      <!-- BENEFITS -->
      <div class="benefits-box">
        <p><strong>Lo que obtienes:</strong></p>
        <p>✓ ${benefit1}</p>
        <p>✓ ${benefit2}</p>
        <p>✓ ${benefit3}</p>
      </div>

      <!-- CTA SECTION -->
      <div class="cta-section">
        <div class="cta-text">¿Interesado en conocer más?</div>
        <div class="cta-buttons">
          <a href="https://wa.me/17863329815" class="cta-button">💬 ${ctaButtonText}</a>
          <a href="https://www.maikphotographer.com" class="cta-button cta-button-secondary">🌐 ${secondaryButtonText}</a>
        </div>
        <div class="cta-note">O simplemente responde este email si prefieres otro formato de contacto</div>
      </div>
    </div>

    <!-- FOOTER SECTION -->
    <div class="footer">
      <div class="footer-name">${footerText}</div>
      <div>Miami, FL</div>

      <div class="footer-links">
        <a href="https://www.maikphotographer.com">Web</a> •
        <a href="https://instagram.com/maik_photographer">Instagram</a> •
        <a href="https://wa.me/17863329815">WhatsApp</a>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-copy">
        © 2026 The303 Creative | Marketing & Photography
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export default { getUniversalEmailTemplate };
