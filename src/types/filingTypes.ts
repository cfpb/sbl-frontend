import type { SblAuthProperties } from 'api/useSblAuth';
import { z } from 'zod';

export interface UserProfileType {
  name: string;
  username: string;
  email: string;
  id: string;
  institutions: string[];
}

export type FilingPeriodType = string;

export interface SblAuthConsumer {
  auth: SblAuthProperties;
}

export const FilingStatusAsNumber = {
  SUBMISSION_STARTED: 0,
  SUBMISSION_UPLOAD_MALFORMED: 0, // i.e. wrong number of columns
  UPLOAD_FAILED: 0,
  VALIDATION_ERROR: 0, // i.e. Couldn't process on backend (picture instead of CSV)
  VALIDATION_EXPIRED: 0, // i.e. Took too long to upload
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  SUBMISSION_UPLOADED: 1,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  VALIDATION_IN_PROGRESS: 2,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  VALIDATION_WITH_ERRORS: 3,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  VALIDATION_WITH_WARNINGS: 4,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  VALIDATION_SUCCESSFUL: 5,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  SUBMISSION_ACCEPTED: 6,
};

export enum FilingStatusAsString {
  START_A_FILING = 'START_A_FILING',
  TYPES_OF_INSTITUTION = 'TYPES_OF_INSTITUTION',
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
  is_voluntary: z.boolean(),
  contact_info: z.union([
    z.object({
      id: z.number(),
      first_name: z.string(),
      last_name: z.string(),
      hq_address_street_1: z.string(),
      hq_address_street_2: z.string(),
      hq_address_street_3: z.string(),
      hq_address_street_4: z.string(),
      hq_address_city: z.string(),
      hq_address_state: z.string(),
      hq_address_zip: z.string(),
      email: z.string(),
      phone_number: z.string(),
      phone_ext: z.string(),
    }),
    z.null(),
  ]),
  confirmation_id: z.union([z.string(), z.null()]),
  status: z.nativeEnum(FilingStatusAsNumber),
});

export type FilingType = z.infer<typeof FilingSchema>;

// TODO: Update Validation type
// https://github.com/cfpb/sbl-filing-api/wiki/Submission-JSON
export enum FileSubmissionState {
  START_A_FILING = 'START_A_FILING',
  TYPES_OF_INSTITUTION = 'TYPES_OF_INSTITUTION',
  SUBMISSION_STARTED = 'SUBMISSION_STARTED',
  VALIDATION_SUCCESSFUL = 'VALIDATION_SUCCESSFUL',
  VALIDATION_WITH_WARNINGS = 'VALIDATION_WITH_WARNINGS',
  VALIDATION_WITH_ERRORS = 'VALIDATION_WITH_ERRORS',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  VALIDATION_IN_PROGRESS = 'VALIDATION_IN_PROGRESS',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  VALIDATION_EXPIRED = 'VALIDATION_EXPIRED',
  SUBMISSION_UPLOADED = 'SUBMISSION_UPLOADED',
  SUBMISSION_UPLOAD_MALFORMED = 'SUBMISSION_UPLOAD_MALFORMED',
  SUBMISSION_ACCEPTED = 'SUBMISSION_ACCEPTED',
}
export type FileSubmissionStateType = keyof typeof FileSubmissionState | null;

// Taken from https://github.com/cfpb/sbl-filing-api/blob/main/src/sbl_filing_api/entities/models/dto.py
export interface SubmissionResponse {
  id: number;
  counter: number;
  state: FileSubmissionState | null;
  validation_ruleset_version: string | null;
  validation_results: ValidationResults | null;
  submission_time: Date | null;
  filename: string;
  submitter: UserActionDTO;
  accepter: UserActionDTO | null;
  total_records: number;
}

export interface UserActionDTO {
  id: number | null;
  user_id: string;
  user_name: string;
  user_email: string;
  timestamp: Date;
  action_type: UserActionType;
}

export enum UserAction {
  SUBMIT,
  ACCEPT,
  SIGN,
}
export type UserActionType = keyof typeof UserAction;

export interface ValidationResults {
  syntax_errors: ValidationErrorWarning;
  logic_errors: ValidationErrorWarning;
  logic_warnings: ValidationErrorWarning;
}

export interface ValidationErrorWarning {
  single_field_count: number;
  multi_field_count: number;
  register_count: number;
  total_count: number;
  details: Detail[];
}

export interface Detail {
  validation: Validation;
  records: Record[];
}

export interface Record {
  record_no: number;
  uid: string;
  fields: Field[];
}

export interface Field {
  name: string;
  value: string;
}

export interface Validation {
  id: string;
  name: string;
  description: string;
  severity: 'Error' | 'Warning';
  scope: 'multi-field' | 'register' | 'single-field';
  fig_link: string;
  is_truncated: boolean;
}
export interface FilingPeriodSchema {
  code: FilingPeriodType;
  description: string;
  start_period: Date;
  end_period: Date;
  due: Date;
  filing_type: 'ANNUAL' | 'QUARTERLY';
}

export type FilingPeriodsType = FilingPeriodSchema[];

// Address States
export interface StateFetchedType {
  code: string;
  name: string;
}
