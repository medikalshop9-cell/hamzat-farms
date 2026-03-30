import { useState, useEffect } from "react";

const IMAGES = [
  { src: "/assets/farm-photo.jpg", alt: "Hamzat Farms poultry" },
  { src: "/assets/farm-2.jpg",    alt: "Hamzat Farms chickens" },
  { src: "/assets/farm-3.jpg",    alt: "Hamzat Farms eggs" },
  { src: "/assets/farm-4.jpg",    alt: "Hamzat Farms birds" },
  { src: "/assets/farm-5.jpg",    alt: "Hamzat Farms operations" },
];

export default function FarmCarousel() {
  const [current, setCurrent] = useState(0);
  const [next,    setNext]    = useState(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = setInterval(() => advance(), 4000);
    return () => clearInterval(timer);
  }, [current]);

  function advance(to) {
    const nextIndex = to !== undefined ? to : (current + 1) % IMAGES.length;
    if (nextIndex === current) return;
    setNext(nextIndex);
    // After next image fully fades in, promote it to current
    setTimeout(() => {
      setCurrent(nextIndex);
      setNext(null);
    }, 700);
  }

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-gray select-none">

      {/* Base layer — current image, always fully visible */}
      <img
        src={IMAGES[current].src}
        alt={IMAGES[current].alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1, opacity: 1 }}
      />

      {/* Top layer — next image fades IN over the current one */}
      {next !== null && (
        <img
          key={next}
          src={IMAGES[next].src}
          alt={IMAGES[next].alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 2,
            opacity: 0,
            animation: "fadeInImg 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />
      )}

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)", zIndex: 3 }}
        aria-hidden="true"
      />

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 4 }}>
        {IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => advance(i)}
            aria-label={"Go to slide " + (i + 1)}
            style={{
              width:      i === current ? 20 : 8,
              height:     8,
              borderRadius: 9999,
              background: i === current ? "#2ECC40" : "rgba(255,255,255,0.5)",
              border:     "none",
              cursor:     "pointer",
              transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              padding:    0,
            }}
          />
        ))}
      </div>

      {/* 4+ Years badge */}
      <div
        className="float-badge absolute -bottom-5 -left-5 bg-brand-green text-white rounded-xl px-5 py-4 shadow-xl"
        style={{ zIndex: 5 }}
      >
        <p className="font-display text-2xl font-bold">4+ Years</p>
        <p className="text-sm text-white/80">Serving Ghana</p>
      </div>

      <style>{`
        @keyframes fadeInImg {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
