import { UserAssignmentsUserRoleRoleScopeDto } from '../user-role-role-scopes/user-role-role-scopes.api.model';

export type UserAssignmentsAssignableUserRoleDto = {
  id: number;
  name: string;
  isInternal: boolean;
  scopes: UserAssignmentsUserRoleRoleScopeDto[];
};
