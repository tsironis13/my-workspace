import { inject, InjectionToken } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@business-portal/backend';

export const TRPC_CLIENT = new InjectionToken<typeof apiClient>('apiClient');

let token = '';

export function setToken(t: string): void {
  token = t;
}

export const apiClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers() {
        return {
          Authorization: `Bearer ${token}`,
        };
      },
    }),
  ],
});

export function injectTrpcClient() {
  return inject(TRPC_CLIENT);
}
