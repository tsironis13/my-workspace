import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { UserManagementUiService } from './user-management.ui.service';
import { UsersListComponent } from '../presentational/list/users-list.component';
import { UserEntityToUserViewModelPipe } from './pipes/user-entity-to-user-view-model.pipe';
import { UserFilterDialogDirective } from './directives/user-filter-dialog.directive';
import { PageHeaderComponent, ButtonComponent } from '@business-portal/ui';
import { UserCreateDialogDirective } from './directives/user-create-dialog.directive';
import { provideSortConfig } from '@business-portal/core/config';
import { UserViewModel } from '../presentational/models/user.view.model';
import { UserManagementStore } from '@business-portal/administration/user-management/domain';

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
  providers: [
    UserManagementStore,
    UserManagementUiService,
    provideSortConfig<UserViewModel>('name', 1),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent {
  protected readonly userManagementUiService = inject(UserManagementUiService);

  @HostBinding('style.width')
  width = '100%';
}
