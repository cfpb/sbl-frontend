import { Alert, List, ListItem } from 'design-system-react';
import type { PropsWithChildren } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { Element, Link } from 'react-scroll';
import { One } from 'utils/constants';

import getAllProperties from 'utils/getAllProperties';
import type { FormErrorKeyType } from 'utils/getFormErrorKeyLogic';

interface FormErrorHeaderProperties<
  M extends FieldValues,
  T extends Record<string, string>,
> {
  id: string;
  keyLogicFunc: (key: string) => FormErrorKeyType;
  errors?: FieldErrors<M>;
  alertHeading?: string;
  formErrorHeaderObject: T;
  showKeyIndexNumber?: boolean;
}

/**
 *
 * @returns List of Schema Errors - for Step1Form
 */
function FormErrorHeader<
  M extends FieldValues,
  T extends Record<string, string>,
>({
  alertHeading,
  errors,
  id,
  keyLogicFunc,
  formErrorHeaderObject,
  showKeyIndexNumber,
}: PropsWithChildren<FormErrorHeaderProperties<M, T>>): JSX.Element | null {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className='mb-[2.8125rem] mt-[2.8125rem] w-full'>
      <Element name={id} id={id}>
        <Alert
          className='[&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
          message={alertHeading}
          status='error'
        >
          <List isLinks>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {getAllProperties(errors).map((key: string): JSX.Element => {
              const {
                keyField,
                scrollKey,
                keyIndex,
                formFieldsHeaderErrorKey,
              } = keyLogicFunc(key);

              const focusKeyItem = (): void => {
                const element = document.querySelector(`#${scrollKey}`) as
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
                event: React.KeyboardEvent<
                  HTMLAnchorElement | HTMLButtonElement
                >,
              ): void => {
                if (event.key === 'Enter' || event.key === ' ') {
                  focusKeyItem();
                }
              };

              const zodErrorMessage = (errors[keyField]?.message ??
                // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                errors[keyField]?.[keyIndex]?.[formFieldsHeaderErrorKey]
                  ?.message) as string | undefined;

              return (
                <ListItem key={key}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    href='#'
                    className='m-list_link'
                    to={scrollKey}
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
                      zodErrorMessage && formErrorHeaderObject[zodErrorMessage]
                        ? formErrorHeaderObject[zodErrorMessage]
                        : 'Missing entry'
                    }${
                      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                      showKeyIndexNumber && typeof keyIndex === 'number'
                        ? ` (${keyIndex + One})`
                        : ''
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
  alertHeading: 'There was a problem completing your user profile',
  errors: null,
  showKeyIndexNumber: false,
};

export default FormErrorHeader;
