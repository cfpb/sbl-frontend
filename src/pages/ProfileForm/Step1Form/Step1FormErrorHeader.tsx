import { Alert } from 'design-system-react';
import { Link } from 'react-scroll';
import { useRef } from 'react';

import { FormFieldsHeaderError as formFieldsHeaderError } from 'pages/ProfileForm/types';

interface LinkProperties {
  id: string
}

function Step1FormErrorHeaderLink({id}: LinkProperties): JSX.Element { 
  const fieldReference = useRef(document.querySelector(`#${id}`) as HTMLElement | undefined);
  
  const focusKeyItem = (): void => {
    if (fieldReference.current) {
      fieldReference.current.focus();
    }
  };
  
  const onHandleFocus = (): void => {
    focusKeyItem();
  };
  
  const onHandleKeyPress = (event: React.KeyboardEvent<HTMLAnchorElement>): void => {
    if (event.key === 'Enter' || event.key === " ") {
      focusKeyItem();
    }
  };
  
  return (
    <span className="flex mb-2" key={`${id}-mb-2`}>
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
  errors: object
}

/**
 * 
 * @returns List of Schema Errors - for Step1Form
 */
function Step1FormErrorHeader({ errors }: Step1FormErrorHeaderProperties): JSX.Element {

  // formErrors && Object.keys(formErrors).length > 0
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
          <div className="w-full mb-[30px]">
            <Alert
              message="There was a problem completing your profile"
              status="error"
            >
              {
              Object.keys(errors).filter(k => k !== "fiData").map((id: string): JSX.Element => <Step1FormErrorHeaderLink key={id} id={id} />)
              }
            </Alert>
        </div>
  )
}

export default Step1FormErrorHeader;

