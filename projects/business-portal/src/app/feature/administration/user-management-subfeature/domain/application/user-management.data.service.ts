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
import {
  CreateUserPostDto,
  UserDto,
} from '../infrastructure/user-management.api.model';
import { EntitiesDto } from '@business-portal/core/entities/infrastructure';
import { removeNullish } from '@business-portal/core/utils';

export class UserManagementDataService
  implements EntityListDataService<UserEntity, UserFilter, CreateUserPostDto>
{
  readonly #userManagementApiService = inject(UserManagementApiService);

  getListByFilterAndPagination(
    params: EntityFilterData<UserEntity, UserFilter>
  ): Observable<Entities<UserEntity>> {
    console.log(params);
    return from(
      this.#userManagementApiService.getUsersByFilterAndSortAndPagination(
        params.pagination,
        params.sort,
        removeNullish(params.filters)
      )
    ).pipe(
      map(
        (data) =>
          <EntitiesMapped<EntitiesDto<UserDto>, Entities<UserEntity>>>data
      )
    );
  }

  createEntity(entity: CreateUserPostDto): Observable<unknown> {
    return from(this.#userManagementApiService.createUser(entity));
  }
}
