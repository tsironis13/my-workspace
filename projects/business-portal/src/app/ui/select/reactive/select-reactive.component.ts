import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SelectModule } from 'primeng/select';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

type ExtractString<T> = Extract<keyof T, string>;

@Component({
  selector: 'my-org-app-select-reactive',
  templateUrl: './select-reactive.component.html',
  imports: [SelectModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectReactiveComponent<
  T,
  F extends { [K in keyof F]: AbstractControl<unknown, unknown> }
> {
  readonly options = input.required<T[]>();
  readonly rootFormGroup = input.required<FormGroup<F>>();
  readonly fControlName = input.required<ExtractString<F>>();
  readonly placeholder = input<string>('placeholder');
  readonly optionLabel = input<ExtractString<T>>();
  readonly optionValue = input<ExtractString<T>>();
}
