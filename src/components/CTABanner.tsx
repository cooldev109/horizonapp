"use client";

import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  const { t } = useI18n();
  const ref = useScrollReveal();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue via-blue-light to-teal">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
          {t("cta.title")}
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl hover:-translate-y-0.5"
          >
            {t("cta.button1")}
            <ArrowRight size={18} />
          </a>
          <a
            href="tel:+19048308747"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all hover:-translate-y-0.5"
          >
            <Phone size={18} />
            {t("cta.button2")}
          </a>
        </div>
      </div>
    </section>
  );
}
