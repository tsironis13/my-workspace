import { from, map, Observable } from 'rxjs';

import {
  EntityListDataService,
  EntityFilterData,
  Entities,
} from '@business-portal/core/entities';
import { User, UserFilter } from './user-management.data.model';
import { inject } from '@angular/core';
import { UserManagementApiService } from '../infrastructure/user-management.api.service';

export class UserManagementDataService
  implements EntityListDataService<User, UserFilter>
{
  readonly #userManagementApiService = inject(UserManagementApiService);

  getListByFilterAndPagination(
    params: EntityFilterData<User, UserFilter>
  ): Observable<Entities<User>> {
    const x = from(this.#userManagementApiService.getUsers()).pipe();

    return x;
  }
}
