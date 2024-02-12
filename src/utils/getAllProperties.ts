/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */

// Modified for use with Zod Form Errors

type CommonObject = Record<string, any>;

const badKeys: CommonObject = {
  message: true,
  ref: true,
  type: true,
};

export function getAllProperties(
  input: CommonObject,
  delimiter = '-',
): CommonObject {
  const answer: string[] = [];

  function recurse(object: any, string_: string): void {
    if (object == null) return; // ignores 'null' or 'undefined'

    for (const key in object) {
      if (badKeys[key]) {
        answer.push(string_);
        return;
      }
      // works for array or object
      const nextString = `${string_}${string_ ? delimiter : ''}${key}`;
      recurse(object[key], nextString);
    }
  }
  recurse(input, '');
  return answer;
}

export default getAllProperties;
