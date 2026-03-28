import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Link } from "react-scroll";
import { WHATSAPP_BASE, ORDER_MESSAGE } from "../constants";

function DockItem({ item, mouseX, baseItemSize, magnification }) {
  const ref = useRef(null);
  const distance = useMotionValue(999);

  function updateDistance(e) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const center = bounds.left + bounds.width / 2;
    distance.set(Math.abs(e.clientX - center));
  }

  const size = useSpring(
    useTransform(distance, [0, 80], [magnification, baseItemSize]),
    { stiffness: 350, damping: 26 }
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={updateDistance}
      onMouseLeave={() => distance.set(999)}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.18)",
        cursor: "pointer",
        flexShrink: 0,
        position: "relative",
      }}
      whileTap={{ scale: 0.85 }}
      title={item.label}
      onClick={item.onClick}
    >
      <span style={{ color: "#fff", fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
    </motion.div>
  );
}

const ITEMS = [
  {
    label: "Home", to: "home",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  },
  {
    label: "About", to: "about",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
  {
    label: "Products", to: "products",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>,
  },
  {
    label: "Book Visit", to: "book-visit",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    label: "WhatsApp",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.51 5.827L.057 23.882l6.22-1.433A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.007-1.373l-.36-.213-3.695.852.868-3.592-.234-.37A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.389 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>,
    onClick: () => window.open(WHATSAPP_BASE + "?text=" + ORDER_MESSAGE, "_blank"),
  },
  {
    label: "Contact", to: "contact",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  },
];

export default function Dock({ baseItemSize = 40, magnification = 54, panelHeight = 64 }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      className="md:hidden fixed z-50"
      style={{
        bottom: 16,
        left: "50%",
        translateX: "-50%",
        maxWidth: "calc(100vw - 32px)",
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div
        style={{
          height: panelHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "0 14px",
          background: "rgba(26,26,26,0.82)",
          backdropFilter: "blur(20px)",
          borderRadius: 9999,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
          width: "max-content",
          maxWidth: "calc(100vw - 32px)",
          overflowX: "auto",
        }}
      >
        {ITEMS.map((item) =>
          item.to ? (
            <Link key={item.label} to={item.to} smooth duration={700} offset={-70}>
              <DockItem item={item} mouseX={mouseX} baseItemSize={baseItemSize} magnification={magnification} />
            </Link>
          ) : (
            <DockItem key={item.label} item={item} mouseX={mouseX} baseItemSize={baseItemSize} magnification={magnification} />
          )
        )}
      </div>
    </motion.div>
  );
}
