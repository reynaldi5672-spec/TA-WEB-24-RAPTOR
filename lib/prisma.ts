import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Menyiapkan koneksi langsung (Direct Connection) menggunakan driver 'pg' sesuai standar Prisma 7+
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter,
    log: ['query'], // Memunculkan query SQL di terminal biar gampang tracing TA-nya jirr
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;