import {
  Component,
  ChangeDetectionStrategy,
  inject,
  HostBinding,
} from '@angular/core';

import { PageHeaderComponent, ButtonComponent } from '@business-portal/ui';
import { UserAssignmentCreateDialogDirective } from './directives/assignment-create-dialog.directive';
import { UserAssignmentsListComponent } from '../presentational/list/user-assignments-list.component';
import { UserAssignmentsUiService } from './user-assignments.ui.service';
import { UserAssignmentsStore } from '@business-portal/administration/user-assignments/domain';

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
  ],
  templateUrl: `./user-assignments.component.html`,
  providers: [UserAssignmentsStore, UserAssignmentsUiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAssignmentsComponent {
  protected readonly userAssignmentsUiService = inject(
    UserAssignmentsUiService
  );

  @HostBinding('style.width')
  width = '100%';
}
