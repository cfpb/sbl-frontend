import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from 'App';
import { getRetries } from 'api/common';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import { MAX_RETRIES } from 'utils/constants';
import { registerSW } from 'virtual:pwa-register';
import { oidcConfig } from './api/oidc';
import './index.css';

registerSW();

declare global {
  interface Window {
    logout: () => Promise<void>;
    toggleRouting: () => void;
    setIsRoutingEnabled: (isRoutingEnabled: boolean) => void;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: Number.POSITIVE_INFINITY,
      retry: getRetries(MAX_RETRIES),
      refetchOnWindowFocus: false, // default: true
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
