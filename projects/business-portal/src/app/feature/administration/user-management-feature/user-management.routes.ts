import { Routes } from '@angular/router';
import { UserManagementStore } from './feature-domain/application/user-management.store';
import { UserManagementApiService } from './feature-domain/infrastructure/user-management.api.service';
import { UserManagementDataService } from './feature-domain/application/user-management.data.service';

export default <Routes>[
  {
    path: '',
    providers: [
      UserManagementStore,
      UserManagementDataService,
      UserManagementApiService,
    ],
    loadComponent: () =>
      import('./feature-ui/smart/dashboard/management.component').then(
        (m) => m.ManagementComponent
      ),
  },
  // {
  //   path: 'devices',
  //   loadChildren: () => import('../../devices/devices.routes'),
  // },
];
