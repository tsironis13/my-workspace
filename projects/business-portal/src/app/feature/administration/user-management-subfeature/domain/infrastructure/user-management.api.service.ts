import { injectTrpcClient } from '@business-portal/frontend';
import { UserApiResponseItem } from './user-management.api.model';
import {
  EntityFilterApiModel,
  EntitySortApiModel,
} from '@business-portal/core/entities/infrastructure';
import {
  EntitiesApiResponse,
  EntityApiPagination,
} from '@business-portal/core/entities/infrastructure';

export class UserManagementApiService {
  #trpcClient = injectTrpcClient();

  getUsersByFilterAndSortAndPagination(
    pagination: EntityApiPagination,
    sort: EntitySortApiModel<UserApiResponseItem>,
    filters: EntityFilterApiModel<UserApiResponseItem>
  ): Promise<EntitiesApiResponse<UserApiResponseItem>> {
    return this.#trpcClient.users.getPaginated.query({
      pagination,
      sort,
      filters,
    });
  }
}
