import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// IMPORT THEME PROVIDER GLOBAL
import { ThemeProvider } from "./context/ThemeContext";
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
  title: "WISATA BANDAR LAMPUNG - Destinasi Wisata Lampung",
  description: "Eksplorasi petualangan bahari dan pariwisata urban terbaik di Bandar Lampung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* BUNGKUS CHILDREN DENGAN THEMEPROVIDER DI DALAM BODY */}
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}