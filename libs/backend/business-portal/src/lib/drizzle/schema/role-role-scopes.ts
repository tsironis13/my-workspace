import { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  bigserial,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core';

import { roles } from './roles';
import { roleScopes } from './role-scopes';

export const roleRoleScopes = pgTable(
  'roleRoleScopes',
  {
    rolesId: bigserial('rolesId', { mode: 'number' }).notNull(),
    scopesId: bigserial('scopesId', { mode: 'number' }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.rolesId, table.scopesId] }),
    foreignKey({
      columns: [table.rolesId, table.scopesId],
      foreignColumns: [roles.id, roleScopes.id],
    }),
  ]
);

export type RoleRoleScopes = InferSelectModel<typeof roleRoleScopes>;
