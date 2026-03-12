"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { BarChart3 } from "lucide-react";

export default function BigQueryPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.googleCloud.bigquery"
          accent="gcp-blue"
          icon={BarChart3}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-gcp-blue/30"
          heroImage="/images/monitoring-dashboard.jpg"
          badgeLabel="Google Cloud"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
