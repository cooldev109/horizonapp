"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Container } from "lucide-react";

export default function GKEPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.googleCloud.gke"
          accent="gcp-blue"
          icon={Container}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-gcp-blue/30"
          heroImage="/images/devops-code.jpg"
          badgeLabel="Google Cloud"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
