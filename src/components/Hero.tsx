"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative min-h-svh flex items-center overflow-hidden bg-navy">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-100"
        >
          <source src="/videos/pixelbin-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/40 to-transparent" />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 hero-grid" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/20 rounded-full blur-3xl orb-1" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/15 rounded-full blur-3xl orb-2" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber/10 rounded-full blur-3xl orb-1" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 sm:py-32">
        <div className="max-w-2xl">
          {/* Partner badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-in-up opacity-0 delay-100">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/10">
              <GoogleCloudIcon />
              {t("hero.partnerBadge1")}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/10">
              <AWSIcon />
              {t("hero.partnerBadge2")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up opacity-0 delay-200">
            {t("hero.headline")}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mb-10 animate-fade-in-up opacity-0 delay-300">
            {t("hero.subheadline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-400">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue text-white font-semibold rounded-xl hover:bg-blue-light transition-all shadow-lg shadow-blue/30 hover:shadow-xl hover:shadow-blue/40 hover:-translate-y-0.5"
            >
              {t("hero.cta1")}
              <ArrowRight size={18} />
            </a>
            <a
              href="/#services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              {t("hero.cta2")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function GoogleCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12.19 5.88l2.75-2.75.14-.9A9.55 9.55 0 0 0 2.32 8.9l.8-.08 3.6-.6s.18-.3.28-.28a5.94 5.94 0 0 1 5.19-2.06z" fill="#EA4335" />
      <path d="M19.53 8.9a9.61 9.61 0 0 0-2.91-4.67l-2.84 2.84a5.96 5.96 0 0 1 2.18 4.72v.6a2.99 2.99 0 0 1 0 5.96h-5.97l-.6.61v3.58l.6.6h5.97a6.6 6.6 0 0 0 3.57-12.24z" fill="#4285F4" />
      <path d="M3.99 23.14h5.97v-4.8H3.99a2.95 2.95 0 0 1-1.24-.27l-.86.26-2.46 2.46-.21.83a6.56 6.56 0 0 0 4.77 1.52z" fill="#34A853" />
      <path d="M3.99 9.93A6.6 6.6 0 0 0-.78 18.61l3.55-3.55a2.99 2.99 0 1 1 3.95-3.95L10.27 7.56A6.57 6.57 0 0 0 3.99 9.93z" fill="#FBBC05" />
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M6.76 11.3l-.67 2.23-.66-2.23H4.2l1.3 3.72h1.04l.67-2.15.68 2.15h1.04l1.3-3.72h-1.22l-.67 2.23-.66-2.23H6.76z" fill="white" />
      <path d="M13.87 14.03c-.31 0-.47-.23-.47-.56v-1.4h.93v-.77h-.93V10.2h-1.04v1.1h-.56v.77h.56v1.63c0 .78.47 1.32 1.3 1.32.36 0 .66-.1.86-.24l-.28-.72c-.12.07-.25.1-.37.1z" fill="white" />
      <path d="M16.68 13.5c-.35.22-.87.42-1.33.42-.52 0-.77-.22-.77-.5 0-.5.6-.65 1.16-.69h.94v.77zm1.02.85v-2.38c0-.96-.62-1.72-1.85-1.72-.68 0-1.35.2-1.84.52l.38.7c.37-.24.82-.4 1.25-.4.55 0 .82.26.82.67v.3h-.88c-.97.05-1.92.4-1.92 1.42 0 .77.58 1.25 1.38 1.25.56 0 1.02-.22 1.42-.55l.08.47h1.16z" fill="white" />
      <path d="M18.07 16.06c.8.54 1.84.88 2.86.88 2.24 0 3.57-1.18 3.57-1.18l-.6-.86s-1.17.93-2.83.93c-2.02 0-3.48-1.46-3.48-3.48s1.57-3.55 3.4-3.55c1.56 0 2.64.82 2.64.82l.67-.88s-1.24-1.06-3.36-1.06c-2.68 0-4.5 1.96-4.5 4.65 0 2.03 1.14 3.35 1.63 3.73z" fill="#FF9900" />
      <path d="M1.5 16.06c.8.54 1.84.88 2.86.88 2.24 0 3.57-1.18 3.57-1.18l-.6-.86s-1.17.93-2.83.93C2.48 15.83 1.02 14.37 1.02 12.35S2.6 8.8 4.42 8.8c1.56 0 2.64.82 2.64.82l.67-.88S6.49 7.68 4.37 7.68c-2.68 0-4.5 1.96-4.5 4.65 0 2.03 1.14 3.35 1.63 3.73z" fill="#FF9900" />
    </svg>
  );
}
