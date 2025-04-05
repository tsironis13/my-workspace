import {
  signalStore,
  withMethods,
  patchState,
  withState,
  withComputed,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';

export const NavigationStore = signalStore(
  { providedIn: 'root' },
  withDevtools('navigation'),
  withState({
    sidebar: {
      expanded: true,
    },
  }),
  withComputed((store) => {
    return {
      isSidebarExpanded: computed(() => store.sidebar().expanded),
      isSidebarCollapsed: computed(() => !store.sidebar().expanded),
    };
  }),
  withMethods((store) => {
    return {
      toggleSidebar: () => {
        console.log(store.sidebar());
        patchState(store, {
          sidebar: {
            expanded: !store.sidebar().expanded,
          },
        });
        console.log(store.sidebar());
      },
    };
  })
);
