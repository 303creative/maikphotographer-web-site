/* global React */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

const CAL = "https://cal.com/the303-marketing-kmfxzs/30min";
const HERO_VIDEO = "uploads/40_hero_camara_loop.mp4";

const NAV_LINKS = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Booking", "#booking"],
  ["Contact", "#contact"],
];

/* ----------------------------------------------------------
   NAV — appears as a slim bar only once scrolled (the hero
   carries its own hanging pill nav at the top).
---------------------------------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useStateH(false);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-[100] transition-all duration-500 " +
        (scrolled
          ? "translate-y-0 opacity-100 bg-bgp/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "-translate-y-full opacity-0 pointer-events-none py-4")
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between">
        <a href="#top" data-cursor="grow" className="leading-none">
          <span className="font-head text-2xl md:text-3xl tracking-wide text-cream">MAIKEL MARSHALL</span>
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.slice(0, 3).map(([label, href]) => (
            <a
              key={href}
              href={href}
              data-cursor="grow"
              className="font-mono text-xs uppercase tracking-[0.18em] text-txts hover:text-cream transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={CAL}
          target="_blank"
          rel="noopener"
          data-cursor="grow"
          className="font-mono text-xs uppercase tracking-[0.16em] text-cream border border-white/25 rounded-full px-5 py-2.5 hover:border-accent hover:text-accent transition-colors"
        >
          Book
        </a>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------
   HERO — Prisma format: inset rounded video, hanging pill
   nav, giant lowercase wordmark with pull-up + asterisk.
---------------------------------------------------------- */
function Hero() {
  const [videoOn, setVideoOn] = useStateH(false);
  const videoRef = useRefH(null);
  useEffectH(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.volume = 0;
    v.defaultMuted = true;
    if (v.readyState >= 2) setVideoOn(true);
    const p = v.play && v.play();
    if (p && p.then) p.then(() => setVideoOn(true)).catch(() => {});
  }, []);
  return (
    <section id="top" className="relative h-screen w-full p-3 sm:p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] bg-black">
        {/* photo fallback (shows if the video can't load) */}
        <img
          src="uploads/39_portafolio_4.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        {/* background video — fades in only once it can actually play */}
        <video
          ref={videoRef}
          className={
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
            (videoOn ? "opacity-100" : "opacity-0")
          }
          src={HERO_VIDEO}
          poster="uploads/39_portafolio_4.jpg"
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoOn(true)}
          onPlaying={() => setVideoOn(true)}
          onLoadedData={() => setVideoOn(true)}
        ></video>
        {/* noise + gradient overlays */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none"></div>

        {/* hanging pill nav */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <nav className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 md:py-3">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                data-cursor="grow"
                className="text-[10px] sm:text-xs md:text-sm tracking-wide transition-colors"
                style={{ color: "rgba(225,224,204,0.8)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225,224,204,0.8)")}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* badge top-left */}
        <div className="absolute top-7 left-6 md:top-9 md:left-9 z-20 r-up inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-4 py-2" style={{ "--rd": "0.1s" }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-status"></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">Available in Miami</span>
        </div>

        {/* bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-10 pb-7 md:pb-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* wordmark */}
            <div className="lg:col-span-8">
              <p className="r-up font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-cream/70 mb-3 md:mb-5" style={{ "--rd": "0.15s" }}>
                Portrait · Editorial · Fashion · Lifestyle
              </p>
              <h1 className="font-body font-bold text-cream leading-[0.82] tracking-[-0.05em]">
                <span className="line-in text-[13vw] sm:text-[12vw] lg:text-[10vw]" style={{ "--rd": "0.25s" }}>
                  <span>maikel</span>
                </span>
                <span className="line-in text-[13vw] sm:text-[12vw] lg:text-[10vw] relative inline-block" style={{ "--rd": "0.37s" }}>
                  <span className="relative inline-block">
                    marshall
                    <span className="absolute top-[0.18em] -right-[0.4em] text-[0.3em] font-mono text-accent">*</span>
                  </span>
                </span>
              </h1>
            </div>

            {/* description + CTA */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:pb-3">
              <p className="r-up text-cream/70 text-sm md:text-base" style={{ "--rd": "0.5s", lineHeight: 1.35 }}>
                A Miami-based photographer and director. Every frame is built with intent —
                light, posture, tension, timing — until the moment feels true.
              </p>
              <a
                href={CAL}
                target="_blank"
                rel="noopener"
                data-cursor="grow"
                className="r-up group inline-flex items-center justify-between gap-2 hover:gap-3 transition-all bg-cream rounded-full pl-6 pr-1.5 py-1.5 w-full sm:w-auto sm:min-w-[230px]"
                style={{ "--rd": "0.62s" }}
              >
                <span className="font-body font-bold text-black text-sm sm:text-base whitespace-nowrap">Book a session</span>
                <span className="flex items-center justify-center bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 transition-transform group-hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E1E0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero });
