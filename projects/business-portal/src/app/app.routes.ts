import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./layout/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/navigation/navigation.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
