import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { provideTrpcCore } from '@business-portal/frontend';
import { provideCoreConfig } from './config/core.config.tokens';
import { primeng, providePrimengCoreServices } from './config/primeng/config';

export type CoreOptions = {
  routes: Routes;
};

export function provideCore({ routes }: CoreOptions) {
  return [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideTrpcCore(),
    providePrimeNG(primeng()),
    providePrimengCoreServices(),
    provideCoreConfig(),
  ];
}
