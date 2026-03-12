"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";
import { Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();

  const serviceKeys = ["migration", "infrastructure", "devops", "security", "ai", "managed"] as const;
  const serviceLinks: Record<string, string> = {
    migration: "/services/cloud-migration",
    infrastructure: "/services/cloud-infrastructure",
    devops: "/services/devops",
    security: "/services/cybersecurity",
    ai: "/services/ai-ml",
    managed: "/services/managed-services",
  };
  const companyKeys = ["about", "partners", "contact", "careers"] as const;

  return (
    <footer className="bg-navy pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <Image
              src="/images/logo.png"
              alt="CloudsHorizon Consulting"
              width={160}
              height={45}
              className="h-10 w-auto mb-5 brightness-200"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-blue hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-red-500 hover:text-white transition-all"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.servicesTitle")}</h4>
            <ul className="space-y-3">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <a
                    href={serviceLinks[key]}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {t(`footer.services.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.companyTitle")}</h4>
            <ul className="space-y-3">
              {companyKeys.map((key) => (
                <li key={key}>
                  <a
                    href={`/#${key === "about" ? "home" : key}`}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {t(`footer.company.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.connectTitle")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+19048308747" className="text-white/60 text-sm hover:text-white transition-colors">
                  {t("contact.info.phone")}
                </a>
              </li>
              <li>
                <a href="https://wa.me/31629485030" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-white transition-colors">
                  WhatsApp: {t("contact.info.whatsapp")}
                </a>
              </li>
              <li>
                <a href="mailto:amazabael@cloudshorizon.com" className="text-white/60 text-sm hover:text-white transition-colors">
                  {t("contact.info.email")}
                </a>
              </li>
              <li className="text-white/60 text-sm">
                {t("contact.info.location")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
