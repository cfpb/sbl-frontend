import { Alert } from 'design-system-react';
import { Link } from 'react-scroll';

import { FormFieldsHeaderError as formFieldsHeaderError } from 'pages/ProfileForm/types';

interface Step1FormErrorHeaderProperties {
  errors: object;
}

/**
 *
 * @returns List of Schema Errors - for Step1Form
 */
function Step1FormErrorHeader({
  errors,
}: Step1FormErrorHeaderProperties): JSX.Element {
  // formErrors && Object.keys(formErrors).length > 0
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className='mb-[30px] w-full'>
      <Alert
        message='There was a problem completing your profile'
        status='error'
      >
        {Object.keys(errors)
          .filter(k => k !== 'fiData')
          .map((key: string): JSX.Element => {
            const focusKeyItem = (): void => {
              // TODO: Refactor with useRef - https://github.com/cfpb/sbl-frontend/issues/102
              const element = document.querySelector(`#${key}`) as
                | HTMLElement
                | undefined;
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
              <span className='mb-2 flex' key={key}>
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
                  {
                    formFieldsHeaderError[
                      key as keyof typeof formFieldsHeaderError
                    ]
                  }
                </Link>
              </span>
            );
          })}
      </Alert>
    </div>
  );
}

export default Step1FormErrorHeader;
