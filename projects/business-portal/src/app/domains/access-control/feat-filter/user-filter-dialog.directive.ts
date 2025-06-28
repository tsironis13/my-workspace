import { Directive, inject } from '@angular/core';

import { UserFilterDialogComponent } from './user-filter-dialog.component';
import {
  getUserFilterDialogForm,
  UserFilterDialogFormType,
} from './user-filter-dialog.form';
import { DynamicDialogStore } from '@business-portal/pattern';
import { ExtractControls } from '@business-portal/core/utils';
import { AccessControlStore } from '../data/public-api';

@Directive({
  selector: '[myOrgUserFilterDialog]',
  host: {
    '(click)': 'handleClick()',
  },
})
export class UserFilterDialogDirective {
  readonly #dynamicDialogStore = inject(DynamicDialogStore);
  readonly #accessControlStore = inject(AccessControlStore);

  handleClick(): void {
    const form = getUserFilterDialogForm();

    this.loadFilters(form);

    this.#dynamicDialogStore.openDialog<
      UserFilterDialogComponent,
      ExtractControls<UserFilterDialogFormType>,
      null,
      { reset: boolean }
    >(
      UserFilterDialogComponent,
      {
        key: 'user-filter',
        data: null,
        position: 'right',
        styleClass: 'right-side',
        contextState: {
          header: {
            title: 'Filter',
          },
        },
        form,
      },
      (form, { reset }) => {
        this.saveFilters(form, reset);
      }
    );
  }

  private loadFilters(form: UserFilterDialogFormType): void {
    if (Object.keys(this.#accessControlStore.filters()).length > 0) {
      form.patchValue(this.#accessControlStore.filters());
    }
  }

  private saveFilters(form: UserFilterDialogFormType, reset?: boolean): void {
    if (reset) {
      form.reset();
    }

    this.#accessControlStore.changeFilters(form.getRawValue());
  }
}
