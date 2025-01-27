import db from '@/db';
import bcrypt from 'bcryptjs';
import { users, families } from '@/db/schema';
import usersData from './data/users.json';
import { eq } from 'drizzle-orm';

export default async function seed(db: db) {
  const insertUserData = await Promise.all(
    usersData.map(async user => {
      const foundFamily = await db.query.families.findFirst({
        where: eq(families.name, user.familyName),
      });

      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }

      if (!foundFamily) {
        throw new Error('No family found with name: ' + user.familyName);
      }

      return {
        ...user,
        familyId: foundFamily.id,
      };
    })
  );

  await db.insert(users).values(insertUserData);
}
