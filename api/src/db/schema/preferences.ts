import { date, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const preferencesTable = pgTable('preferences', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  item_id: varchar({ length: 255 }).notNull(),
  note: text(),
  rating: integer(),
  lastDate: date({ mode: 'date' }),
});
