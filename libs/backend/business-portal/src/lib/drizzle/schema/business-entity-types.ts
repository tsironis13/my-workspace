import { InferSelectModel } from 'drizzle-orm';
import { pgTable, bigserial, text } from 'drizzle-orm/pg-core';

export const businessEntityTypes = pgTable('businessEntityTypes', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
});

export type BusinessEntityTypes = InferSelectModel<typeof businessEntityTypes>;
