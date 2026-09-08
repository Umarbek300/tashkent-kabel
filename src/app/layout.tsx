import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { getLocale } from "@/lib/locale-server";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Tashkent Kabel — kabel va qurilish mollari",
  description:
    "Kabel, elektr mollari, sement, g'isht, armatura, kafel, santexnika va asboblar — yetkazib berish bilan.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f05f06",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <Providers initialLocale={locale}>
          <Header />
          <main className="mx-auto w-full max-w-3xl px-3 pt-3 safe-bottom">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
