/**
 * 🎨 HTML EMAIL TEMPLATES - PROFESSIONAL & INTERACTIVE
 *
 * Templates with:
 * - Hero image
 * - Portfolio examples
 * - Interactive CTAs
 * - Responsive design
 * - Professional branding
 */

// ═══════════════════════════════════════════════════════════════
// BASE TEMPLATE FUNCTION
// ═══════════════════════════════════════════════════════════════

function getBaseTemplate(content, heroImage, businessName) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fotos Profesionales para ${businessName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 650px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #D8C18A 0%, #C7B68A 100%);
      padding: 40px 30px;
      text-align: center;
      color: #111;
    }

    .header-logo {
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 10px;
      opacity: 0.9;
    }

    .header h1 {
      font-size: 32px;
      margin: 10px 0;
      font-weight: 300;
      letter-spacing: 1px;
    }

    .header p {
      font-size: 14px;
      opacity: 0.85;
    }

    .hero {
      width: 100%;
      height: 300px;
      object-fit: cover;
      display: block;
    }

    .content {
      padding: 40px 30px;
    }

    .greeting {
      font-size: 16px;
      margin-bottom: 20px;
      color: #333;
    }

    .greeting strong {
      color: #D8C18A;
    }

    .section {
      margin: 30px 0;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #D8C18A;
      margin-bottom: 15px;
      border-bottom: 2px solid #D8C18A;
      padding-bottom: 10px;
    }

    .benefit-list {
      list-style: none;
      margin: 15px 0;
    }

    .benefit-list li {
      padding: 10px 0;
      padding-left: 25px;
      position: relative;
      color: #555;
      font-size: 14px;
    }

    .benefit-list li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #D8C18A;
      font-weight: bold;
      font-size: 16px;
    }

    .portfolio-section {
      margin: 40px 0;
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 20px 0;
    }

    .portfolio-item {
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .portfolio-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 15px rgba(216, 193, 138, 0.3);
    }

    .portfolio-item img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }

    .portfolio-label {
      background: #D8C18A;
      color: #111;
      padding: 10px;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }

    .cta-section {
      text-align: center;
      margin: 40px 0;
      padding: 40px 0;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
    }

    .cta-text {
      font-size: 16px;
      margin-bottom: 20px;
      color: #333;
    }

    .cta-button {
      display: inline-block;
      background: #D8C18A;
      color: #111;
      padding: 16px 50px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: all 0.3s ease;
      border: 2px solid #D8C18A;
      cursor: pointer;
    }

    .cta-button:hover {
      background: #C7B68A;
      border-color: #C7B68A;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(216, 193, 138, 0.3);
    }

    .secondary-cta {
      display: inline-block;
      background: transparent;
      color: #D8C18A;
      padding: 14px 40px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      border: 2px solid #D8C18A;
      margin-left: 10px;
      transition: all 0.3s ease;
    }

    .secondary-cta:hover {
      background: #D8C18A;
      color: #111;
    }

    .stats {
      background: #f9f9f9;
      padding: 25px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .stats-item {
      text-align: center;
      padding: 15px;
    }

    .stats-number {
      font-size: 28px;
      font-weight: 600;
      color: #D8C18A;
      margin-bottom: 5px;
    }

    .stats-label {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .divider {
      height: 1px;
      background: #e0e0e0;
      margin: 30px 0;
    }

    .package {
      background: #f9f9f9;
      padding: 20px;
      margin: 15px 0;
      border-left: 4px solid #D8C18A;
      border-radius: 4px;
    }

    .package-name {
      font-weight: 600;
      font-size: 15px;
      color: #111;
      margin-bottom: 8px;
    }

    .package-price {
      font-size: 22px;
      color: #D8C18A;
      font-weight: 600;
      margin: 10px 0;
    }

    .package-desc {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }

    .footer {
      background: #f5f5f5;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #e0e0e0;
    }

    .footer-links {
      margin: 15px 0;
    }

    .footer-links a {
      color: #D8C18A;
      text-decoration: none;
      margin: 0 10px;
      font-weight: 500;
    }

    .social {
      margin: 15px 0;
    }

    .social a {
      display: inline-block;
      width: 36px;
      height: 36px;
      background: #D8C18A;
      color: #111;
      border-radius: 50%;
      line-height: 36px;
      text-align: center;
      text-decoration: none;
      margin: 0 5px;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .social a:hover {
      background: #C7B68A;
      transform: scale(1.1);
    }

    .highlight {
      background: rgba(216, 193, 138, 0.1);
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
      border-left: 4px solid #D8C18A;
    }

    .highlight strong {
      color: #D8C18A;
    }

    @media (max-width: 600px) {
      .container { width: 100%; }
      .header { padding: 30px 20px; }
      .header h1 { font-size: 24px; }
      .content { padding: 25px 20px; }
      .portfolio-grid { grid-template-columns: 1fr; }
      .cta-button, .secondary-cta { display: block; margin: 10px 0; }
      .hero { height: 200px; }
    }
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>
  `;
}

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 1: RESTAURANTE (HTML)
// ═══════════════════════════════════════════════════════════════

export function getRestaurantEmailHTML(restaurantName, neighborhood = 'Miami') {
  const content = `
    <div class="header">
      <div class="header-logo">📸 Maikel Marshall Photography</div>
      <h1>Fotos que generan reservas</h1>
      <p>Fotografía profesional de alimentos para restaurantes</p>
    </div>

    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=650&h=300&fit=crop"
         alt="Professional food photography" class="hero">

    <div class="content">
      <div class="greeting">
        Hola,<br><br>
        Encontré <strong>${restaurantName}</strong> en Google Maps — me encanta lo que hacen en <strong>${neighborhood}</strong>.
      </div>

      <p>
        Vi que su comida se ve deliciosa, pero las fotos no le hacen justicia.
      </p>

      <div class="highlight">
        <strong>Hecho comprobado:</strong> Restaurantes con fotos profesionales en Google Maps reciben
        <strong style="color: #D8C18A;">30% más reservas</strong> en los primeros 90 días.
      </div>

      <div class="section">
        <div class="section-title">Lo que ofrezco</div>
        <ul class="benefit-list">
          <li>Fotos profesionales de tus mejores platos</li>
          <li>100+ fotos optimizadas para Google Maps, Instagram y tu sitio web</li>
          <li>Estilo cinemático que hace agua la boca</li>
          <li>Entrega en 7 días</li>
          <li>Derecho a usar las fotos para siempre</li>
        </ul>
      </div>

      <div class="section portfolio-section">
        <div class="section-title">Ejemplos de mi trabajo</div>
        <div class="portfolio-grid">
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=180&fit=crop"
                 alt="Gourmet plating">
            <div class="portfolio-label">Platos Gourmet</div>
          </div>
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=180&fit=crop"
                 alt="Restaurant ambiance">
            <div class="portfolio-label">Ambiente</div>
          </div>
        </div>
      </div>

      <div class="stats">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
          <div class="stats-item">
            <div class="stats-number">30%</div>
            <div class="stats-label">Más reservas</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">100+</div>
            <div class="stats-label">Fotos por sesión</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">7 días</div>
            <div class="stats-label">Entrega</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Paquetes disponibles</div>
        <div class="package">
          <div class="package-name">📸 Sesión Portrait</div>
          <div class="package-price">$150</div>
          <div class="package-desc">1-2 horas, 20+ fotos editadas, entrega en 48h</div>
        </div>
        <div class="package">
          <div class="package-name">🎬 Producción Editorial</div>
          <div class="package-price">$350</div>
          <div class="package-desc">Día completo, dirección de arte, 40+ fotos, video BTS</div>
        </div>
        <div class="package">
          <div class="package-name">📱 Contenido Mensual</div>
          <div class="package-price">$500/mes</div>
          <div class="package-desc">2 sesiones al mes, 60+ fotos, contenido para redes</div>
        </div>
      </div>

      <div class="cta-section">
        <div class="cta-text">¿Listo para recibir más clientes?</div>
        <a href="https://wa.me/17863329815?text=Hola%20Maikel%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20fotos%20para%20mi%20restaurante"
           class="cta-button">💬 Conversar por WhatsApp</a>
        <br><br>
        <a href="https://www.maikphotographer.com" class="secondary-cta">🌐 Ver portfolio completo</a>
      </div>

      <p style="text-align: center; font-size: 13px; color: #999; margin-top: 20px;">
        O responde este email si prefieres comunicarte de otra forma.
      </p>
    </div>

    <div class="footer">
      <strong>Maikel Marshall</strong><br>
      Fotógrafo & Director Creativo<br>
      Miami, FL

      <div class="footer-links">
        <a href="https://www.maikphotographer.com">Web</a> •
        <a href="https://instagram.com/maik_photographer">Instagram</a> •
        <a href="https://wa.me/17863329815">WhatsApp</a>
      </div>

      <p style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;">
        © 2026 The303 Creative | Miami, FL
      </p>
    </div>
  `;

  return getBaseTemplate(content, 'restaurant', restaurantName);
}

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 2: BOUTIQUE/TIENDA (HTML)
// ═══════════════════════════════════════════════════════════════

export function getBoutiqueEmailHTML(storeName, neighborhood = 'Miami') {
  const content = `
    <div class="header">
      <div class="header-logo">📸 Maikel Marshall Photography</div>
      <h1>Fotos que venden</h1>
      <p>Fotografía de moda y productos para boutiques y tiendas</p>
    </div>

    <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=650&h=300&fit=crop"
         alt="Fashion photography" class="hero">

    <div class="content">
      <div class="greeting">
        Hola,<br><br>
        Encontré <strong>${storeName}</strong> en ${neighborhood} — hermosa tienda.
      </div>

      <p>
        Vi que tienes una buena presencia física, pero tu Instagram podría brillar mucho más.
      </p>

      <div class="highlight">
        <strong>Estadística:</strong> Las tiendas con fotos profesionales en Instagram reciben
        <strong style="color: #D8C18A;">60% más engagement</strong> y
        <strong style="color: #D8C18A;">3x más foot traffic</strong>.
      </div>

      <div class="section">
        <div class="section-title">¿Qué incluye?</div>
        <ul class="benefit-list">
          <li>Fotos profesionales de tus productos</li>
          <li>Sesiones de estilo de vida (lifestyle)</li>
          <li>Contenido listo para Instagram, TikTok, y Pinterest</li>
          <li>80+ fotos editadas y optimizadas</li>
          <li>Reels y carruseles listos para publicar</li>
        </ul>
      </div>

      <div class="section portfolio-section">
        <div class="section-title">Ejemplos recientes</div>
        <div class="portfolio-grid">
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=180&fit=crop"
                 alt="Product photography">
            <div class="portfolio-label">Productos</div>
          </div>
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=180&fit=crop"
                 alt="Lifestyle">
            <div class="portfolio-label">Lifestyle</div>
          </div>
        </div>
      </div>

      <div class="stats">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
          <div class="stats-item">
            <div class="stats-number">60%</div>
            <div class="stats-label">Más engagement</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">80+</div>
            <div class="stats-label">Fotos</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">7 días</div>
            <div class="stats-label">Entrega</div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="cta-text">Transforma tu Instagram en una máquina de ventas</div>
        <a href="https://wa.me/17863329815?text=Hola%20Maikel%2C%20me%20interesa%20fotos%20profesionales%20para%20mi%20tienda"
           class="cta-button">💬 Quiero más detalles</a>
        <br><br>
        <a href="https://www.maikphotographer.com" class="secondary-cta">Ver portfolio</a>
      </div>
    </div>

    <div class="footer">
      <strong>Maikel Marshall</strong><br>
      Fotógrafo de Moda & Productos<br>
      Miami, FL

      <div class="footer-links">
        <a href="https://www.maikphotographer.com">Web</a> •
        <a href="https://instagram.com/maik_photographer">Instagram</a> •
        <a href="https://wa.me/17863329815">WhatsApp</a>
      </div>

      <p style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;">
        © 2026 The303 Creative | Miami, FL
      </p>
    </div>
  `;

  return getBaseTemplate(content, 'boutique', storeName);
}

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 3: DULCERÍA/REPOSTERÍA (HTML)
// ═══════════════════════════════════════════════════════════════

export function getBakeryEmailHTML(bakeryName, neighborhood = 'Miami') {
  const content = `
    <div class="header">
      <div class="header-logo">📸 Maikel Marshall Photography</div>
      <h1>Fotos que hacen agua la boca</h1>
      <p>Fotografía profesional para dulcerías y repostería</p>
    </div>

    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=650&h=300&fit=crop"
         alt="Pastry photography" class="hero">

    <div class="content">
      <div class="greeting">
        Hola,<br><br>
        Encontré <strong>${bakeryName}</strong> — tus productos se ven deliciosos.
      </div>

      <p>
        Lo que noté: Tus dulces merecen fotos que muestren toda su belleza y hagan que la gente quiera probarlos.
      </p>

      <div class="highlight">
        <strong>Resultado comprobado:</strong> Dulcerías con fotos profesionales reciben
        <strong style="color: #D8C18A;">40% más pedidos online</strong> en el primer mes.
      </div>

      <div class="section">
        <div class="section-title">Mi especialidad</div>
        <ul class="benefit-list">
          <li>Fotografía de pasteles y postres que vende</li>
          <li>50+ fotos en una sesión</li>
          <li>Contenido listo para Instagram, TikTok y tu sitio web</li>
          <li>Estilo que destaca tus mejores creaciones</li>
          <li>Videos cortos (reels) incluidos</li>
        </ul>
      </div>

      <div class="section portfolio-section">
        <div class="section-title">Portfolio de repostería</div>
        <div class="portfolio-grid">
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=180&fit=crop"
                 alt="Pastry details">
            <div class="portfolio-label">Pasteles</div>
          </div>
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=180&fit=crop"
                 alt="Desserts">
            <div class="portfolio-label">Postres</div>
          </div>
        </div>
      </div>

      <div class="stats">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
          <div class="stats-item">
            <div class="stats-number">40%</div>
            <div class="stats-label">Más pedidos</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">50+</div>
            <div class="stats-label">Fotos</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">$200</div>
            <div class="stats-label">Inversión</div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="cta-text">Haz que tus dulces sean irresistibles en Instagram</div>
        <a href="https://wa.me/17863329815?text=Hola%20Maikel%2C%20me%20interesa%20fotos%20para%20mi%20dulceria"
           class="cta-button">📸 Reservar sesión</a>
        <br><br>
        <a href="https://www.maikphotographer.com" class="secondary-cta">Ver más trabajos</a>
      </div>
    </div>

    <div class="footer">
      <strong>Maikel Marshall</strong><br>
      Fotógrafo de Alimentos & Productos<br>
      Miami, FL

      <div class="footer-links">
        <a href="https://www.maikphotographer.com">Web</a> •
        <a href="https://instagram.com/maik_photographer">Instagram</a> •
        <a href="https://wa.me/17863329815">WhatsApp</a>
      </div>

      <p style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;">
        © 2026 The303 Creative | Miami, FL
      </p>
    </div>
  `;

  return getBaseTemplate(content, 'bakery', bakeryName);
}

// ═══════════════════════════════════════════════════════════════
// CATEGORÍA 4: SALÓN DE BELLEZA (HTML)
// ═══════════════════════════════════════════════════════════════

export function getSalonEmailHTML(salonName, neighborhood = 'Miami') {
  const content = `
    <div class="header">
      <div class="header-logo">📸 Maikel Marshall Photography</div>
      <h1>Fotos que inspiran confianza</h1>
      <p>Fotografía profesional para salones de belleza</p>
    </div>

    <img src="https://images.unsplash.com/photo-1552591190-1c38f0f86d24?w=650&h=300&fit=crop"
         alt="Beauty photography" class="hero">

    <div class="content">
      <div class="greeting">
        Hola,<br><br>
        Vi <strong>${salonName}</strong> en Google Maps — se ve profesional.
      </div>

      <p>
        Aquí está el dato: 70% de los clientes de salones eligen basándose en las fotos de transformaciones antes/después que ven en Instagram.
      </p>

      <div class="highlight">
        <strong>Hecho:</strong> Salones con fotos profesionales reciben
        <strong style="color: #D8C18A;">70% más consultas</strong> de nuevos clientes.
      </div>

      <div class="section">
        <div class="section-title">Qué fotografiamos</div>
        <ul class="benefit-list">
          <li>Antes/Después (lo que más vende)</li>
          <li>Detalles de trabajos (cortes, colores, estilos)</li>
          <li>Ambiente del salón</li>
          <li>Team photos (humaniza tu marca)</li>
          <li>60+ fotos listas para Instagram</li>
        </ul>
      </div>

      <div class="section portfolio-section">
        <div class="section-title">Mi trabajo en salones</div>
        <div class="portfolio-grid">
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1552591190-1c38f0f86d24?w=400&h=180&fit=crop"
                 alt="Hair transformation">
            <div class="portfolio-label">Transformaciones</div>
          </div>
          <div class="portfolio-item">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=180&fit=crop"
                 alt="Salon ambiance">
            <div class="portfolio-label">Ambiente</div>
          </div>
        </div>
      </div>

      <div class="stats">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
          <div class="stats-item">
            <div class="stats-number">70%</div>
            <div class="stats-label">Más clientes</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">60+</div>
            <div class="stats-label">Fotos</div>
          </div>
          <div class="stats-item">
            <div class="stats-number">$250</div>
            <div class="stats-label">Sesión</div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="cta-text">Atrae más clientes con fotos profesionales</div>
        <a href="https://wa.me/17863329815?text=Hola%20Maikel%2C%20quiero%20fotos%20para%20mi%20salon"
           class="cta-button">💬 Agendar sesión</a>
        <br><br>
        <a href="https://www.maikphotographer.com" class="secondary-cta">Ver portfolio</a>
      </div>
    </div>

    <div class="footer">
      <strong>Maikel Marshall</strong><br>
      Fotógrafo de Belleza & Salones<br>
      Miami, FL

      <div class="footer-links">
        <a href="https://www.maikphotographer.com">Web</a> •
        <a href="https://instagram.com/maik_photographer">Instagram</a> •
        <a href="https://wa.me/17863329815">WhatsApp</a>
      </div>

      <p style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;">
        © 2026 The303 Creative | Miami, FL
      </p>
    </div>
  `;

  return getBaseTemplate(content, 'salon', salonName);
}

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTION: GET HTML BY BUSINESS TYPE
// ═══════════════════════════════════════════════════════════════

export function getHTMLEmailByType(businessType, businessName, neighborhood = 'Miami') {
  const type = businessType?.toLowerCase() || '';

  if (type.includes('restaurant') || type.includes('cafe') || type.includes('food')) {
    return getRestaurantEmailHTML(businessName, neighborhood);
  }

  if (type.includes('salon') || type.includes('spa') || type.includes('beauty')) {
    return getSalonEmailHTML(businessName, neighborhood);
  }

  if (type.includes('bakery') || type.includes('dulce') || type.includes('pastry')) {
    return getBakeryEmailHTML(businessName, neighborhood);
  }

  if (type.includes('boutique') || type.includes('store') || type.includes('shop')) {
    return getBoutiqueEmailHTML(businessName, neighborhood);
  }

  // Default to restaurant
  return getRestaurantEmailHTML(businessName, neighborhood);
}

export default {
  getRestaurantEmailHTML,
  getBoutiqueEmailHTML,
  getBakeryEmailHTML,
  getSalonEmailHTML,
  getHTMLEmailByType
};
