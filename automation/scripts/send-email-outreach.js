#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const leadsFile = path.join(process.cwd(), 'business-leads-today.json');

console.log('\n📧 ENVÍO PROFESIONAL POR EMAIL\n');
console.log('═══════════════════════════════════════════\n');

// Leer leads del archivo JSON
function loadLeads() {
  if (!fs.existsSync(leadsFile)) {
    console.log('❌ No se encontró business-leads-today.json');
    console.log('Ejecuta primero: node search-leads-businesses.js\n');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
  return data;
}

// Generar email profesional personalizado
function generateEmailTemplate(business) {
  // Extraer nombre del dueño
  const ownerName = business.name?.split(' ')[0] || 'Hola';

  // Determinar tipo de negocio para personalización
  let businessType = 'negocio';
  const bio = (business.bio || '').toLowerCase();
  if (bio.includes('restaurant') || bio.includes('cafe') || bio.includes('food')) {
    businessType = 'restaurante';
  } else if (bio.includes('salon') || bio.includes('spa') || bio.includes('beauty')) {
    businessType = 'negocio de belleza';
  } else if (bio.includes('boutique') || bio.includes('store') || bio.includes('shop')) {
    businessType = 'tienda';
  } else if (bio.includes('real estate') || bio.includes('property')) {
    businessType = 'inmobiliaria';
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 0;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #D8C18A 0%, #C7B68A 100%);
      padding: 40px 30px;
      text-align: center;
      color: #111;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 300;
      letter-spacing: 1px;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 16px;
      margin-bottom: 20px;
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
    .package {
      background: #f9f9f9;
      padding: 20px;
      margin: 15px 0;
      border-left: 4px solid #D8C18A;
      border-radius: 4px;
    }
    .package-name {
      font-weight: 600;
      font-size: 16px;
      color: #111;
      margin-bottom: 8px;
    }
    .package-price {
      font-size: 24px;
      color: #D8C18A;
      font-weight: 600;
      margin: 10px 0;
    }
    .package-desc {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }
    .cta {
      display: inline-block;
      background: #D8C18A;
      color: #111;
      padding: 15px 40px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin: 30px 0;
      text-align: center;
      transition: all 0.3s;
    }
    .cta:hover {
      background: #C7B68A;
      text-decoration: none;
    }
    .footer {
      background: #f0f0f0;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #D8C18A;
      text-decoration: none;
    }
    .benefits {
      list-style: none;
      padding: 0;
      margin: 15px 0;
    }
    .benefits li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
      color: #555;
      font-size: 14px;
    }
    .benefits li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #D8C18A;
      font-weight: bold;
      font-size: 18px;
    }
    .social {
      margin: 20px 0;
      text-align: center;
    }
    .social a {
      display: inline-block;
      margin: 0 10px;
      color: #D8C18A;
      text-decoration: none;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <h1>📸 Fotos Profesionales</h1>
      <p>para tu ${businessType}</p>
    </div>

    <!-- CONTENT -->
    <div class="content">
      <div class="greeting">
        <p>Hola <strong>${ownerName}</strong>,</p>

        <p>He visto que tienes una presencia en Instagram y estás creciendo. Eso es excelente 🎉</p>

        <p>Soy <strong>Maikel Marshall</strong>, fotógrafo profesional y director creativo en Miami. Especialmente en los últimos años, he estado trabajando con ${businessType}s como el tuyo para ayudarles a:</p>
      </div>

      <!-- BENEFITS SECTION -->
      <div class="section">
        <ul class="benefits">
          <li>Aumentar engagement en redes sociales con fotos profesionales</li>
          <li>Crear confianza en nuevos clientes mostrando calidad</li>
          <li>Destacar entre la competencia con contenido visual premium</li>
          <li>Obtener más conversiones con imágenes que vendan</li>
        </ul>
      </div>

      <!-- PACKAGES SECTION -->
      <div class="section">
        <div class="section-title">3 Paquetes Disponibles</div>

        <div class="package">
          <div class="package-name">📷 Sesión Portrait</div>
          <div class="package-price">$150</div>
          <div class="package-desc">
            Perfecto para empezar. Sesión de 1-2 horas en tu ubicación.<br>
            <strong>Incluye:</strong> 20+ fotos editadas, entrega en 48h, archivos para redes
          </div>
        </div>

        <div class="package">
          <div class="package-name">🎬 Producción Editorial</div>
          <div class="package-price">$350</div>
          <div class="package-desc">
            Para negocios que quieren destacar. Día completo con dirección de arte.<br>
            <strong>Incluye:</strong> 40+ fotos, video BTS, múltiples setups, edición profesional
          </div>
        </div>

        <div class="package">
          <div class="package-name">📱 Contenido Mensual</div>
          <div class="package-price">$500<span style="font-size: 14px;">/mes</span></div>
          <div class="package-desc">
            Para negocios en crecimiento. 2 sesiones mensuales, contenido listo para Instagram.<br>
            <strong>Incluye:</strong> 60+ fotos/mes, reels, carrusel, atención prioritaria
          </div>
        </div>
      </div>

      <!-- NEXT STEPS -->
      <div class="section">
        <div class="section-title">¿Cómo Empezamos?</div>
        <p>Es muy simple. Solo tienes dos opciones:</p>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 4px; margin: 15px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Opción 1: Conversa por WhatsApp</strong></p>
          <p style="margin: 0; color: #666; font-size: 14px;">
            <a href="https://wa.me/17863329815?text=Hola%20Maikel%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios%20de%20fotograf%C3%ADa" style="color: #D8C18A; text-decoration: none;">
              👉 Click aquí para abrir WhatsApp
            </a>
          </p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 4px; margin: 15px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Opción 2: Responde este email</strong></p>
          <p style="margin: 0; color: #666; font-size: 14px;">
            Cuéntame qué tipo de fotos necesitas, cuándo, y dónde. Te envío una propuesta en 24 horas.
          </p>
        </div>
      </div>

      <!-- PORTFOLIO -->
      <div class="section">
        <div class="section-title">Mi Trabajo</div>
        <p>Puedes ver mi portfolio completo en:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://maikphotographer.com" style="color: #D8C18A; text-decoration: none; font-weight: 600;">
            🌐 maikphotographer.com
          </a>
        </div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://wa.me/17863329815?text=Hola%20Maikel%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios%20de%20fotograf%C3%ADa" class="cta">
          💬 CONVERSAR POR WHATSAPP
        </a>
      </div>

      <p style="margin-top: 40px; color: #999; font-size: 13px;">
        PD: No presiono a nadie. Si simplemente no es el momento, no hay problema. Pero si algún día necesitas fotos profesionales, sabes dónde encontrarme. 😊
      </p>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p style="margin: 0 0 15px 0;">
        <strong>Maikel Marshall</strong><br>
        Fotógrafo & Director Creativo
      </p>

      <div class="social">
        <a href="https://instagram.com/maik_photographer">Instagram</a>
        <a href="https://wa.me/17863329815">WhatsApp</a>
        <a href="https://maikphotographer.com">Web</a>
      </div>

      <p style="margin: 15px 0 0 0; border-top: 1px solid #ddd; padding-top: 15px;">
        © 2026 The303 Creative | Miami, FL
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// Extraer email del negocio
function extractEmail(business) {
  // Si ya tiene email en los datos
  if (business.email && business.email.includes('@')) {
    return business.email;
  }

  // Si tiene website, intentar inferir email
  if (business.website && business.website.includes('.')) {
    const domain = business.website
      .replace(/https?:\/\//i, '')
      .replace(/www\./i, '')
      .split('/')[0];

    // Intentar emails comunes
    const commonEmails = [
      `contact@${domain}`,
      `info@${domain}`,
      `hello@${domain}`,
      `hello@${domain.split('.')[0]}.com`
    ];

    return commonEmails[0]; // Retornar el más probable
  }

  return null;
}

// Enviar email
async function sendEmailToBusiness(business) {
  try {
    const email = extractEmail(business);

    if (!email) {
      console.log(`⚠️  ${business.name} → Sin email disponible`);
      return { success: false, reason: 'no_email' };
    }

    const htmlTemplate = generateEmailTemplate(business);

    await emailTransporter.sendMail({
      from: `"Maikel Marshall | Fotógrafo" <${process.env.BUSINESS_EMAIL}>`,
      to: email,
      subject: `📸 Fotos profesionales para ${business.name}`,
      html: htmlTemplate,
      replyTo: process.env.BUSINESS_EMAIL,
      headers: {
        'X-Priority': '3'
      }
    });

    console.log(`✅ ${business.name.padEnd(35)} → ${email}`);
    return { success: true, email: email };
  } catch (error) {
    console.log(`❌ ${business.name} → Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Procesar todos los negocios
async function processCampaign(businesses) {
  const results = [];
  let sentCount = 0;
  let failCount = 0;

  console.log('Enviando emails a negocios...\n');

  for (const business of businesses.slice(0, 20)) {
    const result = await sendEmailToBusiness(business);

    results.push({
      name: business.name,
      source: business.source,
      status: result.success ? 'sent' : 'failed',
      email: result.email || 'N/A',
      reason: result.reason || result.error || null
    });

    if (result.success) {
      sentCount++;
    } else {
      failCount++;
    }

    // Delay entre emails para no ser detectado como spam
    await new Promise(r => setTimeout(r, 1500));
  }

  return { results, stats: { sentCount, failCount } };
}

async function main() {
  try {
    const leads = loadLeads();
    console.log(`📊 Cargados ${leads.length} leads\n`);

    const { results, stats } = await processCampaign(leads);

    // Guardar reporte
    const reportFile = path.join(process.cwd(), 'email-campaign-results.json');
    fs.writeFileSync(reportFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      total_processed: results.length,
      emails_sent: stats.sentCount,
      emails_failed: stats.failCount,
      details: results
    }, null, 2));

    console.log('\n═══════════════════════════════════════════');
    console.log(`\n✅ CAMPAÑA COMPLETADA:\n`);
    console.log(`  ✉️  Emails enviados: ${stats.sentCount}`);
    console.log(`  ❌ Emails fallidos: ${stats.failCount}`);
    console.log(`  📊 Reporte guardado: email-campaign-results.json\n`);
    console.log('Espera 24-48 horas para respuestas 📧\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
