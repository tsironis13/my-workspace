import { signalStore, withMethods, withProps, patchState } from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, pipe } from 'rxjs';

import { UserAssignmentsAssignableUserRole } from './user-roles.data.model';
import { UserAssignmentsUserRolesDataService } from './user-roles.data.service';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
} from '@business-portal/core/store';

export const UserAssignmentsUserRolesStore = signalStore(
  withDevtools('user-assignments-user-roles'),
  withEntities<UserAssignmentsAssignableUserRole>(),
  withRequestStatus(),
  withProps(() => ({
    _userAssignmentsUserRolesDataService: inject(
      UserAssignmentsUserRolesDataService
    ),
  })),
  withMethods((store) => {
    return {
      getAssignableUserRoles: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, setPending());
            return store._userAssignmentsUserRolesDataService
              .getAssignableUserRoles()
              .pipe(
                tapResponse({
                  next: (response) => {
                    patchState(store, setFulfilled(), addEntities(response));
                  },
                  error: () => {
                    // console.error(error);
                  },
                })
              );
          })
        )
      ),
    };
  })
);
