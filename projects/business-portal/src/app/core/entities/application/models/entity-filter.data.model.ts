import { EntityFilter } from './entity-filter.model';
import { EntityPagination } from './entity-pagination.model';
import { EntitySort } from './entity-sort.model';
import { Entity } from './entity.model';

export type EntityFilterData<E extends Entity, Z extends EntityFilter> = {
  filters: Z;
  pagination: EntityPagination;
  sort: EntitySort<E>;
};
