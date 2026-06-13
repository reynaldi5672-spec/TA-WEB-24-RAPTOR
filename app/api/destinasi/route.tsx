import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Handles GET requests to retrieve all destinations.
 * Data is ordered by ID in ascending order and includes associated comments.
 * 
 * @returns {Promise<NextResponse>} JSON response containing the list of destinations or an error message.
 */
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

/**
 * Handles POST requests to create a new destination.
 * Validates required fields (nama, lokasi, deskripsi).
 * 
 * @param {Request} request - The incoming HTTP request containing the destination data in the body.
 * @returns {Promise<NextResponse>} JSON response containing the created destination or an error message.
 */
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

/**
 * Handles PUT requests to update an existing destination.
 * Requires the destination ID to be present in the request body.
 * 
 * @param {Request} request - The incoming HTTP request containing updated destination data and ID.
 * @returns {Promise<NextResponse>} JSON response containing the updated destination or an error message.
 */
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

/**
 * Handles DELETE requests to remove a destination from the database.
 * Expects the destination ID as a query parameter (e.g., ?id=123).
 * 
 * @param {Request} request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} JSON response indicating success or an error message.
 */
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