import { Table } from 'drizzle-orm';
import { db, pool } from '../../db';
import { families } from '../../db/schema';

export default async function seed() {
  await db.insert(families).values({ name: 'Carters' }).returning();
}

seed().catch(error => {
  console.error('Error while seeding:', error);
  process.exit(1);
});
