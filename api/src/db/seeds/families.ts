import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { families, users } from '@/db/schema';
import familiesData from './data/families.json';
import usersData from './data/users.json';

async function seedFamilies(db: db) {
  await Promise.all(
    familiesData.map(async family => {
      await db.insert(families).values({ name: family.name });
    })
  );
}

export async function seedUsers(db: db) {
  await Promise.all(
    usersData.map(async user => {
      const foundFamily = await db.query.families.findFirst({
        where: eq(families.name, user.familyName),
      });

      if (foundFamily) {
        const hashedPassword = user.password
          ? await bcrypt.hash(user.password, 10)
          : null;
        await db.insert(users).values({
          name: user.name,
          email: user.email || null,
          password: hashedPassword,
          role: user.role as 'parent' | 'child',
          familyId: foundFamily.id,
        });
      }
    })
  );
}

export default seedFamilies;
