import { Component, OnInit } from '@angular/core';
//import { UserManagementStore } from '../../../domain/application/user-management.store';
import { Dump2Component } from '../dump/d.component';

export type Management = {
  name: string;
};

@Component({
  selector: 'my-org-user-management',
  imports: [Dump2Component],
  template: `<div></div>
    <my-org-dump2></my-org-dump2>`,
})
export class AdminComponent implements OnInit {
  //   usersStore = inject(UserManagementStore);

  ngOnInit(): void {
    console.log('ADMIN ');
  }
}
