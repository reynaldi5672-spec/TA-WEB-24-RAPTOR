import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destinasiId = searchParams.get('destinasi_id');

    let result;
    if (destinasiId) {
      result = await query(
        'SELECT * FROM komentar WHERE destinasi_id = $1 ORDER BY created_at DESC',
        [destinasiId]
      );
    } else {
      result = await query(
        `SELECT k.*, d.nama as nama_destinasi 
         FROM komentar k 
         JOIN destinasi d ON k.destinasi_id = d.id 
         ORDER BY k.created_at DESC`
      );
    }
    return NextResponse.json(result.rows, { status: 200 });
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

    const result = await query(
      `INSERT INTO komentar (destinasi_id, nama_user, isi_komentar, rating) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [destinasi_id, nama_user || 'Anonim', isi_komentar, rating]
    );

    return NextResponse.json({ message: 'Komentar berhasil dikirim!', data: result.rows[0] }, { status: 201 });
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

    const result = await query('DELETE FROM komentar WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Komentar tidak ditemukan!' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Komentar toxic berhasil dimusnahkan!' }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}