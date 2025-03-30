import {
  Directive,
  ElementRef,
  inject,
  OnInit,
  DestroyRef,
  ComponentRef,
  ViewContainerRef,
} from '@angular/core';
import {
  ControlContainer,
  ControlEvent,
  FormGroupDirective,
  NgControl,
  NgForm,
  NgModel,
  TouchedChangeEvent,
} from '@angular/forms';
import { fromEvent, merge, iif, EMPTY, startWith, skip, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InputErrorComponent } from '../components/input-error/input-error.component';
import { ErrorStateMatcherService } from '../services/error-state-matcher.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `[formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),`,
  standalone: true,
})
export class DynamicValidatorMessageDirective implements OnInit {
  readonly #ngControl =
    inject(NgControl, { self: true, optional: true }) ||
    inject(ControlContainer, { self: true });
  readonly #elementRef = inject(ElementRef);
  readonly #parentContainer = inject(ControlContainer, { optional: true });
  readonly #errorStateMatcher = inject(ErrorStateMatcherService);
  readonly #vcr = inject(ViewContainerRef);
  readonly #destroyRef = inject(DestroyRef);

  readonly #form = <NgForm | FormGroupDirective | null>(
    this.#parentContainer?.formDirective
  );
  #componentRef: ComponentRef<InputErrorComponent> | null = null;

  ngOnInit(): void {
    this.listenToFormControlStatusAndEventChanges();
  }

  private listenToFormControlStatusAndEventChanges(): void {
    if (!this.#ngControl.control) {
      throw Error(`No control model for ${this.#ngControl.name} control...`);
    }

    merge(
      this.#ngControl.control.statusChanges,
      fromEvent(this.#elementRef.nativeElement, 'blur'),
      this.#ngControl.control.events.pipe(
        filter(
          (event: ControlEvent<TouchedChangeEvent>) => event.source.touched
        )
      ),
      iif(() => !!this.#form, this.#form!.ngSubmit, EMPTY)
    )
      .pipe(
        startWith(this.#ngControl.control.status),
        skip(this.#ngControl instanceof NgModel ? 1 : 0),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.crateInputErrorCompoenentWhenErrorIsVisible());
  }

  private crateInputErrorCompoenentWhenErrorIsVisible(): void {
    if (
      this.#errorStateMatcher.isErrorVisible(
        this.#ngControl.control,
        this.#form
      )
    ) {
      /**
       * Same as: this.componentRef ??= this.vcr.createComponent(InputErrorComponent);
       */
      if (!this.#componentRef) {
        this.#componentRef = this.#vcr.createComponent(InputErrorComponent);
        this.#componentRef.changeDetectorRef.markForCheck();
      }

      this.#componentRef.setInput('errors', this.#ngControl.errors);
    } else {
      this.#componentRef?.destroy();
      this.#componentRef = null;
    }
  }
}
