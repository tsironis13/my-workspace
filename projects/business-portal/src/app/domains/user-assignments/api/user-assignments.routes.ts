import { Routes } from '@angular/router';

export default [
  {
    path: '',
    providers: [],
    loadComponent: () =>
      import('../feat-overview/user-assignments.component').then(
        (m) => m.UserAssignmentsComponent
      ),
  },
] satisfies Routes;
