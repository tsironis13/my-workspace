import { FormControl, FormGroup, Validators } from '@angular/forms';

export type UserAssignmentCreateDialogFormType = FormGroup<{
  userId: FormControl<number | null>;
  userRoleId: FormControl<number | null>;
}>;

export const getUserAssignmentCreateDialogForm =
  (): UserAssignmentCreateDialogFormType => {
    return <UserAssignmentCreateDialogFormType>new FormGroup({
      userId: new FormControl(null, [Validators.required]),
      userRoleId: new FormControl(null, [Validators.required]),
    });
  };
