/* eslint-disable @typescript-eslint/no-magic-numbers */
import { scroller } from 'react-scroll';

import type {
  FormattedUserProfileObjectType,
  InstitutionDetailsApiCheckedType,
  InstitutionDetailsApiType,
  ValidationSchema,
} from 'types/formTypes';

export const formatUserProfileObject = (
  userProfileObject: ValidationSchema,
  includeLeis: boolean,
): FormattedUserProfileObjectType => {
  const formattedObject: FormattedUserProfileObjectType = {
    first_name: userProfileObject.firstName,
    last_name: userProfileObject.lastName,
  };

  if (includeLeis) {
    formattedObject.leis = (userProfileObject.financialInstitutions ?? []).map(
      object => object.lei,
    );
  }

  return formattedObject;
};

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
export const scrollToElement = (name = 'FormErrorHeader'): void => {
  scroller.scrollTo(name, {
    duration: 375,
    smooth: true,
    offset: -25, // Scrolls to element with additional top space
  });
};

export const emptyAddFinancialInstitution = {
  name: '',
  lei: '',
};
