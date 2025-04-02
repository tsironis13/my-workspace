import { InferSelectModel } from 'drizzle-orm';
import { pgTable, bigserial, text } from 'drizzle-orm/pg-core';

export const businessGroups = pgTable('businessGroups', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
});

export type BusinessGroups = InferSelectModel<typeof businessGroups>;
