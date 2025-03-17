import { InjectionToken } from '@angular/core';

const AppConfig = {
  defaultPageNumber: 1,
  defaultPageSize: 20,
  pageSizeOptions: [20, 50, 200],
};

type PaginatorConfig = {
  defaultPageNumber: number;
  defaultPageSize: number;
  pageSizeOptions: number[];
};

export const PAGINATOR_CONFIG = new InjectionToken<PaginatorConfig>(
  'paginatorConfig'
);

export const providePaginatorConfig = () => {
  return {
    provide: PAGINATOR_CONFIG,
    useValue: {
      defaultPageSize: AppConfig.pageSizeOptions[0],
      pageSizeOptions: AppConfig.pageSizeOptions,
      defaultPageNumber: AppConfig.defaultPageNumber,
    },
  };
};
