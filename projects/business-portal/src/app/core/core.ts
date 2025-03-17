import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { apiClient, TRPC_CLIENT } from '@business-portal/frontend';
import { providePaginatorConfig } from './core.config';

export type CoreOptions = {
  routes: Routes;
};

const provideTRPClient = () => {
  return {
    provide: TRPC_CLIENT,
    useValue: apiClient,
  };
};

export function provideCore({ routes }: CoreOptions) {
  return [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideTRPClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    providePaginatorConfig(),
  ];
}
