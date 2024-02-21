// Modified for use with Zod Form Errors

import { formDelimiter } from 'utils/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CommonObject = Record<string, any>;

// react-hook-form properties that can be ignored
const badKeys: CommonObject = {
  message: true,
  ref: true,
  type: true,
};

export function getAllProperties(
  input: CommonObject,
  delimiter = formDelimiter,
): CommonObject {
  const answer: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function recurse(object: any, string_: string): void {
    if (object == null) return; // ignores 'null' or 'undefined'

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in object) {
      if (badKeys[key]) {
        answer.push(string_);
        return;
      }
      // works for array or object
      const nextString = `${string_}${string_ ? delimiter : ''}${key}`;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      recurse(object[key], nextString);
    }
  }
  recurse(input, '');
  return answer;
}

export default getAllProperties;
