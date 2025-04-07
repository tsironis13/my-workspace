import { Pipe, PipeTransform } from '@angular/core';

import { UserAssignmentsAssignableUserRole } from './user-roles.data.model';
import { SelectItemCustomTemplateViewModel } from '@business-portal/ui';

@Pipe({
  name: 'userAssignmentsUserRolesToSelectCustomTemplateViewModelItem',
})
export class UserAssignmentsUserRolesToSelectCustomTemplateViewModelItemPipe
  implements PipeTransform
{
  transform(
    userRoles:
      | UserAssignmentsAssignableUserRole
      | UserAssignmentsAssignableUserRole[]
  ): SelectItemCustomTemplateViewModel<UserAssignmentsAssignableUserRole>[] {
    return Array.isArray(userRoles)
      ? userRoles.map(this.mapUserRolesToSelectViewModelItem)
      : [this.mapUserRolesToSelectViewModelItem(userRoles)];
  }

  private mapUserRolesToSelectViewModelItem(
    userRole: UserAssignmentsAssignableUserRole
  ): SelectItemCustomTemplateViewModel<UserAssignmentsAssignableUserRole> {
    return {
      label: userRole.name,
      value: userRole.id,
    };
  }
}
