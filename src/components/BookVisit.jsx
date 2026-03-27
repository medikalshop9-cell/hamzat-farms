import { useState } from "react";
import { WHATSAPP_BASE, VISIT_SLOTS, buildBookingMessage } from "../constants";

export default function BookVisit() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    visitors: "1",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.date) {
      alert("Please fill in your name, phone, and preferred date.");
      return;
    }
    const msg = buildBookingMessage(form);
    window.open(`${WHATSAPP_BASE}?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section id="book-visit" className="py-24 bg-brand-card">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Info */}
          <div>
            <p className="text-brand-green font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Farm Visit
            </p>
            <h2 className="section-heading text-brand-dark">
              Come See the Farm
            </h2>
            <p className="text-brand-muted font-body mt-4 leading-relaxed">
              You are welcome to visit Hamzat Farms in Kokobiriko, Bosomtwe
              District. See how we raise our birds, inspect the quality
              firsthand, and collect directly if you prefer.
            </p>

            {/* Visit slots */}
            <div className="mt-8 space-y-3">
              <p className="font-semibold text-brand-dark">
                Available Visit Times:
              </p>
              {VISIT_SLOTS.map((slot) => (
                <div
                  key={slot.day}
                  className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0" />
                  <span className="font-semibold text-brand-dark w-24">
                    {slot.day}
                  </span>
                  <span className="text-brand-muted">{slot.time}</span>
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="mt-8 flex items-start gap-3 text-brand-muted">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-semibold text-brand-dark">Farm Location</p>
                <p className="text-sm mt-0.5 leading-relaxed">
                  Kokobiriko, 2km from Abidjan Nkwanta,
                  <br />
                  Bosomtwe District, Ashanti Region, Ghana
                </p>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="font-display text-2xl font-bold text-brand-dark mb-6">
              Book a Visit
            </h3>

            {sent ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">✅</p>
                <p className="font-semibold text-brand-dark text-lg">
                  Your booking was sent on WhatsApp!
                </p>
                <p className="text-brand-muted text-sm mt-2">
                  We will confirm your visit shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-brand-green font-semibold text-sm hover:underline"
                >
                  Book another visit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Kofi Mensah"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +233 24 000 0000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                    Number of Visitors
                  </label>
                  <select
                    name="visitors"
                    value={form.visitors}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors"
                  >
                    {[1, 2, 3, 4, 5, "6+"].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full btn-whatsapp justify-center mt-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.51 5.827L.057 23.882l6.22-1.433A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.007-1.373l-.36-.213-3.695.852.868-3.592-.234-.37A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.389 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                  </svg>
                  Send Booking via WhatsApp
                </button>

                <p className="text-xs text-brand-muted text-center">
                  Tapping the button opens WhatsApp with your details pre-filled.
                  We confirm your booking from there.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
