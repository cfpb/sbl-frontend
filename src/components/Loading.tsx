import { FooterCfGov, Heading, Icon, PageHeader } from 'design-system-react';
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
    <Heading type='1' className='mt-[25%] flex min-h-dvh justify-center'>
      <Icon name='updating' />
      <div className='ml-[15px]'>{message}</div>
    </Heading>
  );
}

/**
 * Full-page loading for React.Suspense
 */
export function LoadingApp({ message }: LoadingType): ReactElement {
  const headerLinks = [...useHeaderAuthLinks()];

  return (
    <div className='h-dvh'>
      <PageHeader links={headerLinks} />
      <LoadingContent {...{ message }} />
      <FooterCfGov />
    </div>
  );
}

export default { Loading: LoadingContent };
