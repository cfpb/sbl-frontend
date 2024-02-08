# To start

Create a `.env` and place into the root of the project's folder.

# Required Environment Variables

```env
SBL_DEV_PORT="8899"
SBL_OIDC_AUTHORITY="http://localhost:8880/realms/regtech"
SBL_OIDC_CLIENT_ID="regtech-client"
SBL_OIDC_REDIRECT_URI="http://localhost:${SBL_DEV_PORT}/filing"
SBL_REGTECH_BASE_URL="http://localhost:8881"
SBL_MAIL_BASE_URL="http://localhost:8866"
```

### To use an environment variable

```js
import.meta.env.SOME_KEY;
```
