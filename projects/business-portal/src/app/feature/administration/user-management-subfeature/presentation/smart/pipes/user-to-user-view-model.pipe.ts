import { Pipe, PipeTransform } from '@angular/core';

import { User } from '@business-portal/administration/user-management/domain';
import { UserViewModel } from '../../presentational/models/user.view.model';

@Pipe({
  name: 'userToUserViewModel',
})
export class UserToUserViewModelPipe implements PipeTransform {
  transform(users: User | User[]): UserViewModel[] {
    return Array.isArray(users)
      ? users.map(this.mapUserToUserViewModel)
      : [this.mapUserToUserViewModel(users)];
  }

  private mapUserToUserViewModel(user: User): UserViewModel {
    return {
      name: user.name,
      familyName: user.familyName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      active: user.active,
    };
  }
}
