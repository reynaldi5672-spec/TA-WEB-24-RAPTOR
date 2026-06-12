import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinasi Wisata",
  description: "Jelajahi berbagai destinasi wisata menarik di Bandar Lampung, mulai dari pantai eksotis hingga wisata bukit yang mempesona.",
  keywords: ["Destinasi Lampung", "Daftar Wisata Bandar Lampung", "Pantai Pahawang", "Pulau Mahitam", "Gigi Hiu"],
};

export default function DestinasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
