import { Five, One } from 'utils/constants';
import { z } from 'zod';

// export enum FormFieldsHeaderError {
//   firstName = 'Enter your first name',
//   lastName = 'Enter your last name',
//   email = 'Invalid email address',
//   financialInstitutions = 'Select the institution for which you are authorized to file',
//   tin = 'Enter your Federal Taxpayer Identification Number (TIN)',
//   name = "Enter your financial institution's name",
//   lei = "Enter your financial institution's Legal Entity Identifier (LEI)",
// }

// Used in react-select format (potentially can be removed)
const financialInstitutionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type FinancialInstitutionRS = z.infer<
  typeof financialInstitutionsSchema
>;

// Used in Axios Responses
export const domainSchema = z.object({
  domain: z.string(),
  lei: z.string(),
});

export const taxIdSchema = z
  .string()
  .trim()
  .regex(/^(\d{2}-\d{7})$/, {
    message:
      'Tax ID must be 2 digits, followed by a dash, followed by 7 digits.',
  });

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

// Used in most forms
export const institutionDetailsApiTypeSchema = z.object({
  lei: z
    .string()
    .trim()
    .min(One, {
      message: CupNFZodSchemaErrors.financialInstitutionLeiMin,
    })
    .regex(/([\dA-Z]{20})/, {
      message: CupNFZodSchemaErrors.financialInstitutionLeiRegex,
    }),
  is_active: z.boolean(),
  name: z.string().trim().min(One, {
    message: CupNFZodSchemaErrors.financialInstitutionNameMin,
  }),
  tax_id: taxIdSchema,
  rssd_id: z
    .union([
      z.number({
        invalid_type_error: 'RSSD ID must be a number',
      }),
      z.string().regex(/^\d+$|^$/, { message: 'RSSD ID must be a number' }),
    ])
    .optional(),
  primary_federal_regulator: z.object({
    id: z.string(),
    name: z.string(),
  }),
  hmda_institution_type_id: z.object({
    id: z.string(),
    name: z.string(),
  }),
  sbl_institution_types: z
    .object({
      sbl_type: z.object({
        id: z.string(),
        name: z.string(),
      }),
      details: z.string(),
    })
    .array(),
  hq_address_street_1: z.string(),
  hq_address_street_2: z.union([z.string(), z.null()]).optional(),
  hq_address_street_3: z.union([z.string(), z.null()]).optional(),
  hq_address_street_4: z.union([z.string(), z.null()]).optional(),
  hq_address_city: z.string(),
  // Do we still need hq_address_state_code in addition to this hq_address_state object? See:
  // TODO: Ask Le about why this type name ends with a period, see:
  // https://github.com/cfpb/sbl-frontend/issues/137
  hq_address_state: z.object({
    code: z.string(),
    name: z.string(),
  }),
  hq_address_state_code: z.string(),
  hq_address_zip: z.string(),
  parent_lei: z.string(),
  parent_legal_name: z.string(),
  parent_rssd_id: z
    .union([
      z.number({
        invalid_type_error: 'Parent RSSD ID must be a number',
      }),
      z
        .string()
        .regex(/^\d+$|^$/, { message: 'Parent RSSD ID must be a number' }),
    ])
    .optional(),
  top_holder_lei: z.string(),
  top_holder_legal_name: z.string(),
  top_holder_rssd_id: z
    .union([
      z.number({
        invalid_type_error: 'Top Holder RSSD ID must be a number',
      }),
      z
        .string()
        .regex(/^\d+$|^$/, { message: 'Top Holder RSSD ID must be a number' }),
    ])
    .optional(),
  domains: z.array(domainSchema),
});

export type DomainType = z.infer<typeof domainSchema>;

// Used in Axios Requests
export type InstitutionDetailsApiType = z.infer<
  typeof institutionDetailsApiTypeSchema
>;

// Get Associated -- has extra 'approved' field
export const institutionDetailsApiTypeExtraSchema = z.object({
  approved: z.boolean(),
});

export const getAssociatedApiSchema = institutionDetailsApiTypeSchema.merge(
  institutionDetailsApiTypeExtraSchema,
);

// Get Associated - Axios Request
export type GetAssociatedApiType = z.infer<typeof getAssociatedApiSchema>;

// TODO: add additional institution object validation post-pvp see:
// https://github.com/cfpb/sbl-frontend/issues/106
const mvpFormPartialInstitutionDetailsApiTypeSchema =
  institutionDetailsApiTypeSchema.pick({
    lei: true,
  });

export interface CheckedState {
  checked: boolean;
}

export type InstitutionDetailsApiCheckedType = CheckedState &
  InstitutionDetailsApiType;

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

export const basicInfoSchema = z.object({
  firstName: z.string().trim().min(One, {
    message: CupZodSchemaErrors.firstNameMin,
  }),
  lastName: z.string().trim().min(One, {
    message: CupZodSchemaErrors.lastNameMin,
  }),
  email: z
    .string()
    .trim()
    .min(Five as number, { message: CupZodSchemaErrors.emailMin })
    .email({
      message: CupZodSchemaErrors.emailRegex,
    }),
});

export type BasicInfoSchema = z.infer<typeof basicInfoSchema>;

export const validationSchema = basicInfoSchema.extend({
  financialInstitutions: z
    .array(mvpFormPartialInstitutionDetailsApiTypeSchema)
    .min(One, {
      message: CupZodSchemaErrors.financialInstitutionsMin,
    })
    .optional(),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

// Used in Complete Your User Profile - No associated Financial Institutions - CreateProfileForm
export const baseInstitutionDetailsSFSchema = z.object({
  name: institutionDetailsApiTypeSchema.shape.name,
  lei: institutionDetailsApiTypeSchema.shape.lei,
});

export const validationSchemaCPF = z.object({
  firstName: z.string().trim().min(One, {
    message: CupNFZodSchemaErrors.firstNameMin,
  }),
  lastName: z.string().trim().min(One, {
    message: CupNFZodSchemaErrors.lastNameMin,
  }),
  email: z
    .string()
    .trim()
    .min(Five as number, { message: CupNFZodSchemaErrors.emailMin })
    .email({
      message: CupNFZodSchemaErrors.emailRegex,
    }),
  financialInstitutions: z.array(baseInstitutionDetailsSFSchema).min(One, {
    message: CupNFZodSchemaErrors.financialInstitutionsMin,
  }),
  additional_details: z.string().trim().optional(),
});

export type ValidationSchemaCPF = z.infer<typeof validationSchemaCPF>;

// Used in Profile Submission
export interface FormattedUserProfileObjectType {
  first_name: ValidationSchema['firstName'];
  last_name: ValidationSchema['lastName'];
  leis?: InstitutionDetailsApiType['lei'][];
}

// NOTE: Placeholder for possible future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const internationalPhoneNumberRegex =
  // eslint-disable-next-line unicorn/no-unsafe-regex
  /\+(9[679]\d|8[0357-9]\d|6[7-9]\d|5[09]\d|42\d|3[578]\d|2[1-689]\d|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[07]|7|1)(?:\W*\d){8}\W*(\d{1,2})$/;

/* International Phone Number - Matches the following regex patterns */
// +1-234-567-8901
// +61-234-567-89-01
// +46-234 5678901
// +1 (234) 56 89 901
// +1 (234) 56-89 901
// +46.234.567.8901
// +1/234/567/8901

// "Must in '+(999)-999-9999' format",

// eslint-disable-next-line unicorn/no-unsafe-regex
const usPhoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

/* US Phone Number - Matches the following regex patterns */
// 123-456-7890
// (123) 456-7890
// 123 456 7890
// 123.456.7890
// +91 (123) 456-7890

// Regular ZIP code regex
// eslint-disable-next-line unicorn/no-unsafe-regex, @typescript-eslint/no-unused-vars
const zipCodeRegex = /^\d{5}(?:[\s-]\d{4})?$/;

// No ALL Zeroes ZIP code regex
// eslint-disable-next-line unicorn/no-unsafe-regex
const noZeroesZipCodeRegex = /^(?!0{5})\d{5}(?:[\s-](?!0{4})\d{4})?$/;

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

// Point of Contact
export const pointOfContactSchema = z.object({
  firstName: z.string().trim().min(One, {
    message: PocZodSchemaErrors.firstNameMin,
  }),
  lastName: z.string().trim().min(One, {
    message: PocZodSchemaErrors.lastNameMin,
  }),
  phone: z
    .string()
    .trim()
    .min(One, {
      message: PocZodSchemaErrors.phoneMin,
    })
    .regex(usPhoneNumberRegex, {
      message: PocZodSchemaErrors.phoneRegex,
    }),
  email: z
    .string()
    .trim()
    .min(Five as number, {
      message: PocZodSchemaErrors.emailMin,
    })
    .email({
      message: PocZodSchemaErrors.emailRegex,
    }),
  hq_address_street_1: z.string().trim().min(One, {
    message: PocZodSchemaErrors.hq_address_street_1Min,
  }),
  hq_address_street_2: z.string().trim().optional(),
  hq_address_street_3: z.string().trim().optional(),
  hq_address_street_4: z.string().trim().optional(),
  hq_address_city: z.string().trim().min(One, {
    message: PocZodSchemaErrors.hq_address_cityMin,
  }),
  hq_address_state: z.string().trim().min(One, {
    message: PocZodSchemaErrors.hq_address_stateMin,
  }),
  hq_address_zip: z
    .string()
    .trim()
    .min(One, {
      message: PocZodSchemaErrors.hq_address_zipMin,
    })
    .regex(noZeroesZipCodeRegex, {
      message: PocZodSchemaErrors.hq_address_zipRegex,
    }),
});

export type PointOfContactSchema = z.infer<typeof pointOfContactSchema>;

export const ContactInfoMap = {
  first_name: 'firstName',
  last_name: 'lastName',
  phone_number: 'phone',
  email: 'email',
  hq_address_street_1: 'hq_address_street_1',
  hq_address_street_2: 'hq_address_street_2',
  hq_address_street_3: 'hq_address_street_3',
  hq_address_street_4: 'hq_address_street_4',
  hq_address_city: 'hq_address_city',
  hq_address_state: 'hq_address_state',
  hq_address_zip: 'hq_address_zip',
} as const;

export type ContactInfoMapType = typeof ContactInfoMap;
export type ContactInfoKeys = keyof typeof ContactInfoMap;
export type ContactInfoValues = (typeof ContactInfoMap)[ContactInfoKeys];

export type FormattedPointOfContactSchema = Omit<
  PointOfContactSchema,
  'firstName' | 'lastName' | 'phone'
> & {
  first_name: string;
  last_name: string;
  phone_number: string;
};
