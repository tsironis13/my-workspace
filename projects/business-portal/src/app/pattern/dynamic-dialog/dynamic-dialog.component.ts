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
import { DividerModule } from 'primeng/divider';

import {
  DynamicDialogDefaultHeaderTemplateDirective,
  DynamicDialogCustomHeaderTemplateDirective,
} from './directives/dynamic-dialog-header-template.directive';
import {
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogDefaultFooterTemplateDirective,
} from './directives/dynamic-dialog-footer-template.directive';
import { ButtonComponent } from '@business-portal/ui';
import { ContextHeaderState, DeepPartial } from './models/dynamic-dialog';

@Component({
  selector: 'my-org-app-dynamic-dialog',
  imports: [
    NgTemplateOutlet,
    DynamicDialogDefaultHeaderTemplateDirective,
    DynamicDialogDefaultFooterTemplateDirective,
    ButtonComponent,
    DividerModule,
  ],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogComponent {
  readonly headerContext = input.required<DeepPartial<ContextHeaderState>>();
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
  protected readonly defaultFooterTemplate = viewChild(
    DynamicDialogDefaultFooterTemplateDirective,
    { read: TemplateRef }
  );
  // footer
  protected readonly customHeaderTemplate = contentChild(
    DynamicDialogCustomHeaderTemplateDirective,
    {
      read: TemplateRef,
    }
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
      <TemplateRef<unknown> | null>(
        (this.customFooterTemplate() ?? this.defaultFooterTemplate())
      )
  );
}
