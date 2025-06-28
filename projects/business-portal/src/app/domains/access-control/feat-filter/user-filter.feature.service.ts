import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Events } from '@ngrx/signals/events';

import {
  accessControlEvents,
  AccessControlStore,
} from '@business-portal/access-control/data';
import { DynamicDialogStore } from '@business-portal/pattern';
import {
  getUserFilterDialogForm,
  UserFilterDialogFormType,
} from './user-filter-dialog.form';
import { UserFilterDialogComponent } from './user-filter-dialog.component';
import { ExtractControls } from '@business-portal/core/utils';

@Injectable()
export class UserFilterFeatureService {
  readonly #dynamicDialogStore = inject(DynamicDialogStore);
  readonly #accessControlStore = inject(AccessControlStore);
  readonly #events = inject(Events);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    this.#events
      .on(accessControlEvents.openFilterUsersDialog)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.openFilterUsersDialog());
  }

  private openFilterUsersDialog(): void {
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
