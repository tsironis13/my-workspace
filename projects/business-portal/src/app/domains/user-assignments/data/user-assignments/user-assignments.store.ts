import { signalStore, withHooks } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import {
  UserAssignmentEntity,
  UserAssignmentFilter,
} from './user-assignments.data.model';
import { UserAssignmentsDataService } from './user-assignments.data.service';
import { withListDataService } from '@business-portal/core/entities/application';
import { CreateUserAssignmentPostDto } from '@business-portal/user-assignments/infrastructure';

export const UserAssignmentsStore = signalStore(
  withDevtools('user-assignments'),
  withEntities<UserAssignmentEntity>(),
  withListDataService<
    UserAssignmentEntity,
    UserAssignmentFilter,
    CreateUserAssignmentPostDto,
    UserAssignmentsDataService
  >(UserAssignmentsDataService),
  withHooks({
    onInit(store) {
      store.getListByFilterAndPagination(store.entityFilterParams);
    },
  })
);
