import { Pool, QueryResult, QueryResultRow } from 'pg';

/**
 * PostgreSQL connection pool configuration.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/**
 * Utility function to execute raw SQL queries using the connection pool with strict typing.
 * 
 * @template T - The expected type of the resulting rows.
 * @param {string} text - The SQL query string.
 * @param {unknown[]} [params] - Optional parameters.
 * @returns {Promise<QueryResult<T>>} The result of the database query.
 */
export async function query<T extends QueryResultRow>(
  text: string, 
  params?: unknown[]
): Promise<QueryResult<T>> {
  return pool.query<T>(text, params);
}
