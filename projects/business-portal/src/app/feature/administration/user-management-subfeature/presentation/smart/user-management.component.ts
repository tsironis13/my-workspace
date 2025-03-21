import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

//import { admin } from '../../admin.component';

//import { AssignmentsComponent } from '../../../../user-assignments-subfeature/presentation/smart/assignments.component';
//import { ert } from '../../../../user-assignments-subfeature/user-interface/dump/ert';

//import { Assignment } from '../../../../user-assignments/dashboard/assignments.component';
//import { device } from '../../../../devices/devices.component';
//import { AdminComponent } from '../../../../presentation/smart/admin.component';

import { UserManagementUiService } from './user-management.ui.service';
import { UsersListComponent } from '../presentational/list/users-list.component';
import { UserToUserViewModelPipe } from './pipes/user-to-user-view-model.pipe';
import { UserFilterDialogDirective } from './directives/user-filter-dialog.directive';
import { PageHeaderComponent } from '@business-portal/ui';

@Component({
  selector: 'my-org-user-management',
  imports: [
    UsersListComponent,
    UserToUserViewModelPipe,
    ButtonModule,
    UserFilterDialogDirective,
    PageHeaderComponent,
  ],
  templateUrl: `./user-management.component.html`,
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent {
  protected readonly userManagementUiService = inject(UserManagementUiService);
}
