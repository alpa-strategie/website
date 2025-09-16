import type { Metadata } from "next";
import Script from 'next/script'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baptiste Leroux - IT Leadership & Digital Transformation Consultant",
  description: "20+ years of international expertise in digital transformation, global software delivery, and IT strategy consulting. Transform your digital future.",
  keywords: 'IT consultant, digital transformation, software delivery, CTO services, enterprise architecture',
  authors: [{ name: 'Baptiste Leroux' }],
  openGraph: {
    title: 'Baptiste Leroux - IT Leadership Consultant',
    description: '20+ years of international expertise in digital transformation and IT strategy consulting.',
    url: 'https://www.alpa-strategie.com',
    siteName: 'ALPA Strategie',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baptiste Leroux - IT Leadership Consultant',
    description: '20+ years of international expertise in digital transformation and IT strategy consulting.',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
