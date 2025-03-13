import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'administration',
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./feature/administration/administration.routes'),
  },
];
