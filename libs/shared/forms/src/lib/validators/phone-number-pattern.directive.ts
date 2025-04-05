import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[myOrgPhoneNumberPattern]',
  standalone: true,
  // To help ngModel recognize it as a Validator Directive,
  // we have to provide the NG_VALIDATORS token
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneNumberPatternDirective,
      multi: true,
    },
  ],
})
export class PhoneNumberPatternDirective implements Validator {
  readonly validatorKey = input.required<string>();

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control?.value || this.validatorKey() !== 'phoneNumberValidator') {
      return null;
    }

    const error = { phoneNumberPattern: true };

    const phoneNumberPatternRegex = new RegExp(/^[+][0-9]{4,14}$/);
    const match = phoneNumberPatternRegex.test(control.value);

    if (match) {
      return null;
    }

    control.setErrors(error);

    return error;
  }

  registerOnValidatorChange?(fn: () => void): void {}
}
