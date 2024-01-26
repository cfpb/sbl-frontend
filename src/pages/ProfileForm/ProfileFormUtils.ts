import type {
  InstitutionDetailsApiType,
  InstitutionDetailsApiCheckedType,
  ValidationSchema,
  FormattedUserProfileObjectType,
} from 'pages/ProfileForm/types';

export const formatUserProfileObject = (
  userProfileObject: ValidationSchema,
): FormattedUserProfileObjectType => ({
  first_name: userProfileObject.firstName,
  last_name: userProfileObject.lastName,
  leis: userProfileObject.financialInstitutions.map(object => object.lei),
});

// Set Checkbox of associated financial institutions to `false`/unchecked
export const formatDataCheckedState = (
  fiDataInput: InstitutionDetailsApiType[] = [],
): InstitutionDetailsApiCheckedType[] =>
  fiDataInput.map(object => ({ ...object, checked: false }));

export default {
  formatUserProfileObject,
  formatDataCheckedState,
};
