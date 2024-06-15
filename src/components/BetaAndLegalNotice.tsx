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
            This is a beta for the small business lending data submission
            platform
          </Heading>
          <Paragraph>
            Thank you for participating. The data submission platform is
            available to upload, test, and validate data. All uploaded data is
            for testing purposes only and may be removed at any time. For
            questions or feedback,{' '}
            <Link
              aria-label='email our support staff about the beta'
              href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Home page: Questions or feedback'
            >
              email our support staff
            </Link>
            .
          </Paragraph>
          <Paragraph>
            In light of court orders in ongoing litigation, the CFPB plans to
            issue an interim final rule to extend the compliance dates of the
            small business lending rule.{' '}
            <Link href='https://www.consumerfinance.gov/1071-rule/'>
              Find out more
            </Link>
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
