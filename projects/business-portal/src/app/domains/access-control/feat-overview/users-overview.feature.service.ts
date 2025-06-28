import { computed, inject, linkedSignal } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';

import { UserViewModel } from '../presentation/public-api';
import {
  ColumnTypeViewModel,
  PaginationViewModel,
  SortDataViewModel,
} from '@business-portal/ui';
import {
  PAGINATOR_CONFIG,
  SORT_CONFIG,
  SortConfig,
} from '@business-portal/core/config';
import {
  AccessControlStore,
  accessControlEvents,
} from '@business-portal/access-control/data';

export const columnsConfig = (): ColumnTypeViewModel<UserViewModel>[] => {
  return [
    { field: 'name', header: 'First name' },
    { field: 'familyName', header: 'Last name' },
    { field: 'active', header: 'Status', metaData: { disableSort: true } },
    { field: 'email', header: 'Email' },
    { field: 'phoneNumber', header: 'Phone number' },
  ];
};

export class UsersOverviewFeatureService {
  readonly #accessControlStore = inject(AccessControlStore);
  readonly #paginatorConfig = inject(PAGINATOR_CONFIG);
  readonly #sortConfig = inject<SortConfig<UserViewModel>>(SORT_CONFIG);
  readonly #accessControlEvents = injectDispatch(accessControlEvents);

  readonly paginationOptions = computed<PaginationViewModel>(() => ({
    pageSizeOptions: this.#paginatorConfig.pageSizeOptions,
    defaultPageSize: this.#paginatorConfig.defaultPageSize,
  }));
  readonly defaultSort = computed(() => this.#sortConfig);
  readonly users = computed(() => this.#accessControlStore.entities());
  readonly totalCount = computed(() => this.#accessControlStore.totalCount());
  readonly isLoading = computed(() => this.#accessControlStore.isPending());
  readonly userColumns = computed<ColumnTypeViewModel<UserViewModel>[]>(() =>
    columnsConfig()
  );
  readonly tableMetadata = linkedSignal({
    source: this.#accessControlStore.filters,
    computation: () => ({
      resetPagination: true,
    }),
  });

  pageChange(pageNumber: number): void {
    this.#accessControlStore.changePage(pageNumber);
  }

  pageSizeChange(pageSize: number): void {
    this.#accessControlStore.changePageSize(pageSize);
  }

  sortChange(sortData: SortDataViewModel<UserViewModel>): void {
    this.#accessControlStore.onSortChange(sortData);
  }

  filterUsers(): void {
    this.#accessControlEvents.openFilterUsersDialog();
  }

  createUser(): void {
    this.#accessControlEvents.openCreateUserDialog();
  }
}
