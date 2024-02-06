import { z } from 'zod';

export interface CheckboxOptions {
  id: string;
  label: string;
}

export const checkboxOptions: CheckboxOptions[] = [
  {
    id: 'bankSavings',
    label: 'Bank or savings association',
  },
  {
    id: 'minorityDepository',
    label: 'Minority depository institution',
  },
];

// eslint-disable-next-line unicorn/no-array-reduce
const checkboxOptionsZod = checkboxOptions.reduce((accumulator, option) => {
  return { ...accumulator, [option.id]: z.boolean() };
}, {});

export const ufpSchema = z.object({
  tin: z.string().trim().min(1, {
    message: 'You must enter your TIN.',
  }),
  checkboxes: z.object(checkboxOptionsZod),
});

export type UFPSchema = z.infer<typeof ufpSchema>;
