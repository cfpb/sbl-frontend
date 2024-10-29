# To start

Make a copy of `.env.example`, rename to `.env`, and place it into the root of the project's folder.

# Required Environment Variables

```env
SBL_DEV_PORT="8899"
SBL_OIDC_AUTHORITY="http://localhost:8880/realms/regtech"
SBL_OIDC_CLIENT_ID="regtech-client"
SBL_OIDC_REDIRECT_URI="http://localhost:${SBL_DEV_PORT}/filing"
SBL_REGTECH_BASE_URL="http://localhost:8881"
SBL_FILING_BASE_URL="http://localhost:8882"
SBL_MAIL_BASE_URL="http://localhost:8765"
SBL_LOGOUT_REDIRECT_URL=""
SBL_VALIDATION_TIMEOUT_SECONDS="1200"
SBL_LONGPOLLING_DELAY_SECONDS="backoff"
SBL_UPLOAD_FILE_SIZE_LIMIT_BYTES="50000000"
SBL_ENABLE_PLAYWRIGHT_TEST_SETTINGS="false"
SBL_PLAYWRIGHT_TEST_TARGET="http://localhost:8899"
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

### To add a new environment variable

When adding a new env variable that needs to be used on production, there are a few places that need to be updated:

- "Required Environment Variables" section in this guide (`ENV-GUIDE.md`)
- `.env.example` in the root of this repo
- `.github/workflows/test.yml` in this repo in the `env` section
- Run `yarn start` at least once to generate types for the new env variables
- `sbl-project/dev_setup/frontend.local.env` file in the `sbl-project` repo
- ask a devops/backend engineer to help you update the `values.yaml` overrides

### To use an environment variable

```js
import.meta.env.SOME_KEY;
```
