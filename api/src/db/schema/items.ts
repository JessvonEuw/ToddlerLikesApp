import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { familiesTable } from './families';
import { tagsTable } from './tags';

export const itemsTable = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  familyId: integer().references(() => familiesTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createItemSchema = createInsertSchema(itemsTable);

export const updateItemSchema = createInsertSchema(itemsTable).partial();
