import type {
  FormattedUserProfileObjectType,
  InstitutionDetailsApiCheckedType,
  InstitutionDetailsApiType,
  ValidationSchema,
} from 'pages/ProfileForm/types';

export const formatUserProfileObject = (
  userProfileObject: ValidationSchema,
): FormattedUserProfileObjectType => ({
  first_name: userProfileObject.firstName,
  last_name: userProfileObject.lastName,
  leis: userProfileObject.financialInstitutions.map(object => object.lei),
});

export const formatDataCheckedState = (
  fiDataInput: InstitutionDetailsApiType[] = [],
): InstitutionDetailsApiCheckedType[] =>
  fiDataInput.map(object => ({ ...object, checked: false }));

export default {
  formatUserProfileObject,
  formatDataCheckedState,
};
