"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { CloudUpload } from "lucide-react";

export default function CloudMigrationPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.services.migration"
          accent="blue"
          icon={CloudUpload}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-blue/30"
          heroImage="/images/cloud-migration.jpg"
          badgeLabel="CloudsHorizon"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
