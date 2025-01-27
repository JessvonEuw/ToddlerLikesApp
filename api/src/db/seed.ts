import db, { pool } from '@/db';
import { Table, getTableName, sql } from 'drizzle-orm';
import * as schema from '@/db/schema';
import * as seeds from '@/db/seeds';

export default async function seed(db: db) {
  await seeds.families(db);
}

async function resetTables(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

for (const table of [
  schema.families,
  schema.users,
  schema.items,
  schema.preferences,
  schema.tags,
]) {
  await resetTables(db, table);
}

await seeds.families(db);
await seeds.users(db);

await pool.end();
