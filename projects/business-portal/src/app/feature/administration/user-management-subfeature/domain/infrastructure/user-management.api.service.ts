import { injectTrpcClient } from '@business-portal/frontend';
import { CreateUserPostDto, UserDto } from './user-management.api.model';
import {
  EntityFilterPostDto,
  EntitySortPostDto,
} from '@business-portal/core/entities/infrastructure';
import {
  EntitiesDto,
  EntityPaginationPostDto,
} from '@business-portal/core/entities/infrastructure';

export class UserManagementApiService {
  readonly #trpcClient = injectTrpcClient();

  getUsersByFilterAndSortAndPagination(
    pagination: EntityPaginationPostDto,
    sort: EntitySortPostDto<UserDto>,
    filters: EntityFilterPostDto<UserDto>
  ): Promise<EntitiesDto<UserDto>> {
    return this.#trpcClient.users.getPaginated.query({
      pagination,
      sort,
      filters,
    });
  }

  createUser(user: CreateUserPostDto): Promise<unknown> {
    return this.#trpcClient.users.create.mutate(user);
  }
}
