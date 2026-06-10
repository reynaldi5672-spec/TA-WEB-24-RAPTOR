// lib/db.ts
import { Pool } from 'pg';

// Menggunakan global variable agar tidak membuat pool baru setiap hot-reload di development
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Tambahkan sedikit konfigurasi tambahan agar lebih stabil
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
