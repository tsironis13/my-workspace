import { delay, from, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { EntitiesMapped } from '@business-portal/core/entities/application';
import { UserAssignmentsBusinessEntitiesApiService } from '../../infrastructure/business-entities/business-entities.api.service';
import { UserAssignmentsBusinessEntitySummarized } from './business-entities.data.model';
import { UserAssignmentsBusinessEntitySummarizedDto } from '../../infrastructure/business-entities/business-entities.api.model';

@Injectable({
  providedIn: 'root',
})
export class UserAssignmentsBusinessEntitiesDataService {
  readonly #userAssignmentsBusinessEntitiesApiService = inject(
    UserAssignmentsBusinessEntitiesApiService
  );

  getBusinessEntitiesSummarizedByBusinessGroup(
    businessGroupId: number
  ): Observable<UserAssignmentsBusinessEntitySummarized[]> {
    return from(
      this.#userAssignmentsBusinessEntitiesApiService.getBusinessEntitiesSummarizedByBusinessGroup(
        businessGroupId
      )
    ).pipe(
      map(
        (data) =>
          <
            EntitiesMapped<
              UserAssignmentsBusinessEntitySummarizedDto[],
              UserAssignmentsBusinessEntitySummarized[]
            >
          >data
      ),
      delay(1000)
    );
  }
}
