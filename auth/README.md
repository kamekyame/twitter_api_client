# Authentication

https://developer.twitter.com/en/docs/authentication/overview

## OAuth 2.0 Bearer Token

```typescript
import { getBearerToken } from "https://kamekyame.github.io/twitter_api_client/auth/oauth2.ts";

const apikey = "" // apikey
const apisecletkey = "" // apisecletkey

const bearerToken = await getBearerToken(apikey, apisecretkey);
```