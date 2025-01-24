import { date, integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import items from './items';
import usersTable from './users';
import familiesTable from './families';
import { createInsertSchema } from 'drizzle-zod';

export const preferenceEnum = pgEnum('rating', ['1', '2', '3', '4', '5']);

const preferences = pgTable('preferences', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  preference: preferenceEnum('rating'),
  note: text(),
  lastTried: date({ mode: 'date' }),
  itemId: integer()
    .notNull()
    .references(() => items.id),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  familyId: integer()
    .notNull()
    .references(() => familiesTable.id),
});

export const createPreferencesSchema = createInsertSchema(preferences).omit({
  itemId: true,
  userId: true,
  familyId: true,
});

export default preferences;
