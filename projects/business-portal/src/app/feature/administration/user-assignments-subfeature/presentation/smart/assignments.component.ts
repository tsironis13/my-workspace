import { Component, ChangeDetectionStrategy } from '@angular/core';

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
export class AssignmentsComponent {}
