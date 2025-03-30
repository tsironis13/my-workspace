import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Observable, tap } from 'rxjs';

export type LoadingState = {
  loading: boolean;
};

export const GlobalLoaderStore = signalStore(
  { providedIn: 'root' },
  withState<LoadingState>({ loading: false }),
  withComputed(({ loading }) => ({
    isLoading: computed(() => loading()),
    isNotLoading: computed(() => !loading()),
  })),
  withMethods((store) => ({
    withLoadingObservable<T>(observable: Observable<T>): Observable<T> {
      patchState(store, { loading: true });

      return observable.pipe(
        tap({
          next: () => patchState(store, { loading: false }),
          error: () => patchState(store, { loading: false }),
        })
      );
    },
  }))
);
