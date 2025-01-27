import db from '@/db';
import { families } from '@/db/schema';
import familiesData from './data/families.json';

export default async function seed(db: db) {
  await db.insert(families).values(familiesData).returning();
}
