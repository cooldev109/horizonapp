"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Code } from "lucide-react";

export default function LambdaPage() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.aws.lambda"
          accent="aws-orange"
          icon={Code}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-aws-orange/20"
          heroImage="/images/devops-code.jpg"
          badgeLabel="AWS"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
