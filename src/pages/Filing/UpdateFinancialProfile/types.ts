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
  sbl_institution_types: Record<string, boolean>;
  tax_id: string;
}

export type UFPSchema = ExpectedObject;
