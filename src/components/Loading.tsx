import { FooterCfGov, Icon, PageHeader } from 'design-system-react';
import type { ReactElement } from 'react';

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
    <div className='flex flex-1 items-center justify-center'>
      <Icon name='updating' /> <div className='ml-[5px]'>{message}</div>
    </div>
  );
}

/**
 * Full-page loading for React.Suspense
 */
export function LoadingApp({ message }: LoadingType): ReactElement {
  return (
    <div className='flex h-dvh flex-col'>
      <PageHeader links={[]} />
      <LoadingContent {...{ message }} />
      <FooterCfGov />
    </div>
  );
}

export default { Loading: LoadingContent };
