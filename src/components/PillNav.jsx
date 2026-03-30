import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-scroll";
import { WHATSAPP_BASE, ORDER_MESSAGE } from "../constants";

const NAV_ITEMS = [
  { label: "Home",       to: "home"       },
  { label: "About",      to: "about"      },
  { label: "Products",   to: "products"   },
  { label: "Book Visit", to: "book-visit" },
  { label: "Contact",    to: "contact"    },
];

export default function PillNav() {
  const navRef      = useRef(null);
  const pillRef     = useRef(null);
  const itemRefs    = useRef([]);
  const [active, setActive]   = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Initial load animation
  useEffect(() => {
    const el = navRef.current;
    gsap.fromTo(
      el,
      { y: -80, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9,
        ease: "power3.out", delay: 0.3 }
    );
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move pill to active item
  useEffect(() => {
    const item = itemRefs.current[active];
    const pill = pillRef.current;
    if (!item || !pill) return;
    const { offsetLeft, offsetWidth } = item;
    gsap.to(pill, {
      x: offsetLeft,
      width: offsetWidth,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [active]);

  const handleHover = (i) => {
    const item = itemRefs.current[i];
    const pill = pillRef.current;
    if (!item || !pill) return;
    gsap.to(pill, {
      x: item.offsetLeft,
      width: item.offsetWidth,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    const item = itemRefs.current[active];
    const pill = pillRef.current;
    if (!item || !pill) return;
    gsap.to(pill, {
      x: item.offsetLeft,
      width: item.offsetWidth,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="home" smooth duration={700} className="cursor-pointer flex items-center gap-3 z-10">
            <img
              src="/assets/hamzat-farms-logo.png"
              alt="Hamzat Farms"
              className="h-11 w-11 object-contain drop-shadow-lg"
            />
            <span
              className="font-display text-white text-base font-bold hidden sm:block"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
            >
              Hamzat Farms
            </span>
          </Link>

          {/* Pill nav — desktop */}
          <div
            className="hidden md:flex items-center relative bg-black/40 backdrop-blur-md rounded-full px-2 py-2 border border-white/10"
            onMouseLeave={handleLeave}
          >
            {/* sliding pill */}
            <div
              ref={pillRef}
              className="absolute top-2 left-2 h-[calc(100%-16px)] rounded-full bg-brand-green pointer-events-none"
              style={{ width: 0 }}
            />
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={700}
                offset={-70}
                spy
                onSetActive={() => setActive(i)}
                ref={el => (itemRefs.current[i] = el)}
                onMouseEnter={(e) => { handleHover(i); if (i !== active) e.currentTarget.style.color = "rgba(255,255,255,0.95)"; }}
                onMouseLeave={(e) => { if (i !== active) e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                onClick={() => setActive(i)}
                className="relative z-10 px-4 py-1.5 text-sm font-semibold cursor-pointer rounded-full transition-colors duration-200"
                style={{
                  color: active === i ? "#ffffff" : "rgba(255,255,255,0.45)",
                  textShadow: active === i ? "0 0 14px rgba(46,204,64,0.7)" : "none",
                  fontWeight: active === i ? 700 : 500,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Order CTA */}
          <a
            href={WHATSAPP_BASE + "?text=" + ORDER_MESSAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-whatsapp text-sm"
          >
            Order Now
          </a>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden text-white p-2 z-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`md:hidden transition-all duration-400 overflow-hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease" }}
        >
          <div className="bg-brand-dark/95 backdrop-blur-md border-t border-white/10 px-5 pb-6 pt-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={700}
                offset={-70}
                onClick={() => { setActive(i); setMenuOpen(false); }}
                tabIndex={menuOpen ? 0 : -1}
                className="text-white font-semibold py-2 px-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_BASE + "?text=" + ORDER_MESSAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-fit mt-2 text-sm"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              Order Now
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
