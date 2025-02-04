import { Expandable, Hero } from 'design-system-react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContactSupport, LinkVisitHomepage } from './_shared';
import './error.less';

interface ErrorStateType {
  message: string;
  code?: number | string;
}

export const useError500 = (): ((error_: ErrorStateType) => null) => {
  const navigate = useNavigate();

  const redirect500 = (error: ErrorStateType): null => {
    navigate('/500', { state: error });
    return null;
  };

  return redirect500;
};

function ErrorDetails({
  error = null,
}: {
  // eslint-disable-next-line react/require-default-props
  error?: ErrorStateType | null;
}): ReactElement | null {
  if (!error) return null;

  const { message, code } = error;
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

export function Error500({
  error = null,
}: {
  // eslint-disable-next-line react/require-default-props
  error?: ErrorStateType | null;
}): ReactElement {
  const { state } = useLocation() as { state?: ErrorStateType };
  const errorToDisplay = error ?? state;

  return (
    <Hero
      className='error-page'
      image='/server-706x619.png'
      heading='An unknown error occurred'
      subheading={
        <>
          <span className='mb-[1.25rem] inline-block'>
            We have encountered an error. Visit the platform homepage for
            additional resources or contact our support staff.
          </span>
          <LinkVisitHomepage />
          <br />
          <br />
          <span className='contact-us'>
            Does this error keep happening?&nbsp;
            <LinkContactSupport />
          </span>
          <ErrorDetails error={errorToDisplay} />
        </>
      }
    />
  );
}

export default Error500;
