// temporary page to show when we are missing salesforce forms
// Remove Salesforce placeholder after POC, see: https://github.com/cfpb/sbl-frontend/issues/214

import { Link } from 'components/Link';
import { ListItem, TextIntroduction } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { One } from 'utils/constants';
import completeYourUserProfileImg from '../../../public/static/MVP-Complete-your-user-profile.png';
import updateYourFinancialInstitutionImg from '../../../public/static/MVP-Update-your-financial-institution-profile.png';
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
          className='content_main !mb-0'
          style={{
            background: `transparent url('/static/salesforce-logo.svg') no-repeat right center`,
            backgroundSize: '35%',
          }}
        >
          <section className='content_main-inner'>
            <div className='error_copy_container'>
              <header className='error_header'>
                <TextIntroduction
                  heading='We are currently building our own Salesforce forms'
                  subheading='We have recently been given the opportunity to make our own help forms that connect to the Salesforce platform, which we believe will create a smoother user experience that also better fits within our deadlines.'
                  callToAction={
                    <>
                      <ListItem>
                        <Link
                          href={
                            isCompleteUserProfile
                              ? completeYourUserProfileImg
                              : updateYourFinancialInstitutionImg
                          }
                          isRouterLink={false}
                          type='list'
                        >
                          {isCompleteUserProfile
                            ? 'View complete your user profile design'
                            : 'View update your financial institution profile design'}
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          onClick={onBackButtonClick}
                          href='/'
                          label='Go back to previous page'
                          type='list'
                        >
                          Go back to previous page
                        </Link>
                      </ListItem>
                    </>
                  }
                />
              </header>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default MissingSalesforce;
