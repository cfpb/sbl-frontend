import {
  FETCH_TIMEOUT_SECONDS_STANDARD,
  FILE_SIZE_LIMIT_50MB,
  LONGPOLLING_STANDARD_DELAY,
} from 'utils/constants';

// eslint-disable-next-line unicorn/prevent-abbreviations
export const convertEnvVarNumber = (
  environmentVariable: string,
  defaultValue: number,
): number =>
  Number.isNaN(Number(environmentVariable))
    ? defaultValue
    : Number(environmentVariable);

export const BASE_URL = `${
  import.meta.env.SBL_REGTECH_BASE_URL || 'http://localhost:8881'
}`;

export const FILING_URL = `${
  import.meta.env.SBL_FILING_BASE_URL || 'http://localhost:8882'
}`;

export const MAIL_BASE_URL = `${
  import.meta.env.SBL_MAIL_BASE_URL || 'http://localhost:8765/public/case'
}`;

export const LOGOUT_REDIRECT_URL = `${
  import.meta.env.SBL_LOGOUT_REDIRECT_URL || window.location.origin
}`;

export const VALIDATION_TIMEOUT_SECONDS = convertEnvVarNumber(
  import.meta.env.SBL_VALIDATION_TIMEOUT_SECONDS,
  FETCH_TIMEOUT_SECONDS_STANDARD,
);

export const LONGPOLLING_DELAY_SECONDS =
  import.meta.env.SBL_LONGPOLLING_DELAY_SECONDS === 'backoff'
    ? 'backoff'
    : convertEnvVarNumber(
        import.meta.env.SBL_LONGPOLLING_DELAY_SECONDS,
        LONGPOLLING_STANDARD_DELAY,
      );

export const FILE_SIZE_LIMIT_BYTES = convertEnvVarNumber(
  import.meta.env.SBL_UPLOAD_FILE_SIZE_LIMIT_BYTES,
  FILE_SIZE_LIMIT_50MB,
);

export const IS_PLAYWRIGHT_TEST: boolean =
  String(import.meta.env.SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS) === 'true';

// React-Query set retries based on if Playwright test settings are enabled
export const getRetries = (retries = 0): boolean | number =>
  IS_PLAYWRIGHT_TEST ? false : retries;

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const caseTypes = {
  UpdateFinancialProfile: 'Update your financial institution profile',
  CompleteUserProfile: 'Complete your user profile',
} as const;

export type CaseType = (typeof caseTypes)[keyof typeof caseTypes];
