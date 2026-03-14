"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { t } = useI18n();
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "d27f7520-0b81-487a-8d21-d9b0f56256cd",
          subject: `New contact from ${formData.name} — CloudsHorizon`,
          from_name: "CloudsHorizon Website",
          name: formData.name,
          email: formData.email,
          company: formData.company || "—",
          phone: formData.phone || "—",
          service: formData.service || "—",
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const serviceOptions = [
    "migration", "infrastructure", "devops", "security", "ai", "managed", "other",
  ] as const;

  const inputClass =
    "w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all text-navy text-base";

  return (
    <section id="contact" className="py-24 bg-light">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    {t("contact.form.email")} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    {t("contact.form.company")}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-navy mb-2">
                  {t("contact.form.service")}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">--</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`contact.form.serviceOptions.${opt}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-navy mb-2">
                  {t("contact.form.message")} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-green/10 border border-green/20 rounded-xl text-green">
                  <CheckCircle size={20} className="shrink-0" />
                  <span className="text-sm font-medium">Message sent! We'll get back to you shortly.</span>
                </div>
              )}
              {status === "error" && (
                <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="text-sm font-medium">Something went wrong. Please try again or contact us directly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue text-white font-semibold rounded-xl hover:bg-blue-light transition-colors shadow-lg shadow-blue/25 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t("contact.form.submit")}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:w-96">
            <div className="space-y-6">
              <ContactCard
                icon={Phone}
                label={t("contact.form.phone")}
                value={t("contact.info.phone")}
                href="tel:+19048308747"
              />
              <ContactCard
                icon={MessageCircle}
                label="WhatsApp"
                value={t("contact.info.whatsapp")}
                href="https://wa.me/573162948503"
              />
              <ContactCard
                icon={Mail}
                label={t("contact.form.email")}
                value={t("contact.info.email")}
                href="mailto:amazabael@cloudshorizon.com"
              />
              <ContactCard
                icon={MapPin}
                label="Location"
                value={t("contact.info.location")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
        <Icon size={22} className="text-blue" />
      </div>
      <div>
        <p className="text-sm text-text-muted mb-1">{label}</p>
        <p className="font-semibold text-navy">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
