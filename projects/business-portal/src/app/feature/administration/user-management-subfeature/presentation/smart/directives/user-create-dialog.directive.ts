import { computed, Directive, inject } from '@angular/core';

import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';
import { BusinessGroupsCoreStore } from '@business-portal/core/business-groups';
import {
  getUserCreateDialogForm,
  UserCreateDialogFormType,
} from '../user-create-dialog/user-create-dialog.form';
import { DynamicDialogStore } from '@business-portal/pattern';
import { UserManagementStore } from '@business-portal/administration/user-management/domain';
import { AuthStore } from '@business-portal/core/auth';
import { removeNullish } from '@business-portal/core/utils';

@Directive({
  selector: '[myOrgUserCreateDialog]',
  host: {
    '(click)': 'handleClick()',
  },
})
export class UserCreateDialogDirective {
  readonly #dynamicDialogStore = inject(DynamicDialogStore);
  readonly #businessGroupsCoreStore = inject(BusinessGroupsCoreStore);
  readonly #userManagementStore = inject(UserManagementStore);
  readonly #authStore = inject(AuthStore);

  readonly #data = computed(() => {
    return {
      businessGroups: this.#businessGroupsCoreStore.entities(),
      loading: this.#businessGroupsCoreStore.isPending(),
    };
  });

  handleClick(): void {
    const form = getUserCreateDialogForm();

    this.#dynamicDialogStore.openDialog(
      UserCreateDialogComponent,
      {
        key: 'user-create',
        data: this.#data,
        position: 'right',
        styleClass: 'right-side',
        contextState: {
          header: {
            title: 'Create User',
          },
        },
        form,
      },
      (form) => this.createUser(form)
    );
  }

  private createUser(form: UserCreateDialogFormType): void {
    const formValue = removeNullish(form.getRawValue());

    this.#authStore.signUp(formValue.email).then((authUserId) => {
      this.#userManagementStore.createEntity({
        ...formValue,
        authUserId,
      });
    });
  }
}
