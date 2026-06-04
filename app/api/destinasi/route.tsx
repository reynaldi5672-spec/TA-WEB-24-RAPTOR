import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 1. Arahkan import ke file singleton prisma kita jirr!

// ==========================================
// 1. READ: Ambil Semua Data Destinasi (GET)
// ==========================================
export async function GET() {
  try {
    // Pakai Prisma findMany, auto rapi tanpa ribet rows.rows
    const destinasi = await prisma.destinasi.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(destinasi, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// ==========================================
// 2. CREATE: Tambah Destinasi Baru (POST)
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, lokasi, deskripsi, gambar_url, rating, is_viral, kategori } = body;

    // Pakai Prisma create, gak perlu nulis $1, $2, $3 lagi jirr!
    const newDestinasi = await prisma.destinasi.create({
      data: {
        nama,
        lokasi,
        deskripsi,
        gambar_url,
        rating: rating ? Number(rating) : 4.5, // Mastiin tipe data Decimal/Float aman
        is_viral: is_viral ?? false,
        kategori: kategori ?? 'pantai',
      },
    });

    return NextResponse.json({ message: 'Destinasi berhasil ditambahkan!', data: newDestinasi }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// ==========================================
// 3. UPDATE: Edit Data Destinasi (PUT)
// ==========================================
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, nama, lokasi, deskripsi, gambar_url, rating, is_viral, kategori } = body;

    // Pakai Prisma update berdasarkan ID
    const updatedDestinasi = await prisma.destinasi.update({
      where: { id: Number(id) }, // ID wajib dikonversi ke Number sesuai tipe di skema
      data: {
        nama,
        lokasi,
        deskripsi,
        gambar_url,
        rating: rating ? Number(rating) : undefined,
        is_viral: is_viral ?? undefined,
        kategori: kategori ?? undefined,
      },
    });

    return NextResponse.json({ message: 'Destinasi berhasil diubah!', data: updatedDestinasi }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// ==========================================
// 4. DELETE: Hapus Data Destinasi (DELETE)
// ==========================================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID diperlukan!' }, { status: 400 });
    }

    // Pakai Prisma delete berdasarkan ID
    await prisma.destinasi.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Destinasi berhasil dihapus!' }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}