import { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  bigserial,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
} from 'drizzle-orm/pg-core';

import { businessGroups } from './business-groups';

export const users = pgTable('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  familyName: text('familyName').notNull(),
  phoneNumber: text('phoneNumber'),
  active: boolean('active').default(true).notNull(),
  authUserId: uuid('authUserId').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
  businessGroupId: integer('businessGroupId').references(
    () => businessGroups.id
  ),
});

export type Users = InferSelectModel<typeof users>;
