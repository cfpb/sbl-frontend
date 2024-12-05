// Needed due to ESLint rule: @typescript-eslint/no-magic-numbers

export const Zero = 0;
export const NegativeOne = -1;
export const One = 1;
export const Two = 2;
export const MAX_RETRIES = 3;
export const UPLOAD_SUBMIT_MAX_RETRIES = 2;
export const Five = 5;
export const Ten = 10;
export const ITEMS_PER_PAGE = 20;
export const Thirty = 30;
export const Hundred = 100;

export const DefaultInputCharLimit = 255;
export const PhoneInputCharLimit = 12;
export const phoneExtensionNumberLimit = 9;
export const ZipInputCharLimit = 10;
export const LeiInputCharLimit = 20;
export const EmailInputCharLimit = 255;
export const UrlInputCharLimit = 2048;

export const EightHundred = 800;
export const Thousand = 1000;
export const CACHE_TIME = 600_000;
export const STANDARD_TIMEOUT = 1000;
export const INTERMEDIATE_TIMEOUT = 3000;
export const MAX_RETRY_DELAY = 15_000;
export const Error500 = 500;
// Upload max file size limit
export const FILE_SIZE_LIMIT_2GB = 2e9; // 2 GB - 2_147_483_648
export const FILE_SIZE_LIMIT_50MB = 50e6; // 50 MB - 52_428_800
export const FILE_SIZE_LIMIT_2MB = 2e6; // 2MB - 2_097_152
export const FILE_SIZE_LIMIT_ERROR_MESSAGE =
  'The file size is over the max size limit or does not contain data.';
export const SLB_INSTITUTION_TYPE_OTHER = '13';
export const FILING_STATUS_CODE_FILING_EXISTS = 409;
export const SBL_INSTITUTION_TYPE_OTHER_INDEX = 13;
export const FETCH_TIMEOUT_SECONDS_STANDARD = 1200; // 20 minutes
export const LONGPOLLING_STANDARD_DELAY = 15;

export const FILING_PAGE_ORDER = [
  'upload',
  'errors',
  'warnings',
  'details',
  'submit',
];
