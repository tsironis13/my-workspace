import { Component, Directive, inject } from '@angular/core';

// import { UserFilterDialogComponent } from '../user-filter-dialog/user-filter-dialog.component';
// import { UserManagementStore } from '@business-portal/administration/user-management/domain';
import { DynamicDialogService } from '@business-portal/pattern';
import {
  getUserFilterDialogForm,
  UserFilterDialogFormType,
} from '../user-filter-dialog/user-filter-dialog.form';

@Component({
  selector: 'my-org-app-test-dialog',
  template: `<div>dialog over dialog</div>`,
})
export class TestDialogComponent {}

@Directive({
  selector: '[myOrgTestDialog]',
  providers: [DynamicDialogService],
  host: {
    '(click)': 'handleClick()',
  },
})
export class TestDialogDirective {
  readonly #dynamicDialogService =
    inject<DynamicDialogService<TestDialogComponent, UserFilterDialogFormType>>(
      DynamicDialogService
    );

  //readonly #userManagementStore = inject(UserManagementStore);
  //readonly #yesNoOptions = inject(YES_NO_OPTIONS_CONFIG);

  handleClick(): void {
    const form = getUserFilterDialogForm();

    //this.loadFilters(form);
    console.log('HERE');
    this.#dynamicDialogService.openDialog(
      TestDialogComponent,
      {
        data: null,
        contextState: {
          header: {
            title: 'Filter123',
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

  // private loadFilters(form: UserFilterDialogFormType): void {
  //   if (Object.keys(this.#userManagementStore.filters()).length > 0) {
  //     form.patchValue(this.#userManagementStore.filters());
  //   }
  // }

  // private saveFilters(form: UserFilterDialogFormType): void {
  //   this.#userManagementStore.changeFilters(form.getRawValue());
  // }
}
