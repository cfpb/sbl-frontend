/* eslint-disable @typescript-eslint/no-magic-numbers */
import { scroller } from 'react-scroll';

import type {
  FormattedPointOfContactSchema,
  FormattedUserProfileObjectType,
  InstitutionDetailsApiCheckedType,
  InstitutionDetailsApiType,
  PointOfContactSchema,
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

export const formatPointOfContactObject = (
  userProfileObject: PointOfContactSchema,
): FormattedPointOfContactSchema => {
  const formattedObject: FormattedPointOfContactSchema = {
    //  NOTE: 'id' is not necessary
    first_name: userProfileObject.firstName,
    last_name: userProfileObject.lastName,
    phone_number: userProfileObject.phone,
    email: userProfileObject.email,
    hq_address_street_1: userProfileObject.hq_address_street_1,
    hq_address_street_2: userProfileObject.hq_address_street_2,
    hq_address_street_3: userProfileObject.hq_address_street_3,
    hq_address_street_4: userProfileObject.hq_address_street_4,
    hq_address_city: userProfileObject.hq_address_city,
    hq_address_state: userProfileObject.hq_address_state,
    hq_address_zip: userProfileObject.hq_address_zip,
  };

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
