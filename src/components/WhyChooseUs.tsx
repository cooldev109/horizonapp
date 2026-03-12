"use client";

import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Award, SlidersHorizontal, ShieldCheck, Headset } from "lucide-react";

const cards = [
  { key: "expertise", icon: Award, gradient: "from-blue to-teal" },
  { key: "customization", icon: SlidersHorizontal, gradient: "from-amber to-orange-500" },
  { key: "security", icon: ShieldCheck, gradient: "from-red-500 to-pink-500" },
  { key: "support", icon: Headset, gradient: "from-green to-teal" },
] as const;

export default function WhyChooseUs() {
  const { t } = useI18n();
  const ref = useScrollReveal();

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-4">
            {t("whyUs.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ key, icon: Icon, gradient }) => (
            <div
              key={key}
              className="group relative p-8 bg-light rounded-2xl border border-border hover:border-transparent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient accent top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 text-white`}>
                <Icon size={26} />
              </div>

              <h3 className="text-lg font-bold text-navy mb-2">
                {t(`whyUs.cards.${key}.metric`)}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed">
                {t(`whyUs.cards.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
