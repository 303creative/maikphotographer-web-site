// api/contact.js — Vercel Serverless Function
// Saves lead to Notion + sends WhatsApp alert via Make.com webhook
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, phone, email, type, msg } = req.body;
  const NOTION_KEY = process.env.NOTION_API_KEY;
  const NOTION_DB  = process.env.NOTION_PHOTOS_DB_ID;
  const WA_WEBHOOK = process.env.MAKE_WA_WEBHOOK_URL;

  try {
    // 1 — Save to Notion
    await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB },
        properties: {
          'Nombre':   { title: [{ text: { content: name || '—' } }] },
          'Email':    { email: email || null },
          'Teléfono': { phone_number: phone || null },
          'Servicio': { select: { name: type || 'other' } },
          'Mensaje':  { rich_text: [{ text: { content: msg || '—' } }] },
          'Fuente':   { select: { name: '🎞️ Maik Photographer Web' } },
          'Fecha':    { date: { start: new Date().toISOString() } },
          'Estado':   { select: { name: 'Nuevo Lead' } }
        }
      })
    });

    // 2 — WhatsApp alert via Make.com
    if (WA_WEBHOOK) {
      await fetch(WA_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source:    '🎞️ Maik Photographer Web',
          name, phone, email,
          service:   type,
          message:   msg,
          timestamp: new Date().toISOString()
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
