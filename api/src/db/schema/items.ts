import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import families from './families';
import tags from './tags';
import users from './users';

const items = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  createdBy: integer()
    .notNull()
    .references(() => users.id),
  familyId: integer().references(() => families.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const itemsTags = pgTable('items_tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  itemId: integer()
    .references(() => items.id)
    .notNull(),
  tagId: integer()
    .references(() => tags.id)
    .notNull(),
});

export const createItemSchema = createInsertSchema(items).omit({
  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateItemSchema = createInsertSchema(items).partial().omit({
  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export const createItemTagSchema = createInsertSchema(itemsTags).omit({
  itemId: true,
});

export const createItemWithTagsSchema = z.object({
  item: createItemSchema,
  tags: z.array(createItemTagSchema),
});

export default items;
