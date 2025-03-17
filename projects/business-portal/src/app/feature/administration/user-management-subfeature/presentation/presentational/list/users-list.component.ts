import { ChangeDetectionStrategy, input, output } from '@angular/core';
import { Component } from '@angular/core';

import { TableComponent, ColumnType } from '@business-portal/ui';
import { UserViewModel } from '../models/user.view.model';

@Component({
  selector: 'my-org-users-list',
  imports: [TableComponent],
  templateUrl: `./users-list.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly users = input.required<UserViewModel[]>();
  readonly columns = input.required<ColumnType<UserViewModel>[]>();
  readonly totalCount = input.required<number>();

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
}
