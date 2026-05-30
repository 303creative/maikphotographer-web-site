#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import { getUniversalEmailTemplate } from './automation/email-templates/universal-template-v2.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendTestEmail() {
  console.log('\n📧 SENDING TEST EMAIL — NEW SIMPLIFIED TEMPLATE V2\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    const htmlContent = getUniversalEmailTemplate({
      clientName: "La Dolce Vita Restaurant",
      businessType: "restaurant",
      headline: "Fotos que hagan crecer tu restaurante",
      subheadline: "Comida que se vea irresistible. Clientes que vuelvan.",
      service1: "Fotografía profesional de platos y ambiente (sin artificios)",
      service2: "Contenido optimizado para Instagram, TikTok y Google Maps",
      service3: "Reels y carruseles automáticos listos para publicar",
      service4: "Sesiones rápidas que no interfieren con tu operación",
      service5: "Estrategia de publicación y timing óptimo",
      benefit1: "Más reservas (clientes ven comida profesional = confianza)",
      benefit2: "Más ordenes online (fotos de menú que abren apetito)",
      benefit3: "Más engagement en redes (contenido que la gente quiere compartir)",
      ctaText: "Los mejores restaurantes de Miami ya confían en nosotros. ¿Tú qué esperas?",
      ctaButtonText: "Conversar Ahora",
      secondaryButtonText: "Ver Portfolio",
      footerText: "Maikel Marshall | Fotógrafo & Director Creativo"
    });

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: "maikelmarshall07@gmail.com",
      subject: "Fotos que hagan crecer tu restaurante — Propuesta",
      html: htmlContent,
      replyTo: process.env.BUSINESS_EMAIL
    });

    console.log('✅ TEST EMAIL SENT SUCCESSFULLY!\n');
    console.log('To: maikelmarshall07@gmail.com');
    console.log('Subject: Fotos que hagan crecer tu restaurante — Propuesta\n');
    console.log('Changes in this version:');
    console.log('  ✅ NO portfolio photos (clean, focused)');
    console.log('  ✅ NO prices (conversion focused)');
    console.log('  ✅ Services only (what we do)');
    console.log('  ✅ Simple hero + strong copy');
    console.log('  ✅ Single image, maximum impact');
    console.log('  ✅ Benefit-focused messaging\n');
    console.log('This format CONVERTS better because:');
    console.log('  1. No visual clutter');
    console.log('  2. No scary prices to reject offer');
    console.log('  3. Focus on benefits, not features');
    console.log('  4. Clear CTA (WhatsApp conversation)\n');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

sendTestEmail();
