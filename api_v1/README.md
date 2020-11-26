# Twitter API v1.1 client for Deno
https://developer.twitter.com/en/docs/twitter-api/v1
## Tweets
### Post, retrieve, and engage with Tweets
#### POST statuses/update
```typescript
import { statusUpdate } from "https://kamekyame.github.io/twitter_api_client/api_v1/tweets/update.ts";

const res = await statusUpdate({
  consumerKey: "",
  consumerSecret: "",
  token: "",
  tokenSecret: "",
}, {
  status: "hello world!",
});

console.log(res);
// res's interface is none.
// need to create an appropriate interface.
```