import { Injectable } from '@angular/core';

import { injectTrpcClient } from '@business-portal/frontend';
import { CurrentUserApiResponse } from './auth.api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  readonly #trpcClient = injectTrpcClient();

  getCurrentUser(): Promise<CurrentUserApiResponse> {
    return this.#trpcClient.users.current.query();
  }
}
