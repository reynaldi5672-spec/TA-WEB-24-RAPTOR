import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import instance Prisma Client global kita jirr

// ==========================================
// 1. READ: Ambil Komentar (GET)
// ==========================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destinasiId = searchParams.get('destinasi_id');

    let komentar;

    if (destinasiId) {
      // Ambil komentar berdasarkan destinasi_id tertentu
      komentar = await prisma.komentar.findMany({
        where: { destinasi_id: Number(destinasiId) },
        orderBy: { created_at: 'desc' },
      });
    } else {
      // Trik JOIN Prisma: Ambil semua komentar + nama destinasi-nya
      const result = await prisma.komentar.findMany({
        include: {
          destinasi: {
            select: { nama: true }, // Cuma ambil kolom 'nama' dari tabel destinasi
          },
        },
        orderBy: { created_at: 'desc' },
      });

      // Format ulang datanya biar strukturnya mirip kodingan lamo (k.nama_destinasi)
      komentar = result.map((k) => ({
        id: k.id,
        destinasi_id: k.destinasi_id,
        nama_user: k.nama_user,
        isi_komentar: k.isi_komentar,
        rating: k.rating,
        created_at: k.created_at,
        nama_destinasi: k.destinasi?.nama || 'Destinasi Tidak Diketahui',
      }));
    }

    return NextResponse.json(komentar, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Gagal mengambil komentar';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// ==========================================
// 2. CREATE: Tambah Komentar Baru (POST)
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destinasi_id, nama_user, isi_komentar, rating } = body;

    if (!destinasi_id || !nama_user || !isi_komentar || !rating) {
      return NextResponse.json({ message: 'Semua data wajib diisi!' }, { status: 400 });
    }

    // Pakai Prisma create untuk masukin review/rating baru
    const newKomentar = await prisma.komentar.create({
      data: {
        destinasi_id: Number(destinasi_id), // Pastikan Int
        nama_user: nama_user || 'Anonim',
        isi_komentar,
        rating: Number(rating), // Pastikan Int
      },
    });

    return NextResponse.json({ message: 'Komentar berhasil dikirim!', data: newKomentar }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// ==========================================
// 3. DELETE: Memusnahkan Komentar Toxic (DELETE)
// ==========================================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Komentar diperlukan!' }, { status: 400 });
    }

    // Eksekusi delete pakai Prisma berdasarkan ID komentar
    await prisma.komentar.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Komentar toxic berhasil dimusnahkan!' }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}