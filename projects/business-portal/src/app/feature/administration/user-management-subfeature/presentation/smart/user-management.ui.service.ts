import { computed, effect, inject } from '@angular/core';

import {
  UserManagementStore,
  User,
} from '@business-portal/administration/user-management/domain';
import { UserViewModel } from '../presentational/models/user.view.model';
import { ColumnType } from '@business-portal/ui';

export class UserManagementUiService {
  readonly #userManagementStore = inject(UserManagementStore);

  readonly users = computed(() =>
    this.#userManagementStore.entities().map(this.mapUserToUserViewModel)
  );

  readonly totalCount = computed(() => this.#userManagementStore.totalCount());

  readonly userColumns = computed<ColumnType<UserViewModel>[]>(() => [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'active', header: 'Active' },
  ]);

  constructor() {
    effect(() => {
      //console.log(this.#userManagementStore.entities());
      //console.log(this.users());
    });
  }

  triggerReq() {
    this.#userManagementStore.onPaginationChange({
      pageNumber: 2,
      pageSize: 10,
    });
    console.log(this.#userManagementStore.totalCount());
    console.log(this.#userManagementStore.entities());
    // this.#userManagementStore.entityFilterParams().pagination = {
    //   pageNumber: 2,
    //   pageSize: 10,
    // };
  }

  pageChange(pageNumber: number): void {
    this.#userManagementStore.changePage(pageNumber);
  }

  pageSizeChange(pageSize: number): void {
    this.#userManagementStore.changePageSize(pageSize);
  }

  private mapUserToUserViewModel(user: User): UserViewModel {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      active: user.active,
    };
  }
}
