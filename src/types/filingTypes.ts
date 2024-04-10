import type { SblAuthProperties } from 'api/useSblAuth';
import { z } from 'zod';

export type FilingPeriodType = string;

export interface SblAuthConsumer {
  auth: SblAuthProperties;
}

// TODO: Upon filing creation, certain fields are 'null' first before being assigned data
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

// Expected Submission response
export interface SubmissionResponse {
  id: number;
  submitter: string;
  state: string;
  validation_ruleset_version: string;
  validation_json: ValidationJson;
  submission_time: string;
  filename: string;
  accepter: string | null;
}

export interface ValidationJson {
  record_no: RecordNo;
  field_name: FieldName;
  field_value: FieldValue;
  validation_severity: ValidationSeverity;
  validation_id: ValidationId;
  validation_name: ValidationName;
  validation_desc: ValidationDesc;
}

export type RecordNo = Record<string, string>;
export type FieldName = Record<string, string>;
export type FieldValue = Record<string, string>;
export type ValidationSeverity = Record<string, string>;
export type ValidationId = Record<string, string>;
export type ValidationName = Record<string, string>;
export type ValidationDesc = Record<string, string>;

export interface UserProfileType {
  name: string;
  username: string;
  email: string;
  id: string;
  institutions: string[];
}
