# Authentication

https://developer.twitter.com/en/docs/authentication/overview

## OAuth 2.0 Bearer Token

```typescript
import { getBearerToken } from "https://deno.land/x/twitter_api_client/auth/oauth2.ts";

const apikey = ""; // apikey
const apisecretkey = ""; // apisecletkey

const bearerToken = await getBearerToken(apikey, apisecretkey);
```
