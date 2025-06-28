import { from, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import {
  EntityListDataService,
  EntityFilterData,
  Entities,
  EntitiesMapped,
} from '@business-portal/core/entities/application';
import { UserEntity, UserFilter } from './access-control.data.model';
import {
  AccessControlApiService,
  CreateUserPostDto,
  UserDto,
} from '@business-portal/access-control/infrastructure';
import { EntitiesDto } from '@business-portal/core/entities/infrastructure';
import { removeNullish } from '@business-portal/core/utils';

@Injectable()
export class AccessControlDataService
  implements EntityListDataService<UserEntity, UserFilter, CreateUserPostDto>
{
  readonly #accessControlApiService = inject(AccessControlApiService);

  getListByFilterAndPagination(
    params: EntityFilterData<UserEntity, UserFilter>
  ): Observable<Entities<UserEntity>> {
    console.log(params);
    return from(
      this.#accessControlApiService.getUsersByFilterAndSortAndPagination(
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
    return from(this.#accessControlApiService.createUser(entity));
  }
}
