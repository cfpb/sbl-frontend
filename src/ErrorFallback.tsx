import { PageHeader } from 'design-system-react';
import type React from 'react';
import { useEffect } from 'react';
import FooterCfGovWrapper from './components/FooterCfGovWrapper';
import { Error500 } from './pages/Error/Error500';

function ErrorFallback(): React.ReactElement {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')) {
        event.preventDefault();
        window.location.href = target.getAttribute('href') ?? '/';
      }
    };

    const handlePopState = (): void => {
      window.location.reload();
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <PageHeader />
      <Error500 />
      <FooterCfGovWrapper />
    </>
  );
}

export default ErrorFallback;
