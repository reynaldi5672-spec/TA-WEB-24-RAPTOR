import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Bantu Travel",
  description: "Rencanakan liburan Anda dengan cerdas menggunakan Travel Planner. Hitung estimasi biaya, siapkan daftar barang bawaan, dan temukan destinasi yang sesuai dengan kepribadian Anda.",
  keywords: ["Travel Planner Lampung", "Estimasi Biaya Wisata", "Daftar Bawaan Liburan", "Kuis Wisata", "Asisten Virtual Wisata"],
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
