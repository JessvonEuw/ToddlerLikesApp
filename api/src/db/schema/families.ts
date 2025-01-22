import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const familiesTable = pgTable('families', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const createFamiliesSchema = createInsertSchema(familiesTable);
