import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

//import { admin } from '../../admin.component';

//import { AssignmentsComponent } from '../../../../user-assignments-subfeature/presentation/smart/assignments.component';
//import { ert } from '../../../../user-assignments-subfeature/user-interface/dump/ert';

//import { Assignment } from '../../../../user-assignments/dashboard/assignments.component';
//import { device } from '../../../../devices/devices.component';
//import { AdminComponent } from '../../../../presentation/smart/admin.component';

import { UserManagementUiService } from './user-management.ui.service';
import { UsersListComponent } from '../presentational/list/users-list.component';
import { UsersHeaderComponent } from '../presentational/header/users-header.component';
import { UserToUserViewModelPipe } from './pipes/user-to-user-view-model.pipe';

@Component({
  selector: 'my-org-user-management',
  imports: [UsersListComponent, UsersHeaderComponent, UserToUserViewModelPipe],
  templateUrl: `./user-management.component.html`,
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent {
  protected readonly userManagementUiService = inject(UserManagementUiService);
}
