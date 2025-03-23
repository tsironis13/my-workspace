import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import {
  DynamicDialogComponent,
  DynamicDialogService,
} from '@business-portal/pattern';
import { UserFilterDialogFormType } from './user-filter-dialog.form';
import { YES_NO_OPTIONS_CONFIG } from 'projects/business-portal/src/app/core/config/core.config.tokens';
import { SelectReactiveComponent } from '@business-portal/ui';

@Component({
  selector: 'my-org-app-user-filter-dialog',
  templateUrl: './user-filter-dialog.component.html',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    DynamicDialogComponent,
    SelectReactiveComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFilterDialogComponent {
  protected readonly dynamicDialogService =
    inject<
      DynamicDialogService<UserFilterDialogComponent, UserFilterDialogFormType>
    >(DynamicDialogService);
  protected readonly yesNoOptions = inject(YES_NO_OPTIONS_CONFIG);
}
