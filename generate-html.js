import fs from 'fs';
import path from 'path';

const assetsDir = 'public/assets';
const dirs = {
  icons: path.join(assetsDir, 'icons'),
  videos: path.join(assetsDir, 'videos'),
  portfolio: path.join(assetsDir, 'portfolio'),
  overlays: path.join(assetsDir, 'overlays'),
  backgrounds: path.join(assetsDir, 'backgrounds'),
  textures: path.join(assetsDir, 'textures')
};

const files = {};
Object.entries(dirs).forEach(([name, dir]) => {
  if (fs.existsSync(dir)) {
    files[name] = fs.readdirSync(dir).sort();
  }
});

// Encontrar archivos específicos
const heroLogo = files.icons?.find(f => f.includes('01_logo_mk_blanco') && f.endsWith('.svg'));
const footerLogo = files.icons?.find(f => f.includes('02_logo_horizontal') && f.endsWith('.svg'));
const whatsappIcon = files.icons?.find(f => f.includes('18_icono_whatsapp'));
const mailIcon = files.icons?.find(f => f.includes('17_icono_mail'));
const igIcon = files.icons?.find(f => f.includes('19_icono_instagram'));
const heroVideo = files.videos?.find(f => f.includes('40_hero_camara'));
const particlesVideo = files.videos?.find(f => f.includes('41_hero_loop'));
const scrollVideo = files.videos?.find(f => f.includes('44_scroll_video'));
const heroBackground = files.backgrounds?.find(f => f.includes('31_fondo_ia1'));
const aboutBackground = files.backgrounds?.find(f => f.includes('34_fondo_about'));
const miamiBackground = files.backgrounds?.find(f => f.includes('38_miami'));
const lightLeakOverlay = files.overlays?.find(f => f.includes('24_overlay_ligth'));
const watermark = files.overlays?.find(f => f.includes('29_watermark'));
const firma = files.overlays?.find(f => f.includes('28_firma'));
const grainTexture = files.textures?.find(f => f.includes('22_grain'));
const portfolioPhotos = files.portfolio?.filter(f => f.includes('39_portafolio'));

console.log('📄 Archivos encontrados:');
console.log('  Logo hero:', heroLogo);
console.log('  Video hero:', heroVideo);
console.log('  Video particles:', particlesVideo);
console.log('  Video scroll:', scrollVideo);
console.log('  Fondo hero:', heroBackground);
console.log('  Fotos portfolio:', portfolioPhotos?.length);
console.log('  Light leak:', lightLeakOverlay);
console.log('  Grain texture:', grainTexture);

// Leer SVG inline
function readSVG(filename) {
  if (!filename) return `<span>LOGO</span>`;
  const path_to_file = path.join(dirs.icons, filename);
  if (!fs.existsSync(path_to_file)) return `<span>${filename}</span>`;
  return fs.readFileSync(path_to_file, 'utf8');
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maikel Marshall — Photographer · Miami</title>
  <meta name="description" content="Miami-based cinematic photographer. Portrait, editorial, fashion and lifestyle.">
  <meta property="og:title" content="Maikel Marshall — Photographer · Miami">
  <meta property="og:description" content="Cinematic portrait & editorial photographer. Miami, FL.">
  <meta property="og:url" content="https://www.maikphotographer.com">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/css/design-system.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/animations.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js" defer></script>
  <script src="https://unpkg.com/split-type@0.3.4/umd/index.min.js" defer></script>
</head>

<body>

<!-- NAV -->
<nav class="site-header">
  <div class="logo">
    ${readSVG(heroLogo)}
  </div>
  <div class="header-nav">
    <a href="#about">About</a>
    <a href="#portfolio">Portfolio</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-video-bg" aria-hidden="true">
    <video autoplay muted loop playsinline preload="none">
      <source src="/public/assets/videos/${heroVideo}" type="video/mp4">
    </video>
  </div>

  <div class="hero-particles" aria-hidden="true">
    <video autoplay muted loop playsinline preload="none">
      <source src="/public/assets/videos/${particlesVideo}" type="video/mp4">
    </video>
  </div>

  <div class="hero-light-leak" style="background-image:url('/public/assets/overlays/${lightLeakOverlay}');" aria-hidden="true"></div>

  <div class="hero-content">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      <span>AVAILABLE IN MIAMI</span>
    </div>
    <h1 class="hero-title">Shoot <em>real.</em><br>Feel it.</h1>
    <p class="hero-sub">Cinematic portraits and editorial photography for models, creators and brands. Based in Miami. Available worldwide.</p>
    <div class="hero-ctas">
      <a href="#contact" class="btn btn-primary">Book a Session</a>
      <a href="#portfolio" class="btn btn-ghost">View Portfolio</a>
    </div>
  </div>
</section>

<!-- SCROLL VIDEO -->
<section class="scroll-video-section">
  <div class="scroll-video-sticky">
    <video id="scroll-video-camara" muted playsinline preload="auto">
      <source src="/public/assets/videos/${scrollVideo}" type="video/mp4">
    </video>
    <p class="scroll-label">[ EVERY FRAME TELLS A STORY ]</p>
  </div>
</section>

<!-- ABOUT -->
<section id="about" class="about">
  <h2>I don't just <em>take photos.</em> I direct.</h2>
  <p>Cuban-born cinematic photographer, creative director & brand strategist based in Miami, FL. Founder of the303 Creative. 5+ years blending visual storytelling with strategic marketing—specialized in portrait, editorial, lifestyle and real estate with a distinctive filmic aesthetic.</p>
  <div class="about-firma">
    <img src="/public/assets/overlays/${firma}" alt="Signature" loading="lazy">
  </div>
  <div class="about-stats">
    <div><div class="astat-val">200+</div><div class="astat-lbl">Sessions delivered</div></div>
    <div><div class="astat-val">3</div><div class="astat-lbl">Countries worked</div></div>
    <div><div class="astat-val">48h</div><div class="astat-lbl">Delivery time</div></div>
  </div>
</section>

<!-- PORTFOLIO -->
<section id="portfolio" class="portfolio">
  <h2>Portfolio</h2>
  <div class="portfolio-grid">
${portfolioPhotos?.map((photo, i) => `    <div class="port-item fade-in" data-category="editorial">
      <img src="/public/assets/portfolio/${photo}" alt="Portfolio" loading="lazy">
      <img class="port-watermark" src="/public/assets/overlays/${watermark}" alt="" loading="lazy">
      <div class="port-caption"><span>Editorial</span><span>Moment ${i + 1}</span></div>
    </div>`).join('\n')}
  </div>
</section>

<!-- SERVICES -->
<section id="services" class="services">
  <h2>Sessions & Services</h2>
  <div class="services-grid">
    <div class="svc-card">
      <h3>Portrait Session</h3>
      <p>Individual or couples portrait session. 1–2 hours, one or two Miami locations. Edited gallery delivered in 48 hours.</p>
      <div class="svc-price">$150 <small>/ from</small></div>
    </div>
    <div class="svc-card">
      <h3>Editorial / Fashion</h3>
      <p>Full editorial production for models, creators and brands. Concept, art direction, location scouting, full team.</p>
      <div class="svc-price">$350 <small>/ from</small></div>
    </div>
    <div class="svc-card">
      <h3>Brand Content</h3>
      <p>Monthly content package for brands. Social media visuals, product photography, lifestyle content.</p>
      <div class="svc-price">$500 <small>/ month</small></div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="contact">
  <h2>Let's create <em>something.</em></h2>
  <div class="contact-ways">
    <a href="https://wa.me/17863329815" class="contact-icon">
      ${readSVG(whatsappIcon)}
      <span>WhatsApp</span>
    </a>
    <a href="mailto:maikelmarshall07@gmail.com" class="contact-icon">
      ${readSVG(mailIcon)}
      <span>Email</span>
    </a>
    <a href="https://www.instagram.com/maik_photographer/" class="contact-icon">
      ${readSVG(igIcon)}
      <span>Instagram</span>
    </a>
  </div>
  <form onsubmit="return false;">
    <input type="text" placeholder="Your name" required>
    <input type="email" placeholder="Your email" required>
    <textarea placeholder="Tell me about your project"></textarea>
    <button type="submit" class="btn btn-primary">Book a Session</button>
  </form>
  <div id="cal-embed"></div>
</section>

<!-- FOOTER -->
<footer class="site-footer">
  <div class="footer-logo">
    ${readSVG(footerLogo)}
  </div>
  <nav class="footer-links">
    <a href="#about">About</a>
    <a href="#portfolio">Portfolio</a>
    <a href="#services">Services</a>
    <a href="https://www.instagram.com/maik_photographer/">Instagram</a>
  </nav>
  <p>© 2026 Maikel Marshall · Miami, FL</p>
</footer>

<!-- CAL.COM -->
<script>
(function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement('script')).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==='string'){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,['initNamespace',namespace])}else p(cal,ar);return}p(cal,ar)}})(window,'https://app.cal.com/embed/embed.js','init');
Cal('init',{origin:'https://cal.com'});
Cal('inline',{elementOrSelector:'#cal-embed',calLink:'the303-marketing-kmfxzs/30min',layout:'month_view'});
</script>

<script src="/js/animations.js" defer></script>
</body>
</html>`;

fs.writeFileSync('public/index.html', htmlContent);
console.log('\n✅ index.html generado con todos los assets reales!');
