import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { familiesTable } from './families';
import { tagsTable } from './tags';
import { usersTable } from './users';

export const itemsTable = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  createdBy: integer()
    .notNull()
    .references(() => usersTable.id),
  familyId: integer().references(() => familiesTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createItemSchema = createInsertSchema(itemsTable);

export const updateItemSchema = createInsertSchema(itemsTable).partial();
