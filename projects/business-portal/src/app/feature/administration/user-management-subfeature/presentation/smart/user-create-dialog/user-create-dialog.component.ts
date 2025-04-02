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
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogStore,
} from '@business-portal/pattern';
import { YES_NO_OPTIONS_CONFIG } from 'projects/business-portal/src/app/core/config/core.config.tokens';
import {
  SelectReactiveComponent,
  ProgressLoaderComponent,
  ButtonComponent,
} from '@business-portal/ui';
import {
  BusinessGroupCore,
  BusinessGroupCoreToSelectViewModelItemPipe,
} from '@business-portal/core/business-groups';
import { UserCreateDialogFormType } from './user-create-dialog.form';
import { ExtractControls } from '@business-portal/core/utils';
import { SubmitButtonDirective } from '@shared/forms';

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
    ProgressLoaderComponent,
    ButtonComponent,
    SubmitButtonDirective,
    DynamicDialogCustomFooterTemplateDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateDialogComponent {
  protected readonly dynamicDialogStore = inject(DynamicDialogStore);
  protected readonly yesNoOptions = inject(YES_NO_OPTIONS_CONFIG);

  protected readonly activeDialog = computed(() =>
    this.dynamicDialogStore.getActiveDialog<UserCreateDynamicDialogConfig>()
  );
  protected readonly businessGroupsState = computed(() =>
    this.activeDialog().data()
  );
}
