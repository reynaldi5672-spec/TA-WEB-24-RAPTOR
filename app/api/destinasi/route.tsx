import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// ==========================================
// 1. READ: Ambil Semua Data Destinasi (GET)
// ==========================================
export async function GET() {
  try {
    const result = await query('SELECT * FROM destinasi ORDER BY id ASC');
    return NextResponse.json(result.rows, { status: 200 });
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
    // Tambahkan "kategori" di destructuring body
    const { nama, lokasi, deskripsi, gambar_url, rating, is_viral, kategori } = body;

    // Masukkan kategori ke dalam query INSERT ($7)
    const result = await query(
      'INSERT INTO destinasi (nama, lokasi, deskripsi, gambar_url, rating, is_viral, kategori) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nama, lokasi, deskripsi, gambar_url, rating, is_viral || false, kategori || 'pantai']
    );

    return NextResponse.json({ message: 'Destinasi berhasil ditambahkan!', data: result.rows[0] }, { status: 201 });
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
    // Tambahkan "kategori" di destructuring body
    const { id, nama, lokasi, deskripsi, gambar_url, rating, is_viral, kategori } = body;

    // Masukkan kategori ke dalam query UPDATE SET kategori = $7
    const result = await query(
      'UPDATE destinasi SET nama = $1, lokasi = $2, deskripsi = $3, gambar_url = $4, rating = $5, is_viral = $6, kategori = $7 WHERE id = $8 RETURNING *',
      [nama, lokasi, deskripsi, gambar_url, rating, is_viral, kategori, id]
    );

    return NextResponse.json({ message: 'Destinasi berhasil diubah!', data: result.rows[0] }, { status: 200 });
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

    const result = await query('DELETE FROM destinasi WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Data tidak ditemukan!' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Destinasi berhasil dihapus!' }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}