import { Pipe, PipeTransform } from '@angular/core';

import { SelectItemViewModel } from '@business-portal/ui';
import { UserAssignmentsAssignableUserRole } from '@business-portal/administration/user-assignments/domain';

@Pipe({
  name: 'userAssignmentsUserRolesToSelectViewModelItem',
})
export class UserAssignmentsUserRolesToSelectViewModelItemPipe
  implements PipeTransform
{
  transform(
    userRoles:
      | UserAssignmentsAssignableUserRole
      | UserAssignmentsAssignableUserRole[]
  ): SelectItemViewModel<UserAssignmentsAssignableUserRole>[] {
    return Array.isArray(userRoles)
      ? userRoles.map(this.mapUserRolesToSelectViewModelItem)
      : [this.mapUserRolesToSelectViewModelItem(userRoles)];
  }

  private mapUserRolesToSelectViewModelItem(
    userRole: UserAssignmentsAssignableUserRole
  ): SelectItemViewModel<UserAssignmentsAssignableUserRole> {
    return {
      label: userRole.name,
      value: userRole,
    };
  }
}
