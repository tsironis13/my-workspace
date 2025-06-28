import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import {
  PageHeaderComponent,
  ButtonComponent,
  FullWidthDirective,
} from '@business-portal/ui';
import { UserAssignmentCreateDialogDirective } from './directives/assignment-create-dialog.directive';
import { UserAssignmentsListComponent } from '@business-portal/user-assignments/presentation';
import { UserAssignmentsFeatureService } from './user-assignments.feature.service';
import { UserAssignmentsStore } from '@business-portal/user-assignments/data';
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
  providers: [UserAssignmentsStore, UserAssignmentsFeatureService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [FullWidthDirective],
})
export class UserAssignmentsComponent {
  protected readonly userAssignmentsFeatureService = inject(
    UserAssignmentsFeatureService
  );
}
