import { Component, OnInit } from '@angular/core';
//import { admin } from '../../admin.component';
//import { device } from '../../../devices/devices.component';
import { test } from './test/test';
//import { Management } from '../../user-management-feature/ui/smart/dashboard/management.component';

export type Assignment = {
  name: string;
};

@Component({
  selector: 'my-org-user-assignments',
  imports: [],
  template: `<div>assignments</div>`,
})
export class AssignmentsComponent implements OnInit {
  ngOnInit(): void {
    // const x: Management = {
    //   name: 'test',
    // };
    console.log('assignments');
    //console.log(admin);
    //console.log(management);
    //console.log(device);
    console.log(test);
  }
}
