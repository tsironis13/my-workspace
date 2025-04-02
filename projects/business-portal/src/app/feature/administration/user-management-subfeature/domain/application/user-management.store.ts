import { signalStore, withHooks } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import { UserEntity, UserFilter } from './user-management.data.model';
import { UserManagementDataService } from './user-management.data.service';
import { withListDataService } from '@business-portal/core/entities/application';

export const UserManagementStore = signalStore(
  withDevtools('user-management'),
  withEntities<UserEntity>(),
  withListDataService<UserEntity, UserFilter, UserManagementDataService>(
    UserManagementDataService
  ),
  withHooks({
    onInit(store) {
      store.getListByFilterAndPagination(store.entityFilterParams);
    },
  })
);
