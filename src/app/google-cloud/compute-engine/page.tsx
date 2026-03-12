"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Cpu } from "lucide-react";

export default function ComputeEnginePage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.googleCloud.compute"
          accent="gcp-blue"
          icon={Cpu}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-gcp-blue/30"
          heroImage="/images/server-room.jpg"
          badgeLabel="Google Cloud"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
