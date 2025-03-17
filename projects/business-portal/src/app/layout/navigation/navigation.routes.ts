import { Routes } from '@angular/router';
import { NavigationContainerComponent } from './navigation-container.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationContainerComponent,
    children: [
      {
        path: 'administration',
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
