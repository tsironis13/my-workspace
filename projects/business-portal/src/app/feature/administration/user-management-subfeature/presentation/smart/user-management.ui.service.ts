import { computed, effect, inject } from '@angular/core';

import { UserManagementStore } from '@business-portal/administration/user-management/domain';
import { UserViewModel } from '../presentational/models/user.view.model';
import {
  ColumnTypeViewModel,
  PaginationViewModel,
  SortDataViewModel,
} from '@business-portal/ui';
import { PAGINATOR_CONFIG } from '@business-portal/core/config';

export class UserManagementUiService {
  readonly #userManagementStore = inject(UserManagementStore);
  readonly #paginatorConfig = inject(PAGINATOR_CONFIG);

  readonly paginationOptions = computed<PaginationViewModel>(() => ({
    pageSizeOptions: this.#paginatorConfig.pageSizeOptions,
    defaultPageSize: this.#paginatorConfig.defaultPageSize,
  }));
  readonly defaultSort = computed<SortDataViewModel<UserViewModel>>(() => ({
    sortBy: 'name',
    sortOrder: 1,
  }));
  readonly users = computed(() => this.#userManagementStore.entities());
  readonly totalCount = computed(() => this.#userManagementStore.totalCount());

  readonly userColumns = computed<ColumnTypeViewModel<UserViewModel>[]>(() => [
    { field: 'name', header: 'First name' },
    { field: 'familyName', header: 'Last name' },
    { field: 'email', header: 'Email' },
    { field: 'phoneNumber', header: 'Phone number' },
    { field: 'active', header: 'Active' },
  ]);

  constructor() {
    effect(() => {
      //console.log(this.#userManagementStore.entities());
      //console.log(this.users());
    });
  }

  triggerReq() {
    console.log('triggerReq');
  }

  pageChange(pageNumber: number): void {
    this.#userManagementStore.changePage(pageNumber);
  }

  pageSizeChange(pageSize: number): void {
    this.#userManagementStore.changePageSize(pageSize);
  }

  sortChange(sortData: SortDataViewModel<UserViewModel>): void {
    this.#userManagementStore.onSortChange(sortData);
  }
}
