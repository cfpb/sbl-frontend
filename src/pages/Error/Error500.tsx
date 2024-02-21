import { Expandable, Hero, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContactSupport, LinkVisitHomepage } from './_shared';
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
    <div className='error-details-wrapper mt-[30px] w-full'>
      <Expandable header='Error details for pre-MVP developers'>
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
          <Paragraph>
            We have encountered an error. Visit the platform homepage for
            additional resources or contact our support staff.
          </Paragraph>
          <LinkVisitHomepage />
          <br />
          <br />
          <Paragraph className='contact-us'>
            Does this error keep happening?&nbsp;
            <LinkContactSupport />
          </Paragraph>
          <ErrorDetails />
        </>
      }
    />
  );
}

export default Error500;
