import { computed, inject, linkedSignal } from '@angular/core';

import { UserManagementStore } from '@business-portal/administration/user-management/domain';
import { UserViewModel } from '../presentational/models/user.view.model';
import {
  ColumnTypeViewModel,
  PaginationViewModel,
  SortDataViewModel,
} from '@business-portal/ui';
import { PAGINATOR_CONFIG } from 'projects/business-portal/src/app/core/config/core.config.tokens';

export const columnsConfig = (): ColumnTypeViewModel<UserViewModel>[] => {
  return [
    { field: 'name', header: 'First name' },
    { field: 'familyName', header: 'Last name' },
    { field: 'active', header: 'Status', metaData: { disableSort: true } },
    { field: 'email', header: 'Email' },
    { field: 'phoneNumber', header: 'Phone number' },
  ];
};

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
  readonly isLoading = computed(() => this.#userManagementStore.isPending());
  readonly userColumns = computed<ColumnTypeViewModel<UserViewModel>[]>(() =>
    columnsConfig()
  );
  readonly tableMetadata = linkedSignal({
    source: this.#userManagementStore.filters,
    computation: () => ({
      resetPagination: true,
    }),
  });

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
