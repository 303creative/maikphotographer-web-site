#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { createTransport } from 'nodemailer';

const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('🔍 TEST EXHAUSTIVO — SISTEMA DE EMAIL MARKETING');
console.log('═══════════════════════════════════════════════════════════════════\n');

// PASO 1: Verificar variables de entorno
console.log('📋 PASO 1: VERIFICAR CONFIGURACIÓN');
console.log('───────────────────────────────────────────────────────────────────');
console.log(`✓ Google Maps API Key: ${googleMapsKey ? '✅ Configurado' : '❌ FALTA'}`);
console.log(`✓ Business Email: ${BUSINESS_EMAIL ? '✅ ' + BUSINESS_EMAIL : '❌ FALTA'}`);
console.log(`✓ Gmail App Password: ${GMAIL_APP_PASSWORD ? '✅ Configurado' : '❌ FALTA'}\n`);

// PASO 2: Test Google Maps API
console.log('📋 PASO 2: TEST GOOGLE MAPS API');
console.log('───────────────────────────────────────────────────────────────────');

async function testGoogleMapsAPI() {
  try {
    const query = 'restaurants in Miami';
    console.log(`\n🔍 Buscando: "${query}"\n`);

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: query,
        key: googleMapsKey,
        region: 'us'
      }
    });

    console.log(`✅ Google Maps API respondió\n`);
    console.log(`📊 Resultados encontrados: ${response.data.results.length}\n`);

    // Analizar el primer resultado
    if (response.data.results.length > 0) {
      const place = response.data.results[0];
      console.log(`\n🏢 PRIMER RESULTADO (búsqueda basic):`);
      console.log(`   • Nombre: ${place.name}`);
      console.log(`   • Dirección: ${place.formatted_address}`);
      console.log(`   • Place ID: ${place.place_id}`);
      console.log(`   • Campos disponibles: ${Object.keys(place).join(', ')}\n`);

      // Ahora obtener detalles
      console.log(`\n📍 Obteniendo detalles del lugar...\n`);
      const detailsResponse = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: place.place_id,
          fields: 'name,formatted_phone_number,website,formatted_address,url,business_status,email,international_phone_number',
          key: googleMapsKey
        }
      });

      const details = detailsResponse.data.result;
      console.log(`🏢 DETALLES DEL LUGAR:`);
      console.log(`   • Nombre: ${details.name || 'N/A'}`);
      console.log(`   • Teléfono: ${details.formatted_phone_number || 'N/A'}`);
      console.log(`   • Teléfono Int'l: ${details.international_phone_number || 'N/A'}`);
      console.log(`   • Sitio Web: ${details.website || 'N/A'}`);
      console.log(`   • Email (si está disponible): ${details.email || '❌ NO DISPONIBLE'}`);
      console.log(`   • URL Maps: ${details.url || 'N/A'}`);
      console.log(`   • Estado: ${details.business_status || 'N/A'}`);
      console.log(`   • Todos los campos del API: ${Object.keys(details).join(', ')}\n`);

      // ANÁLISIS CRÍTICO
      console.log(`\n⚠️  ANÁLISIS — Por qué NO hay emails en Google Maps API:`);
      console.log(`   1. Google Places API NO incluye emails públicamente`);
      console.log(`   2. Aunque pasemos 'email' en fields, Google no lo devuelve`);
      console.log(`   3. El email es datos privados del negocio, no accesible via API`);
      console.log(`   4. Soluciones alternativas:`);
      console.log(`      • Extraer email del sitio web (web scraping)`);
      console.log(`      • Usar servicios como Hunter.io, RocketReach`);
      console.log(`      • Buscar en LinkedIn, Facebook`);
      console.log(`      • Contacto directo por teléfono\n`);
    }

    return true;
  } catch (error) {
    console.log(`❌ ERROR Google Maps API: ${error.message}\n`);
    return false;
  }
}

// PASO 3: Test Nodemailer
console.log('\n📋 PASO 3: TEST NODEMAILER (CONEXIÓN SMTP)');
console.log('───────────────────────────────────────────────────────────────────');

async function testNodemailer() {
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: BUSINESS_EMAIL,
        pass: GMAIL_APP_PASSWORD
      }
    });

    console.log(`\n🔐 Verificando conexión SMTP...\n`);
    await transporter.verify();
    console.log(`✅ Conexión SMTP exitosa\n`);

    // Test: Intentar enviar email de prueba
    console.log(`📧 Enviando email de prueba a: ${BUSINESS_EMAIL}\n`);

    const testResult = await transporter.sendMail({
      from: BUSINESS_EMAIL,
      to: BUSINESS_EMAIL,
      subject: '🧪 TEST — Sistema de Email Marketing',
      html: `
        <h2>Email de Prueba</h2>
        <p>Este email fue generado por el test del sistema de marketing.</p>
        <p><strong>Si recibes esto, Nodemailer funciona correctamente.</strong></p>
        <p style="color: #999; font-size: 12px;">Enviado: ${new Date().toLocaleString()}</p>
      `
    });

    console.log(`✅ Email enviado exitosamente`);
    console.log(`   • Response ID: ${testResult.response}`);
    console.log(`   • MessageId: ${testResult.messageId}\n`);

    return true;
  } catch (error) {
    console.log(`❌ ERROR Nodemailer: ${error.message}\n`);
    if (error.message.includes('Invalid login')) {
      console.log(`\n⚠️  PROBLEMA DETECTADO:`);
      console.log(`   El error "Invalid login" indica que:`);
      console.log(`   1. Email y/o contraseña incorrectos`);
      console.log(`   2. Gmail App Password no está generado`);
      console.log(`   3. 2FA no está habilitado`);
      console.log(`   4. La cuenta fue bloqueada por Google\n`);
    }
    return false;
  }
}

// PASO 4: Análisis del flujo actual
console.log('\n📋 PASO 4: ANÁLISIS DEL FLUJO ACTUAL');
console.log('───────────────────────────────────────────────────────────────────\n');

function analyzeWorkflow() {
  console.log('📊 FLUJO ACTUAL:\n');
  console.log('1️⃣  search-leads-businesses.js');
  console.log('   ├─ Busca en Instagram hashtags → Obtiene username, bio, followers');
  console.log('   ├─ Busca en Google Maps → Obtiene nombre, teléfono, website, dirección');
  console.log('   ├─ Guarda en business-leads-today.json');
  console.log('   ├─ Guarda en Notion');
  console.log('   └─ ENVÍA EMAIL INTERNO (resumen de leads encontrados)\n');

  console.log('2️⃣  master-campaign-system.js');
  console.log('   ├─ Lee business-leads-today.json');
  console.log('   ├─ Intenta enviar WhatsApp (requiere números de teléfono)');
  console.log('   ├─ Si no hay teléfono → FALLA');
  console.log('   └─ PROBLEMA: No genera emails a los leads\n');

  console.log('3️⃣  Lo que FALTA:\n');
  console.log('   ❌ NO hay extracción de emails desde Google Maps');
  console.log('   ❌ NO hay web scraping para obtener emails desde websites');
  console.log('   ❌ NO hay integración con APIs de email intelligence');
  console.log('   ❌ NO hay envío real de emails a los leads\n');
}

// PASO 5: Soluciones
console.log('\n📋 PASO 5: SOLUCIONES');
console.log('───────────────────────────────────────────────────────────────────\n');

function showSolutions() {
  console.log('🎯 OPCIONES PARA OBTENER EMAILS:\n');

  console.log('OPCIÓN 1: Web Scraping (Sitios web)\n');
  console.log('   • Extraer email desde la página "Contact" de cada website');
  console.log('   • Herramientas: Cheerio, Puppeteer');
  console.log('   • Costo: 0 (gratis)');
  console.log('   • Precisión: 60-70%');
  console.log('   • Tiempo: ⏱️  Lento (necesita procesar cada sitio)\n');

  console.log('OPCIÓN 2: APIs de Email Intelligence\n');
  console.log('   • Hunter.io: $99+/mes (permite extraer emails por dominio)');
  console.log('   • RocketReach: $149+/mes');
  console.log('   • Clearbit: $99+/mes');
  console.log('   • Dropcontact: €49+/mes');
  console.log('   • Precisión: 85-95%');
  console.log('   • Tiempo: ⏱️  Rápido (API call)\n');

  console.log('OPCIÓN 3: Búsqueda manual + LinkedIn Sales Navigator\n');
  console.log('   • Buscar contactos ejecutivos en LinkedIn');
  console.log('   • Ver emails públicos en perfiles');
  console.log('   • Costo: $99/mes LinkedIn Navigator');
  console.log('   • Precisión: 90%');
  console.log('   • Tiempo: ⏱️  Manual\n');

  console.log('OPCIÓN 4: RECOMENDADA — Hunter.io + Web Scraping\n');
  console.log('   • Paso 1: Google Maps da websites');
  console.log('   • Paso 2: Hunter.io busca emails del dominio');
  console.log('   • Paso 3: Si no encuentra, web scraping de "Contact" page');
  console.log('   • Paso 4: Envía emails masivos con Nodemailer');
  console.log('   • Precisión: 90%+');
  console.log('   • Costo: ~$20-30 por 100 leads\n');
}

// RUN ALL TESTS
async function runAllTests() {
  const mapsOk = await testGoogleMapsAPI();
  const mailerOk = await testNodemailer();

  analyzeWorkflow();
  showSolutions();

  // RESUMEN FINAL
  console.log('\n═══════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN FINAL');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  console.log('✅ FUNCIONANDO:');
  console.log(`   ${mapsOk ? '✓' : '✗'} Google Maps API`);
  console.log(`   ${mailerOk ? '✓' : '✗'} Nodemailer/Gmail\n`);

  console.log('❌ PROBLEMAS:');
  if (!mapsOk) console.log('   ✗ Google Maps API no funciona');
  if (!mailerOk) console.log('   ✗ Gmail no responde (revisa credenciales)');
  console.log('   ✗ NO hay fuente de emails para los leads');
  console.log('   ✗ Sistema actual es solo para reporting, no para outreach\n');

  console.log('💡 PRÓXIMOS PASOS:');
  console.log('   1. Integrar Hunter.io o similar para obtener emails');
  console.log('   2. Crear función generateLeadEmailAddress() que:');
  console.log('      a) Toma el dominio del website');
  console.log('      b) Busca en Hunter.io');
  console.log('      c) Si no encuentra, intenta web scraping');
  console.log('   3. Modificar master-campaign-system.js para enviar emails');
  console.log('   4. Implementar reply tracking + follow-up automation\n');

  process.exit(mapsOk && mailerOk ? 0 : 1);
}

runAllTests();
