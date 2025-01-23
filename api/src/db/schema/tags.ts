import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { familiesTable } from './families';
import { itemsTable } from './items';

export const tagsTable = pgTable('tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  familyId: integer().references(() => familiesTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createTagsSchema = createInsertSchema(tagsTable).pick({
  name: true,
});
