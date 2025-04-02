import { computed, Directive, inject } from '@angular/core';

import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';
import { BusinessGroupsCoreStore } from '@business-portal/core/business-groups';
import { getUserCreateDialogForm } from '../user-create-dialog/user-create-dialog.form';
import { DynamicDialogStore } from '@business-portal/pattern';

@Directive({
  selector: '[myOrgUserCreateDialog]',
  host: {
    '(click)': 'handleClick()',
  },
})
export class UserCreateDialogDirective {
  readonly #dynamicDialogStore = inject(DynamicDialogStore);
  readonly #businessGroupsCoreStore = inject(BusinessGroupsCoreStore);

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
            title: 'Filter',
          },
        },
        form,
      },
      (form) => {
        console.log(form);

        //this.saveFilters(form);
      }
    );
  }
}
