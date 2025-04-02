import { AbstractControl, FormGroup } from '@angular/forms';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withProps,
} from '@ngrx/signals';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { computed, inject, Signal, Type } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ContextHeaderState,
  ContextState,
  DeepPartial,
  DynamicDialogConfig,
  DynamicDialogFunc,
} from '../models/dynamic-dialog';
import {
  withEntities,
  addEntity,
  removeEntity,
  SelectEntityId,
} from '@ngrx/signals/entities';

type DynamicDialogEntityState = {
  key: string;
  form: FormGroup<any>;
  data: Signal<unknown> | Observable<unknown> | null;
  func: DynamicDialogFunc<any> | undefined;
  dialogRef: DynamicDialogRef<any>;
  contextState: DeepPartial<ContextState>;
};

const selectId: SelectEntityId<DynamicDialogEntityState> = (entity) =>
  entity.key;

export function withDynamicDialog() {
  return signalStoreFeature(
    withEntities<DynamicDialogEntityState>(),
    withProps(() => ({
      _dynamicDialogService: inject(DialogService),
    })),
    withComputed((store) => ({
      _activeDialog: computed(
        () => store.entities()[store.entities().length - 1]
      ),
    })),
    withComputed((store) => ({
      headerContext: computed(
        () =>
          <DeepPartial<ContextHeaderState>>(
            store._activeDialog().contextState.header
          )
      ),
    })),
    withMethods((store) => {
      return {
        openDialog<
          C,
          F extends { [K in keyof F]: AbstractControl<unknown, unknown> },
          D extends Signal<unknown> | Observable<unknown> | null
        >(
          componentType: Type<C>,
          config: DynamicDialogConfig<F, D>,
          func?: DynamicDialogFunc<F>
        ): DynamicDialogRef<C> {
          const ref = store._dynamicDialogService.open(componentType, {
            showHeader: false,
            closeOnEscape: true,
            inputValues: config.inputValues ?? {},
            ...config,
          });

          const data = <Signal<unknown> | Observable<unknown> | null>(
            config.data
          );

          patchState(
            store,
            addEntity(
              {
                key: config.key,
                form: config.form,
                contextState: config.contextState,
                func,
                dialogRef: ref,
                data,
              },
              { selectId }
            )
          );

          return ref;
        },
        getActiveDialog<T>(): T {
          return <T>store._activeDialog();
        },
        onSubmit(): void {
          const activeDialog = store._activeDialog();

          if (!activeDialog?.func || !activeDialog.form) {
            return;
          }

          activeDialog.func(activeDialog.form);

          this.closeDialog();
        },
        closeDialog(): void {
          const activeDialog = store._activeDialog();

          if (activeDialog) {
            patchState(store, removeEntity(activeDialog.key));
            activeDialog.dialogRef?.close();
          }
        },
      };
    })
  );
}
