import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

//import { admin } from '../../admin.component';

//import { AssignmentsComponent } from '../../../../user-assignments-subfeature/presentation/smart/assignments.component';
//import { ert } from '../../../../user-assignments-subfeature/user-interface/dump/ert';

//import { Assignment } from '../../../../user-assignments/dashboard/assignments.component';
//import { device } from '../../../../devices/devices.component';
//import { AdminComponent } from '../../../../presentation/smart/admin.component';

import { UserManagementUiService } from './user-management.ui.service';
import { UsersListComponent } from '../presentational/list/users-list.component';
import { UsersHeaderComponent } from '../presentational/header/users-header.component';

@Component({
  selector: 'my-org-user-management',
  imports: [UsersListComponent, UsersHeaderComponent],
  templateUrl: `./user-management.component.html`,
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent implements OnInit {
  protected readonly userManagementUiService = inject(UserManagementUiService);

  ngOnInit(): void {
    console.log('management');
    // const x: Assignment = {
    //   name: 'test',
    // };
    //console.log(this.usersStore.loadUsers());
    // effect(() => {
    //   console.log(this.usersStore.entities());
    // });
    //console.log(admin);
    //console.log(management);
    //console.log(device);
  }
}
