import { Directive, inject } from '@angular/core';

import { AuthStore } from './domain/application/auth.store';

@Directive({
  selector: '[myOrgAuth]',
})
export class AuthDirective {
  readonly #authStore = inject(AuthStore);

  public signIn(email: string, password: string): void {
    this.#authStore.signIn(email, password);
  }

  public signOut(): void {
    this.#authStore.signOut();
  }
}
