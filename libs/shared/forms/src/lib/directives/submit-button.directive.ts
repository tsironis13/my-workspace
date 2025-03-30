import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { fromEvent, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DynamicFormsService } from '../services/dynamic-forms.service';

@Directive({
  selector: `[myOrgSubmitButton]`,
  standalone: true,
})
export class SubmitButtonDirective implements OnInit {
  readonly form = input.required<FormGroup | FormArray>();

  readonly #dynamicFormsService = inject(DynamicFormsService);
  readonly #elementRef = inject(ElementRef);
  readonly #destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.preventClickPropagationIfFormIsInvalid();
  }

  public preventClickPropagationIfFormIsInvalid(): void {
    fromEvent<PointerEvent>(this.#elementRef.nativeElement, 'click', {
      capture: true,
    })
      .pipe(
        tap(() => this.#dynamicFormsService.markAsTouched(this.form())),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((e) => {
        if (this.form().invalid) {
          e.stopPropagation();
        }
      });
  }
}
