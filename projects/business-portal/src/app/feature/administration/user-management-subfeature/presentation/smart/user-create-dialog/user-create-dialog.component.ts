import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  Signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';

import {
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogStore,
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogFooterComponent,
} from '@business-portal/pattern';
import {
  InputComponent,
  SelectReactiveComponent,
  SkeletonLoaderComponent,
} from '@business-portal/ui';
import {
  BusinessGroupCore,
  BusinessGroupCoreToSelectViewModelItemPipe,
} from '@business-portal/core/business-groups';
import { UserCreateDialogFormType } from './user-create-dialog.form';
import { ExtractControls } from '@business-portal/core/utils';

type UserCreateDynamicDialogConfig = DynamicDialogConfig<
  ExtractControls<UserCreateDialogFormType>,
  Signal<{ businessGroups: BusinessGroupCore[]; loading: boolean }>
>;

@Component({
  selector: 'my-org-app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    DynamicDialogComponent,
    SelectReactiveComponent,
    BusinessGroupCoreToSelectViewModelItemPipe,
    DynamicDialogCustomFooterTemplateDirective,
    DynamicDialogFooterComponent,
    InputComponent,
    SkeletonLoaderComponent,
    Divider,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateDialogComponent {
  protected readonly dynamicDialogStore = inject(DynamicDialogStore);

  protected readonly activeDialog = computed(() =>
    this.dynamicDialogStore.getActiveDialog<UserCreateDynamicDialogConfig>()
  );
  protected readonly businessGroupsState = computed(() =>
    this.activeDialog().data()
  );

  protected create(): void {
    this.dynamicDialogStore.onSubmit();
  }

  protected cancel(): void {
    this.dynamicDialogStore.closeDialog();
  }
}
