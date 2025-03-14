import { Component, effect, inject, OnInit } from '@angular/core';

//import { admin } from '../../admin.component';

import { AssignmentsComponent } from '../../../../user-assignments-feature/feature-ui/smart/assignments.component';
import { ert } from '../../../../user-assignments-feature/feature-ui/dump/ert';

//import { Assignment } from '../../../../user-assignments/dashboard/assignments.component';
//import { device } from '../../../../devices/devices.component';

import { UserListComponent } from '../../dump/user-list.component';
import { UserManagementStore } from '../../../feature-domain/application/user-management.store';

export type Management = {
  name: string;
};

@Component({
  selector: 'my-org-user-management',
  imports: [UserListComponent],
  template: `<div>management</div>
    <my-org-user-list></my-org-user-list>`,
})
export class ManagementComponent implements OnInit {
  usersStore = inject(UserManagementStore);

  constructor() {
    effect(() => {
      console.log(this.usersStore.entities());
    });
  }

  ngOnInit(): void {
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
