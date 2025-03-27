import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { redirectIfLoggedInGuard } from '@shared/auth';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [redirectIfLoggedInGuard()],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
