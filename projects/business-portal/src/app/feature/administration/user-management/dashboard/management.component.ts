import { Component, OnInit } from '@angular/core';
import { admin } from '../../admin.component';
import { Assignment } from '../../user-assignments/dashboard/assignments.component';
import { device } from '../../../devices/test.component';

@Component({
  selector: 'my-org-user-management',
  imports: [],
  template: `<div>management</div>`,
})
export class ManagementComponent implements OnInit {
  ngOnInit(): void {
    const x: Assignment = {
      name: 'test',
    };

    console.log('management');
    console.log(admin);
    //console.log(management);
    console.log(device);
  }
}
