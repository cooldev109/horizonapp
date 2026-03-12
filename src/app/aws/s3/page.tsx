"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { HardDrive } from "lucide-react";

export default function S3Page() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.aws.s3"
          accent="aws-orange"
          icon={HardDrive}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-aws-orange/20"
          heroImage="/images/cloud-migration.jpg"
          badgeLabel="AWS"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
