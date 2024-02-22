/* eslint-disable react/require-default-props */
import type { PropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';
import { Heading, TextInput } from 'design-system-react';
import isString from 'utils/isString';

interface InputEntryProperties
  extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  id: string;
  label: JSX.Element | string;
  errorMessage?: string | undefined;
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
      errorMessage,
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
    const handleError = Boolean(showError && errorMessage);
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
              // TODO: fix TS errors due by making props optional
              // https://github.com/cfpb/design-system-react/issues/308
              // @ts-expect-error will need to be fixed in DSR TextInput
              type={id === 'email' ? 'email' : 'text'}
              id={id}
              // @ts-expect-error will need to be fixed in DSR TextInput
              status={handleError ? 'error' : ''}
              aria-invalid={handleError ? 'true' : 'false'}
              disabled={isDisabled}
              ref={reference}
              {...properties}
            />
          </div>
          {handleError ? (
            <div>
              <InputErrorMessage>{errorMessage}</InputErrorMessage>
            </div>
          ) : null}
        </Element>
      </div>
    );
  },
);

export default InputEntry;
