"use client";

import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Shield, Award, Users, Clock } from "lucide-react";

export default function TrustBar() {
  const { t } = useI18n();
  const ref = useScrollReveal();

  const metrics = [
    { icon: Shield, label: t("trust.metric1"), color: "text-gcp-blue" },
    { icon: Award, label: t("trust.metric2"), color: "text-aws-orange" },
    { icon: Users, label: t("trust.metric3"), color: "text-green" },
    { icon: Clock, label: t("trust.metric4"), color: "text-teal" },
  ];

  return (
    <section id="partners" className="py-16 bg-light border-y border-border">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-muted text-sm font-medium uppercase tracking-wider mb-10">
          {t("trust.label")}
        </p>

        {/* Partner Logos */}
        <div className="flex items-center justify-center gap-12 mb-12 flex-wrap">
          <GoogleCloudLogo />
          <AWSLogo />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <m.icon size={32} className={`${m.color} mb-3`} />
              <span className="text-sm font-semibold text-navy-light">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleCloudLogo() {
  return (
    <svg viewBox="0 0 256 40" width="200" height="30">
      <g>
        {/* Cloud icon */}
        <path d="M25.78 10.54l2.83-2.83.15-.93A14.13 14.13 0 0 0 7.22 13.93l.82-.09 5.37-.89.22-.37A8.49 8.49 0 0 1 25.78 10.54z" fill="#EA4335"/>
        <path d="M36.67 13.93a14.24 14.24 0 0 0-4.3-6.93l-4.2 4.2a8.39 8.39 0 0 1 3.08 6.65v.84a4.2 4.2 0 0 1 0 8.4H22.4l-.84.85v5.31l.84.84h8.85a9.72 9.72 0 0 0 5.42-17.77z" fill="#4285F4"/>
        <path d="M13.54 34.09h8.86v-7.14h-8.86a4.16 4.16 0 0 1-1.73-.38l-1.2.37-3.45 3.45-.3 1.17a9.67 9.67 0 0 0 6.68 2.53z" fill="#34A853"/>
        <path d="M13.54 14.63a9.72 9.72 0 0 0-6.68 16.93l5-5a4.2 4.2 0 1 1 5.55-5.55l5-5a9.68 9.68 0 0 0-8.87-6.38z" fill="#FBBC05"/>
        {/* Text */}
        <text x="52" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="400" fill="#5F6368">
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#EA4335">o</tspan>
          <tspan fill="#FBBC05">o</tspan>
          <tspan fill="#4285F4">g</tspan>
          <tspan fill="#34A853">l</tspan>
          <tspan fill="#EA4335">e</tspan>
          <tspan fill="#5F6368"> Cloud</tspan>
        </text>
      </g>
    </svg>
  );
}

function AWSLogo() {
  return (
    <svg viewBox="0 0 150 50" width="130" height="40">
      <g>
        <text x="10" y="30" fontFamily="'Amazon Ember', Arial, sans-serif" fontSize="28" fontWeight="700" fill="#232F3E">
          aws
        </text>
        <path d="M10 35 Q40 42 80 35" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M68 28 L80 35 L68 32" fill="#FF9900"/>
      </g>
    </svg>
  );
}
