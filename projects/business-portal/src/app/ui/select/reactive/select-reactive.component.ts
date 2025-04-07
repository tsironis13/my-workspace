import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ScrollerOptions } from 'primeng/api';
import { NgTemplateOutlet } from '@angular/common';

import { DynamicValidatorMessageDirective } from '@shared/forms';
import { SelectCustomTemplateItemContextDirective } from '../select-custom-template-item-context.directive';
import { SelectCustomTemplateHeaderContextDirective } from '../select-custom-template-header-context.directive';

type ExtractString<T> = Extract<keyof T, string>;

@Component({
  selector: 'my-org-app-select-reactive',
  templateUrl: './select-reactive.component.html',
  imports: [
    SelectModule,
    ReactiveFormsModule,
    FloatLabel,
    DynamicValidatorMessageDirective,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectReactiveComponent<
  T,
  F extends { [K in keyof F]: AbstractControl<unknown, unknown> }
> {
  readonly options = input.required<T[]>();
  readonly rootFormGroup = input.required<FormGroup<F>>();
  readonly fControlName = input.required<ExtractString<F>>();
  readonly optionLabel = input<ExtractString<T>>();
  readonly optionValue = input<ExtractString<T>>();
  readonly labelVariant = input<'over' | 'in' | 'on'>('over');
  readonly label = input<string>('');
  readonly virtualScroll = input(false);
  readonly virtualScrollItemSize = input(38);
  readonly virtualScrollOptions = input<ScrollerOptions>({
    delay: 250,
    showLoader: true,
    lazy: true,
    step: 50,
  });
  readonly filter = input(false);
  readonly filterByFields = input<string>();

  protected readonly customSelectItemTemplate = contentChild(
    SelectCustomTemplateItemContextDirective,
    { read: TemplateRef }
  );

  protected readonly customSelectHeaderTemplate = contentChild(
    SelectCustomTemplateHeaderContextDirective,
    { read: TemplateRef }
  );
}
