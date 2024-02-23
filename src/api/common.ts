export const BASE_URL = `${
  import.meta.env.SBL_REGTECH_BASE_URL || 'http://localhost:8881'
}`;

export interface SubmitUserProfileObject {
  first_name: string;
  last_name: string;
  leis: string[];
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const emailSubjects = {
  UpdateFinancialProfile: '[BETA] Update your financial institution profile',
  CompleteUserProfile: '[BETA] Complete your user profile',
} as const;

export type EmailSubject = (typeof emailSubjects)[keyof typeof emailSubjects];
