import { from, map, Observable } from 'rxjs';
import { inject } from '@angular/core';

import {
  EntityListDataService,
  EntityFilterData,
  Entities,
  EntitiesMapped,
} from '@business-portal/core/entities/application';
import { EntitiesDto } from '@business-portal/core/entities/infrastructure';
import { removeNullish } from '@business-portal/core/utils';
import {
  UserAssignmentEntity,
  UserAssignmentFilter,
} from './user-assignments.data.model';
import { UserAssignmentsApiService } from '../../infrastructure/user-assignments/user-assignments.api.service';
import { UserAssignmentDto } from '../../infrastructure/user-assignments/user-assignments.api.model';

export class UserAssignmentsDataService
  implements
    EntityListDataService<UserAssignmentEntity, UserAssignmentFilter, any>
{
  readonly #userAssignmentsApiService = inject(UserAssignmentsApiService);

  getListByFilterAndPagination(
    params: EntityFilterData<UserAssignmentEntity, UserAssignmentFilter>
  ): Observable<Entities<UserAssignmentEntity>> {
    return from(
      this.#userAssignmentsApiService.getUserAssignmentsByFilterAndSortAndPagination(
        params.pagination,
        params.sort,
        removeNullish(params.filters)
      )
    ).pipe(
      map(
        (data) =>
          <
            EntitiesMapped<
              EntitiesDto<UserAssignmentDto>,
              Entities<UserAssignmentEntity>
            >
          >data
      )
    );
  }

  createEntity(entity: any): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
}
