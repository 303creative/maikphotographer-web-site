/**
 * 🎨 UNIVERSAL EMAIL TEMPLATE
 *
 * Un único template HTML adaptable a TODOS los tipos de negocio
 * - Contenido dinámico por cliente
 * - Imágenes reales de portfolio
 * - Responsive para móviles (prioritario)
 * - Diseño premium que vende
 */

export function getUniversalEmailTemplate(config) {
  const {
    clientName,
    businessType,
    headline,
    subheadline,
    stat1,
    stat1Label,
    stat2,
    stat2Label,
    stat3,
    stat3Label,
    benefit1,
    benefit2,
    benefit3,
    benefit4,
    benefit5,
    portfolioImage1,
    portfolioLabel1,
    portfolioImage2,
    portfolioLabel2,
    package1Name,
    package1Price,
    package1Desc,
    package2Name,
    package2Price,
    package2Desc,
    package3Name,
    package3Price,
    package3Desc,
    ctaText,
    ctaButtonText = 'Conversar por WhatsApp',
    secondaryButtonText = 'Ver portfolio',
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
    /* ═══════════════════════════════════════════════════════ */
    /* RESET & BASE                                            */
    /* ═══════════════════════════════════════════════════════ */

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
    }

    /* ═══════════════════════════════════════════════════════ */
    /* CONTAINER & WRAPPER                                     */
    /* ═══════════════════════════════════════════════════════ */

    .wrapper {
      width: 100%;
      max-width: 650px;
      margin: 20px auto;
      background: white;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      overflow: hidden;
    }

    .container {
      padding: 0;
    }

    /* ═══════════════════════════════════════════════════════ */
    /* HEADER (HERO SECTION)                                   */
    /* ═══════════════════════════════════════════════════════ */

    .hero {
      position: relative;
      width: 100%;
      height: 400px;
      background: linear-gradient(135deg, #D8C18A 0%, #C7B68A 100%);
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,%3Csvg%20width=%22100%22%20height=%22100%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id=%22grid%22%20width=%22100%22%20height=%22100%22%20patternUnits=%22userSpaceOnUse%22%3E%3Cpath%20d=%22M%20100%200%20L%200%20100%20M%20-10%2010%20L%2010%20-10%20M%200%20100%20L%20100%200%22%20fill=%22none%22%20stroke=%22rgba(255,255,255,0.05)%22%20stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width=%22100%22%20height=%22100%22%20fill=%22url(%23grid)%22/%3E%3C/svg%3E');
      opacity: 0.3;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      padding: 60px 40px;
      text-align: center;
      color: #111;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .hero-tag {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.8;
      margin-bottom: 20px;
      background: rgba(0, 0, 0, 0.08);
      padding: 8px 16px;
      border-radius: 50px;
      width: fit-content;
    }

    .hero h1 {
      font-size: clamp(28px, 6vw, 42px);
      font-weight: 300;
      letter-spacing: -0.5px;
      margin-bottom: 15px;
      line-height: 1.2;
    }

    .hero p {
      font-size: 16px;
      opacity: 0.9;
      max-width: 400px;
      margin: 0 auto;
    }

    /* ═══════════════════════════════════════════════════════ */
    /* CONTENT SECTION                                         */
    /* ═══════════════════════════════════════════════════════ */

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

    /* ═══════════════════════════════════════════════════════ */
    /* BENEFITS SECTION                                        */
    /* ═══════════════════════════════════════════════════════ */

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #D8C18A;
      margin: 40px 0 20px 0;
      border-bottom: 2px solid #D8C18A;
      padding-bottom: 12px;
      display: inline-block;
    }

    .benefits-list {
      list-style: none;
      margin: 20px 0;
    }

    .benefits-list li {
      padding: 12px 0;
      padding-left: 28px;
      position: relative;
      font-size: 15px;
      color: #555;
      line-height: 1.6;
    }

    .benefits-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #D8C18A;
      font-weight: bold;
      font-size: 18px;
      line-height: 1;
    }

    /* ═══════════════════════════════════════════════════════ */
    /* PORTFOLIO SECTION                                       */
    /* ═══════════════════════════════════════════════════════ */

    .portfolio-section {
      margin: 50px 0;
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }

    .portfolio-item {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .portfolio-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(216, 193, 138, 0.2);
    }

    .portfolio-item img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }

    .portfolio-label {
      background: linear-gradient(135deg, #D8C18A 0%, #C7B68A 100%);
      color: #111;
      padding: 12px 16px;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* ═══════════════════════════════════════════════════════ */
    /* STATS SECTION                                           */
    /* ═══════════════════════════════════════════════════════ */

    .stats-section {
      background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
      padding: 40px;
      border-radius: 8px;
      margin: 40px 0;
      border: 1px solid rgba(216, 193, 138, 0.1);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      text-align: center;
    }

    .stat-item {
      padding: 20px 0;
    }

    .stat-number {
      font-size: clamp(28px, 5vw, 38px);
      font-weight: 600;
      color: #D8C18A;
      margin-bottom: 8px;
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 500;
    }

    /* ═══════════════════════════════════════════════════════ */
    /* PACKAGES SECTION                                        */
    /* ═══════════════════════════════════════════════════════ */

    .packages-section {
      margin: 40px 0;
    }

    .package-item {
      background: #f9f9f9;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 16px;
      border-left: 4px solid #D8C18A;
      transition: all 0.3s ease;
    }

    .package-item:hover {
      background: #ffffff;
      box-shadow: 0 4px 12px rgba(216, 193, 138, 0.15);
    }

    .package-name {
      font-size: 16px;
      font-weight: 600;
      color: #111;
      margin-bottom: 8px;
    }

    .package-price {
      font-size: 28px;
      font-weight: 600;
      color: #D8C18A;
      margin: 10px 0;
    }

    .package-price small {
      font-size: 13px;
      color: #999;
      font-weight: 400;
    }

    .package-desc {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }

    /* ═══════════════════════════════════════════════════════ */
    /* CTA SECTION                                             */
    /* ═══════════════════════════════════════════════════════ */

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

    /* ═══════════════════════════════════════════════════════ */
    /* FOOTER                                                  */
    /* ═══════════════════════════════════════════════════════ */

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

    /* ═══════════════════════════════════════════════════════ */
    /* RESPONSIVE DESIGN - MOBILE FIRST (PRIORITY)             */
    /* ═══════════════════════════════════════════════════════ */

    @media (max-width: 640px) {
      .wrapper {
        margin: 10px;
        border-radius: 8px;
      }

      .hero {
        height: 300px;
      }

      .hero-content {
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

      .portfolio-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .portfolio-item img {
        height: 250px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .stat-number {
        font-size: 32px;
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

      .package-item {
        padding: 16px;
      }

      .package-name {
        font-size: 14px;
      }

      .package-price {
        font-size: 22px;
      }

      .section-title {
        font-size: 16px;
      }
    }

    @media (max-width: 480px) {
      .wrapper {
        margin: 5px;
      }

      .hero {
        height: 250px;
      }

      .hero-content {
        padding: 30px 15px;
      }

      .hero h1 {
        font-size: 20px;
      }

      .content {
        padding: 20px 15px;
      }

      .hero-tag {
        font-size: 10px;
        padding: 6px 12px;
      }

      .benefits-list li {
        font-size: 13px;
        padding-left: 24px;
      }

      .stat-number {
        font-size: 28px;
      }

      .stat-label {
        font-size: 10px;
      }

      .cta-text {
        font-size: 16px;
      }

      .greeting {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- HERO SECTION -->
    <div class="hero">
      <div class="hero-content">
        <div class="hero-tag">📸 Fotografía Profesional</div>
        <h1>${headline}</h1>
        <p>${subheadline}</p>
      </div>
    </div>

    <!-- CONTENT SECTION -->
    <div class="content">
      <div class="greeting">
        Hola,<br><br>
        Encontré <strong>${clientName}</strong> — y me llamó la atención.
      </div>

      <p style="font-size: 15px; color: #666; margin-bottom: 15px;">
        Lo que noté: tienes potencial pero necesitas fotos profesionales que lo muestren.
      </p>

      <div class="highlight-box">
        <strong>Hecho comprobado:</strong> ${stat1} <strong>${stat1Label}</strong>
      </div>

      <!-- BENEFITS SECTION -->
      <div class="section-title">¿Qué incluye?</div>
      <ul class="benefits-list">
        <li>${benefit1}</li>
        <li>${benefit2}</li>
        <li>${benefit3}</li>
        <li>${benefit4}</li>
        <li>${benefit5}</li>
      </ul>

      <!-- PORTFOLIO SECTION -->
      <div class="portfolio-section">
        <div class="section-title">Ejemplos recientes</div>
        <div class="portfolio-grid">
          <div class="portfolio-item">
            <img src="${portfolioImage1}" alt="${portfolioLabel1}" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="portfolio-label">${portfolioLabel1}</div>
          </div>
          <div class="portfolio-item">
            <img src="${portfolioImage2}" alt="${portfolioLabel2}" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="portfolio-label">${portfolioLabel2}</div>
          </div>
        </div>
      </div>

      <!-- STATS SECTION -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">${stat1}</div>
            <div class="stat-label">${stat1Label}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${stat2}</div>
            <div class="stat-label">${stat2Label}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${stat3}</div>
            <div class="stat-label">${stat3Label}</div>
          </div>
        </div>
      </div>

      <!-- PACKAGES SECTION -->
      <div class="packages-section">
        <div class="section-title">Paquetes disponibles</div>

        <div class="package-item">
          <div class="package-name">${package1Name}</div>
          <div class="package-price">${package1Price}</div>
          <div class="package-desc">${package1Desc}</div>
        </div>

        <div class="package-item">
          <div class="package-name">${package2Name}</div>
          <div class="package-price">${package2Price}</div>
          <div class="package-desc">${package2Desc}</div>
        </div>

        <div class="package-item">
          <div class="package-name">${package3Name}</div>
          <div class="package-price">${package3Price}</div>
          <div class="package-desc">${package3Desc}</div>
        </div>
      </div>

      <!-- CTA SECTION -->
      <div class="cta-section">
        <div class="cta-text">${ctaText}</div>
        <div class="cta-buttons">
          <a href="https://wa.me/17863329815" class="cta-button">💬 ${ctaButtonText}</a>
          <a href="https://www.maikphotographer.com" class="cta-button cta-button-secondary">🌐 ${secondaryButtonText}</a>
        </div>
        <div class="cta-note">O responde este email si prefieres otra forma de contacto</div>
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
