import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  TemplateRef,
  inject,
  viewChild,
  computed,
} from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

import {
  DynamicDialogDefaultHeaderTemplateDirective,
  DynamicDialogCustomHeaderTemplateDirective,
} from './directives/dynamic-dialog-header-template.directive';
import { DynamicDialogService } from './services/dynamic-dialog.service';
import {
  DynamicDialogCustomFooterTemplateDirective,
  DynamicDialogDefaultFooterTemplateDirective,
} from './directives/dynamic-dialog-footer-template.directive';

@Component({
  selector: 'my-org-app-dynamic-dialog',
  imports: [
    NgTemplateOutlet,
    DynamicDialogDefaultHeaderTemplateDirective,
    DynamicDialogDefaultFooterTemplateDirective,
    ButtonModule,
    DividerModule,
  ],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
})
export class DynamicDialogComponent {
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

  protected readonly dynamicDialogService = inject(DynamicDialogService);

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
