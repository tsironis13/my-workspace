import { Routes } from '@angular/router';

import { UserManagementDataService } from './domain/application/public-api';
import { UserManagementApiService } from './domain/infrastructure/public-api';

export default <Routes>[
  {
    path: '',
    providers: [UserManagementDataService, UserManagementApiService],
    loadComponent: () =>
      import('./presentation/smart/user-management.component').then(
        (m) => m.UserManagementComponent
      ),
  },
];
