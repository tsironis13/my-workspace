import { Pipe, PipeTransform } from '@angular/core';

import { UserAssignmentsUser } from '@business-portal/administration/user-assignments/domain';
import { SelectItemCustomTemplateViewModel } from '@business-portal/ui';

@Pipe({
  name: 'userAssignmentsUsersToSelectCustomTemplateViewModelItem',
})
export class UserAssignmentsUsersToSelectCustomTemplateViewModelItemPipe
  implements PipeTransform
{
  transform(
    users: UserAssignmentsUser | UserAssignmentsUser[]
  ): SelectItemCustomTemplateViewModel<UserAssignmentsUser>[] {
    return Array.isArray(users)
      ? users.map(this.mapUsersToSelectViewModelItem)
      : [this.mapUsersToSelectViewModelItem(users)];
  }

  private mapUsersToSelectViewModelItem(
    user: UserAssignmentsUser
  ): SelectItemCustomTemplateViewModel<UserAssignmentsUser> {
    return {
      label: user.email,
      value: user.id,
      name: user.name,
      email: user.email,
      familyName: user.familyName,
    };
  }
}
