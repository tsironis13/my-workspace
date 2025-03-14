import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user-management-feature/user-management.routes'),
  },
  {
    path: 'assignments',
    loadChildren: () =>
      import('./user-assignments-feature/user-assignments.routes'),
  },
];
