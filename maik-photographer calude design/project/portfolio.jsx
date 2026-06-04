/* global React, SplitText */
const { useState: useStateP } = React;

const PORTFOLIO_ITEMS = [
  { id: 1, cat: "EDITORIAL", title: "Crimson Hour", src: "uploads/39_portafolio_1.jpg" },
  { id: 2, cat: "EDITORIAL", title: "Held Close", src: "uploads/39_portafolio_2.jpg" },
  { id: 3, cat: "PORTRAIT", title: "Backlit", src: "uploads/39_portafolio_3.jpg" },
  { id: 4, cat: "FASHION", title: "Brickell Noir", src: "uploads/39_portafolio_4.jpg" },
  { id: 5, cat: "FASHION", title: "Off Axis", src: "uploads/39_portafolio_5.jpg" },
  { id: 6, cat: "FASHION", title: "Downtown Stride", src: "uploads/39_portafolio_6.jpg" },
  { id: 7, cat: "LIFESTYLE", title: "Corner Office", src: "uploads/39_portafolio_7.jpg" },
  { id: 8, cat: "PORTRAIT", title: "Oxblood", src: "uploads/39_portafolio_8.jpg" },
  { id: 9, cat: "LIFESTYLE", title: "The Pitch", src: "uploads/39_portafolio_9.jpg" },
];

const FILTERS = ["ALL", "PORTRAIT", "EDITORIAL", "LIFESTYLE", "FASHION"];

function PortfolioCard({ item, index }) {
  const delay = ((index % 3) * 0.12 + Math.floor(index / 3) * 0.06).toFixed(3) + "s";
  return (
    <div data-cursor="grow" className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-bgc">
      {/* curtain wipe reveal on scroll entry */}
      <div className="reveal-clip absolute inset-0" style={{ "--rd": delay }}>
        {/* photo */}
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"></div>

        {/* top label */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-txts">
            {String(item.id).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-txtsub">{item.cat}</span>
        </div>

        {/* hover overlay from bottom */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-txts mb-1">{item.cat}</p>
            <div className="flex items-end justify-between">
              <h3 className="font-head text-3xl tracking-wide text-txtp">{item.title}</h3>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">View →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [active, setActive] = useStateP("ALL");
  const items = active === "ALL" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.cat === active);

  return (
    <section id="work" className="relative z-0 bg-bgp py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-txts mb-5">[ Work ]</p>
            <h2 className="font-head text-5xl md:text-7xl tracking-tight">
              <SplitText text="Selected Frames" />
            </h2>
          </div>

          {/* filter pills */}
          <div className="flex flex-wrap gap-2.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                data-cursor="grow"
                className={
                  "font-mono text-[11px] uppercase tracking-[0.16em] rounded-full px-4 py-2 transition-colors " +
                  (active === f
                    ? "bg-accent text-white border border-accent"
                    : "border border-white/20 text-txts hover:text-txtp hover:border-white/45")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => (
            <PortfolioCard key={item.id + "-" + active} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Portfolio });
