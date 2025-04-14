import { InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const locations = pgTable('locations', {
  id: uuid('id').primaryKey(),
  name: text('name'),
});

export type Locations = InferSelectModel<typeof locations>;
