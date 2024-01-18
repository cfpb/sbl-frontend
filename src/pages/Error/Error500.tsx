import { Expandable, Heading, Link, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sblHelpLink } from 'utils/common';
import './error.less';

const DEFAULT_STATUS = 500;

interface ErrorStateType {
  message: string;
  code?: number | string;
}

/**
 * Hook that will route the user to the /500 page with the provided message/status
 * @param error Error details
 * @returns null
 */
export const useError500 = (): ((error_: ErrorStateType) => null) => {
  const navigate = useNavigate();

  const redirect500 = (error: ErrorStateType): null => {
    navigate('/500', { state: error });
    return null;
  };

  return redirect500;
};

/**
 * Pulls in the error `state` passed to the 500 page via react-router-dom's
 * useNavigate feature and displays the error message and status code.
 *
 * @returns ReactElement | null
 */
function ErrorDetails(): ReactElement | null {
  const { state } = useLocation() as { state?: ErrorStateType };
  if (!state) return null;

  const { message, code } = state;
  if (!message) return null;

  const displayText = `${code ?? DEFAULT_STATUS} - ${message}`;

  return (
    <div className='error-details-wrapper w-full md:w-1/2'>
      <Expandable header='Error details'>{displayText}</Expandable>
    </div>
  );
}

/**
 * Usage:
 * import { useError500 } from 'Error500.tsx';
 * const redirect500 = useError500();
 *
 * if (error) {
 *   return redirect500({ errorMessage: 'The sky is falling...', statusCode: 001 })
 * }
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
