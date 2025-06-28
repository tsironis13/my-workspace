import { Routes } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../access-control/api/access-control.routes'),
  },
  // {
  //   path: 'assignments',
  //   loadChildren: () =>
  //     import('../../user-assignments/api/user-assignments.routes'),
  // },
] satisfies Routes;
