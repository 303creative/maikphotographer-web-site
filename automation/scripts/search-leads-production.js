#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';
import axios from 'axios';
import { createTransport } from 'nodemailer';
import { ApifyClient } from 'apify-client';

const claude = new Anthropic();
const notion = new Client({ auth: process.env.NOTION_API_KEY, notionVersion: '2022-06-28' });
const apifyClient = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const BUSINESS_EMAIL = '303creativemarketing@gmail.com';

// Verificar que todas las variables estén cargadas
if (!LEADS_DB_ID) {
  console.error('❌ NOTION_LEADS_DB_ID no está configurada en .env');
  process.exit(1);
}
if (!GOOGLE_MAPS_API_KEY) {
  console.error('❌ GOOGLE_MAPS_API_KEY no está configurada en .env');
  process.exit(1);
}

const transporter = createTransport({
  service: 'gmail',
  auth: { user: BUSINESS_EMAIL, pass: process.env.GMAIL_APP_PASSWORD }
});

console.log('\n🚀 BÚSQUEDA DE LEADS PRODUCTION - THE303\n');
console.log('═══════════════════════════════════════════');
console.log(`Hora: ${new Date().toLocaleString('es-MX')}\n`);

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Scrappear Instagram con Apify - DATOS REALES
// ═══════════════════════════════════════════════════════════

async function scrapeInstagramReal() {
  const hashtags = [
    'miamiphotographer', 'miamimodel', 'miamiinfluencer',
    'wynwoodmiami', 'brickellmiami', 'miamibeach',
    'contentcreatormiami', 'modelosmiami', 'fotografiamiami'
  ];

  console.log(`📸 INSTAGRAM - Scrapeando ${hashtags.length} hashtags reales...\n`);
  let allLeads = [];

  for (const hashtag of hashtags) {
    try {
      console.log(`🔍 #${hashtag}...`);

      const run = await apifyClient.actor('apify/instagram-hashtag-scraper').call({
        hashtags: [hashtag],
        resultsLimit: 25,
        onlyPostsNewerThan: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      });

      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
      const usersMap = new Map();

      items.forEach(post => {
        if (post.ownerUsername && !usersMap.has(post.ownerUsername)) {
          const followers = post.ownerFollowers || 0;

          // FILTRO: Solo 1k-100k followers, bio menciona Miami
          if (followers >= 1000 && followers <= 100000) {
            const bioLower = (post.ownerBio || '').toLowerCase();
            if (bioLower.includes('miami') || bioLower.includes('305') || bioLower.includes('wynwood') || bioLower.includes('brickell')) {
              usersMap.set(post.ownerUsername, {
                username: post.ownerUsername,
                name: post.ownerFullName || post.ownerUsername,
                bio: post.ownerBio || '',
                followers: followers,
                email: extractEmailFromBio(post.ownerBio),
                website: post.ownerExternalUrl || null,
                language: (post.ownerBio || '').toLowerCase().includes('español') ? 'es' : 'en',
                source: 'Instagram Hashtag',
                sourceUrl: `https://instagram.com/${post.ownerUsername}`,
                type: classifyInstagramProfile(post.ownerBio, followers)
              });
            }
          }
        }
      });

      const newLeads = Array.from(usersMap.values());
      allLeads.push(...newLeads);
      console.log(`✅ ${newLeads.length} leads filtrados\n`);

      await new Promise(r => setTimeout(r, 2000));
    } catch (error) {
      console.error(`❌ Error #${hashtag}: ${error.message}`);
    }
  }

  console.log(`📊 Total Instagram REALES: ${allLeads.length}\n`);
  return allLeads;
}

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Scrappear Google Maps - DATOS REALES
// ═══════════════════════════════════════════════════════════

async function scrapeGoogleMapsReal() {
  const searches = [
    { term: 'luxury restaurant Brickell Miami', budget: 'high' },
    { term: 'upscale boutique Wynwood Miami', budget: 'high' },
    { term: 'high-end real estate Miami', budget: 'high' },
    { term: 'medical spa Miami Beach', budget: 'high' },
    { term: 'law firm downtown Miami', budget: 'high' },
    { term: 'restaurant Miami', budget: 'medium' },
    { term: 'beauty salon Miami', budget: 'medium' },
    { term: 'fitness studio Miami', budget: 'medium' }
  ];

  console.log(`🗺️  GOOGLE MAPS - Buscando ${searches.length} categorías reales...\n`);
  let allLeads = [];

  for (const search of searches) {
    try {
      console.log(`🔍 "${search.term}"...`);

      const searchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
      const params = new URLSearchParams({
        query: search.term,
        key: GOOGLE_MAPS_API_KEY,
        language: 'en'
      });

      const response = await axios.get(`${searchUrl}?${params}`);

      if (response.data.status !== 'OK') {
        console.log(`⚠️  Status: ${response.data.status}`);
        continue;
      }

      const places = response.data.results.slice(0, 10);

      for (const place of places) {
        // FILTRO: Rating < 4.2 (necesita mejora) o < 5 fotos
        const needsPhotography = place.rating < 4.2 || !place.photos || place.photos.length < 5;

        if (needsPhotography) {
          try {
            const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
            const detailParams = new URLSearchParams({
              place_id: place.place_id,
              key: GOOGLE_MAPS_API_KEY,
              fields: 'formatted_phone_number,website,email,opening_hours,photos'
            });

            const detailsRes = await axios.get(`${detailsUrl}?${detailParams}`);
            const details = detailsRes.data.result || {};

            allLeads.push({
              business: place.name,
              phone: details.formatted_phone_number || place.formatted_phone_number || 'N/A',
              email: details.email || extractEmailFromBusiness(place.name, details.website),
              location: place.formatted_address || 'Miami, FL',
              rating: place.rating || 0,
              photos: place.photos?.length || 0,
              website: details.website || null,
              language: 'en',
              source: 'Google Maps',
              sourceUrl: place.url || `https://maps.google.com/?q=${encodeURIComponent(place.name)}`,
              type: classifyBusiness(place.types),
              need: place.rating < 4.2 ? 'rating' : 'photos'
            });
          } catch (e) {
            console.log(`⚠️  No detalles para ${place.name}`);
          }

          await new Promise(r => setTimeout(r, 300));
        }
      }

      console.log(`✅ ${places.filter(p => p.rating < 4.2 || !p.photos || p.photos.length < 5).length} con necesidad\n`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.error(`❌ Error "${search.term}": ${error.message}`);
    }
  }

  console.log(`📊 Total Google Maps REALES: ${allLeads.length}\n`);
  return allLeads;
}

// ═══════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES
// ═══════════════════════════════════════════════════════════

function extractEmailFromBio(bio) {
  if (!bio) return null;
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const match = bio.match(emailRegex);
  return match ? match[1] : null;
}

function extractEmailFromBusiness(name, website) {
  if (!website) return null;
  const domain = website.replace('https://', '').replace('http://', '').split('/')[0];
  return `info@${domain}`;
}

function classifyInstagramProfile(bio, followers) {
  const bioLower = (bio || '').toLowerCase();
  if (bioLower.includes('model') || bioLower.includes('modelo')) return 'Modelo';
  if (bioLower.includes('creator') || bioLower.includes('creador')) return 'Creator';
  if (bioLower.includes('influencer') || bioLower.includes('influenciador')) return 'Influencer';
  if (bioLower.includes('photographer') || bioLower.includes('fotografo')) return 'Fotógrafo';
  if (bioLower.includes('business') || bioLower.includes('negocio')) return 'Negocio';
  return 'Creator';
}

function classifyBusiness(types) {
  if (!types) return 'Business';
  const typeStr = types.join(',').toLowerCase();
  if (typeStr.includes('restaurant')) return 'Restaurante';
  if (typeStr.includes('real_estate')) return 'Real Estate';
  if (typeStr.includes('beauty') || typeStr.includes('salon')) return 'Beauty Salon';
  if (typeStr.includes('gym') || typeStr.includes('fitness')) return 'Fitness';
  if (typeStr.includes('spa')) return 'Spa';
  if (typeStr.includes('store') || typeStr.includes('boutique')) return 'Boutique';
  return 'Business';
}

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Generar DM personalizado con Claude
// ═══════════════════════════════════════════════════════════

async function generateInstagramDM(lead) {
  try {
    const prompt = `Genera un DM corto y natural para Instagram (máximo 2 líneas, amigable) para contactar a ${lead.name} (${lead.type}).
    Bio: ${lead.bio}
    Contexto: Soy Maikel Marshall, fotógrafo editorial en Miami. Hago contenido para creators/modelos/negocios.

    Devuelve SOLO el mensaje, sin explicaciones. En ${lead.language === 'es' ? 'ESPAÑOL' : 'INGLÉS'}.`;

    const response = await claude.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].text.trim();
  } catch (error) {
    console.error(`Error generando DM: ${error.message}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Generar Email personalizado con Claude
// ═══════════════════════════════════════════════════════════

async function generateBusinessEmail(lead) {
  try {
    const needReason = lead.need === 'rating' ? 'tu rating es bajo en Google Maps' : 'necesitas fotos profesionales actualizadas';

    const prompt = `Genera un email corto (máximo 4 líneas) para contactar a ${lead.business} sobre fotografía profesional.
    ${needReason}
    Rating/Fotos: ${lead.rating}/5 estrellas, ${lead.photos} fotos
    Tipo: ${lead.type}

    Email debe ser:
    - Directo y profesional
    - Menciona el problema específico
    - Propone solución fotográfica
    - Incluye CTA (call to action)

    Devuelve SOLO el cuerpo del email, sin subject ni firma.`;

    const response = await claude.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].text.trim();
  } catch (error) {
    console.error(`Error generando email: ${error.message}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Crear/Actualizar columnas en Notion
// ═══════════════════════════════════════════════════════════

async function ensureNotionColumns() {
  console.log('🔧 Verificando columnas en Notion...');

  try {
    // Las columnas se crean manualmente en Notion, solo verificamos que la DB existe
    const db = await notion.databases.retrieve(LEADS_DB_ID);
    console.log(`✅ Database encontrada: ${db.title || 'LEADS'}\n`);
    return true;
  } catch (error) {
    console.error(`❌ Error con Notion: ${error.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Guardar lead en Notion con DM/Email
// ═══════════════════════════════════════════════════════════

async function saveLeadToNotion(lead, dmOrEmail, type) {
  try {
    const properties = {
      Nombre: {
        title: [{ text: { content: lead.name || lead.business } }]
      },
      Email: {
        email: lead.email || null
      },
      Teléfono: {
        phone_number: lead.phone || null
      },
      Canal: {
        select: { name: lead.source }
      },
      Estado: {
        select: { name: 'Nuevo Lead' }
      },
      Servicio: {
        select: { name: type === 'instagram' ? 'Portrait' : 'Brand Content' }
      },
      Idioma: {
        select: { name: lead.language === 'es' ? 'Español' : 'English' }
      }
    };

    // Guardar DM o Email listo
    if (type === 'instagram') {
      properties['DM Listo'] = {
        rich_text: [{ text: { content: dmOrEmail || '[No generado]' } }]
      };
    } else {
      properties['Email Listo'] = {
        rich_text: [{ text: { content: dmOrEmail || '[No generado]' } }]
      };
    }

    const page = await notion.pages.create({
      parent: { database_id: LEADS_DB_ID },
      properties: properties
    });

    return page.id;
  } catch (error) {
    console.error(`Error guardando en Notion: ${error.message}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Procesar leads y generar mensajes
// ═══════════════════════════════════════════════════════════

async function processLeads(leads, type) {
  console.log(`\n📧 Procesando ${leads.length} ${type === 'instagram' ? 'Instagram' : 'Google Maps'} leads...\n`);

  const processed = [];
  let saved = 0;

  for (const lead of leads.slice(0, 10)) { // Máximo 10 por ahora
    try {
      let message;
      if (type === 'instagram') {
        message = await generateInstagramDM(lead);
      } else {
        message = await generateBusinessEmail(lead);
      }

      const notionId = await saveLeadToNotion(lead, message, type);

      if (notionId) {
        saved++;
        processed.push({ ...lead, message, notionId });
        console.log(`✅ ${lead.name || lead.business}`);
      }

      await new Promise(r => setTimeout(r, 1000)); // Rate limit
    } catch (error) {
      console.error(`⚠️  Error procesando ${lead.name || lead.business}`);
    }
  }

  console.log(`\n✅ ${saved} leads guardados en Notion\n`);
  return processed;
}

// ═══════════════════════════════════════════════════════════
// FUNCIÓN: Enviar email diario con reporte
// ═══════════════════════════════════════════════════════════

async function sendDailyReport(instagramLeads, googleMapLeads) {
  const totalLeads = instagramLeads.length + googleMapLeads.length;

  let topLeads = [
    ...instagramLeads.slice(0, 5),
    ...googleMapLeads.slice(0, 5)
  ];

  const emailBody = `
<h2>🔥 REPORTE DE LEADS - ${new Date().toLocaleDateString('es-MX')}</h2>

<h3>📊 Resumen:</h3>
<ul>
  <li><strong>Total leads encontrados:</strong> ${totalLeads}</li>
  <li><strong>Instagram (REALES):</strong> ${instagramLeads.length}</li>
  <li><strong>Google Maps (REALES):</strong> ${googleMapLeads.length}</li>
</ul>

<h3>🔥 Top ${topLeads.length} Leads:</h3>
<table border="1" cellpadding="10">
  <tr style="background-color: #f0f0f0;">
    <th>Nombre/Negocio</th>
    <th>Tipo</th>
    <th>Fuente</th>
    <th>Acción</th>
  </tr>
  ${topLeads.map(l => `
  <tr>
    <td><strong>${l.name || l.business}</strong></td>
    <td>${l.type}</td>
    <td>${l.source}</td>
    <td>${l.source === 'Instagram Hashtag' ? '💬 DM' : '📧 Email'}</td>
  </tr>
  `).join('')}
</table>

<h3>📋 Acciones hoy:</h3>
<ol>
  <li>Abre Notion → LEADS database</li>
  <li>Busca los leads de hoy (filtrar por "Nuevo Lead")</li>
  <li>Copia el DM/Email listo en la columna correspondiente</li>
  <li>Envía manualmente (Instagram DM o Gmail)</li>
  <li>Marca "Contactado" cuando termines</li>
</ol>

<p><strong>🎯 Meta:</strong> Contactar 10 leads diarios = 300 leads/mes = ~10-30 clientes</p>
<p style="color: #666; font-size: 12px;">Sistema automático THE303 | ${new Date().toLocaleString('es-MX')}</p>
  `;

  try {
    await transporter.sendMail({
      from: BUSINESS_EMAIL,
      to: BUSINESS_EMAIL,
      subject: `🔥 ${totalLeads} leads nuevos Miami — ${new Date().toLocaleDateString()}`,
      html: emailBody
    });
    console.log(`✅ Email enviado a ${BUSINESS_EMAIL}`);
  } catch (error) {
    console.error(`❌ Error enviando email: ${error.message}`);
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN: EJECUTAR TODO
// ═══════════════════════════════════════════════════════════

async function main() {
  try {
    // 1. Verificar Notion
    const notionOk = await ensureNotionColumns();
    if (!notionOk) {
      console.error('❌ No se puede acceder a Notion');
      process.exit(1);
    }

    // 2. Instagram REAL
    console.log('📸 Scrapeando Instagram REALES...');
    const instagramLeads = await scrapeInstagramReal();
    const processedInstagram = await processLeads(instagramLeads, 'instagram');

    // 3. Google Maps REAL
    console.log('🗺️  Scrapeando Google Maps REALES...');
    const googleMapsLeads = await scrapeGoogleMapsReal();
    const processedGoogleMaps = await processLeads(googleMapsLeads, 'google-maps');

    // 4. Resumen
    console.log('\n═══════════════════════════════════════════');
    console.log('✅ BÚSQUEDA COMPLETADA\n');
    console.log(`📊 Total guardados en Notion: ${processedInstagram.length + processedGoogleMaps.length}`);
    console.log(`📱 Instagram: ${processedInstagram.length}`);
    console.log(`🗺️  Google Maps: ${processedGoogleMaps.length}\n`);

    // 5. Email diario
    await sendDailyReport(processedInstagram, processedGoogleMaps);

    console.log('═══════════════════════════════════════════\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();
