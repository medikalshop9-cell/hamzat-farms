import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Founded",        display: "2021",        isText: true  },
  { label: "Starting Flock", end: 1000, suffix: "+", isText: false },
  { label: "Years Growing",  end: 4,    suffix: "",  isText: false },
  { label: "Delivery",       display: "Nationwide",  isText: true  },
];

export default function About() {
  const [leftRef,  leftVisible]  = useScrollReveal(0.2);
  const [rightRef, rightVisible] = useScrollReveal(0.2);
  const statsRef  = useRef(null);
  const counters  = useRef([]);

  useEffect(() => {
    const els = counters.current;
    if (!els.length) return;

    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        const stat = STATS[i];
        if (stat.isText) return; // skip text-only stats

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.end,
          duration: 2,
          ease: "power2.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (el) el.textContent = Math.floor(obj.val).toLocaleString() + stat.suffix;
          },
          onComplete: () => {
            if (el) el.textContent = stat.end.toLocaleString() + stat.suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Text — slides from left */}
          <div
            ref={leftRef}
            className={"reveal-left" + (leftVisible ? " visible" : "")}
          >
            <p className="text-brand-green font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Our Story
            </p>
            <h2 className="section-heading text-white">Built from the Ground Up</h2>
            <div className="space-y-4 mt-6 text-white/75 font-body leading-relaxed text-[1.05rem]">
              <p>Hamzat Farms started in March 2021 with 1,000 birds and a clear goal: supply quality poultry products to Ghanaian households at fair prices.</p>
              <p>Since then, we have grown rapidly into one of the trusted poultry operations in the Bosomtwe district, Ashanti Region, serving individual buyers, traders, and institutions.</p>
              <p>We focus on proper bird care, hygienic handling, and consistent quality. Every egg and every bird that leaves our farm meets your expectations.</p>
              <p className="text-brand-green font-semibold">Our mission: affordable, nutritious poultry for every Ghanaian home.</p>
            </div>
          </div>

          {/* Image — slides from right */}
          <div
            ref={rightRef}
            className={"relative reveal-right" + (rightVisible ? " visible" : "")}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/assets/farm-photo.jpg"
                alt="Chickens at Hamzat Farms, Kokobiriko Ashanti"
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
            <div className="float-badge absolute -bottom-5 -left-5 bg-brand-green text-white rounded-xl px-5 py-4 shadow-xl">
              <p className="font-display text-2xl font-bold">4+ Years</p>
              <p className="text-sm text-white/80">Serving Ghana</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20 border-t border-white/10 pt-14"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p
                ref={el => (counters.current[i] = el)}
                className="font-display text-5xl font-bold text-brand-green"
              >
                {stat.isText ? stat.display : "0" + (stat.suffix || "")}
              </p>
              <p className="font-body text-white/60 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
