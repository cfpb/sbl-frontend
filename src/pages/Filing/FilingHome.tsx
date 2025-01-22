import useSblAuth from 'api/useSblAuth';
import AdditionalResources from 'components/AdditionalResources';
import BetaAndLegalNotice from 'components/BetaAndLegalNotice';
import { Link, ListLink } from 'components/Link';
import {
  Button,
  Divider,
  Heading,
  Hero,
  Layout,
  List,
  Paragraph,
  WellContent,
} from 'design-system-react';
import type { ReactElement } from 'react';
import { gleifGetAnLEI, loginGovHomepage } from 'utils/common';
import './FilingHome.less';
import ProcessStep from './ProcessStep';

function Home(): ReactElement {
  const auth = useSblAuth();

  return (
    <div id='filing-home'>
      <Layout.Main id='main' layout='2-1' bleedbar classes='main-layout'>
        <Hero
          heading='Get started filing your lending data'
          subheading='Covered financial institutions are required to maintain and report information about lending to the CFPB.'
        />
        <Layout.Wrapper>
          <Layout.Content className='content_main u-mb15'>
            <BetaAndLegalNotice />
            <div className='mb-[2.813rem]'>
              <Heading type='2'>Sign in with Login.gov</Heading>
              <Paragraph>
                The CFPB participates with{' '}
                <Link href={loginGovHomepage}>Login.gov</Link> to provide secure
                sign in and private access to your information. You must sign in
                with an email address issued by your financial institution to
                access the platform.
              </Paragraph>
              <Button
                id='signin-button'
                className='mx-0 my-[1rem] block'
                label='Sign in with Login.gov'
                onClick={(): void => void auth.onLogin()}
              />
            </div>
            <Divider className='my-[2.813rem]' />
            <Heading className='mb-[1.875rem]' type='3'>
              Follow these steps to get started
            </Heading>
            <ProcessStep
              number={1}
              heading='Confirm that your financial institution has an LEI'
            >
              In order to begin using the platform you must have a Legal Entity
              Identifier (LEI) for your financial institution. If your
              organization does not have an LEI, visit the{' '}
              <Link href={gleifGetAnLEI}>Global LEI Foundation (GLEIF)</Link> to
              get an LEI.
            </ProcessStep>

            <ProcessStep
              number={2}
              heading='Create an account with Login.gov using your financial institution email address'
            >
              You must sign in using an email address issued by your financial
              institution to access the platform. Personal email addresses will
              not be accepted.
              {/* TODO: all these bespoke spacing values should probably be replaced with DSR spacing
            tokens by modifying the Tailwind theme, see:
            https://github.com/cfpb/sbl-frontend/issues/103
            */}
              <Button
                asLink
                className='mb-[.375rem] mt-[0.9375rem] block'
                label='Create an account with Login.gov'
                onClick={(): void => void auth.onLogin()}
              />
            </ProcessStep>

            <ProcessStep
              number={3}
              heading='Select the financial institution for which you are authorized to file'
            >
              Once your user profile has been associated with a financial
              institution in our database you will have access to the platform
              and can begin the filing process.
            </ProcessStep>

            {/* TODO: all these bespoke spacing values should probably be replaced with DSR spacing
            tokens by modifying the Tailwind theme, see:
            https://github.com/cfpb/sbl-frontend/issues/103
            */}
            <WellContent
              className='mt-[2.813rem]'
              heading='Get help'
              text='Our support staff is available to help. Please allow 24-48 hours for a response during normal business hours.'
              links={[
                <Link
                  href='https://www.consumerfinance.gov/compliance/compliance-resources/small-business-lending-resources/small-business-lending-collection-and-reporting-requirements/small-business-lending-rule-faqs/'
                  key='faq'
                  type='list'
                >
                  Find answers to frequently asked questions
                </Link>,
                <Link
                  href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Platform home: Get help'
                  key='ask-a-question'
                  type='list'
                >
                  Email our support staff
                </Link>,
              ]}
            />
            {/* TODO: all these bespoke spacing values should probably be replaced with DSR spacing
            tokens by modifying the Tailwind theme, see:
            https://github.com/cfpb/sbl-frontend/issues/103
            */}
            <Heading type='5' className='mt-[3.75rem]'>
              CFPB Notice and consent
            </Heading>
            <Paragraph>
              This is a Consumer Financial Protection Bureau (CFPB) information
              system. The CFPB is an independent agency of the United States
              Government. CFPB information systems are provided for the
              processing of official information only. Unauthorized or improper
              use of this system may result in administrative action, as well as
              civil and criminal penalties.
            </Paragraph>
            <Paragraph>
              Because this is a CFPB information system, you have no reasonable
              expectation of privacy regarding any communication or data
              transiting or stored on this information system. All data
              contained on CFPB information systems is owned by CFPB and your
              use of the CFPB information system serves as your consent to your
              usage being monitored, intercepted, recorded, read, copied,
              captured or otherwise audited in any manner, by authorized
              personnel, including but not limited to employees, contractors
              and/or agents of the United States Government.
            </Paragraph>
          </Layout.Content>
          <Layout.Sidebar id='sidebar'>
            <AdditionalResources>
              <ListLink href='https://www.consumerfinance.gov/rules-policy/final-rules/small-business-lending-under-the-equal-credit-opportunity-act-regulation-b/'>
                Final Rule
              </ListLink>
              <ListLink href='https://www.consumerfinance.gov/data-research/small-business-lending/filing-instructions-guide/2024-guide/'>
                Filing instructions guide
              </ListLink>
              <ListLink href='https://www.consumerfinance.gov/compliance/compliance-resources/small-business-lending-resources/small-business-lending-collection-and-reporting-requirements/'>
                Collection and reporting requirements
              </ListLink>
            </AdditionalResources>
            <Divider className='my-[2.813rem]' />
            <Heading type='5'>Privacy Notice</Heading>
            <Paragraph>
              The Consumer Financial Protection Bureau (CFPB) is collecting data
              to test the functionality of the Small Business Lending Data
              Filing Platform.
            </Paragraph>
            <List className='mt-[1rem] list-none pl-0' isLinks>
              <ListLink href='/privacy-notice'>View Privacy Notice</ListLink>
            </List>
            <Divider className='my-[2.813rem]' />
            <Heading type='5'>Paperwork Reduction Act</Heading>
            <Paragraph>
              According to the Paperwork Reduction Act of 1995, an agency may
              not conduct or sponsor, and a person is not required to respond to
              a collection of information unless it displays a valid OMB control
              number. The OMB control number for this collection is 3170-0013.
            </Paragraph>
            <List className='mt-[1rem] list-none pb-10 pl-0' isLinks>
              <ListLink href='/paperwork-reduction-act-notice'>
                View Paperwork Reduction Act statement
              </ListLink>
            </List>
          </Layout.Sidebar>
        </Layout.Wrapper>
      </Layout.Main>
    </div>
  );
}

export default Home;
