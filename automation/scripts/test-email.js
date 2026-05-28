import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    console.log('📧 Sending test email...\n');

    if (!process.env.RESEND_API_KEY) {
      throw new Error('❌ RESEND_API_KEY not found in .env');
    }

    const response = await resend.emails.send({
      from: 'Maikel Marshall <maikel@maikphotographer.com>',
      to: 'maikelmarshall07@gmail.com',
      subject: '🔥 SISTEMA DE AUTOMATIZACIÓN LISTO',
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px;">
          <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 20px;">MAIKEL MARSHALL</h1>
          <p style="font-size: 18px; color: #ccc; margin: 30px 0 10px;">¡Hola Maikel!</p>
          <p style="color: #999; line-height: 1.8;">Tu sistema de automatización de agencia está funcionando correctamente. Este es un email de prueba.</p>
          <div style="background: #111; border-left: 3px solid #fff; padding: 20px; margin: 30px 0;">
            <p style="margin: 0; color: #0f0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">✅ Resend está operativo</p>
            <p style="color: #999; margin-top: 8px; font-size: 13px;">Los emails de confirmación de leads y bookings funcionarán correctamente.</p>
          </div>
          <p style="color: #555; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 40px;">MAIKEL MARSHALL · MIAMI, FL · @maik_photographer</p>
        </div>
      `
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log('✅ Email sent successfully!');
    console.log(`📨 Message ID: ${response.data.id}\n`);
    process.exit(0);

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    process.exit(1);
  }
}

testEmail();
