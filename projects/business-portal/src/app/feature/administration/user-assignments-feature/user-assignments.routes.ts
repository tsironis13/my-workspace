import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    loadComponent: () =>
      import('./feature-ui/smart/assignments.component').then(
        (m) => m.AssignmentsComponent
      ),
  },
];
