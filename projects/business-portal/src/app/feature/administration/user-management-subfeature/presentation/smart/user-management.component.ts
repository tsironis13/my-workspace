import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserManagementUiService } from './user-management.ui.service';
import { UsersListComponent } from '../presentational/list/users-list.component';
import { UserToUserViewModelPipe } from './pipes/user-to-user-view-model.pipe';
import { UserFilterDialogDirective } from './directives/user-filter-dialog.directive';
import { PageHeaderComponent, ButtonComponent } from '@business-portal/ui';
import { AuthSharedService } from '@shared/auth';

@Component({
  selector: 'my-org-user-management',
  imports: [
    UsersListComponent,
    UserToUserViewModelPipe,
    ButtonComponent,
    UserFilterDialogDirective,
    PageHeaderComponent,
  ],
  templateUrl: `./user-management.component.html`,
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent {
  protected readonly userManagementUiService = inject(UserManagementUiService);
  protected readonly authService = inject(AuthSharedService);

  async signUp() {
    await this.authService.signUp('test@test.com', 'hdfsjklssjlksfd');
  }

  // signIn() {
  //   this.authService
  //     .signIn('giannis123@hotmail.com', 'fjsfljsjksdffds')
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }
}
