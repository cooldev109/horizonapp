"use client";

import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import GoogleCloudSection from "@/components/GoogleCloudSection";
import AWSSection from "@/components/AWSSection";
import HowWeWork from "@/components/HowWeWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <GoogleCloudSection />
        <AWSSection />
        <HowWeWork />
        <WhyChooseUs />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </I18nProvider>
  );
}
