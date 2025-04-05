import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  TemplateRef,
  viewChild,
  computed,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';

import {
  DynamicDialogDefaultHeaderTemplateDirective,
  DynamicDialogCustomHeaderTemplateDirective,
} from './directives/dynamic-dialog-header-template.directive';
import {
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogDefaultFooterTemplateDirective,
} from './directives/dynamic-dialog-footer-template.directive';
import { ButtonComponent, DividerComponent } from '@business-portal/ui';
import { ContextState, DeepPartial } from './models/dynamic-dialog';
import { SubmitButtonDirective } from '@shared/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'my-org-app-dynamic-dialog',
  imports: [
    NgTemplateOutlet,
    DynamicDialogDefaultHeaderTemplateDirective,
    DynamicDialogDefaultFooterTemplateDirective,
    ButtonComponent,
    SubmitButtonDirective,
    DividerComponent,
  ],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogComponent {
  readonly context = input.required<DeepPartial<ContextState>>();
  readonly dialogForm = input.required<FormGroup>();
  readonly closeDialogTriggered = output<void>();
  readonly submitDialogTriggered = output<void>();
  // body
  protected readonly bodyTemplate = contentChild.required('dialogBody', {
    read: TemplateRef,
  });
  // header
  protected readonly defaultHeaderTemplate = viewChild(
    DynamicDialogDefaultHeaderTemplateDirective,
    { read: TemplateRef }
  );
  protected readonly customHeaderTemplate = contentChild(
    DynamicDialogCustomHeaderTemplateDirective,
    {
      read: TemplateRef,
    }
  );
  // footer
  protected readonly defaultFooterTemplate = viewChild(
    DynamicDialogDefaultFooterTemplateDirective,
    { read: TemplateRef }
  );
  protected readonly customFooterTemplate = contentChild(
    DynamicDialogCustomFooterTemplateDirective,
    {
      read: TemplateRef,
    }
  );

  protected readonly headerTemplate = computed(
    () =>
      <TemplateRef<unknown> | null>(
        (this.customHeaderTemplate() ?? this.defaultHeaderTemplate())
      )
  );

  protected readonly footerTemplate = computed(
    () =>
      <TemplateRef<unknown>>(
        (this.customFooterTemplate() ?? this.defaultFooterTemplate())
      )
  );
}
