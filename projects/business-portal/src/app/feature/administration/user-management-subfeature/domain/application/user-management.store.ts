import { signalStore, withHooks } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { User, UserFilter } from './user-management.data.model';
import { UserManagementDataService } from './user-management.data.service';
import { withListDataService } from '@business-portal/core/entities/application';

export const UserManagementStore = signalStore(
  withEntities<User>(),
  withListDataService<User, UserFilter, UserManagementDataService>(
    UserManagementDataService
  ),
  withHooks({
    onInit(store) {
      store.getListByFilterAndPagination(store.entityFilterParams);
    },
  })
);
