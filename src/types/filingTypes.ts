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

export enum FileSubmissionState {
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
}
export type FileSubmissionStateType = keyof typeof FileSubmissionState | null;

// Taken from https://github.com/cfpb/sbl-filing-api/blob/main/src/sbl_filing_api/entities/models/dto.py
export interface SubmissionResponse {
  id: number;
  state: FileSubmissionState | null;
  validation_ruleset_version: string | null;
  validation_results: ValidationResult | null;
  submission_time: Date | null;
  filename: string;
  submitter: UserActionDTO;
  accepter: UserActionDTO | null;
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

export interface ValidationResult {
  syntax_errors: ValidationErrorWarning;
  logic_errors: ValidationErrorWarning;
  logic_warnings: ValidationErrorWarning;
}

export interface ValidationErrorWarning {
  count: number;
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
  scope: 'multi-field' | 'single-field';
  fig_link: URL;
}
