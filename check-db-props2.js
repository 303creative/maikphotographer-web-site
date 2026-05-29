import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const dbId = '36ec90d6d9b881a1868ae76375ff9b4d'; // Without dashes

(async () => {
  try {
    const db = await notion.databases.retrieve(dbId);
    console.log('✅ Database found!');
    console.log('📋 Properties:\n');
    Object.entries(db.properties).forEach(([key, prop]) => {
      console.log(`  - "${key}" (${prop.type})`);
    });
  } catch (err) {
    console.log('Error:', err.message);
  }
})();
