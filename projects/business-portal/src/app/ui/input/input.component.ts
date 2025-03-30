import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicValidatorMessageDirective } from '@shared/forms';

type ExtractString<T> = Extract<keyof T, string>;

@Component({
  selector: 'my-org-app-input',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    DynamicValidatorMessageDirective,
  ],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<
  F extends { [K in keyof F]: AbstractControl<unknown, unknown> }
> {
  readonly rootFormGroup = input.required<FormGroup<F>>();
  readonly fControlName = input.required<ExtractString<F>>();
  readonly inputType = input<string>('text');
}
