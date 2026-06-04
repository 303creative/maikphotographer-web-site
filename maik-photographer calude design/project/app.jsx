/* global React, ReactDOM, Nav, Hero, Portfolio, About, Services, Booking, Footer */const { useEffect: useEffectA } = React;

const REVEAL_SELECTOR = ".r-up, .line-in, .reveal-clip, .split";

function setupReveal() {
  const root = document.documentElement;
  root.classList.add("anim-ready");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  const observeAll = (scope) =>
    scope.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });

  observeAll(document);

  // Watch for nodes React adds later (e.g. portfolio filter changes).
  const mo = new MutationObserver((muts) => {
    muts.forEach((m) =>
      m.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        if (n.matches && n.matches(REVEAL_SELECTOR) && !n.classList.contains("in")) io.observe(n);
        if (n.querySelectorAll) observeAll(n);
      })
    );
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Safety net: never leave content stranded if the animation clock stalls.
  setTimeout(() => {
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add("in"));
  }, 2400);
}

function setupParallax() {
  const head = document.getElementById("hero-head");
  const meta = document.getElementById("hero-meta");
  if (!head) return;
  let ticking = false;
  const apply = () => {
    const y = window.scrollY;
    head.style.transform = "translateY(" + y * -0.18 + "px)";
    head.style.opacity = String(Math.max(0, 1 - y / 520));
    if (meta) meta.style.transform = "translateY(" + y * -0.07 + "px)";
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(apply); }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupCursor() {
  const ring = document.getElementById("cursor-ring");
  const dot = document.getElementById("cursor-dot");
  if (!ring || !dot) return;
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  const onMove = (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
  };
  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  const grow = () => ring.classList.add("grow");
  const shrink = () => ring.classList.remove("grow");
  const bind = () =>
    document.querySelectorAll('[data-cursor="grow"]').forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
  bind();
  const mo = new MutationObserver(bind);
  mo.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("mousemove", onMove);
}

function App() {
  useEffectA(() => {
    let booted = false;
    const boot = () => {
      if (booted) return;
      booted = true;
      setupReveal();
      setupParallax();
      setupCursor();
      if (window.lucide) window.lucide.createIcons({ nameAttr: "data-lucide" });
    };
    const id = requestAnimationFrame(boot);
    const t = setTimeout(boot, 300); // fallback if rAF is throttled at load
    return () => { cancelAnimationFrame(id); clearTimeout(t); };
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Booking />
      </main>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
