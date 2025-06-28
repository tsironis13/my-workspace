import { ChangeDetectionStrategy, input, output } from '@angular/core';
import { Component } from '@angular/core';

import {
  TableComponent,
  ColumnTypeViewModel,
  PaginationViewModel,
  SortDataViewModel,
} from '@business-portal/ui';
import { UserAssignmentViewModel } from '../models/user-assignment.view.model';

@Component({
  selector: 'my-org-user-assignments-list',
  imports: [TableComponent],
  templateUrl: `./user-assignments-list.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAssignmentsListComponent {
  readonly userAssignments = input.required<UserAssignmentViewModel[]>();
  readonly columns =
    input.required<ColumnTypeViewModel<UserAssignmentViewModel>[]>();
  readonly totalCount = input.required<number>();
  readonly paginationOptions = input.required<PaginationViewModel>();
  readonly defaultSort =
    input.required<SortDataViewModel<UserAssignmentViewModel>>();
  readonly isLoading = input<boolean>(false);
  readonly metadata = input<{ resetPagination: boolean }>({
    resetPagination: false,
  });

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly sortChange = output<SortDataViewModel<UserAssignmentViewModel>>();
}
