import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username dan password wajib diisi!' }, { status: 400 });
    }

    // Cek apakah username sudah ada
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Username sudah terdaftar' }, { status: 400 });
    }

    // Simpan user baru (Role default: admin)
    // TODO: Hash password dengan bcrypt sebelum menyimpan
    await prisma.users.create({
      data: {
        username,
        password,
        role: 'admin',
      },
    });

    return NextResponse.json({ message: 'Registrasi Berhasil' }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}