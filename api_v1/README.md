# Twitter API v1.1 client for Deno

https://developer.twitter.com/en/docs/twitter-api/v1

## Tweets

### Search Tweets

#### POST search/:product/:label

```typescript
import { PremiumSearch } from "https://deno.land/x/twitter_api_client/mod.ts";

const auth = {
  consumerKey: "",
  consumerSecret: "",
  token: "",
  tokenSecret: "",
};
const res = await PremiumSearch(auth, "fullarchive", "test", {
  query: "Twitter API",
});

console.log(res);
```

### Post, retrieve, and engage with Tweets

#### POST statuses/update

```typescript
import { statusUpdate } from "https://deno.land/x/twitter_api_client/api_v1/tweets/update.ts";

const auth = {
  consumerKey: "",
  consumerSecret: "",
  token: "",
  tokenSecret: "",
};
const res = await statusUpdate(auth, { status: "hello world!" });

console.log(res);
// res's interface is none.
// need to create an appropriate interface.
```

#### POST statuses/retweet/:id

```typescript
import { statusRetweet } from "https://deno.land/x/twitter_api_client/api_v1/tweets/retweet.ts";

const res = await statusRetweet(
  {
    consumerKey: "",
    consumerSecret: "",
    token: "",
    tokenSecret: "",
  },
  "1406985209833082883",
  {
    trim_user: true,
  },
);

console.log(res);
// res's interface is none.
// need to create an appropriate interface.
```

### Get Tweet timelines

#### GET statuses/home_timeline

```typescript
import { statusHomeTimeline } from "https://deno.land/x/twitter_api_client/api_v1/tweets/home_timeline.ts";

const res = await statusHomeTimeline({
  consumerKey: "",
  consumerSecret: "",
  token: "",
  tokenSecret: "",
}, { count: 10, trim_user: true });

console.log(res);
```
