// temporary page to show when we are missing salesforce forms
// Remove Salesforce placeholder after POC, see: https://github.com/cfpb/sbl-frontend/issues/214

import { Link } from 'components/Link';
import { Button, Heading, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { One } from 'utils/constants';
import './error.less';

export function MissingSalesforce(): ReactElement {
  const navigate = useNavigate();
  const onBackButtonClick = (): void => {
    navigate(-One);
  };
  const { pathname } = useLocation();
  const isCompleteUserProfile = pathname.endsWith(
    'complete-your-user-profile/',
  );

  return (
    <main className='content error_main error_main__404' id='main'>
      <div className='content_wrapper'>
        <div
          className='content_main '
          style={{
            background: `transparent url('/static/salesforce-logo.svg') no-repeat right bottom`,
            backgroundSize: '35%',
          }}
        >
          <section className='content_main-inner'>
            <div className='error_copy_container'>
              <header className='error_header'>
                <Heading>
                  We&apos;re currently building our own Salesforce forms
                </Heading>
                <Paragraph isLead>
                  We have recently been given the opportunity to make our own
                  help forms that connect to the Salesforce platform, which we
                  believe will create a smoother user experience that also
                  better fits within our deadlines. We are planning to have a
                  proof of concept completed by the next sprint review, February
                  14th.
                </Paragraph>
              </header>
            </div>

            <aside className='error_action_container'>
              <Link
                className='a-btn a-btn__full-on-xs !mr-10'
                href={
                  isCompleteUserProfile
                    ? '/static/MVP-Complete-your-user-profile.png'
                    : '/static/MVP-Update-your-financial-institution-profile.png'
                }
                isRouterLink={false}
                target='_blank'
              >
                {isCompleteUserProfile
                  ? 'View complete your user profile design'
                  : 'View update your financial institution profile design'}
              </Link>
              <Button
                onClick={onBackButtonClick}
                className='a-btn a-btn__full-on-xs'
                label='Go back to previous page'
              >
                Go back to previous page
              </Button>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}

export default MissingSalesforce;
