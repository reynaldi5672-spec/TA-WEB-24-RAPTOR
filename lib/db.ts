import { Pool } from 'pg';

/**
 * PostgreSQL connection pool configuration.
 * Configured with performance limits to ensure stability across environments.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
});

/**
 * Utility function to execute raw SQL queries using the connection pool.
 * 
 * @param {string} text - The SQL query string (e.g., 'SELECT * FROM users WHERE id = $1').
 * @param {unknown[]} [params] - Optional array of parameters to safely inject into the query.
 * @returns {Promise<any>} The result of the database query.
 */
export const query = (text: string, params?: unknown[]) => pool.query(text, params);
