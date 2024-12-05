/* eslint-disable react/require-default-props */
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';
import LabelOptional from 'components/LabelOptional';
import { TextInput } from 'components/TextInput';
import { Heading } from 'design-system-react';
import type { InputType } from 'design-system-react/dist/components/TextInput/TextInput';
import type { DisplayFieldProperties } from 'pages/Filing/ViewInstitutionProfile/DisplayField';
import { DisplayField } from 'pages/Filing/ViewInstitutionProfile/DisplayField';

interface InputEntryProperties extends ComponentPropsWithoutRef<'input'> {
  id: string;
  label: JSX.Element | string;
  type?: InputType;
  errorMessage?: string | undefined;
  isDisabled?: boolean;
  isLast?: boolean;
  hideInput?: boolean;
  showError?: boolean;
  children?: ReactNode;
  isOptional?: boolean;
  helperText?: string;
}

const InputEntry = forwardRef<
  HTMLInputElement,
  DisplayFieldProperties & InputEntryProperties
>(
  (
    {
      className = '',
      id,
      name = '',
      errorMessage,
      label,
      isDisabled = false,
      hideInput = false,
      isLast = false,
      showError = true,
      children,
      isOptional = false,
      type = 'text',
      helperText,
      fallbackValue,
      ...properties
    },
    reference,
  ) => {
    const handleError = Boolean(showError && errorMessage);
    return (
      <div className={`${isLast ? '' : 'mb-[1.875rem]'} ${className}`}>
        <Element name={id}>
          {hideInput ? null : (
            <>
              <label htmlFor={id}>
                <Heading
                  type='3'
                  className={`h4 ${helperText ? 'mb-0' : 'mb-[0.625rem]'}`}
                >
                  {label}
                  {isOptional ? <LabelOptional /> : null}
                </Heading>
                {helperText ? (
                  <div className='my-[0.625rem] max-w-[41.875rem] text-grayDark'>
                    {helperText}
                  </div>
                ) : null}
              </label>
              {children}
              <TextInput
                isFullWidth
                type={id === 'email' ? 'email' : type}
                id={id}
                name={name}
                status={handleError ? 'error' : undefined}
                aria-invalid={handleError ? 'true' : 'false'}
                disabled={isDisabled}
                {...properties}
                ref={reference}
              />
            </>
          )}
          {hideInput ? (
            <DisplayField
              label={label}
              value={children}
              fallbackValue={fallbackValue}
            />
          ) : null}
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
