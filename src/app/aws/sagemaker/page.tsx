"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Brain } from "lucide-react";

export default function SageMakerPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.aws.sagemaker"
          accent="aws-orange"
          icon={Brain}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-aws-orange/20"
          heroImage="/images/ai-brain.jpg"
          badgeLabel="AWS"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
