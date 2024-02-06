import { z } from 'zod';

export const checkboxOptions = [
  'Bank or savings association',
  'Minority depository institution',
];

// eslint-disable-next-line unicorn/no-array-reduce
const checkboxOptionsZod = checkboxOptions.reduce((accumulator, option) => {
  return { ...accumulator, [option]: z.boolean() };
}, {});

export const ufpSchema = z.object({
  tin: z.string().trim().min(1, {
    message: 'You must enter your TIN.',
  }),
  checkboxes: z.object(checkboxOptionsZod),
});

export type UFPSchema = z.infer<typeof ufpSchema>;
