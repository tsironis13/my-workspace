import { injectTrpcClient } from '@business-portal/frontend';
import { UserAssignmentsAssignableUserRoleDto } from './user-roles.api.model';

export class UserAssignmentsUserRolesApiService {
  readonly #trpcClient = injectTrpcClient();

  getAssignableUserRoles(): Promise<UserAssignmentsAssignableUserRoleDto[]> {
    return this.#trpcClient.roles.assignable.query();
  }
}
