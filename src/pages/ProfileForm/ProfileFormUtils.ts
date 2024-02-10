/* eslint-disable @typescript-eslint/no-magic-numbers */
import { scroller } from 'react-scroll';

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

// Set Checkbox of associated financial institutions to `false`/unchecked
export const formatDataCheckedState = (
  fiDataInput: InstitutionDetailsApiType[] = [],
): InstitutionDetailsApiCheckedType[] =>
  fiDataInput.map(object => ({ ...object, checked: false }));

export default {
  formatUserProfileObject,
  formatDataCheckedState,
};

// Used for smooth scrolling to the FormErrorHeader upon error
export const scrollToErrorForm = (name = 'FormErrorHeader'): void => {
  scroller.scrollTo(name, {
    duration: 375,
    smooth: true,
    offset: -25, // Scrolls to element 25 pixels above the element
  });
};
