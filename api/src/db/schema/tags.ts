import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import familiesTable from './families';
import usersTable from './users';

const tagsTable = pgTable('tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  familyId: integer().references(() => familiesTable.id),
  createdBy: integer()
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const createTagsSchema = createInsertSchema(tagsTable).omit({
  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export default tagsTable;
