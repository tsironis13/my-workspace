import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserManagementUiService } from './user-management.ui.service';
import { UsersListComponent } from '../presentational/list/users-list.component';
import { UserEntityToUserViewModelPipe } from './pipes/user-entity-to-user-view-model.pipe';
import { UserFilterDialogDirective } from './directives/user-filter-dialog.directive';
import { PageHeaderComponent, ButtonComponent } from '@business-portal/ui';
import { UserCreateDialogDirective } from './directives/user-create-dialog.directive';

@Component({
  selector: 'my-org-user-management',
  imports: [
    UsersListComponent,
    UserEntityToUserViewModelPipe,
    ButtonComponent,
    UserFilterDialogDirective,
    UserCreateDialogDirective,
    PageHeaderComponent,
  ],
  templateUrl: `./user-management.component.html`,
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent {
  protected readonly userManagementUiService = inject(UserManagementUiService);
}
