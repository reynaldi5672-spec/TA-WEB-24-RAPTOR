import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, email, subject, pesan } = body;

    if (!nama || !email || !subject || !pesan) {
      return NextResponse.json({ message: 'Semua field wajib diisi!' }, { status: 400 });
    }

    // TODO: Implementasi kirim email atau simpan ke database
    console.log('Contact form submission:', { nama, email, subject, pesan });

    return NextResponse.json(
      { message: 'Pesan berhasil dikirim! Tim kami akan menghubungi Anda segera.' },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
