# Twitter API v2 (early access) client for Deno
https://developer.twitter.com/en/docs/twitter-api/early-access
## Tweets
### Filtered Stream

#### Add or delete rules from your stream
```typescript
import { changeRules } from "https://kamekyame.github.io/twitter_api_client/api_v2/tweets/filtered_stream.ts";

const bearerToken = ""; // bearerToken

const res = await changeRules(bearerToken, {
  add: [
    { value: "cat has:media", tag: "cats with media" },
    { value: "cats has:media -grumpy", tag: "happy cats with media" },
    { value: "meme", tag: "funny things" },
    { value: "meme has:images" },
  ],
  delete: {
    ids: [
      "1165037377523306498",
      "1165037377523306499",
    ],
  },
});

/*
At the time of "dry_run"

await changeRules("bearerToken","rules",true);
*/
```

#### Retrieve your stream's rules
```typescript
import { getRules } from "https://kamekyame.github.io/twitter_api_client/api_v2/tweets/filtered_stream.ts";

const bearerToken = ""; // bearerToken

const res = await getRules(bearerToken);
```

#### Connect to the stream
```typescript
import { connectStream ,StreamTweet} from "https://kamekyame.github.io/twitter_api_client/api_v2/tweets/filtered_stream.ts";

const bearerToken = ""; // bearerToken

async function callback(a: StreamTweet) {
  // any processing
}

// none option
connectStream(bearerToken, callback);

// with option
connectStream(bearerToken, callback, {
  expansions: {
    author_id: true,
  },
});

```

