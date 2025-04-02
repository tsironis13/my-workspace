import { inject, InjectionToken, Provider } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { Router } from '@angular/router';

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
  useFactory: (toastService: ToastService, router: Router) => {
    return createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000',
          async fetch(url, options) {
            const response = await fetch(url, {
              ...options,
            });
            console.log('response', response);
            if (!response.ok) {
              const json = await response.json();
              const message = json[0].error.message;

              toastService.showError(message);

              if (response.status === 401) {
                router.navigate(['/login']);
              }
            }
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
  deps: [ToastService, Router],
});

export const injectTrpcClient = () => inject(TRPC_PROVIDER);
export const provideTrpcCore = (): Provider => [provideTrpcClient()];
