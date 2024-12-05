import { Link } from 'components/Link';
import { Alert } from 'design-system-react';
import type { ReactElement } from 'react';

export default function BetaAndLegalNotice(): ReactElement {
  return (
    <Alert
      className='mb-[2.813rem]'
      message='This is a beta for the Small Business Lending Data Filing Platform'
      status='warning'
      // TODO: allow setting to strip heading formatting in Alerts post-mvp
      // @@ts-expect-error - See issue: https://github.com/cfpb/design-system-react/issues/351
      // headingLevel={null}
    >
      <span className='inline-block max-w-[41.875rem]'>
        Thank you for participating. The beta platform is available to upload,
        test, and validate data. All uploaded data is for testing purposes only
        and may be removed at any time. For questions or feedback,{' '}
        <Link
          href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Home page: Questions or feedback'
          className='border-b-[1px]'
        >
          email our support staff
        </Link>
        .
      </span>
    </Alert>
  );
}
