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
      retry: MAX_RETRIES
    }
  }
});

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(
    <AuthProvider
      authority={oidcConfig.authority}
      client_id={oidcConfig.client_id}
      redirect_uri={oidcConfig.redirect_uri}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  );
}
