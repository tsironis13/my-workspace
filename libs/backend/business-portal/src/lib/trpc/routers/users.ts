import { asc, count, desc, and, SQL, ilike, like, eq } from 'drizzle-orm';
import { optional, z } from 'zod';
import { db } from '../../drizzle/db';
import { Users, users } from '../../drizzle/schema';
import { publicProcedure, router } from '../trpc';
import { PgSelect, PgColumn } from 'drizzle-orm/pg-core';

export function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = 1,
  pageSize = 10
) {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export const usersRouter = router({
  //   getByName: publicProcedure
  //     .input(
  //       z.object({
  //         name: z.string(),
  //       })
  //     )
  //     .query(async ({ input }) => {
  //       return await db
  //         .select()
  //         .from(productCategories)
  //         .where(eq(productCategories.name, input.name))
  //         .limit(2);
  //     }),
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
            active: optional(z.boolean()),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      console.log(input);

      const filters: SQL<unknown>[] = [];
      const inputFilters = input.filters;

      if (inputFilters && 'active' in inputFilters) {
        filters.push(eq(users.active, <boolean>inputFilters.active));
      }

      const query = db
        .select()
        .from(users)
        .where(and(...filters));

      const totalCount = await db
        .select({ count: count() })
        .from(users)
        .where(and(...filters));

      const sortBy = <keyof Users>input.sort.sortBy;
      const sort =
        input.sort.sortOrder === -1 ? desc(users[sortBy]) : asc(users[sortBy]);

      const result = await withPagination(
        query.$dynamic(),
        sort,
        input.pagination.pageNumber,
        input.pagination.pageSize
      );

      return {
        items: [...result],
        totalCount: totalCount[0].count,
      };

      //return await db.select().from(productCategories).limit(input);
    }),
  //   list: publicProcedure.input(z.array(z.string())).query(async ({ input }) => {
  //     const obj: Record<
  //       string,
  //       (typeof productCategories)[keyof ProductCategories]
  //     > = {};

  //     input.forEach((key) => {
  //       obj[key] = productCategories[key as keyof ProductCategories];
  //     });

  //     return await db
  //       .select({
  //         id: productCategories.id,
  //         parentCategoryId: productCategories.parentCategoryId,
  //         name: productCategories.name,
  //       })
  //       .from(productCategories);
  //   }),
  //   create: publicProcedure
  //     .input(
  //       z.object({
  //         name: z.string(),
  //         description: z.nullable(z.string()),
  //         parentCategoryId: z.nullable(z.number()),
  //       })
  //     )
  //     .mutation(async ({ input }) => {
  //       return await db.insert(productCategories).values(input).returning();
  //     }),
  //   getById: publicProcedure.input(z.number()).query(async ({ input }) => {
  //     return await db
  //       .select()
  //       .from(productCategories)
  //       .where(eq(productCategories.id, input));
  //   }),
  //   remove: publicProcedure
  //     .input(
  //       z.object({
  //         id: z.number(),
  //       })
  //     )
  //     .mutation(
  //       async ({ input }) =>
  //         await db
  //           .delete(productCategories)
  //           .where(eq(productCategories.id, input.id))
  //           .returning()
  //     ),
});
