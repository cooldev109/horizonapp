"use client";

import { useState } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  Check,
  Mail,
  Calendar,
  HardDrive,
  Video,
  Settings,
  ArrowRight,
  ChevronDown,
  Star,
  TrendingUp,
  Shield,
  Users,
  Cloud,
  Sparkles,
} from "lucide-react";

export default function GoogleWorkspacePage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <WorkspaceHero />
        <PricingPlans />
        <IncludedApps />
        <WhyWorkspace />
        <ExclusiveBenefits />
        <WhyPartner />
        <FAQ />
        <WorkspaceCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}

function WorkspaceHero() {
  const { t } = useI18n();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Google-colored accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-gcp-blue" />
        <div className="flex-1 bg-gcp-red" />
        <div className="flex-1 bg-gcp-yellow" />
        <div className="flex-1 bg-gcp-green" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gcp-blue/10 text-gcp-blue text-sm font-semibold mb-6">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M12.19 5.88l2.75-2.75.14-.9A9.55 9.55 0 0 0 2.32 8.9l.8-.08 3.6-.6s.18-.3.28-.28a5.94 5.94 0 0 1 5.19-2.06z" fill="#EA4335"/>
              <path d="M19.53 8.9a9.61 9.61 0 0 0-2.91-4.67l-2.84 2.84a5.96 5.96 0 0 1 2.18 4.72v.6a2.99 2.99 0 0 1 0 5.96h-5.97l-.6.61v3.58l.6.6h5.97a6.6 6.6 0 0 0 3.57-12.24z" fill="#4285F4"/>
              <path d="M3.99 23.14h5.97v-4.8H3.99a2.95 2.95 0 0 1-1.24-.27l-.86.26-2.46 2.46-.21.83a6.56 6.56 0 0 0 4.77 1.52z" fill="#34A853"/>
              <path d="M3.99 9.93A6.6 6.6 0 0 0-.78 18.61l3.55-3.55a2.99 2.99 0 1 1 3.95-3.95L10.27 7.56A6.57 6.57 0 0 0 3.99 9.93z" fill="#FBBC05"/>
            </svg>
            {t("workspace.nav")}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy mb-4">
            {t("workspace.title")}
          </h1>
          <p className="text-text-muted text-sm mb-4">({t("workspace.formerly")})</p>
          <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            {t("workspace.description")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gcp-blue text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-gcp-blue/25"
            >
              {t("workspace.requestTrial")}
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border text-navy font-semibold rounded-xl hover:bg-light transition-all"
            >
              {t("workspace.contactAdvisor")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingPlans() {
  const { t, translations } = useI18n();
  const ref = useScrollReveal();

  const planKeys = ["starter", "standard", "plus", "enterprise"] as const;
  const planColors = {
    starter: "border-gcp-blue",
    standard: "border-gcp-green",
    plus: "border-gcp-yellow",
    enterprise: "border-gcp-red",
  };
  const planBadgeColors = {
    starter: "bg-gcp-blue",
    standard: "bg-gcp-green",
    plus: "bg-gcp-yellow text-navy",
    enterprise: "bg-gcp-red",
  };

  return (
    <section id="pricing" className="py-24 bg-light">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {planKeys.map((key, i) => {
            const plan = translations.workspace.plans[key];
            const isPopular = key === "standard";
            return (
              <div
                key={key}
                className={`relative bg-white rounded-2xl border-t-4 ${planColors[key]} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${isPopular ? "ring-2 ring-gcp-green/30" : ""}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gcp-green text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Star size={12} />
                    Popular
                  </div>
                )}

                <div className="p-6 pb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-4 ${planBadgeColors[key]}`}>
                    {plan.name}
                  </span>
                  <div className="flex items-baseline gap-1 mb-1">
                    {key !== "enterprise" ? (
                      <>
                        <span className="text-xs text-text-muted">{t("workspace.startingFrom")}</span>
                      </>
                    ) : null}
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-navy">{plan.price}</span>
                    {key !== "enterprise" && (
                      <span className="text-sm text-text-muted">{t("workspace.perMonth")}</span>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature: string, fi: number) => (
                      <li key={fi} className="flex items-start gap-2">
                        <Check size={16} className="text-gcp-green shrink-0 mt-0.5" />
                        <span className="text-sm text-text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#contact"
                    className={`block w-full text-center px-4 py-3 font-semibold rounded-xl transition-all text-sm ${
                      key === "enterprise"
                        ? "bg-navy text-white hover:bg-navy-light"
                        : "bg-gcp-blue text-white hover:opacity-90"
                    }`}
                  >
                    {key === "enterprise" ? t("workspace.contactUs") : t("workspace.hirePlan")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IncludedApps() {
  const { t } = useI18n();
  const ref = useScrollReveal();

  const apps = [
    { key: "gmail", icon: Mail, color: "bg-red-500/10 text-red-500" },
    { key: "calendar", icon: Calendar, color: "bg-gcp-blue/10 text-gcp-blue" },
    { key: "drive", icon: HardDrive, color: "bg-gcp-yellow/10 text-gcp-yellow" },
    { key: "meet", icon: Video, color: "bg-gcp-green/10 text-gcp-green" },
    { key: "admin", icon: Settings, color: "bg-navy/10 text-navy" },
  ] as const;

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-16">
          {t("workspace.apps.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {apps.map(({ key, icon: Icon, color }) => (
            <div
              key={key}
              className="text-center p-6 bg-light rounded-2xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`}>
                <Icon size={26} />
              </div>
              <h3 className="font-bold text-navy mb-2 text-sm">
                {t(`workspace.apps.${key}.name`)}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                {t(`workspace.apps.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyWorkspace() {
  const { t, translations } = useI18n();
  const ref = useScrollReveal();

  const statIcons = {
    revenue: TrendingUp,
    roi: Sparkles,
    gdpr: Shield,
    tickets: Users,
  };

  const statKeys = ["revenue", "roi", "gdpr", "tickets"] as const;

  return (
    <section className="py-24 bg-navy">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-16">
          {t("workspace.whyWorkspace.title")}
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statKeys.map((key) => {
            const stat = translations.workspace.whyWorkspace.stats[key];
            const Icon = statIcons[key];
            return (
              <div key={key} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <Icon size={28} className="text-gcp-yellow mx-auto mb-3" />
                <p className="text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {translations.workspace.whyWorkspace.benefits.map((benefit: string, i: number) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
              <Check size={18} className="text-gcp-green shrink-0" />
              <span className="text-white/80 text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExclusiveBenefits() {
  const { t, translations } = useI18n();
  const ref = useScrollReveal();

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gcp-blue/10 text-gcp-blue text-sm font-semibold mb-6">
          <Star size={16} />
          CloudsHorizon
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-12">
          {t("workspace.exclusive.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {translations.workspace.exclusive.items.map((item: string, i: number) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 bg-light rounded-xl border border-border text-left hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gcp-blue/10 flex items-center justify-center shrink-0">
                <Check size={20} className="text-gcp-blue" />
              </div>
              <span className="font-medium text-navy text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyPartner() {
  const { t, translations } = useI18n();
  const ref = useScrollReveal();

  return (
    <section className="py-24 bg-light">
      <div ref={ref} className="reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-12">
          {t("workspace.whyPartner.title")}
        </h2>

        <div className="space-y-4">
          {translations.workspace.whyPartner.items.map((item: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 bg-white rounded-xl border border-border hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gcp-green/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-gcp-green font-bold text-sm">{i + 1}</span>
              </div>
              <span className="text-text-muted leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { t, translations } = useI18n();
  const ref = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="reveal max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy text-center mb-12">
          {t("workspace.faq.title")}
        </h2>

        <div className="space-y-3">
          {translations.workspace.faq.items.map((item: { q: string; a: string }, i: number) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-light/50 transition-colors"
              >
                <span className="font-semibold text-navy pr-4">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-text-muted shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-text-muted leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspaceCTA() {
  const { t } = useI18n();
  const ref = useScrollReveal();

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gcp-blue via-blue to-teal">
      <div ref={ref} className="reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          {t("workspace.contactAdvisor")}
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          {t("workspace.description")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gcp-blue font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl"
          >
            {t("workspace.requestTrial")}
            <ArrowRight size={18} />
          </a>
          <a
            href="https://wa.me/573162948503"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
