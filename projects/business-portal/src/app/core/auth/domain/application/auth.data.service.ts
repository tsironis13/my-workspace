import { from, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { EntitiesMapped } from '@business-portal/core/entities/application';
import { CurrentUser } from './auth.data.model';
import { AuthApiService } from '../infrastructure/auth.api.service';
import { CurrentUserApiResponse } from '../infrastructure/auth.api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  readonly #authApiService = inject(AuthApiService);

  getCurrentUser(): Observable<CurrentUser> {
    return from(this.#authApiService.getCurrentUser()).pipe(
      map((data) => <EntitiesMapped<CurrentUserApiResponse, CurrentUser>>data)
    );
  }
}
