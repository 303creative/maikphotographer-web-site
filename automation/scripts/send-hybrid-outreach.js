#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';
import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const leadsFile = path.join(process.cwd(), 'business-leads-today.json');

console.log('\n🚀 ENVÍO AUTOMÁTICO HÍBRIDO — WhatsApp + Email\n');
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

// Extraer número de WhatsApp del bio del negocio
function extractWhatsAppNumber(bio) {
  if (!bio) return null;

  // Patrones comunes para WhatsApp
  const patterns = [
    /\+?1?\s?[\(]?(\d{3})[\)]?\s?[-.\s]?(\d{3})[-.\s]?(\d{4})/g,  // (786) 332-9815
    /wa\.me\/(\d+)/gi,  // wa.me/17863329815
    /whatsapp[:\s]+\+?1?\s?[\(]?(\d{3})[\)]?\s?[-.\s]?(\d{3})[-.\s]?(\d{4})/gi
  ];

  for (const pattern of patterns) {
    const match = bio.match(pattern);
    if (match) {
      // Normalizar a formato E.164 (+1XXXXXXXXXX)
      let number = match[0].replace(/\D/g, '');
      if (!number.startsWith('1')) number = '1' + number;
      if (!number.startsWith('+')) number = '+' + number;
      return number;
    }
  }

  return null;
}

// Mensaje de WhatsApp
function getWhatsAppMessage(business) {
  return `Hola ${business.name.split(' ')[0]}! 👋

Soy Maikel, fotógrafo profesional en Miami. 📸

He visto que tu negocio está en Instagram y necesitas fotos profesionales para tu feed y website.

Ofrecemos:
📷 Fotos de producto/ambiente
👥 Fotos del equipo
🎬 Videos cortos para redes

3 paquetes:
• 1 sesión: $150
• Producción: $350
• Mensual: $500

¿Te interesa? Conversa conmigo:
📱 WhatsApp: ${process.env.BUSINESS_PHONE || '+1 (786) 332-9815'}
🌐 Web: https://maikphotographer.com
📧 Email: maikelmarshall07@gmail.com`;
}

// Mensaje de Email
function getEmailTemplate(business) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #D8C18A; padding: 20px; text-align: center; color: #111; border-radius: 8px; }
    .content { padding: 20px; background: #f9f9f9; margin: 20px 0; border-radius: 8px; }
    .package { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #D8C18A; }
    .cta { background: #D8C18A; color: #111; padding: 12px 24px; border-radius: 999px; text-decoration: none; display: inline-block; margin: 20px 0; font-weight: bold; }
    .footer { color: #999; font-size: 12px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📸 Fotos Profesionales para tu Negocio</h1>
    </div>

    <div class="content">
      <p>Hola <strong>${business.name}</strong>,</p>

      <p>Soy <strong>Maikel Marshall</strong>, fotógrafo profesional y director creativo en Miami.</p>

      <p>He visto que tu negocio está en Instagram y Google Maps, y creo que fotos profesionales podrían ayudarte a:</p>
      <ul>
        <li>✅ Atraer más clientes</li>
        <li>✅ Mejorar tu presencia en redes</li>
        <li>✅ Mostrar calidad y profesionalismo</li>
      </ul>

      <p><strong>Lo que ofrecemos:</strong></p>

      <div class="package">
        <strong>📷 Sesión Portrait — $150</strong><br>
        1-2 horas, 20+ fotos editadas, entrega en 48h
      </div>

      <div class="package">
        <strong>🎬 Producción Editorial — $350</strong><br>
        Día completo, dirección de arte, 40+ fotos, video BTS
      </div>

      <div class="package">
        <strong>📱 Contenido Mensual — $500/mes</strong><br>
        2 sesiones al mes, 60+ fotos, contenido listo para Instagram
      </div>

      <p style="text-align: center;">
        <a href="https://wa.me/17863329815?text=Hola%20Maikel%20quiero%20fotos%20para%20mi%20negocio" class="cta">
          💬 Conversa por WhatsApp
        </a>
      </p>

      <p>O responde este email si prefieres.<br>
      Te contesto en menos de 24 horas.</p>

      <p>Saludos,<br>
      <strong>Maikel Marshall</strong><br>
      Fotógrafo & Director Creativo<br>
      Miami, FL</p>
    </div>

    <div class="footer">
      <p>The303 Creative | © 2026</p>
      <p>
        <a href="https://instagram.com/maik_photographer">Instagram</a> •
        <a href="https://maikphotographer.com">Web</a> •
        <a href="mailto:maikelmarshall07@gmail.com">Email</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// Enviar por WhatsApp
async function sendWhatsApp(business, whatsappNumber) {
  try {
    const message = getWhatsAppMessage(business);

    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${whatsappNumber}`,
      body: message
    });

    console.log(`✅ ${business.name} → WhatsApp enviado`);
    return { success: true, method: 'whatsapp', business: business.name };
  } catch (error) {
    console.log(`⚠️  ${business.name} → WhatsApp fallido: ${error.message}`);
    return { success: false, method: 'whatsapp', error: error.message };
  }
}

// Enviar por Email
async function sendEmail(business) {
  try {
    // Intentar obtener email del sitio web o usar placeholder
    let email = business.website;
    if (!email || !email.includes('@')) {
      email = `contact@${business.website?.replace('https://', '').replace('http://', '').split('/')[0] || 'business.com'}`;
    }

    await emailTransporter.sendMail({
      from: process.env.BUSINESS_EMAIL,
      to: email,
      subject: `📸 Fotos profesionales para ${business.name} — The303 Creative`,
      html: getEmailTemplate(business),
      replyTo: process.env.BUSINESS_EMAIL
    });

    console.log(`✅ ${business.name} → Email enviado a ${email}`);
    return { success: true, method: 'email', business: business.name, email: email };
  } catch (error) {
    console.log(`⚠️  ${business.name} → Email fallido: ${error.message}`);
    return { success: false, method: 'email', error: error.message };
  }
}

// Procesar cada negocio
async function processOutreach(businesses) {
  const results = [];
  let whatsappCount = 0;
  let emailCount = 0;
  let manualCount = 0;

  for (const business of businesses.slice(0, 20)) {
    console.log(`\n📧 Procesando: ${business.name}...`);

    // 1. Intentar WhatsApp
    if (process.env.TWILIO_ACCOUNT_SID) {
      const whatsappNumber = extractWhatsAppNumber(business.bio);

      if (whatsappNumber) {
        const result = await sendWhatsApp(business, whatsappNumber);
        results.push(result);
        if (result.success) whatsappCount++;
        continue;
      }
    } else {
      console.log(`⚠️  Twilio no configurado (omitiendo WhatsApp)`);
    }

    // 2. Intentar Email
    if (business.website || business.email) {
      const result = await sendEmail(business);
      results.push(result);
      if (result.success) emailCount++;
      continue;
    }

    // 3. Si no hay nada, preparar para manual
    console.log(`⚠️  ${business.name} → Requiere envío manual`);
    results.push({
      success: false,
      method: 'manual',
      business: business.name,
      reason: 'No WhatsApp, Email o Website encontrados'
    });
    manualCount++;

    await new Promise(r => setTimeout(r, 1000));
  }

  return { results, stats: { whatsappCount, emailCount, manualCount } };
}

async function main() {
  try {
    const leads = loadLeads();
    console.log(`📊 Cargados ${leads.length} leads de business-leads-today.json\n`);

    const { results, stats } = await processOutreach(leads);

    // Guardar resultados
    const resultsFile = path.join(process.cwd(), 'outreach-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      total_processed: results.length,
      whatsapp_sent: stats.whatsappCount,
      email_sent: stats.emailCount,
      manual_required: stats.manualCount,
      results: results
    }, null, 2));

    console.log('\n═══════════════════════════════════════════');
    console.log(`✅ REPORTE:`);
    console.log(`  📱 WhatsApp: ${stats.whatsappCount} enviados`);
    console.log(`  📧 Email: ${stats.emailCount} enviados`);
    console.log(`  ✍️  Manual: ${stats.manualCount} pendientes`);
    console.log(`  💾 Guardado en: outreach-results.json\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
