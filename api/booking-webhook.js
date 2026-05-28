import { Client } from '@notionhq/client';
import { Resend } from 'resend';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const event = req.body;

    if (!event.data || !event.data.attendees) {
      return res.status(400).json({ error: 'Invalid Cal.com webhook payload' });
    }

    const attendees = event.data.attendees[0] || {};
    const { name, email, timeZone } = attendees;
    const eventTitle = event.data.title || 'Session';
    const startTime = event.data.startTime;
    const duration = event.data.duration || 60;

    // 1. Crear entrada en Notion BOOKINGS
    const bookingEntry = await notion.pages.create({
      parent: { database_id: process.env.NOTION_BOOKINGS_DB_ID },
      properties: {
        'Cliente': { title: [{ text: { content: name || 'Booking' } }] },
        'Email': { email: email || '' },
        'Servicio': { select: { name: eventTitle } },
        'Fecha Sesión': { date: { start: startTime } },
        'Hora': { rich_text: [{ text: { content: `${duration} mins` } }] },
        'Locación': { rich_text: [{ text: { content: 'TBD' } }] },
        'Estado': { select: { name: 'Confirmado' } },
        'Precio': { number: 0 },
        'Depósito Recibido': { checkbox: false },
        'Fotos Entregadas': { checkbox: false }
      }
    });

    // 2. Email de confirmación bilingüe
    const detailsES = `
      <h3 style="color: #fff; margin: 20px 0 10px;">Detalles de tu sesión:</h3>
      <ul style="color: #999; line-height: 2;">
        <li><strong>Tipo:</strong> ${eventTitle}</li>
        <li><strong>Fecha:</strong> ${new Date(startTime).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
        <li><strong>Hora:</strong> ${new Date(startTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</li>
        <li><strong>Duración:</strong> ${duration} minutos</li>
      </ul>
    `;

    const detailsEN = `
      <h3 style="color: #fff; margin: 20px 0 10px;">Session details:</h3>
      <ul style="color: #999; line-height: 2;">
        <li><strong>Type:</strong> ${eventTitle}</li>
        <li><strong>Date:</strong> ${new Date(startTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
        <li><strong>Time:</strong> ${new Date(startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</li>
        <li><strong>Duration:</strong> ${duration} minutes</li>
      </ul>
    `;

    const isSpanish = ['es', 'es-ES', 'es-MX'].includes(timeZone || 'es');
    const emailSubject = isSpanish
      ? `¡Tu sesión está confirmada! — Maikel Marshall Photography`
      : `Your session is confirmed! — Maikel Marshall Photography`;

    const emailHTML = `
      <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px;">
        <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 20px;">MAIKEL MARSHALL</h1>
        <p style="font-size: 18px; color: #ccc; margin: 30px 0 10px;">${isSpanish ? `Hola ${name},` : `Hey ${name},`}</p>
        <p style="color: #999; line-height: 1.8;">${isSpanish ? 'Tu sesión de fotografía está confirmada. Aquí están los detalles:' : 'Your photography session is confirmed. Here are the details:'}</p>
        ${isSpanish ? detailsES : detailsEN}
        <div style="background: #111; border-left: 3px solid #fff; padding: 20px; margin: 30px 0;">
          <p style="margin: 0; color: #ccc; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">${isSpanish ? 'Preguntas?' : 'Questions?'}</p>
          <a href="https://wa.me/17863329815" style="color: #fff; font-size: 16px; text-decoration: none; display: block; margin-top: 8px;">💬 ${isSpanish ? 'Escríbeme en WhatsApp' : 'Message me on WhatsApp'} →</a>
        </div>
        <p style="color: #555; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 40px;">MAIKEL MARSHALL · MIAMI, FL · @maik_photographer</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Maikel Marshall <maikel@maikphotographer.com>',
      to: email,
      subject: emailSubject,
      html: emailHTML
    });

    // 3. Notificación a Maikel
    await resend.emails.send({
      from: 'Sistema <maikel@maikphotographer.com>',
      to: 'maikelmarshall07@gmail.com',
      subject: `📅 BOOKING CONFIRMADO: ${name}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background: #0a0a0a; color: #0f0;">
          <h2 style="color: #fff;">NUEVO BOOKING</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; color: #888;">Cliente:</td><td style="color: #0f0;">${name}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Email:</td><td style="color: #0f0;">${email}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Tipo:</td><td style="color: #0f0;">${eventTitle}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Fecha:</td><td style="color: #0f0;">${new Date(startTime).toLocaleDateString()}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Hora:</td><td style="color: #0f0;">${new Date(startTime).toLocaleTimeString()}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Notion ID:</td><td style="color: #555; font-size: 12px;">${bookingEntry.id}</td></tr>
          </table>
        </div>
      `
    });

    // 4. Disparar webhook n8n si existe
    if (process.env.N8N_WEBHOOK_URL_BOOKING) {
      await fetch(process.env.N8N_WEBHOOK_URL_BOOKING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, eventTitle, startTime, duration, notionId: bookingEntry.id })
      }).catch(err => console.log('n8n webhook error (non-critical):', err.message));
    }

    return res.status(200).json({
      success: true,
      message: 'Booking processed',
      notionId: bookingEntry.id
    });

  } catch (error) {
    console.error('Booking webhook error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
