import { Component, OnInit } from '@angular/core';
import { admin } from '../../admin.component';
import { device } from '../../../devices/test.component';

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
    console.log('assignments');
    console.log(admin);
    //console.log(management);
    console.log(device);
  }
}
