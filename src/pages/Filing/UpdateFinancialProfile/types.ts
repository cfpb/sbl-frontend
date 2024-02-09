import { z } from 'zod';

export interface CheckboxOption {
  id: string;
  label: string;
}

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
  return { ...accumulator, [option.id]: z.boolean() };
}, {});

export const minimumCharacters = 1;

export const ufpSchema = z.object({
  tax_id: z.string().trim().min(minimumCharacters, {
    message: 'You must enter your TIN.',
  }),
  checkboxes: z.object(checkboxOptionsZod),
});

// export type UFPSchema = z.infer<typeof ufpSchema>;

interface ExpectedObject {
  checkboxes: Record<string, boolean>;
  tax_id: string;
}

export type UFPSchema = ExpectedObject;
