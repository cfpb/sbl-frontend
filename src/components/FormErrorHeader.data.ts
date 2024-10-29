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
    'Select a type of financial institution',
  [UpdateTOIZodSchemaErrors.OtherMin]:
    'Enter a type of financial institution for “Other”',
} as const;
export type UpdateTOIFormHeaderErrorsValues =
  (typeof UpdateTOIFormHeaderErrors)[UpdateTOIZodSchemaErrorsValues];

// CompleteYourUserProfile (No Associations) - Zod Schema Error Messages
export const CupNFZodSchemaErrors = {
  firstNameMin: 'You must enter your first name.',
  firstNameRegex: 'Your first name must not contain invalid characters',
  lastNameMin: 'You must enter your last name.',
  lastNameRegex: 'Your last name must not contain invalid characters',
  emailMin: 'You must enter your email address.',
  emailRegex: 'You must have a valid email address in the correct format.',
  financialInstitutionsMin:
    'You must enter in at least one financial institution.',
  financialInstitutionNameMin:
    'You must enter your financial institution name.',
  financialInstitutionLeiMin: 'You must enter an LEI.',
  financialInstitutionLeiRegex: 'You must enter a valid LEI.',
} as const;

export type CupNFZodSchemaErrorsType = typeof CupNFZodSchemaErrors;
export type CupNFZodSchemaErrorsKeys = keyof typeof CupNFZodSchemaErrors;
export type CupNFZodSchemaErrorsValues =
  (typeof CupNFZodSchemaErrors)[CupNFZodSchemaErrorsKeys];

// CompleteYourUserProfile (No Associations)  - Form Header Error Messages
export type CupNFFormHeaderErrorsType = Record<
  CupNFZodSchemaErrorsValues,
  string
>;
export const CupNFFormHeaderErrors: CupNFFormHeaderErrorsType = {
  [CupNFZodSchemaErrors.firstNameMin]: 'Enter your first name',
  [CupNFZodSchemaErrors.firstNameRegex]:
    'Enter valid characters for your first name',
  [CupNFZodSchemaErrors.lastNameMin]: 'Enter your last name',
  [CupNFZodSchemaErrors.lastNameRegex]:
    'Enter valid characters for your last name',
  [CupNFZodSchemaErrors.emailMin]: 'Enter your email address',
  [CupNFZodSchemaErrors.emailRegex]:
    'The email address must be in the proper format',
  [CupNFZodSchemaErrors.financialInstitutionsMin]:
    'Enter in at least one financial institution',
  [CupNFZodSchemaErrors.financialInstitutionNameMin]:
    'Enter your financial institution name',
  [CupNFZodSchemaErrors.financialInstitutionLeiMin]:
    'Enter an LEI for your financial institution',
  [CupNFZodSchemaErrors.financialInstitutionLeiRegex]:
    'Enter a valid LEI for your financial institution ',
} as const;
export type CupNFFormHeaderErrorsValues =
  (typeof CupNFFormHeaderErrors)[CupNFZodSchemaErrorsValues];

// CompleteYourUserProfile - Zod Schema Error Messages
export const CupZodSchemaErrors = {
  firstNameMin: CupNFZodSchemaErrors.firstNameMin,
  firstNameRegex: CupNFZodSchemaErrors.firstNameRegex,
  lastNameMin: CupNFZodSchemaErrors.lastNameMin,
  lastNameRegex: CupNFZodSchemaErrors.lastNameRegex,
  emailMin: CupNFZodSchemaErrors.emailMin,
  emailRegex: CupNFZodSchemaErrors.emailRegex,
  financialInstitutionsMin: CupNFZodSchemaErrors.financialInstitutionsMin,
} as const;

export type CupZodSchemaErrorsType = typeof CupZodSchemaErrors;
export type CupZodSchemaErrorsKeys = keyof typeof CupZodSchemaErrors;
export type CupZodSchemaErrorsValues =
  (typeof CupZodSchemaErrors)[CupZodSchemaErrorsKeys];

// CompleteYourUserProfile - Form Header Error Messages
export type CupFormHeaderErrorsType = Record<CupZodSchemaErrorsValues, string>;
export const CupFormHeaderErrors: CupFormHeaderErrorsType = {
  [CupZodSchemaErrors.firstNameMin]:
    CupNFFormHeaderErrors[CupZodSchemaErrors.firstNameMin],
  [CupZodSchemaErrors.firstNameRegex]:
    CupNFFormHeaderErrors[CupZodSchemaErrors.firstNameRegex],
  [CupZodSchemaErrors.lastNameMin]:
    CupNFFormHeaderErrors[CupZodSchemaErrors.lastNameMin],
  [CupZodSchemaErrors.lastNameRegex]:
    CupNFFormHeaderErrors[CupZodSchemaErrors.lastNameRegex],
  [CupZodSchemaErrors.emailMin]:
    CupNFFormHeaderErrors[CupZodSchemaErrors.emailMin],
  [CupZodSchemaErrors.emailRegex]:
    CupNFFormHeaderErrors[CupZodSchemaErrors.emailRegex],
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
  rssd_idNumber: 'You must enter a valid RSSD ID.',
  rssd_idRegex: 'You must enter a valid RSSD ID.',
  parent_rssd_idNumber: 'You must enter a valid parent RSSD ID.',
  parent_rssd_idRegex: 'You must enter a valid parent RSSD ID.',
  top_holder_rssd_idNumber: 'You must enter a valid top holder RSSD ID.',
  top_holder_rssd_idRegex: 'You must enter a valid top holder RSSD ID.',
  taxIdSchemaRegex: 'You must enter a valid TIN.',
  OtherMin,
  financialInstitutionParentLeiRegex: 'You must enter a valid parent LEI.',
  financialInstitutionTopHolderLeiRegex:
    'You must enter a valid top holder LEI.',
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
  [IdZodSchemaErrors.parent_rssd_idNumber]:
    'Enter a valid RSSD ID for your immediate parent entity',
  [IdZodSchemaErrors.parent_rssd_idRegex]:
    'Enter a valid RSSD ID for your immediate parent entity',
  [IdZodSchemaErrors.top_holder_rssd_idNumber]:
    'Enter a valid RSSD ID for your top-holding parent entity',
  [IdZodSchemaErrors.top_holder_rssd_idRegex]:
    'Enter a valid RSSD ID for your top-holding parent entity',
  [IdZodSchemaErrors.taxIdSchemaRegex]: 'Enter a valid TIN',
  [IdZodSchemaErrors.OtherMin]:
    'Enter a type of financial institution for “Other”',
  [IdZodSchemaErrors.financialInstitutionParentLeiRegex]:
    'Enter a valid LEI for your immediate parent entity',
  [IdZodSchemaErrors.financialInstitutionTopHolderLeiRegex]:
    'Enter a valid LEI for your top-holding parent entity',
} as const;
export type IdFormHeaderErrorsValues =
  (typeof IdFormHeaderErrors)[IdZodSchemaErrorsValues];

// Voluntary Reporter Status - Zod Schema Error Messages
export const VrsZodSchemaErrors = {
  isVoluntaryMin: 'You must indicate your voluntary reporter status.',
} as const;

export type VrsZodSchemaErrorsType = typeof VrsZodSchemaErrors;
export type VrsZodSchemaErrorsKeys = keyof typeof VrsZodSchemaErrors;
export type VrsZodSchemaErrorsValues =
  (typeof VrsZodSchemaErrors)[VrsZodSchemaErrorsKeys];

// Point of Contact - Form Header Error Messages
export type VrsFormHeaderErrorsType = Record<VrsZodSchemaErrorsValues, string>;
export const VrsFormHeaderErrors: VrsFormHeaderErrorsType = {
  [VrsZodSchemaErrors.isVoluntaryMin]:
    'Indicate your voluntary reporter status',
} as const;
export type VrsFormHeaderErrorsValues =
  (typeof VrsFormHeaderErrors)[VrsZodSchemaErrorsValues];

// Point of Contact - Zod Schema Error Messages
export const PocZodSchemaErrors = {
  firstNameMin:
    'You must enter the first name of the point of contact for your filing.',
  firstNameRegex: 'The first name must not contain invalid characters',
  lastNameMin:
    'You must enter the last name of the point of contact for your filing.',
  lastNameRegex: 'The last name must not contain invalid characters',
  phoneMin:
    'You must enter the phone number of the point of contact for your filing.',
  phoneRegex: 'You must enter a valid phone number.',
  phoneExtension: 'You must enter a valid phone extension.',
  emailMin:
    'You must enter the email address of the point of contact for your filing.',
  emailRegex: 'You must enter a valid email address.',
  hq_address_street_1Min:
    'You must enter the street address of the point of contact for your filing.',
  hq_address_cityMin:
    'You must enter the city of the point of contact for your filing.',
  hq_address_stateMin:
    'You must select the state or territory of the point of contact for your filing.',
  hq_address_zipMin:
    'You must enter the ZIP code of the point of contact for your filing.',
  hq_address_zipRegex: 'You must enter a valid ZIP code.',
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
  [PocZodSchemaErrors.firstNameRegex]:
    'The first name must not contain invalid characters',
  [PocZodSchemaErrors.lastNameMin]:
    'Enter the last name of the point of contact',
  [PocZodSchemaErrors.lastNameRegex]:
    'The last name must not contain invalid characters',
  [PocZodSchemaErrors.phoneMin]:
    'Enter the phone number of the point of contact',
  [PocZodSchemaErrors.phoneRegex]: 'Enter a valid phone number',
  [PocZodSchemaErrors.phoneExtension]: 'Enter a valid phone extension',
  [PocZodSchemaErrors.emailMin]:
    'Enter the email address of the point of contact',
  [PocZodSchemaErrors.emailRegex]: 'Enter a valid email address',
  [PocZodSchemaErrors.hq_address_street_1Min]:
    'Enter the street address of the point of contact',
  [PocZodSchemaErrors.hq_address_cityMin]:
    'Enter the city of the point of contact',
  [PocZodSchemaErrors.hq_address_stateMin]:
    'Select the state or territory of the point of contact',
  [PocZodSchemaErrors.hq_address_zipMin]:
    'Enter the ZIP code of the point of contact',
  [PocZodSchemaErrors.hq_address_zipRegex]: 'Enter a valid ZIP code',
} as const;
export type PocFormHeaderErrorsValues =
  (typeof PocFormHeaderErrors)[PocZodSchemaErrorsValues];
