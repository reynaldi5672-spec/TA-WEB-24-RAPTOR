import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// IMPORT THEME PROVIDER GLOBAL
import { ThemeProvider } from "./context/ThemeContext";
import BackToTop from "@/app/components/BackToTop";
import ScrollProgress from "@/app/components/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "WISATA BANDAR LAMPUNG - Portal Destinasi Wisata Terlengkap",
    template: "%s | Wisata Bandar Lampung"
  },
  description: "Panduan pariwisata resmi Bandar Lampung. Eksplorasi destinasi bahari, kuliner legendaris, dan cagar alam terbaik di pintu gerbang Pulau Sumatra.",
  keywords: ["Wisata Lampung", "Bandar Lampung", "Pantai Lampung", "Pahawang", "Kuliner Lampung", "Liburan Sumatra", "Wisata Hits", "Destinasi Terbaru BDL"],
  authors: [{ name: "Dinas Pariwisata Bandar Lampung", url: "https://wisatabandarlampung.go.id" }],
  creator: "Tim TA-WEB-24-RAPTOR",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://wisatabandarlampung.go.id",
    title: "WISATA BANDAR LAMPUNG - Portal Destinasi Wisata Terlengkap",
    description: "Jelajahi keindahan tersembunyi Bandar Lampung. Panduan perjalanan, destinasi unggulan, dan info cuaca real-time.",
    siteName: "Wisata Bandar Lampung",
    images: [
      {
        url: "/next.svg", // Fallback image
        width: 1200,
        height: 630,
        alt: "Wisata Bandar Lampung Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WISATA BANDAR LAMPUNG",
    description: "Panduan pariwisata resmi Bandar Lampung. Eksplorasi destinasi terbaik sekarang.",
    images: ["/next.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
          <ScrollProgress />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}