import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthSharedService } from '../auth.service';

// as canActivate fn
export function redirectIfLoggedInGuard(redirectTo = ''): CanActivateFn {
  return () => {
    const authSharedService = inject(AuthSharedService);
    const router = inject(Router);

    return from(authSharedService.getUser()).pipe(
      map((currentUser) => {
        if (currentUser) {
          console.log('Authenticated, redirecting to dahboard.');
          router.navigate([redirectTo]);
        }
        return true;
      }),
      catchError(() => of(true))
    );
  };
}
