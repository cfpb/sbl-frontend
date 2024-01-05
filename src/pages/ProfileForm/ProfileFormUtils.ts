import type { ValidationSchema, FormattedUserProfileObjectType } from './types';

export const formatUserProfileObject = (
  userProfileObject: ValidationSchema,
): FormattedUserProfileObjectType => ({
  first_name: userProfileObject.firstName,
  last_name: userProfileObject.lastName,
  leis: userProfileObject.financialInstitutions.map(object => object.lei),
});
