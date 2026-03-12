"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { GitBranch } from "lucide-react";

export default function DevOpsPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.services.devops"
          accent="amber"
          icon={GitBranch}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-amber/20"
          heroImage="/images/devops-code.jpg"
          badgeLabel="CloudsHorizon"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
