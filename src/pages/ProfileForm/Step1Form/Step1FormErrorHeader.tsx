import { Alert } from 'design-system-react';
import { Link } from 'react-scroll';
import { forwardRef } from 'react';

import { FormFieldsHeaderError as formFieldsHeaderError } from 'pages/ProfileForm/types';

interface LinkProperties {
  id: string;
}

function Step1FormErrorHeaderLink({ id }: LinkProperties): JSX.Element {
  const focusKeyItem = (): void => {
    const element = document.querySelector(`#${id}`) as HTMLElement | undefined;
    if (element) {
      element.focus();
    }
  };

  const onHandleFocus = (): void => {
    focusKeyItem();
  };

  const onHandleKeyPress = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      focusKeyItem();
    }
  };

  return (
    <span className='mb-2 flex' key={`${id}-mb-2`}>
      <Link
        className='cursor-default'
        to={id}
        smooth
        duration={300}
        offset={-100}
        onClick={onHandleFocus}
        onKeyPress={onHandleKeyPress}
        tabIndex={0}
      >
        {formFieldsHeaderError[id as keyof typeof formFieldsHeaderError]}
      </Link>
    </span>
  );
}

interface Step1FormErrorHeaderProperties {
  errors: object;
}

/**
 *
 * @returns List of Schema Errors - for Step1Form
 */
const Step1FormErrorHeader = forwardRef<
  HTMLDivElement,
  Step1FormErrorHeaderProperties
>(({ errors }, reference) => {
  // formErrors && Object.keys(formErrors).length > 0
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className='mb-[30px] w-full' ref={reference}>
      <Alert
        message='There was a problem completing your profile'
        status='error'
      >
        {Object.keys(errors)
          .filter(k => k !== 'fiData')
          .map(
            (id: string): JSX.Element => (
              <Step1FormErrorHeaderLink key={id} id={id} />
            ),
          )}
      </Alert>
    </div>
  );
});

export default Step1FormErrorHeader;
