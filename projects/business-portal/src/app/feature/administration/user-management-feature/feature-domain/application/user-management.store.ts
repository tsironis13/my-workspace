import { signalStore, withHooks } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { User } from './user-management.data.model';
import { UserManagementDataService } from './user-management.data.service';
import { withListDataService } from '@business-portal/core/entities';

// type UsersState = {
//   users: [];
//   isLoading: boolean;
//   filter: { query: string; order: 'asc' | 'desc' };
// };

// const initialState: UsersState = {
//   users: [],
//   isLoading: false,
//   filter: { query: '', order: 'asc' },
// };

export const UserManagementStore = signalStore(
  //withState(initialState),
  withEntities<User>(),
  withListDataService(UserManagementDataService),
  withHooks({
    onInit(store) {
      store.getListByFilterAndPagination(store.entityFilterParams);
    },
  })
  // withMethods(
  //   (store, userManagementDataService = inject(UserManagementDataService)) => ({
  //     async loadUsers() {
  //       const users = await userManagementDataService.getListByFilterAndPagination({});
  //       console.log(users);
  //       patchState(store, setAllEntities(users));
  //     },
  //   })
  // )
);
