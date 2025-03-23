import { computed, Injectable, signal, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup } from '@angular/forms';

import {
  ContextState,
  DeepPartial,
  DynamicDialogConfig,
  DynamicDialogFunc,
} from '../models/dynamic-dialog';

@Injectable()
export class DynamicDialogService<
  C, // component type
  F = FormGroup, // form type
  D = unknown // data type
> extends DialogService {
  #contextState = signal<DeepPartial<ContextState> | null>(null);
  #form = signal<F>(<F>{});
  #func = signal<DynamicDialogFunc<F> | undefined>(undefined);
  #dialogRef = signal<DynamicDialogRef<C> | null>(null);

  readonly headerContextState = computed(() => this.#contextState()?.header);

  openDialog(
    componentType: Type<C>,
    config: DynamicDialogConfig<F, D>,
    func?: DynamicDialogFunc<F>
  ): DynamicDialogRef<C> {
    const ref = this.open(componentType, {
      showHeader: false,
      closeOnEscape: true,
      inputValues: config.inputValues ?? {},
      ...config,
    });

    this.#form.set(config.form);
    this.#contextState.set(config.contextState);
    this.#func.set(func);
    this.#dialogRef.set(ref);

    return ref;
  }

  getForm(): F {
    return this.#form();
  }

  onSubmit(): void {
    const func = this.#func();

    if (func) {
      func(this.#form());
    }

    this.#dialogRef()?.close();
  }
}
