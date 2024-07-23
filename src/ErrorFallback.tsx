import { useEffect } from 'react';
import type { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error }: FallbackProps): null {
  useEffect(() => {
    window.location.href = '/500';
  }, [error]);

  return null;
}

export default ErrorFallback;
