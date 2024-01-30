export const BASE_URL = `${
  import.meta.env.SBL_REGTECH_BASE_URL || 'http://localhost:8881'
}`;

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}