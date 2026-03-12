"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Brain } from "lucide-react";

export default function AIPlatformPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.googleCloud.aiplatform"
          accent="gcp-blue"
          icon={Brain}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-gcp-blue/30"
          heroImage="/images/ai-brain.jpg"
          badgeLabel="Google Cloud"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
