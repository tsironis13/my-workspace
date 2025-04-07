import { from, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { EntitiesMapped } from '@business-portal/core/entities/application';
import { UserAssignmentsAssignableUserRole } from './user-roles.data.model';
import { UserAssignmentsUserRolesApiService } from '../../infrastructure/user-roles/user-roles.api.service';
import { UserAssignmentsAssignableUserRoleDto } from '../../infrastructure/user-roles/user-roles.api.model';

@Injectable({
  providedIn: 'root',
})
export class UserAssignmentsUserRolesDataService {
  readonly #userAssignmentsUserRolesApiService = inject(
    UserAssignmentsUserRolesApiService
  );

  getAssignableUserRoles(): Observable<UserAssignmentsAssignableUserRole[]> {
    return from(
      this.#userAssignmentsUserRolesApiService.getAssignableUserRoles()
    ).pipe(
      map(
        (data) =>
          <
            EntitiesMapped<
              UserAssignmentsAssignableUserRoleDto[],
              UserAssignmentsAssignableUserRole[]
            >
          >data
      )
    );
  }
}
