"use client";

import { useI18n } from "@/lib/i18n";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Server, Code, HardDrive, Database, Container, Brain, ArrowRight } from "lucide-react";
import Image from "next/image";

const awsServices = [
  { key: "ec2", icon: Server, href: "/aws/ec2" },
  { key: "lambda", icon: Code, href: "/aws/lambda" },
  { key: "s3", icon: HardDrive, href: "/aws/s3" },
  { key: "rds", icon: Database, href: "/aws/rds" },
  { key: "eks", icon: Container, href: "/aws/eks" },
  { key: "sagemaker", icon: Brain, href: "/aws/sagemaker" },
] as const;

export default function AWSSection() {
  const { t } = useI18n();
  const ref = useScrollReveal();

  return (
    <section id="aws" className="py-24 bg-navy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aws-orange/20 to-transparent" />
      </div>

      <div ref={ref} className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Left: Image */}
          <div className="flex-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/awswhole.jpg"
                alt="AWS Solutions"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-navy-light rounded-xl shadow-xl p-4 flex items-center gap-3 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-aws-orange/20 flex items-center justify-center">
                <svg viewBox="0 0 40 24" width="32" height="20">
                  <text x="2" y="18" fontFamily="Arial" fontSize="18" fontWeight="700" fill="#FF9900">aws</text>
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/60">Certified</p>
                <p className="text-sm font-bold text-white">AWS Partner</p>
              </div>
            </div>
          </div>

          {/* Right: Text + Service cards */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aws-orange/20 text-aws-orange text-sm font-semibold mb-6">
              <svg viewBox="0 0 40 24" width="24" height="14">
                <text x="0" y="16" fontFamily="Arial" fontSize="16" fontWeight="700" fill="#FF9900">aws</text>
              </svg>
              {t("aws.badge")}
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              {t("aws.title")}
            </h2>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              {t("aws.description")}
            </p>

            {/* Service cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {awsServices.map(({ key, icon: Icon, href }) => (
                <a
                  key={key}
                  href={href}
                  className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-aws-orange/30 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-aws-orange/20 flex items-center justify-center mb-2 group-hover:bg-aws-orange/30 transition-colors">
                    <Icon size={18} className="text-aws-orange" />
                  </div>
                  <h4 className="font-bold text-white text-xs mb-0.5">
                    {t(`aws.services.${key}.name`)}
                  </h4>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    {t(`aws.services.${key}.desc`)}
                  </p>
                </a>
              ))}
            </div>

            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-aws-orange text-navy font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-aws-orange/25"
            >
              {t("aws.cta")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
