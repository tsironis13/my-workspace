import { computed, inject, Signal, Type } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { EntityId, setAllEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import { Entity } from '../models/entity.model';
import { EntityFilter } from '../models/entity-filter.model';
import { EntitySort } from '../models/entity-sort.model';
import { EntityListDataService } from '../models/entity-list.data.service.model';
import { EntityFilterData } from '../models/entity-filter.data.model';
import { EntityPagination } from '../models/entity-pagination.model';
import { PAGINATOR_CONFIG } from 'projects/business-portal/src/app/core/config/core.config.tokens';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
  setError,
} from '../../../store/request-status.feature';

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
        filters: <F>{},
      })
    ),
    withState<{ totalCount: number }>(() => ({
      totalCount: 0,
    })),
    withRequestStatus(),
    withProps(() => ({
      _dataService: inject(dataService),
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
      return {
        changeFilters(filters: F): void {
          patchState(
            store,
            { filters },
            updatePagination(store.pagination().pageSize, 1)
          );
        },
        changePage(pageNumber: number): void {
          patchState(
            store,
            updatePagination(store.pagination().pageSize, pageNumber)
          );
        },
        changePageSize(pageSize: number): void {
          patchState(store, updatePagination(pageSize, 1));
        },
        onSortChange(sort: EntitySort<E>): void {
          patchState(store, {
            sort,
            pagination: { ...store.pagination(), pageNumber: 1 },
          });
        },
        getListByFilterAndPagination: rxMethod<EntityFilterData<E, F>>(
          pipe(
            switchMap((params) => {
              patchState(store, setPending());

              return store._dataService
                .getListByFilterAndPagination(params)
                .pipe(
                  //delay(3000),
                  tapResponse({
                    next: (response) => {
                      patchState(
                        store,
                        setAllEntities(response.items),
                        {
                          totalCount: response.totalCount,
                        },
                        setFulfilled()
                      );
                    },
                    error: (error: any) => {
                      console.error(error);
                      patchState(store, setError(error.message));
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

export function updatePagination(
  pageSize: number,
  pageNumber: number
): { pagination: EntityPagination } {
  return {
    pagination: {
      pageNumber,
      pageSize,
    },
  };
}
