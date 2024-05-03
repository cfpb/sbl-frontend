/* eslint-disable unicorn/filename-case */
/* eslint-disable unicorn/prevent-abbreviations */
// file dictated by: https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SBL_DEV_PORT: string;
  readonly SBL_OIDC_AUTHORITY: string;
  readonly SBL_OIDC_CLIENT_ID: string;
  readonly SBL_OIDC_REDIRECT_URI: string;
  readonly SBL_REGTECH_BASE_URL: string;
  readonly SBL_FILING_BASE_URL: string;
  readonly SBL_MAIL_BASE_URL: string;
  readonly SBL_LOGOUT_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
