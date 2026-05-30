#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

console.log('═════════════════════════════════════════');
console.log('DEBUG: Verificando variables de entorno');
console.log('═════════════════════════════════════════\n');

console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY ? '✅ SET' : '❌ NO SET');
console.log('NOTION_LEADS_DB_ID:', process.env.NOTION_LEADS_DB_ID || '❌ UNDEFINED');
console.log('GOOGLE_MAPS_API_KEY:', process.env.GOOGLE_MAPS_API_KEY ? '✅ SET' : '❌ NO SET');
console.log('ANTHROPIC_API_KEY:', process.env.ANTHROPIC_API_KEY ? '✅ SET' : '❌ NO SET');
console.log('APIFY_API_TOKEN:', process.env.APIFY_API_TOKEN ? '✅ SET' : '❌ NO SET');
console.log('\n═════════════════════════════════════════');

if (!process.env.NOTION_LEADS_DB_ID) {
  console.error('CRÍTICO: NOTION_LEADS_DB_ID no se cargó del .env');
  process.exit(1);
}

console.log('\n✅ Todas las variables están cargadas correctamente\n');
