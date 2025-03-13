import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { apiClient, TRPC_CLIENT } from '@business-portal/frontend';

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
    provideRouter(routes),
    provideTRPClient(),
  ];
}
