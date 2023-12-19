import type { InputHTMLAttributes } from 'react';

export function FileInput(
  arguments_: InputHTMLAttributes<HTMLInputElement>,
): JSX.Element {
  return <input {...arguments_} type='file' />;
}

export default FileInput;
