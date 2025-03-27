import { Routes } from '@angular/router';

import { NavigationContainerComponent } from './navigation-container.component';
import { authGuard } from '@shared/auth';

export const routes: Routes = [
  {
    path: '',
    component: NavigationContainerComponent,
    children: [
      {
        path: 'administration',
        canActivate: [authGuard()],
        loadChildren: () =>
          import('../../feature/administration/administration.feature.routes'),
      },
      {
        path: '**',
        redirectTo: 'administration',
      },
    ],
  },
];
