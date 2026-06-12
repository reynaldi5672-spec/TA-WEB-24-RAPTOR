import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Ada pertanyaan atau saran? Hubungi tim VisitBDL atau Dinas Pariwisata Bandar Lampung melalui saluran komunikasi resmi kami.",
  keywords: ["Kontak Wisata Lampung", "Dinas Pariwisata Bandar Lampung", "Buku Tamu Lampung", "Pusat Informasi Wisata"],
};

export default function KontakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
