/*
POST statuses/retweet/:id
https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-retweet-id
*/

import {
  oAuth1Fetch,
  OAuth1Info,
} from "https://kamekyame.github.io/deno_tools/http/mod.ts";

import { addParamOption, endpoints, getUrl } from "../../util.ts";

export interface RetweetParam {
  trim_user: boolean;
}

/**
 * POST statuses/retweet/:id
 * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-retweet-id
 */
export async function statusRetweet(
  auth: OAuth1Info,
  id: string,
  param?: RetweetParam,
) {
  const url = getUrl(endpoints.api_v1.tweets.retweet(id));
  addParamOption(url, param);
  const json = await (await oAuth1Fetch(
    auth,
    url,
    { method: "POST" },
  )).json();
  return json; // TODO: need to create an appropriate interface.
}
