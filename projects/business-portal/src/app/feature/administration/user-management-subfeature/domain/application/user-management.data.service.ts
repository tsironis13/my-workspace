import { from, map, Observable } from 'rxjs';

import {
  EntityListDataService,
  EntityFilterData,
  Entities,
  EntitiesMapped,
} from '@business-portal/core/entities/application';
import { User, UserFilter } from './user-management.data.model';
import { inject } from '@angular/core';
import { UserManagementApiService } from '../infrastructure/user-management.api.service';
import { UserApiResponseItem } from '../infrastructure/user-management.api.model';
import { EntitiesApiResponse } from '@business-portal/core/entities/infrastructure';

export class UserManagementDataService
  implements EntityListDataService<User, UserFilter>
{
  readonly #userManagementApiService = inject(UserManagementApiService);

  getListByFilterAndPagination(
    params: EntityFilterData<User, UserFilter>
  ): Observable<Entities<User>> {
    //console.log(params);
    return from(
      this.#userManagementApiService.getUsersByFilterAndSortAndPagination(
        params.pagination,
        params.sort
      )
    ).pipe(
      map(
        (data) =>
          <
            EntitiesMapped<
              EntitiesApiResponse<UserApiResponseItem>,
              Entities<User>
            >
          >data
      )
    );
  }
}
