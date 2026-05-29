import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;

async function checkSchema() {
  try {
    const db = await notion.databases.retrieve({ database_id: LEADS_DB_ID });
    
    console.log('📋 PROPIEDADES DE DATABASE LEADS:\n');
    
    Object.entries(db.properties).forEach(([key, prop]) => {
      console.log(`✓ ${key}`);
      console.log(`  Tipo: ${prop.type}`);
      if (prop.type === 'select') {
        console.log(`  Opciones: ${prop.select?.options?.map(o => o.name).join(', ')}`);
      }
      console.log();
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkSchema();
