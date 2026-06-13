import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Handles GET requests to retrieve contact messages.
 * Filters the 'komentar' table for entries with rating 0 (indicator for contact messages).
 * Parses the structured 'isi_komentar' string to extract email, subject, and actual message.
 * 
 * @returns {Promise<NextResponse>} JSON response containing the formatted list of contact messages.
 */
export async function GET() {
  try {
    const semuaPesan = await prisma.komentar.findMany({
      where: {
        rating: 0, 
      },
      orderBy: { created_at: "desc" },
    });

    /**
     * Maps and parses raw message strings into a structured format for the admin dashboard.
     */
    const formatPesan = semuaPesan.map((p: any) => {
      let email = "-";
      let subject = "-";
      let message = p.isi_komentar;

      // Parsing logic for combined text strings using '||' delimiter.
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

/**
 * Handles POST requests to submit a new contact message.
 * Combines form fields into a single 'isi_komentar' string and stores it in the 'komentar' table.
 * 
 * @param {Request} request - The incoming HTTP request containing contact form data.
 * @returns {Promise<NextResponse>} JSON response containing the created message or an error.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Combine fields into a single string for storage in a shared table.
    const teksGabungan = `Email: ${body.email} || Subjek: ${body.subject} || Pesan: ${body.message}`;

    const pesanBaru = await prisma.komentar.create({
      data: {
        destinasi_id: 1, // Fallback ID to satisfy foreign key constraints.
        nama_user: body.name,
        isi_komentar: teksGabungan,
        rating: 0, // Using rating 0 as a flag for contact messages.
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

/**
 * Handles DELETE requests to remove a specific contact message.
 * 
 * @param {Request} request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response indicating success or failure.
 */
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
