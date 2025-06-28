import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UsersOverviewFeatureService } from './users-overview.feature.service';
import {
  UsersListComponent,
  UserViewModel,
} from '@business-portal/access-control/presentation';
import {
  PageHeaderComponent,
  ButtonComponent,
  FullWidthDirective,
} from '@business-portal/ui';
import { provideSortConfig } from '@business-portal/core/config';
import { UserEntityToUserViewModelPipe } from './user-entity-to-user-view-model.pipe';

@Component({
  selector: 'my-org-users-overview',
  imports: [
    UsersListComponent,
    UserEntityToUserViewModelPipe,
    ButtonComponent,
    PageHeaderComponent,
  ],
  templateUrl: `./users-overview.component.html`,
  providers: [
    UsersOverviewFeatureService,
    provideSortConfig<UserViewModel>('name', 1),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [FullWidthDirective],
})
export class UsersOverviewComponent {
  protected readonly usersOverviewFeatureService = inject(
    UsersOverviewFeatureService
  );
}
