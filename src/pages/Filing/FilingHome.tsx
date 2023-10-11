import useSblAuth from 'api/useSblAuth';
import {
  Button,
  Divider,
  Hero,
  Label,
  Layout,
  Link,
  TextInput,
  Well
} from 'design-system-react';
import type { ReactElement } from 'react';
import { Link as NavLink } from "react-router-dom";
import ProcessStep from './ProcessStep';

function Home(): ReactElement {
  const auth = useSblAuth();

  return (
    <div id='filing-home'>
      <Layout.Main id='main' layout='2-1' bleedbar>
        <Hero
          heading='Get started filing your mortgage or small business lending data'
          subheading='Covered financial institutions and voluntary reporters are required to maintain, report, and publicly disclose information about lending.'
          backgroundColor='#EFF8FD'
        />
        <Layout.Wrapper>
          <Layout.Content id='main-content'>
            <ProcessStep
              number={1}
              heading='Make sure your financial institution has an LEI'
            >
              In order to begin using the filing platform you must have a Legal
              Entity Identifier (LEI) for your financial institution. Visit the{' '}
              <Link href='#'>Global LEI Foundation (GLEIF)</Link> website for
              more information on how to obtain an LEI.
            </ProcessStep>

            <ProcessStep
              number={2}
              heading='Sign in or create an account with Login.com'
            >
              The CFPB participates with Login.gov to provide secure sign in and
              private access to your information on the CFPB filing platform.
              <Button
                id='signin-button'
                className="block mx-0 my-[1em]"
                label='Sign in with Login.gov'
                onClick={auth.onLogin}
              />
              <span className='create-account'>
                Don’t have an account?{' '}
                <Button
                  asLink
                  label='Create an account with Login.gov'
                  onClick={auth.onLogin}
                />
              </span>
            </ProcessStep>

            <ProcessStep
              number={3}
              heading='Select the financial institutions you wish to file data on behalf of to complete your user profile'
            >
              Once you have completed your user profile you will have access to
              begin filing for small business or mortgage lending (HMDA) data.
            </ProcessStep>

            <Well
              className="mt-[45px]"
              heading='Get technical help'
              text='Find answers to frequently asked questions regarding the small
                business lending data submission platform. If you need further
                assistance you can submit a technical question using our help
                form.'
              links={[
                <Link href='#' key='faq'>
                  Find answers to frequently asked questions
                </Link>,
                <Link href='#' key='ask-a-question'>
                  Submit a technical question
                </Link>
              ]}
            />
          </Layout.Content>
          <Layout.Sidebar id='sidebar'>
            <div className='additional-resources'>
              <h5 className='heading'>ADDITIONAL RESOURCES</h5>
              <ul className='mt-[1em] pl-0 list-none'>
                <li className='mb-[1em]'>
                  <Link href='#'>Final Rule</Link>
                </li>
                <li className='mb-[1em]'>
                  <Link href='#'>Resources for small business owners</Link>
                </li>
              </ul>
            </div>
            <Divider className='mt-[3em] mb-[2em]' />
            <h3 className='heading'>Get updates</h3>
            <p>
              Sign up for updates about regulatory compliance resources or
              guidance specific to small business lending.
            </p>
            <Label htmlFor='mail-list-signup'>Email address</Label>
            <TextInput
              id='mail-list-signup'
              name='mail-list-signup'
              placeholder='mail@example.com'
              width='full'
              notificationType='success'
            />
            <Divider className='mt-[3em] mb-[2em]' />
            <h4 className='heading'>Privacy Act Notice</h4>
            <p>
              The information in this system is being collected to facilitate the supervision of companies under CFPB’s authority. 
            </p>
            <ul className='mt-[1em] pl-0 list-none'>
              <li className='mb-[1em]'>
              <NavLink to="/Test">
                <Link>View Privacy Act Notice</Link>
              </NavLink>
              </li>
            </ul>
            <Divider className='mt-[3em] mb-[2em]' />
            <h4 className='heading'>Paperwork Reduction Act</h4>
            <p>
            According to the Paperwork Reduction Act of 1995, an agency may not conduct or sponsor, and a person is not required to respond to a collection of information unless it displays a valid OMB control number. The OMB control number for this collection is 3170-0013. 
            </p>
            <ul className='mt-[1em] pl-0 pb-10 list-none'>
              <li className='mb-[1em]'>
              <NavLink to="/PRANotice">
                <Link>View Paperwork Reduction Act Notice</Link>
              </NavLink>
              </li>
            </ul>
          </Layout.Sidebar>
        </Layout.Wrapper>
      </Layout.Main>
    </div>
  );
}

export default Home;
