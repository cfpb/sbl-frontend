import { Notification } from 'design-stories';
import { useCallback } from 'react';
import { Link } from 'react-scroll';

interface Step1FormErrorHeaderProperties {
  errors: object
}

/**
 * 
 * @returns List of Schema Errors - for Step1Form
 */
function Step1FormErrorHeader({ errors }: Step1FormErrorHeaderProperties): JSX.Element {
  const handleFocus = useCallback(() => document.querySelector(`#${key}`).focus());


  return (
          <div className="w-full mb-[30px]">
            <Notification
              message="There was a problem completing your profile"
              type="error"
            >
              {Object.keys(errors).map((key: string): JSX.Element => {
                const handleFocus = useCallback(() => {
                const element = document.querySelector(`#${key}`) ;
                if (element) {
                  element.focus();
                }
              }, [key]);
                
                return (
                <Link
                  key={key}
                  to={key}
                  smooth
                  duration={200}
                  offset={-100}
                  onClick={handleFocus}
                >
                  {key}
                </Link>
              )
              })}
            </Notification>
        </div>
  )
}

export default Step1FormErrorHeader;