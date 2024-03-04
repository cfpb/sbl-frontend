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
  lei: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  tax_id: z.string().optional(),
  rssd_id: z.number().optional(),
  primary_federal_regulator: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  hmda_institution_type_id: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  sbl_institution_types: z
    .union([
      z.string(),
      z.object({
        sbl_type: z.object({
          id: z.string(),
          name: z.string(),
        }),
        details: z.string().optional(),
      }),
    ])
    .array()
    .optional(),
  hq_address_street_1: z.string().optional(),
  hq_address_street_2: z.string().optional(),
  hq_address_city: z.string().optional(),
  // Do we still need hq_address_state_code in addition to this hq_address_state object? See:
  // TODO: Ask Le about why this type name ends with a period, see:
  // https://github.com/cfpb/sbl-frontend/issues/137
  hq_address_state: z
    .object({
      code: z.string(),
      name: z.string(),
    })
    .optional(),
  hq_address_state_code: z.string().optional(),
  hq_address_zip: z.string().optional(),
  parent_lei: z.string().optional(),
  parent_legal_name: z.string().optional(),
  parent_rssd_id: z.number().optional(),
  top_holder_lei: z.string().optional(),
  top_holder_legal_name: z.string().optional(),
  top_holder_rssd_id: z.number().optional(),
  domains: z.array(domainSchema).optional(),
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
