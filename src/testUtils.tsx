import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { oidcConfig } from './api/oidc';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

export const DESKTOP_RESOLUTION_WIDTH = 1280;
export const DESKTOP_RESOLUTION_HEIGHT = 800;

export const MOBILE_RESOLUTION_WIDTH = 414;
export const MOBILE_RESOLUTION_HEIGHT = 896;

export default function renderWithProviders(
  ui: ReactElement,
  includeRouter = true,
): void {
  render(ui, {
    wrapper: ({ children }: PropsWithChildren): ReactElement => (
      <AuthProvider
        authority={oidcConfig.authority}
        client_id={oidcConfig.client_id}
        redirect_uri={oidcConfig.redirect_uri}
      >
        <QueryClientProvider client={queryClient}>
          {includeRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
        </QueryClientProvider>
      </AuthProvider>
    ),
  });
}
