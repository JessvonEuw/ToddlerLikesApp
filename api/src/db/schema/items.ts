import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { familiesTable } from './families';
import { tagsTable } from './tags';
import { usersTable } from './users';

export const itemsTable = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  createdBy: integer()
    .notNull()
    .references(() => usersTable.id),
  familyId: integer().references(() => familiesTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const itemsTagsTable = pgTable('items_tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  itemId: integer()
    .references(() => itemsTable.id)
    .notNull(),
  tagId: integer()
    .references(() => tagsTable.id)
    .notNull(),
});

export const createItemSchema = createInsertSchema(itemsTable).pick({
  name: true,
  description: true,
  createdBy: true,
  familyId: true,
});

export const updateItemSchema = createInsertSchema(itemsTable).partial();

export const createItemTagsSchema = createInsertSchema(itemsTagsTable);

export const insertItemWithTagsSchema = z.object({
  item: createItemSchema,
  tags: z.array(createItemTagsSchema),
});
