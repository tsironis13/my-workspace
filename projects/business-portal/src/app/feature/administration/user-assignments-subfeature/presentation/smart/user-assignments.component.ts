import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import {
  PageHeaderComponent,
  ButtonComponent,
  FullWidthDirective,
} from '@business-portal/ui';
import { UserAssignmentCreateDialogDirective } from './directives/assignment-create-dialog.directive';
import { UserAssignmentsListComponent } from '../presentational/list/user-assignments-list.component';
import { UserAssignmentsUiService } from './user-assignments.ui.service';
import { UserAssignmentsStore } from '@business-portal/administration/user-assignments/domain';
import { UserAssignmentEntityToUserAssignmentViewModelPipe } from './pipes/user-assignments-entity-to-user-assignments-view-model.pipe';

export type Assignment = {
  name: string;
};

@Component({
  selector: 'my-org-user-assignments',
  imports: [
    PageHeaderComponent,
    ButtonComponent,
    UserAssignmentCreateDialogDirective,
    UserAssignmentsListComponent,
    UserAssignmentEntityToUserAssignmentViewModelPipe,
  ],
  templateUrl: `./user-assignments.component.html`,
  providers: [UserAssignmentsStore, UserAssignmentsUiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [FullWidthDirective],
})
export class UserAssignmentsComponent {
  protected readonly userAssignmentsUiService = inject(
    UserAssignmentsUiService
  );
}
