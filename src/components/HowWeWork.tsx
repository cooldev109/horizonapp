"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";
import Image from "next/image";

const steps = [
  { key: "discovery", icon: Search, number: "01", color: "bg-blue" },
  { key: "architecture", icon: PenTool, number: "02", color: "bg-teal" },
  { key: "implementation", icon: Rocket, number: "03", color: "bg-amber" },
  { key: "optimize", icon: TrendingUp, number: "04", color: "bg-green" },
] as const;

export default function HowWeWork() {
  const { t } = useI18n();
  const ref = useScrollReveal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-light">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-4">
            {t("howWeWork.title")}
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("howWeWork.subtitle")}
          </p>
        </div>

        {/* Desktop: Image + Steps layout */}
        <div className="hidden md:flex gap-12 items-start">
          {/* Left: Team image */}
          <div className="w-2/5 shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl sticky top-28">
              <Image
                src="/images/team-meeting.jpg"
                alt="Our team at work"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-lg">CloudsHorizon Team</p>
                <p className="text-white/70 text-sm">Delivering cloud excellence</p>
              </div>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="flex-1">
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-10 relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
              <div
                className="absolute top-6 left-0 h-0.5 bg-blue transition-all duration-500"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i <= activeStep;
                return (
                  <button
                    key={step.key}
                    onClick={() => setActiveStep(i)}
                    className="relative z-10 flex flex-col items-center gap-3 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? `${step.color} text-white shadow-lg`
                          : "bg-white text-text-muted border-2 border-border"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive ? "text-navy" : "text-text-muted"
                      }`}
                    >
                      {step.number}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step content */}
            <div
              key={activeStep}
              className="bg-white rounded-2xl p-10 shadow-sm border border-border tab-content-active"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-xl ${steps[activeStep].color} text-white shrink-0`}>
                  {(() => {
                    const Icon = steps[activeStep].icon;
                    return <Icon size={28} />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-3">
                    {t(`howWeWork.steps.${steps[activeStep].key}.title`)}
                  </h3>
                  <p className="text-text-muted text-lg leading-relaxed">
                    {t(`howWeWork.steps.${steps[activeStep].key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Steps only */}
        <div className="md:hidden space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="bg-white rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${step.color} text-white`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-bold text-navy">
                      {t(`howWeWork.steps.${step.key}.title`)}
                    </h3>
                  </div>
                </div>
                <p className="text-text-muted leading-relaxed">
                  {t(`howWeWork.steps.${step.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
