"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Database } from "lucide-react";

export default function CloudStoragePage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.googleCloud.storage"
          accent="gcp-blue"
          icon={Database}
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
