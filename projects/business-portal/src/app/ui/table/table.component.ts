import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';

import {
  ColumnTypeViewModel,
  PaginationViewModel,
  SortDataViewModel,
} from './table.view.model';
import { TablePaginatorComponent } from './paginator/paginator.component';

type PrimengSortOrder = { sortBy: string; sortOrder: 1 | -1 };

@Component({
  selector: 'my-org-app-table',
  imports: [TableModule, TablePaginatorComponent, ProgressBarModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  readonly data = input.required<T[]>();
  readonly columns = input.required<ColumnTypeViewModel<T>[]>();
  readonly totalCount = input.required<number>();
  readonly paginationOptions = input.required<PaginationViewModel>();
  readonly defaultSort = input<SortDataViewModel<T>>();
  readonly lazy = input<boolean>(true);
  readonly customSort = input<boolean>(true);
  readonly resetPagination = model<boolean>(false);
  readonly isLoading = input<boolean>(false);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly sortChange = output<SortDataViewModel<T>>();

  readonly defaultSortOrder = computed<PrimengSortOrder>(() => {
    return {
      sortBy: <string>this.defaultSort()?.sortBy,
      sortOrder: this.defaultSort()?.sortOrder ?? 1,
    };
  });

  protected onLazyLoad(event: TableLazyLoadEvent): void {
    if (this.data().length === 0 && (!event.sortField || !event.sortOrder)) {
      return;
    }

    this.resetPagination.set(true);

    this.sortChange.emit({
      sortBy: <keyof T>event.sortField,
      sortOrder: event.sortOrder === 1 ? 1 : -1,
    });
  }
}
