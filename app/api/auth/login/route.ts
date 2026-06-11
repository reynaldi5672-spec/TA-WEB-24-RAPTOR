// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username dan password wajib diisi!' }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (user && user.password === password) {
      return NextResponse.json({ message: 'Login Berhasil', user }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Username atau Password salah' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}