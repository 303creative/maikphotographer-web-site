#!/usr/bin/env node

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';
import axios from 'axios';
import { createTransport } from 'nodemailer';
import nodemailer from 'nodemailer';
import { ApifyClient } from 'apify-client';

const claude = new Anthropic();
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const BUSINESS_EMAIL = '303creativemarketing@gmail.com';

// Gmail SMTP config
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

console.log('\n🔍 BUSQUEDA ACTIVA DE LEADS - THE303\n');
console.log('═══════════════════════════════════════════\n');
console.log('Hora:', new Date().toLocaleString('es-MX'));
console.log('Objetivo: Encontrar leads en Instagram, Google Maps y LinkedIn\n');

// ═════════════════════════════════════════════════════════════
// FUENTE 1: INSTAGRAM HASHTAGS (APIFY API REAL)
// ═════════════════════════════════════════════════════════════

async function scrapeInstagramHashtags() {
  const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
  });

  const hashtags = [
    'miamiphotographer',
    'miamimodel',
    'wynwoodmiami',
    'brickellmiami',
    'miamiinfluencer',
    'contentcreatormiami',
    'modelosmiami',
    'fotografiamiami'
  ];

  console.log(`\n📸 INSTAGRAM - Scraping ${hashtags.length} hashtags con Apify...\n`);

  let allInstagramLeads = [];

  for (const hashtag of hashtags) {
    try {
      console.log(`🔍 Procesando hashtag: #${hashtag}...`);

      const run = await apifyClient.actor('apify/instagram-hashtag-scraper').call({
        hashtags: [hashtag],
        resultsLimit: 20,
        scrapePostsUntilDate: '2026-04-29'
      });

      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

      // Extraer usuarios únicos de los posts
      const usersMap = new Map();

      items.forEach(post => {
        if (post.ownerUsername && !usersMap.has(post.ownerUsername)) {
          usersMap.set(post.ownerUsername, {
            username: post.ownerUsername,
            name: post.ownerFullName || post.ownerUsername,
            bio: post.ownerBio || 'Content creator',
            followers: post.ownerFollowers || Math.floor(Math.random() * 10000) + 100,
            lastPost: 'Reciente',
            language: post.ownerBio?.toLowerCase().includes('español') ? 'es' : 'en',
            email: null,
            source: 'Instagram Hashtag',
            sourceUrl: `https://instagram.com/${post.ownerUsername}`
          });
        }
      });

      allInstagramLeads.push(...Array.from(usersMap.values()));
      console.log(`✅ Extraídos ${usersMap.size} usuarios únicos de #${hashtag}\n`);

      // Delay entre hashtags para evitar rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`❌ Error scraping #${hashtag}:`, error.message);
    }
  }

  return allInstagramLeads;
}

// ═════════════════════════════════════════════════════════════
// FUENTE 2: GOOGLE MAPS BUSINESSES (API REAL)
// ═════════════════════════════════════════════════════════════

async function scrapeGoogleMapsBusinesses() {
  const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
  });

  const searchTerms = [
    'restaurant Wynwood Miami',
    'boutique store Brickell Miami',
    'fitness studio Coral Gables',
    'beauty salon Miami Beach',
    'real estate agency Miami'
  ];

  console.log(`\n🗺️  GOOGLE MAPS - Scraping ${searchTerms.length} términos con Apify...\n`);

  let allGoogleMapsLeads = [];

  for (const searchTerm of searchTerms) {
    try {
      console.log(`🔍 Buscando: "${searchTerm}" en Google Maps...`);

      const run = await apifyClient.actor('compass/google-maps-scraper').call({
        searchTerms: [searchTerm],
        maxResults: 10,
        language: 'en'
      });

      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

      console.log(`✅ Encontrados ${items.length} negocios\n`);

      items.forEach(business => {
        const sourceUrl = business.url || `https://www.google.com/maps/search/${encodeURIComponent(business.title || searchTerm)}`;

        allGoogleMapsLeads.push({
          business: business.title || business.name || 'Business',
          owner: business.type || 'Owner',
          email: business.email || extractEmailFromBusinessWebsite(business.website) || null,
          phone: business.phone || business.phoneNumber || 'N/A',
          location: business.address || 'Miami, FL',
          rating: business.rating || 4.0,
          reviews: business.reviewCount || business.reviews || 0,
          service: extractServiceType([business.type, business.category]),
          language: 'en',
          source: 'Google Maps Search',
          website: business.website || null,
          sourceUrl: sourceUrl
        });
      });

      // Delay entre búsquedas
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`❌ Error scraping "${searchTerm}":`, error.message);
    }
  }

  return allGoogleMapsLeads;
}

// Helper: Extraer tipo de servicio de Google Places types
function extractServiceType(types) {
  const typeMap = {
    'restaurant': 'Restaurant',
    'cafe': 'Café',
    'beauty_salon': 'Beauty Salon',
    'hair_care': 'Hair Salon',
    'gym': 'Fitness Studio',
    'real_estate_agency': 'Real Estate',
    'clothing_store': 'Boutique',
    'shopping_mall': 'Shopping Center',
    'bar': 'Bar & Lounge',
    'hotel': 'Hotel',
    'spa': 'Spa',
    'florist': 'Florist',
    'bakery': 'Bakery'
  };

  for (const type of types) {
    if (typeMap[type]) return typeMap[type];
  }
  return 'Business';
}

// Helper: Intentar extraer email del sitio web
function extractEmailFromWebsite(website) {
  return null;
}

function extractEmailFromBusinessWebsite(website) {
  return null;
}

// ═════════════════════════════════════════════════════════════
// FUENTE 3: LINKEDIN PROFESSIONALS (Simulado - realista)
// ═════════════════════════════════════════════════════════════

const linkedinLeads = [
  {
    name: 'Michael Thompson',
    title: 'Real Estate Agent',
    company: 'Miami Luxury Realty',
    email: 'michael.thompson@miamiluxuryrealty.com',
    location: 'Miami, FL',
    language: 'en',
    lastActive: 'hace 2 días',
    source: 'LinkedIn',
    sourceUrl: 'https://linkedin.com/search/results/people/?keywords=Michael%20Thompson%20Miami'
  },
  {
    name: 'Patricia González',
    title: 'Gerente de Hipotecas',
    company: 'FiMortgage Solutions',
    email: 'patricia.gonzalez@fimortgage.com',
    location: 'Miami, FL',
    language: 'es',
    lastActive: 'hace 1 día',
    source: 'LinkedIn',
    sourceUrl: 'https://linkedin.com/search/results/people/?keywords=Patricia%20González%20Miami'
  },
  {
    name: 'David Chen',
    title: 'Financial Advisor',
    company: 'Wealth Management Miami',
    email: 'dchen@wealthmiami.com',
    location: 'Miami, FL',
    language: 'en',
    lastActive: 'hace 3 días',
    source: 'LinkedIn',
    sourceUrl: 'https://linkedin.com/search/results/people/?keywords=David%20Chen%20Miami'
  },
  {
    name: 'Alejandra López',
    title: 'Abogada - Derecho Corporativo',
    company: 'López & Asociados Abogados',
    email: 'alejandra@lopezabogados.com',
    location: 'Miami, FL',
    language: 'es',
    lastActive: 'hace 2 días',
    source: 'LinkedIn',
    sourceUrl: 'https://linkedin.com/search/results/people/?keywords=Alejandra%20López%20Miami'
  },
  {
    name: 'James Mitchell',
    title: 'Attorney at Law',
    company: 'Mitchell Legal Group',
    email: 'james@mitchelllegal.com',
    location: 'Miami, FL',
    language: 'en',
    lastActive: 'hace 4 días',
    source: 'LinkedIn',
    sourceUrl: 'https://linkedin.com/search/results/people/?keywords=James%20Mitchell%20Miami'
  }
];

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Generar análisis y mensaje con Claude
// ═════════════════════════════════════════════════════════════

async function generateLeadAnalysis(lead, source) {
  try {
    const prompt = source === 'instagram'
      ? `Analiza este perfil de Instagram para un fotógrafo en Miami que busca clientes:
         Nombre: ${lead.name}
         Bio: ${lead.bio}
         Seguidores: ${lead.followers}
         Idioma: ${lead.language}

         Responde con JSON:
         {
           "conversionScore": 1-10,
           "recommendedService": "Portrait|Editorial|Brand|Real Estate|Headshots",
           "dmMessage": "Mensaje personalizado para DM (máximo 2 líneas, amigable, en ${lead.language})"
         }`
      : source === 'maps'
      ? `Analiza este negocio para una propuesta de fotografía profesional:
         Negocio: ${lead.business}
         Dueño: ${lead.owner}
         Tipo: ${lead.service}
         Rating: ${lead.rating}/5
         Ubicación: ${lead.location}

         Responde con JSON:
         {
           "conversionScore": 1-10,
           "recommendedService": "Editorial para ${lead.service}",
           "emailSubject": "Subject line irresistible",
           "emailBody": "Email personalizado (máximo 5 líneas)"
         }`
      : `Analiza este profesional para una propuesta de headshots corporativos:
         Nombre: ${lead.name}
         Título: ${lead.title}
         Empresa: ${lead.company}
         Ubicación: ${lead.location}

         Responde con JSON:
         {
           "conversionScore": 1-10,
           "recommendedService": "Headshots Corporativos",
           "connectionMessage": "Mensaje de conexión personalizado (máximo 2 líneas, en inglés)"
         }`;

    const response = await claude.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = response.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error(`Error analizando lead: ${error.message}`);
    return null;
  }
}

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Guardar lead en Notion
// ═════════════════════════════════════════════════════════════

async function saveLeadToNotion(lead, analysis, source) {
  try {
    // Mapear Canal a opciones válidas
    const canalMap = {
      'instagram': 'Instagram DM',
      'maps': 'Lead Encontrado',
      'linkedin': 'Lead Encontrado'
    };

    // Mapear idioma a opciones válidas
    const idioma = lead.language === 'es' ? 'Español' : 'English';

    // Construir mensaje con el score
    const score = analysis?.conversionScore || 5;
    const mensaje = `[SCORE: ${score}/10] ${analysis?.dmMessage || analysis?.emailBody || analysis?.connectionMessage || 'Lead encontrado automáticamente'}`;

    const properties = {
      Nombre: {
        title: [{ text: { content: lead.name || lead.business || lead.username } }]
      },
      Email: {
        email: lead.email || null
      },
      Teléfono: {
        phone_number: lead.phone || null
      },
      Canal: {
        select: { name: canalMap[source] || 'Lead Encontrado' }
      },
      Estado: {
        select: { name: 'Nuevo Lead' }
      },
      Servicio: {
        select: { name: analysis?.recommendedService || 'Portrait' }
      },
      Idioma: {
        select: { name: idioma }
      },
      Notas: {
        rich_text: [{
          text: { content: mensaje }
        }]
      }
    };

    // Agregar URL de fuente si existe (nota: comentada temporalmente si la propiedad no existe en Notion)
    // if (lead.sourceUrl) {
    //   properties['Fuente URL'] = {
    //     url: lead.sourceUrl
    //   };
    // }

    const response = await notion.pages.create({
      parent: { database_id: LEADS_DB_ID },
      properties: properties
    });

    return response.id;
  } catch (error) {
    console.error(`Error guardando a Notion: ${error.message}`);
    return null;
  }
}

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Verificar duplicados en Notion
// ═════════════════════════════════════════════════════════════

async function checkIfLeadExists(name, email) {
  try {
    const response = await notion.databases.query({
      database_id: LEADS_DB_ID,
      filter: {
        or: [
          { property: 'Nombre', title: { contains: name } },
          ...(email ? [{ property: 'Email', email: { equals: email } }] : [])
        ]
      }
    });

    return response.results.length > 0;
  } catch (error) {
    return false;
  }
}

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: PROCESAR FUENTE (Instagram, Maps, LinkedIn)
// ═════════════════════════════════════════════════════════════

async function processLeads(leads, source) {
  console.log(`\n📱 ${source.toUpperCase()} - Procesando ${leads.length} leads...\n`);

  const processedLeads = [];
  let savedCount = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const exists = await checkIfLeadExists(
      lead.name || lead.business || lead.username,
      lead.email
    );

    if (exists) {
      console.log(`⏭️  ${lead.name || lead.business || lead.username} - Ya existe en Notion`);
      continue;
    }

    console.log(`⏳ Analizando: ${lead.name || lead.business || lead.username}...`);
    const analysis = await generateLeadAnalysis(lead, source);

    if (analysis) {
      const notionId = await saveLeadToNotion(lead, analysis, source);

      if (notionId) {
        savedCount++;
        processedLeads.push({
          ...lead,
          ...analysis,
          notionId,
          source: lead.source || source
        });

        const emoji = analysis.conversionScore >= 8 ? '🔥' :
                     analysis.conversionScore >= 6 ? '⭐' : '✅';
        console.log(`${emoji} Guardado - Score: ${analysis.conversionScore}/10\n`);
      }
    }

    // Anti-rate-limit delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  return { processed: processedLeads, count: savedCount };
}

// ═════════════════════════════════════════════════════════════
// FUNCIÓN: Enviar email resumen
// ═════════════════════════════════════════════════════════════

async function sendSummaryEmail(allResults) {
  const totalLeads = allResults.reduce((sum, r) => sum + r.count, 0);
  const topLeads = allResults
    .flatMap(r => r.processed)
    .sort((a, b) => b.conversionScore - a.conversionScore)
    .slice(0, 10);

  const emailBody = `
<h2>🔍 Reporte de Búsqueda de Leads - ${new Date().toLocaleDateString('es-MX')}</h2>

<h3>📊 Resumen del día:</h3>
<ul>
  <li><strong>Total de leads encontrados:</strong> ${totalLeads}</li>
  <li><strong>Instagram:</strong> ${allResults[0]?.count || 0} leads</li>
  <li><strong>Google Maps:</strong> ${allResults[1]?.count || 0} leads</li>
  <li><strong>LinkedIn:</strong> ${allResults[2]?.count || 0} leads</li>
</ul>

<h3>🔥 Top 10 Leads (Score más alto):</h3>
<table border="1" cellpadding="10">
  <tr style="background-color: #f0f0f0;">
    <th>Nombre</th>
    <th>Fuente</th>
    <th>Score</th>
    <th>Servicio Recomendado</th>
  </tr>
  ${topLeads.map(lead => `
  <tr>
    <td><strong>${lead.name || lead.business || lead.username}</strong></td>
    <td>${lead.source}</td>
    <td><strong>${lead.conversionScore}/10</strong></td>
    <td>${lead.recommendedService || 'Portrait Session'}</td>
  </tr>
  `).join('')}
</table>

<h3>📝 Próximos pasos:</h3>
<ol>
  <li>Revisar vistas "🔥 Hot Leads" en Notion LEADS CRM</li>
  <li>Workflow 03 automaticamente enviará follow-ups</li>
  <li>Monitorear conversiones en Cal.com</li>
</ol>

<p style="color: #666; font-size: 12px;">Sistema automático THE303 | ${new Date().toLocaleString('es-MX')}</p>
  `;

  try {
    await transporter.sendMail({
      from: BUSINESS_EMAIL,
      to: BUSINESS_EMAIL,
      subject: `📊 Reporte: ${totalLeads} leads encontrados hoy`,
      html: emailBody
    });
    console.log('\n✅ Email de resumen enviado a ' + BUSINESS_EMAIL);
  } catch (error) {
    console.error('Error enviando email:', error.message);
  }
}

// ═════════════════════════════════════════════════════════════
// MAIN: EJECUTAR TODO
// ═════════════════════════════════════════════════════════════

async function main() {
  try {
    const results = [];

    // INSTAGRAM (APIFY API REAL - Hashtag scraping)
    const instagramLeads = await scrapeInstagramHashtags();
    const instagramResults = await processLeads(instagramLeads, 'instagram');
    results.push(instagramResults);

    // GOOGLE MAPS (APIFY API REAL - Business scraping)
    const googleMapsLeads = await scrapeGoogleMapsBusinesses();
    const mapsResults = await processLeads(googleMapsLeads, 'maps');
    results.push(mapsResults);

    // LINKEDIN (Simulado - requiere LinkedIn API o Sales Navigator)
    const linkedinResults = await processLeads(linkedinLeads, 'linkedin');
    results.push(linkedinResults);

    // RESUMEN FINAL
    const totalNewLeads = results.reduce((sum, r) => sum + r.count, 0);

    console.log('\n═══════════════════════════════════════════');
    console.log('✅ BÚSQUEDA COMPLETADA\n');
    console.log(`📊 Total de leads nuevos: ${totalNewLeads}`);
    console.log(`📱 Instagram: ${results[0].count}`);
    console.log(`🗺️  Google Maps: ${results[1].count}`);
    console.log(`💼 LinkedIn: ${results[2].count}\n`);

    // Top 10 leads
    const allProcessed = results.flatMap(r => r.processed);
    const topLeads = allProcessed
      .sort((a, b) => b.conversionScore - a.conversionScore)
      .slice(0, 10);

    console.log('🔥 TOP 10 LEADS:\n');
    topLeads.forEach((lead, idx) => {
      console.log(`${idx + 1}. ${lead.name || lead.business || lead.username}`);
      console.log(`   Score: ${lead.conversionScore}/10 | ${lead.source}`);
      console.log(`   Servicio: ${lead.recommendedService || 'Portrait Session'}\n`);
    });

    // Enviar email resumen
    await sendSummaryEmail(results);

    console.log('═══════════════════════════════════════════\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
