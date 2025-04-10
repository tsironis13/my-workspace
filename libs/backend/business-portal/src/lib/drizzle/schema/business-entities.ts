import { InferSelectModel } from 'drizzle-orm';
import { pgTable, bigserial, integer, uuid, text } from 'drizzle-orm/pg-core';

import { businessEntityTypes } from './business-entity-types';
import { businessGroups } from './business-groups';

export const businessEntities = pgTable('businessEntities', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  displayName: text('displayName').notNull(),
  refId: uuid('refId'),
  typeId: integer('typeId')
    .references(() => businessEntityTypes.id)
    .notNull(),
  businessGroupId: integer('businessGroupId')
    .references(() => businessGroups.id)
    .notNull(),
});

export type BusinessEntities = InferSelectModel<typeof businessEntities>;
