import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: "Company Tech Stack Explorer",
  description: `Build a Company Tech Stack Explorer — a tool that helps WorkXplorer students research potential employers by analyzing their public GitHub presence. A student types a company's GitHub organization name, and the app fetches that org's public repositories, aggregates the programming languages used across all repos, and renders a clean tech stack profile card.`,
  icons: {
    icon: `https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg`,
  },
};
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  if (typeof window !== "undefined") {
    return null;
  }
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={cn(
        "h-full",
        "antialiased",
        "font-mono",
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}