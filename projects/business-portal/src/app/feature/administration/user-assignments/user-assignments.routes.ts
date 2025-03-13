import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/assignments.component').then(
        (m) => m.AssignmentsComponent
      ),
  },
];
