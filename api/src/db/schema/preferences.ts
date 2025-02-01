import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { families, items, users } from '@/db/schema';

const preferences = pgTable(
  'preferences',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    note: text(),
    rating: integer('rating').default(0),
    lastChecked: date({ mode: 'date' }),
    itemId: integer()
      .notNull()
      .references(() => items.id),
    userId: integer()
      .notNull()
      .references(() => users.id),
    familyId: integer()
      .notNull()
      .references(() => families.id),
    createdBy: integer()
      .notNull()
      .references(() => users.id),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  table => ({
    uniqueFamily: unique().on(table.userId, table.itemId),
  })
);

export const createPreferencesSchema = createInsertSchema(preferences).omit({
  itemId: true,
  userId: true,
  familyId: true,
});

export default preferences;
