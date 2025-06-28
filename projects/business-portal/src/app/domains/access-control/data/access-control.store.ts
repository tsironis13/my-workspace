import { signalStore, withHooks } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import { UserEntity, UserFilter } from './access-control.data.model';
import { AccessControlDataService } from './access-control.data.service';
import { withListDataService } from '@business-portal/core/entities/application';
import { CreateUserPostDto } from '@business-portal/access-control/infrastructure';

export const AccessControlStore = signalStore(
  withDevtools('access-control'),
  withEntities<UserEntity>(),
  withListDataService<
    UserEntity,
    UserFilter,
    CreateUserPostDto,
    AccessControlDataService
  >(AccessControlDataService),
  withHooks({
    onInit(store) {
      store.getListByFilterAndPagination(store.entityFilterParams);
    },
  })
);
