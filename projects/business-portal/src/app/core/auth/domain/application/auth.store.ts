import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { pipe, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';

import { CurrentUser } from './auth.data.model';
import { AuthDataService } from './auth.data.service';
import { AuthSharedService } from '@shared/auth';
import { setToken } from '@business-portal/frontend';

type AuthState = {
  currentUser: CurrentUser | null;
};

const initialState: AuthState = {
  currentUser: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    _sharedAuthService: inject(AuthSharedService),
    _authDataService: inject(AuthDataService),
    _router: inject(Router),
  })),
  withMethods((store) => {
    return {
      signIn(email: string, password: string): void {
        store._sharedAuthService
          .signIn(email, password)
          .then(() => store._router.navigate(['']));
      },
      signOut(): void {
        store._sharedAuthService
          .signOut()
          .then(() => store._router.navigate(['/login']));
      },
      getCurrentUser: rxMethod<void>(
        pipe(
          switchMap(() => {
            return store._authDataService.getCurrentUser().pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, { currentUser: response });
                },
                error: (error: unknown) => {
                  console.error(error);
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
              setToken(session.access_token);
              break;
            case 'INITIAL_SESSION':
              console.log('INITIAL_SESSION', session);
              store.getCurrentUser();
              break;
          }
        }
      );
    },
  })
);
