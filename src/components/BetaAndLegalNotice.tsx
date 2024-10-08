import { Link } from 'components/Link';
import { Alert, Heading, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';

export default function BetaAndLegalNotice(): ReactElement {
  return (
    <Alert
      className='mb-[2.813rem]'
      message={
        <>
          <Heading type='2' className='h4 mb-[0.313rem]'>
            This is a beta for the Small Business Lending Data Filing Platform
          </Heading>
          <Paragraph>
            Thank you for participating. The beta platform is available to
            upload, test, and validate data. All uploaded data is for testing
            purposes only and may be removed at any time. For questions or
            feedback,{' '}
            <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Home page: Questions or feedback'>
              email our support staff
            </Link>
            .
          </Paragraph>
        </>
      }
      status='warning'
      // TODO: allow setting to strip heading formatting in Alerts post-mvp
      // @ts-expect-error - See issue: https://github.com/cfpb/design-system-react/issues/351
      headingLevel={null}
    />
  );
}
