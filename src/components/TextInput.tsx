import React, { forwardRef } from 'react';

import { TextInput as DSRTextInput } from 'design-system-react';
import type { TextInputProperties } from 'design-system-react/dist/components/TextInput/TextInput';

export const TextInput = forwardRef<HTMLInputElement, TextInputProperties>(
  (
    {
      id,
      name,
      type = 'text',
      maxLength,
      ...properties
    },
    reference,
  ) => {
    const [_maxLength, _setMaxLength] = React.useState<number | undefined>(undefined);
    React.useEffect(() => {
      if (maxLength && maxLength > 0) {
        _setMaxLength(maxLength);
        return;
      }
      let newMaxLength = maxLength;
      switch(type) {
        case 'url':
          newMaxLength = 2048;
          break;
        case 'tel':
          newMaxLength = 12
          break;
        case 'email':
          newMaxLength = 320;
          break;
        case 'number':
        case 'password':
        case 'search':
        case 'text':
        default: 
          newMaxLength = 255;
          break;
      }
      _setMaxLength(newMaxLength);
    }, [type, maxLength]);

    return (
      <DSRTextInput
        id={id}
        name={name}
        type={type}
        maxLength={_maxLength}
        {...properties}
        ref={reference}
      />
    );
  },
);

export default TextInput;
