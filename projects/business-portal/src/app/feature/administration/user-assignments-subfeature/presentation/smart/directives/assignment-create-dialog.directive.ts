import { computed, Directive, inject } from '@angular/core';

import {
  UserAssignmentCreateDialogComponent,
  UserAssignmentCreateDialogData,
} from '../assignment-create-dialog/assignment-create-dialog.component';
import { getUserAssignmentCreateDialogForm } from '../assignment-create-dialog/assignment-create-dialog.form';
import { DynamicDialogStore } from '@business-portal/pattern';
import {
  UserAssignmentsUsersStore,
  UserAssignmentsUserRolesStore,
} from '@business-portal/administration/user-assignments/domain';

@Directive({
  selector: '[myOrgUserAssignmentCreateDialog]',
  host: {
    '(click)': 'handleClick()',
  },
})
export class UserAssignmentCreateDialogDirective {
  readonly #dynamicDialogStore = inject(DynamicDialogStore);
  readonly #usersCoreStore = inject(UserAssignmentsUsersStore);
  readonly #userRolesCoreStore = inject(UserAssignmentsUserRolesStore);

  readonly #data = computed<UserAssignmentCreateDialogData>(() => {
    return {
      users: {
        data: this.#usersCoreStore.entities(),
        loading: this.#usersCoreStore.isPending(),
      },
      userRoles: {
        data: this.#userRolesCoreStore.entities(),
        loading: this.#userRolesCoreStore.isPending(),
      },
    };
  });

  handleClick(): void {
    this.getUsers();
    this.getAssignableUserRoles();

    const form = getUserAssignmentCreateDialogForm();

    this.#dynamicDialogStore.openDialog(
      UserAssignmentCreateDialogComponent,
      {
        key: 'user-assignment-create',
        data: this.#data,
        position: 'right',
        styleClass: 'right-side',
        contextState: {
          header: {
            title: 'Create Assignment',
          },
        },
        form,
      },
      (form) => {
        console.log(form);
      }
    );
  }

  private getUsers(): void {
    this.#usersCoreStore.getAll();
  }

  private getAssignableUserRoles(): void {
    this.#userRolesCoreStore.getAssignableUserRoles();
  }
}
