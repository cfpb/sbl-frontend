import type { SblAuthProperties } from 'api/useSblAuth';
import { z } from 'zod';

export type FilingPeriodType = string;

export interface SblAuthConsumer {
  auth: SblAuthProperties;
}

export enum FilingStatusAsNumber {
  SUBMISSION_STARTED = 0,
  SUBMISSION_UPLOADED = 1,
  VALIDATION_IN_PROGRESS = 2,
  VALIDATION_WITH_ERRORS = 3,
  VALIDATION_WITH_WARNINGS = 4,
  VALIDATION_SUCCESSFUL = 5,
  SUBMISSION_ACCEPTED = 6,
}
export enum FilingStatusString {
  SUBMISSION_STARTED = 'SUBMISSION_STARTED',
  SUBMISSION_UPLOADED = 'SUBMISSION_UPLOADED',
  VALIDATION_IN_PROGRESS = 'VALIDATION_IN_PROGRESS',
  VALIDATION_WITH_ERRORS = 'VALIDATION_WITH_ERRORS',
  VALIDATION_WITH_WARNINGS = 'VALIDATION_WITH_WARNINGS',
  VALIDATION_SUCCESSFUL = 'VALIDATION_SUCCESSFUL',
  SUBMISSION_ACCEPTED = 'SUBMISSION_ACCEPTED',
}

export const FilingSchema = z.object({
  id: z.number(),
  filing_period: z.string(),
  lei: z.string(),
  institution_snapshot_id: z.string(),
  contact_info: z.union([
    z.object({
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
    z.null(),
  ]),
  confirmation_id: z.union([z.string(), z.null()]),
  status: z.nativeEnum(FilingStatusAsNumber),
});

export type FilingType = z.infer<typeof FilingSchema>;

export const SubmissionSchema = z.object({
  id: z.number(),
  submitter: z.string(),
  state: z.string(),
  validation_ruleset_version: z.string(),
  submission_time: z.string(),
  filename: z.string(),
  accepter: z.union([z.string(), z.null()]),
});

export type SubmissionType = z.infer<typeof SubmissionSchema>;
