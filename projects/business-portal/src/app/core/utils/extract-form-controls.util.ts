import { AbstractControl, FormGroup } from '@angular/forms';

export type ExtractControls<T extends FormGroup<any>> = {
  [K in keyof T['controls']]: T['controls'][K] extends AbstractControl
    ? T['controls'][K]
    : never;
};
