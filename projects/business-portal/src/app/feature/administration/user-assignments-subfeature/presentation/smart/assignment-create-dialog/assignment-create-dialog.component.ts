import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  Signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogStore,
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogFooterComponent,
} from '@business-portal/pattern';
import {
  SelectCustomTemplateHeaderContextDirective,
  SelectCustomTemplateItemContextDirective,
  SelectReactiveComponent,
  SkeletonLoaderComponent,
} from '@business-portal/ui';
import {
  UserAssignmentsAssignableUserRole,
  UserAssignmentsUser,
  UserAssignmentsUsersToSelectCustomTemplateViewModelItemPipe,
  UserAssignmentsUserRolesToSelectCustomTemplateViewModelItemPipe,
} from '@business-portal/administration/user-assignments/domain';
import { UserAssignmentCreateDialogFormType } from './assignment-create-dialog.form';
import { ExtractControls } from '@business-portal/core/utils';

export type UserAssignmentCreateDialogData = {
  users: {
    data: UserAssignmentsUser[];
    loading: boolean;
  };
  userRoles: {
    data: UserAssignmentsAssignableUserRole[];
    loading: boolean;
  };
};

type UserAssignmentCreateDynamicDialogConfig = DynamicDialogConfig<
  ExtractControls<UserAssignmentCreateDialogFormType>,
  Signal<UserAssignmentCreateDialogData>
>;

@Component({
  selector: 'my-org-app-user-assignment-create-dialog',
  templateUrl: './assignment-create-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    DynamicDialogComponent,
    SelectReactiveComponent,
    DynamicDialogCustomFooterTemplateDirective,
    DynamicDialogFooterComponent,
    SkeletonLoaderComponent,
    UserAssignmentsUsersToSelectCustomTemplateViewModelItemPipe,
    UserAssignmentsUserRolesToSelectCustomTemplateViewModelItemPipe,
    SelectCustomTemplateItemContextDirective,
    SelectCustomTemplateHeaderContextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAssignmentCreateDialogComponent {
  protected readonly dynamicDialogStore = inject(DynamicDialogStore);

  protected readonly activeDialog = computed(() =>
    this.dynamicDialogStore.getActiveDialog<UserAssignmentCreateDynamicDialogConfig>()
  );
  protected readonly dialogData = computed(() => this.activeDialog().data());
  protected readonly isLoading = computed(
    () => this.dialogData().users.loading || this.dialogData().userRoles.loading
  );
  protected readonly users = computed(() => this.dialogData().users.data);
  protected readonly userRoles = computed(
    () => this.dialogData().userRoles.data
  );

  protected create(): void {
    this.dynamicDialogStore.onSubmit();
  }

  protected cancel(): void {
    this.dynamicDialogStore.closeDialog();
  }
}
