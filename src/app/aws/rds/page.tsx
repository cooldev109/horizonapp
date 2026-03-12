"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Database } from "lucide-react";

export default function RDSPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.aws.rds"
          accent="aws-orange"
          icon={Database}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-aws-orange/20"
          heroImage="/images/monitoring-dashboard.jpg"
          badgeLabel="AWS"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
