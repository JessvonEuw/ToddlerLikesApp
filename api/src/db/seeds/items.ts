import { eq, and } from 'drizzle-orm';
import db from '@/db';
import { families, items, itemsTags, tags, users } from '@/db/schema';
import itemsData from './data/items.json';

async function seedItemsandTags(db: db) {
  await Promise.all(
    itemsData.map(async item => {
      const foundFamily = await db.query.families.findFirst({
        where: eq(families.name, item.familyName),
      });

      if (!foundFamily) {
        throw new Error('No family found with the name: ' + item.familyName);
      }

      const foundUser = await db.query.users.findFirst({
        where: eq(users.name, item.createdBy),
      });

      if (!foundUser) {
        throw new Error('No user found with the name: ' + item.createdBy);
      }

      const [createdItem] = await db
        .insert(items)
        .values({
          name: item.name,
          description: item.description,
          createdBy: foundUser.id,
          familyId: foundFamily.id,
        })
        .returning();

      await Promise.all(
        item.tags.map(async tag => {
          const [createdTag] = await db
            .insert(tags)
            .values({
              name: tag,
              createdBy: foundUser.id,
              familyId: foundFamily.id,
            })
            .onConflictDoNothing({ target: [tags.name, tags.familyId] })
            .returning();

          // Set the tag id based on a new DB item or an existing one
          const tagId =
            createdTag?.id ??
            (
              await db.query.tags.findFirst({
                where: and(
                  eq(tags.name, tag),
                  eq(tags.familyId, foundFamily.id)
                ),
              })
            )?.id;

          if (tagId) {
            await db
              .insert(itemsTags)
              .values({ itemId: createdItem.id, tagId: tagId });
          }
        })
      );
    })
  );
}

export default seedItemsandTags;
