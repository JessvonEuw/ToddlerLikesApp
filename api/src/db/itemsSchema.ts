import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const itemsTable = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
});
