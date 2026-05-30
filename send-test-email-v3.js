#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import { getUniversalEmailTemplate } from './automation/email-templates/universal-template-v3.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendTestEmail() {
  console.log('\n📧 SENDING TEST EMAIL — V3 (SIN IMAGEN HERO)\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    const htmlContent = getUniversalEmailTemplate({
      clientName: "La Dolce Vita Restaurant",
      headline: "Fotos que hagan crecer tu restaurante",
      subheadline: "Comida que se vea irresistible.",
      mainMessage: "Los mejores restaurantes de Miami ya confían en nosotros para mostrar su comida profesionalmente. ¿Por qué tú no?",
      service1: "Fotografía profesional de platos y ambiente",
      service2: "Contenido optimizado para Instagram y TikTok",
      service3: "Reels listos para publicar (ahorra horas de edición)",
      service4: "Sesiones rápidas sin interferir tu operación",
      service5: "Estrategia de publicación con timing óptimo",
      benefit1: "Más reservas (clientes confían en comida profesional)",
      benefit2: "Más ordenes online (fotos que abren apetito)",
      benefit3: "Más engagement (contenido que la gente quiere compartir)",
      ctaButtonText: "Conversar Ahora",
      secondaryButtonText: "Ver Portfolio",
      footerText: "Maikel Marshall | Fotógrafo & Director Creativo"
    });

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: "maikelmarshall07@gmail.com",
      subject: "Fotos que hagan crecer tu restaurante",
      html: htmlContent,
      replyTo: process.env.BUSINESS_EMAIL
    });

    console.log('✅ TEST EMAIL SENT SUCCESSFULLY!\n');
    console.log('To: maikelmarshall07@gmail.com');
    console.log('Subject: Fotos que hagan crecer tu restaurante\n');
    console.log('Version 3 Changes:');
    console.log('  ✅ Eliminada imagen hero');
    console.log('  ✅ Línea dorada en el header (marca)');
    console.log('  ✅ Contenido puro: servicios + beneficios');
    console.log('  ✅ CTA fuerte (WhatsApp)');
    console.log('  ✅ Minimalista y limpio\n');
    console.log('Cuando tengas el banner:');
    console.log('  1. Pásame la imagen (PNG, JPG, o HTML)');
    console.log('  2. Yo la inyecto en el template');
    console.log('  3. Se envía en cada campaña automáticamente\n');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

sendTestEmail();
