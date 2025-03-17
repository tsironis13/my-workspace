import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { TableModule } from 'primeng/table';

import { ColumnType } from './table.view.model';
import { TablePaginatorComponent } from './paginator/paginator.component';
import { PAGINATOR_CONFIG } from '@business-portal/core/config';

@Component({
  selector: 'my-org-app-table',
  imports: [TableModule, TablePaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  readonly data = input.required<T[]>();
  readonly columns = input.required<ColumnType<T>[]>();
  readonly totalCount = input.required<number>();
  readonly lazy = input<boolean>(true);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly pageSizeOptions = inject(PAGINATOR_CONFIG).pageSizeOptions;
  readonly defaultPageSize = inject(PAGINATOR_CONFIG).defaultPageSize;
}
