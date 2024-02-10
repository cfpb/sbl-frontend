/* eslint-disable jsx-a11y/anchor-is-valid */
import { Alert, List, ListItem } from 'design-system-react';
import { Element, Link } from 'react-scroll';

import { FormFieldsHeaderError as formFieldsHeaderError } from 'pages/ProfileForm/types';

interface FormErrorHeaderProperties {
  id: string;
  errors: object;
}

/**
 *
 * @returns List of Schema Errors - for Step1Form
 */
function FormErrorHeader({
  errors,
  id,
}: FormErrorHeaderProperties): JSX.Element {
  // formErrors && Object.keys(formErrors).length > 0
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className='mb-[2.8125rem] mt-[2.8125rem] w-full'>
      <Element name={id} id={id}>
        <Alert
          message='There was a problem completing your profile'
          status='error'
        >
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
                event: React.KeyboardEvent<HTMLButtonElement>,
              ): void => {
                if (event.key === 'Enter' || event.key === ' ') {
                  focusKeyItem();
                }
              };

              return (
                <ListItem key={key}>
                  <Link
                    href='#'
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
                </ListItem>
              );
            })}
          </List>
        </Alert>
      </Element>
    </div>
  );
}

export default FormErrorHeader;
