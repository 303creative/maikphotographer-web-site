/* global React, SplitText */
const { useRef: useRefSv, useEffect: useEffectSv } = React;

const SERVICES = [
  { n: "01", title: "Portrait Session", price: "$175", desc: "1–2h · 20+ photos · 48h delivery", g: "linear-gradient(135deg,#201c1a,#0e0c0b 80%)" },
  { n: "02", title: "Editorial / Fashion", price: "$450", desc: "Full day · Art direction included", g: "linear-gradient(135deg,#1c1f23,#0c0d0f 80%)" },
  { n: "03", title: "Brand Content", price: "$650/mo", desc: "2 sessions · 60+ photos", g: "linear-gradient(135deg,#211b20,#0d0a0e 80%)" },
  { n: "04", title: "Real Estate", price: "$300", desc: "Architecture & interior photography", g: "linear-gradient(135deg,#1b211f,#0b0e0c 80%)" },
  { n: "05", title: "Headshots", price: "$120", desc: "30 min · Same-day delivery", g: "linear-gradient(135deg,#211f1a,#0e0c08 80%)" },
];

function Services() {
  const piecesRef = useRefSv([]);
  const n = SERVICES.length;

  useEffectSv(() => {
    const pieces = piecesRef.current.filter(Boolean);
    let raf = null;
    const pinTop = 120;
    const apply = () => {
      raf = null;
      pieces.forEach((piece, i) => {
        const card = piece.querySelector("[data-card]");
        if (!card) return;
        const rect = piece.getBoundingClientRect();
        const target = 1 - (n - 1 - i) * 0.05;
        const prog = Math.min(Math.max((pinTop - rect.top) / (rect.height * 0.7), 0), 1);
        const scale = 1 - (1 - target) * prog;
        card.style.transform = "scale(" + scale.toFixed(4) + ")";
        card.style.filter = "brightness(" + (1 - 0.22 * prog).toFixed(3) + ")";
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <section id="services" className="relative z-20 -mt-10 md:-mt-16 rounded-t-[44px] md:rounded-t-[64px] border-t border-white/10 bg-[#0f0e0d] pt-24 md:pt-32 pb-10 shadow-[0_-40px_90px_rgba(0,0,0,0.75)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-txts mb-5">[ Services ]</p>
            <h2 className="font-body font-bold text-cream text-6xl md:text-8xl tracking-[-0.03em] lowercase">
              <SplitText text="what i do" />
            </h2>
          </div>
          <p className="font-body text-sm text-txts max-w-xs md:text-right">
            Fixed pricing. No surprises. Every package ends in a private online gallery.
          </p>
        </div>
      </div>

      {/* stacking cards */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {SERVICES.map((s, i) => (
          <div
            key={s.n}
            ref={(el) => (piecesRef.current[i] = el)}
            className="h-[66vh] sm:h-[70vh]"
          >
            <div className="sticky" style={{ top: 110 + i * 16 + "px" }}>
              <div
                data-card
                className="origin-top will-change-transform overflow-hidden rounded-3xl border border-white/12"
                style={{ background: s.g }}
              >
                <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-12 px-7 md:px-14 py-12 md:py-16 min-h-[48vh] sm:min-h-[52vh]">
                  <span className="font-head text-[5.5rem] md:text-[9rem] leading-[0.8] text-accent">{s.n}</span>
                  <div className="min-w-0">
                    <h3 className="font-body font-bold text-cream text-4xl md:text-6xl tracking-[-0.02em] lowercase leading-[0.95]">
                      {s.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-txts mt-4 max-w-md">{s.desc}</p>
                  </div>
                  <div className="md:text-right">
                    <div className="font-head text-4xl md:text-6xl text-cream leading-none">{s.price}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-txtsub mt-2">Starting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Services });
