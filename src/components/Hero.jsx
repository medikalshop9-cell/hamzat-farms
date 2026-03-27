import { Link } from "react-scroll";
import { WHATSAPP_BASE, ORDER_MESSAGE } from "../constants";
import Ribbons from "./Ribbons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1600&q=80')",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(26,26,26,0.92) 0%, rgba(26,122,38,0.72) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Ribbons — WebGL trails on hover */}
      <Ribbons
        colors={["#2ECC40", "#1a7a26", "#E8230A"]}
        baseThickness={26}
        speedMultiplier={0.45}
        maxAge={500}
        enableFade={true}
        enableShaderEffect={false}
      />

      {/* Floating decorative rings */}
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full border-[40px] border-brand-green opacity-10 float-badge"
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full border-[25px] border-white opacity-5 float-badge"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative text-center text-white px-5 max-w-4xl mx-auto" style={{ zIndex: 2 }}>
        <p className="hero-tag text-brand-green font-body font-semibold tracking-[0.25em] uppercase text-sm mb-5">
          Egg-Citing Chicken Moment
        </p>
        <h1 className="hero-h1 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-6">
          Fresh Poultry.{" "}
          <span className="text-brand-green">Fair Prices.</span>
          <br />
          Delivered to You.
        </h1>
        <p className="hero-sub font-body text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Hamzat Farms supplies quality eggs and live birds across Ghana, straight
          from our farm in Kokobiriko, Ashanti. Nationwide delivery available.
        </p>

        <div className="hero-btns flex flex-wrap justify-center gap-4">
          <a
            href={WHATSAPP_BASE + "?text=" + ORDER_MESSAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.51 5.827L.057 23.882l6.22-1.433A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.007-1.373l-.36-.213-3.695.852.868-3.592-.234-.37A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.389 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
            </svg>
            Order via WhatsApp
          </a>
          <Link
            to="products"
            smooth
            duration={700}
            offset={-70}
            className="btn-outline cursor-pointer"
          >
            View Pricing
          </Link>
        </div>

        {/* Trust badges */}
        <div className="hero-badges flex flex-wrap justify-center gap-6 mt-14 text-white/60 text-sm">
          {["Est. March 2021", "Nationwide Delivery", "1,000+ Birds at Start", "Bosomtwe District, Ashanti"].map(
            (badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
                {badge}
              </span>
            )
          )}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs" style={{ zIndex: 2 }}>
        <span>Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
