import { Directive, inject } from '@angular/core';

import { UserFilterDialogComponent } from '../user-filter-dialog/user-filter-dialog.component';
import { UserManagementStore } from '@business-portal/administration/user-management/domain';
import { DynamicDialogService } from '@business-portal/pattern';
import {
  getUserFilterDialogForm,
  UserFilterDialogFormType,
} from '../user-filter-dialog/user-filter-dialog.form';

@Directive({
  selector: '[myOrgUserFilterDialog]',
  providers: [DynamicDialogService],
  host: {
    '(click)': 'handleClick()',
  },
})
export class UserFilterDialogDirective {
  readonly #dynamicDialogService =
    inject<
      DynamicDialogService<UserFilterDialogComponent, UserFilterDialogFormType>
    >(DynamicDialogService);

  readonly #userManagementStore = inject(UserManagementStore);

  handleClick(): void {
    const form = getUserFilterDialogForm();

    this.loadFilters(form);

    this.#dynamicDialogService.openDialog(
      UserFilterDialogComponent,
      {
        data: this.#userManagementStore.filters(),
        position: 'right',
        styleClass: 'right-side',
        contextState: {
          header: {
            title: 'Filter123',
          },
        },
        form,
      },
      (form) => {
        this.saveFilters(form);
      }
    );
  }

  private loadFilters(form: UserFilterDialogFormType): void {
    if (Object.keys(this.#userManagementStore.filters()).length > 0) {
      form.patchValue(this.#userManagementStore.filters());
    }
  }

  private saveFilters(form: UserFilterDialogFormType): void {
    this.#userManagementStore.changeFilters(form.getRawValue());
  }
}
