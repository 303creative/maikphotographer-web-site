export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    notionApiKeyExists: !!process.env.NOTION_API_KEY,
    notionApiKeyLength: process.env.NOTION_API_KEY?.length || 0,
    notionApiKeyStarts: process.env.NOTION_API_KEY?.substring(0, 10) || 'MISSING',
    notionLeadsDbIdExists: !!process.env.NOTION_LEADS_DB_ID,
    notionLeadsDbId: process.env.NOTION_LEADS_DB_ID || 'MISSING',
    resendApiKeyExists: !!process.env.RESEND_API_KEY,
    resendApiKeyLength: process.env.RESEND_API_KEY?.length || 0,
    allEnvVars: Object.keys(process.env)
      .filter(k => k.includes('NOTION') || k.includes('RESEND') || k.includes('N8N') || k.includes('ANTHROPIC'))
      .map(k => `${k}=${process.env[k]?.substring(0, 5)}...`)
  });
}
