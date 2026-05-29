import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  try {
    const db = await notion.databases.retrieve(process.env.NOTION_MARKETING_DB_ID);
    console.log('📋 MARKETING Database Properties:\n');
    Object.entries(db.properties).forEach(([key, prop]) => {
      console.log(`  - "${key}" (${prop.type})`);
    });
  } catch (err) {
    console.log('Error:', err.message);
  }
})();
