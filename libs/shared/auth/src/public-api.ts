/*
 * Public API Surface of auth
 */

export { AuthSharedService } from './lib/auth.service';
export { AUTH_KEY, AUTH_URL } from './lib/auth.tokens';
export { authGuard } from './lib/guards/auth.guard';
export { redirectIfLoggedInGuard } from './lib/guards/redirect-if-logged-in.guard';
