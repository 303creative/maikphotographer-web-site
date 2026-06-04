/* global React, Reveal, RevealItem, SplitText, useCountUp, BracketRule */

function Stat({ target, suffix, decimals, label }) {
  const [ref, val] = useCountUp(target);
  const display = decimals ? val.toFixed(decimals) : Math.round(val);
  return (
    <div ref={ref}>
      <div className="font-head text-6xl md:text-7xl text-txtp leading-none">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="font-body text-xs uppercase tracking-[0.16em] text-txts mt-3">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative bg-bgs py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* left — portrait (transparent cut-out over the dark section) */}
          <RevealItem className="relative">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-bgs"
              data-cursor="grow"
            >
              <img
                src="uploads/the303-netflix-3.png"
                alt="Maikel Marshall"
                className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.03]"
              />
              <div className="absolute bottom-5 left-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/70">[ The director ]</p>
              </div>
              <div className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-[0.2em] text-txts">
                ISO 400 · ƒ1.4
              </div>
            </div>
          </RevealItem>

          {/* right — text */}
          <div>
            <RevealItem>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-txts mb-6">[ About ]</p>
            </RevealItem>

            <h2 className="font-body font-normal text-4xl md:text-6xl tracking-[-0.02em] leading-[0.98] mb-8 text-cream">
              <SplitText text="I don't just take photos. " />
              <SplitText text="I direct." className="font-serif italic" startIndex={26} />
            </h2>

            <RevealItem>
              <p className="font-body text-base md:text-lg text-txts leading-relaxed max-w-xl mb-10">
                Every frame is built — light, posture, tension, timing. I work the way a
                cinematographer works a scene: deliberately, until the moment feels true.
                Based in Miami, shooting worldwide.
              </p>
            </RevealItem>

            {/* stats */}
            <RevealItem>
              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-9">
                <Stat target={50} suffix="+" label="Sessions" />
                <Stat target={4} suffix="+" label="Years" />
                <Stat target={5.0} decimals={1} suffix="" label="Rating" />
              </div>
            </RevealItem>

            {/* coordinates + signature */}
            <RevealItem>
              <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
                <div className="signature text-3xl md:text-4xl text-txtp">Maikel Marshall</div>
                <div className="font-mono text-xs tracking-[0.12em] text-txtsub">25°46′N&nbsp;&nbsp;80°11′W</div>
              </div>
            </RevealItem>
          </div>
        </Reveal>

        <BracketRule className="mt-20 md:mt-28" />
      </div>
    </section>
  );
}

Object.assign(window, { About });
