import { Alert, List } from 'design-system-react';
import { FormFieldsHeaderError as formFieldsHeaderError } from 'pages/ProfileForm/types';
import { Link } from 'react-scroll';

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
    <Alert message='There was a problem completing your profile' status='error'>
      <List isLinks>
        {Object.keys(errors).map((key: string): JSX.Element => {
          const focusKeyItem = (): void => {
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
            <span key={key}>
              {/* Uses the ListLink styling */}
              <li className='m-list_item'>
                <Link
                  className='m-list_link'
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
              </li>
            </span>
          );
        })}
      </List>
    </Alert>
  );
}

export default Step1FormErrorHeader;
