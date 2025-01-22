import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { familiesTable } from './families';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default('user'),
  canLogin: boolean().default(false),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  familyId: integer().references(() => familiesTable.id),
});

export const createUsersSchema = createInsertSchema(usersTable).omit({
  role: true,
});

// Only need email and password for login
export const createLoginSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});
