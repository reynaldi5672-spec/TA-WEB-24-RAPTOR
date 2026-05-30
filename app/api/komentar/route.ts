import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destinasiId = searchParams.get('destinasi_id');

    if (destinasiId) {
      const komentar = await prisma.komentar.findMany({
        where: { destinasi_id: parseInt(destinasiId) },
        orderBy: { created_at: 'desc' },
      });
      return NextResponse.json(komentar, { status: 200 });
    } else {
      const komentar = await prisma.komentar.findMany({
        include: { destinasi: true },
        orderBy: { created_at: 'desc' },
      });
      return NextResponse.json(komentar, { status: 200 });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Gagal mengambil komentar';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destinasi_id, nama_user, isi_komentar, rating } = body;

    if (!destinasi_id || !nama_user || !isi_komentar || !rating) {
      return NextResponse.json({ message: 'Semua data wajib diisi!' }, { status: 400 });
    }

    const komentar = await prisma.komentar.create({
      data: {
        destinasi_id: parseInt(destinasi_id),
        nama_user: nama_user || 'Anonim',
        isi_komentar,
        rating: parseInt(rating),
      },
    });

    return NextResponse.json({ message: 'Komentar berhasil dikirim!', data: komentar }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Komentar diperlukan!' }, { status: 400 });
    }

    await prisma.komentar.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Komentar toxic berhasil dimusnahkan!' }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}