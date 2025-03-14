import { injectTrpcClient } from '@business-portal/frontend';
import { UserApiResponse } from './user-management.api.model';

export class UserManagementApiService {
  trpcClient = injectTrpcClient();

  async getUsers(): Promise<UserApiResponse> {
    const x = await this.trpcClient.todos.all.query();
    return {
      items: x,
      totalCount: x.length,
    };
  }
}
