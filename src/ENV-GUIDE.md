# To start

Create a `.env` and place into the root of the projects' folder.

# Required Environment Variables

```env
VITE_DEV_PORT="8899"
VITE_OIDC_AUTHORITY="http://localhost:8880/realms/regtech"
VITE_OIDC_CLIENT_ID="regtech-client"
VITE_OIDC_REDIRECT_URI="http://localhost:${VITE_DEV_PORT}/filing"
VITE_REGTECH_BASE_URL="http://localhost:8881"
```

### To use an environment variable

```js
import.meta.env.SOME_KEY;
```
