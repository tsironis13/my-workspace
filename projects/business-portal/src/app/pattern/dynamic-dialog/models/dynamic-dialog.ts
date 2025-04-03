import { Signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ContextState = {
  header: ContextHeaderState;
  footer: ContextFooterState;
};

export type ContextHeaderState = {
  title: string;
  subheading: string;
};

export type ContextFooterState = {
  button: {
    submit: {
      label: string;
    };
    cancel: {
      label: string;
    };
  };
};

export type DynamicDialogConfig<
  F extends { [K in keyof F]: AbstractControl<unknown, unknown> },
  D extends Signal<unknown> | Observable<unknown> | null
> = {
  key: string;
  form: FormGroup<F>;
  data: D;
  contextState: DeepPartial<ContextState>;
  inputValues?: Record<string, unknown>;
  position?: 'right' | 'bottom' | 'top' | 'left';
  styleClass?: string;
};

export type DynamicDialogFunc<
  F extends { [K in keyof F]: AbstractControl<unknown, unknown> },
  P extends Record<string, unknown>
> = (form: FormGroup<F>, params: P) => void;
