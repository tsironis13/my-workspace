import { signalStore, withHooks } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { User } from './user-management.data.model';
import { UserManagementDataService } from './user-management.data.service';
import { withListDataService } from '@business-portal/core/entities/application';

export const UserManagementStore = signalStore(
  //withState(initialState),
  withEntities<User>(),
  withListDataService(UserManagementDataService),
  withHooks({
    onInit(store) {
      store.getListByFilterAndPagination(store.entityFilterParams);
    },
  })
);
