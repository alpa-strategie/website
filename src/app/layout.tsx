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
  title: "Baptiste Leroux - IT Leadership & Global Delivery Consultant | ALPA Stratégie",
  description: "20+ years international expertise in digital transformation, offshoring strategy, and SaaS development. Executive IT consultant helping scale teams from 4 to 50+ people with $5M+ P&L experience across 10+ countries.",
  keywords: 'IT consultant, digital transformation, offshoring strategy, global software delivery, CTO services, enterprise architecture, SaaS development, PMO services, cultural bridge expertise, international team management, executive IT leadership, startup to enterprise scaling',
  authors: [{ name: 'Baptiste Leroux' }],
  openGraph: {
    title: 'Baptiste Leroux - IT Leadership & Global Delivery Consultant',
    description: 'Executive IT consultant with 20+ years international experience. Proven track record scaling teams 4→50+ people, $5M+ revenue, 100+ projects across 10+ countries.',
    url: 'https://www.alpa-strategie.com',
    siteName: 'ALPA Stratégie',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baptiste Leroux - IT Leadership & Global Delivery Consultant',
    description: 'Executive IT consultant with 20+ years international experience. Proven track record scaling teams 4→50+ people, $5M+ revenue.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.alpa-strategie.com',
    languages: {
      'en-US': 'https://www.alpa-strategie.com',
      'fr-FR': 'https://www.alpa-strategie.com/fr',
    },
  },
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
