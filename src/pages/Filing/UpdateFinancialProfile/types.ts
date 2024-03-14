import { z } from 'zod';

export interface CheckboxOption {
  id: string;
  label: string;
}

// TODO: Send checkboxes values as {'1': true }?
// {id: 1, label: "Bank or savings association"},
// {id: 2, label: "Minority depository institution"},
// {id: 3, label: "Credit union"},
// {id: 4, label: "Nondepository institution"},
// {id: 5, label: "Community development financial institution (CDFI)"},
// {id: 6, label: "Other nonprofit financial institution"},
// {id: 7, label: "Farm Credit System institution"},
// {id: 8, label: "Government lender"},
// {id: 9, label: "Commercial finance company"},
// {id: 10, label: "Equipment finance company"},
// {id: 11, label: "Industrial loan company"},
// {id: 12, label: "Online lender"},
// {id: 13, label: "Other"},

export const sblInstitutionTypeMap: Record<string, string> = {
  '1': 'bankSavings',
  '2': 'minorityDepository',
  '3': 'creditUnion',
  '4': 'nonDepository',
  '5': 'communityDevelopment',
  '6': 'otherNonprofit',
  '7': 'farmCredit',
  '8': 'governmentLender',
  '9': 'commercialFinance',
  '10': 'equipmentFinance',
  '11': 'industrialLoan',
  '12': 'onlineLender',
  '13': 'other',
  bankSavings: '1',
  minorityDepository: '2',
  creditUnion: '3',
  nonDepository: '4',
  communityDevelopment: '5',
  otherNonprofit: '6',
  farmCredit: '7',
  governmentLender: '8',
  commercialFinance: '9',
  equipmentFinance: '10',
  industrialLoan: '11',
  onlineLender: '12',
  other: '13',
};

export const checkboxOptions: CheckboxOption[] = [
  {
    id: 'bankSavings',
    label: 'Bank or savings association',
  },
  {
    id: 'minorityDepository',
    label: 'Minority depository institution',
  },
  {
    id: 'creditUnion',
    label: 'Credit union',
  },
  {
    id: 'nonDepository',
    label: 'Nondepository institution',
  },
  {
    id: 'communityDevelopment',
    label: 'Community development financial institution (CDFI)',
  },
  {
    id: 'otherNonprofit',
    label: 'Other nonprofit financial institution',
  },
  {
    id: 'farmCredit',
    label: 'Farm Credit System institution',
  },
  {
    id: 'governmentLender',
    label: 'Government lender',
  },
  {
    id: 'commercialFinance',
    label: 'Commercial finance company',
  },
  {
    id: 'equipmentFinance',
    label: 'Equipment finance company',
  },
  {
    id: 'industrialLoan',
    label: 'Industrial loan company',
  },
  {
    id: 'onlineLender',
    label: 'Online lender',
  },
  {
    id: 'other',
    label: 'Other',
  },
];

// eslint-disable-next-line unicorn/no-array-reduce
const checkboxOptionsZod = checkboxOptions.reduce((accumulator, option) => {
  return { ...accumulator, [option.id]: z.boolean().optional() };
}, {});

export const minimumCharacters = 1;

export const ufpSchema = z.object({
  tax_id: z.string().trim().min(minimumCharacters, {
    message: 'You must enter your TIN.',
  }),
  sbl_institution_types: z.object(checkboxOptionsZod),
});

// export type UFPSchema = z.infer<typeof ufpSchema>;

interface ExpectedObject {
  sbl_institution_types?: Record<string, boolean>;
  tax_id?: string;
  hq_address_street_1?: string;
  hq_address_street_2?: string;
  hq_address_city?: string;
  hq_address_state_code?: string;
  hq_address_zip?: string;
  parent_lei?: string;
  parent_legal_name?: string;
  parent_rssd_id?: string;
  top_holder_lei?: string;
  top_holder_legal_name?: string;
  top_holder_rssd_id?: string;
  lei?: string;
  name?: string;
  is_active?: boolean | string;
  rssd_id?: string;
  primary_federal_regulator_id?: string;
  hmda_institution_type_id?: string;
  hq_address_state?: string;
  primary_federal_regulator?: string;
  additional_details?: string;
  domains?: string;
}

export type UFPSchema = ExpectedObject;
