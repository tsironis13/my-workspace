import { Injectable } from '@angular/core';

import { injectTrpcClient } from '@business-portal/frontend';
import { BusinessGroupCoreDto } from './business-groups.api.model';

@Injectable({
  providedIn: 'root',
})
// Add 'Core' to the name to indicate that this is a core API service
export class BusinessGroupsCoreApiService {
  readonly #trpcClient = injectTrpcClient();

  getAll(): Promise<BusinessGroupCoreDto[]> {
    return this.#trpcClient.businessGroups.all.query();
  }
}
