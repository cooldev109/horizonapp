import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CloudsHorizon Consulting | Google Cloud & AWS Partner",
  description:
    "CloudsHorizon is an IT cloud consulting firm specializing in Google Cloud and AWS solutions. Cloud migration, infrastructure, DevOps, cybersecurity, AI/ML, and managed services.",
  keywords: [
    "cloud consulting",
    "Google Cloud Partner",
    "AWS Partner",
    "cloud migration",
    "DevOps",
    "cybersecurity",
    "cloud infrastructure",
    "managed services",
  ],
  openGraph: {
    title: "CloudsHorizon Consulting | Google Cloud & AWS Partner",
    description:
      "We help businesses migrate, optimize, and scale on Google Cloud and AWS.",
    type: "website",
    url: "https://cloudshorizon.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
