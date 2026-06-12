import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * Clean up database connection string if it's wrapped in quotes.
 */
let connectionString = process.env.DATABASE_URL;
if (connectionString && connectionString.startsWith('"') && connectionString.endsWith('"')) {
  connectionString = connectionString.slice(1, -1);
}

/**
 * Initialize PostgreSQL connection pool using 'pg'.
 */
const pool = new Pool({ connectionString });

/**
 * Set up Prisma adapter for PostgreSQL to support edge-ready environments or specific PG drivers.
 */
const adapter = new PrismaPg(pool);

/**
 * Augment global scope to hold the PrismaClient singleton during development.
 * This prevents multiple instances from being created during hot-reloads.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * The singleton instance of PrismaClient used across the entire application.
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Use a standard client in production.
  prisma = new PrismaClient({ adapter });
} else {
  // Use a global singleton in development to prevent connection exhaustion.
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export { prisma };
