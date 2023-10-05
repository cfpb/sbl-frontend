import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';

interface InputEntryProperties extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  id: string;
  label: string;
  errors: object;
  isDisabled: boolean;
  children?: ReactNode;
}

const InputEntry = forwardRef<HTMLInputElement, InputEntryProperties>(
  ({ id, errors, label, isDisabled = false, children, ...properties }, reference) => (
          <div className="mb-6">
            <Element name={id}>
              <label
                htmlFor={id}
                className="a-label a-label__heading"
              >
                {label}
              </label>
              {children}
              <input
                type={id==="email" ? "email" : "text"}
                id={id}
                className={`w-full border ${errors[id] ? 'border-errorColor border-2': "border-cfpbBorderColor"} disabled:bg-disabledColor box-border`}
                aria-invalid={errors[id] ? "true" : "false"}
                disabled={isDisabled}
                ref={reference}
                {...properties}
              />
              {errors[id] ? <div>
                <InputErrorMessage>{errors[id].message}</InputErrorMessage>
              </div> : null}
            </Element>
          </div>
    )
);

InputEntry.defaultProps = {
  children: null
};

export default InputEntry;