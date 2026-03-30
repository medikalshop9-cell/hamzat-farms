import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { STATS } from "../constants";
import FarmCarousel from "./FarmCarousel";

function useCountUp(target, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger || typeof target !== "number") return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

function StatCard({ stat, triggered, delay }) {
  const count = useCountUp(stat.isText ? 0 : stat.value, 1800, triggered);
  return (
    <div
      className="text-center"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: delay,
      }}
    >
      <p className="font-display text-5xl font-bold text-brand-green">
        {stat.isText ? stat.value : count.toLocaleString() + stat.suffix}
      </p>
      <p className="font-body text-white/60 mt-2 font-medium">{stat.label}</p>
    </div>
  );
}

export default function About() {
  const [leftRef,  leftVisible]  = useScrollReveal(0.2);
  const [rightRef, rightVisible] = useScrollReveal(0.2);
  const [statsRef, statsVisible] = useScrollReveal(0.25);

  return (
    <section id="about" className="py-24 bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Text */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-48px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p className="text-brand-green font-semibold tracking-[0.2em] uppercase text-sm mb-4">Our Story</p>
            <h2 className="section-heading text-white">Built from the Ground Up</h2>
            <div className="space-y-4 mt-6 text-white/75 font-body leading-relaxed text-[1.05rem]">
              <p>Hamzat Farms started in March 2021 with 1,000 birds and a clear goal: supply quality poultry products to Ghanaian households at fair prices.</p>
              <p>Since then, we have grown rapidly into one of the trusted poultry operations in the Bosomtwe district, Ashanti Region, serving individual buyers, traders, and institutions.</p>
              <p>We focus on proper bird care, hygienic handling, and consistent quality. Every egg and every bird that leaves our farm meets your expectations.</p>
              <p className="text-brand-green font-semibold">Our mission: affordable, nutritious poultry for every Ghanaian home.</p>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={rightRef}
            className="relative pb-6"
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateX(0)" : "translateX(48px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <FarmCarousel />
          </div>
        </div>

        {/* Stats — inline styles, no CSS class dependency */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-24 border-t border-white/10 pt-14"
        >
          {STATS.map((s, i) => (
            <StatCard
              key={s.label}
              stat={s}
              triggered={statsVisible}
              delay={i * 0.12 + "s"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
