import { z } from 'zod';

export const ufpSchema = z.object({
  tin: z.string().trim().min(1, {
    message: 'You must enter your tin.',
  }),
  checkboxes: z.object({
    option1: z.boolean(),
    option2: z.boolean(),
  }),
});

export type UFPSchema = z.infer<typeof ufpSchema>;
