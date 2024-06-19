import type { FieldErrors, FieldValues } from 'react-hook-form';

export const formErrorsOrder = <T extends FieldValues>(
  fErrors: FieldErrors<T>,
  order: string[],
): FieldErrors<T> => {
  const temporaryFormErrors = { ...fErrors };
  const orderedFormErrorsObject = {};

  for (const key of order) {
    if (Object.hasOwn(temporaryFormErrors, key)) {
      // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      orderedFormErrorsObject[key] = temporaryFormErrors[key];
      // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete temporaryFormErrors[key];
    }
  }

  return { ...orderedFormErrorsObject, ...temporaryFormErrors };
};

export default formErrorsOrder;
