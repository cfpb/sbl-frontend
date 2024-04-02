/* eslint-disable react/require-default-props */
import type { PropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';
import LabelOptional from 'components/LabelOptional';
import { Heading, TextInput } from 'design-system-react';

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
  isOptional?: boolean;
}

const InputEntry = forwardRef<HTMLInputElement, InputEntryProperties>(
  (
    {
      className = '',
      id,
      errorMessage,
      label,
      isDisabled = false,
      hideInput = false,
      isLast = false,
      showError = true,
      children,
      isOptional = false,
      type = 'text',
      ...properties
    },
    reference,
  ) => {
    const handleError = Boolean(showError && errorMessage);
    return (
      <div className={`${isLast ? '' : 'mb-[1.875rem]'} ${className}`}>
        <Element name={id}>
          <label htmlFor={id}>
            <div>
              <Heading
                type='3'
                className={`${hideInput ? 'mb-[0.5rem]' : 'mb-[0.625rem]'} h4`}
              >
                {label}
                {isOptional ? <LabelOptional /> : null}
              </Heading>
            </div>
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
              type={id === 'email' ? 'email' : type}
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
