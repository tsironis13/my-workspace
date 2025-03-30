import { inject, InjectionToken, Provider } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@business-portal/backend';
import { ToastService } from '@shared/toast';

let token = '';

export function setToken(t: string): void {
  token = t;
}

const TRPC_PROVIDER = new InjectionToken<
  ReturnType<typeof createTRPCProxyClient<AppRouter>>
>('trpcProvider');

const provideTrpcClient = (): Provider => ({
  provide: TRPC_PROVIDER,
  useFactory: (toastService: ToastService) => {
    return createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000',
          async fetch(url, options) {
            const response = await fetch(url, {
              ...options,
            });
            if (!response.ok) {
              const json = await response.json();
              const message = json[0].error.message;

              toastService.showError(message);
            }
            console.log('response', response);
            return response;
          },
          async headers() {
            return {
              Authorization: `Bearer ${token}`,
            };
          },
        }),
      ],
    });
  },
  deps: [ToastService],
});

export const injectTrpcClient = () => inject(TRPC_PROVIDER);
export const provideTrpcCore = (): Provider => [provideTrpcClient()];
