import type { FieldErrors, FieldValues } from 'react-hook-form';

export const formErrorsOrder = <T extends FieldValues>(
  fErrors: FieldErrors<T>,
): FieldErrors<T> => {
  const temporaryFormErrors = { ...fErrors };
  const orderedFormErrorsObject = {};

  const order = [
    'rssd_id',
    'tax_id',
    'sbl_institution_types_other',
    'parent_lei',
    'parent_rssd_id',
    'top_holder_lei',
    'top_holder_rssd_id',
  ];
  for (const key of order) {
    if (Object.hasOwn(temporaryFormErrors, key)) {
      orderedFormErrorsObject[key] = temporaryFormErrors[key];
      delete temporaryFormErrors[key];
    }
  }

  return { ...orderedFormErrorsObject, ...temporaryFormErrors };
};

export default formErrorsOrder;
