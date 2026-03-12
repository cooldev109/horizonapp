"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Server } from "lucide-react";

export default function CloudInfrastructurePage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.services.infrastructure"
          accent="teal"
          icon={Server}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-teal/30"
          heroImage="/images/server-room.jpg"
          badgeLabel="CloudsHorizon"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
