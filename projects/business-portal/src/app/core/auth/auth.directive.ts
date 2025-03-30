import { Directive, inject } from '@angular/core';

import { AuthStore } from './domain/application/auth.store';
import { loginForm } from './login.form';

@Directive({
  selector: '[myOrgAuth]',
})
export class AuthDirective {
  readonly #authStore = inject(AuthStore);

  readonly loginForm = loginForm();

  public signIn(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.#authStore.signIn(email || '', password || '');
  }

  public signOut(): void {
    this.#authStore.signOut();
  }
}
