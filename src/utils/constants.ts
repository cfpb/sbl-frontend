// Needed due to ESLint rule: @typescript-eslint/no-magic-numbers

export const Zero = 0;
export const One = 1;
export const Two = 2;
export const Five = 5;
export const Ten = 10;
export const Thirty = 30;
export const Hundred = 100;
export const EightHundred = 800;
export const STANDARD_TIMEOUT = 1000;
export const INTERMEDIATE_TIMEOUT = 3000;
export const MAX_RETRY_DELAY = 15_000;
export const Error500 = 500;
// Upload max file size limit
export const FILE_SIZE_LIMIT = 2e9; // 2 GB - 2_147_483_648
export const FILE_SIZE_LIMIT_TEST = 2e6; // 2MB - 2_097_152
export const FILE_SIZE_LIMIT_ERROR_MESSAGE =
  'The file size is over the max size limit or does not contain data.';
