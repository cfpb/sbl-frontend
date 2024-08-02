import { PageHeader } from 'design-system-react';
import type React from 'react';
import { useEffect } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import FooterCfGovWrapper from './components/FooterCfGovWrapper';
import { Error500 } from './pages/Error/Error500';

function ErrorFallback({ error }: FallbackProps): React.ReactElement {
  useEffect(() => {
    const handlePopState = (): void => {
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const errorState = {
    message: error instanceof Error ? error.message : String(error),
    code: error instanceof Error ? error.name : 'UnknownError',
  };

  return (
    <>
      <PageHeader />
      <Error500 error={errorState} />
      <FooterCfGovWrapper />
    </>
  );
}

export default ErrorFallback;
