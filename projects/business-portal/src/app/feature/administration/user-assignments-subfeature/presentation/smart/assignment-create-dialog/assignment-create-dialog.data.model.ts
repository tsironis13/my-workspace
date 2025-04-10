import { Signal } from '@angular/core';

import {
  UserAssignmentsAssignableUserRole,
  UserAssignmentsUser,
} from '@business-portal/administration/user-assignments/domain';
import { BusinessGroupCore } from '@business-portal/core/business-groups';
import { ExtractControls } from '@business-portal/core/utils';
import { UserAssignmentCreateDialogFormType } from './assignment-create-dialog.form';
import { DynamicDialogConfig } from '@business-portal/pattern';

export type UserAssignmentCreateDialogData = {
  users: {
    data: UserAssignmentsUser[];
    loading: boolean;
  };
  userRoles: {
    data: UserAssignmentsAssignableUserRole[];
    loading: boolean;
  };
  businessGroups: {
    data: BusinessGroupCore[];
    loading: boolean;
  };
};

export type UserAssignmentCreateDynamicDialogConfig = DynamicDialogConfig<
  ExtractControls<UserAssignmentCreateDialogFormType>,
  Signal<UserAssignmentCreateDialogData>
>;
