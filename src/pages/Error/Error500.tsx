import { Button, Heading, Link, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sblHelpLink } from 'utils/common';
import './error.less';

interface ErrorStateType {
  errorMessage: string;
  statusCode: number | string;
}

function ErrorDetails(): ReactElement | null {
  const [showError, setShowError] = useState(false);

  const { state } = useLocation() as { state?: ErrorStateType };
  if (!state) return null;

  const { errorMessage, statusCode } = state;
  if (!errorMessage) return null;

  const onShowError = (): void => setShowError(!showError);

  const content = showError ? (
    <Button
      appearance='secondary'
      onClick={onShowError}
      className='m-0 block min-h-20 w-1/2'
      label={`${statusCode} - ${errorMessage}`}
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
                  <Heading type='1'>500: Server error</Heading>
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
                  <Link className='a-link a-link__jump' href={sblHelpLink}>
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
