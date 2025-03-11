import { inject, InjectionToken } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@business-portal/backend';

export const TRPC_CLIENT = new InjectionToken<typeof apiClient>('apiClient');

export const apiClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

export function injectTrpcClient() {
  return inject(TRPC_CLIENT);
}
