import { date, integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import items from './items';
import users from './users';
import families from './families';
import { createInsertSchema } from 'drizzle-zod';

const preferences = pgTable('preferences', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  note: text(),
  lastTried: date({ mode: 'date' }),
  itemId: integer()
    .notNull()
    .references(() => items.id),
  userId: integer()
    .notNull()
    .references(() => users.id),
  familyId: integer()
    .notNull()
    .references(() => families.id),
});

export const createPreferencesSchema = createInsertSchema(preferences).omit({
  itemId: true,
  userId: true,
  familyId: true,
});

export default preferences;
