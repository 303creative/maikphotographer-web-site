#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@notionhq/client';
import { ApifyClient } from 'apify-client';
import axios from 'axios';
import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';

const claude = new Anthropic();
const apifyClient = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
const notion = new Client({ auth: process.env.NOTION_API_KEY, notionVersion: '2022-06-28' });
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const BUSINESS_EMAIL = '303creativemarketing@gmail.com';

const transporter = createTransport({
  service: 'gmail',
  auth: { user: BUSINESS_EMAIL, pass: process.env.GMAIL_APP_PASSWORD }
});

const leadsFile = path.join(process.cwd(), 'business-leads-today.json');

console.log('\n🎯 BUSINESS LEADS SEARCH — Negocios que necesitan fotografía\n');
console.log('═══════════════════════════════════════════\n');

// HASHTAGS DE NEGOCIOS (NO fotógrafos)
const BUSINESS_HASHTAGS = [
  'miamibusiness',        // General businesses
  'miamieats',           // Restaurants
  'miamiboutique',       // Clothing stores
  'miamispa',            // Spas/salons
  'miamibeauty',         // Beauty businesses
  'miamirealestate',     // Real estate
  'miamicafe',           // Cafes
  'miamitattoo',         // Tattoo shops
  'miamihotel',          // Hotels
  'miamievents'          // Event venues
];

// BÚSQUEDAS DE GOOGLE MAPS (Negocios que necesitan fotos)
const GOOGLE_MAPS_QUERIES = [
  'restaurants in Miami',
  'beauty salon Miami',
  'spa Miami',
  'boutique clothing Miami',
  'real estate agent Miami',
  'tattoo shop Miami',
  'fitness studio Miami',
  'cafe Miami',
  'hotel Miami',
  'event venue Miami',
  'dental clinic Miami',
  'hair salon Miami',
  'photography studio Miami'
];

async function scrapeInstagramBusinesses() {
  console.log(`📸 Scrapeando Instagram — Negocios (${BUSINESS_HASHTAGS.length} hashtags)...\n`);

  const globalBusinessMap = new Map();

  for (const hashtag of BUSINESS_HASHTAGS) {
    try {
      console.log(`🔍 #${hashtag}...`);

      const run = await apifyClient.actor('apify/instagram-hashtag-scraper').call({
        hashtags: [hashtag],
        resultsLimit: 20
      });

      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
      let newBusinesses = 0;

      items.forEach(post => {
        if (post.ownerUsername && !globalBusinessMap.has(post.ownerUsername)) {
          globalBusinessMap.set(post.ownerUsername, {
            username: post.ownerUsername,
            name: post.ownerFullName || post.ownerUsername,
            bio: post.ownerBio || '',
            followers: post.ownerFollowers || 0,
            source: 'Instagram',
            sourceUrl: `https://instagram.com/${post.ownerUsername}`,
            type: 'Business',
            contactMethod: 'instagram_dm'
          });
          newBusinesses++;
        }
      });

      console.log(`✅ ${newBusinesses} negocios nuevos (total: ${globalBusinessMap.size})\n`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.log(`⚠️  Error #${hashtag}: ${error.message}`);
    }
  }

  console.log(`📊 Total Instagram businesses: ${globalBusinessMap.size}\n`);
  return Array.from(globalBusinessMap.values());
}

async function searchGoogleMapsBusinesses() {
  console.log(`🗺️  Buscando en Google Maps (${GOOGLE_MAPS_QUERIES.length} búsquedas)...\n`);

  const businesses = [];
  let count = 0;

  for (const query of GOOGLE_MAPS_QUERIES) {
    try {
      console.log(`🔍 ${query}...`);

      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: query,
          key: googleMapsKey,
          region: 'us'
        }
      });

      const results = response.data.results || [];

      for (const place of results.slice(0, 5)) {
        // Obtener detalles del lugar (para teléfono y email)
        const detailsResponse = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            place_id: place.place_id,
            fields: 'name,formatted_phone_number,website,formatted_address,url,business_status',
            key: googleMapsKey
          }
        });

        const details = detailsResponse.data.result || {};

        businesses.push({
          name: place.name,
          address: place.formatted_address,
          phone: details.formatted_phone_number || 'N/A',
          website: details.website || 'N/A',
          googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(place.name)}+${encodeURIComponent(place.formatted_address)}`,
          source: 'Google Maps',
          sourceUrl: details.url || 'N/A',
          type: 'Business',
          contactMethod: 'phone_email',
          placeId: place.place_id
        });

        count++;
        if (count >= 30) break;
      }

      if (count >= 30) break;
      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.log(`⚠️  Error "${query}": ${error.message}`);
    }
  }

  console.log(`\n📊 Total Google Maps businesses: ${businesses.length}\n`);
  return businesses;
}

async function generateBusinessMessage(business) {
  try {
    const businessContext = business.bio || business.address || '';
    const response = await claude.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `Genera un mensaje de outreach CORTO (2-3 líneas) para una empresa de fotografía dirigido a: "${business.name}".

        El objetivo es ofrecerle sesiones de fotos profesionales para su negocio (fotos de productos, ambiente, equipo, team).

        Contexto del negocio: ${businessContext}

        El mensaje debe ser:
        - Profesional pero amigable
        - Específico al tipo de negocio (no genérico)
        - Que lo dé a seguir por WhatsApp o email

        Devuelve SOLO el mensaje, sin explicaciones.`
      }]
    });

    return response.content[0].text.trim();
  } catch (error) {
    return `Hola ${business.name.split(' ')[0]}! 👋 Soy Maikel, fotógrafo profesional en Miami. Veo que tu negocio está creciendo en Instagram. ¿Te gustaría fotos profesionales para tu feed? Tengo paquetes especiales para negocios. ¡Conversamos por WhatsApp!`;
  }
}

async function saveBusinessLeads(businesses) {
  const processed = [];

  for (const business of businesses.slice(0, 15)) {
    try {
      const message = await generateBusinessMessage(business);

      processed.push({
        ...business,
        message: message,
        timestamp: new Date().toISOString(),
        status: 'Nuevo Lead',
        saved: false
      });

      // Guardar en Notion
      try {
        if (LEADS_DB_ID && business.contactMethod === 'instagram_dm') {
          await notion.pages.create({
            parent: { database_id: LEADS_DB_ID },
            properties: {
              Nombre: { title: [{ text: { content: business.name } }] },
              Email: { email: business.website && business.website.includes('@') ? business.website : null },
              Canal: { select: { name: 'Instagram' } },
              Notas: { rich_text: [{ text: { content: `DM: ${message}` } }] }
            }
          });
          processed[processed.length - 1].saved = true;
          console.log(`✅ ${business.name} → Notion`);
        }
      } catch (notionError) {
        console.log(`⚠️  ${business.name} → JSON (Notion falló)`);
      }

      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.log(`❌ Error ${business.name}: ${error.message}`);
    }
  }

  // Guardar en JSON
  fs.writeFileSync(leadsFile, JSON.stringify(processed, null, 2));
  console.log(`\n💾 Guardados en JSON: ${leadsFile}`);

  return processed;
}

async function sendBusinessEmail(leads) {
  const instagramLeads = leads.filter(l => l.source === 'Instagram');
  const mapsLeads = leads.filter(l => l.source === 'Google Maps');

  const htmlBody = `
<h2>🎯 ${leads.length} NEGOCIOS ENCONTRADOS — Clientes Potenciales</h2>
<p><strong>${new Date().toLocaleDateString('es-MX')}</strong></p>

<h3>📱 Negocios en Instagram (DMs listos):</h3>
<table border="1" cellpadding="10" style="width:100%">
<tr style="background-color: #f0f0f0;">
  <th>Nombre</th>
  <th>Instagram</th>
  <th>Mensaje para DM</th>
</tr>
${instagramLeads.map(l => `
<tr>
  <td><strong>${l.name}</strong></td>
  <td><a href="${l.sourceUrl}">@${l.username}</a></td>
  <td><code>${l.message}</code></td>
</tr>
`).join('')}
</table>

<h3>🗺️ Negocios en Google Maps (Teléfono/Email):</h3>
<table border="1" cellpadding="10" style="width:100%">
<tr style="background-color: #f0f0f0;">
  <th>Nombre</th>
  <th>Teléfono</th>
  <th>Sitio Web</th>
  <th>Ubicación</th>
</tr>
${mapsLeads.map(l => `
<tr>
  <td><strong>${l.name}</strong></td>
  <td>${l.phone}</td>
  <td><a href="${l.website}" target="_blank">${l.website === 'N/A' ? 'N/A' : 'Visitar'}</a></td>
  <td>${l.address}</td>
</tr>
`).join('')}
</table>

<h3>📋 ACCIONES MANUALES:</h3>
<ol>
  <li><strong>Instagram DMs:</strong> Abre Instagram, copia el mensaje, envía a cada @negocio</li>
  <li><strong>WhatsApp:</strong> Busca el número en Google Maps, envía mensaje profesional</li>
  <li><strong>Email:</strong> Usa el sitio web para encontrar contacto, envía propuesta</li>
</ol>

<p style="color: #999; font-size: 12px;">Sistema THE303 | Búsqueda de leads de negocio</p>
  `;

  try {
    await transporter.sendMail({
      from: BUSINESS_EMAIL,
      to: BUSINESS_EMAIL,
      subject: `🎯 ${leads.length} negocios clientes potenciales — ${new Date().toLocaleDateString()}`,
      html: htmlBody
    });
    console.log(`✅ Email enviado a ${BUSINESS_EMAIL}`);
  } catch (error) {
    console.log(`⚠️  Email fallido: ${error.message}`);
  }
}

async function main() {
  try {
    const instagramBusinesses = await scrapeInstagramBusinesses();
    const mapBusinesses = await searchGoogleMapsBusinesses();

    const allBusinesses = [...instagramBusinesses, ...mapBusinesses];
    const processedLeads = await saveBusinessLeads(allBusinesses);

    await sendBusinessEmail(processedLeads);

    console.log('\n═══════════════════════════════════════════');
    console.log(`✅ COMPLETADO: ${processedLeads.length} negocios procesados\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR FATAL:', error.message);
    process.exit(1);
  }
}

main();
