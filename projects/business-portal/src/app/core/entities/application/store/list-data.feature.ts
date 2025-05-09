import { computed, DestroyRef, inject, Signal, Type } from '@angular/core';
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
import { pipe, tap } from 'rxjs';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import { Entity } from '../models/entity.model';
import { EntityFilter } from '../models/entity-filter.model';
import { EntitySort } from '../models/entity-sort.model';
import { EntityListDataService } from '../models/entity-list.data.service.model';
import { EntityFilterData } from '../models/entity-filter.data.model';
import { EntityPagination } from '../models/entity-pagination.model';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
} from '../../../store/request-status.feature';
import { ToastService } from '@shared/toast';
import { GlobalLoaderStore } from '@shared/global-loader';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  PAGINATOR_CONFIG,
  SORT_CONFIG,
  SortConfig,
} from '@business-portal/core/config';

export function withListDataService<
  E extends Entity,
  F extends EntityFilter,
  C extends Record<string, unknown>,
  S extends EntityListDataService<E, F, C>
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
        pagination = inject(PAGINATOR_CONFIG),
        sort = inject<SortConfig<E>>(SORT_CONFIG)
      ) => ({
        pagination: {
          pageNumber: pagination.defaultPageNumber,
          pageSize: pagination.defaultPageSize,
        },
        sort,
        filters: <F>{},
      })
    ),
    withState<{ totalCount: number }>(() => ({
      totalCount: 0,
    })),
    withRequestStatus(),
    withProps(() => ({
      _dataService: inject(dataService),
      _toastService: inject(ToastService),
      _globalLoaderStore: inject(GlobalLoaderStore),
      _destroyRef: inject(DestroyRef),
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
            updateFilters(filters),
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
                    error: (error: Error) => {
                      console.log(error);
                      patchState(store, setFulfilled());

                      store._toastService.showError(error.message);
                    },
                  })
                );
            })
          )
        ),
        createEntity: rxMethod<C>(
          pipe(
            tap((entity) => {
              const observable = store._dataService.createEntity(entity);

              store._globalLoaderStore
                .withLoadingObservable(observable)
                .pipe(takeUntilDestroyed(store._destroyRef))
                .subscribe({
                  next: () => {
                    store._toastService.showSuccess(
                      'Entity created successfully!'
                    );
                    patchState(
                      store,
                      updateFilters(<F>{}),
                      updatePagination(store.pagination().pageSize, 1)
                    );
                  },
                  error: (e: Error) =>
                    store._toastService.showError(
                      'An error occured while creating the entity.'
                    ),
                });
            })
          )
        ),
      };
    })
  );
}

export function updateFilters<F>(filters: F): { filters: F } {
  return {
    filters,
  };
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
