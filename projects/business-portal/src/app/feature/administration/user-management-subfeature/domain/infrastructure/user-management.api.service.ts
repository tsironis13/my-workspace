import { injectTrpcClient } from '@business-portal/frontend';
import { UserApiResponseItem } from './user-management.api.model';
import {
  EntitiesApiResponse,
  EntityApiPagination,
} from '@business-portal/core/entities/infrastructure';

export class UserManagementApiService {
  #trpcClient = injectTrpcClient();

  getUsersByFilterAndPagination(
    pagination: EntityApiPagination
  ): Promise<EntitiesApiResponse<UserApiResponseItem>> {
    return this.#trpcClient.users.getPaginated.query({
      pagination,
      sort: { sortBy: 'id', sortOrder: 1 },
    });
  }
}
