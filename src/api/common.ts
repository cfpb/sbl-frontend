export const BASE_URL = `${
  import.meta.env.SBL_REGTECH_BASE_URL || 'http://localhost:8881'
}`;

export const FILING_URL = `${
  import.meta.env.SBL_REGTECH_FILING_URL || 'http://localhost:8882'
}`;

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const caseTypes = {
  UpdateFinancialProfile: 'Update your financial institution profile',
  CompleteUserProfile: 'Complete your user profile',
} as const;

export type CaseType = (typeof caseTypes)[keyof typeof caseTypes];
