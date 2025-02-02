import db, { pool } from '@/db';
import { Table, getTableName, sql } from 'drizzle-orm';
import * as schema from '@/db/schema';
import * as seeds from '@/db/seeds';

async function resetTables(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

for (const table of [
  schema.families,
  schema.users,
  schema.items,
  schema.tags,
  schema.itemsTags,
  schema.preferences,
]) {
  await resetTables(db, table);
}

await seeds.seedFamilies(db);
await seeds.seedUsers(db);
await seeds.seedItemsandTags(db);
await seeds.seedPreferences(db);

await pool.end();
