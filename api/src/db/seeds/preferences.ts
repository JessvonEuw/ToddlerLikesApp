import { eq } from 'drizzle-orm';
import db from '@/db';
import { families, items, preferences, users } from '@/db/schema';
import preferencesData from './data/preferences.json';

async function seedPreferences(db: db) {
  await Promise.all(
    preferencesData.map(async preference => {
      const foundFamily = await db.query.families.findFirst({
        where: eq(families.name, preference.familyName),
      });

      if (!foundFamily) {
        throw new Error(
          'No family found with the name: ' + preference.familyName
        );
      }

      const foundItem = await db.query.items.findFirst({
        where: eq(items.name, preference.itemName),
      });

      if (!foundItem) {
        throw new Error(
          'No family found with the name: ' + preference.familyName
        );
      }

      const foundPreferenceUser = await db.query.users.findFirst({
        where: eq(users.name, preference.preferredBy),
      });

      const foundCreatedUser = await db.query.users.findFirst({
        where: eq(users.name, preference.createdBy),
      });

      if (!foundPreferenceUser || !foundCreatedUser) {
        throw new Error('No user found with the name: ' + foundCreatedUser);
      }

      await db.insert(preferences).values({
        note: preference.note,
        rating: preference.rating,
        lastChecked: new Date(preference.lastChecked),
        itemId: foundItem.id,
        userId: foundPreferenceUser.id,
        familyId: foundFamily.id,
        createdBy: foundCreatedUser.id,
      });
    })
  );
}

export default seedPreferences;
