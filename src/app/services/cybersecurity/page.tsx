"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { ShieldCheck } from "lucide-react";

export default function CybersecurityPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.services.security"
          accent="blue"
          icon={ShieldCheck}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-red-500/20"
          heroImage="/images/cybersecurity.jpg"
          badgeLabel="CloudsHorizon"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
