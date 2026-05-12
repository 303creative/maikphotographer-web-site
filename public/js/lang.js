// ═══════════════════════════════════════════════════════
//  lang.js — EN/ES Translation System · 303 Creative Studio®
//  Usage: add data-i18n="key" to any element.
//         add data-i18n-ph="key" for placeholder attributes.
//         Call toggleLang() from a button click.
// ═══════════════════════════════════════════════════════

const T = {

  es: {
    // ── NAV ──────────────────────────────────────────────
    'nav.nosotros':  'Nosotros',
    'nav.paquetes':  'Paquetes',
    'nav.auditoria': 'Auditoría',
    'nav.cta':       'Solicitar Diagnóstico',

    // ── HERO ─────────────────────────────────────────────
    'hero.tag':   'Real Estate Marketing · Miami',
    'hero.line1': 'TU MARCA',
    'hero.line2': '<em class="gold-italic">MERECE</em>',
    'hero.line3': 'BRILLAR.',
    'hero.sub':   'Branding, social media y marketing digital de alto nivel para agentes inmobiliarios y negocios premium en Miami.',
    'hero.btn1':  'Ver Paquetes',
    'hero.btn2':  'Diagnóstico Sin Costo',
    'hero.stat1': 'Marcas transformadas',
    'hero.stat2': 'Desde / mes',
    'hero.stat3': 'Respuesta garantizada',

    // ── ABOUT ────────────────────────────────────────────
    'about.tag':    'Nosotros',
    'about.h2':     'No somos<br>otra agencia.<br><em>Somos una firma.</em>',
    'about.lead':   '303 Creative Studio® transforma negocios invisibles en marcas con presencia profesional. Combinamos diseño estratégico, análisis de datos y automatización para generar resultados reales en el mercado premium de Miami.',
    'about.v1.h4':  'Data-driven',
    'about.v1.p':   'Decisiones basadas en datos, no intuición.',
    'about.v2.h4':  'Automatización',
    'about.v2.p':   'Si se puede automatizar, lo automatizamos.',
    'about.v3.h4':  'Calidad &gt; Cantidad',
    'about.v3.p':   '5 proyectos impecables &gt; 20 mediocres.',
    'about.v4.h4':  'Speed to Value',
    'about.v4.p':   'Propuesta en 48h. Resultados en 30 días.',
    'about.stat1':  'Propuesta',
    'about.stat2':  'Scoring',
    'about.stat3':  'Desde',

    // ── PROBLEM ──────────────────────────────────────────
    'prob.tag':     'El problema',
    'prob.h2':      'Tu negocio funciona.<br>Pero no se siente<br><em>como una marca.</em>',
    'prob.01.h3':   'Publicas, pero no generas deseo',
    'prob.01.p':    'Tu audiencia no conecta ni confía lo suficiente para comprar. El contenido sin estrategia es ruido.',
    'prob.02.h3':   'Tu imagen no refleja tu valor',
    'prob.02.p':    'Tu identidad visual no comunica lo que realmente vales. Los clientes te subestiman antes de conocerte.',
    'prob.03.h3':   'Sin dirección estratégica',
    'prob.03.p':    'Inviertes tiempo y dinero sin retorno medible. Sin datos, sin sistema, sin dirección clara.',
    'prob.04.h3':   'Te ves como todos los demás',
    'prob.04.p':    'Tu competencia se ve mejor aunque su servicio sea inferior. La percepción lo es todo.',

    // ── VELORA ───────────────────────────────────────────
    'velora.tag':    '✦ Lo que es posible',
    'velora.sub':    'Real Estate de Lujo · Desarrollo Residencial',
    'velora.lead':   'Así luce una marca de lujo construida desde cero. Sistema de identidad completo, campañas de contenido y materiales de inversión para un desarrollo residencial premium — esto es lo que podríamos crear juntos.',
    'velora.quote':  '"De cero a sold out. La identidad de Velora convirtió leads fríos en compradores calificados en menos de 90 días."',
    'velora.m1':     'Leads generados',
    'velora.m2':     'Engagement rate',
    'velora.m3':     'ROI en 90 días',
    'velora.m4':     'Unidades pre-vendidas',
    'velora.btn':    'Ver proyecto completo',

    // ── ALPHAVILLE ───────────────────────────────────────
    'alpha.tag':  'Branding Editorial',
    'alpha.lead': 'Identidad completa para desarrollo residencial de alto nivel. Fotografía interiorista, sistema editorial y materiales de marketing de lujo que comunican exclusividad desde el primer impacto.',

    // ── SERVICES ─────────────────────────────────────────
    'serv.tag':  'Lo que hacemos',
    'serv.h2':   'Servicios que<br>transforman negocios<br><em>en marcas.</em>',
    'serv1.tag': 'Identidad', 'serv1.h3': 'Branding Completo',
    'serv1.p':   'Logo, paleta, tipografía, guidelines y sistema visual completo desde cero para tu mercado objetivo.',
    'serv1.lnk': 'Ver casos →',
    'serv2.tag': 'Digital',   'serv2.h3': 'Diseño Web Premium',
    'serv2.p':   'Webs de alto impacto que convierten visitantes en clientes calificados. Performance + conversión.',
    'serv2.lnk': 'Ver casos →',
    'serv3.tag': 'Contenido', 'serv3.h3': 'Social Media &amp; Content',
    'serv3.p':   'Estrategia, dirección creativa y gestión integral de redes sociales. Resultados medibles.',
    'serv3.lnk': 'Ver casos →',
    'serv4.tag': 'Crecimiento','serv4.h3': 'Marketing &amp; Automatización',
    'serv4.p':   'Campañas, email, CRM y automatización para escalar sin depender de ti mismo.',
    'serv4.lnk': 'Ver casos →',

    // ── PRICING ──────────────────────────────────────────
    'price.tag':    'Paquetes mensuales',
    'price.h2':     'Elige el nivel que<br><em>tu marca necesita.</em>',
    'price.sub':    'Sin contratos eternos. Cada dólar trabaja. Mes a mes, con resultados que hablan.',
    'price.period': '/mes · sin contrato',
    'price.badge':  'Más popular',
    'price.btn':    'Comenzar',
    'starter.tier': 'Esencial',
    'starter.f1': 'Auditoría + Scoring 0-100',  'starter.f2': 'Logo + Kit de identidad',
    'starter.f3': 'Setup de redes sociales',     'starter.f4': '12 posts/mes con diseño',
    'starter.f5': '1 sesión estratégica/mes',    'starter.f6': 'Reporte mensual',
    'growth.tier':  'Crecimiento',
    'growth.f1':  'Todo de Starter +',           'growth.f2':  'Website profesional completo',
    'growth.f3':  '20 posts/mes + stories',      'growth.f4':  'Email marketing + sequences',
    'growth.f5':  'SEO on-page',                 'growth.f6':  '2 sesiones estratégicas/mes',
    'premium.tier': 'Escala',
    'premium.f1': 'Todo de Growth +',            'premium.f2': '4 reels + 1 video largo/mes',
    'premium.f3': 'Paid Ads (Meta + Google)',     'premium.f4': 'Automatización + CRM',
    'premium.f5': 'Reportes semanales',          'premium.f6': '2 sesiones estratégicas/mes',
    'trans.tier':   'Dominio total',
    'trans.desc':   'Para empresas listas para dominar su nicho. Todo de Premium, rebranding completo, video premium, funnel, chatbot, SMS y sesiones semanales 1-on-1.',
    'trans.f1': '8 reels + 2 videos largos', 'trans.f2': 'Funnel completo',
    'trans.f3': 'Chatbot + SMS',             'trans.f4': 'Sesiones semanales 1-on-1',
    'trans.f5': 'Rebranding completo',       'trans.f6': 'Priority support',
    'trans.btn':  'Dominar mi nicho',
    'price.note': '¿No estás seguro? <a href="#auditoria" style="color:var(--gold);text-decoration:underline">Solicita tu diagnóstico sin costo →</a>',

    // ── AUDIT FORM ───────────────────────────────────────
    'audit.tag':    'Empieza aquí',
    'audit.h2':     'Descubre qué frena<br>el crecimiento<br><em>de tu marca.</em>',
    'audit.lead':   'Scoring profesional 0-100 con recomendaciones accionables. Resultados en 48-72h. Sin costo.',
    'audit.f1': 'Identidad visual',   'audit.f2': 'Presencia digital',
    'audit.f3': 'Posicionamiento',    'audit.f4': 'Consistencia de marca',
    'audit.f5': 'Top 5 quick wins',   'audit.f6': 'Plan de mejora',
    'audit.ph.nombre':   'Tu nombre',
    'audit.ph.negocio':  'Nombre del negocio',
    'audit.ph.email':    'Email',
    'audit.ph.instagram':'Instagram o web',
    'audit.submit': 'Solicitar Diagnóstico Sin Costo',
    'audit.note':   'Sin compromiso. Resultados en 48-72h.',

    // ── FINAL CTA ────────────────────────────────────────
    'cta.tag':  'La decisión',
    'cta.h2':   'Tu negocio no necesita<br>más publicaciones.<br>Necesita <em>dirección.</em>',
    'cta.p':    'Deja de improvisar. Construye una marca que comunique, posicione y venda con intención.',
    'cta.btn1': 'Comenzar Ahora',
    'cta.btn2': 'Ver Paquetes',

    // ── FOOTER ───────────────────────────────────────────
    'ft.tagline':  'Branding y marketing estratégico para negocios premium en Miami.',
    'ft.pricing':  'Paquetes desde $897 — $3,897/mes',
    'ft.nav':      'Navegar',
    'ft.inicio':   'Inicio',
    'ft.nosotros': 'Nosotros',
    'ft.packages': 'Paquetes',
    'ft.diag':     'Solicitar Diagnóstico',
    'ft.contact':  'Contacto',
    'ft.schedule': 'Agendar Auditoría',
    'ft.copy':     '© 2026 303 Creative Studio® LLC. Todos los derechos reservados.',
  },

  en: {
    // ── NAV ──────────────────────────────────────────────
    'nav.nosotros':  'About',
    'nav.paquetes':  'Packages',
    'nav.auditoria': 'Audit',
    'nav.cta':       'Request Diagnosis',

    // ── HERO ─────────────────────────────────────────────
    'hero.tag':   'Real Estate Marketing · Miami',
    'hero.line1': 'YOUR BRAND',
    'hero.line2': '<em class="gold-italic">DESERVES</em>',
    'hero.line3': 'TO SHINE.',
    'hero.sub':   'Premium branding, social media and digital marketing for real estate agents and luxury businesses in Miami.',
    'hero.btn1':  'See Packages',
    'hero.btn2':  'Free Diagnosis',
    'hero.stat1': 'Brands transformed',
    'hero.stat2': 'Starting / month',
    'hero.stat3': 'Guaranteed response',

    // ── ABOUT ────────────────────────────────────────────
    'about.tag':    'About',
    'about.h2':     'We\'re not<br>just an agency.<br><em>We\'re a firm.</em>',
    'about.lead':   '303 Creative Studio® transforms invisible businesses into professionally positioned brands. We combine strategic design, data analytics and automation to drive real results in Miami\'s premium market.',
    'about.v1.h4':  'Data-driven',
    'about.v1.p':   'Every decision backed by data, not guesswork.',
    'about.v2.h4':  'Automation',
    'about.v2.p':   'If it can be automated, we automate it.',
    'about.v3.h4':  'Quality &gt; Quantity',
    'about.v3.p':   '5 flawless projects &gt; 20 mediocre ones.',
    'about.v4.h4':  'Speed to Value',
    'about.v4.p':   'Proposal in 48h. Results in 30 days.',
    'about.stat1':  'Proposal',
    'about.stat2':  'Scoring',
    'about.stat3':  'Starting',

    // ── PROBLEM ──────────────────────────────────────────
    'prob.tag':     'The Problem',
    'prob.h2':      'Your business works.<br>But it doesn\'t feel<br><em>like a brand.</em>',
    'prob.01.h3':   'You post, but don\'t create desire',
    'prob.01.p':    'Your audience doesn\'t connect or trust enough to buy. Content without strategy is noise.',
    'prob.02.h3':   'Your image doesn\'t reflect your value',
    'prob.02.p':    'Your visual identity doesn\'t communicate your true worth. Clients underestimate you before they meet you.',
    'prob.03.h3':   'No strategic direction',
    'prob.03.p':    'You invest time and money without measurable return. No data, no system, no clear direction.',
    'prob.04.h3':   'You look like everyone else',
    'prob.04.p':    'Your competition looks better even when their service is inferior. Perception is everything.',

    // ── VELORA ───────────────────────────────────────────
    'velora.tag':    '✦ What\'s Possible',
    'velora.sub':    'Luxury Real Estate · Residential Development',
    'velora.lead':   'This is what a luxury brand built from scratch looks like. Complete identity system, content campaigns and investment materials for a premium residential development — this is what we could build together.',
    'velora.quote':  '"From zero to sold out. Velora\'s identity converted cold leads into qualified buyers in under 90 days."',
    'velora.m1':     'Leads generated',
    'velora.m2':     'Engagement rate',
    'velora.m3':     'ROI in 90 days',
    'velora.m4':     'Pre-sold units',
    'velora.btn':    'See full project',

    // ── ALPHAVILLE ───────────────────────────────────────
    'alpha.tag':  'Editorial Branding',
    'alpha.lead': 'Complete identity for a high-end residential development. Interior photography, editorial system and luxury marketing materials that communicate exclusivity from the very first impression.',

    // ── SERVICES ─────────────────────────────────────────
    'serv.tag':  'What We Do',
    'serv.h2':   'Services that<br>transform businesses<br><em>into brands.</em>',
    'serv1.tag': 'Identity',  'serv1.h3': 'Full Branding',
    'serv1.p':   'Logo, palette, typography, guidelines and complete visual system built from scratch for your target market.',
    'serv1.lnk': 'See cases →',
    'serv2.tag': 'Digital',   'serv2.h3': 'Premium Web Design',
    'serv2.p':   'High-impact websites that convert visitors into qualified clients. Performance + conversion focused.',
    'serv2.lnk': 'See cases →',
    'serv3.tag': 'Content',   'serv3.h3': 'Social Media &amp; Content',
    'serv3.p':   'Strategy, creative direction and full social media management. Measurable results.',
    'serv3.lnk': 'See cases →',
    'serv4.tag': 'Growth',    'serv4.h3': 'Marketing &amp; Automation',
    'serv4.p':   'Campaigns, email, CRM and automation to scale without depending on yourself.',
    'serv4.lnk': 'See cases →',

    // ── PRICING ──────────────────────────────────────────
    'price.tag':    'Monthly Packages',
    'price.h2':     'Choose the level your<br><em>brand needs.</em>',
    'price.sub':    'No long-term contracts. Every dollar works. Month to month, with results that speak.',
    'price.period': '/mo · no contract',
    'price.badge':  'Most popular',
    'price.btn':    'Get Started',
    'starter.tier': 'Essential',
    'starter.f1': 'Audit + Scoring 0-100',     'starter.f2': 'Logo + Identity Kit',
    'starter.f3': 'Social media setup',         'starter.f4': '12 posts/month with design',
    'starter.f5': '1 strategy session/month',   'starter.f6': 'Monthly report',
    'growth.tier':  'Growth',
    'growth.f1':  'Everything in Starter +',    'growth.f2':  'Complete professional website',
    'growth.f3':  '20 posts/month + stories',   'growth.f4':  'Email marketing + sequences',
    'growth.f5':  'On-page SEO',                'growth.f6':  '2 strategy sessions/month',
    'premium.tier': 'Scale',
    'premium.f1': 'Everything in Growth +',     'premium.f2': '4 reels + 1 long video/month',
    'premium.f3': 'Paid Ads (Meta + Google)',    'premium.f4': 'Automation + CRM',
    'premium.f5': 'Weekly reports',             'premium.f6': '2 strategy sessions/month',
    'trans.tier':   'Total Dominance',
    'trans.desc':   'For companies ready to dominate their niche. Everything in Premium plus full rebranding, premium video, funnel, chatbot, SMS and weekly 1-on-1 sessions.',
    'trans.f1': '8 reels + 2 long videos',  'trans.f2': 'Complete funnel',
    'trans.f3': 'Chatbot + SMS',            'trans.f4': 'Weekly 1-on-1 sessions',
    'trans.f5': 'Full rebranding',          'trans.f6': 'Priority support',
    'trans.btn':  'Dominate My Niche',
    'price.note': 'Not sure? <a href="#auditoria" style="color:var(--gold);text-decoration:underline">Request your free diagnosis →</a>',

    // ── AUDIT FORM ───────────────────────────────────────
    'audit.tag':    'Start Here',
    'audit.h2':     'Discover what\'s holding<br>back your brand\'s<br><em>growth.</em>',
    'audit.lead':   'Professional 0-100 scoring with actionable recommendations. Results in 48-72h. No cost.',
    'audit.f1': 'Visual identity',   'audit.f2': 'Digital presence',
    'audit.f3': 'Positioning',       'audit.f4': 'Brand consistency',
    'audit.f5': 'Top 5 quick wins',  'audit.f6': 'Improvement plan',
    'audit.ph.nombre':    'Your name',
    'audit.ph.negocio':   'Business name',
    'audit.ph.email':     'Email',
    'audit.ph.instagram': 'Instagram or website',
    'audit.submit': 'Request Free Diagnosis',
    'audit.note':   'No commitment. Results in 48-72h.',

    // ── FINAL CTA ────────────────────────────────────────
    'cta.tag':  'The Decision',
    'cta.h2':   'Your business doesn\'t need<br>more posts.<br>It needs <em>direction.</em>',
    'cta.p':    'Stop improvising. Build a brand that communicates, positions and sells with intention.',
    'cta.btn1': 'Start Now',
    'cta.btn2': 'See Packages',

    // ── FOOTER ───────────────────────────────────────────
    'ft.tagline':  'Strategic branding and marketing for premium businesses in Miami.',
    'ft.pricing':  'Packages from $897 — $3,897/mo',
    'ft.nav':      'Navigate',
    'ft.inicio':   'Home',
    'ft.nosotros': 'About',
    'ft.packages': 'Packages',
    'ft.diag':     'Request Diagnosis',
    'ft.contact':  'Contact',
    'ft.schedule': 'Schedule Audit',
    'ft.copy':     '© 2026 303 Creative Studio® LLC. All rights reserved.',
  }
};

// ── Core functions ────────────────────────────────────────────────────────

function applyLang(lang) {
  if (!T[lang]) return;
  document.documentElement.lang = lang;

  // innerHTML replacements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = T[lang][el.dataset.i18n];
    if (val !== undefined) el.innerHTML = val;
  });

  // placeholder replacements
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = T[lang][el.dataset.i18nPh];
    if (val !== undefined) el.placeholder = val;
  });

  // Update toggle button label
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';

  localStorage.setItem('lang303', lang);
}

function toggleLang() {
  const current = localStorage.getItem('lang303') || 'es';
  applyLang(current === 'es' ? 'en' : 'es');
}

// Auto-apply saved preference on load
(function () {
  const saved = localStorage.getItem('lang303') || 'es';
  const run = () => applyLang(saved);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
