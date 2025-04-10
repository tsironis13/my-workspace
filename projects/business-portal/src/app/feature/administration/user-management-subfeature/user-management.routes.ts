import { Routes } from '@angular/router';

import { UserManagementUiService } from './presentation/smart/user-management.ui.service';
import {
  UserManagementStore,
  UserManagementDataService,
} from './domain/application/public-api';
import { UserManagementApiService } from './domain/infrastructure/public-api';

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
