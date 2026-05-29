import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({ 
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

(async () => {
  try {
    const dbId = process.env.NOTION_MARKETING_DB_ID;
    console.log('Fetching database:', dbId);
    
    const db = await notion.databases.retrieve({ database_id: dbId });
    
    console.log('\n📋 MARKETING CAMPAIGNS Database Properties:\n');
    Object.entries(db.properties).forEach(([key, prop]) => {
      console.log(`  "${key}" (${prop.type})`);
    });
  } catch (err) {
    console.log('Error:', err.message);
    console.log('Status:', err.status);
  }
})();
