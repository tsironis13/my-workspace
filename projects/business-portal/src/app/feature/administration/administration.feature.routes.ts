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
      import('./user-management-subfeature/user-management.routes'),
  },
  {
    path: 'assignments',
    loadChildren: () =>
      import('./user-assignments-subfeature/user-assignments.routes'),
  },
];
