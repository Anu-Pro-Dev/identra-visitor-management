import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TranslationProvider from "@/providers/TranslationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Identra - Visitor Management System",
  description: "Professional visitor management and tracking system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased theme-transition`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <TranslationProvider>{children}</TranslationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
