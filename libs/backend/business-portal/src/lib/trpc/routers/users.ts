import { asc, count, desc, and, SQL, eq } from 'drizzle-orm';
import { optional, z } from 'zod';
import { TRPCError } from '@trpc/server';

import { db } from '../../drizzle/db';
import { Users, users } from '../../drizzle/schema';
import { router } from '../trpc';
import { protectedProcedure } from './utils/protected-procedure.util';
import { withPagination } from './utils/with-pagination.util';

type NewUser = typeof users.$inferInsert;

const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user);
};

export const usersRouter = router({
  current: protectedProcedure.query(async (opts) => {
    const currentUser = await opts.ctx.user;

    const result = await db
      .select()
      .from(users)
      .where(eq(users.authUserId, currentUser.id));

    if (result.length === 0 || result.length > 1) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not validated',
      });
    }

    return result[0];
  }),
  all: protectedProcedure.query(async () => {
    return await db
      .select({
        id: users.id,
        name: users.name,
        familyName: users.familyName,
        email: users.email,
      })
      .from(users);
  }),
  getPaginated: protectedProcedure
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
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        familyName: z.string(),
        email: z.string(),
        authUserId: z.string(),
        phoneNumber: optional(z.string()),
        businessGroupId: optional(z.number()),
      })
    )
    .mutation(async ({ input }) => {
      return await insertUser({
        name: input.name,
        familyName: input.familyName,
        email: input.email,
        authUserId: input.authUserId,
        businessGroupId: input.businessGroupId,
        phoneNumber: input.phoneNumber,
        active: true,
      });
    }),
});
