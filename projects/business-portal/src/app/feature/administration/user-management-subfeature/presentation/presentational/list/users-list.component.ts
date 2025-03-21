import { ChangeDetectionStrategy, input, output } from '@angular/core';
import { Component } from '@angular/core';

import {
  TableComponent,
  ColumnTypeViewModel,
  PaginationViewModel,
  SortDataViewModel,
} from '@business-portal/ui';
import { UserViewModel } from '../models/user.view.model';

@Component({
  selector: 'my-org-users-list',
  imports: [TableComponent],
  templateUrl: `./users-list.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly users = input.required<UserViewModel[]>();
  readonly columns = input.required<ColumnTypeViewModel<UserViewModel>[]>();
  readonly totalCount = input.required<number>();
  readonly paginationOptions = input.required<PaginationViewModel>();
  readonly defaultSort = input.required<SortDataViewModel<UserViewModel>>();
  readonly isLoading = input<boolean>(false);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly sortChange = output<SortDataViewModel<UserViewModel>>();
}
