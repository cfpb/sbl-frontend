import { Five, One } from 'utils/constants';
import { z } from 'zod';

export enum FormFieldsHeaderError {
  firstName = 'Enter your first name',
  lastName = 'Enter your last name',
  email = 'Invalid email address',
  financialInstitutions = ' Select the institution for which you are authorized to file',
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

// Used in Axios Responses
export const institutionDetailsApiTypeSchema = z.object({
  lei: z.string(),
  is_active: z.boolean(),
  name: z.string(),
  tax_id: z.string(),
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
  approved: z.boolean(),
});

export type DomainType = z.infer<typeof domainSchema>;
export type InstitutionDetailsApiType = z.infer<
  typeof institutionDetailsApiTypeSchema
>;

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
  name: z.string().trim().min(One, {
    message: "You must enter the financial institution's name.",
  }),
  lei: z.string().trim().min(One, {
    message: "You must enter the financial institution's lei.",
  }),
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
}
