import { db, pool } from '@/db/index.js';
import families from '@/db/schema/families.js';

export default async function seed() {
  await db.insert(families).values({ name: 'Carters' }).returning();
}

seed().catch(error => {
  console.error('Error while seeding:', error);
  process.exit(1);
});
