// Rule disabling should be removed after cypress visual diff tests are enabled, see:
// https://github.com/cfpb/sbl-frontend/issues/176
/* eslint-disable simple-import-sort/imports */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from 'App';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import { registerSW } from 'virtual:pwa-register';

import { oidcConfig } from './api/oidc';

import './index.css';

registerSW();

const MAX_RETRIES = 1;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      retry: MAX_RETRIES,
    },
  },
});

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>,
  );
}
