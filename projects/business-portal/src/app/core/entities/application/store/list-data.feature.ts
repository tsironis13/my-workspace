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
import { EntitySort } from '../models/entity-sort.model';
import { EntityListDataService } from '../models/entity-list.data.service.model';
import { EntityFilterData } from '../models/entity-filter.data.model';
import { EntityId, setAllEntities } from '@ngrx/signals/entities';
import { EntityPagination } from '../models/entity-pagination.model';
import { PAGINATOR_CONFIG } from '@business-portal/core/config';

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
      }>(),
      signals: type<{
        entities: Signal<Entity[]>;
      }>(),
    },
    withState<EntityFilterData<E, F>>(
      (
        pageNumber = inject(PAGINATOR_CONFIG).defaultPageNumber,
        pageSize = inject(PAGINATOR_CONFIG).defaultPageSize
      ) => ({
        pagination: {
          pageNumber,
          pageSize,
        },
        sort: { sortBy: 'id', sortOrder: 1 },
        filters: {} as F,
      })
    ),
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
        changePage(pageNumber: number): void {
          this.onPaginationChange({
            ...store.pagination(),
            pageNumber,
          });
        },
        changePageSize(pageSize: number): void {
          this.onPaginationChange({
            pageNumber: 1,
            pageSize,
          });
        },
        onSortChange(sort: EntitySort<E>): void {
          patchState(store, {
            sort,
            pagination: { ...store.pagination(), pageNumber: 1 },
          });
        },
        onPaginationChange(pagination: EntityPagination): void {
          patchState(store, { pagination });
        },
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
