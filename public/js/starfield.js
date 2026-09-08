/* Starfield — vanilla port of the 21st.dev React component (canvas vortex).
   Silver/white, perf-aware: fewer stars on mobile, respects prefers-reduced-motion,
   pauses when the tab is hidden. */
(function () {
  var canvas = document.getElementById('hero-starfield');
  if (!canvas) return;
  var host = canvas.parentElement;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = window.innerWidth < 768;
  var cfg = {
    starCount: mobile ? 2600 : 7000,
    waveFrequency: 15,
    starEscapeWidth: 420,
    starColor: { r: 232, g: 232, b: 238 }, // silver/white
    maxOpacity: 185,
    rotationSpeed: 0.00018,
    waveSpeed: 0.005
  };
  var size = { x: 0, y: 0 }, imagedata, data, stars = [], startTime = Date.now(), currentTime = 0, raf = null;

  function setSize() {
    size.x = host.clientWidth; size.y = host.clientHeight;
    canvas.width = size.x; canvas.height = size.y;
    imagedata = ctx.createImageData(size.x, size.y);
    data = new Uint32Array(imagedata.data.buffer);
    stars = [];
  }
  function rotate(cx, cy, x, y, r) {
    var c = Math.cos(r), s = Math.sin(r);
    return { x: c * (x - cx) + s * (y - cy) + cx, y: c * (y - cy) - s * (x - cx) + cy };
  }
  function createStar() {
    var s = {};
    var r1 = Math.random() * (cfg.starEscapeWidth / 2) + 1;
    var r2 = Math.random() * (cfg.starEscapeWidth / 2) + cfg.starEscapeWidth;
    s.orbital = (r1 + r2) / 2;
    s.opacity = Math.floor((1 - s.orbital / cfg.starEscapeWidth) * cfg.maxOpacity + Math.random() * 80);
    var p = { x: size.x / 2, y: size.y / 2 + s.orbital };
    s.rotation = Math.PI * (Math.random() * 2);
    s.position = rotate(size.x / 2, size.y / 2, p.x, p.y, s.rotation);
    s.realPosition = { x: s.position.x, y: s.position.y };
    s.rSpeed = Math.random() * cfg.rotationSpeed + s.opacity / 20000;
    s.ws1 = Math.random() * cfg.waveSpeed; s.ws2 = Math.random() * cfg.waveSpeed;
    s.w1 = 0; s.w2 = 0;
    stars.push(s);
  }
  function drawStar(s) {
    var pi = Math.floor(s.realPosition.y + s.w1) * size.x + Math.floor(s.realPosition.x + s.w2);
    if (pi >= 0 && pi < data.length) data[pi] = 0;
    s.w1 = Math.sin(currentTime * s.ws1) * cfg.waveFrequency;
    s.w2 = Math.sin(currentTime * s.ws2) * cfg.waveFrequency;
    s.realPosition = rotate(size.x / 2, size.y / 2, s.position.x, s.position.y, s.rSpeed * currentTime);
    s.opacity = Math.floor((1 - s.orbital / cfg.starEscapeWidth) * cfg.maxOpacity + Math.random() * 80);
    var i = Math.floor(s.realPosition.y + s.w1) * size.x + Math.floor(s.realPosition.x + s.w2);
    if (i >= 0 && i < data.length) {
      data[i] = (s.opacity << 24) | (cfg.starColor.b << 16) | (cfg.starColor.g << 8) | cfg.starColor.r;
    }
  }
  function frame() {
    currentTime = (Date.now() - startTime) / 10;
    if (stars.length < cfg.starCount) {
      var lim = Math.min(120, cfg.starCount - stars.length);
      for (var k = 0; k < lim; k++) createStar();
    }
    for (var j = 0; j < stars.length; j++) drawStar(stars[j]);
    ctx.putImageData(imagedata, 0, 0);
    raf = requestAnimationFrame(frame);
  }
  function staticFrame() {
    while (stars.length < cfg.starCount) createStar();
    currentTime = 900;
    for (var j = 0; j < stars.length; j++) drawStar(stars[j]);
    ctx.putImageData(imagedata, 0, 0);
  }
  function start() { if (reduce) { staticFrame(); } else { if (raf) cancelAnimationFrame(raf); frame(); } }

  setSize(); start();
  var t;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { if (raf) cancelAnimationFrame(raf); setSize(); start(); }, 200); });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    else if (!reduce && !raf) { frame(); }
  });
})();
