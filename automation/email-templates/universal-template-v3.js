/**
 * 🎨 UNIVERSAL EMAIL TEMPLATE V3 (MINIMALISTA SIN IMAGEN)
 *
 * Puro contenido, sin imágenes innecesarias
 * - Copy directo y claro
 * - Servicios destacados
 * - Beneficios enfocados
 * - CTA fuerte
 *
 * Preparado para inyectar banner cuando esté listo
 */

export function getUniversalEmailTemplate(config) {
  const {
    clientName,
    businessType,
    headline,
    subheadline,
    mainMessage,
    service1,
    service2,
    service3,
    service4,
    service5,
    benefit1,
    benefit2,
    benefit3,
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

    /* HEADER ACCENT */
    .header-accent {
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #D8C18A 0%, #C7B68A 100%);
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

    .headline {
      font-size: 22px;
      font-weight: 600;
      color: #111;
      margin: 30px 0 10px 0;
      line-height: 1.3;
    }

    .subheadline {
      font-size: 14px;
      color: #999;
      margin-bottom: 25px;
      font-weight: 400;
    }

    .main-message {
      font-size: 15px;
      color: #555;
      margin-bottom: 30px;
      line-height: 1.8;
      padding: 20px;
      background: #f9f9f9;
      border-left: 3px solid #D8C18A;
      border-radius: 4px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #D8C18A;
      margin: 35px 0 15px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* SERVICES LIST */
    .services-list {
      list-style: none;
      margin: 15px 0 30px 0;
    }

    .services-list li {
      padding: 12px 0;
      padding-left: 28px;
      position: relative;
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }

    .services-list li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: #D8C18A;
      font-weight: bold;
      font-size: 16px;
    }

    /* BENEFITS */
    .benefits-section {
      background: #fafafa;
      border: 1px solid #efefef;
      border-radius: 6px;
      padding: 25px;
      margin: 30px 0;
    }

    .benefits-section p {
      font-size: 13px;
      color: #666;
      margin-bottom: 10px;
      line-height: 1.6;
    }

    .benefits-section p:first-child {
      font-weight: 600;
      color: #111;
      margin-bottom: 15px;
    }

    .benefits-section p:last-child {
      margin-bottom: 0;
    }

    .benefit-item {
      padding-left: 20px;
      position: relative;
    }

    .benefit-item::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #D8C18A;
      font-weight: bold;
    }

    /* CTA SECTION */
    .cta-section {
      text-align: center;
      margin: 40px 0;
      padding: 35px 0;
      border-top: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
    }

    .cta-headline {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 20px;
    }

    .cta-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin: 20px 0;
    }

    .cta-button {
      display: inline-block;
      padding: 14px 36px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 0.8px;
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
      box-shadow: 0 4px 15px rgba(216, 193, 138, 0.25);
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
      font-size: 12px;
      color: #999;
      margin-top: 15px;
    }

    /* FOOTER */
    .footer {
      background: #f5f5f5;
      padding: 35px 40px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #efefef;
    }

    .footer-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 6px;
      font-size: 13px;
    }

    .footer-location {
      font-size: 12px;
      color: #999;
      margin-bottom: 12px;
    }

    .footer-links {
      margin: 12px 0;
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: #D8C18A;
      text-decoration: none;
      font-weight: 500;
      font-size: 11px;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #C7B68A;
    }

    .footer-divider {
      margin: 12px 0;
      border-top: 1px solid #e0e0e0;
      padding-top: 12px;
    }

    .footer-copy {
      font-size: 10px;
      color: #bbb;
    }

    /* RESPONSIVE */
    @media (max-width: 640px) {
      .wrapper {
        margin: 10px;
        border-radius: 8px;
      }

      .content {
        padding: 30px 20px;
      }

      .headline {
        font-size: 20px;
        margin: 20px 0 8px 0;
      }

      .main-message {
        font-size: 14px;
        padding: 15px;
      }

      .services-list li {
        font-size: 13px;
      }

      .benefits-section {
        padding: 20px;
      }

      .cta-buttons {
        flex-direction: column;
        gap: 10px;
      }

      .cta-button,
      .cta-button-secondary {
        width: 100%;
        padding: 12px 24px;
      }

      .footer {
        padding: 25px 20px;
      }

      .footer-links {
        gap: 8px;
      }
    }

    @media (max-width: 480px) {
      .wrapper {
        margin: 5px;
      }

      .content {
        padding: 20px 15px;
      }

      .headline {
        font-size: 18px;
      }

      .section-title {
        font-size: 14px;
      }

      .greeting {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- HEADER ACCENT -->
    <div class="header-accent"></div>

    <!-- CONTENT SECTION -->
    <div class="content">
      <!-- GREETING -->
      <div class="greeting">
        Hola <strong>${clientName}</strong>,
      </div>

      <!-- HEADLINE -->
      <div class="headline">${headline}</div>
      <div class="subheadline">${subheadline}</div>

      <!-- MAIN MESSAGE -->
      <div class="main-message">
        ${mainMessage}
      </div>

      <!-- SERVICES SECTION -->
      <div class="section-title">Qué Hacemos</div>
      <ul class="services-list">
        <li>${service1}</li>
        <li>${service2}</li>
        <li>${service3}</li>
        <li>${service4}</li>
        <li>${service5}</li>
      </ul>

      <!-- BENEFITS SECTION -->
      <div class="benefits-section">
        <p>Lo que obtienes:</p>
        <p class="benefit-item">${benefit1}</p>
        <p class="benefit-item">${benefit2}</p>
        <p class="benefit-item">${benefit3}</p>
      </div>

      <!-- CTA SECTION -->
      <div class="cta-section">
        <div class="cta-headline">¿Interesado en conocer más?</div>
        <div class="cta-buttons">
          <a href="https://wa.me/17863329815" class="cta-button">💬 ${ctaButtonText}</a>
          <a href="https://www.maikphotographer.com" class="cta-button cta-button-secondary">🌐 ${secondaryButtonText}</a>
        </div>
        <div class="cta-note">O responde este email si prefieres otro formato de contacto</div>
      </div>
    </div>

    <!-- FOOTER SECTION -->
    <div class="footer">
      <div class="footer-name">${footerText}</div>
      <div class="footer-location">Miami, FL</div>

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
