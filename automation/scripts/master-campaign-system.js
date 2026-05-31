#!/usr/bin/env node

/**
 * 🚀 MASTER CAMPAIGN SYSTEM — WhatsApp Version
 *
 * Orquestra TODO el flujo de lead generation:
 * 1. Busca leads (prioriza hispanohablantes)
 * 2. Genera mensajes personalizados de WhatsApp
 * 3. Crea links clickeables
 * 4. Notifica al usuario
 */

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

const USER_EMAIL = 'maikelmarshall07@gmail.com';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;
const MAX_LEADS = 20;

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN POR TIPO DE NEGOCIO
// ═══════════════════════════════════════════════════════════════

const businessMessages = {
  restaurant: `Hola {{name}}! 👋 Soy Maikel, fotógrafo profesional en Miami. Vi tu restaurante y me pareció genial. 📸\n\n¿Te gustaría fotos profesionales de tus platos y ambiente para Instagram? Tengo paquetes especiales para restaurantes. ¡Conversamos? 🤝`,
  bakery: `Hola {{name}}! 👋 Soy Maikel, fotógrafo en Miami. Tus postres se ven deliciosos 🧁\n\nTe propongo fotos profesionales para tu Instagram y tienda. Más fotos bonitas = más ventas online ✨\n\n¿Hablamos por aquí? 🤝`,
  salon: `Hola {{name}}! 👋 Soy Maikel, fotógrafo en Miami. Vi tu salón y está hermoso 💇‍♀️\n\nOfrezco fotos de antes/después para Instagram que te traen más clientes. ¿Te interesa? 📸\n\n¡Hablemos! 🤝`,
  boutique: `Hola {{name}}! 👋 Soy Maikel, fotógrafo en Miami. Tu ropa se ve increíble 👗\n\nTe ofrezco fotos profesionales de productos para tu Instagram. Mejor fotos = más ventas 📸\n\n¿Conversamos? 🤝`,
  real_estate: `Hola {{name}}! 👋 Soy Maikel, fotógrafo en Miami. Vi tus propiedades 🏠\n\nOfrezco fotos drone y video para vender más rápido y a mejor precio. ¿Te interesa? 📸\n\n¡Hablemos! 🤝`,
  fitness: `Hola {{name}}! 👋 Soy Maikel, fotógrafo en Miami. Tu gym está excelente 💪\n\nFotos profesionales de instalaciones y transformaciones para traer más miembros 📸\n\n¿Conversamos? 🤝`
};

// ═══════════════════════════════════════════════════════════════
// 1. BUSCAR LEADS
// ═══════════════════════════════════════════════════════════════

async function searchLeads() {
  console.log('🔍 Buscando leads...\n');

  try {
    const { exec } = await import('child_process');
    const util = await import('util');
    const execPromise = util.promisify(exec);

    await execPromise('node automation/scripts/search-leads-businesses.js', {
      cwd: process.cwd(),
      timeout: 300000
    });

    const leadsFile = path.join(process.cwd(), 'business-leads-today.json');
    if (!fs.existsSync(leadsFile)) {
      throw new Error('No se encontró business-leads-today.json');
    }

    let allLeads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));

    // Priorizar hispanohablantes
    const hispanicKeywords = ['español', 'latino', 'cubano', 'venezolano', 'colombiano', 'mexicano'];
    const hispanicLeads = allLeads.filter(lead => {
      const bio = (lead.bio || '').toLowerCase();
      return hispanicKeywords.some(keyword => bio.includes(keyword));
    });

    const reorderedLeads = [
      ...hispanicLeads.slice(0, Math.ceil(MAX_LEADS * 0.7)),
      ...allLeads.filter(l => !hispanicLeads.includes(l)).slice(0, Math.ceil(MAX_LEADS * 0.3))
    ].slice(0, MAX_LEADS);

    console.log(`✅ ${reorderedLeads.length} leads encontrados\n`);
    return reorderedLeads;
  } catch (error) {
    console.error('❌ Error buscando leads:', error.message);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. DETECTAR TIPO DE NEGOCIO
// ═══════════════════════════════════════════════════════════════

function detectBusinessType(bio = '') {
  const bioLower = (bio || '').toLowerCase();

  if (bioLower.includes('restaurant') || bioLower.includes('cafe') || bioLower.includes('comida')) return 'restaurant';
  if (bioLower.includes('salon') || bioLower.includes('spa') || bioLower.includes('beauty')) return 'salon';
  if (bioLower.includes('bakery') || bioLower.includes('dulce') || bioLower.includes('pastel')) return 'bakery';
  if (bioLower.includes('boutique') || bioLower.includes('store') || bioLower.includes('tienda')) return 'boutique';
  if (bioLower.includes('real estate') || bioLower.includes('property') || bioLower.includes('inmueble')) return 'real_estate';
  if (bioLower.includes('gym') || bioLower.includes('fitness') || bioLower.includes('trainer')) return 'fitness';

  return 'restaurant';
}

// ═══════════════════════════════════════════════════════════════
// 3. GENERAR MENSAJE DE WHATSAPP
// ═══════════════════════════════════════════════════════════════

function generateWhatsAppMessage(lead, businessType) {
  const name = lead.name.split(' ')[0];
  const template = businessMessages[businessType] || businessMessages.restaurant;
  return template.replace('{{name}}', name);
}

// ═══════════════════════════════════════════════════════════════
// 4. PROCESAR LEADS Y GENERAR LINKS
// ═══════════════════════════════════════════════════════════════

async function processLeads(leads) {
  console.log('📱 Generando mensajes de WhatsApp...\n');

  const results = [];
  let successCount = 0;

  for (const lead of leads) {
    try {
      if (!lead.phone || lead.phone === 'N/A') {
        results.push({
          name: lead.name,
          status: 'failed',
          reason: 'Sin teléfono'
        });
        continue;
      }

      const businessType = detectBusinessType(lead.bio);
      const message = generateWhatsAppMessage(lead, businessType);
      const cleanPhone = lead.phone.replace(/\D/g, '');
      const whatsappLink = `https://wa.me/1${cleanPhone}?text=${encodeURIComponent(message)}`;

      console.log(`✅ ${lead.name} (${businessType})`);
      console.log(`   📱 ${lead.phone}`);

      results.push({
        name: lead.name,
        phone: lead.phone,
        businessType: businessType,
        message: message,
        whatsappLink: whatsappLink,
        status: 'ready',
        timestamp: new Date().toISOString()
      });

      successCount++;
    } catch (error) {
      console.log(`❌ ${lead.name}: ${error.message}`);
      results.push({
        name: lead.name,
        status: 'failed',
        reason: error.message
      });
    }

    await new Promise(r => setTimeout(r, 500));
  }

  return { results, successCount };
}

// ═══════════════════════════════════════════════════════════════
// 5. GUARDAR RESULTADOS
// ═══════════════════════════════════════════════════════════════

function saveResults(results, successCount) {
  const campaignFile = path.join(process.cwd(), 'campaign-results.json');
  const linksFile = path.join(process.cwd(), 'whatsapp-links.txt');

  // Guardar JSON
  fs.writeFileSync(campaignFile, JSON.stringify({
    campaign: {
      timestamp: new Date().toISOString(),
      method: 'whatsapp',
      total: results.length,
      ready: successCount,
      failed: results.length - successCount,
      success_rate: `${Math.round((successCount / results.length) * 100)}%`
    },
    details: results
  }, null, 2));

  // Guardar links de WhatsApp
  const links = results
    .filter(r => r.status === 'ready')
    .map(r => `${r.name}\n${r.whatsappLink}\n`)
    .join('\n');

  fs.writeFileSync(linksFile, links);

  console.log(`\n✅ campaign-results.json guardado`);
  console.log(`✅ whatsapp-links.txt guardado\n`);
}

// ═══════════════════════════════════════════════════════════════
// 6. ENVIAR NOTIFICACIÓN
// ═══════════════════════════════════════════════════════════════

async function sendNotification(results, successCount) {
  const notification = `
🚀 CAMPAÑA DE WHATSAPP COMPLETADA

📊 RESULTADOS:
  • Mensajes listos: ${successCount}/${results.length}
  • Tasa de éxito: ${Math.round((successCount / results.length) * 100)}%
  • Método: WhatsApp (números reales de Google Maps)

📱 NEGOCIOS ENCONTRADOS:
${results
  .filter(r => r.status === 'ready')
  .slice(0, 6)
  .map(r => `  ${r.name} → ${r.phone}`)
  .join('\n')}

✅ ARCHIVO LISTO:
  📄 whatsapp-links.txt
  Contiene todos los links para copiar y pegar en WhatsApp

💡 PRÓXIMOS PASOS:
  1. Abre whatsapp-links.txt
  2. Copia cada link
  3. Pégalo en tu navegador
  4. Haz clic en "Abrir en WhatsApp"
  5. Envía el mensaje personalizado

⏱️ TIEMPO ESTIMADO: 10-15 minutos para los ${successCount} mensajes

🎯 VENTAJAS DE WHATSAPP:
  ✅ Números reales (no emails inventados)
  ✅ 40-60% response rate
  ✅ Conversaciones más directas
  ✅ Mayor engagement

The303 Marketing - Sistema Automatizado
`;

  try {
    await emailTransporter.sendMail({
      from: BUSINESS_EMAIL,
      to: USER_EMAIL,
      subject: `📱 Campaña WhatsApp Lista - ${successCount} Negocios`,
      text: notification
    });
    console.log('📬 Notificación enviada a:', USER_EMAIL);
  } catch (error) {
    console.error('⚠️  Error enviando notificación:', error.message);
  }
}

// ═══════════════════════════════════════════════════════════════
// 7. MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log('\n🚀 SISTEMA DE CAMPAÑA WHATSAPP\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    const leads = await searchLeads();
    if (leads.length === 0) {
      console.error('❌ No se encontraron leads');
      process.exit(1);
    }

    const { results, successCount } = await processLeads(leads);
    saveResults(results, successCount);
    await sendNotification(results, successCount);

    console.log('✅ CAMPAÑA COMPLETADA EXITOSAMENTE\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
