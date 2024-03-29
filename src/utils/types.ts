import type { SblAuthProperties } from 'api/useSblAuth';
import { z } from 'zod';

export type FilingPeriodType = string;

export interface SblAuthConsumer {
  auth: SblAuthProperties;
}

export const FilingSchema = z.object({
  id: z.number(),
  filing_period: z.string(),
  lei: z.string(),
  tasks: z
    .object({
      id: z.number(),
      task: z.object({
        name: z.string(),
        task_order: z.number(),
      }),
      user: z.string(),
      state: z.string(),
      change_timestamp: z.string(),
    })
    .array(),
  institution_snapshot_id: z.string(),
  contact_info: z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    hq_address_street_1: z.string(),
    hq_address_street_2: z.string(),
    hq_address_city: z.string(),
    hq_address_state: z.string(),
    hq_address_zip: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  confirmation_id: z.string(),
});

export type FilingType = z.infer<typeof FilingSchema>;
