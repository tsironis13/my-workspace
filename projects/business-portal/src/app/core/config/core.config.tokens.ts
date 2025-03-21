import { InjectionToken } from '@angular/core';
import { PaginatorConfig, YesNoConfig } from './core.config.models';
import { CoreConfig } from './core.config';

export const PAGINATOR_CONFIG = new InjectionToken<PaginatorConfig>(
  'paginatorConfig'
);

export const providePaginatorConfig = () => {
  return {
    provide: PAGINATOR_CONFIG,
    useValue: {
      defaultPageSize: CoreConfig.pageSizeOptions[0],
      pageSizeOptions: CoreConfig.pageSizeOptions,
      defaultPageNumber: CoreConfig.defaultPageNumber,
    },
  };
};

export const YES_NO_OPTIONS_CONFIG = new InjectionToken<YesNoConfig[]>(
  'yesNoOptionsConfig'
);

export const provideYesNoOptionsConfig = () => {
  return {
    provide: YES_NO_OPTIONS_CONFIG,
    useValue: CoreConfig.yesNoOptions,
  };
};

export const provideCoreConfig = () => [
  provideYesNoOptionsConfig(),
  providePaginatorConfig(),
];
