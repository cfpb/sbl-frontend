import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type InputProperties = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Input = forwardRef<HTMLInputElement, InputProperties>(
  ({ ...properties }, reference): JSX.Element => {
    return <input ref={reference} {...properties} />;
  },
);

export default Input;
