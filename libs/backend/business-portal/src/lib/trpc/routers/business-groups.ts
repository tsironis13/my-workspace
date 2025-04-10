import { eq } from 'drizzle-orm';

import { db } from '../../drizzle/db';
import { businessEntities, businessGroups } from '../../drizzle/schema';
import { router } from '../trpc';
import { protectedProcedure } from './utils/protected-procedure.util';

type BusinessEntityType = 'OnlineOperation' | 'CashDistribution';

export const businessGroupsRouter = router({
  all: protectedProcedure.query(async () => {
    return await db.select().from(businessGroups);
  }),
  businessEntitiesSummarizedByBusinessGroup: protectedProcedure
    .input(Number)
    .query(async (param) => {
      const rows = await db
        .select()
        .from(businessEntities)
        .where(eq(businessEntities.businessGroupId, param.input));

      const result = rows.reduce<
        {
          id: number;
          displayName: string;
          businessGroupId: number;
          type: BusinessEntityType;
          refId: string | null;
        }[]
      >((acc, row) => {
        const value = {
          ...row,
          type: <BusinessEntityType>(
            (row.typeId === 1 ? 'OnlineOperation' : 'CashDistribution')
          ),
        };

        acc.push(value);

        return acc;
      }, []);

      return result;
    }),
});
