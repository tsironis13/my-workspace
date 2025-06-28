import { from, map, Observable } from 'rxjs';
import { inject } from '@angular/core';

import { EntitiesMapped } from '@business-portal/core/entities/application';
import { UserAssignmentsUser } from './users.data.model';
import {
  UserAssignmentsUserDto,
  UserAssignmentsUsersApiService,
} from '@business-portal/user-assignments/infrastructure';

export class UserAssignmentsUsersDataService {
  readonly #userAssignmentsUsersApiService = inject(
    UserAssignmentsUsersApiService
  );

  getAll(): Observable<UserAssignmentsUser[]> {
    return from(this.#userAssignmentsUsersApiService.getAll()).pipe(
      map(
        (data) =>
          <EntitiesMapped<UserAssignmentsUserDto[], UserAssignmentsUser[]>>data
      )
    );
  }
}
