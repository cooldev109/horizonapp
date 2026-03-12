"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";

type DropdownKey = "googleCloud" | "aws" | "cybersecurity" | null;

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const gcpDropdownItems = [
    { label: t("workspace.nav"), href: "/google-workspace", highlight: true },
    { label: t("googleCloud.services.compute.name"), href: "/google-cloud/compute-engine" },
    { label: t("googleCloud.services.gke.name"), href: "/google-cloud/gke" },
    { label: t("googleCloud.services.bigquery.name"), href: "/google-cloud/bigquery" },
    { label: t("googleCloud.services.cloudrun.name"), href: "/google-cloud/cloud-run" },
    { label: t("googleCloud.services.storage.name"), href: "/google-cloud/cloud-storage" },
    { label: t("googleCloud.services.aiplatform.name"), href: "/google-cloud/ai-platform" },
  ];

  const awsDropdownItems = [
    { label: t("aws.services.ec2.name"), href: "/aws/ec2" },
    { label: t("aws.services.lambda.name"), href: "/aws/lambda" },
    { label: t("aws.services.s3.name"), href: "/aws/s3" },
    { label: t("aws.services.rds.name"), href: "/aws/rds" },
    { label: t("aws.services.eks.name"), href: "/aws/eks" },
    { label: t("aws.services.sagemaker.name"), href: "/aws/sagemaker" },
  ];

  const cyberDropdownItems = [
    { label: t("services.tabs.security.title"), href: "/services/cybersecurity" },
    { label: t("services.tabs.migration.title"), href: "/services/cloud-migration" },
    { label: t("services.tabs.infrastructure.title"), href: "/services/cloud-infrastructure" },
    { label: t("services.tabs.devops.title"), href: "/services/devops" },
    { label: t("services.tabs.ai.title"), href: "/services/ai-ml" },
    { label: t("services.tabs.managed.title"), href: "/services/managed-services" },
  ];

  const dropdownMenus: { key: DropdownKey; label: string; href: string; items: { label: string; href: string; highlight?: boolean }[]; accent: string }[] = [
    { key: "googleCloud", label: t("nav.googleCloud"), href: "/#google-cloud", items: gcpDropdownItems, accent: "bg-gcp-blue" },
    { key: "aws", label: t("nav.aws"), href: "/#aws", items: awsDropdownItems, accent: "bg-aws-orange" },
    { key: "cybersecurity", label: t("nav.services"), href: "/#services", items: cyberDropdownItems, accent: "bg-blue" },
  ];

  const simpleLinks = [
    { label: t("nav.home"), href: "/" },
  ];

  const rightLinks = [
    { label: t("nav.partners"), href: "/#partners" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  const linkClass = () =>
    "px-3 py-2 text-sm font-medium rounded-lg transition-colors text-navy-light hover:text-blue hover:bg-blue/5";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="CloudsHorizon Consulting"
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Home */}
            {simpleLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClass()}>
                {link.label}
              </a>
            ))}

            {/* Dropdown menus: Google Cloud, AWS, Services */}
            {dropdownMenus.map((menu) => (
              <div
                key={menu.key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(menu.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => setOpenDropdown(openDropdown === menu.key ? null : menu.key)}
                  className={`${linkClass()} flex items-center gap-1`}
                >
                  {menu.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === menu.key ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 pt-2 w-60 transition-all duration-200 ${
                    openDropdown === menu.key
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-border overflow-hidden">
                    {/* Accent bar at top */}
                    <div className={`h-1 ${menu.accent}`} />
                    <div className="py-2">
                      {menu.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            item.highlight
                              ? "text-gcp-blue font-semibold hover:bg-gcp-blue/10 border-b border-border mb-1"
                              : "text-navy-light hover:bg-blue/5 hover:text-blue"
                          }`}
                        >
                          {item.label}
                          {item.highlight && <span className="ml-1 text-[10px] text-gcp-green font-bold align-super">NEW</span>}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Partners, Contact */}
            {rightLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClass()}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "en" ? "es" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-navy-light hover:bg-blue/5"
            >
              <Globe size={16} />
              {locale === "en" ? "ES" : "EN"}
            </button>
            <a
              href="/#contact"
              className="px-5 py-2.5 bg-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-light transition-colors shadow-lg shadow-blue/25"
            >
              {t("nav.getQuote")}
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === "en" ? "es" : "en")}
              className="p-2 rounded-lg text-navy"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-navy"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-white z-40 transition-all duration-300 overflow-y-auto ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-1">
          {/* Home */}
          <a
            href="/"
            className="block px-4 py-3 text-lg font-medium text-navy-light hover:bg-blue/5 rounded-lg transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.home")}
          </a>

          {/* Dropdown sections */}
          {dropdownMenus.map((menu) => (
            <div key={menu.key}>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === menu.key ? null : menu.key)}
                className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-navy-light hover:bg-blue/5 rounded-lg transition-colors"
              >
                {menu.label}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${mobileExpanded === menu.key ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileExpanded === menu.key ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-6 pb-2 space-y-0.5">
                  {menu.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-base text-text-muted hover:text-blue hover:bg-blue/5 rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Partners, Contact */}
          {rightLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-lg font-medium text-navy-light hover:bg-blue/5 rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* CTA */}
          <div className="pt-4 border-t border-border mt-4">
            <a
              href="/#contact"
              className="block w-full text-center px-5 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-light transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.getQuote")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
