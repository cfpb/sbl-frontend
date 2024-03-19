import { Alert, List, ListItem } from 'design-system-react';
import type { FieldErrors } from 'react-hook-form';
import { Element, Link } from 'react-scroll';

import { FormFieldsHeaderError as formFieldsHeaderError } from 'types/formTypes';
import { formDelimiter } from 'utils/common';
import getAllProperties from 'utils/getAllProperties';

interface FormErrorHeaderProperties {
  id: string;
  errors?: FieldErrors;
}

/**
 *
 * @returns List of Schema Errors - for Step1Form
 */
function FormErrorHeader({
  errors,
  id,
}: FormErrorHeaderProperties): JSX.Element | null {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className='mb-[2.8125rem] mt-[2.8125rem] w-full'>
      <Element name={id} id={id}>
        <Alert
          message='There was a problem completing your profile'
          status='error'
        >
          <List isLinks>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {getAllProperties(errors).map((key: string): JSX.Element => {
              const keySplit = key.split(formDelimiter);
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              const keyUsed = keySplit.at(-1);
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              const keyIndex = keySplit.at(-2) ? Number(keySplit.at(-2)) : null;

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
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                    {/* ex1: 'Enter your name' */}
                    {/* ex2: 'Enter your financial institution's name (1)' */}
                    {`${
                      formFieldsHeaderError[
                        keyUsed as keyof typeof formFieldsHeaderError
                      ] ??
                      errors[keyUsed]?.message ??
                      'Missing entry'
                    }${
                      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                      typeof keyIndex === 'number' ? ` (${keyIndex + 1})` : ''
                    }`}
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

FormErrorHeader.defaultProps = {
  errors: null,
};

export default FormErrorHeader;
