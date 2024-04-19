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

export enum FilingStatusAsString {
  SUBMISSION_STARTED = 'SUBMISSION_STARTED',
  SUBMISSION_UPLOADED = 'SUBMISSION_UPLOADED',
  VALIDATION_IN_PROGRESS = 'VALIDATION_IN_PROGRESS',
  VALIDATION_WITH_ERRORS = 'VALIDATION_WITH_ERRORS',
  VALIDATION_WITH_WARNINGS = 'VALIDATION_WITH_WARNINGS',
  VALIDATION_SUCCESSFUL = 'VALIDATION_SUCCESSFUL',
  SUBMISSION_ACCEPTED = 'SUBMISSION_ACCEPTED',
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

// Expected response after uploading
export interface UploadResponse {
  id: number;
  submitter: string;
  state: string;
  validation_ruleset_version: string | null;
  validation_json: object | null;
  submission_time: string;
  filename: string;
  accepter: string | null;
}

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
