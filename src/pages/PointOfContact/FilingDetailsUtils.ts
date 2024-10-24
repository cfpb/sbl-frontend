import type {
  FilingDetailsSchema,
  FormattedPointOfContactSchema,
  FormattedVoluntaryReporterStatusSchema,
} from 'types/formTypes';

export const formatPointOfContactObject = (
  filingDetailsObject: FilingDetailsSchema,
): FormattedPointOfContactSchema => {
  const formattedObject: FormattedPointOfContactSchema = {
    //  NOTE: 'id' is not necessary
    first_name: filingDetailsObject.firstName,
    last_name: filingDetailsObject.lastName,
    phone_number: filingDetailsObject.phone,
    phone_ext: filingDetailsObject.phoneExtension,
    email: filingDetailsObject.email,
    hq_address_street_1: filingDetailsObject.hq_address_street_1,
    hq_address_street_2: filingDetailsObject.hq_address_street_2,
    hq_address_street_3: filingDetailsObject.hq_address_street_3,
    hq_address_street_4: filingDetailsObject.hq_address_street_4,
    hq_address_city: filingDetailsObject.hq_address_city,
    hq_address_state: filingDetailsObject.hq_address_state,
    hq_address_zip: filingDetailsObject.hq_address_zip,
  };

  return formattedObject;
};

export const formatVoluntaryReporterStatusObject = (
  filingDetailsObject: FilingDetailsSchema,
): FormattedVoluntaryReporterStatusSchema => {
  const formattedObject: FormattedVoluntaryReporterStatusSchema = {
    is_voluntary: filingDetailsObject.isVoluntary,
  };

  return formattedObject;
};
