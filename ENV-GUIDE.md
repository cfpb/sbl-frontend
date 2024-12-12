# To start

Make a copy of `.env.example.public`, rename to `.env`, and place it into the root of the project's folder.
Copy the content of `.env.example.private` into the `.env` file that was just copied.

### Required Runtime Environment Variables

```env
SBL_DEV_PORT="8899"
SBL_OIDC_AUTHORITY="http://localhost:8880/realms/regtech"
SBL_OIDC_CLIENT_ID="regtech-client"
SBL_OIDC_REDIRECT_URI="http://localhost:${SBL_DEV_PORT}/filing"
SBL_REGTECH_BASE_URL="http://localhost:8881"
SBL_FILING_BASE_URL="http://localhost:8882"
SBL_CLEANUP_BASE_URL="http://localhost:8883"
SBL_MAIL_BASE_URL="http://localhost:8765/public/case"
SBL_LOGOUT_REDIRECT_URL=""
SBL_VALIDATION_TIMEOUT_SECONDS="1200"
SBL_LONGPOLLING_DELAY_SECONDS="backoff"
SBL_UPLOAD_FILE_SIZE_LIMIT_BYTES="50000000"
SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS=false
SBL_ENABLE_PLAYWRIGHT_SNAPSHOT_TESTING=false
```

### Required Test Environment Variables

```env
NODE_EXTRA_CA_CERTS="./e2e/certs/entrust_chain.crt.pem"
SBL_PLAYWRIGHT_TEST_TARGET="http://localhost:8899"
SBL_PLAYWRIGHT_TEST_REGTECH_TARGET="http://localhost:8881"
SBL_PLAYWRIGHT_TEST_FILING_TARGET="http://localhost:8882"
SBL_PLAYWRIGHT_TEST_CLEANUP_TARGET="http://localhost:8883"
SBL_PLAYWRIGHT_TEST_MAIL_TARGET="http://localhost:8765"
SBL_PLAYWRIGHT_TEST_KC_TARGET="http://localhost:8880/"
SBL_PLAYWRIGHT_TEST_KC_REALM="regtech"
SBL_PLAYWRIGHT_TEST_KC_CLI_USERNAME="admin"
SBL_PLAYWRIGHT_TEST_KC_CLI_CLIENT_ID="admin-cli"
SBL_PLAYWRIGHT_TEST_KC_CLI_CLIENT_SECRET="local_test_only"
SBL_PLAYWRIGHT_TEST_KC_CLI_GRANT_TYPE="client_credentials"
SBL_PLAYWRIGHT_TEST_KC_ADMIN_USERNAME="admin1"
SBL_PLAYWRIGHT_TEST_KC_ADMIN_PASSWORD="admin"
SBL_PLAYWRIGHT_TEST_KC_ADMIN_CLIENT_ID="regtech-client"
SBL_PLAYWRIGHT_TEST_KC_ADMIN_GRANT_TYPE="password"
```

## How to add new environment variables

Both private and public variables will need to be added to the places listed below and in accordance with their applicable instructions

### To add a new public environment variable

This is where environment vairables that are meant to be visible to the client go

When adding a new public env variable that needs to be used on production, there are a few places that need to be updated:

- "Required Runtime Environment Variables" section in this guide (`ENV-GUIDE.md`)
- `.env.example.public` in the root of this repo
- `.github/workflows/test.yml` in this repo in the `env` section
- Run `yarn start` at least once to generate types for the new env variables
- `sbl-project/dev_setup/frontend.local.env` file in the `sbl-project` repo
- ask a devops/backend engineer to help you update the `values.yaml` overrides

### To use a public environment variable

```js
import.meta.env.SOME_KEY;
```

### To add a new private environment variable

This is where environment vairables that are not meant to be visible to the client go

When adding a new private env variable that needs to be used on production, there are a few places that need to be updated:

- "Required Test Environment Variables" section in this guide (`ENV-GUIDE.md`)
- `.env.example.private` in the root of this repo
- `.github/workflows/test.yml` in this repo in the `env` section
- Run `yarn start` at least once to generate types for the new env variables
- `sbl-project/dev_setup/frontend.local.env` file in the `sbl-project` repo
- ask a devops/backend engineer to help you update the `values.yaml` overrides

### To use a private environment variable

```js
process.env.SOME_KEY;
```
