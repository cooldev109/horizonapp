"use client";

import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Cpu, Container, BarChart3, Zap, Database, Brain, ArrowRight } from "lucide-react";
import Image from "next/image";

const gcpServices = [
  { key: "compute", icon: Cpu, href: "/google-cloud/compute-engine" },
  { key: "gke", icon: Container, href: "/google-cloud/gke" },
  { key: "bigquery", icon: BarChart3, href: "/google-cloud/bigquery" },
  { key: "cloudrun", icon: Zap, href: "/google-cloud/cloud-run" },
  { key: "storage", icon: Database, href: "/google-cloud/cloud-storage" },
  { key: "aiplatform", icon: Brain, href: "/google-cloud/ai-platform" },
] as const;

export default function GoogleCloudSection() {
  const { t } = useI18n();
  const ref = useScrollReveal();

  return (
    <section id="google-cloud" className="py-24 bg-white overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text + Service cards */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gcp-blue/10 text-gcp-blue text-sm font-semibold mb-6">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M12.19 5.88l2.75-2.75.14-.9A9.55 9.55 0 0 0 2.32 8.9l.8-.08 3.6-.6s.18-.3.28-.28a5.94 5.94 0 0 1 5.19-2.06z" fill="#EA4335"/>
                <path d="M19.53 8.9a9.61 9.61 0 0 0-2.91-4.67l-2.84 2.84a5.96 5.96 0 0 1 2.18 4.72v.6a2.99 2.99 0 0 1 0 5.96h-5.97l-.6.61v3.58l.6.6h5.97a6.6 6.6 0 0 0 3.57-12.24z" fill="#4285F4"/>
                <path d="M3.99 23.14h5.97v-4.8H3.99a2.95 2.95 0 0 1-1.24-.27l-.86.26-2.46 2.46-.21.83a6.56 6.56 0 0 0 4.77 1.52z" fill="#34A853"/>
                <path d="M3.99 9.93A6.6 6.6 0 0 0-.78 18.61l3.55-3.55a2.99 2.99 0 1 1 3.95-3.95L10.27 7.56A6.57 6.57 0 0 0 3.99 9.93z" fill="#FBBC05"/>
              </svg>
              {t("googleCloud.badge")}
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-6">
              {t("googleCloud.title")}
            </h2>

            <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-xl">
              {t("googleCloud.description")}
            </p>

            {/* Service cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {gcpServices.map(({ key, icon: Icon, href }) => (
                <a
                  key={key}
                  href={href}
                  className="group p-4 bg-light rounded-xl border border-border hover:border-gcp-blue/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-gcp-blue/10 flex items-center justify-center mb-2 group-hover:bg-gcp-blue/20 transition-colors">
                    <Icon size={18} className="text-gcp-blue" />
                  </div>
                  <h4 className="font-bold text-navy text-xs mb-0.5">
                    {t(`googleCloud.services.${key}.name`)}
                  </h4>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    {t(`googleCloud.services.${key}.desc`)}
                  </p>
                </a>
              ))}
            </div>

            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gcp-blue text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-gcp-blue/25"
            >
              {t("googleCloud.cta")}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: Image */}
          <div className="flex-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/video.jpg"
                alt="Google Cloud Solutions"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 items-center gap-3 border border-border">
              <div className="w-12 h-12 rounded-lg bg-gcp-blue/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <path d="M12.19 5.88l2.75-2.75.14-.9A9.55 9.55 0 0 0 2.32 8.9l.8-.08 3.6-.6s.18-.3.28-.28a5.94 5.94 0 0 1 5.19-2.06z" fill="#EA4335"/>
                  <path d="M19.53 8.9a9.61 9.61 0 0 0-2.91-4.67l-2.84 2.84a5.96 5.96 0 0 1 2.18 4.72v.6a2.99 2.99 0 0 1 0 5.96h-5.97l-.6.61v3.58l.6.6h5.97a6.6 6.6 0 0 0 3.57-12.24z" fill="#4285F4"/>
                  <path d="M3.99 23.14h5.97v-4.8H3.99a2.95 2.95 0 0 1-1.24-.27l-.86.26-2.46 2.46-.21.83a6.56 6.56 0 0 0 4.77 1.52z" fill="#34A853"/>
                  <path d="M3.99 9.93A6.6 6.6 0 0 0-.78 18.61l3.55-3.55a2.99 2.99 0 1 1 3.95-3.95L10.27 7.56A6.57 6.57 0 0 0 3.99 9.93z" fill="#FBBC05"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted">Certified</p>
                <p className="text-sm font-bold text-navy">Google Cloud Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
