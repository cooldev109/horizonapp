"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import Image from "next/image";
import {
  CloudUpload,
  Server,
  GitBranch,
  ShieldCheck,
  Brain,
  Settings,
  ArrowRight,
} from "lucide-react";

const tabKeys = ["migration", "infrastructure", "devops", "security", "ai", "managed"] as const;

const tabIcons = {
  migration: CloudUpload,
  infrastructure: Server,
  devops: GitBranch,
  security: ShieldCheck,
  ai: Brain,
  managed: Settings,
};

const tabImages = {
  migration: "/images/cloud-migration.jpg",
  infrastructure: "/images/server-room.jpg",
  devops: "/images/devops-code.jpg",
  security: "/images/cybersecurity.jpg",
  ai: "/images/ai-brain.jpg",
  managed: "/images/monitoring-dashboard.jpg",
};

const tabLinks = {
  migration: "/services/cloud-migration",
  infrastructure: "/services/cloud-infrastructure",
  devops: "/services/devops",
  security: "/services/cybersecurity",
  ai: "/services/ai-ml",
  managed: "/services/managed-services",
};

const tabColors = {
  migration: "from-blue/10 to-teal/10 border-blue",
  infrastructure: "from-teal/10 to-green/10 border-teal",
  devops: "from-amber/10 to-blue/10 border-amber",
  security: "from-red-500/10 to-amber/10 border-red-500",
  ai: "from-purple-500/10 to-blue/10 border-purple-500",
  managed: "from-green/10 to-teal/10 border-green",
};

const tabAccents = {
  migration: "bg-blue text-white",
  infrastructure: "bg-teal text-white",
  devops: "bg-amber text-navy",
  security: "bg-red-500 text-white",
  ai: "bg-purple-500 text-white",
  managed: "bg-green text-white",
};

export default function Services() {
  const { t } = useI18n();
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState<(typeof tabKeys)[number]>("migration");

  const Icon = tabIcons[activeTab];

  return (
    <section id="services" className="py-24 bg-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Tabs + Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tab buttons */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-72 shrink-0">
            {tabKeys.map((key) => {
              const TabIcon = tabIcons[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-200 ${
                    isActive
                      ? "bg-navy text-white shadow-lg shadow-navy/20"
                      : "bg-light text-navy-light hover:bg-navy/5"
                  }`}
                >
                  <TabIcon size={20} className={isActive ? "text-blue-light" : "text-text-muted"} />
                  <span className="font-semibold text-sm">
                    {t(`services.tabs.${key}.title`)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content area */}
          <div
            key={activeTab}
            className={`flex-1 bg-gradient-to-br ${tabColors[activeTab]} border-l-4 rounded-2xl overflow-hidden tab-content-active`}
          >
            {/* Image */}
            <div className="relative h-48 sm:h-64">
              <Image
                src={tabImages[activeTab]}
                alt={t(`services.tabs.${activeTab}.title`)}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
            </div>

            {/* Text content */}
            <div className="p-8 sm:p-10 -mt-8 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl ${tabAccents[activeTab]} shadow-lg`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-navy">
                  {t(`services.tabs.${activeTab}.title`)}
                </h3>
              </div>
              <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl">
                {t(`services.tabs.${activeTab}.description`)}
              </p>
              <a
                href={tabLinks[activeTab]}
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-light transition-colors"
              >
                {t(`services.tabs.${activeTab}.cta`)}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
