import { Link } from 'components/Link';
import { Alert, Paragraph } from 'design-system-react';
import type { ComponentProps } from 'react';
import { sblHelpMail } from 'utils/common';

interface AlertApiUnavailableProperties {
  // eslint-disable-next-line react/require-default-props
  message?: string;
  // eslint-disable-next-line react/require-default-props
  href?: string;
}
/**
 * For use when an API call fails
 */
export function AlertApiUnavailable({
  message = 'Unable to connect at the moment',
  href = sblHelpMail,
  ...others
}: AlertApiUnavailableProperties & ComponentProps<typeof Alert>): JSX.Element {
  return (
    <Alert
      className='u-mt45 mx-auto mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={message}
      status='error'
      aria-live='polite'
      aria-atomic='true'
      {...others}
    >
      <Paragraph>
        Try again in a few minutes. If this issue persists,{' '}
        <Link href={href}>email our support staff</Link>.
      </Paragraph>
    </Alert>
  );
}

export default AlertApiUnavailable;
