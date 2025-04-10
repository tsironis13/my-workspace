import { Pipe, PipeTransform } from '@angular/core';

import { UserViewModel } from '../../presentational/models/user.view.model';
import { UserEntity } from '@business-portal/administration/user-management/domain';

@Pipe({
  name: 'userEntityToUserViewModel',
})
export class UserEntityToUserViewModelPipe implements PipeTransform {
  transform(users: UserEntity | UserEntity[]): UserViewModel[] {
    return Array.isArray(users)
      ? users.map(this.mapUserEntityToUserViewModel)
      : [this.mapUserEntityToUserViewModel(users)];
  }

  private mapUserEntityToUserViewModel(user: UserEntity): UserViewModel {
    return {
      name: user.name,
      familyName: user.familyName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      active: user.active,
    };
  }
}
