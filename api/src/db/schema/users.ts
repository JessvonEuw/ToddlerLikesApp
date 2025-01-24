import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { familiesTable } from './families';

export const roleEnum = pgEnum('role', ['parent', 'kid']);

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: roleEnum('role').default('parent').notNull(),
  familyId: integer().references(() => familiesTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createUsersSchema = createInsertSchema(usersTable);

// Only need email and password for login
export const createLoginSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});
