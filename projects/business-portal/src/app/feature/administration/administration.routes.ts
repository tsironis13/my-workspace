import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export default <Routes>[
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./user-management/management.routes'),
      },
      {
        path: 'assignments',
        loadChildren: () =>
          import('./user-assignments/user-assignments.routes'),
      },
    ],
  },
];
