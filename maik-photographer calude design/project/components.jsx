/* global React */
const { useRef, useEffect, useState } = React;

/* ----------------------------------------------------------
   Reveal — group container. Injects a staggered --rd delay
   onto each direct child so groups cascade in.
---------------------------------------------------------- */
function Reveal({ children, className = "", step = 0.1, as: Tag = "div", ...rest }) {
  const kids = React.Children.toArray(children).map((child, i) => {
    if (!React.isValidElement(child)) return child;
    const style = { "--rd": (i * step).toFixed(3) + "s", ...(child.props.style || {}) };
    return React.cloneElement(child, { style });
  });
  return (
    <Tag className={className} {...rest}>
      {kids}
    </Tag>
  );
}

/* A single rise-in unit (fade up from y:30). */
function RevealItem({ children, className = "", style, ...rest }) {
  return (
    <div className={"r-up " + className} style={style} {...rest}>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------
   SplitText — title that animates letter-by-letter on entry
---------------------------------------------------------- */
function SplitText({ text, className = "", charClassName = "", startIndex = 0 }) {
  const parts = text.split(/(\s+)/); // keep whitespace chunks
  let ci = startIndex;
  return (
    <span className={"split " + className} aria-label={text}>
      {parts.map((part, pi) => {
        if (/^\s+$/.test(part)) return <span key={pi}> </span>; // breakable space
        const chars = Array.from(part);
        return (
          <span key={pi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {chars.map((c, i) => {
              const idx = ci++;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className={"char " + charClassName}
                  style={{ "--ci": idx }}
                >
                  {c}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

/* ----------------------------------------------------------
   useCountUp — counts up when scrolled into view. Uses
   setInterval (fires even when rAF is throttled) + an IO
   trigger, with a timeout safety so it always completes.
---------------------------------------------------------- */
function useCountUp(target, duration = 1500) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    let interval;
    const run = () => {
      if (started) return;
      started = true;
      const start = Date.now();
      interval = setInterval(() => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p >= 1) clearInterval(interval);
      }, 16);
    };
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) run(); },
      { threshold: 0.5 }
    );
    io.observe(el);
    const safety = setTimeout(run, 2200);
    return () => { io.disconnect(); clearInterval(interval); clearTimeout(safety); };
  }, [target, duration]);
  return [ref, val];
}

/* ----------------------------------------------------------
   Lucide icon
---------------------------------------------------------- */
function Icon({ name, size = 20, strokeWidth = 1.5, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    try {
      window.lucide.createIcons({
        attrs: { width: size, height: size, "stroke-width": strokeWidth },
        nameAttr: "data-lucide",
      });
    } catch (e) { /* noop */ }
  }, [name, size, strokeWidth]);
  return <span ref={ref} className={className} style={{ display: "inline-flex", lineHeight: 0 }} />;
}

/* ----------------------------------------------------------
   Editorial [ ——— ] separator
---------------------------------------------------------- */
function BracketRule({ className = "" }) {
  return (
    <div className={"flex items-center justify-center gap-3 font-mono text-txtsub text-sm " + className}>
      <span>[</span>
      <span className="h-px w-16 md:w-28 bg-txtsub/50 inline-block"></span>
      <span>]</span>
    </div>
  );
}

Object.assign(window, { Reveal, RevealItem, SplitText, useCountUp, Icon, BracketRule });
