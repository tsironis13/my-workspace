import { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  bigserial,
  timestamp,
  boolean,
  integer,
  uuid,
} from 'drizzle-orm/pg-core';

import { businessGroups } from './business-groups';
import { users } from './users';
import { roles } from './roles';
import { businessEntities } from './business-entities';
import { locations } from './locations';

export const userAssignments = pgTable('userAssignments', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  isGlobal: boolean('isGlobal').default(false).notNull(),
  isInternal: boolean('isInternal').default(false).notNull(),
  userPoolId: integer('userPoolId'),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
  userId: integer('userId').references(() => users.id),
  businessGroupId: integer('businessGroupId').references(
    () => businessGroups.id
  ),
  businessEntityId: integer('businessEntityId').references(
    () => businessEntities.id
  ),
  roleId: integer('roleId').references(() => roles.id),
  locationId: uuid('locationId').references(() => locations.id),
});

export type UserAssignments = InferSelectModel<typeof userAssignments>;
