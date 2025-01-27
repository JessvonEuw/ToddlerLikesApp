import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import families from './families';
import users from './users';

const tags = pgTable('tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  familyId: integer().references(() => families.id),
  createdBy: integer()
    .notNull()
    .references(() => users.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createTagsSchema = createInsertSchema(tags).omit({
  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export default tags;
