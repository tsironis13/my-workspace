import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  DynamicDialogComponent,
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogFooterComponent,
  DynamicDialogStore,
} from '@business-portal/pattern';
import {
  SelectCustomTemplateHeaderContextDirective,
  SelectCustomTemplateItemContextDirective,
  SelectReactiveComponent,
  SkeletonLoaderComponent,
  TreeSelectComponent,
} from '@business-portal/ui';

import { UserAssignmentsUserRolesToSelectViewModelItemPipe } from '../pipes/users-assignments-user-roles-to-select-view-model-item.pipe';
import { UserAssignmentsUsersToSelectCustomTemplateViewModelItemPipe } from '../pipes/users-assignments-users-to-select-view-model-item.pipe';
import { UserAssignmentCreateDialogScopeTreeSelectInteractionStore } from './assignment-create-dialog-scope-tree-select-interaction.store';
import { UserAssignmentCreateDynamicDialogConfig } from './assignment-create-dialog.data.model';
import { UserAssignmentsBusinessEntitiesDataService } from '@business-portal/administration/user-assignments/domain';

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
    UserAssignmentsUserRolesToSelectViewModelItemPipe,
    SelectCustomTemplateItemContextDirective,
    SelectCustomTemplateHeaderContextDirective,
    TreeSelectComponent,
  ],
  providers: [
    UserAssignmentsBusinessEntitiesDataService,
    UserAssignmentCreateDialogScopeTreeSelectInteractionStore,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAssignmentCreateDialogComponent {
  protected readonly userAssignmentCreateDialogScopeTreeSelectInteractionStore =
    inject(UserAssignmentCreateDialogScopeTreeSelectInteractionStore);
  readonly #dynamicDialogStore = inject(DynamicDialogStore);

  public readonly context = computed(() => this.#dynamicDialogStore.context());
  public readonly activeDialogForm = computed(() =>
    this.#dynamicDialogStore.activeDialogForm()
  );
  public readonly activeDialog = computed(() =>
    this.#dynamicDialogStore.getActiveDialog<UserAssignmentCreateDynamicDialogConfig>()
  );
  public readonly users = computed(() => this.activeDialog().data().users.data);
  public readonly userRoles = computed(
    () => this.activeDialog().data().userRoles.data
  );
  public readonly loading = computed(
    () =>
      this.activeDialog().data().users.loading ||
      this.activeDialog().data().userRoles.loading
  );

  public onSubmit(): void {
    this.#dynamicDialogStore.onSubmit();
  }

  public closeDialog(): void {
    this.#dynamicDialogStore.closeDialog();
  }
}
