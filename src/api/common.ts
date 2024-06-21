import {
  FETCH_TIMEOUT_SECONDS_STANDARD,
  LONGPOLLING_STANDARD_DELAY,
} from 'utils/constants';

export const BASE_URL = `${
  import.meta.env.SBL_REGTECH_BASE_URL || 'http://localhost:8881'
}`;

export const FILING_URL = `${
  import.meta.env.SBL_FILING_BASE_URL || 'http://localhost:8882'
}`;

export const MAIL_BASE_URL = `${
  import.meta.env.SBL_MAIL_BASE_URL || 'http://localhost:8765'
}`;

export const LOGOUT_REDIRECT_URL = `${
  import.meta.env.SBL_LOGOUT_REDIRECT_URL || window.location.origin
}`;

export const VALIDATION_TIMEOUT_SECONDS = Number.isNaN(
  Number(import.meta.env.SBL_VALIDATION_TIMEOUT_SECONDS),
)
  ? FETCH_TIMEOUT_SECONDS_STANDARD
  : Number(import.meta.env.SBL_VALIDATION_TIMEOUT_SECONDS);

export const LONGPOLLING_DELAY_SECONDS = Number.isNaN(
  Number(import.meta.env.SBL_LONGPOLLING_DELAY_SECONDS),
)
  ? LONGPOLLING_STANDARD_DELAY
  : Number(import.meta.env.SBL_LONGPOLLING_DELAY_SECONDS);

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const caseTypes = {
  UpdateFinancialProfile: 'Update your financial institution profile',
  CompleteUserProfile: 'Complete your user profile',
} as const;

export type CaseType = (typeof caseTypes)[keyof typeof caseTypes];
