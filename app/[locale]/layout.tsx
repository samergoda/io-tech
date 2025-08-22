import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "../../lib/redux/provider";
import { DM_Sans } from "next/font/google";
import Footer from "@/components/layout/footer";
import RootProviders from "@/components/providers";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "IO Tech",
  description: "IO Tech - IT Solutions and Services",
};

const DM_font = DM_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
} & { params: { locale: string } };

export default function LocaleLayout({ params: { locale }, children }: LocaleLayoutProps) {
  // Check if the locale is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${DM_font.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <Providers>
            <RootProviders>
              {/* Navbar */}
              <Navbar />

              {/* Main content */}
              {children}

              {/* Footer */}
              <Footer />
            </RootProviders>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
