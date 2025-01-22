import { Icon, PageHeader, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { useHeaderAuthLinks } from 'utils/useHeaderAuthLinks';
import FooterCfGovWrapper from './FooterCfGovWrapper';

export interface LoadingType {
  // TODO: Do we need this rule? Adding Loading.defaultProps = {...} does not fix the error.
  // eslint-disable-next-line react/require-default-props
  message?: ReactElement | string;
}

/**
 * "Content" portion of the loading page
 */
export function LoadingContent({
  message = 'Loading',
}: LoadingType): ReactElement {
  return (
    <Paragraph className='h3 mt-[25%] flex min-h-dvh justify-center text-grayDark'>
      <Icon isPresentational name='updating' />
      <span className='ml-[15px]'>{message}</span>
    </Paragraph>
  );
}

/**
 * Full-page loading for React.Suspense
 */
export function LoadingApp({ message }: LoadingType): ReactElement {
  const headerLinks = [...useHeaderAuthLinks()];

  return (
    <div className='flex min-h-dvh flex-col bg-white'>
      <PageHeader links={headerLinks} />
      <LoadingContent {...{ message }} />
      <FooterCfGovWrapper />
    </div>
  );
}

export default { Loading: LoadingContent };
