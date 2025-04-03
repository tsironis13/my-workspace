import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { inject, DestroyRef } from '@angular/core';
import { pipe, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import { CurrentUser } from './auth.data.model';
import { AuthDataService } from './auth.data.service';
import { AuthSharedService } from '@shared/auth';
import { setToken } from '@business-portal/frontend';
import { GlobalLoaderStore } from '@shared/global-loader';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '@shared/toast';

type AuthState = {
  currentUser: CurrentUser | null;
};

const initialState: AuthState = {
  currentUser: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withDevtools('auth'),
  withState(initialState),
  withProps(() => ({
    _sharedAuthService: inject(AuthSharedService),
    _authDataService: inject(AuthDataService),
    _globalLoaderStore: inject(GlobalLoaderStore),
    _router: inject(Router),
    _destroyRef: inject(DestroyRef),
    _toastService: inject(ToastService),
  })),
  withMethods((store) => {
    return {
      signIn(email: string, password: string): void {
        const observable = store._sharedAuthService.signIn(email, password);

        store._globalLoaderStore
          .withLoadingObservable(observable)
          .pipe(takeUntilDestroyed(store._destroyRef))
          .subscribe({
            next: () => store._router.navigate(['']),
            error: (e: Error) => store._toastService.showError(e.message),
          });
      },
      signUp(email: string | null, password?: string): Promise<string> {
        if (!email) {
          throw new Error('Email is required');
        }

        return store._sharedAuthService
          .signUp(email, password)
          .then((response) => {
            return new Promise<string>((resolve) => {
              if (response.error) {
                throw new Error(response.error.message);
              }

              if (!response.data.user) {
                throw new Error('User not found');
              }

              resolve(response.data.user.id);
            });
          });
      },
      signOut(): void {
        store._sharedAuthService.signOut().then(() => {
          store._router.navigate(['/login']);
          patchState(store, { currentUser: null });
        });
      },
      getCurrentUser: rxMethod<void>(
        pipe(
          switchMap(() => {
            return store._authDataService.getCurrentUser().pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, { currentUser: response });
                },
                error: () => {
                  // console.error(error);
                },
              })
            );
          })
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._sharedAuthService.handleClientAuthStateChanges(
        (event, session) => {
          switch (event) {
            case 'SIGNED_IN':
              console.log('SIGNED_IN', session);
              setToken(session.access_token);
              store.getCurrentUser();
              break;
            case 'INITIAL_SESSION':
              console.log('INITIAL_SESSION', session);
              break;
          }
        }
      );
    },
  })
);
