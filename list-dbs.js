import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  try {
    const response = await notion.search({
      filter: { property: 'object', value: 'database' }
    });
    
    console.log('📚 Available Databases:\n');
    response.results.forEach(db => {
      if (db.object === 'database') {
        console.log(`  - ${db.title?.[0]?.plain_text || 'Untitled'}`);
        console.log(`    ID: ${db.id}\n`);
      }
    });
  } catch (err) {
    console.log('Error:', err.message);
  }
})();
