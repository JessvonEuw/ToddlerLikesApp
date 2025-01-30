import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { createItemsSchema, items, tags } from '@/db/schema';

const itemTag = pgTable('item_tag', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  itemId: integer()
    .notNull()
    .references(() => items.id),
  tagId: integer()
    .notNull()
    .references(() => tags.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createItemsTagsSchema = createInsertSchema(itemTag).omit({
  itemId: true,
});

export const createItemsWithTagsSchema = z.object({
  item: createItemsSchema,
  tags: z.array(createItemsTagsSchema),
});

export default itemTag;
