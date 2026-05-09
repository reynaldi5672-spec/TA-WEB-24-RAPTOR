// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const res = await query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (res.rows.length > 0) {
      // Pastikan statusnya 200
      return NextResponse.json({ message: 'Login Berhasil', user: res.rows[0] }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Username atau Password salah' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}