import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';

export type ErrorStateMatcher = {
  isErrorVisible(
    control: AbstractControl | null,
    form: NgForm | FormGroupDirective | null
  ): boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ErrorStateMatcherService implements ErrorStateMatcher {
  isErrorVisible(
    control: AbstractControl | null,
    form: NgForm | FormGroupDirective | null
  ) {
    return Boolean(
      control &&
        control.invalid &&
        (control.touched || control.dirty || (form && form.submitted))
    );
  }
}
