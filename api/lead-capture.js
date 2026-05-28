import { Client } from '@notionhq/client';
import nodemailer from 'nodemailer';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, phone, email, sessionType, message, lang = 'es' } = req.body;

    if (!name || !phone || !email || !sessionType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Guardar en Notion CRM
    const notionEntry = await notion.pages.create({
      parent: { database_id: process.env.NOTION_LEADS_DB_ID },
      properties: {
        'Nombre': { title: [{ text: { content: name } }] },
        'Email': { email: email },
        'Teléfono': { phone_number: phone },
        'Servicio': { select: { name: sessionType || 'Por definir' } },
        'Mensaje': { rich_text: [{ text: { content: message || '' } }] },
        'Estado': { select: { name: 'Nuevo Lead' } },
        'Canal': { select: { name: 'Web Form' } },
        'Idioma': { select: { name: lang === 'es' ? 'Español' : 'English' } },
        'Fecha': { date: { start: new Date().toISOString() } },
        'Seguimiento': { checkbox: false }
      }
    });

    // 2. Email de confirmación al cliente (bilingüe)
    const emailContent = lang === 'es' ? {
      subject: '¡Recibí tu solicitud! — Maikel Marshall Photography',
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px;">
          <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 20px;">MAIKEL MARSHALL</h1>
          <p style="font-size: 18px; color: #ccc; margin: 30px 0 10px;">Hola ${name},</p>
          <p style="color: #999; line-height: 1.8;">Recibí tu solicitud para una sesión de <strong style="color: #fff;">${sessionType}</strong>. Me comunicaré contigo en menos de 24 horas por WhatsApp para coordinar todos los detalles.</p>
          <div style="background: #111; border-left: 3px solid #fff; padding: 20px; margin: 30px 0;">
            <p style="margin: 0; color: #ccc; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">¿Tienes prisa?</p>
            <a href="https://wa.me/17863329815" style="color: #fff; font-size: 16px; text-decoration: none; display: block; margin-top: 8px;">💬 Escríbeme directo en WhatsApp →</a>
          </div>
          <p style="color: #555; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 40px;">MAIKEL MARSHALL · MIAMI, FL · @maik_photographer</p>
        </div>
      `
    } : {
      subject: 'Got your request! — Maikel Marshall Photography',
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px;">
          <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 20px;">MAIKEL MARSHALL</h1>
          <p style="font-size: 18px; color: #ccc; margin: 30px 0 10px;">Hey ${name},</p>
          <p style="color: #999; line-height: 1.8;">I received your request for a <strong style="color: #fff;">${sessionType}</strong> session. I'll reach out within 24 hours via WhatsApp to coordinate all the details.</p>
          <div style="background: #111; border-left: 3px solid #fff; padding: 20px; margin: 30px 0;">
            <p style="margin: 0; color: #ccc; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">In a rush?</p>
            <a href="https://wa.me/17863329815" style="color: #fff; font-size: 16px; text-decoration: none; display: block; margin-top: 8px;">💬 Message me directly on WhatsApp →</a>
          </div>
          <p style="color: #555; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 40px;">MAIKEL MARSHALL · MIAMI, FL · @maik_photographer</p>
        </div>
      `
    };

    // Enviar email via Gmail SMTP (nodemailer)
    const sendEmailViaGmail = async (to, subject, html) => {
      try {
        await gmailTransporter.sendMail({
          from: process.env.GMAIL_USER,
          to: to,
          subject: subject,
          html: html
        });
        console.log('[LEAD] Email sent via Gmail SMTP:', { to, subject, timestamp: new Date().toISOString() });
      } catch (error) {
        console.error('[LEAD] Email failed:', { to, error: error.message });
        throw new Error('Email service unavailable');
      }
    };

    // Enviar confirmación al cliente
    await sendEmailViaGmail(
      email,
      emailContent.subject,
      emailContent.html
    );

    // 3. Notificación interna a Maikel
    const notificationHtml = `
      <div style="font-family: monospace; padding: 20px; background: #0a0a0a; color: #0f0;">
        <h2 style="color: #fff;">NUEVO LEAD RECIBIDO</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; color: #888;">Nombre:</td><td style="color: #0f0;">${name}</td></tr>
          <tr><td style="padding: 8px; color: #888;">Email:</td><td style="color: #0f0;">${email}</td></tr>
          <tr><td style="padding: 8px; color: #888;">Teléfono:</td><td style="color: #0f0;">${phone}</td></tr>
          <tr><td style="padding: 8px; color: #888;">Servicio:</td><td style="color: #0f0;">${sessionType}</td></tr>
          <tr><td style="padding: 8px; color: #888;">Mensaje:</td><td style="color: #0f0;">${message || '—'}</td></tr>
          <tr><td style="padding: 8px; color: #888;">Notion ID:</td><td style="color: #555; font-size: 12px;">${notionEntry.id}</td></tr>
        </table>
        <a href="https://wa.me/${phone?.replace(/\D/g, '')}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 24px; text-decoration: none; margin-top: 20px; font-family: sans-serif; border-radius: 4px;">WhatsApp →</a>
      </div>
    `;

    await sendEmailViaGmail(
      '303creativemarketing@gmail.com',
      `🔥 NUEVO LEAD: ${name} — ${sessionType}`,
      notificationHtml
    );

    // 4. Disparar webhook de n8n para flujo de seguimiento
    if (process.env.N8N_WEBHOOK_URL_LEADS) {
      await fetch(process.env.N8N_WEBHOOK_URL_LEADS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, sessionType, message, notionId: notionEntry.id, lang })
      }).catch(err => console.log('[LEAD] n8n webhook error (non-critical):', err.message));
    }

    console.log('[LEAD] Lead captured successfully:', { name, sessionType, notionId: notionEntry.id, timestamp: new Date().toISOString() });

    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      notionId: notionEntry.id
    });

  } catch (error) {
    console.error('[LEAD] Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
