import { Routes } from '@angular/router';

import {
  UserAssignmentsUsersApiService,
  UserAssignmentsUserRolesApiService,
  UserAssignmentsApiService,
} from './domain/infrastructure/public-api';

import {
  UserAssignmentsUsersStore,
  UserAssignmentsUserRolesDataService,
  UserAssignmentsUsersDataService,
  UserAssignmentsUserRolesStore,
  UserAssignmentsDataService,
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
      UserAssignmentsDataService,
      UserAssignmentsApiService,
    ],
    loadComponent: () =>
      import('./presentation/smart/user-assignments.component').then(
        (m) => m.UserAssignmentsComponent
      ),
  },
];
