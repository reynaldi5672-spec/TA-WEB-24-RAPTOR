import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Instance global murni kita jirr

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Tembak pakai Prisma findUnique berdasarkan username
    const user = await prisma.users.findUnique({
      where: { username: username },
    });

    // Validasi: Cek apakah user ketemu dan password-nya cocok murni
    if (user && user.password === password) {
      
      // SOLUSI SAKTI: Kita pecah objeknya, buang created_at & password biar gak bikin crash serialisasi jirr!
      const safeUser = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      // Pastikan statusnya 200 dan kirim safeUser yang aman diserialisasi ke JSON
      return NextResponse.json({ message: 'Login Berhasil', user: safeUser }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Username atau Password salah' }, { status: 401 });
    }
  } catch (error) {
    console.error("Eror internal login jirr:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}