import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { families, users } from '@/db/schema';

const items = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  createdBy: integer()
    .notNull()
    .references(() => users.id),
  image: varchar({ length: 255 }),
  familyId: integer().references(() => families.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createItemsSchema = createInsertSchema(items).omit({
  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateItemsSchema = createInsertSchema(items).partial().omit({
  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export default items;
