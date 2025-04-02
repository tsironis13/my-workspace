import {
  signalStore,
  withHooks,
  withMethods,
  withProps,
  patchState,
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, pipe } from 'rxjs';

import { BusinessGroupCore } from './business-groups.data.model';
import { BusinessGroupsCoreDataService } from './business-groups.data.service';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
} from '@business-portal/core/store';

// Add 'Core' to the name to indicate that this is a core Store
export const BusinessGroupsCoreStore = signalStore(
  { providedIn: 'root' },
  withDevtools('business-groups-core'),
  withEntities<BusinessGroupCore>(),
  withRequestStatus(),
  withProps(() => ({
    _businessGroupCoreDataService: inject(BusinessGroupsCoreDataService),
  })),
  withMethods((store) => {
    return {
      getAll: rxMethod<void>(
        pipe(
          switchMap(() => {
            return store._businessGroupCoreDataService.getAll().pipe(
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
  }),
  withHooks({
    onInit(store) {
      patchState(store, setPending());

      store.getAll();
    },
  })
);
