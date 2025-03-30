import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { provideTrpcCore } from '@business-portal/frontend';
import { provideCoreConfig } from './config/core.config.tokens';
import { primeng } from './config/primeng/config';
import { MessageService } from 'primeng/api';
export type CoreOptions = {
  routes: Routes;
};

export function provideCore({ routes }: CoreOptions) {
  return [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideTrpcCore(),
    MessageService,
    providePrimeNG(primeng()),
    provideCoreConfig(),
  ];
}
