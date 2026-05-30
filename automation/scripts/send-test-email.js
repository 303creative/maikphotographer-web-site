#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

console.log('\n📧 Enviando email de TEST a tu inbox...\n');

// Email personalizado para una dulcería
const dairyName = "Sweet Dreams Bakery";
const ownerName = "Maikel";
const neighborhood = "Wynwood";

const emailSubject = `Fotos profesionales para ${dairyName}`;

const emailBody = `Hola Maikel,

Encontré Sweet Dreams Bakery en Google Maps — se ve increíble.

Lo único que noté: tus productos merecen fotos que hagan agua la boca.

Las dulcerías con fotos profesionales en Instagram reciben 40% más pedidos.

Ayudo a negocios de repostería en Miami con fotografía de productos que VENDE.

Una sesión = 50+ fotos de tus mejores dulces listos para Instagram, TikTok, y tu sitio web.

¿Interesado en una llamada de 15 minutos para ver ejemplos?

— Maikel Marshall
Fotógrafo de Productos & Repostería
📱 +1 (786) 332-9815
🌐 maikphotographer.com`;

async function sendTestEmail() {
  try {
    console.log('📤 Enviando email...\n');

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: 'maikelmarshall07@gmail.com',
      subject: emailSubject,
      text: emailBody,
      replyTo: process.env.BUSINESS_EMAIL,
      headers: {
        'X-Priority': '3'
      }
    });

    console.log('✅ ¡Email enviado exitosamente!\n');
    console.log('═══════════════════════════════════════════════');
    console.log('\n📧 VISTA PREVIA DEL EMAIL:\n');
    console.log(`Subject: ${emailSubject}\n`);
    console.log('---\n');
    console.log(emailBody);
    console.log('\n═══════════════════════════════════════════════\n');
    console.log('✓ Revisa tu inbox en: maikelmarshall07@gmail.com');
    console.log('✓ Este es el formato que reciben los negocios');
    console.log('✓ Plain text (no HTML) = mejor para cold email\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

sendTestEmail();
