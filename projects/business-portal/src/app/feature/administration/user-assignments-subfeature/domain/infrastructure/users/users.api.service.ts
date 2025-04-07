import { injectTrpcClient } from '@business-portal/frontend';
import { UserAssignmentsUserDto } from './users.api.model';

export class UserAssignmentsUsersApiService {
  readonly #trpcClient = injectTrpcClient();

  getAll(): Promise<UserAssignmentsUserDto[]> {
    return this.#trpcClient.users.all.query();
  }
}
