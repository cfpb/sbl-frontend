import { Notification } from 'design-system-react';
import { Link } from 'react-scroll';

import { FormFieldsHeaderError as formFieldsHeaderError} from './types';

interface Step1FormErrorHeaderProperties {
  errors: object
}

/**
 * 
 * @returns List of Schema Errors - for Step1Form
 */
function Step1FormErrorHeader({ errors }: Step1FormErrorHeaderProperties): JSX.Element {


  return (
          <div className="w-full mb-[30px]">
            <Notification
              message="There was a problem completing your profile"
              type="error"
            >
              {Object.keys(errors).filter(k => k !== "fiData").map((key: string): JSX.Element => {
                
                const focusKeyItem = (): void => {
                  const element = document.querySelector(`#${key}`) as HTMLElement | undefined;
                  if (element) {
                    element.focus();
                  }
                };
                
                const onHandleFocus = (): void => {
                  focusKeyItem();
                };
                
                const onHandleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === 'Enter' || event.key === " ") {
                    focusKeyItem();
                  }
                };
                
                return (
                  <span className="flex mb-2" key={key}>
                    <Link
                      className='cursor-default'
                      to={key}
                      smooth
                      duration={300}
                      offset={-100}
                      onClick={onHandleFocus}
                      onKeyPress={onHandleKeyPress}
                      tabIndex={0}
                    >
                      {formFieldsHeaderError[key as keyof typeof formFieldsHeaderError]}
                    </Link>
                  </span>
              )
              })}
            </Notification>
        </div>
  )
}

export default Step1FormErrorHeader;