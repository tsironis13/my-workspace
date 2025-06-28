import { delay, from, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { EntitiesMapped } from '@business-portal/core/entities/application';
import {
  UserAssignmentsBusinessEntitySummarizedDto,
  UserAssignmentsBusinessEntitiesApiService,
} from '@business-portal/user-assignments/infrastructure';
import { UserAssignmentsBusinessEntitySummarized } from './business-entities.data.model';

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
