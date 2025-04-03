import { Observable } from 'rxjs';

import { Entity } from './entity.model';
import { EntityFilter } from './entity-filter.model';
import { EntityFilterData } from './entity-filter.data.model';
import { Entities } from './entities.data.model';

export type EntityListDataService<
  E extends Entity,
  F extends EntityFilter,
  C extends Record<string, unknown>
> = {
  getListByFilterAndPagination(
    params: EntityFilterData<E, F>
  ): Observable<Entities<E>>;
  createEntity(entity: C): Observable<unknown>;
};
