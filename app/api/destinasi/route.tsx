import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ==========================================
// 1. READ: Ambil Semua Data Destinasi (GET)
// ==========================================
export async function GET() {
  try {
    const destinasi = await prisma.destinasi.findMany({
      orderBy: { id: 'asc' },
      include: { komentar: true },
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

    if (!nama || !lokasi || !deskripsi) {
      return NextResponse.json({ message: 'Nama, lokasi, dan deskripsi wajib diisi!' }, { status: 400 });
    }

    const destinasi = await prisma.destinasi.create({
      data: {
        nama,
        lokasi,
        deskripsi,
        gambar_url: gambar_url || null,
        rating: parseFloat(rating) || 0,
        is_viral: is_viral || false,
        kategori: kategori || 'pantai',
      },
    });

    return NextResponse.json({ message: 'Destinasi berhasil ditambahkan!', data: destinasi }, { status: 201 });
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

    if (!id) {
      return NextResponse.json({ message: 'ID destinasi diperlukan!' }, { status: 400 });
    }

    const destinasi = await prisma.destinasi.update({
      where: { id: parseInt(id) },
      data: {
        nama,
        lokasi,
        deskripsi,
        gambar_url: gambar_url || null,
        rating: parseFloat(rating) || 0,
        is_viral,
        kategori,
      },
    });

    return NextResponse.json({ message: 'Destinasi berhasil diubah!', data: destinasi }, { status: 200 });
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

    await prisma.destinasi.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Destinasi berhasil dihapus!' }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}