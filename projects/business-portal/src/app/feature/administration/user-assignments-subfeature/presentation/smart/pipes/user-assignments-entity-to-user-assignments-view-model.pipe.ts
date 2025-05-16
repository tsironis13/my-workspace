import { Pipe, PipeTransform } from '@angular/core';

import { UserAssignmentViewModel } from '../../presentational/models/user-assignment.view.model';
import { UserAssignmentEntity } from '@business-portal/administration/user-assignments/domain';

@Pipe({
  name: 'userAssignmentEntityToUserAssignmentViewModel',
})
export class UserAssignmentEntityToUserAssignmentViewModelPipe
  implements PipeTransform
{
  transform(
    users: UserAssignmentEntity | UserAssignmentEntity[]
  ): UserAssignmentViewModel[] {
    return Array.isArray(users)
      ? users.map(this.mapUserAssignmentEntityToUserAssignmentViewModel)
      : [this.mapUserAssignmentEntityToUserAssignmentViewModel(users)];
  }

  private mapUserAssignmentEntityToUserAssignmentViewModel(
    userAssignment: UserAssignmentEntity
  ): UserAssignmentViewModel {
    return {
      firstName: userAssignment.firstName,
      lastName: userAssignment.lastName,
      email: userAssignment.email,
      role: userAssignment.role,
      scopeType: userAssignment.scopeType,
      scopeName: userAssignment.scopeName,
      createdAt: userAssignment.createdAt,
    };
  }
}
