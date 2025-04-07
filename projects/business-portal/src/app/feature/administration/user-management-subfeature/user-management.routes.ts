import { Routes } from '@angular/router';

import {
  UserManagementStore,
  UserManagementApiService,
  UserManagementDataService,
} from '@business-portal/administration/user-management/domain';
import { UserManagementUiService } from './presentation/smart/user-management.ui.service';

export default <Routes>[
  {
    path: '',
    providers: [
      UserManagementStore,
      UserManagementDataService,
      UserManagementApiService,
      UserManagementUiService,
    ],
    loadComponent: () =>
      import('./presentation/smart/user-management.component').then(
        (m) => m.UserManagementComponent
      ),
  },
];
