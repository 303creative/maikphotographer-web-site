/* global React, Reveal, RevealItem, SplitText, Icon, BracketRule */
const CAL_URL = "https://cal.com/the303-marketing-kmfxzs/30min";
const WA_URL = "https://wa.me/17863329815";
const IG_URL = "https://instagram.com/maik_photographer";
const EMAIL = "mailto:hello@maikelmarshall.com";

function Booking() {
  return (
    <section id="booking" className="relative z-30 -mt-10 md:-mt-16 rounded-t-[44px] md:rounded-t-[64px] border-t border-white/10 bg-bgp pt-24 md:pt-28 pb-24 md:pb-32 shadow-[0_-40px_90px_rgba(0,0,0,0.75)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="relative overflow-hidden rounded-md bg-bgc border border-white/10 px-6 md:px-16 py-20 md:py-28 text-center spotlight">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-txts mb-6">[ Booking ]</p>
          </RevealItem>

          <h2 className="font-head text-6xl md:text-8xl tracking-tight mb-7">
            <SplitText text="Ready to Shoot?" />
          </h2>

          <RevealItem>
            <p className="font-body text-base md:text-lg text-txts max-w-md mx-auto mb-12">
              5 sessions available per week. Book yours before they're gone.
            </p>
          </RevealItem>

          <RevealItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener"
                data-cursor="grow"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent hover:bg-accenth transition-colors px-9 py-4.5 font-mono text-xs uppercase tracking-[0.18em] text-white"
                style={{ paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
              >
                Book a Session
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener"
                data-cursor="grow"
                className="inline-flex items-center gap-2.5 rounded-full transition-colors px-9 text-white font-mono text-xs uppercase tracking-[0.18em]"
                style={{ background: "#25D366", paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
              >
                <Icon name="message-circle" size={16} strokeWidth={2} />
                Chat on WhatsApp
              </a>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="mt-10 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-txts">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status"></span>
              </span>
              Typically responds in under 1 hour
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    { icon: "instagram", label: "Instagram", href: IG_URL },
    { icon: "message-circle", label: "WhatsApp", href: WA_URL },
    { icon: "mail", label: "Email", href: EMAIL },
  ];
  return (
    <footer id="contact" className="relative bg-bgp border-t border-white/5 pt-16 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <BracketRule className="mb-14" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          {/* logo */}
          <div>
            <div className="font-head text-4xl md:text-6xl tracking-wide leading-none">MAIKEL MARSHALL</div>
            <div className="font-body text-xs uppercase tracking-[0.3em] text-txts mt-3">Photography · Miami</div>
          </div>

          {/* socials */}
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  data-cursor="grow"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-txts hover:text-txtp hover:border-accent transition-colors"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
            <div className="font-mono text-xs tracking-[0.12em] text-txtsub">25°46′N&nbsp;80°11′W</div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-txtsub">
            © 2026 Maikel Marshall Photography. Miami, FL.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-txtsub">@maik_photographer</p>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Booking, Footer });
