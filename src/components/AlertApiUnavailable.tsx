import { Link } from 'components/Link';
import { Alert, Paragraph } from 'design-system-react';
import type { ComponentProps } from 'react';
import { sblHelpMail } from 'utils/common';

interface AlertApiUnavailableProperties {
  message: string;
  // eslint-disable-next-line react/require-default-props
  href?: string;
}
/**
 * For use when an API call fails
 */
export function AlertApiUnavailable({
  message,
  href = sblHelpMail,
  ...others
}: AlertApiUnavailableProperties & ComponentProps<typeof Alert>): JSX.Element {
  return (
    <Alert
      className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      message={message}
      status='error'
      aria-live='polite'
      aria-atomic='true'
      {...others}
    >
      <Paragraph>
        There was a connection issue or our service may be temporarily
        unavailable. Make sure your computer is connected to the internet, and
        try again. If this issue persists,{' '}
        <Link href={href}>contact our support staff</Link>.
      </Paragraph>
    </Alert>
  );
}

export default AlertApiUnavailable;
