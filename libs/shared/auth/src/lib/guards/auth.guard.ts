import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthSharedService } from '../auth.service';

const LOGIN_URL = 'login';

export const authGuard =
  (redirectIfAuthenticatedUrl = ''): CanActivateFn =>
  async () => {
    const authSharedService = inject(AuthSharedService);
    const router = inject(Router);

    try {
      const session = await authSharedService.getSession();
      console.log('session', session);
      if (!session.data.session) {
        return navigateToLogin();
      }
    } catch (error) {
      console.error('Error authenticating user on client:', error);
      return navigateToLogin();
    }
    navigateToRedirectUrl(router, redirectIfAuthenticatedUrl);
    return true;

    function navigateToLogin() {
      console.log('Not authenticated, redirecting to login.');
      router.navigate([LOGIN_URL]);
      return false;
    }

    function navigateToRedirectUrl(
      router: Router,
      redirectIfAuthenticatedUrl: string
    ) {
      if (redirectIfAuthenticatedUrl) {
        console.log('Redirecting to', redirectIfAuthenticatedUrl);
        router.navigate([redirectIfAuthenticatedUrl]);
      }
    }
  };
