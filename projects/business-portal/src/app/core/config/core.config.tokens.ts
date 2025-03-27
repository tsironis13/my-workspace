import { InjectionToken } from '@angular/core';

import { PaginatorConfig, YesNoConfig } from './core.config.models';
import { CoreConfig } from './core.config';
import { environment } from '@business-portal/env';
import { AUTH_KEY, AUTH_URL } from '@shared/auth';

export const provideAuthConfig = () => {
  return [
    {
      provide: AUTH_KEY,
      useValue: environment.AUTH_KEY,
    },
    {
      provide: AUTH_URL,
      useValue: environment.AUTH_URL,
    },
  ];
};

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
  provideAuthConfig(),
  provideYesNoOptionsConfig(),
  providePaginatorConfig(),
];
