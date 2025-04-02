import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BusinessGroupCore } from '@business-portal/core/business-groups';

export type UserCreateDialogFormType = FormGroup<{
  businessGroup: FormControl<BusinessGroupCore[] | null>;
}>;

export const getUserCreateDialogForm = (): UserCreateDialogFormType => {
  return <UserCreateDialogFormType>new FormGroup({
    businessGroup: new FormControl(null, [Validators.required]),
  });
};
