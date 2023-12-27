import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';

interface InputEntryProperties
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  id: string;
  label: string;
  errors: object;
  isDisabled: boolean;
  children?: ReactNode;
}

const InputEntry = forwardRef<HTMLInputElement, InputEntryProperties>(
  (
    { id, errors, label, isDisabled = false, children, ...properties },
    reference,
  ) => (
    <div className='mb-6'>
      <Element name={id}>
        <label htmlFor={id} className='a-label a-label__heading'>
          {label}
        </label>
        {children}
        {/* TODO: Replace this item with DSR equivalent : https://github.com/cfpb/sbl-frontend/issues/97 */}
        <input
          type={id === 'email' ? 'email' : 'text'}
          id={id}
          className={`w-full !border !border-solid ${
            errors[id]
              ? 'border-2 !border-errorColor'
              : '!border-cfpbBorderColor'
          } box-border disabled:bg-disabledColor`}
          aria-invalid={errors[id] ? 'true' : 'false'}
          disabled={isDisabled}
          ref={reference}
          {...properties}
        />
        {/* TODO: Replace this item with DSR equivalent : https://github.com/cfpb/sbl-frontend/issues/97 */}
        {errors[id] ? (
          <div>
            <InputErrorMessage>{errors[id].message}</InputErrorMessage>
          </div>
        ) : null}
      </Element>
    </div>
  ),
);

InputEntry.defaultProps = {
  children: null,
};

export default InputEntry;
