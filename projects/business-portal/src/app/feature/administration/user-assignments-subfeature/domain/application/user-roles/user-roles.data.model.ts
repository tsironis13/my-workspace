import { UserAssignmentsUserRoleRoleScope } from '../user-role-role-scopes/user-role-role-scopes.data.model';

export type UserAssignmentsAssignableUserRole = {
  id: number;
  name: string;
  isInternal: boolean;
  scopes: UserAssignmentsUserRoleRoleScope[];
};
