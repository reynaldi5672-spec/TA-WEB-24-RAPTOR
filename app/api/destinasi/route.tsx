import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Pastikan path lib/db kamu benar

export async function GET() {
  try {
    // Ambil semua data destinasi dari database lpg_dest_db
    const result = await query('SELECT * FROM destinasi ORDER BY id ASC');
    
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data destinasi' }, { status: 500 });
  }
}