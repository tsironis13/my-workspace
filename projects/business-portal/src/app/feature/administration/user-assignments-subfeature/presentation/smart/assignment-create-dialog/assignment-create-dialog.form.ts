import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAssignmentsAssignableUserRole } from '@business-portal/administration/user-assignments/domain';
import { ScopeTreeSelectModel } from './scope-tree-select.model';

export type UserAssignmentCreateDialogFormType = FormGroup<{
  userId: FormControl<number | null>;
  userRole: FormControl<UserAssignmentsAssignableUserRole | null>;
  scope: FormControl<ScopeTreeSelectModel | null>;
}>;

export const getUserAssignmentCreateDialogForm =
  (): UserAssignmentCreateDialogFormType => {
    return <UserAssignmentCreateDialogFormType>new FormGroup({
      userId: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
      scope: new FormControl(null, [Validators.required]),
    });
  };
