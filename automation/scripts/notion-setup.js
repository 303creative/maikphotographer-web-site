import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function createDatabase(title, properties) {
  try {
    const database = await notion.databases.create({
      parent: { page_id: process.env.NOTION_PAGE_ID },
      title: [{ type: 'text', text: { content: title } }],
      properties
    });
    return database.id;
  } catch (error) {
    console.error(`Error creating database ${title}:`, error.message);
    throw error;
  }
}

async function createLeadsDatabase() {
  const properties = {
    'Nombre': { title: {} },
    'Email': { email: {} },
    'Teléfono': { phone_number: {} },
    'Servicio': {
      select: {
        options: [
          { name: 'Portrait', color: 'blue' },
          { name: 'Editorial', color: 'green' },
          { name: 'Brand Content', color: 'purple' },
          { name: 'Real Estate', color: 'red' },
          { name: 'Headshots', color: 'yellow' },
          { name: 'Otro', color: 'gray' }
        ]
      }
    },
    'Estado': {
      select: {
        options: [
          { name: 'Nuevo Lead', color: 'blue' },
          { name: 'Contactado', color: 'yellow' },
          { name: 'Propuesta Enviada', color: 'purple' },
          { name: 'Booking Confirmado', color: 'green' },
          { name: 'Completado', color: 'gray' },
          { name: 'Perdido', color: 'red' }
        ]
      }
    },
    'Canal': {
      select: {
        options: [
          { name: 'Web Form', color: 'blue' },
          { name: 'Instagram DM', color: 'pink' },
          { name: 'Referido', color: 'green' },
          { name: 'Google', color: 'red' },
          { name: 'WhatsApp Directo', color: 'green' },
          { name: 'Cal.com', color: 'purple' },
          { name: 'Lead Encontrado', color: 'orange' }
        ]
      }
    },
    'Idioma': {
      select: {
        options: [
          { name: 'Español', color: 'yellow' },
          { name: 'English', color: 'blue' }
        ]
      }
    },
    'Mensaje': { rich_text: {} },
    'Fecha': { date: {} },
    'Seguimiento': { checkbox: {} },
    'Notas': { rich_text: {} },
    'Revenue Estimado': { number: { format: 'dollar' } },
    'Notion ID': { rich_text: {} }
  };

  return createDatabase('LEADS CRM', properties);
}

async function createBookingsDatabase() {
  const properties = {
    'Cliente': { title: {} },
    'Email': { email: {} },
    'Servicio': {
      select: {
        options: [
          { name: 'Portrait', color: 'blue' },
          { name: 'Editorial', color: 'green' },
          { name: 'Brand Content', color: 'purple' },
          { name: 'Real Estate', color: 'red' },
          { name: 'Headshots', color: 'yellow' },
          { name: 'Otro', color: 'gray' }
        ]
      }
    },
    'Fecha Sesión': { date: {} },
    'Hora': { rich_text: {} },
    'Locación': { rich_text: {} },
    'Estado': {
      select: {
        options: [
          { name: 'Pendiente Pago', color: 'yellow' },
          { name: 'Confirmado', color: 'green' },
          { name: 'Completado', color: 'gray' },
          { name: 'Cancelado', color: 'red' },
          { name: 'No Show', color: 'red' }
        ]
      }
    },
    'Precio': { number: { format: 'dollar' } },
    'Depósito Recibido': { checkbox: {} },
    'Fotos Entregadas': { checkbox: {} },
    'Link Fotos': { url: {} },
    'Calificación': {
      select: {
        options: [
          { name: '⭐⭐⭐⭐⭐', color: 'yellow' },
          { name: '⭐⭐⭐⭐', color: 'yellow' },
          { name: '⭐⭐⭐', color: 'yellow' },
          { name: 'Sin calificación', color: 'gray' }
        ]
      }
    },
    'Review Pedida': { checkbox: {} },
    'Notas': { rich_text: {} }
  };

  return createDatabase('BOOKINGS', properties);
}

async function createMarketingDatabase() {
  const properties = {
    'Campaña': { title: {} },
    'Plataforma': {
      select: {
        options: [
          { name: 'Instagram Orgánico', color: 'pink' },
          { name: 'Instagram Ads', color: 'pink' },
          { name: 'Google Ads', color: 'red' },
          { name: 'TikTok', color: 'purple' },
          { name: 'Email', color: 'blue' },
          { name: 'WhatsApp', color: 'green' }
        ]
      }
    },
    'Estado': {
      select: {
        options: [
          { name: 'Borrador', color: 'gray' },
          { name: 'Activa', color: 'green' },
          { name: 'Pausada', color: 'yellow' },
          { name: 'Completada', color: 'blue' }
        ]
      }
    },
    'Presupuesto': { number: { format: 'dollar' } },
    'Impresiones': { number: { format: 'number' } },
    'Alcance': { number: { format: 'number' } },
    'Leads Generados': { number: { format: 'number' } },
    'Bookings Convertidos': { number: { format: 'number' } },
    'Revenue Generado': { number: { format: 'dollar' } },
    'Fecha Inicio': { date: {} },
    'Fecha Fin': { date: {} },
    'Notas': { rich_text: {} }
  };

  return createDatabase('MARKETING CAMPAIGNS', properties);
}

async function createExampleLead(dbId) {
  try {
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        'Nombre': { title: [{ text: { content: 'María García - EJEMPLO' } }] },
        'Email': { email: 'maria@example.com' },
        'Teléfono': { phone_number: '+1 305 123 4567' },
        'Servicio': { select: { name: 'Editorial' } },
        'Mensaje': { rich_text: [{ text: { content: 'Lead de prueba para testing del sistema' } }] },
        'Estado': { select: { name: 'Nuevo Lead' } },
        'Canal': { select: { name: 'Web Form' } },
        'Idioma': { select: { name: 'Español' } },
        'Fecha': { date: { start: new Date().toISOString() } },
        'Seguimiento': { checkbox: false },
        'Revenue Estimado': { number: 450 }
      }
    });
    console.log('✅ Example lead created');
  } catch (error) {
    console.error('Error creating example lead:', error.message);
  }
}

async function main() {
  try {
    console.log('🚀 Starting Notion setup...\n');

    if (!process.env.NOTION_API_KEY) {
      throw new Error('❌ NOTION_API_KEY not found in .env');
    }

    if (!process.env.NOTION_PAGE_ID) {
      throw new Error('❌ NOTION_PAGE_ID not found in .env\nPlease add NOTION_PAGE_ID to your .env file (your Notion workspace root page ID)');
    }

    console.log('📊 Creating LEADS CRM database...');
    const leadsDbId = await createLeadsDatabase();
    console.log(`✅ LEADS database created: ${leadsDbId}`);
    await createExampleLead(leadsDbId);

    console.log('\n📊 Creating BOOKINGS database...');
    const bookingsDbId = await createBookingsDatabase();
    console.log(`✅ BOOKINGS database created: ${bookingsDbId}`);

    console.log('\n📊 Creating MARKETING CAMPAIGNS database...');
    const marketingDbId = await createMarketingDatabase();
    console.log(`✅ MARKETING database created: ${marketingDbId}`);

    // Update .env with the database IDs
    const envPath = path.resolve('.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';

    envContent = envContent.replace(/NOTION_LEADS_DB_ID=.*/g, `NOTION_LEADS_DB_ID=${leadsDbId}`);
    if (!envContent.includes('NOTION_LEADS_DB_ID')) {
      envContent += `\nNOTION_LEADS_DB_ID=${leadsDbId}`;
    }

    envContent = envContent.replace(/NOTION_BOOKINGS_DB_ID=.*/g, `NOTION_BOOKINGS_DB_ID=${bookingsDbId}`);
    if (!envContent.includes('NOTION_BOOKINGS_DB_ID')) {
      envContent += `\nNOTION_BOOKINGS_DB_ID=${bookingsDbId}`;
    }

    envContent = envContent.replace(/NOTION_MARKETING_DB_ID=.*/g, `NOTION_MARKETING_DB_ID=${marketingDbId}`);
    if (!envContent.includes('NOTION_MARKETING_DB_ID')) {
      envContent += `\nNOTION_MARKETING_DB_ID=${marketingDbId}`;
    }

    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ .env file updated with database IDs\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 NEXT STEPS - COPY THESE IDS TO VERCEL:');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`NOTION_LEADS_DB_ID=${leadsDbId}`);
    console.log(`NOTION_BOOKINGS_DB_ID=${bookingsDbId}`);
    console.log(`NOTION_MARKETING_DB_ID=${marketingDbId}`);
    console.log('\n👉 Go to Vercel Dashboard → Settings → Environment Variables');
    console.log('👉 Add these 3 variables\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

main();
