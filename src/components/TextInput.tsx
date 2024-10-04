import React, { forwardRef } from 'react';

import { TextInput as DSRTextInput } from 'design-system-react';
import type { TextInputProperties } from 'design-system-react/dist/components/TextInput/TextInput';
import {
  DefaultInputCharLimit,
  EmailInputCharLimit,
  PhoneInputCharLimit,
  UrlInputCharLimit,
} from 'utils/constants';

export const TextInput = forwardRef<HTMLInputElement, TextInputProperties>(
  ({ id, name, type = 'text', maxLength, ...properties }, reference) => {
    const innerMaxLength = React.useMemo(() => {
      if (maxLength && maxLength > 0) {
        return maxLength;
      }
      switch (type) {
        case 'url': {
          return UrlInputCharLimit;
        }
        case 'tel': {
          return PhoneInputCharLimit;
        }
        case 'email': {
          return EmailInputCharLimit;
        }
        case 'number':
        case 'password':
        case 'search':
        case 'text': {
          return DefaultInputCharLimit;
        }
        default: {
          return DefaultInputCharLimit;
        }
      }
    }, [type, maxLength]);

    return (
      <DSRTextInput
        id={id}
        name={name}
        type={type}
        maxLength={innerMaxLength}
        {...properties}
        ref={reference}
      />
    );
  },
);

export default TextInput;
