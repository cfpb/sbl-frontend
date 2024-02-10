/* eslint-disable react/require-default-props */
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';
import { Heading, TextInput } from 'design-system-react';
import isString from 'utils/isString';

interface InputEntryProperties
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  id: string;
  label: JSX.Element | string;
  errors: object;
  isDisabled?: boolean;
  isLast?: boolean;
  hideInput?: boolean;
  showError?: boolean;
  children?: ReactNode;
}

const InputEntry = forwardRef<HTMLInputElement, InputEntryProperties>(
  (
    {
      id,
      errors,
      label,
      isDisabled = false,
      hideInput = false,
      isLast = false,
      showError = true,
      children,
      ...properties
    },
    reference,
  ) => {
    const handleError = Boolean(showError && errors[id]);
    return (
      <div className={`${isLast ? '' : 'mb-[0.9375rem]'}`}>
        <Element name={id}>
          <label htmlFor={id}>
            {isString(label) ? (
              <Heading
                type='4'
                className={`${hideInput ? 'mb-[0.5rem]' : 'mb-[0.625rem]'}`}
              >
                {label}
              </Heading>
            ) : (
              <div>{label}</div>
            )}
          </label>
          {children}
          {/* TODO: Will put in a prop to style the email input as a regular text */}
          {/* https://github.com/cfpb/sbl-frontend/issues/156 */}
          <div className={`${hideInput ? 'hidden' : ''}`}>
            <TextInput
              isFullWidth
              type={id === 'email' ? 'email' : 'text'}
              id={id}
              status={handleError ? 'error' : ''}
              aria-invalid={handleError ? 'true' : 'false'}
              disabled={isDisabled}
              ref={reference}
              {...properties}
            />
          </div>
          {handleError ? (
            <div>
              <InputErrorMessage>{errors[id].message}</InputErrorMessage>
            </div>
          ) : null}
        </Element>
      </div>
    );
  },
);

export default InputEntry;
