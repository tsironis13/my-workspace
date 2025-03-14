import { Component, OnInit } from '@angular/core';
//import { AdminComponent } from '../smart/admin.component';
//import { UserListComponent } from '../../user-management-feature/feature-ui/dump/user-list.component';

@Component({
  selector: 'my-org-dump2',
  imports: [],
  template: `<div>dump2</div> `,
})
export class Dump2Component implements OnInit {
  //   usersStore = inject(UserManagementStore);

  ngOnInit(): void {
    console.log('dump2');
  }
}
