import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Element } from 'react-scroll';

import InputErrorMessage from 'components/InputErrorMessage';

interface InputEntryProperties {
  id: string;
  label: string;
  errors: object;
  isDisabled: boolean;
  register: UseFormRegisterReturn;
  children: ReactNode
}

function InputEntry({id, errors, label, register, isDisabled = false, children}: InputEntryProperties): JSX.Element {
  
  return (
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
                className={`border w-full ${errors[id] ? 'border-errorColor border-2': ""} disabled:bg-disabledColor`}
                {...register(id)}
                disabled={isDisabled}
              />
              {errors[id] ? <p className="text-base text-errorColor">
                <InputErrorMessage>{errors[id].message}</InputErrorMessage>
              </p> : null}
            </Element>
          </div>
  )
}

export default InputEntry;