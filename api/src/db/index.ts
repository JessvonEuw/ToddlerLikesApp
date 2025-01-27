import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '@/db/schema';

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool, schema });

export type db = typeof db;

export default db;
