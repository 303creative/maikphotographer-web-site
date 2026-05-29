import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;
const testLeadId = '36fc90d6-d9b8-8192-8da7-dac735c2eea9';

async function verifyLead() {
  try {
    console.log('🔍 Verificando lead en Notion...\n');
    
    // Buscar el lead específico
    const page = await notion.pages.retrieve({ page_id: testLeadId });
    
    console.log('✅ LEAD ENCONTRADO EN NOTION:\n');
    console.log('ID:', page.id);
    console.log('Nombre:', page.properties?.Nombre?.title?.[0]?.text?.content || 'N/A');
    console.log('Email:', page.properties?.Email?.email || 'N/A');
    console.log('Teléfono:', page.properties?.Teléfono?.phone_number || 'N/A');
    console.log('Tipo:', page.properties?.['Tipo de Sesión']?.select?.name || 'N/A');
    console.log('Canal:', page.properties?.Canal?.select?.name || 'N/A');
    console.log('Estado:', page.properties?.Estado?.select?.name || 'N/A');
    console.log('Fecha:', page.properties?.['Fecha Creacion']?.created_time || 'N/A');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verifyLead();
