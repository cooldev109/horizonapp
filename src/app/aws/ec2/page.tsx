"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageLayout from "@/components/ServicePageLayout";
import { Server } from "lucide-react";

export default function EC2Page() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <ServicePageLayout
          translationKey="servicePages.aws.ec2"
          accent="aws-orange"
          icon={Server}
          heroGradient="bg-gradient-to-br from-navy via-navy-light to-aws-orange/20"
          heroImage="/images/server-room.jpg"
          badgeLabel="AWS"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
