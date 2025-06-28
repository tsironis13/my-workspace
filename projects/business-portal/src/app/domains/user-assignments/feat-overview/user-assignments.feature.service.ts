import { computed, inject, linkedSignal } from '@angular/core';

import { UserAssignmentViewModel } from '../presentation/models/user-assignment.view.model';
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
import { UserAssignmentsStore } from '@business-portal/user-assignments/data';

export const columnsConfig =
  (): ColumnTypeViewModel<UserAssignmentViewModel>[] => {
    return [
      { field: 'firstName', header: 'First name' },
      { field: 'lastName', header: 'Last name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
      { field: 'scopeType', header: 'Scope Type' },
      { field: 'scopeName', header: 'Scope Name' },
      {
        field: 'createdAt',
        header: 'Date Of Creation',
        metaData: { type: 'date' },
      },
    ];
  };

export class UserAssignmentsFeatureService {
  readonly #userAssignmentsStore = inject(UserAssignmentsStore);
  readonly #paginatorConfig = inject(PAGINATOR_CONFIG);
  readonly #sortConfig =
    inject<SortConfig<UserAssignmentViewModel>>(SORT_CONFIG);

  readonly paginationOptions = computed<PaginationViewModel>(() => ({
    pageSizeOptions: this.#paginatorConfig.pageSizeOptions,
    defaultPageSize: this.#paginatorConfig.defaultPageSize,
  }));
  readonly defaultSort = computed(() => this.#sortConfig);
  readonly userAssignments = computed(() =>
    this.#userAssignmentsStore.entities()
  );
  readonly totalCount = computed(() => this.#userAssignmentsStore.totalCount());
  readonly isLoading = computed(() => this.#userAssignmentsStore.isPending());
  readonly userAssignmentColumns = computed<
    ColumnTypeViewModel<UserAssignmentViewModel>[]
  >(() => columnsConfig());
  readonly tableMetadata = linkedSignal({
    source: this.#userAssignmentsStore.filters,
    computation: () => ({
      resetPagination: true,
    }),
  });

  pageChange(pageNumber: number): void {
    this.#userAssignmentsStore.changePage(pageNumber);
  }

  pageSizeChange(pageSize: number): void {
    this.#userAssignmentsStore.changePageSize(pageSize);
  }

  sortChange(sortData: SortDataViewModel<UserAssignmentViewModel>): void {
    this.#userAssignmentsStore.onSortChange(sortData);
  }
}
