import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Cek apakah username sudah ada
    const existingUser = await query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: 'Username sudah terdaftar' }, { status: 400 });
    }

    // Simpan user baru (Role default: admin)
    // Tips: Untuk joki pro, idealnya password di-hash dulu pakai bcrypt
    await query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
      [username, password, 'admin']
    );

    return NextResponse.json({ message: 'Registrasi Berhasil' }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}