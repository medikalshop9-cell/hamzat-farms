import { useState } from "react";
import {
  EMAIL,
  FACEBOOK_URL,
  TIKTOK_URL,
  LOCATION,
  WHATSAPP_BASE,
  ORDER_MESSAGE,
} from "../constants";

const FORMSPREE_ID = "xzdkzoll";

const CONTACT_ITEMS = [
  {
    icon: "📍",
    label: "Location",
    value: LOCATION,
    link: null,
  },
  {
    icon: "📧",
    label: "Email",
    value: EMAIL,
    link: `mailto:${EMAIL}`,
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+233 244 910 331",
    link: `${WHATSAPP_BASE}?text=${ORDER_MESSAGE}`,
  },
  {
    icon: "📘",
    label: "Facebook",
    value: "Hamzat Enterprise",
    link: FACEBOOK_URL,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!formData.name || !formData.message) {
      alert("Please fill in your name and message.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-brand-green font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            Reach Us
          </p>
          <h2 className="section-heading text-brand-dark">Get in Touch</h2>
          <p className="section-sub mx-auto text-center mt-3">
            Have a question or want to place a bulk order? We are always
            available. WhatsApp is the fastest way to reach us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-brand-card rounded-2xl px-6 py-5"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest">
                    {item.label}
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-dark hover:text-brand-green transition-colors mt-0.5 block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-brand-dark mt-0.5 leading-relaxed text-sm">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {TIKTOK_URL && (
              <div className="flex items-start gap-4 bg-brand-card rounded-2xl px-6 py-5">
                <span className="text-2xl">🎵</span>
                <div>
                  <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest">
                    TikTok
                  </p>
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-dark hover:text-brand-green transition-colors mt-0.5 block"
                  >
                    Follow us on TikTok
                  </a>
                </div>
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              href={`${WHATSAPP_BASE}?text=${ORDER_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-fit mt-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.51 5.827L.057 23.882l6.22-1.433A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.007-1.373l-.36-.213-3.695.852.868-3.592-.234-.37A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.389 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact form */}
          <div className="bg-brand-card rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-brand-dark mb-5">
              Send a Message
            </h3>

            {status === "success" ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">✅</p>
                <p className="font-semibold text-brand-dark">Message sent!</p>
                <p className="text-brand-muted text-sm mt-2">
                  We will get back to you shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message... *"
                  rows={5}
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors resize-none"
                />

                {status === "error" && (
                  <p className="text-brand-red text-xs">
                    Something went wrong. Please try WhatsApp instead.
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-brand-muted text-center">
                  Or reach us faster via{" "}
                  <a
                    href={`${WHATSAPP_BASE}?text=${ORDER_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green font-semibold"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
