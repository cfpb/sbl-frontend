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
      className='m-0 block min-h-20 w-1/2'
      label={errorState.error}
    />
  ) : (
    <Button
      appearance='warning'
      onClick={onShowError}
      label='Show error details'
    />
  );

  return <div className='details-wrapper mt-[30px]'>{content}</div>;
}

// TODO: Replace with a <Hero>
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
                <Link href='/' className='a-btn a-btn__full-on-xs'>
                  Visit platform homepage
                </Link>

                <Paragraph className='contact-us'>
                  Are you sure this is the right web address?&nbsp;
                  <Link
                    className='a-link a-link__jump'
                    href='https://sblhelp.consumerfinance.gov/'
                  >
                    <span className='a-link_text'>
                      Contact our support staff
                    </span>
                  </Link>
                </Paragraph>
              </aside>

              <ErrorDetails />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Error500;
