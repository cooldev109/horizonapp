"use client";

import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface ServicePageLayoutProps {
  /** Translation key path, e.g. "servicePages.googleCloud.compute" */
  translationKey: string;
  /** Accent color class for the brand, e.g. "gcp-blue", "aws-orange", "blue" */
  accent: string;
  /** Icon component for the hero badge */
  icon: LucideIcon;
  /** Gradient classes for the hero section */
  heroGradient: string;
  /** Optional badge label override */
  badgeLabel?: string;
  /** Background image for the hero section */
  heroImage?: string;
}

export default function ServicePageLayout({
  translationKey,
  accent,
  icon: Icon,
  heroGradient,
  badgeLabel,
  heroImage,
}: ServicePageLayoutProps) {
  const { t, translations } = useI18n();

  // Navigate nested translation object
  const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
    return path.split(".").reduce((acc: unknown, key: string) => {
      if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
      return undefined;
    }, obj);
  };

  const data = getNestedValue(translations, translationKey) as {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    useCases: string[];
  } | undefined;

  if (!data) return null;

  return (
    <>
      <ServiceHero
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        accent={accent}
        icon={Icon}
        heroGradient={heroGradient}
        badgeLabel={badgeLabel}
        heroImage={heroImage}
        backLabel={t("servicePages.backToHome")}
        ctaLabel={t("servicePages.getStarted")}
      />
      <FeaturesSection
        features={data.features}
        title={t("servicePages.features")}
        accent={accent}
      />
      <UseCasesSection
        useCases={data.useCases}
        title={t("servicePages.useCases")}
        accent={accent}
      />
      <WhyChooseSection
        title={t("servicePages.whyChoose")}
        description={t("servicePages.whyChooseDesc")}
        accent={accent}
      />
      <CTASection
        title={t("servicePages.readyToStart")}
        description={t("servicePages.readyToStartDesc")}
        ctaLabel={t("servicePages.contactUs")}
        accent={accent}
      />
    </>
  );
}

function ServiceHero({
  title,
  subtitle,
  description,
  accent,
  icon: Icon,
  heroGradient,
  badgeLabel,
  heroImage,
  backLabel,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  icon: LucideIcon;
  heroGradient: string;
  badgeLabel?: string;
  heroImage?: string;
  backLabel: string;
  ctaLabel: string;
}) {
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden ${heroGradient}`}>
      {heroImage && (
        <>
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </a>

        <div className="max-w-3xl">
          {badgeLabel && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-semibold mb-6`}>
              <Icon size={18} />
              {badgeLabel}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-white/80 font-medium mb-4">
            {subtitle}
          </p>
          <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl">
            {description}
          </p>
          <a
            href="/#contact"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-navy font-semibold rounded-xl hover:bg-white/90 transition-all shadow-xl`}
          >
            {ctaLabel}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({
  features,
  title,
  accent,
}: {
  features: string[];
  title: string;
  accent: string;
}) {
  const ref = useScrollReveal();

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-light via-white to-light">
      {/* Animated floating orbs */}
      <div className={`absolute top-10 right-10 w-80 h-80 bg-${accent}/5 rounded-full blur-3xl orb-slow`} />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal/5 rounded-full blur-3xl orb-reverse" />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-${accent}/3 to-transparent rounded-full blur-3xl`} />

      <div ref={ref} className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-${accent}/15 to-${accent}/5 border border-${accent}/20 text-${accent} text-sm font-semibold mb-5`}>
            <Check size={16} />
            {title}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-4">
            {title}
          </h2>
          <div className={`w-24 h-1.5 bg-gradient-to-r from-${accent} via-${accent}/60 to-teal mx-auto rounded-full gradient-line-animated`} />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 card-stagger">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group luxury-card rounded-3xl p-8 hover:-translate-y-3 transition-all duration-500 cursor-default"
              style={{ "--card-accent": `var(--color-${accent})` } as React.CSSProperties}
            >
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-${accent}/10 to-transparent rounded-bl-[60px] rounded-tr-3xl transition-all duration-500 group-hover:w-32 group-hover:h-32 group-hover:from-${accent}/20`} />

              <div className="relative flex flex-col gap-5">
                {/* Icon with glow */}
                <div className="flex items-center gap-4">
                  <div
                    className={`luxury-icon-wrap w-14 h-14 rounded-2xl bg-gradient-to-br from-${accent} to-${accent}/70 flex items-center justify-center shrink-0 shadow-lg shadow-${accent}/20 transition-all duration-500`}
                    style={{ "--glow-color": `var(--color-${accent})33` } as React.CSSProperties}
                  >
                    <div className="luxury-icon">
                      <Check size={24} className="text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <span className={`feature-number text-5xl font-black text-${accent}/[0.07] group-hover:text-${accent}/[0.12] transition-colors duration-500 select-none leading-none`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Divider */}
                <div className={`w-12 h-0.5 bg-gradient-to-r from-${accent}/40 to-transparent group-hover:w-20 transition-all duration-500`} />

                {/* Text */}
                <p className="text-navy font-semibold leading-relaxed text-[15px] group-hover:text-navy-light transition-colors duration-300">
                  {feature}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({
  useCases,
  title,
  accent,
}: {
  useCases: string[];
  title: string;
  accent: string;
}) {
  const ref = useScrollReveal();

  return (
    <section className={`py-28 relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy`}>
      {/* Animated background orbs */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${accent}/8 rounded-full blur-3xl orb-slow`} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/8 rounded-full blur-3xl orb-reverse" />
      <div className={`absolute top-1/2 right-1/4 w-64 h-64 bg-blue/10 rounded-full blur-3xl orb-slow`} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Shimmer line at top */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />

      <div ref={ref} className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
            {title}
          </h2>
          <div className={`w-28 h-1.5 bg-gradient-to-r from-${accent} via-blue-light to-teal mx-auto rounded-full gradient-line-animated`} />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto card-stagger">
          {useCases.map((useCase, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl p-7 border border-white/[0.08] hover:-translate-y-3 transition-all duration-500 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md cursor-default"
            >
              {/* Shimmer sweep on hover */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:left-[100%] transition-all duration-700" />

              {/* Gradient border on hover */}
              <div className={`absolute inset-0 rounded-3xl border border-transparent group-hover:border-${accent}/30 transition-colors duration-500`} />

              {/* Corner glow */}
              <div className={`absolute -top-4 -right-4 w-20 h-20 bg-${accent}/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative flex items-center gap-5">
                {/* Number badge */}
                <div className={`luxury-icon-wrap w-13 h-13 min-w-[3.25rem] min-h-[3.25rem] rounded-2xl bg-gradient-to-br from-${accent} via-${accent}/80 to-${accent}/50 flex items-center justify-center shrink-0 shadow-lg shadow-${accent}/25 transition-all duration-500`} style={{ "--glow-color": `var(--color-${accent})40` } as React.CSSProperties}>
                  <div className="luxury-icon">
                    <span className="text-white font-bold text-lg">{i + 1}</span>
                  </div>
                </div>

                <span className="text-white/85 font-medium text-[15px] leading-relaxed group-hover:text-white transition-colors duration-300">{useCase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: string;
}) {
  const ref = useScrollReveal();

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-light to-white">
      {/* Subtle background orbs */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-${accent}/3 rounded-full blur-3xl`} />

      <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative icon */}
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-${accent}/15 via-${accent}/10 to-transparent flex items-center justify-center mx-auto mb-8 shadow-sm`}>
          <Check size={32} className={`text-${accent}`} strokeWidth={2.5} />
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-6">
          {title}
        </h2>
        <div className={`w-20 h-1.5 bg-gradient-to-r from-${accent} to-teal mx-auto rounded-full gradient-line-animated mb-8`} />
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}

function CTASection({
  title,
  description,
  ctaLabel,
  accent,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  accent: string;
}) {
  const ref = useScrollReveal();

  return (
    <section className={`py-28 relative overflow-hidden bg-gradient-to-br from-${accent} via-blue to-teal`}>
      {/* Animated orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 orb-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 orb-reverse" />

      {/* Shimmer line at top */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />

      <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
          {title}
        </h2>
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-9 py-4 bg-white text-navy font-bold rounded-xl hover:bg-white/90 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-xl"
          >
            {ctaLabel}
            <ArrowRight size={18} />
          </a>
          <a
            href="https://wa.me/31629485030"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-9 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
