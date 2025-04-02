import { db } from '../../drizzle/db';
import { businessGroups } from '../../drizzle/schema';
import { router } from '../trpc';
import { protectedProcedure } from './utils/protected-procedure.util';

export const businessGroupsRouter = router({
  all: protectedProcedure.query(async () => {
    return await db.select().from(businessGroups);
  }),
});
