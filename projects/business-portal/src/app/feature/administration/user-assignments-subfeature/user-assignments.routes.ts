import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    loadComponent: () =>
      import('./presentation/smart/assignments.component').then(
        (m) => m.AssignmentsComponent
      ),
  },
];
