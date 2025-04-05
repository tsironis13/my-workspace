import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

import {
  DynamicValidatorMessageDirective,
  PhoneNumberPatternDirective,
} from '@shared/forms';

type ExtractString<T> = Extract<keyof T, string>;

@Component({
  selector: 'my-org-app-input',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FloatLabel,
    DynamicValidatorMessageDirective,
    PhoneNumberPatternDirective,
  ],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<
  F extends { [K in keyof F]: AbstractControl<unknown, unknown> }
> {
  readonly rootFormGroup = input.required<FormGroup<F>>();
  readonly fControlName = input.required<ExtractString<F>>();
  readonly validatorKey = input<string>('');
  readonly inputType = input<string>('text');
  readonly labelVariant = input<'over' | 'in' | 'on'>('over');
  readonly label = input<string>('');
}
