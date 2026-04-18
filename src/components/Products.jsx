import { useState } from "react";
import { EGG_PRICES, BIRD_PRICES, PRODUCT_CATEGORIES, WHATSAPP_BASE, ORDER_MESSAGE } from "../constants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import LogoLoop from "./LogoLoop";

function ProductMedia({ item, previewVariant }) {
  if (Array.isArray(item.splitImages) && item.splitImages.length > 1) {
    return (
      <div className="product-media product-media-split">
        {item.splitImages.map((entry) => (
          <figure key={entry.label} className="product-media-pane">
            <img
              src={entry.src}
              alt={entry.alt || entry.label}
              loading="lazy"
              decoding="async"
              className="product-media-img"
            />
            <figcaption className="product-media-label">{entry.label}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  if (item.image) {
    const previewSrc = previewVariant?.src || item.image;
    const previewAlt = previewVariant?.alt || item.imageAlt || item.title;

    return (
      <div className="product-media">
        <img
          src={previewSrc}
          alt={previewAlt}
          loading="lazy"
          decoding="async"
          className="product-media-img"
        />
        <span className="product-media-chip" aria-hidden="true">{item.icon}</span>
      </div>
    );
  }

  return (
    <div className="product-media product-media-fallback" role="img" aria-label={item.title}>
      <span className="text-5xl">{item.icon}</span>
    </div>
  );
}

function ProductVariantCarousel({ item, selectedVariantSrc, onVariantSelect }) {
  if (!Array.isArray(item.variants) || item.variants.length === 0) return null;

  const variantNames = item.variants.map((variant) => variant.label).join(", ");

  return (
    <div className="egg-variant-loop-wrap">
      <p className="egg-variant-loop-title">{variantNames}</p>

      <LogoLoop
        logos={item.variants}
        speed={42}
        direction="left"
        logoHeight={82}
        gap={14}
        pauseOnHover
        fadeOut
        fadeOutColor="#f5f8f5"
        ariaLabel={item.title + " variants"}
        className="egg-variant-loop"
        renderItem={(variant) => {
          const isActive = selectedVariantSrc === variant.src;
          return (
            <button
              type="button"
              tabIndex={-1}
              className={"egg-variant-card" + (isActive ? " egg-variant-card-active" : "")}
              onClick={() => onVariantSelect(variant.src)}
              aria-label={"Show " + variant.label + " egg preview"}
            >
              <img
                src={variant.src}
                alt={variant.alt || variant.label}
                loading="lazy"
                decoding="async"
                className="egg-variant-card-image"
              />
              <span className="egg-variant-card-label">{variant.label}</span>
            </button>
          );
        }}
      />

      <p className="egg-variant-loop-hint">Auto-moving strip. Hover to pause. Tap to preview.</p>
    </div>
  );
}

function ProductCard({ item, index }) {
  const [ref, visible] = useScrollReveal(0.1);
  const [selectedVariantSrc, setSelectedVariantSrc] = useState("");

  const selectedVariant = Array.isArray(item.variants)
    ? item.variants.find((variant) => variant.src === selectedVariantSrc)
    : null;

  return (
    <div
      ref={ref}
      className={"card product-card flex flex-col reveal" + (visible ? " visible" : "")}
      style={{ transitionDelay: (index * 0.1) + "s" }}
    >
      <ProductMedia item={item} previewVariant={selectedVariant} />

      <div className="p-6 flex flex-col gap-4 h-full">
        <ProductVariantCarousel
          item={item}
          selectedVariantSrc={selectedVariant?.src || ""}
          onVariantSelect={setSelectedVariantSrc}
        />

        <h3 className="font-display text-xl font-bold text-brand-dark">{item.title}</h3>
        <p className="text-brand-muted text-sm leading-relaxed flex-1">{item.description}</p>

        <a
          href={WHATSAPP_BASE + "?text=" + encodeURIComponent("Hello Hamzat Farms! I am interested in: " + item.title + ".\n\nName: \nPhone: \nDetails: ")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm w-fit mt-auto"
        >
          {item.cta}
        </a>
      </div>
    </div>
  );
}

function PricingCard({ title, rows, colHeaders, delay }) {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={"card p-0 overflow-hidden reveal" + (visible ? " visible" : "")}
      style={{ transitionDelay: delay || "0s" }}
    >
      <div className="bg-brand-green px-6 py-4">
        <h3 className="font-display text-xl text-white font-bold">{title}</h3>
      </div>
      <table className="w-full font-body">
        <thead>
          <tr className="bg-brand-card border-b border-gray-100">
            {colHeaders.map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-brand-muted tracking-widest uppercase px-6 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-brand-card/60 transition-colors">
              <td className="px-6 py-4 font-semibold text-brand-dark">{row.label}</td>
              <td className="px-6 py-4 price-tag">GHS {row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Products() {
  const eggRows  = EGG_PRICES.map((e) => ({ label: e.grade, price: e.price }));
  const birdRows = BIRD_PRICES.map((b) => ({ label: b.type,  price: b.price }));
  const [headRef, headVisible] = useScrollReveal(0.2);
  const [delivRef, delivVisible] = useScrollReveal(0.2);

  return (
    <section id="products" className="relative py-24 bg-white overflow-hidden">
      <div className="products-ambient" aria-hidden="true">
        <div className="products-orb products-orb-green" />
        <div className="products-orb products-orb-red" />
        <div className="products-grid-fade" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5">

        {/* Heading */}
        <div
          ref={headRef}
          className={"mx-auto mb-14 max-w-3xl text-center reveal" + (headVisible ? " visible" : "")}
        >
          <div className="products-head-shell">
            <p className="text-brand-green font-semibold tracking-[0.2em] uppercase text-sm mb-3">Our Products</p>
            <h2 className="section-heading text-brand-dark">Products & Pricing</h2>
            <div className="products-head-line" />
            <p className="section-sub mx-auto text-center mt-4">
              From fresh eggs to expert consultancy, we cover everything poultry.
            </p>
          </div>
        </div>

        {/* Product cards — staggered */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRODUCT_CATEGORIES.map((item, i) => (
            <ProductCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-brand-muted text-sm font-semibold uppercase tracking-widest whitespace-nowrap">Egg & Bird Pricing</p>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Pricing tables */}
        <div className="grid md:grid-cols-2 gap-8">
          <PricingCard title="Eggs — Price per Crate (GHS)" rows={eggRows} colHeaders={["Grade", "Price"]} delay="0s" />
          <div className="flex flex-col gap-8">
            <PricingCard title="Live Birds — Price per Bird (GHS)" rows={birdRows} colHeaders={["Bird Type", "Price"]} delay="0.15s" />
            <div
              ref={delivRef}
              className={"rounded-2xl border-2 border-brand-green bg-brand-green/5 p-6 reveal" + (delivVisible ? " visible" : "")}
              style={{ transitionDelay: "0.25s" }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">📦</span>
                <div>
                  <h4 className="font-display font-bold text-brand-dark text-lg mb-1">Nationwide Delivery Available</h4>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    We deliver across Ghana at an agreed fee. Message us on WhatsApp to get a delivery quote for your area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-brand-muted text-xs mt-6 text-center">
          * Prices may vary in line with National Poultry Farmers Association guidelines. Contact us on WhatsApp before ordering.
        </p>

        <div className="text-center mt-12">
          <a
            href={WHATSAPP_BASE + "?text=" + ORDER_MESSAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.51 5.827L.057 23.882l6.22-1.433A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.007-1.373l-.36-.213-3.695.852.868-3.592-.234-.37A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.389 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
            </svg>
            Place Your Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
