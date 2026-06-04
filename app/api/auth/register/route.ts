import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import instance Prisma global kita jirr

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 1. Cek apakah username sudah ada pake findUnique
    const existingUser = await prisma.users.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Username sudah terdaftar' }, { status: 400 });
    }

    // 2. Simpan user baru (Role default: admin, auto-handle sesuai default di skema atau taruh sini)
    await prisma.users.create({
      data: {
        username,
        password, // Tips lamo tetep berlaku: next time idealnya di-hash pake bcrypt jirr :v
        role: 'admin',
      },
    });

    return NextResponse.json({ message: 'Registrasi Berhasil' }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}