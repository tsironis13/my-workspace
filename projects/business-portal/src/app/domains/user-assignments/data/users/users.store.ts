import { signalStore, withMethods, withProps, patchState } from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, pipe } from 'rxjs';

import { UserAssignmentsUser } from './users.data.model';
import { UserAssignmentsUsersDataService } from './users.data.service';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
} from '@business-portal/core/store';

export const UserAssignmentsUsersStore = signalStore(
  withDevtools('user-assignments-users'),
  withEntities<UserAssignmentsUser>(),
  withRequestStatus(),
  withProps(() => ({
    _userAssignmentsUserDataService: inject(UserAssignmentsUsersDataService),
  })),
  withMethods((store) => {
    return {
      getAll: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, setPending());
            return store._userAssignmentsUserDataService.getAll().pipe(
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
