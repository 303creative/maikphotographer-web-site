#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getUniversalEmailTemplate } from '../email-templates/universal-template.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const leadsFile = path.join(process.cwd(), 'business-leads-today.json');

console.log('\n🎨 UNIVERSAL HTML EMAIL SYSTEM\n');
console.log('═══════════════════════════════════════════\n');

// Business type configurations with dynamic content
const businessConfigs = {
  restaurant: {
    headline: 'Fotos que hagan crecer tu restaurante',
    subheadline: 'Comida que se vea irresistible. Clientes que vuelvan.',
    stat1: '30%',
    stat1Label: 'Más reservas con fotos profesionales',
    stat2: '+18%',
    stat2Label: 'Incremento en ordenes online',
    stat3: '8.5k',
    stat3Label: 'Restaurantes mejorados en Miami',
    benefit1: 'Fotos de platos gourmet que abren apetito',
    benefit2: 'Contenido listo para Instagram/Google Maps',
    benefit3: 'Ambiente y detalles capturados profesionalmente',
    benefit4: 'Reels y carrusel automático incluido',
    benefit5: 'Sesión rápida, sin cierre de local',
    portfolioImage1: 'https://images.unsplash.com/photo-1606787620884-c0dec3b808e9?w=400&q=80',
    portfolioLabel1: 'Food styling',
    portfolioImage2: 'https://images.unsplash.com/photo-1546039907-de94ddec1302?w=400&q=80',
    portfolioLabel2: 'Ambiente premium',
    package1Name: 'Sesión Express',
    package1Price: '$150',
    package1Desc: '2 horas, 50+ fotos editadas, listas para redes',
    package2Name: 'Producción Premium',
    package2Price: '$350',
    package2Desc: 'Sesión completa, 150+ fotos, reels, carruseles editados',
    package3Name: 'Mensual Contenido',
    package3Price: '$500/mes',
    package3Desc: 'Sesiones semanales, contenido constante, mantenimiento web',
    ctaText: '¿Listo para mejorar tu presencia online?'
  },

  bakery: {
    headline: 'Postres que se vean tan bien como saben',
    subheadline: 'Fotos que hagan aumentar tus pedidos online.',
    stat1: '40%',
    stat1Label: 'Incremento en pedidos online con fotos',
    stat2: '+25%',
    stat2Label: 'Engagement en redes con contenido visual',
    stat3: '200+',
    stat3Label: 'Clientes de repostería fotografiados',
    benefit1: 'Detalle profesional de cada creación',
    benefit2: 'Styled photoshoot con props y ambientación',
    benefit3: 'Reels de proceso (harina a pastel listo)',
    benefit4: '+50 fotos por sesión, todas editadas',
    benefit5: 'Optimizado para TikTok, Instagram, Facebook',
    portfolioImage1: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    portfolioLabel1: 'Pasteles personalizados',
    portfolioImage2: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    portfolioLabel2: 'Cupcakes artesanales',
    package1Name: 'Sesión Products',
    package1Price: '$200',
    package1Desc: '2.5 horas, 80+ fotos editadas, listas para vender',
    package2Name: 'Shooting Completo',
    package2Price: '$400',
    package2Desc: 'Medio día, 150+ fotos, reels de proceso incluidos',
    package3Name: 'Mensual Showcase',
    package3Price: '$600/mes',
    package3Desc: 'Sesiones bi-semanales, contenido fresco, stories diarias',
    ctaText: '¿Quieres que tus postres luzcan irresistibles?'
  },

  boutique: {
    headline: 'Ropa que brille en Instagram y en la tienda',
    subheadline: 'Fotos de producto que conviertan visitantes en clientes.',
    stat1: '60%',
    stat1Label: 'Incremento de engagement con fotos de calidad',
    stat2: '+35%',
    stat2Label: 'Tasa de conversión online mejorada',
    stat3: '50k+',
    stat3Label: 'Prendas fotografiadas en Miami',
    benefit1: 'Fotos en modelo y planas (flat-lay) profesionales',
    benefit2: '+100 fotos por sesión, totalmente editadas',
    benefit3: 'Detalles de telas y texturas capturados',
    benefit4: 'Carruseles automáticos listos para publicar',
    benefit5: 'Reels de desfile y styling incluidos',
    portfolioImage1: 'https://images.unsplash.com/photo-1595777707802-51d979f6f552?w=400&q=80',
    portfolioLabel1: 'Fashion styling',
    portfolioImage2: 'https://images.unsplash.com/photo-1595908541427-76d440642117?w=400&q=80',
    portfolioLabel2: 'Detalles premium',
    package1Name: 'Catálogo Esencial',
    package1Price: '$250',
    package1Desc: 'Sesión 3 horas, 100+ fotos editadas para e-commerce',
    package2Name: 'Shooting Fashion',
    package2Price: '$500',
    package2Desc: 'Día completo, 200+ fotos, looks en modelo y flat-lay',
    package3Name: 'Mensual Colecciones',
    package3Price: '$750/mes',
    package3Desc: 'Nuevos lanzamientos mensuales, lookbooks, stories diarios',
    ctaText: '¿Listo para que tu boutique domine Instagram?'
  },

  salon: {
    headline: 'Transformaciones que se ven tan bien como se sienten',
    subheadline: 'Fotos de antes/después que llenen de clientes tu salón.',
    stat1: '70%',
    stat1Label: 'Más clientes de nuevos servicios con evidencia visual',
    stat2: '+45%',
    stat2Label: 'Aumento en reservas con portafolio online',
    stat3: '10k+',
    stat3Label: 'Transformaciones capturadas',
    benefit1: 'Fotos profesionales de antes/después',
    benefit2: 'Team photoshoot (equipo en acción)',
    benefit3: 'Detalles de servicios y técnicas',
    benefit4: 'Reels de transformación (cortes, color, tratamientos)',
    benefit5: '+60 fotos por sesión, todas retocadas',
    portfolioImage1: 'https://images.unsplash.com/photo-1560066169-b741a58d4e6b?w=400&q=80',
    portfolioLabel1: 'Transformación capilar',
    portfolioImage2: 'https://images.unsplash.com/photo-1551969014-7ee957caa716?w=400&q=80',
    portfolioLabel2: 'Team session',
    package1Name: 'Sesión Transformaciones',
    package1Price: '$200',
    package1Desc: '3 horas, 5+ transformaciones completas documentadas',
    package2Name: 'Shooting Team',
    package2Price: '$400',
    package2Desc: 'Día completo, equipo, antes/después, ambiente',
    package3Name: 'Mensual Portafolio',
    package3Price: '$600/mes',
    package3Desc: 'Sesiones semanales, portafolio creciente, reels diarios',
    ctaText: '¿Quieres mostrar tus mejores trabajos?'
  },

  real_estate: {
    headline: 'Propiedades que venden al primer vistazo',
    subheadline: 'Fotos y video que atraigan inversores y compradores.',
    stat1: '50%',
    stat1Label: 'Reducción en tiempo de venta con fotos aéreas',
    stat2: '+28%',
    stat2Label: 'Incremento en consultas con arquitectura profesional',
    stat3: '500+',
    stat3Label: 'Propiedades vendidas con nuestras fotos',
    benefit1: 'Fotografía aérea con drone (exterior e interior)',
    benefit2: 'Fotos HDR de cada espacio (luz natural y ambiente)',
    benefit3: 'Planos de distribución e infografía de detalles',
    benefit4: 'Video recorrido 360° listo para inmobiliarios',
    benefit5: 'Llave en mano: fotos, video, hosting en sitio web',
    portfolioImage1: 'https://images.unsplash.com/photo-1615396671733-a6bb4a2a87c1?w=400&q=80',
    portfolioLabel1: 'Exterior aéreo',
    portfolioImage2: 'https://images.unsplash.com/photo-1570129477492-45a003537e47?w=400&q=80',
    portfolioLabel2: 'Interior moderno',
    package1Name: 'Sesión Estándar',
    package1Price: '$400',
    package1Desc: '4 horas, 150+ fotos, 3 vídeos, drone incluido',
    package2Name: 'Shooting Premium',
    package2Price: '$750',
    package2Desc: 'Día completo, drone, 360°, video recorrido, infografía',
    package3Name: 'Mensual Listings',
    package3Price: '$1500/mes',
    package3Desc: 'Fotos de 5-8 propiedades mensuales, todas con video',
    ctaText: '¿Tus propiedades merecen fotos que vendan?'
  },

  fitness: {
    headline: 'Tu gym, tu equipo, tu comunidad en fotos profesionales',
    subheadline: 'Fotos que atraigan miembros y demuestren el valor.',
    stat1: '35%',
    stat1Label: 'Más conversiones en membresías con fotos del equipo',
    stat2: '+22%',
    stat2Label: 'Engagement con transformaciones de clientes',
    stat3: '150+',
    stat3Label: 'Miembros fotografiados exitosamente',
    benefit1: 'Fotos de equipo, facilidades e instalaciones',
    benefit2: 'Sesión de transformaciones (antes/después de clientes)',
    benefit3: 'Retratos de entrenadores y staff profesionales',
    benefit4: 'Fotos de eventos y desafíos fitness',
    benefit5: '+80 fotos por sesión, listas para redes',
    portfolioImage1: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    portfolioLabel1: 'Equipo de pesas',
    portfolioImage2: 'https://images.unsplash.com/photo-1574126057325-5239e1ba2f9a?w=400&q=80',
    portfolioLabel2: 'Transformación',
    package1Name: 'Sesión Facilidades',
    package1Price: '$200',
    package1Desc: '2.5 horas, fotos de equipo y espacio, 80+ fotos',
    package2Name: 'Shooting Transformaciones',
    package2Price: '$400',
    package2Desc: '4 horas, 8-10 transformaciones, antes/después completo',
    package3Name: 'Mensual Community',
    package3Price: '$700/mes',
    package3Desc: 'Sesiones bi-semanales, eventos, transformaciones, reels',
    ctaText: '¿Listo para mostrar tu gym al mundo?'
  }
};

// Load leads
function loadLeads() {
  if (!fs.existsSync(leadsFile)) {
    console.log('❌ No se encontró business-leads-today.json');
    console.log('Ejecuta primero: node search-leads-businesses.js\n');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
}

// Detect business type
function detectBusinessType(bio = '', source = '') {
  const bioLower = (bio || '').toLowerCase();
  const sourceLower = (source || '').toLowerCase();

  if (bioLower.includes('restaurant') || bioLower.includes('cafe') || bioLower.includes('food')) return 'restaurant';
  if (bioLower.includes('salon') || bioLower.includes('spa') || bioLower.includes('beauty')) return 'salon';
  if (bioLower.includes('bakery') || bioLower.includes('dulce') || bioLower.includes('pastry') || bioLower.includes('reposteria')) return 'bakery';
  if (bioLower.includes('boutique') || bioLower.includes('store') || bioLower.includes('shop') || bioLower.includes('tienda')) return 'boutique';
  if (bioLower.includes('real estate') || bioLower.includes('property') || bioLower.includes('inmueble') || bioLower.includes('bienes raices')) return 'real_estate';
  if (bioLower.includes('gym') || bioLower.includes('fitness') || bioLower.includes('trainer') || bioLower.includes('crossfit')) return 'fitness';

  return 'restaurant'; // default
}

// Extract email
function extractEmail(business) {
  if (business.email && business.email.includes('@')) {
    return business.email;
  }

  if (business.website && business.website.includes('.')) {
    const domain = business.website
      .replace(/https?:\/\//i, '')
      .replace(/www\./i, '')
      .split('/')[0];
    return `contact@${domain}`;
  }

  return null;
}

// Send HTML email with universal template
async function sendHTMLEmail(business) {
  try {
    const email = extractEmail(business);

    if (!email) {
      console.log(`⚠️  ${business.name.padEnd(35)} → Sin email`);
      return { success: false, reason: 'no_email' };
    }

    const businessType = detectBusinessType(business.bio, business.source);
    const config = businessConfigs[businessType] || businessConfigs.restaurant;

    // Generate HTML with universal template
    const htmlContent = getUniversalEmailTemplate({
      clientName: business.name,
      businessType: businessType,
      ...config
    });

    // Adaptive subject line
    let subject = '';
    if (businessType === 'restaurant') {
      subject = `Idea para ${business.name}: fotos que atraigan clientes`;
    } else if (businessType === 'bakery') {
      subject = `Postres de ${business.name} merecen mejores fotos`;
    } else if (businessType === 'salon') {
      subject = `Tu equipo de ${business.name} necesita fotos profesionales`;
    } else if (businessType === 'boutique') {
      subject = `Ropa de ${business.name} merece fotos que vendan`;
    } else if (businessType === 'real_estate') {
      subject = `Propiedades de ${business.name}: fotos que cierren ventas`;
    } else if (businessType === 'fitness') {
      subject = `Tu gym merece fotos profesionales`;
    } else {
      subject = `Fotos profesionales para ${business.name}`;
    }

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      replyTo: process.env.BUSINESS_EMAIL,
      headers: {
        'X-Priority': '3'
      }
    });

    console.log(`✅ ${business.name.padEnd(35)} → ${email} (${businessType})`);
    return { success: true, email, businessType };
  } catch (error) {
    console.log(`❌ ${business.name.padEnd(35)} → ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Process campaign
async function processCampaign(businesses) {
  const results = [];
  let sentCount = 0;
  let failCount = 0;

  console.log('Enviando emails HTML con template universal...\n');

  for (const business of businesses.slice(0, 20)) {
    const result = await sendHTMLEmail(business);

    results.push({
      name: business.name,
      email: result.email || 'N/A',
      source: business.source,
      businessType: result.businessType || 'unknown',
      status: result.success ? 'sent' : 'failed',
      timestamp: new Date().toISOString()
    });

    if (result.success) {
      sentCount++;
    } else {
      failCount++;
    }

    // Delay para no ser detectado como spam
    await new Promise(r => setTimeout(r, 2000));
  }

  return { results, stats: { sentCount, failCount } };
}

async function main() {
  try {
    const leads = loadLeads();
    console.log(`📊 Cargados ${leads.length} leads\n`);

    const { results, stats } = await processCampaign(leads);

    // Save report
    const reportFile = path.join(process.cwd(), 'universal-email-campaign.json');
    fs.writeFileSync(reportFile, JSON.stringify({
      campaign: {
        timestamp: new Date().toISOString(),
        total_processed: results.length,
        emails_sent: stats.sentCount,
        emails_failed: stats.failCount,
        format: 'HTML Universal Template',
        success_rate: `${Math.round((stats.sentCount / results.length) * 100)}%`
      },
      details: results
    }, null, 2));

    console.log('\n═══════════════════════════════════════════');
    console.log(`\n✅ CAMPAÑA UNIVERSAL COMPLETADA:\n`);
    console.log(`  🎨 Emails HTML enviados: ${stats.sentCount}`);
    console.log(`  ❌ Emails fallidos: ${stats.failCount}`);
    console.log(`  📊 Éxito: ${Math.round((stats.sentCount / results.length) * 100)}%`);
    console.log(`\n📁 Archivos generados:`);
    console.log(`  • universal-email-campaign.json`);
    console.log(`\n✨ Template universal incluye:`);
    console.log(`  • UN ÚNICO HTML adaptable`);
    console.log(`  • Contenido dinámico por tipo de negocio`);
    console.log(`  • Imágenes y portfolio responsive`);
    console.log(`  • Estadísticas contextuales`);
    console.log(`  • Paquetes y precios por industria`);
    console.log(`  • CTAs inteligentes`);
    console.log(`  • Diseño premium gold/black`);
    console.log(`\n🎯 Tipos detectados automáticamente:`);
    const types = new Set(results.map(r => r.businessType));
    Array.from(types).forEach(t => console.log(`   → ${t}`));
    console.log(`\n📧 Espera respuestas en 24-48 horas\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
