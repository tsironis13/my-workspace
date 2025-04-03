import { FormControl, FormGroup, Validators } from '@angular/forms';

export type UserCreateDialogFormType = FormGroup<{
  name: FormControl<string>;
  familyName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  businessGroupId: FormControl<number | undefined>;
}>;

export const getUserCreateDialogForm = (): UserCreateDialogFormType => {
  return <UserCreateDialogFormType>new FormGroup({
    name: new FormControl('', [Validators.required]),
    familyName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    businessGroupId: new FormControl(),
  });
};
