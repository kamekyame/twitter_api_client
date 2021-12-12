import "https://deno.land/x/dotenv/load.ts";
import { assertEquals } from "../deps-test.ts";

import { getTweet, getTweets } from "../api_v2/tweets/lookup.ts";
import { getBearerToken } from "../auth/oauth2.ts";

const apiKey = Deno.env.get("apikey") || "";
const apiSecretKey = Deno.env.get("apisecretkey") || "";

const bearerToken = await getBearerToken(apiKey, apiSecretKey);

Deno.test("Twitter API v2 Tweet lookup single Tweet", async () => {
  const tweetId = "1067094924124872705";
  const tweet = await getTweet(bearerToken, tweetId);

  const example = JSON.parse(
    `{
        "data": {
          "id": "1067094924124872705",
          "text": "Just getting started with Twitter APIs? Find out what you need in order to build an app. Watch this video! https://t.co/Hg8nkfoizN"
        }
    }`,
  );
  assertEquals(tweet, example);
});

Deno.test("Twitter API v2 Tweet lookup single Tweet with option", async () => {
  const tweetId = "1067094924124872705";
  const tweet = await getTweet(bearerToken, tweetId, {
    expansions: {
      author_id: true,
    },
    "user.fields": {
      verified: true,
    },
    "tweet.fields": {
      author_id: true,
      created_at: true,
    },
  });

  const example = JSON.parse(
    `{
        "data": {
          "author_id": "2244994945",
          "created_at": "2018-11-26T16:37:10.000Z",
          "text": "Just getting started with Twitter APIs? Find out what you need in order to build an app. Watch this video! https://t.co/Hg8nkfoizN",
          "id": "1067094924124872705"
        },
        "includes": {
          "users": [
            {
              "verified": true,
              "username": "TwitterDev",
              "id": "2244994945",
              "name": "Twitter Dev"
            }
          ]
        }
      }`,
  );
  assertEquals(tweet, example);
});

Deno.test("Twitter API v2 Tweet lookup multiple Tweets", async () => {
  const tweetIds = ["1261326399320715264", "1278347468690915330"];
  const tweet = await getTweets(bearerToken, {
    ids: tweetIds,
  });

  const example = JSON.parse(
    `{
      "data": [
        {
          "id": "1261326399320715264",
          "text": "Tune in to the @MongoDB @Twitch stream featuring our very own @suhemparack to learn about Twitter Developer Labs - starting now! https://t.co/fAWpYi3o5O"
        },
        {
          "id": "1278347468690915330",
          "text": "Good news and bad news: \\n\\n2020 is half over"
        }
      ]
    }`,
  );
  assertEquals(tweet, example);
});

Deno.test("Twitter API v2 Tweet lookup multiple Tweets with option", async () => {
  const tweetIds = ["1261326399320715264", "1278347468690915330"];
  const tweet = await getTweets(bearerToken, {
    ids: tweetIds,
    expansions: {
      author_id: true,
    },
    "tweet.fields": {
      created_at: true,
    },
    "user.fields": {
      verified: true,
    },
  });

  const example = JSON.parse(
    `{
      "data": [
        {
          "id": "1261326399320715264",
          "text": "Tune in to the @MongoDB @Twitch stream featuring our very own @suhemparack to learn about Twitter Developer Labs - starting now! https://t.co/fAWpYi3o5O",
          "author_id": "2244994945",
          "created_at": "2020-05-15T16:03:42.000Z"
        },
        {
          "id": "1278347468690915330",
          "text": "Good news and bad news: \\n\\n2020 is half over",
          "author_id": "783214",
          "created_at": "2020-07-01T15:19:21.000Z"
        }
      ],
      "includes": {
        "users": [
          {
            "verified": true,
            "name": "Twitter Dev",
            "id": "2244994945",
            "username": "TwitterDev"
          },
          {
            "verified": true,
            "name": "Twitter",
            "id": "783214",
            "username": "Twitter"
          }
        ]
      }
    }`,
  );
  assertEquals(tweet, example);
});
