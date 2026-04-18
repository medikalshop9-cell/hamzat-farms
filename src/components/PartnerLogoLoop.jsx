import { useMemo } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import LogoLoop from "./LogoLoop";
import { LOGO_LOOP_ICON_LOGOS, LOGO_LOOP_IMAGE_LOGOS } from "../constants";

const ICON_COMPONENTS = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
};

export default function PartnerLogoLoop({ useImageLogos = false }) {
  const iconLogos = useMemo(
    () =>
      LOGO_LOOP_ICON_LOGOS.map((item) => {
        const Icon = ICON_COMPONENTS[item.icon];
        return {
          node: Icon ? <Icon /> : item.title,
          title: item.title,
          href: item.href,
          ariaLabel: item.title,
        };
      }),
    []
  );

  const logos = useImageLogos ? LOGO_LOOP_IMAGE_LOGOS : iconLogos;
  if (!logos.length) return null;

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-center text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-brand-muted mb-6">
          Trusted Platforms
        </p>

        <div className="relative h-[100px] overflow-hidden rounded-2xl bg-brand-card/70 flex items-center">
          <LogoLoop
            logos={logos}
            speed={100}
            direction="left"
            logoHeight={44}
            gap={48}
            hoverSpeed={20}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
            className="w-full text-brand-dark"
          />
        </div>
      </div>
    </section>
  );
}
