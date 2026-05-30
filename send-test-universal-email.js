#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import { getUniversalEmailTemplate } from './automation/email-templates/universal-template.js';

const emailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendTestEmail() {
  console.log('\n📧 SENDING TEST EMAIL WITH UNIVERSAL TEMPLATE\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    // Example: Restaurant client
    const htmlContent = getUniversalEmailTemplate({
      clientName: "La Dolce Vita Restaurant",
      businessType: "restaurant",
      headline: "Fotos que hagan crecer tu restaurante",
      subheadline: "Comida que se vea irresistible. Clientes que vuelvan.",
      stat1: "30%",
      stat1Label: "Más reservas con fotos profesionales",
      stat2: "+18%",
      stat2Label: "Incremento en ordenes online",
      stat3: "8.5k",
      stat3Label: "Restaurantes mejorados en Miami",
      benefit1: "Fotos de platos gourmet que abren apetito",
      benefit2: "Contenido listo para Instagram/Google Maps",
      benefit3: "Ambiente y detalles capturados profesionalmente",
      benefit4: "Reels y carrusel automático incluido",
      benefit5: "Sesión rápida, sin cierre de local",
      portfolioImage1: "https://images.unsplash.com/photo-1606787620884-c0dec3b808e9?w=400&q=80",
      portfolioLabel1: "Food styling",
      portfolioImage2: "https://images.unsplash.com/photo-1546039907-de94ddec1302?w=400&q=80",
      portfolioLabel2: "Ambiente premium",
      package1Name: "Sesión Express",
      package1Price: "$150",
      package1Desc: "2 horas, 50+ fotos editadas, listas para redes",
      package2Name: "Producción Premium",
      package2Price: "$350",
      package2Desc: "Sesión completa, 150+ fotos, reels, carruseles editados",
      package3Name: "Mensual Contenido",
      package3Price: "$500/mes",
      package3Desc: "Sesiones semanales, contenido constante, mantenimiento web",
      ctaText: "¿Listo para mejorar tu presencia online?",
      footerText: "Maikel Marshall | Fotógrafo & Director Creativo"
    });

    await emailTransporter.sendMail({
      from: `Maikel Marshall <${process.env.BUSINESS_EMAIL}>`,
      to: "maikelmarshall07@gmail.com",
      subject: "Prueba: Nuevo Template Universal HTML — The303 Marketing",
      html: htmlContent,
      replyTo: process.env.BUSINESS_EMAIL
    });

    console.log('✅ TEST EMAIL SENT SUCCESSFULLY!\n');
    console.log('To: maikelmarshall07@gmail.com');
    console.log('Subject: Prueba: Nuevo Template Universal HTML — The303 Marketing\n');
    console.log('What to expect:');
    console.log('  📧 Check your inbox in 30-60 seconds');
    console.log('  🎨 The email shows the NEW universal template');
    console.log('  📱 Open on mobile to see responsive design');
    console.log('  🔍 Notice: single HTML structure, dynamic content\n');
    console.log('This is exactly what goes to your restaurant leads,');
    console.log('but with their specific business data injected.\n');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

sendTestEmail();
