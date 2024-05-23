// Constants used between error objects
export const OtherMin =
  'You must enter a type of financial institution when “Other” is selected.';

// Types of Financial Institutions - Zod Schema Error Messages
export const UpdateTOIZodSchemaErrors = {
  financialInstitutionMin: 'You must select a type of financial institution.',
  OtherMin,
} as const;

export type UpdateTOIZodSchemaErrorsType = typeof UpdateTOIZodSchemaErrors;
export type UpdateTOIZodSchemaErrorsKeys =
  keyof typeof UpdateTOIZodSchemaErrors;
export type UpdateTOIZodSchemaErrorsValues =
  (typeof UpdateTOIZodSchemaErrors)[UpdateTOIZodSchemaErrorsKeys];

// CompleteYourUserProfile - Form Header Error Messages
export type UpdateTOIFormHeaderErrorsType = Record<
  UpdateTOIZodSchemaErrorsValues,
  string
>;
export const UpdateTOIFormHeaderErrors: UpdateTOIFormHeaderErrorsType = {
  [UpdateTOIZodSchemaErrors.financialInstitutionMin]:
    'Select your type of financial institution',
  [UpdateTOIZodSchemaErrors.OtherMin]:
    'Enter a type of financial institution for “Other”',
} as const;
export type UpdateTOIFormHeaderErrorsValues =
  (typeof UpdateTOIFormHeaderErrors)[UpdateTOIZodSchemaErrorsValues];

// CompleteYourUserProfile (No Associations) - Zod Schema Error Messages
export const CupNFZodSchemaErrors = {
  firstNameMin: 'You must enter your first name.',
  lastNameMin: 'You must enter your last name.',
  emailMin: 'You must enter your email address.',
  emailRegex: 'You must have a valid email address in the correct format.',
  financialInstitutionsMin:
    'You must enter in at least one financial institution.',
  financialInstitutionNameMin:
    'You must enter the name of your financial institution.',
  financialInstitutionLeiMin:
    'You must enter a LEI for your financial institution.',
  financialInstitutionLeiRegex:
    'LEI must be 20 characters and only contain A-Z and 0-9 (no special characters)',
} as const;

export type CupNFZodSchemaErrorsType = typeof CupNFZodSchemaErrors;
export type CupNFZodSchemaErrorsKeys = keyof typeof CupNFZodSchemaErrors;
export type CupNFZodSchemaErrorsValues =
  (typeof CupNFZodSchemaErrors)[CupNFZodSchemaErrorsKeys];

// CompleteYourUserProfile - Form Header Error Messages
export type CupNFFormHeaderErrorsType = Record<
  CupNFZodSchemaErrorsValues,
  string
>;
export const CupNFFormHeaderErrors: CupNFFormHeaderErrorsType = {
  [CupNFZodSchemaErrors.firstNameMin]: 'Enter your first name',
  [CupNFZodSchemaErrors.lastNameMin]: 'Enter your last name',
  [CupNFZodSchemaErrors.emailMin]: 'Enter your email address',
  [CupNFZodSchemaErrors.emailRegex]:
    'The email address must be in the proper format',
  [CupNFZodSchemaErrors.financialInstitutionsMin]:
    'You must select a financial institution to complete your user profile.',
  [CupNFZodSchemaErrors.financialInstitutionNameMin]:
    'Enter the name of your financial institution',
  [CupNFZodSchemaErrors.financialInstitutionLeiMin]:
    'Enter a LEI for your financial institution',
  [CupNFZodSchemaErrors.financialInstitutionLeiRegex]: 'Enter a valid LEI',
} as const;
export type CupNFFormHeaderErrorsValues =
  (typeof CupNFFormHeaderErrors)[CupNFZodSchemaErrorsValues];

// CompleteYourUserProfile - Zod Schema Error Messages
export const CupZodSchemaErrors = {
  firstNameMin: 'You must enter your first name to complete your user profile.',
  lastNameMin: 'You must enter your last name to complete your user profile.',
  emailMin: 'You must enter your email address to complete your user profile.',
  emailRegex: 'You must have a valid email address in the correct format.',
  financialInstitutionsMin:
    'You must select a financial institution to complete your user profile.',
} as const;

export type CupZodSchemaErrorsType = typeof CupZodSchemaErrors;
export type CupZodSchemaErrorsKeys = keyof typeof CupZodSchemaErrors;
export type CupZodSchemaErrorsValues =
  (typeof CupZodSchemaErrors)[CupZodSchemaErrorsKeys];

// CompleteYourUserProfile - Form Header Error Messages
export type CupFormHeaderErrorsType = Record<CupZodSchemaErrorsValues, string>;
export const CupFormHeaderErrors: CupFormHeaderErrorsType = {
  [CupZodSchemaErrors.firstNameMin]: 'Enter your first name',
  [CupZodSchemaErrors.lastNameMin]: 'Enter your last name',
  [CupZodSchemaErrors.emailMin]: 'Enter your email address',
  [CupZodSchemaErrors.emailRegex]:
    'The email address must be in the proper format',
  [CupZodSchemaErrors.financialInstitutionsMin]:
    'Select your financial institution',
} as const;
export type CupFormHeaderErrorsValues =
  (typeof CupFormHeaderErrors)[CupZodSchemaErrorsValues];

// Institution Details - Zod Schema Error Messages
export const IdZodSchemaErrors = {
  financialInstitutionLeiMin: CupNFZodSchemaErrors.financialInstitutionLeiMin,
  financialInstitutionLeiRegex:
    CupNFZodSchemaErrors.financialInstitutionLeiRegex,
  financialInstitutionNameMin: CupNFZodSchemaErrors.financialInstitutionNameMin,
  rssd_idNumber: 'RSSD ID must be a number',
  rssd_idRegex: 'RSSD ID must be a number',
  parent_rssd_idNumber: 'Parent RSSD ID must be a number',
  parent_rssd_idRegex: 'Parent RSSD ID must be a number',
  top_holder_rssd_idNumber: 'Top holder RSSD ID must be a number',
  top_holder_rssd_idRegex: 'Top holder RSSD ID must be a number',
  taxIdSchemaRegex:
    'Tax ID must be 2 digits, followed by a dash, followed by 7 digits.',
  OtherMin,
  financialInstitutionParentLeiRegex:
    'Parent LEI must be 20 characters and only contain A-Z and 0-9 (no special characters)',
  financialInstitutionTopHolderLeiRegex:
    'Top holder LEI must be 20 characters and only contain A-Z and 0-9 (no special characters)',
} as const;

export type IdZodSchemaErrorsType = typeof IdZodSchemaErrors;
export type IdZodSchemaErrorsKeys = keyof typeof IdZodSchemaErrors;
export type IdZodSchemaErrorsValues =
  (typeof IdZodSchemaErrors)[IdZodSchemaErrorsKeys];

// Institution Details - Form Header Error Messages
export type IdFormHeaderErrorsType = Record<
  IdZodSchemaErrorsValues,
  CupNFFormHeaderErrorsValues
>;
export const IdFormHeaderErrors: IdFormHeaderErrorsType = {
  [IdZodSchemaErrors.financialInstitutionLeiMin]:
    CupNFFormHeaderErrors[IdZodSchemaErrors.financialInstitutionLeiMin],
  [IdZodSchemaErrors.financialInstitutionLeiRegex]:
    CupNFFormHeaderErrors[IdZodSchemaErrors.financialInstitutionLeiRegex],
  [IdZodSchemaErrors.financialInstitutionNameMin]:
    CupNFFormHeaderErrors[IdZodSchemaErrors.financialInstitutionNameMin],
  [IdZodSchemaErrors.rssd_idNumber]: 'Enter a valid RSSD ID',
  [IdZodSchemaErrors.rssd_idRegex]: 'Enter a valid RSSD ID',
  [IdZodSchemaErrors.parent_rssd_idNumber]: 'Enter a valid parent RSSD ID',
  [IdZodSchemaErrors.parent_rssd_idRegex]: 'Enter a valid parent RSSD ID',
  [IdZodSchemaErrors.top_holder_rssd_idNumber]:
    'Enter a valid top holder RSSD ID',
  [IdZodSchemaErrors.top_holder_rssd_idRegex]:
    'Enter a valid top holder RSSD ID',
  [IdZodSchemaErrors.taxIdSchemaRegex]: 'Enter a valid TIN',
  [IdZodSchemaErrors.OtherMin]:
    'Enter a type of financial institution for “Other”',
  [IdZodSchemaErrors.financialInstitutionParentLeiRegex]:
    'Enter a valid parent LEI',
  [IdZodSchemaErrors.financialInstitutionParentLeiRegex]:
    'Enter a valid parent LEI',
  [IdZodSchemaErrors.financialInstitutionTopHolderLeiRegex]:
    'Enter a valid top holder LEI',
} as const;
export type IdFormHeaderErrorsValues =
  (typeof IdFormHeaderErrors)[IdZodSchemaErrorsValues];

// Point of Contact - Zod Schema Error Messages
export const PocZodSchemaErrors = {
  firstNameMin:
    'You must enter the first name of the point of contact for your submission.',
  lastNameMin:
    'You must enter the last name of the point of contact for your submission.',
  phoneMin:
    'You must enter the phone number of the point of contact for your submission.',
  phoneRegex: 'Phone number must be in 555-555-5555 format.',
  emailMin:
    'You must enter the email address of the point of contact for your submission.',
  emailRegex: 'Email address must be in a valid format.',
  hq_address_street_1Min:
    'You must enter the street address of the point of contact for your submission.',
  hq_address_cityMin:
    'You must enter the city of the point of contact for your submission.',
  hq_address_stateMin:
    'You must enter the state or territory of the point of contact for your submission.',
  hq_address_zipMin:
    'You must enter the ZIP code of the point of contact for your submission.',
  hq_address_zipRegex: 'ZIP code must be in 55555 or 55555-5555 format.',
} as const;

export type PocZodSchemaErrorsType = typeof PocZodSchemaErrors;
export type PocZodSchemaErrorsKeys = keyof typeof PocZodSchemaErrors;
export type PocZodSchemaErrorsValues =
  (typeof PocZodSchemaErrors)[PocZodSchemaErrorsKeys];

// Point of Contact - Form Header Error Messages
export type PocFormHeaderErrorsType = Record<PocZodSchemaErrorsValues, string>;
export const PocFormHeaderErrors: PocFormHeaderErrorsType = {
  [PocZodSchemaErrors.firstNameMin]:
    'Enter the first name of the point of contact',
  [PocZodSchemaErrors.lastNameMin]:
    'Enter the last name of the point of contact',
  [PocZodSchemaErrors.phoneMin]:
    'Enter the phone number of the point of contact',
  [PocZodSchemaErrors.phoneRegex]:
    'Phone number must be in 555-555-5555 format',
  [PocZodSchemaErrors.emailMin]:
    'Enter the email address of the point of contact',
  [PocZodSchemaErrors.emailRegex]: 'Email address must be in a valid format',
  [PocZodSchemaErrors.hq_address_street_1Min]:
    'Enter the street address of the point of contact',
  [PocZodSchemaErrors.hq_address_cityMin]:
    'Enter the city of the point of contact',
  [PocZodSchemaErrors.hq_address_stateMin]:
    'Enter the state or territory of the point of contact',
  [PocZodSchemaErrors.hq_address_zipMin]:
    'Enter the ZIP code of the point of contact',
  [PocZodSchemaErrors.hq_address_zipRegex]:
    'ZIP code must be in 55555 or 55555-5555 format',
} as const;
export type PocFormHeaderErrorsValues =
  (typeof PocFormHeaderErrors)[PocZodSchemaErrorsValues];
