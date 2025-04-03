import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import {
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogFooterComponent,
  DynamicDialogStore,
} from '@business-portal/pattern';
import { UserFilterDialogFormType } from './user-filter-dialog.form';
import { YES_NO_OPTIONS_CONFIG } from 'projects/business-portal/src/app/core/config/core.config.tokens';
import { SelectReactiveComponent } from '@business-portal/ui';
import { ExtractControls } from '@business-portal/core/utils';

type UserFilterDynamicDialogConfig = DynamicDialogConfig<
  ExtractControls<UserFilterDialogFormType>,
  null
>;

@Component({
  selector: 'my-org-app-user-filter-dialog',
  templateUrl: './user-filter-dialog.component.html',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    DynamicDialogComponent,
    SelectReactiveComponent,
    DynamicDialogCustomFooterTemplateDirective,
    DynamicDialogFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFilterDialogComponent {
  protected readonly dynamicDialogStore = inject(DynamicDialogStore);

  protected readonly yesNoOptions = inject(YES_NO_OPTIONS_CONFIG);

  protected readonly activeDialog = computed(() =>
    this.dynamicDialogStore.getActiveDialog<UserFilterDynamicDialogConfig>()
  );

  protected applyFilters(reset?: boolean): void {
    this.dynamicDialogStore.onSubmit({ reset });
  }
}
