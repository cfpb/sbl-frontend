import { Link } from 'components/Link';
import { Expandable, Heading, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { sblHelpLink } from 'utils/common';
import './error.less';

interface ErrorStateType {
  errorMessage: string;
  statusCode: number | string;
}

function ErrorDetails(): ReactElement | null {
  const { state } = useLocation() as { state?: ErrorStateType };
  if (!state) return null;

  const { errorMessage, statusCode } = state;
  if (!errorMessage) return null;

  return (
    <div className='error-details-wrapper w-full md:w-1/2'>
      <Expandable header='Error details'>
        {statusCode} - {errorMessage}
      </Expandable>
    </div>
  );
}

/**
 * Usage:
 * import { useNavigate } from 'react-router-dom';
 *
 * const navigate = useNavigate()
 * navigate('/500', {state: {errorMessage: 'The sky is falling...', statusCode: '500'}});
 */
export function Error500(): ReactElement {
  // TODO: Replace with a <Hero>
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
                    We have encountered an error. Visit the platform homepage
                    for additional resources or contact our support staff.
                  </Paragraph>
                </header>
              </div>

              <aside className='error_action_container'>
                <Link href='/' className='a-btn a-btn__full-on-xs'>
                  Visit platform homepage
                </Link>

                <Paragraph className='contact-us'>
                  Has this error persisted?&nbsp;
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
