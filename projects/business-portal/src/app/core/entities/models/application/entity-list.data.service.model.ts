import { Observable } from 'rxjs';

import { Entity } from '../entity.model';
import { EntityFilter } from '../entity-filter.model';
import { EntityFilterData } from './entity-filter.data.model';
import { Entities } from './entities.data.model';

export interface EntityListDataService<
  E extends Entity,
  F extends EntityFilter
> {
  getListByFilterAndPagination(
    params: EntityFilterData<E, F>
  ): Observable<Entities<E>>;
}
