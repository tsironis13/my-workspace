import { aliasedTable, asc, count, desc, eq } from 'drizzle-orm';
import { optional, z } from 'zod';
import { db } from '../../drizzle/db';
import { ProductCategories, productCategories } from '../../drizzle/schema';
import { publicProcedure, router } from '../trpc';

const parent = aliasedTable(productCategories, 'parent');

export const productCategoryRouter = router({
  getByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await db
        .select()
        .from(productCategories)
        .where(eq(productCategories.name, input.name))
        .limit(2);
    }),
  getPaginated: publicProcedure
    .input(
      z.object({
        pagination: z.object({
          pageSize: z.number(),
          pageNumber: z.number(),
        }),
        sort: z.object({
          sortBy: z.string(),
          sortOrder: z.number(),
        }),
        filters: optional(
          z.object({
            name: z.string(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const query = db
        .select({
          id: productCategories.id,
          name: productCategories.name,
          description: productCategories.description,
          imageUrl: productCategories.imageUrl,
          parentCategoryName: parent.name,
        })
        .from(productCategories)
        .leftJoin(parent, eq(parent.id, productCategories.parentCategoryId));

      const totalCount = await db
        .select({ count: count() })
        .from(productCategories);

      const sortBy = input.sort.sortBy as keyof ProductCategories;
      const sort =
        input.sort.sortOrder === -1
          ? asc(productCategories[sortBy])
          : desc(productCategories[sortBy]);
      //   const result = await withPagination(
      //     query.$dynamic(),
      //     sort,
      //     input.pagination.pageNumber,
      //     input.pagination.pageSize
      //   );

      return {
        items: [],
        totalCount: totalCount[0].count,
      };

      //return await db.select().from(productCategories).limit(input);
    }),
  list: publicProcedure.input(z.array(z.string())).query(async ({ input }) => {
    const obj: Record<
      string,
      (typeof productCategories)[keyof ProductCategories]
    > = {};

    input.forEach((key) => {
      obj[key] = productCategories[key as keyof ProductCategories];
    });

    return await db
      .select({
        id: productCategories.id,
        parentCategoryId: productCategories.parentCategoryId,
        name: productCategories.name,
      })
      .from(productCategories);
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.nullable(z.string()),
        parentCategoryId: z.nullable(z.number()),
      })
    )
    .mutation(async ({ input }) => {
      return await db.insert(productCategories).values(input).returning();
    }),
  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await db
      .select()
      .from(productCategories)
      .where(eq(productCategories.id, input));
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(
      async ({ input }) =>
        await db
          .delete(productCategories)
          .where(eq(productCategories.id, input.id))
          .returning()
    ),
});
