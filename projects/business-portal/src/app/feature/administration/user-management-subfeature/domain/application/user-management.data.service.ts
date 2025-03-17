import { from, map, Observable } from 'rxjs';

import {
  EntityListDataService,
  EntityFilterData,
  Entities,
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
    console.log(params);
    return from(
      this.#userManagementApiService.getUsersByFilterAndPagination(
        params.pagination
      )
    ).pipe(map((x) => this.mapUserApiResponseToUserEntities(x)));
  }

  private mapUserApiResponseToUserEntities(
    userApiResponse: EntitiesApiResponse<UserApiResponseItem>
  ): Entities<User> {
    return {
      items: userApiResponse.items.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        familyName: item.familyName,
        phoneNumber: item.phoneNumber,
        active: item.active,
        createdAt: item.createdAt,
        deletedAt: item.deletedAt,
      })),
      totalCount: userApiResponse.totalCount,
    };
  }
}
