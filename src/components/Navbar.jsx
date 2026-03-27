import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { WHATSAPP_BASE, ORDER_MESSAGE } from "../constants";

const NAV_LINKS = [
  { label: "Home",       to: "home"       },
  { label: "About",      to: "about"      },
  { label: "Products",   to: "products"   },
  { label: "Book Visit", to: "book-visit" },
  { label: "Contact",    to: "contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkProps = {
    smooth: true,
    duration: 600,
    offset: -70,
    className:
      "cursor-pointer font-semibold text-sm tracking-wide hover:text-brand-green transition-colors duration-200",
    activeClass: "text-brand-green",
    spy: true,
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="home" smooth duration={600} className="cursor-pointer flex items-center gap-3">
          <img
            src="/assets/hamzat-farms-logo.png"

            alt="Hamzat Farms Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="font-display text-white text-lg font-bold hidden sm:block">
            Hamzat Farms
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} {...linkProps}>
              <span className="text-white">{l.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`${WHATSAPP_BASE}?text=${ORDER_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex btn-primary text-sm"
        >
          <span>Order Now</span>
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <span className="block w-6 h-0.5 bg-white transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-dark border-t border-white/10 px-5 pb-5 pt-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              {...linkProps}
              onClick={() => setOpen(false)}
            >
              <span className="text-white block py-1">{l.label}</span>
            </Link>
          ))}
          <a
            href={`${WHATSAPP_BASE}?text=${ORDER_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm w-fit mt-2"
            onClick={() => setOpen(false)}
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}
