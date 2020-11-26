# Authentication

https://developer.twitter.com/en/docs/authentication/overview

## OAuth 2.0 Bearer Token

```typescript
import { getBearerToken } from "./oauth2.ts"; // TODO:change URL

const apikey = "" // apikey
const apisecletkey = "" // apisecletkey

const bearerToken = await getBearerToken(apikey, apisecretkey);
```