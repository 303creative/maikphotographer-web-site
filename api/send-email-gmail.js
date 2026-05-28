import nodemailer from 'nodemailer';

// Crear transporte Gmail
// NOTA: Requiere configuración manual:
// 1. Ir a myaccount.google.com/apppasswords
// 2. Seleccionar "Mail" y "Windows"
// 3. Google genera una contraseña de 16 caracteres
// 4. Guardarla en variable de entorno GMAIL_APP_PASSWORD

const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ GMAIL_USER o GMAIL_APP_PASSWORD no están configuradas');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
    }

    const transporter = createTransporter();
    if (!transporter) {
      return res.status(500).json({
        error: 'Gmail not configured',
        details: 'Configure GMAIL_USER and GMAIL_APP_PASSWORD environment variables'
      });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('📧 Email enviado via Gmail:', {
      messageId: info.messageId,
      to: to,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully via Gmail'
    });

  } catch (error) {
    console.error('❌ Gmail send error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
}
