import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const itemsTable = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const createItemSchema = createInsertSchema(itemsTable);

export const updateItemSchema = createInsertSchema(itemsTable);
