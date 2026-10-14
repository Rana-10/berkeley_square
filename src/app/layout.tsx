import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import { ScrollEnergyProgress } from "@/components/animations/ScrollEnergyProgress";
import { SiteLoader } from "@/components/animations/SiteLoader";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Berkeley Square Capital | Finance, Property & Construction",
    template: "%s | Berkeley Square Capital"
  },
  description: "Premium UK finance, property, and construction services with a modern customer application experience.",
  openGraph: {
    title: "Berkeley Square Capital",
    description: "Finance, property, and construction expertise under one premium brand.",
    type: "website"
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/branding/bsq-emblem-dark.png",
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`light ${sans.variable} ${display.variable}`} data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  root.classList.remove('dark');
                  root.classList.add('light');
                  root.setAttribute('data-theme', 'light');
                  root.style.colorScheme = 'light';
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-legacy-red/40 selection:text-white" suppressHydrationWarning>
        <ThemeProvider>
          <SiteLoader />
          <ScrollEnergyProgress />
          <Header />
          <CookieConsentBanner />
          {children}
          <SiteChrome />
        </ThemeProvider>
      </body>
    </html>
  );
}
