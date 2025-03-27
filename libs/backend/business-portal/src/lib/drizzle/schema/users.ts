import { InferSelectModel, sql } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/gel-core';
import {
  pgTable,
  bigserial,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  familyName: text('familyName'),
  phoneNumber: text('phoneNumber'),
  active: boolean('active').default(true).notNull(),
  authUserId: <any>uuid('authUserId').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
});

export type Users = InferSelectModel<typeof users>;
