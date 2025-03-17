import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { PaginatorModule, Paginator, PaginatorState } from 'primeng/paginator';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-org-app-table-paginator',
  imports: [PaginatorModule, Select, FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginatorComponent {
  readonly rows = model.required<number>();
  readonly totalRecords = input.required<number>();
  readonly pageSizeOptions = input.required<number[]>();

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly paginator = viewChild<Paginator>(Paginator);

  //protected readonly first = signal(2);

  constructor() {
    effect(() => {
      //const x = this.rows();
      //console.log(x);
      //this.first.set(0);
      //this.rows.set(this.pageSizeOptions()[0].value);
    });
  }

  protected onPageSizeChange(event: SelectChangeEvent): void {
    this.resetTableToFirstPage();

    this.pageSizeChange.emit(event.value);
  }

  protected onPageChange(event: PaginatorState): void {
    this.pageChange.emit((event?.page ?? 0) + 1);
  }

  private resetTableToFirstPage(): void {
    this.startResetProcess(() => {
      this.paginator()?.changePage(0);
    });
  }

  /**
   * Bypass emitting of extra calls,
   * when we change programatically a number of a pge, or
   * when we reset the default sorting
   * @param fn
   */
  private startResetProcess(fn: () => void): void {
    fn();
  }
}
