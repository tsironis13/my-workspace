import { Injectable } from '@angular/core';

import { injectTrpcClient } from '@business-portal/frontend';
import { UserAssignmentsBusinessEntitySummarizedDto } from './business-entities.api.model';

// providedIn: 'root' because it's used in create user assignment dialog
// and therefore cannot be provided in the feature routes
@Injectable({
  providedIn: 'root',
})
export class UserAssignmentsBusinessEntitiesApiService {
  readonly #trpcClient = injectTrpcClient();

  getBusinessEntitiesSummarizedByBusinessGroup(
    businessGroupId: number
  ): Promise<UserAssignmentsBusinessEntitySummarizedDto[]> {
    return this.#trpcClient.businessGroups.businessEntitiesSummarizedByBusinessGroup.query(
      businessGroupId
    );
  }
}
