import type { FieldErrors, FieldValues } from 'react-hook-form';

export const formErrorsOrder = <T extends FieldValues>(
  fErrors: FieldErrors<T>,
  order: string[],
): FieldErrors<T> => {
  const temporaryFormErrors = { ...fErrors };
  const orderedFormErrorsObject = {};

  for (const key of order) {
    if (Object.hasOwn(temporaryFormErrors, key)) {
      orderedFormErrorsObject[key] = temporaryFormErrors[key];
      delete temporaryFormErrors[key];
    }
  }

  return { ...orderedFormErrorsObject, ...temporaryFormErrors };
};

export default formErrorsOrder;
