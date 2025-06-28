import { computed, DestroyRef, inject, Injectable } from '@angular/core';
import { Events } from '@ngrx/signals/events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserCreateDialogComponent } from './user-create-dialog.component';
import { BusinessGroupsCoreStore } from '@business-portal/core/business-groups';
import {
  getUserCreateDialogForm,
  UserCreateDialogFormType,
} from './user-create-dialog.form';
import { DynamicDialogStore } from '@business-portal/pattern';
import { AuthStore } from '@business-portal/core/auth';
import { removeNullish } from '@business-portal/core/utils';
import {
  accessControlEvents,
  AccessControlStore,
} from '@business-portal/access-control/data';

@Injectable()
export class UserCreateFeatureService {
  readonly #dynamicDialogStore = inject(DynamicDialogStore);
  readonly #businessGroupsCoreStore = inject(BusinessGroupsCoreStore);
  readonly #accessControlStore = inject(AccessControlStore);
  readonly #authStore = inject(AuthStore);
  readonly #events = inject(Events);
  readonly #destroyRef = inject(DestroyRef);

  readonly #data = computed(() => {
    return {
      businessGroups: this.#businessGroupsCoreStore.entities(),
      loading: this.#businessGroupsCoreStore.isPending(),
    };
  });

  constructor() {
    this.#events
      .on(accessControlEvents.openCreateUserDialog)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.openCreateUserDialog());
  }

  openCreateUserDialog(): void {
    this.getBusinessGroups();

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

  private getBusinessGroups(): void {
    this.#businessGroupsCoreStore.getAll();
  }

  private createUser(form: UserCreateDialogFormType): void {
    const formValue = removeNullish(form.getRawValue());

    this.#authStore.signUp(formValue.email).then((authUserId) => {
      this.#accessControlStore.createEntity({
        ...formValue,
        authUserId,
      });
    });
  }
}
