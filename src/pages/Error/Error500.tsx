import { Expandable, Hero } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContactSupport, LinkVisitHomepage } from './_shared';
import './error.less';

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
  const displayText = [code, message].filter(Boolean).join(' - ');

  if (displayText.length === 0) return null;

  return (
    <div className='error-details-wrapper mt-[30px] w-full'>
      <Expandable header='Error details'>
        <p className='whitespace-pre-wrap'>{displayText}</p>
      </Expandable>
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
  return (
    <Hero
      className='error-page'
      backgroundColor='white'
      image='/server-706x619.png'
      heading='500: Server error'
      subheading={
        <>
          <span className='mb-[1.25rem] inline-block'>
            We have encountered an error. Visit the platform homepage for
            additional resources or contact our support staff.
          </span>
          <LinkVisitHomepage isRouterLink={false} />
          <br />
          <br />
          <span className='contact-us'>
            Does this error keep happening?&nbsp;
            <LinkContactSupport />
          </span>
          <ErrorDetails />
        </>
      }
    />
  );
}

export default Error500;
