import { eq } from 'drizzle-orm';

import { db } from '../../drizzle/db';
import {
  roleRoleScopes,
  roles,
  RoleScopes,
  roleScopes,
} from '../../drizzle/schema';
import { router } from '../trpc';
import { protectedProcedure } from './utils/protected-procedure.util';

export const rolesRouter = router({
  assignable: protectedProcedure.query(async () => {
    const rows = await db
      .select({
        role: roles,
        scope: roleScopes,
        roleRoleScopes: roleRoleScopes,
      })
      .from(roles)
      .leftJoin(roleRoleScopes, eq(roles.id, roleRoleScopes.rolesId))
      .leftJoin(roleScopes, eq(roleRoleScopes.scopesId, roleScopes.id));

    const result = rows.reduce<
      {
        id: number;
        name: string;
        isInternal: boolean;
        scopes: RoleScopes[];
      }[]
    >((acc, row) => {
      const role = row.role;
      const scope = <RoleScopes>row.scope;

      const matchedRole = acc.find((r) => r.id === role.id);

      if (!matchedRole) {
        acc.push({
          ...role,
          isInternal: role.isInternal ?? false,
          scopes: [scope],
        });
      } else {
        matchedRole.scopes.push(scope);
      }

      return acc;
    }, []);

    return result;
  }),
});
