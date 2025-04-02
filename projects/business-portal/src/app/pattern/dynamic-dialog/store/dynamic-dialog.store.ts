import { signalStore } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import { withDynamicDialog } from './dynamic-dialog.feature';

export const DynamicDialogStore = signalStore(
  { providedIn: 'root' },
  withDevtools(`dynamic-dialog`),
  withDynamicDialog()
);
