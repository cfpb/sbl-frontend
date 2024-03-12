import { Five, One } from 'utils/constants';
import { z } from 'zod';

export enum FormFieldsHeaderError {
  firstName = 'Enter your first name',
  lastName = 'Enter your last name',
  email = 'Invalid email address',
  financialInstitutions = 'Select the institution for which you are authorized to file',
  tin = 'Enter your Federal Taxpayer Identification Number (TIN)',
  name = "Enter your financial institution's name",
  lei = "Enter your financial institution's Legal Entity Identifier (LEI)",
}

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

// Used in most forms
export const institutionDetailsApiTypeSchema = z.object({
  lei: z
    .string()
    .trim()
    .regex(/([\dA-Za-z]{20})/, {
      message:
        'Must be 20 characters and only contain a-z, A-Z, and 0-9 (no special characters)',
    }),
  is_active: z.boolean(),
  name: z.string().trim().min(One, {
    message: "You must enter the financial institution's name.",
  }),
  tax_id: z
    .string()
    .trim()
    .regex(/^(\d{2}-\d{7})/, {
      message: 'Must be 2 digits, followed by a dash, followed by 7 digits.',
    }),
  rssd_id: z.number(),
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
  hq_address_street_2: z.string(),
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
  parent_rssd_id: z.number(),
  top_holder_lei: z.string(),
  top_holder_legal_name: z.string(),
  top_holder_rssd_id: z.number(),
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

// Used in both CompleteYourUserProfile and CompleteYourUserProfile(no associated institution) forms
export const basicInfoSchema = z.object({
  firstName: z.string().trim().min(One, {
    message:
      'You must enter your first name to complete your user profile and access the platform.',
  }),
  lastName: z.string().trim().min(One, {
    message:
      'You must enter your last name to complete your user profile and access the platform.',
  }),
  email: z
    .string()
    .trim()
    .min(Five as number, { message: 'You must have a valid email address' })
    .email({
      message: 'You must have a valid email address and in the correct format.',
    }),
});

export type BasicInfoSchema = z.infer<typeof basicInfoSchema>;

export const validationSchema = basicInfoSchema.extend({
  financialInstitutions: z
    .array(mvpFormPartialInstitutionDetailsApiTypeSchema)
    .min(One, {
      message:
        'You must select a financial institution to complete your profile and access the platform.',
    })
    .optional(),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

// Used in Complete Your User Profile - No associated Financial Institutions - CreateProfileForm
export const baseInstitutionDetailsSFSchema = z.object({
  name: institutionDetailsApiTypeSchema.shape.name,
  lei: institutionDetailsApiTypeSchema.shape.lei,
});

export const validationSchemaCPF = basicInfoSchema.extend({
  financialInstitutions: z.array(baseInstitutionDetailsSFSchema).min(One, {
    message:
      'You must select a financial institution to complete your profile and access the platform.',
  }),
});

export type ValidationSchemaCPF = z.infer<typeof validationSchemaCPF>;

// Used in Profile Submission
export interface FormattedUserProfileObjectType {
  first_name: ValidationSchema['firstName'];
  last_name: ValidationSchema['lastName'];
  leis?: InstitutionDetailsApiType['lei'][];
  hq_address_zip?: string;
}

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

// Point of Contact

export const pointOfContactSchema = basicInfoSchema.extend({
  phone: z.string().trim().regex(usPhoneNumberRegex, {
    message: "Must in '999-999-9999' format",
  }),
  hq_address_street_1: z.string().trim(),
  hq_address_street_2: z.string().trim().optional(),
  hq_address_city: z.string().trim(),
  hq_address_state: z.string().trim(),
  hq_address_zip: z.string().trim().length(Five, {
    message: 'The ZIP code must be 5 numbers exactly.',
  }),
});

export type PointOfContactSchema = z.infer<typeof pointOfContactSchema>;
