import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { createItemsSchema, items, tags } from '@/db/schema';

const itemsTags = pgTable('items_tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  itemId: integer()
    .notNull()
    .references(() => items.id),
  tagId: integer()
    .notNull()
    .references(() => tags.id),
});

export const createItemsTagsSchema = createInsertSchema(itemsTags).omit({
  itemId: true,
});

export const createItemsWithTagsSchema = z.object({
  item: createItemsSchema,
  tags: z.array(createItemsTagsSchema),
});

export default itemsTags;
