import { injectTrpcClient } from '@business-portal/frontend';
import {
  EntityFilterPostDto,
  EntitySortPostDto,
} from '@business-portal/core/entities/infrastructure';
import {
  EntitiesDto,
  EntityPaginationPostDto,
} from '@business-portal/core/entities/infrastructure';
import { UserAssignmentDto } from './user-assignments.api.model';

export class UserAssignmentsApiService {
  readonly #trpcClient = injectTrpcClient();

  getUserAssignmentsByFilterAndSortAndPagination(
    pagination: EntityPaginationPostDto,
    sort: EntitySortPostDto<UserAssignmentDto>,
    filters: EntityFilterPostDto<UserAssignmentDto>
  ): Promise<EntitiesDto<UserAssignmentDto>> {
    return this.#trpcClient.userAssignments.getPaginated.query({
      pagination,
      sort,
      filters,
    });
  }
}
