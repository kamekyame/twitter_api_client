/*
Filtered stream : https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/introduction
*/

import "https://deno.land/x/dotenv/load.ts";
import { assert, assertEquals, assertObjectMatch } from "../deps-test.ts";

import {
  changeRules,
  connectStream,
  FilteredStreamRuleRes,
  getRules,
} from "../api_v2/tweets/filtered_stream.ts";
import { getBearerToken } from "../auth/oauth2.ts";

const apiKey = Deno.env.get("apikey") || "";
const apiSecretKey = Deno.env.get("apisecretkey") || "";

const bearerToken = await getBearerToken(apiKey, apiSecretKey);

Deno.test("Twitter API v2 Filtered stream Validate rules", async () => {
  const res = await changeRules(bearerToken, {
    add: [
      { value: "cat has:media", tag: "cats with media" },
      { value: "cats has:media -grumpy", tag: "happy cats with media" },
      { value: "meme", tag: "funny things" },
      { value: "meme has:images" },
    ],
  }, true);

  const example: FilteredStreamRuleRes = JSON.parse(
    `{
      "data": [
          {
              "value": "meme",
              "tag": "funny things",
              "id": "1166895166390583299"
          },
          {
            "value": "meme has:images",
            "id": "1166895166390583298"
          },
          {
              "value": "cat has:media",
              "tag": "cats with media",
              "id": "1166895166390583297"
          },
          {
            "value": "cats has:media -grumpy",
            "tag": "happy cats with media",
            "id": "1166895166390583296"
          }
      ],
      "meta": {
          "sent": "2019-08-29T02:07:42.205Z",
          "summary": {
              "created": 4,
              "not_created": 0,
              "valid": 4,
              "invalid": 0
          }
      }
  }`,
  );

  res.data?.forEach((e) => {
    e.id = "";
  });
  example.data?.forEach((e) => e.id = "");

  if (res.meta.sent) {
    assert(!isNaN(Date.parse(res.meta.sent)));
    res.meta.sent = "";
    example.meta.sent = "";
  }
  assertEquals(res, example);
});
