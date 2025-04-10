import { Routes } from '@angular/router';

import {
  UserAssignmentsUsersApiService,
  UserAssignmentsUserRolesApiService,
} from './domain/infrastructure/public-api';

import {
  UserAssignmentsUsersStore,
  UserAssignmentsUserRolesDataService,
  UserAssignmentsUsersDataService,
  UserAssignmentsUserRolesStore,
} from './domain/application/public-api';

export default <Routes>[
  {
    path: '',
    providers: [
      UserAssignmentsUsersStore,
      UserAssignmentsUserRolesStore,
      UserAssignmentsUsersApiService,
      UserAssignmentsUserRolesApiService,
      UserAssignmentsUsersDataService,
      UserAssignmentsUserRolesDataService,
    ],
    loadComponent: () =>
      import('./presentation/smart/assignments.component').then(
        (m) => m.AssignmentsComponent
      ),
  },
];
