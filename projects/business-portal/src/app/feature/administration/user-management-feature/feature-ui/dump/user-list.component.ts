import { Component, OnInit } from '@angular/core';
//import { Management } from '../smart/dashboard/management.component';

@Component({
  selector: 'my-org-user-list',
  imports: [],
  template: `<div>user list dump component</div>`,
})
export class UserListComponent implements OnInit {
  ngOnInit(): void {
    console.log('user list');
    // const x: Management = {
    //   name: 'test',
    // };
    //console.log(x);
  }
}
