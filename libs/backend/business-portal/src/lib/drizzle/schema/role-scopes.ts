import { InferSelectModel } from 'drizzle-orm';
import { pgTable, bigserial, text } from 'drizzle-orm/pg-core';

export const roleScopes = pgTable('roleScopes', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
});

export type RoleScopes = InferSelectModel<typeof roleScopes>;
