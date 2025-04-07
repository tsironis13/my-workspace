import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
//import { admin } from '../../admin.component';
//import { device } from '../../../devices/devices.component';

import { PageHeaderComponent, ButtonComponent } from '@business-portal/ui';
import { UserAssignmentCreateDialogDirective } from './directives/assignment-create-dialog.directive';

export type Assignment = {
  name: string;
};

@Component({
  selector: 'my-org-user-assignments',
  imports: [
    PageHeaderComponent,
    ButtonComponent,
    UserAssignmentCreateDialogDirective,
  ],
  templateUrl: `./assignments.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsComponent implements OnInit {
  ngOnInit(): void {
    // const x: Management = {
    //   name: 'test',
    // };
    console.log('assignments');
  }
}
