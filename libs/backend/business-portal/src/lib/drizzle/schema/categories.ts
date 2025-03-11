import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  bigserial,
  foreignKey,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const productCategories = pgTable(
  'product_categories',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: text('name'),
    description: text('description'),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
    parentCategoryId: integer('parent_category_id'),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentCategoryId],
        foreignColumns: [table.id],
        name: 'product_categories_parent_category_id_fkey',
      }),
    };
  }
);

export type ProductCategories = InferSelectModel<typeof productCategories>;
export type NewProductCategory = InferInsertModel<typeof productCategories>;
