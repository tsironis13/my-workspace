import { Injectable } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsService {
  public markAsTouched(group: FormGroup | FormArray): void {
    if (!group) {
      throw new Error('Form group or form array is required');
    }

    group.markAsTouched({ onlySelf: true });

    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    });
  }
}
