import { asc, count, desc, and, SQL, eq } from 'drizzle-orm';
import { optional, z } from 'zod';

import { db } from '../../drizzle/db';
import {
  BusinessEntities,
  businessEntities,
  BusinessGroups,
  businessGroups,
  Locations,
  locations,
  roles,
  UserAssignments,
  userAssignments,
  users,
} from '../../drizzle/schema';
import { router } from '../trpc';
import { protectedProcedure } from './utils/protected-procedure.util';
import { withPagination } from './utils/with-pagination.util';

type ScopeTypes = 'Global' | 'BusinessGroup' | 'BusinessEntity' | 'Location';

type Scope = {
  type: ScopeTypes;
  name: string;
};

export const userAssignmentsRouter = router({
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
            scopeType: optional(z.string()),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const filters: SQL<unknown>[] = [];
      //const inputFilters = input.filters;

      //   if (inputFilters && 'active' in inputFilters) {
      //     filters.push(eq(users.active, <boolean>inputFilters.active));
      //   }

      const query = db
        .select()
        .from(userAssignments)
        .innerJoin(users, eq(userAssignments.userId, users.id))
        .innerJoin(roles, eq(userAssignments.roleId, roles.id))
        .leftJoin(locations, eq(userAssignments.locationId, locations.id))
        .leftJoin(
          businessGroups,
          eq(userAssignments.businessGroupId, businessGroups.id)
        )
        .leftJoin(
          businessEntities,
          eq(userAssignments.businessEntityId, businessEntities.id)
        )
        .where(and(...filters));

      const totalCount = await db
        .select({ count: count() })
        .from(userAssignments)
        .where(and(...filters));

      const sortBy = <keyof UserAssignments>input.sort.sortBy;
      const sort =
        input.sort.sortOrder === -1
          ? desc(userAssignments[sortBy])
          : asc(userAssignments[sortBy]);

      const paginatedResult = await withPagination(
        query.$dynamic(),
        sort,
        input.pagination.pageNumber,
        input.pagination.pageSize
      );

      const result = paginatedResult.reduce<
        {
          id: number;
          firstName: string;
          lastName: string;
          email: string;
          role: string;
          scopeType: string;
          scopeName: string;
          createdAt: string;
        }[]
      >((acc, row) => {
        const userAssignment = row.userAssignments;
        const user = row.users;
        const role = row.roles;

        const scope = getScope(
          userAssignment,
          row.businessGroups,
          row.businessEntities,
          row.locations
        );

        acc.push({
          id: userAssignment.id,
          firstName: user.name,
          lastName: user.familyName,
          email: user.email,
          role: role.name,
          scopeType: scope.type,
          scopeName: scope.name,
          createdAt: userAssignment.createdAt,
        });

        return acc;
      }, []);

      return {
        items: [...result],
        totalCount: totalCount[0].count,
      };
    }),
  //   create: protectedProcedure
  //     .input(
  //       z.object({
  //         name: z.string(),
  //         familyName: z.string(),
  //         email: z.string(),
  //         authUserId: z.string(),
  //         phoneNumber: optional(z.string()),
  //         businessGroupId: optional(z.number()),
  //       })
  //     )
  //     .mutation(async ({ input }) => {
  //       return await insertUser({
  //         name: input.name,
  //         familyName: input.familyName,
  //         email: input.email,
  //         authUserId: input.authUserId,
  //         businessGroupId: input.businessGroupId,
  //         phoneNumber: input.phoneNumber,
  //         active: true,
  //       });
  //     }),
});

const getScope = (
  userAssignment: UserAssignments,
  businessGroup: BusinessGroups | null,
  businessEntity: BusinessEntities | null,
  location: Locations | null
): Scope => {
  const { businessGroupId, businessEntityId, locationId } = userAssignment;

  if (businessGroupId !== null) {
    return {
      type: 'BusinessGroup',
      name: businessGroup?.name ?? '',
    };
  }

  if (businessEntityId !== null) {
    return {
      type: 'BusinessEntity',
      name: businessEntity?.displayName ?? '',
    };
  }

  if (locationId !== null) {
    return {
      type: 'Location',
      name: location?.name ?? '',
    };
  }

  return {
    type: 'Global',
    name: '',
  };
};
