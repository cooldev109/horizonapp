"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const serviceOptions = [
    "migration", "infrastructure", "devops", "security", "ai", "managed", "other",
  ] as const;

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
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all text-navy"
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
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all text-navy"
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
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all text-navy"
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
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all text-navy"
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
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all text-navy bg-white"
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
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all text-navy resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue text-white font-semibold rounded-xl hover:bg-blue-light transition-colors shadow-lg shadow-blue/25"
              >
                {submitted ? (
                  <span className="text-green-300">Sent!</span>
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
                href="https://wa.me/31629485030"
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
