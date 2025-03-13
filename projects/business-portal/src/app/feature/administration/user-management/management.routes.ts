import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/management.component').then(
        (m) => m.ManagementComponent
      ),
  },
];
