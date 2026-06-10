import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET: Ambil pesan untuk AdminTable kamu
export async function GET() {
  try {
    const semuaPesan = await prisma.komentar.findMany({
      where: {
        rating: 0, // Indikator bahwa ini pesan kontak jirr
      },
      orderBy: { created_at: "desc" },
    });

    const formatPesan = semuaPesan.map((p: any) => {
      let email = "-";
      let subject = "-";
      let message = p.isi_komentar;

      if (p.isi_komentar.includes("||")) {
        const parts = p.isi_komentar.split("||");
        email = parts[0]?.replace("Email: ", "").trim() || "-";
        subject = parts[1]?.replace("Subjek: ", "").trim() || "-";
        message = parts[2]?.replace("Pesan: ", "").trim() || p.isi_komentar;
      }

      return {
        id: p.id,
        name: p.nama_user || "Anonim",
        email: email,
        subject: subject,
        message: message,
        created_at: p.created_at,
      };
    });

    return NextResponse.json(formatPesan, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil pesan" },
      { status: 500 },
    );
  }
}

// 2. POST: Kirim data dari Form Kontak Luar (Garis merah 'data' udah ilang jirr)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const teksGabungan = `Email: ${body.email} || Subjek: ${body.subject} || Pesan: ${body.message}`;

    const pesanBaru = await prisma.komentar.create({
      data: {
        destinasi_id: 1, // Mengisi kolom wajib biar Prisma GAK MARAH/MERAH lagi jirr!
        nama_user: body.name,
        isi_komentar: teksGabungan,
        rating: 0,
      },
    });

    return NextResponse.json(
      { message: "Pesan berhasil dikirim!", data: pesanBaru },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengirim pesan kontak" },
      { status: 500 },
    );
  }
}

// 3. DELETE: Menghapus pesan di AdminTable
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID diperlukan!" }, { status: 400 });
    }

    await prisma.komentar.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Pesan berhasil dihapus!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus pesan" },
      { status: 500 },
    );
  }
}
