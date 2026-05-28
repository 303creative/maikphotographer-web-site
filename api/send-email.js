import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      to,
      subject,
      html,
      from = 'Maikel Marshall <onboarding@resend.dev>',
      replyTo = '303creativemarketing@gmail.com'
    } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
    }

    const emailRes = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo
    });

    if (emailRes.error) {
      return res.status(400).json({ error: emailRes.error });
    }

    return res.status(200).json({
      success: true,
      messageId: emailRes.data?.id,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Send email error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
