import {
  CupNFZodSchemaErrors,
  CupZodSchemaErrors,
  IdZodSchemaErrors,
  PocZodSchemaErrors,
  SignSubmitZodSchemaErrors,
} from 'components/FormErrorHeader.data';
import {
  Five,
  One,
  inputCharLimit,
  phoneExtensionNumberLimit,
} from 'utils/constants';
import { z } from 'zod';

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
    message: IdZodSchemaErrors.taxIdSchemaRegex,
  });

// Used in most forms
export const institutionDetailsApiTypeSchema = z.object({
  lei: z
    .string()
    .trim()
    .min(One, {
      message: IdZodSchemaErrors.financialInstitutionLeiMin,
    })
    .regex(/([\dA-Z]{20})/, {
      message: IdZodSchemaErrors.financialInstitutionLeiRegex,
    }),
  is_active: z.boolean(),
  name: z.string().trim(),
  tax_id: taxIdSchema,
  rssd_id: z
    .union([
      z.number({
        invalid_type_error: IdZodSchemaErrors.rssd_idNumber,
      }),
      z.string().regex(/^\d+$|^$/, { message: IdZodSchemaErrors.rssd_idRegex }),
    ])
    .optional(),
  primary_federal_regulator: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
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
  parent_lei: z
    .string()
    .trim()
    .regex(/([\dA-Z]{20})/, {
      message: IdZodSchemaErrors.financialInstitutionParentLeiRegex,
    })
    .nullable()
    .or(z.literal('')),
  parent_legal_name: z.string().nullable(),
  parent_rssd_id: z
    .union([
      z.number({
        invalid_type_error: IdZodSchemaErrors.parent_rssd_idNumber,
      }),
      z
        .string()
        .regex(/^\d+$|^$/, { message: IdZodSchemaErrors.parent_rssd_idRegex }),
    ])
    .optional(),
  top_holder_lei: z
    .string()
    .trim()
    .regex(/([\dA-Z]{20})/, {
      message: IdZodSchemaErrors.financialInstitutionTopHolderLeiRegex,
    })
    .nullable()
    .or(z.literal('')),
  top_holder_legal_name: z.string().nullable(),
  top_holder_rssd_id: z
    .union([
      z.number({
        invalid_type_error: IdZodSchemaErrors.top_holder_rssd_idNumber,
      }),
      z.string().regex(/^\d+$|^$/, {
        message: IdZodSchemaErrors.top_holder_rssd_idRegex,
      }),
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

// The pattern excludes characters such as <, >, &, ", $, %, !, #, ?, §, ;, *, ~, \, |, ^, =, [, ], {, }, and ().
// and ASCII control characters from 0 to 31

// Source: https://github.com/mposolda/keycloak/blob/5b6edc99ef274fa1868fea63569a819f13371fc3/services/src/main/java/org/keycloak/userprofile/validator/PersonNameProhibitedCharactersValidator.java#L42

const invalidCharactersControlCharactersPattern =
  // eslint-disable-next-line no-control-regex
  /^[^<>&"\\\v$%!#?§;*~/\\|^=\\[\]{}()\u0000-\u001F\u007F]+$/u;

export const basicInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(One, {
      message: CupZodSchemaErrors.firstNameMin,
    })
    .max(inputCharLimit, {
      message: 'The firstname must be 255 characters or less',
    })
    .regex(invalidCharactersControlCharactersPattern, {
      message: CupZodSchemaErrors.firstNameRegex,
    }),
  lastName: z
    .string()
    .trim()
    .min(One, {
      message: CupZodSchemaErrors.lastNameMin,
    })
    .max(inputCharLimit, {
      message: 'The lastname must be 255 characters or less',
    })
    .regex(invalidCharactersControlCharactersPattern, {
      message: CupZodSchemaErrors.lastNameRegex,
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
  firstName: z
    .string()
    .trim()
    .min(One, {
      message: CupNFZodSchemaErrors.firstNameMin,
    })
    .max(inputCharLimit, {
      message: 'The firstname must be 255 characters or less',
    })
    .regex(invalidCharactersControlCharactersPattern, {
      message: CupNFZodSchemaErrors.firstNameRegex,
    }),
  lastName: z
    .string()
    .trim()
    .min(One, {
      message: CupNFZodSchemaErrors.lastNameMin,
    })
    .max(inputCharLimit, {
      message: 'The lastname must be 255 characters or less',
    })
    .regex(invalidCharactersControlCharactersPattern, {
      message: CupNFZodSchemaErrors.lastNameRegex,
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

// Point of Contact
export const pointOfContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(One, {
      message: PocZodSchemaErrors.firstNameMin,
    })
    .max(inputCharLimit, {
      message: 'The firstname must be 255 characters or less',
    })
    .regex(invalidCharactersControlCharactersPattern, {
      message: PocZodSchemaErrors.firstNameRegex,
    }),
  lastName: z
    .string()
    .trim()
    .min(One, {
      message: PocZodSchemaErrors.lastNameMin,
    })
    .max(inputCharLimit, {
      message: 'The lastname must be 255 characters or less',
    })
    .regex(invalidCharactersControlCharactersPattern, {
      message: PocZodSchemaErrors.lastNameRegex,
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
  phoneExtension: z
    .string()
    .max(phoneExtensionNumberLimit, {
      message: PocZodSchemaErrors.phoneExtension,
    })
    .regex(/^\d+$/, {
      message: PocZodSchemaErrors.phoneExtension,
    })
    .optional(),
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
  phone_ext: 'phoneExtension',
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
  'firstName' | 'lastName' | 'phone' | 'phoneExtension'
> & {
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_ext: string | undefined;
};

// Sign and Submit - Checkboxes Schema
export const signSubmitSchema = z.object({
  signSubmitCheckboxes: z.object({
    institution: z.boolean().refine(value => value, {
      message: SignSubmitZodSchemaErrors.institution,
    }),
    identifying: z.boolean().refine(value => value, {
      message: SignSubmitZodSchemaErrors.identifying,
    }),
    affiliate: z.boolean().refine(value => value, {
      message: SignSubmitZodSchemaErrors.affiliate,
    }),
    poc: z.boolean().refine(value => value, {
      message: SignSubmitZodSchemaErrors.poc,
    }),
    file: z.boolean().refine(value => value, {
      message: SignSubmitZodSchemaErrors.file,
    }),
    voluntary: z.boolean().refine(value => value, {
      message: SignSubmitZodSchemaErrors.voluntary,
    }),
    certify: z.boolean().refine(value => value, {
      message: SignSubmitZodSchemaErrors.certify,
    }),
  }),
});

export type SignSubmitSchema = z.infer<typeof pointOfContactSchema>;

// export
// export type PocZodSchemaErrorsType = typeof PocZodSchemaErrors;
// export type PocZodSchemaErrorsKeys = keyof typeof PocZodSchemaErrors;
// export type PocZodSchemaErrorsValues =
//   (typeof PocZodSchemaErrors)[PocZodSchemaErrorsKeys];
