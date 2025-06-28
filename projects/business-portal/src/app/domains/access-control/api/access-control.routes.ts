import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import {
  AccessControlDataService,
  AccessControlStore,
} from '@business-portal/access-control/data';
import { AccessControlApiService } from '@business-portal/access-control/infrastructure';
import { UserFilterFeatureService } from '../feat-filter/user-filter.feature.service';
import { UserCreateFeatureService } from '../feat-create/user-create.feature.service';

export default [
  {
    path: '',
    providers: [
      AccessControlDataService,
      AccessControlApiService,
      UserFilterFeatureService,
      UserCreateFeatureService,
      AccessControlStore,
    ],
    loadComponent: () =>
      import('../feat-overview/users-overview.component').then(
        (m) => m.UsersOverviewComponent
      ),
    resolve: {
      userFilterFeature: () => inject(UserFilterFeatureService),
      userCreateFeature: () => inject(UserCreateFeatureService),
    },
  },
] satisfies Routes;
