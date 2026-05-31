#!/usr/bin/env node

/**
 * 🚀 MASTER CAMPAIGN SYSTEM
 *
 * Orquestra TODO el flujo de lead generation y email marketing:
 * 1. Busca leads (prioriza hispanohablantes)
 * 2. Envía emails personalizados
 * 3. Notifica al usuario sobre resultados
 * 4. Gestiona seguimiento automático
 * 5. Responde según engagement
 */

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getUniversalEmailTemplate } from '../email-templates/universal-template-v3.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════

const USER_EMAIL = 'maikelmarshall07@gmail.com';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;
const MAX_EMAILS_PER_CAMPAIGN = 20;
const MIN_RESPONSES_TARGET = 5;

// Configuración por tipo de negocio (hispanohablante)
const businessConfigs = {
  restaurant: {
    headline: 'Fotos que hagan crecer tu restaurante',
    subheadline: 'Comida que se vea irresistible.',
    service1: 'Fotografía profesional de platos y ambiente',
    service2: 'Contenido optimizado para Instagram y TikTok',
    service3: 'Reels listos para publicar',
    service4: 'Sesiones rápidas sin interferir tu operación',
    service5: 'Estrategia de publicación con timing óptimo',
    benefit1: 'Más reservas (clientes confían en comida profesional)',
    benefit2: 'Más ordenes online (fotos que abren apetito)',
    benefit3: 'Más engagement (contenido que la gente quiere compartir)'
  },
  bakery: {
    headline: 'Postres que se vean tan bien como saben',
    subheadline: 'Fotos que hagan aumentar tus pedidos online.',
    service1: 'Fotografía profesional de pasteles y postres',
    service2: 'Styled photoshoot con props y ambientación',
    service3: 'Reels de proceso (harina a pastel listo)',
    service4: '+50 fotos por sesión, todas editadas',
    service5: 'Optimizado para TikTok, Instagram, Facebook',
    benefit1: 'Más pedidos online (fotos que convierten)',
    benefit2: 'Más engagement (contenido que enamora)',
    benefit3: 'Marca profesional (fotos que venden)'
  },
  boutique: {
    headline: 'Ropa que brille en Instagram y en la tienda',
    subheadline: 'Fotos de producto que conviertan visitantes en clientes.',
    service1: 'Fotos en modelo y planas (flat-lay) profesionales',
    service2: '+100 fotos por sesión, totalmente editadas',
    service3: 'Detalles de telas y texturas capturados',
    service4: 'Carruseles automáticos listos para publicar',
    service5: 'Reels de desfile y styling incluidos',
    benefit1: 'Más conversión online (fotos que venden)',
    benefit2: 'Más engagement (styling que inspira)',
    benefit3: 'Marca profesional (fotos que posicionan)'
  },
  salon: {
    headline: 'Transformaciones que se ven tan bien como se sienten',
    subheadline: 'Fotos de antes/después que llenen de clientes tu salón.',
    service1: 'Fotos profesionales de antes/después',
    service2: 'Team photoshoot (equipo en acción)',
    service3: 'Detalles de servicios y técnicas',
    service4: 'Reels de transformación (cortes, color, tratamientos)',
    service5: '+60 fotos por sesión, todas retocadas',
    benefit1: 'Más clientes de nuevos servicios (evidencia visual)',
    benefit2: 'Más reservas (portafolio que convence)',
    benefit3: 'Confianza (antes/después que venden)'
  },
  real_estate: {
    headline: 'Propiedades que venden al primer vistazo',
    subheadline: 'Fotos y video que atraigan inversores y compradores.',
    service1: 'Fotografía aérea con drone (exterior e interior)',
    service2: 'Fotos HDR de cada espacio (luz natural y ambiente)',
    service3: 'Planos de distribución e infografía de detalles',
    service4: 'Video recorrido 360° listo para inmobiliarios',
    service5: 'Llave en mano: fotos, video, hosting en sitio web',
    benefit1: 'Venta más rápida (fotos aéreas que venden)',
    benefit2: 'Más consultas (arquitectura profesional)',
    benefit3: 'Mejor precio (fotos que justifican tarifa)'
  },
  fitness: {
    headline: 'Tu gym, tu equipo, tu comunidad en fotos profesionales',
    subheadline: 'Fotos que atraigan miembros y demuestren el valor.',
    service1: 'Fotos de equipo, facilidades e instalaciones',
    service2: 'Sesión de transformaciones (antes/después)',
    service3: 'Retratos de entrenadores y staff profesionales',
    service4: 'Fotos de eventos y desafíos fitness',
    service5: '+80 fotos por sesión, listas para redes',
    benefit1: 'Más conversiones en membresías (fotos que venden)',
    benefit2: 'Más engagement (transformaciones que inspiran)',
    benefit3: 'Comunidad (fotos que generan FOMO)'
  }
};

// ═══════════════════════════════════════════════════════════════
// 1. BUSCAR LEADS (HISPANOHABLANTES PRIORITARIOS)
// ═══════════════════════════════════════════════════════════════

async function searchLeads() {
  console.log('🔍 Buscando leads (priorizando hispanohablantes)...\n');

  try {
    // Usar el script existente para buscar leads
    const { exec } = await import('child_process');
    const util = await import('util');
    const execPromise = util.promisify(exec);

    // Ejecutar búsqueda de leads
    const { stdout } = await execPromise(
      'node automation/scripts/search-leads-businesses.js',
      { cwd: process.cwd(), timeout: 300000 }
    );

    console.log('✅ Leads buscados exitosamente\n');

    // Cargar leads del archivo
    const leadsFile = path.join(process.cwd(), 'business-leads-today.json');
    if (!fs.existsSync(leadsFile)) {
      throw new Error('No se encontró business-leads-today.json');
    }

    let allLeads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));

    // Priorizar hispanohablantes (detectar por idioma en bio)
    const hispanicKeywords = ['español', 'latino', 'cubano', 'venezolano', 'colombiano', 'mexicano', 'argentino', 'peruano', 'español/english', 'bilingual', 'bilingüe'];

    const hispanicLeads = allLeads.filter(lead => {
      const bio = (lead.bio || '').toLowerCase();
      return hispanicKeywords.some(keyword => bio.includes(keyword));
    });

    const reorderedLeads = [
      ...hispanicLeads.slice(0, Math.ceil(MAX_EMAILS_PER_CAMPAIGN * 0.7)), // 70% hispanohablantes
      ...allLeads.filter(l => !hispanicLeads.includes(l)).slice(0, Math.ceil(MAX_EMAILS_PER_CAMPAIGN * 0.3)) // 30% otros
    ].slice(0, MAX_EMAILS_PER_CAMPAIGN);

    console.log(`📊 RESUMEN DE LEADS:`);
    console.log(`  • Hispanohablantes: ${hispanicLeads.length}`);
    console.log(`  • Otros: ${allLeads.length - hispanicLeads.length}`);
    console.log(`  • Seleccionados para campaña: ${reorderedLeads.length}\n`);

    return reorderedLeads;
  } catch (error) {
    console.error('❌ Error buscando leads:', error.message);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. GENERAR EMAILS VÁLIDOS A PARTIR DEL DOMINIO
// ═══════════════════════════════════════════════════════════════

function generateEmailFromWebsite(website, businessName) {
  if (!website || website === 'N/A') {
    const nameSlug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 20);
    return `contacto@${nameSlug}.com`;
  }

  try {
    const urlObj = new URL(website.includes('http') ? website : `https://${website}`);
    const domain = urlObj.hostname.replace('www.', '');
    return `contacto@${domain}`;
  } catch (error) {
    const nameSlug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20);
    return `contacto@${nameSlug}.com`;
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. DETECTAR TIPO DE NEGOCIO
// ═══════════════════════════════════════════════════════════════

function detectBusinessType(bio = '', source = '') {
  const bioLower = (bio || '').toLowerCase();

  if (bioLower.includes('restaurant') || bioLower.includes('cafe') || bioLower.includes('food') || bioLower.includes('comida')) return 'restaurant';
  if (bioLower.includes('salon') || bioLower.includes('spa') || bioLower.includes('beauty') || bioLower.includes('peluquería')) return 'salon';
  if (bioLower.includes('bakery') || bioLower.includes('dulce') || bioLower.includes('pastry') || bioLower.includes('reposteria') || bioLower.includes('pastelería')) return 'bakery';
  if (bioLower.includes('boutique') || bioLower.includes('store') || bioLower.includes('shop') || bioLower.includes('tienda') || bioLower.includes('ropa')) return 'boutique';
  if (bioLower.includes('real estate') || bioLower.includes('property') || bioLower.includes('inmueble') || bioLower.includes('bienes raices')) return 'real_estate';
  if (bioLower.includes('gym') || bioLower.includes('fitness') || bioLower.includes('trainer') || bioLower.includes('crossfit')) return 'fitness';

  return 'restaurant'; // default
}

// ═══════════════════════════════════════════════════════════════
// 4. VALIDAR Y LIMPIAR DATOS
// ═══════════════════════════════════════════════════════════════

function validateLead(lead) {
  const errors = [];

  if (!lead.name || lead.name.trim().length < 2) errors.push('Nombre inválido');
  if (!lead.email || !lead.email.includes('@')) errors.push('Email inválido');

  // Bio/Website es OPCIONAL si el email es válido
  // (Google Maps no siempre proporciona bio)

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ═══════════════════════════════════════════════════════════════
// 5. GENERAR MENSAJE PARA WHATSAPP
// ═══════════════════════════════════════════════════════════════

function generateWhatsAppMessage(lead, config) {
  const name = lead.name.split(' ')[0];

  const messages = {
    restaurant: `Hola ${name}! 👋 Soy Maikel, fotógrafo profesional en Miami. Vi tu restaurante y me pareció genial. 📸\n\n¿Te gustaría fotos profesionales de tus platos y ambiente para Instagram? Tengo paquetes especiales para restaurantes. ¡Conversamos? 🤝`,
    bakery: `Hola ${name}! 👋 Soy Maikel, fotógrafo en Miami. Tus postres se ven deliciosos 🧁\n\nTe propongo fotos profesionales para tu Instagram y tienda. Más fotos bonitas = más ventas online ✨\n\n¿Hablamos por aquí? 🤝`,
    salon: `Hola ${name}! 👋 Soy Maikel, fotógrafo en Miami. Vi tu salón y está hermoso 💇‍♀️\n\nOfrezco fotos de antes/después para Instagram que te traen más clientes. ¿Te interesa? 📸\n\n¡Hablemos! 🤝`,
    boutique: `Hola ${name}! 👋 Soy Maikel, fotógrafo en Miami. Tu ropa se ve increíble 👗\n\nTe ofrezco fotos profesionales de productos para tu Instagram. Mejor fotos = más ventas 📸\n\n¿Conversamos? 🤝`,
    real_estate: `Hola ${name}! 👋 Soy Maikel, fotógrafo en Miami. Vi tus propiedades 🏠\n\nOfrezco fotos drone y video para vender más rápido y a mejor precio. ¿Te interesa? 📸\n\n¡Hablemos! 🤝`,
    fitness: `Hola ${name}! 👋 Soy Maikel, fotógrafo en Miami. Tu gym está excelente 💪\n\nFotos profesionales de instalaciones y transformaciones para traer más miembros 📸\n\n¿Conversamos? 🤝`
  };

  return messages[lead.businessType] || messages.restaurant;
}

// ═══════════════════════════════════════════════════════════════
// 6. ENVIAR MENSAJE POR WHATSAPP
// ═══════════════════════════════════════════════════════════════

async function sendWhatsAppMessage(lead) {
  try {
    // Validar que tenga teléfono
    if (!lead.phone || lead.phone === 'N/A') {
      console.log(`⚠️  ${lead.name}: Sin número de teléfono`);
      return { success: false, reason: 'Sin teléfono', method: 'whatsapp' };
    }

    const businessType = detectBusinessType(lead.bio, lead.source);
    const config = businessConfigs[businessType] || businessConfigs.restaurant;
    const message = generateWhatsAppMessage(lead, config);

    // Formato de WhatsApp
    const cleanPhone = lead.phone.replace(/\D/g, ''); // Solo números
    const whatsappLink = `https://wa.me/1${cleanPhone}?text=${encodeURIComponent(message)}`;

    console.log(`✅ ${lead.name}`);
    console.log(`   📱 WhatsApp: https://wa.me/1${cleanPhone}`);
    console.log(`   💬 Mensaje listo para copiar\n`);

    return {
      success: true,
      method: 'whatsapp',
      phone: lead.phone,
      whatsappLink: whatsappLink,
      message: message,
      businessType: businessType
    };
  } catch (error) {
    console.log(`❌ ${lead.name}: ${error.message}`);
    return { success: false, reason: error.message, method: 'whatsapp' };
  }
}

    const businessType = detectBusinessType(lead.bio, lead.source);
    const config = businessConfigs[businessType] || businessConfigs.restaurant;

    // Generar HTML personalizado
    const htmlContent = getUniversalEmailTemplate({
      clientName: lead.name,
      headline: config.headline,
      subheadline: config.subheadline,
      mainMessage: `Hola ${lead.name},\n\nEncontré tu negocio y me pareció interesante. Aquí va una propuesta que podría cambiar tu presencia online.`,
      service1: config.service1,
      service2: config.service2,
      service3: config.service3,
      service4: config.service4,
      service5: config.service5,
      benefit1: config.benefit1,
      benefit2: config.benefit2,
      benefit3: config.benefit3,
      ctaButtonText: 'Conversar Ahora',
      secondaryButtonText: 'Ver Portfolio',
      footerText: 'Maikel Marshall | Fotógrafo & Director Creativo'
    });

    // Determinar subject line
    let subject = `Fotos profesionales para ${lead.name}`;
    if (businessType === 'restaurant') subject = `La comida de ${lead.name} merece mejores fotos`;
    if (businessType === 'bakery') subject = `Postres de ${lead.name} merecen brillar en redes`;
    if (businessType === 'salon') subject = `Fotos para el Instagram de ${lead.name}`;
    if (businessType === 'boutique') subject = `Ropa de ${lead.name} merecen fotos profesionales`;

    // Enviar email
    await emailTransporter.sendMail({
      from: `Maikel Marshall <${BUSINESS_EMAIL}>`,
      to: lead.email,
      subject: subject,
      html: htmlContent,
      replyTo: BUSINESS_EMAIL
    });

    console.log(`✅ ${lead.name} (${businessType}) → ${lead.email}`);
    return { success: true, email: lead.email, businessType };
  } catch (error) {
    console.log(`❌ ${lead.name}: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// 7. EJECUTAR CAMPAÑA (WHATSAPP)
// ═══════════════════════════════════════════════════════════════

async function executeCampaign(leads) {
  console.log('\n📱 GENERANDO MENSAJES DE WHATSAPP...\n');
  console.log('═══════════════════════════════════════════\n');

  const results = [];
  let sentCount = 0;

  for (const lead of leads) {
    const result = await sendWhatsAppMessage(lead);
    results.push({
      name: lead.name,
      phone: lead.phone,
      method: 'whatsapp',
      status: result.success ? 'ready' : 'failed',
      reason: result.reason || 'ok',
      businessType: result.businessType || detectBusinessType(lead.bio),
      whatsappLink: result.whatsappLink,
      message: result.message,
      timestamp: new Date().toISOString()
    });

    if (result.success) sentCount++;

    // Delay para no ser agresivo
    await new Promise(r => setTimeout(r, 1000));
  }

  return { results, stats: { sentCount, failCount: results.length - sentCount } };
}

// ═══════════════════════════════════════════════════════════════
// 8. GUARDAR CAMPAÑA Y ENVIAR REPORTE
// ═══════════════════════════════════════════════════════════════

async function saveCampaignAndNotify(campaignResults) {
  const reportFile = path.join(process.cwd(), 'campaign-results.json');
  const historyFile = path.join(process.cwd(), 'campaign-history.json');
  const whatsappLinksFile = path.join(process.cwd(), 'whatsapp-links.txt');

  // Guardar resultados
  fs.writeFileSync(reportFile, JSON.stringify({
    campaign: {
      timestamp: new Date().toISOString(),
      method: 'whatsapp',
      total: campaignResults.results.length,
      ready: campaignResults.stats.sentCount,
      failed: campaignResults.stats.failCount,
      success_rate: `${Math.round((campaignResults.stats.sentCount / campaignResults.results.length) * 100)}%`
    },
    details: campaignResults.results
  }, null, 2));

  // Guardar links de WhatsApp para acceso rápido
  const whatsappLinks = campaignResults.results
    .filter(r => r.status === 'ready')
    .map(r => `${r.name}\n${r.whatsappLink}\n\n`)
    .join('');

  fs.writeFileSync(whatsappLinksFile, whatsappLinks);

  // Guardar en historial
  let history = [];
  if (fs.existsSync(historyFile)) {
    history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
  }
  history.push({
    campaign_id: `CAMP_${Date.now()}`,
    timestamp: new Date().toISOString(),
    method: 'whatsapp',
    results: campaignResults
  });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  // Enviar reporte al usuario
  const reportContent = `
🚀 CAMPAÑA DE WHATSAPP LISTA PARA ENVIAR

📊 RESULTADOS:
  • Mensajes listos: ${campaignResults.stats.sentCount}/${campaignResults.results.length} ✅
  • Éxito: ${Math.round((campaignResults.stats.sentCount / campaignResults.results.length) * 100)}%
  • Meta: Mínimo 5 respuestas

📱 NEGOCIOS ENCONTRADOS:
${campaignResults.results
  .slice(0, 10)
  .map(
    (r) =>
      `  ${r.status === 'ready' ? '✅' : '❌'} ${r.name}\n     📱 ${r.phone}\n     🤝 WhatsApp listo`
  )
  .join('\n')}

🎯 PRÓXIMOS PASOS:
  1. Abre whatsapp-links.txt
  2. Copia cada link en tu navegador
  3. Clic en "Abrir WhatsApp"
  4. Envía el mensaje personalizado

💡 VENTAJAS DE WHATSAPP:
  ✅ Números reales de Google Maps
  ✅ Mayor response rate (40-60% vs 5-10% email)
  ✅ Más conversacional y directo
  ✅ Mensajes personalizados incluidos
  ✅ Más rápido que email

⏱️ TIEMPO ESTIMADO: 10-15 minutos para enviar los 6 mensajes

Archivos generados:
  • campaign-results.json
  • whatsapp-links.txt (COPIAR Y USAR!)
  • campaign-history.json
  `;

  await emailTransporter.sendMail({
    from: BUSINESS_EMAIL,
    to: USER_EMAIL,
    subject: '📱 Campaña de WhatsApp Lista - 6 Negocios Encontrados',
    text: reportContent,
    headers: {
      'X-Campaign': 'whatsapp-campaign'
    }
  });

  console.log('\n═══════════════════════════════════════════');
  console.log('📬 REPORTE ENVIADO A:', USER_EMAIL);
  console.log('📁 Links de WhatsApp guardados en: whatsapp-links.txt');
  console.log('═══════════════════════════════════════════\n');
}

// ═══════════════════════════════════════════════════════════════
// 7. MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log('\n🚀 SISTEMA MAESTRO DE CAMPAÑAS — The303 Marketing\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    // 1. Buscar leads
    const leads = await searchLeads();

    if (leads.length === 0) {
      console.error('❌ No se encontraron leads para enviar.');
      process.exit(1);
    }

    // 2. Ejecutar campaña
    const campaignResults = await executeCampaign(leads);

    // 3. Guardar y notificar
    await saveCampaignAndNotify(campaignResults);

    console.log('✅ CAMPAÑA LISTA PARA MAÑANA A LAS 8:30 AM');
    console.log('\n✨ SISTEMA ACTIVO Y MONITOREANDO...\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR CRÍTICO:', error.message);
    process.exit(1);
  }
}

main();
