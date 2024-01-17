import { FooterCfGov, Icon, PageHeader } from 'design-system-react';
import type { ReactElement } from 'react';
import { useHeaderAuthLinks } from 'utils/useHeaderAuthLinks';

export interface LoadingType {
  // TODO: Do we need this rule? Adding Loading.defaultProps = {...} does not fix the error.
  // eslint-disable-next-line react/require-default-props
  message?: ReactElement | string;
}

/**
 * "Content" portion of the loading page
 */
export function LoadingContent({
  message = 'Loading...',
}: LoadingType): ReactElement {
  return (
    <div className='mt-96 flex min-h-full flex-1 justify-center text-3xl'>
      <Icon name='updating' />
      <div className='ml-[15px]'>{message}</div>
    </div>
  );
}

/**
 * Full-page loading for React.Suspense
 */
export function LoadingApp({ message }: LoadingType): ReactElement {
  const headerLinks = [...useHeaderAuthLinks()];

  return (
    <div className='flex h-dvh flex-col'>
      <PageHeader links={headerLinks} />
      <LoadingContent {...{ message }} />
      <FooterCfGov />
    </div>
  );
}

export default { Loading: LoadingContent };
