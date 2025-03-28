import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { PaginatorModule, Paginator, PaginatorState } from 'primeng/paginator';
import { SelectChangeEvent } from 'primeng/select';
import { FormsModule } from '@angular/forms';

import { SelectTemplateDrivenComponent } from '../../select/template-driven/select-template-driven.component';

@Component({
  selector: 'my-org-app-table-paginator',
  imports: [PaginatorModule, FormsModule, SelectTemplateDrivenComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginatorComponent {
  readonly rows = model.required<number>();
  readonly totalRecords = input.required<number>();
  readonly pageSizeOptions = input.required<number[]>();
  readonly metadata = input<{ resetPagination: boolean }>({
    resetPagination: false,
  });

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly paginator = viewChild<Paginator>(Paginator);

  #resetInProgress = signal(false);

  constructor() {
    effect(() => {
      this.resetTableOnDemand();
    });
  }

  protected onPageSizeChange(event: SelectChangeEvent): void {
    this.resetTableToFirstPage();

    this.pageSizeChange.emit(event.value);
  }

  protected onPageChange(event: PaginatorState): void {
    if (!this.#resetInProgress()) {
      this.pageChange.emit((event?.page ?? 0) + 1);
    }
  }

  private resetTableOnDemand(): void {
    if (
      this.metadata().resetPagination &&
      this.paginator()?.currentPage() !== 0
    ) {
      this.resetTableToFirstPage();
    }
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
    this.#resetInProgress.set(true);

    fn();

    setTimeout(() => {
      this.#resetInProgress.set(false);
    });
  }
}
