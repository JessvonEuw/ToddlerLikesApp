import {
  integer,
  pgTable,
  timestamp,
  varchar,
  unique,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { families, users } from '@/db/schema';

const tags = pgTable(
  'tags' as const,
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 50 }).notNull(),
    familyId: integer().references(() => families.id),
    createdBy: integer()
      .notNull()
      .references(() => users.id),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  table => [
    // Only one tag of a given name per family
    uniqueIndex().on(table.name, table.familyId),
  ]
);

export const createTagsSchema = createInsertSchema(tags).omit({
  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export default tags;
