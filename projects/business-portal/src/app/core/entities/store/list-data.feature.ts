import { computed, inject, Signal, Type } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import { Entity } from '../models/entity.model';
import { EntityFilter } from '../models/entity-filter.model';
import { EntityListDataService } from '../models/application/entity-list.data.service.model';
import { EntityFilterData } from '../models/application/entity-filter.data.model';
import { EntityId, setAllEntities } from '@ngrx/signals/entities';

export function withListDataService<
  E extends Entity,
  F extends EntityFilter,
  S extends EntityListDataService<E, F>
>(dataService: Type<S>) {
  return signalStoreFeature(
    {
      state: type<{
        entityMap: Record<EntityId, E>;
        ids: EntityId[];
        //totalCount: number;
      }>(),
      signals: type<{
        entities: Signal<Entity[]>;
      }>(),
    },
    withState<EntityFilterData<E, F>>(() => ({
      pagination: { pageSize: 10, pageNumber: 1 },
      sort: { sortBy: 'id', sortOrder: 1 },
      filters: {} as F,
    })),
    withState<{ totalCount: number }>(() => ({
      totalCount: 0,
    })),
    withComputed((store) => ({
      entityFilterParams: computed<EntityFilterData<E, F>>(() => {
        return {
          pagination: store.pagination(),
          filters: store.filters(),
          sort: store.sort(),
        };
      }),
    })),
    withMethods((store) => {
      const dService = inject(dataService);

      return {
        getListByFilterAndPagination: rxMethod<EntityFilterData<E, F>>(
          pipe(
            switchMap((params) => {
              return dService.getListByFilterAndPagination(params).pipe(
                tapResponse({
                  next: (response) => {
                    patchState(store, setAllEntities(response.items), {
                      totalCount: response.totalCount,
                    });
                  },
                  error: (error) => {
                    console.error(error);
                  },
                })
              );
            })
          )
        ),
      };
    })
  );
}
