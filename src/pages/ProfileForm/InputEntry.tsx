import type { ReactNode } from 'react';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';

interface InputEntryProperties extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  id: string;
  label: string;
  errors: object;
  isDisabled: boolean;
  // register: UseFormRegisterReturn;
  children: ReactNode
}

const InputEntry = React.forwardRef<HTMLInputElement, InputEntryProperties>(
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
                className={`w-full border !border-cfpbBorderColor ${errors[id] ? 'border-errorColor border-2': ""} disabled:bg-disabledColor`}
                disabled={isDisabled}
                ref={reference}
                {...properties}
              />
              {errors[id] ? <p className="text-base text-errorColor">
                <InputErrorMessage>{errors[id].message}</InputErrorMessage>
              </p> : null}
            </Element>
          </div>
    )
);

export default InputEntry;