import { Button, Link, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { useState } from 'react';
import './error.less';
import useGlobalErrorState from './useGlobalErrorState';

function ErrorDetails(): ReactElement | null {
  const [showError, setShowError] = useState(false);
  const errorState = useGlobalErrorState();

  if (!errorState.error) return null;

  const onShowError = (): void => setShowError(!showError);

  const content = showError ? (
    <Button
      appearance='secondary'
      onClick={onShowError}
      className='m-0 block min-h-10 w-1/2'
      label={errorState.error}
    />
  ) : (
    <Button
      appearance='warning'
      onClick={onShowError}
      label='Show error details'
    />
  );

  return <div className='details-wrapper'>{content}</div>;
}

export function Error500(): ReactElement {
  return (
    <main className='content error_main error_main__500' id='main'>
      <div className='content_wrapper'>
        <div className='content_main '>
          <section className='content_main-inner'>
            <div className='main_wrapper'>
              <div className='error_copy_container'>
                <header className='error_header'>
                  <h1>500: Server error</h1>
                  <Paragraph className='lead-paragraph'>
                    We can’t find the page you’re looking for. Visit our
                    homepage for helpful tools and resources, or contact us and
                    we’ll point you in the right direction.
                  </Paragraph>
                </header>
              </div>

              <aside className='error_action_container'>
                <div className='error_action_col'>
                  <Link href='/' className='a-btn a-btn__full-on-xs'>
                    Platform homepage
                  </Link>
                </div>
                <div className='error_action_col'>
                  <Link
                    className='a-btn a-btn__full-on-xs'
                    href='/about-us/contact-us/'
                  >
                    Contact us
                  </Link>
                </div>
              </aside>

              <Paragraph>
                Are you sure this is the right web address?&nbsp;
                <Link
                  className='a-link a-link__jump'
                  href={`mailto:CFPB_website@consumerfinance.gov?subject=404%20Error%20at%20%22${encodeURIComponent(
                    window.location.href,
                  )}%22`}
                >
                  <span className='a-link_text'>Let us know</span>
                </Link>
              </Paragraph>

              <ErrorDetails />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Error500;
