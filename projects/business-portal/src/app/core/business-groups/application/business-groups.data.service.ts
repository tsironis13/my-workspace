import { from, map, Observable, delay } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { EntitiesMapped } from '@business-portal/core/entities/application';
import { BusinessGroupCore } from './business-groups.data.model';
import { BusinessGroupsCoreApiService } from '../infrastructure/business-groups.api.service';
import { BusinessGroupCoreDto } from '../infrastructure/business-groups.api.model';

@Injectable({
  providedIn: 'root',
})
// Add 'Core' to the name to indicate that this is a core Data service
export class BusinessGroupsCoreDataService {
  readonly #businessGroupsCoreApiService = inject(BusinessGroupsCoreApiService);

  getAll(): Observable<BusinessGroupCore[]> {
    return from(this.#businessGroupsCoreApiService.getAll()).pipe(
      map(
        (data) =>
          <EntitiesMapped<BusinessGroupCoreDto[], BusinessGroupCore[]>>data
      ),
      delay(2000)
    );
  }
}
