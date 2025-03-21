import { FormControl, FormGroup } from '@angular/forms';

export type UserFilterDialogFormType = FormGroup<{
  active: FormControl<boolean>;
}>;

export const getUserFilterDialogForm = (): UserFilterDialogFormType => {
  return new FormGroup({
    active: new FormControl(),
  });
};
