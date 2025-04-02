import { from, map, Observable } from 'rxjs';
import { inject } from '@angular/core';

import {
  EntityListDataService,
  EntityFilterData,
  Entities,
  EntitiesMapped,
} from '@business-portal/core/entities/application';
import { UserEntity, UserFilter } from './user-management.data.model';
import { UserManagementApiService } from '../infrastructure/user-management.api.service';
import { UserApiResponseItem } from '../infrastructure/user-management.api.model';
import { EntitiesApiResponse } from '@business-portal/core/entities/infrastructure';
import { removeNullish } from '@business-portal/core/utils';

export class UserManagementDataService
  implements EntityListDataService<UserEntity, UserFilter>
{
  readonly #userManagementApiService = inject(UserManagementApiService);

  getListByFilterAndPagination(
    params: EntityFilterData<UserEntity, UserFilter>
  ): Observable<Entities<UserEntity>> {
    return from(
      this.#userManagementApiService.getUsersByFilterAndSortAndPagination(
        params.pagination,
        params.sort,
        removeNullish(params.filters)
      )
    ).pipe(
      map(
        (data) =>
          <
            EntitiesMapped<
              EntitiesApiResponse<UserApiResponseItem>,
              Entities<UserEntity>
            >
          >data
      )
    );
  }
}
