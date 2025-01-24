import { date, integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { itemsTable } from './items';
import { usersTable } from './users';
import { familiesTable } from './families';
import { createInsertSchema } from 'drizzle-zod';

export const preferenceEnum = pgEnum('rating', ['1', '2', '3', '4', '5']);

export const preferencesTable = pgTable('preferences', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  preference: preferenceEnum('rating'),
  note: text(),
  lastTried: date({ mode: 'date' }),
  itemId: integer()
    .notNull()
    .references(() => itemsTable.id),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  familyId: integer()
    .notNull()
    .references(() => familiesTable.id),
});

export const createPreferencesSchema = createInsertSchema(
  preferencesTable
).omit({ itemId: true, userId: true, familyId: true });
