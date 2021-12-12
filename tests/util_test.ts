import { assertEquals } from "../deps-test.ts";

import * as util from "../util.ts";

import { UpdateParam } from "../api_v1/tweets/update.ts";
import { TweetParam } from "../api_v2/tweets/lookup.ts";

Deno.test("get URL", () => {
  const ep = util.endpoints.api_v2.lookup;
  const url = util.getUrl(ep);

  const host = "https://api.twitter.com";
  const exampleUrl = new URL(host + ep);

  assertEquals(url, exampleUrl);
});

Deno.test("addParamOption api_v1 statuses/update", () => {
  const param: UpdateParam = {
    status: "status",
    auto_populate_reply_metadata: true,
    exclude_reply_user_ids: ["id1", "id2"],
  };

  const url = util.addParamOption(
    util.getUrl(util.endpoints.api_v1.tweets.update),
    param,
  );

  const exampleUrl =
    "https://api.twitter.com/1.1/statuses/update.json?status=status&auto_populate_reply_metadata=true&exclude_reply_user_ids=" +
    encodeURIComponent("id1,id2");

  assertEquals(url.toString(), exampleUrl);
});

Deno.test("addParamOption api_v2 lookup", () => {
  const param: TweetParam = {
    expansions: {
      author_id: true,
      in_reply_to_user_id: true,
    },
    "tweet.fields": {
      created_at: true,
      in_reply_to_user_id: false,
    },
  };

  const url = util.addParamOption(
    util.getUrl(util.endpoints.api_v2.lookup),
    param,
  );

  const exampleUrl = "https://api.twitter.com/2/tweets?expansions=" +
    encodeURIComponent("author_id,in_reply_to_user_id") +
    "&tweet.fields=created_at";

  assertEquals(url.toString(), exampleUrl);
});
