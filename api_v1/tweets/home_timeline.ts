/*
POST statuses/home_timeline
https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timelinehttps://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timeline
*/

import {
  oAuth1Fetch,
  OAuth1Info,
} from "https://kamekyame.github.io/deno_tools/http/mod.ts";

import { addParamOption, endpoints, getUrl } from "../../util.ts";

export interface UpdateParam {
  count?: number;
  since_id?: string;
  max_id?: string;
  trim_user?: boolean;
  exclude_replies?: boolean;
  include_entities?: boolean;
}

/**
 * POST statuses/home_timeline
 * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timeline
 * @export
 * @param {OAuth1Info} auth
 * @param {UpdateParam} param
 * @return {any}
 */
export async function statusHomeTimeline(
  auth: OAuth1Info,
  param: UpdateParam = {},
) {
  const url = getUrl(endpoints.api_v1.tweets.home_timeline);
  addParamOption(url, param);

  for (const [k, v] of Object.entries(param)) {
    url.searchParams.set(k, v);
  }
  const json = await (await oAuth1Fetch(
    auth,
    url,
  )).json();
  return json; // TODO: need to create an appropriate interface.
}
