import { Routes } from '@angular/router';

import {
  UserAssignmentsUserRolesStore,
  UserAssignmentsUsersStore,
  UserAssignmentsUsersDataService,
  UserAssignmentsUsersApiService,
  UserAssignmentsUserRolesDataService,
  UserAssignmentsUserRolesApiService,
} from '@business-portal/administration/user-assignments/domain';

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
