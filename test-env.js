import 'dotenv/config';

console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY?.substring(0, 20) + '...');
console.log('NOTION_MARKETING_DB_ID:', process.env.NOTION_MARKETING_DB_ID);
